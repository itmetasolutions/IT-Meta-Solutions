#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen


DEFAULT_WIDGET_ID = "416e46d0-c7c1-4638-bce7-268a149545f7"
DEFAULT_PAGE_URL = "https://itmetasolutions.com/"
DEFAULT_GOOGLE_MAPS_URL = "https://maps.app.goo.gl/5LmmNhuWXgWUiA1L6"
DEFAULT_PAGE_LENGTH = 100
DEFAULT_OUTPUT_PATH = (
    Path(__file__).resolve().parents[1] / "server" / "cache" / "google-reviews.json"
)

BOOT_BASE_URL = "https://core.service.elfsight.com/p/boot/"
REVIEWS_API_BASE_URL = "https://service-reviews-ultimate.elfsight.com/data"
DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json",
}


def request_json(url: str, headers: dict[str, str] | None = None) -> dict[str, Any]:
    merged_headers = dict(DEFAULT_HEADERS)
    if headers:
        merged_headers.update(headers)

    request = Request(url, headers=merged_headers)
    with urlopen(request, timeout=60) as response:
        return json.loads(response.read().decode("utf-8", "ignore"))


def build_query(params: list[tuple[str, str | int]]) -> str:
    return urlencode(params, doseq=True)


def iso_from_unix(value: int | None) -> str | None:
    if value is None:
        return None

    return datetime.fromtimestamp(value, tz=timezone.utc).isoformat()


def normalize_review(review: dict[str, Any]) -> dict[str, Any]:
    owner_response = review.get("response") or None
    published_at = review.get("published_at")

    return {
        "id": review.get("id"),
        "author_name": review.get("reviewer_name") or "Google user",
        "author_photo_url": review.get("reviewer_picture_url"),
        "rating": review.get("rating"),
        "text": review.get("text") or "",
        "text_html": review.get("text_html") or "",
        "google_review_url": review.get("url"),
        "images": review.get("images") or [],
        "published_at": published_at,
        "published_at_iso": iso_from_unix(published_at),
        "owner_response": (
            {
                "text": owner_response.get("text") or "",
                "published_at": owner_response.get("date"),
                "published_at_iso": iso_from_unix(owner_response.get("date")),
                "name": owner_response.get("name"),
                "logo_url": owner_response.get("logo_url"),
            }
            if owner_response
            else None
        ),
    }


def fetch_boot_payload(widget_id: str, page_url: str) -> dict[str, Any]:
    query = build_query([("w", widget_id), ("page", page_url)])
    return request_json(f"{BOOT_BASE_URL}?{query}")


def fetch_source_data(widget_token: str, source_uri: str) -> dict[str, Any]:
    query = build_query([("uris[]", source_uri)])
    response = request_json(
        f"{REVIEWS_API_BASE_URL}/sources?{query}",
        headers={"x-widget-token": widget_token},
    )
    data = response.get("result", {}).get("data") or []
    if not data:
        raise RuntimeError("Source metadata response did not include any source records.")
    return data[0]


def fetch_reviews(widget_token: str, source_uri: str, page_length: int) -> list[dict[str, Any]]:
    query = build_query(
        [
            ("uris[]", source_uri),
            ("page_length", page_length),
            ("filter_content", "with_content"),
        ]
    )
    response = request_json(
        f"{REVIEWS_API_BASE_URL}/reviews?{query}",
        headers={"x-widget-token": widget_token},
    )
    return response.get("result", {}).get("data") or []


def build_payload(
    widget_id: str,
    page_url: str,
    google_maps_url: str,
    boot_payload: dict[str, Any],
    source_payload: dict[str, Any],
    reviews_payload: list[dict[str, Any]],
) -> dict[str, Any]:
    widget = boot_payload["data"]["widgets"][widget_id]["data"]
    configured_source = widget["settings"]["sources"][0]
    source_meta = source_payload.get("meta") or {}
    source_uri = source_payload.get("uri") or configured_source.get("url")

    return {
        "generated_at": datetime.now(tz=timezone.utc).isoformat(),
        "page_url": page_url,
        "widget_id": widget_id,
        "source": {
            "supplier": source_payload.get("supplier") or configured_source.get("type"),
            "uri": source_uri,
            "name": source_meta.get("name") or configured_source.get("caption"),
            "address": source_meta.get("address"),
            "rating": source_payload.get("rating"),
            "reviews_number": source_payload.get("reviews_number"),
            "profile_state": source_payload.get("profile_state"),
            "thumbnail_url": source_meta.get("thumbnail"),
            "profile_logo_url": source_meta.get("profile_logo_url"),
            "google_maps_url": google_maps_url,
            "write_review_url": (
                f"https://search.google.com/local/writereview?placeid={source_uri}"
                if source_uri
                else None
            ),
        },
        "reviews": [normalize_review(review) for review in reviews_payload],
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Refresh the cached Google reviews feed used by the frontend."
    )
    parser.add_argument("--widget-id", default=DEFAULT_WIDGET_ID)
    parser.add_argument("--page-url", default=DEFAULT_PAGE_URL)
    parser.add_argument("--google-maps-url", default=DEFAULT_GOOGLE_MAPS_URL)
    parser.add_argument("--page-length", type=int, default=DEFAULT_PAGE_LENGTH)
    parser.add_argument("--output", default=str(DEFAULT_OUTPUT_PATH))
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    boot_payload = fetch_boot_payload(args.widget_id, args.page_url)
    widget = boot_payload["data"]["widgets"][args.widget_id]["data"]
    widget_token = widget["public_widget_token"]
    source_uri = widget["settings"]["sources"][0]["url"]

    source_payload = fetch_source_data(widget_token, source_uri)
    reviews_payload = fetch_reviews(widget_token, source_uri, args.page_length)

    payload = build_payload(
        widget_id=args.widget_id,
        page_url=args.page_url,
        google_maps_url=args.google_maps_url,
        boot_payload=boot_payload,
        source_payload=source_payload,
        reviews_payload=reviews_payload,
    )

    output_path = Path(args.output).resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Saved {len(payload['reviews'])} reviews to {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
