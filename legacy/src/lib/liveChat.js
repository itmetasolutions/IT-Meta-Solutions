// Lightweight event bridge so any component can open the site-wide LiveChat widget
// without prop-drilling it through every page.

export const LIVE_CHAT_OPEN_EVENT = "itms:open-live-chat";

export function openLiveChat() {
  window.dispatchEvent(new CustomEvent(LIVE_CHAT_OPEN_EVENT));
}
