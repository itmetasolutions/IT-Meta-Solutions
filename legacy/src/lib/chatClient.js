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

export async function startChatSession(visitorId) {
  const res = await fetch(`${API_BASE_URL}/api/chat/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId }),
  });
  if (!res.ok) throw new Error("Live chat is temporarily unavailable");
  return res.json();
}

export async function fetchMessages(conversationId, visitorId) {
  const params = new URLSearchParams({ conversationId, visitorId });
  const res = await fetch(`${API_BASE_URL}/api/chat/messages?${params}`);
  if (!res.ok) throw new Error("Failed to load messages");
  return res.json();
}

export async function sendVisitorMessage(visitorId, conversationId, text) {
  const res = await fetch(`${API_BASE_URL}/api/chat/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId, conversationId, text }),
  });
  if (!res.ok) throw new Error("Failed to send message");
  return res.json();
}
