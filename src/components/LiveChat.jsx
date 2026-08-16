import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Phone } from "lucide-react";
import { getVisitorId, getChatSocket, startChatSession } from "../lib/chatClient";
import { LIVE_CHAT_OPEN_EVENT } from "../lib/liveChat";
import { PRIMARY_PHONE } from "../lib/contact";

const QUICK_REPLIES = ["General enquiry", "Get a quote", "Project support"];

function isOfficeHoursNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour: "numeric",
    hour12: false,
    weekday: "short",
  }).formatToParts(new Date());
  const weekday = parts.find((p) => p.type === "weekday")?.value;
  const hour = Number(parts.find((p) => p.type === "hour")?.value);
  return !["Sat", "Sun"].includes(weekday) && hour >= 9 && hour < 18;
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [hasUnread, setHasUnread] = useState(false);
  const listRef = useRef(null);
  const visitorIdRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const onOpenEvent = () => setOpen(true);
    window.addEventListener(LIVE_CHAT_OPEN_EVENT, onOpenEvent);
    return () => window.removeEventListener(LIVE_CHAT_OPEN_EVENT, onOpenEvent);
  }, []);

  useEffect(() => {
    if (!open || startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    visitorIdRef.current = getVisitorId();
    setStatus("loading");

    startChatSession(visitorIdRef.current)
      .then(({ conversation: convo, messages: history }) => {
        if (cancelled) return;
        setConversation(convo);
        setMessages(history);
        setStatus("ready");

        const socket = getChatSocket();
        socket.emit("visitor:join", { visitorId: visitorIdRef.current });

        socket.on("message:new", (message) => {
          if (message.conversation_id !== convo.id) return;
          setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]));
          if (message.sender !== "visitor" && !document.hasFocus()) setHasUnread(true);
        });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (open) setHasUnread(false);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed || !conversation) return;
    getChatSocket().emit("visitor:message", {
      visitorId: visitorIdRef.current,
      conversationId: conversation.id,
      text: trimmed,
    });
    setInput("");
  };

  const online = isOfficeHoursNow();

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close live chat" : "Open live chat"}
        className="fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1D4ED8] to-blue-600 text-white shadow-lg shadow-[#1D4ED8]/30 transition-all hover:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && hasUnread && (
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-[9999] flex h-[70vh] max-h-[560px] w-auto sm:w-[380px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 bg-[#141A2E] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1D4ED8]/25">
                <MessageCircle className="h-4.5 w-4.5 text-[#60A5FA]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  IT Meta Solutions
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-emerald-400" : "bg-zinc-500"}`} />
                  {online ? "Online now" : "Away — leave a message"}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          {status === "error" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
              <p className="text-sm text-slate-500">
                Live chat isn't available right now. Please call us or use the contact form.
              </p>
              <a
                href={`tel:${PRIMARY_PHONE.tel}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white"
              >
                <Phone className="h-3.5 w-3.5" />
                {PRIMARY_PHONE.display}
              </a>
            </div>
          ) : (
            <>
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[#F7F9FC] px-4 py-4">
                {status === "loading" && (
                  <div className="text-center text-xs text-slate-400">Connecting…</div>
                )}
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.sender === "visitor" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.sender === "visitor"
                          ? "bg-[#1D4ED8] text-white"
                          : "bg-white text-slate-700 border border-slate-100"
                      }`}
                    >
                      {m.body}
                    </div>
                  </div>
                ))}
                {status === "ready" && messages.length <= 1 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {QUICK_REPLIES.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        className="rounded-full border border-[#1D4ED8]/25 bg-white px-3 py-1.5 text-xs font-medium text-[#1D4ED8] hover:bg-[#1D4ED8]/5 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  disabled={status !== "ready"}
                  className="flex-1 rounded-full border border-slate-200 bg-[#F7F9FC] px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/15 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status !== "ready" || !input.trim()}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white disabled:opacity-40 transition-opacity"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
