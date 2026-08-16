import { io } from "socket.io-client";
import { API_BASE_URL } from "./api";

const VISITOR_ID_KEY = "itms_chat_visitor_id";

export function getVisitorId() {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = `v_${crypto.randomUUID()}`;
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

let socket = null;

export function getChatSocket() {
  if (!socket) {
    socket = io(API_BASE_URL, { autoConnect: true, transports: ["websocket", "polling"] });
  }
  return socket;
}

export async function startChatSession(visitorId) {
  const res = await fetch(`${API_BASE_URL}/api/chat/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId }),
  });
  if (!res.ok) throw new Error("Live chat is temporarily unavailable");
  return res.json();
}
