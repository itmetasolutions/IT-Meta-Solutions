import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Inbox, MessageCircle, LogOut, Mail, Phone, Building2,
  Send, RefreshCw, X, Clock,
} from "lucide-react";
import { adminFetch, getAdminToken, clearAdminToken } from "../../lib/adminAuth";
import { getChatSocket } from "../../lib/chatClient";

const cx = (...c) => c.filter(Boolean).join(" ");

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

/* ==================== SUBMISSIONS ==================== */

function SubmissionsTab() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await adminFetch("/api/admin/submissions");
      if (!res.ok) throw new Error((await res.json()).error || "Failed to load");
      setSubmissions(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    const res = await adminFetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const updated = await res.json();
      setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
      setSelected((s) => (s?.id === id ? updated : s));
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Form Submissions</h2>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/[0.08]"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Refresh
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-300">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-zinc-500">Loading…</p>
      ) : submissions.length === 0 ? (
        <p className="text-sm text-zinc-500">No submissions yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="cursor-pointer border-t border-white/[0.05] text-zinc-300 hover:bg-white/[0.03]"
                >
                  <td className="px-4 py-3 font-medium text-white">{s.name}</td>
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3">{s.service || "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cx(
                        "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        s.status === "new" && "bg-blue-500/15 text-blue-300",
                        s.status === "read" && "bg-zinc-500/15 text-zinc-300",
                        s.status === "responded" && "bg-emerald-500/15 text-emerald-300",
                        s.status === "archived" && "bg-zinc-700/30 text-zinc-500"
                      )}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{timeAgo(s.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0D1222] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between">
              <h3 className="text-base font-bold text-white">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 text-sm text-zinc-300">
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-zinc-500" /> {selected.email}</div>
              {selected.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-zinc-500" /> {selected.phone}</div>}
              {selected.company && <div className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5 text-zinc-500" /> {selected.company}</div>}
              <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-zinc-500" /> {new Date(selected.created_at).toLocaleString()}</div>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-zinc-300">
              {selected.message}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["new", "read", "responded", "archived"].map((st) => (
                <button
                  key={st}
                  onClick={() => updateStatus(selected.id, st)}
                  className={cx(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    selected.status === st ? "bg-[#1D4ED8] text-white" : "bg-white/[0.05] text-zinc-400 hover:bg-white/[0.1]"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== LIVE CHAT ==================== */

function ChatTab() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const listRef = useRef(null);
  const activeIdRef = useRef(null);
  activeIdRef.current = activeId;

  const loadConversations = async () => {
    try {
      const res = await adminFetch("/api/admin/conversations");
      if (!res.ok) throw new Error((await res.json()).error || "Failed to load");
      setConversations(await res.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
    const socket = getChatSocket();
    socket.emit("admin:auth", getAdminToken());

    const onMessage = (message) => {
      setConversations((prev) => {
        const idx = prev.findIndex((c) => c.id === message.conversation_id);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], last_message: message.body, last_message_at: message.created_at };
        return updated.sort((a, b) => new Date(b.last_message_at) - new Date(a.last_message_at));
      });
      if (message.conversation_id === activeIdRef.current) {
        setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]));
      }
    };
    socket.on("message:new", onMessage);
    return () => socket.off("message:new", onMessage);
  }, []);

  const openConversation = async (id) => {
    setActiveId(id);
    getChatSocket().emit("admin:join-conversation", { conversationId: id });
    const res = await adminFetch(`/api/admin/conversations/${id}/messages`);
    if (res.ok) setMessages(await res.json());
  };

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendReply = (e) => {
    e.preventDefault();
    if (!input.trim() || !activeId) return;
    getChatSocket().emit("admin:message", {
      conversationId: activeId,
      text: input.trim(),
      token: getAdminToken(),
    });
    setInput("");
  };

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm text-amber-300">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Conversation list */}
      <div className="w-72 flex-shrink-0 overflow-y-auto border-r border-white/10">
        {loading ? (
          <p className="p-4 text-sm text-zinc-500">Loading…</p>
        ) : conversations.length === 0 ? (
          <p className="p-4 text-sm text-zinc-500">No conversations yet.</p>
        ) : (
          conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => openConversation(c.id)}
              className={cx(
                "flex w-full flex-col gap-1 border-b border-white/[0.05] p-4 text-left transition-colors",
                activeId === c.id ? "bg-[#1D4ED8]/10" : "hover:bg-white/[0.03]"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  {c.visitor_name || `Visitor #${c.id}`}
                </span>
                {Number(c.unread_count) > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1D4ED8] text-[10px] font-bold text-white">
                    {c.unread_count}
                  </span>
                )}
              </div>
              <span className="truncate text-xs text-zinc-500">{c.last_message || "No messages"}</span>
              <span className="text-[11px] text-zinc-600">{timeAgo(c.last_message_at)}</span>
            </button>
          ))
        )}
      </div>

      {/* Thread */}
      <div className="flex flex-1 flex-col">
        {!activeId ? (
          <div className="flex flex-1 items-center justify-center text-sm text-zinc-500">
            Select a conversation to view messages
          </div>
        ) : (
          <>
            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-5">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={cx(
                      "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      m.sender === "admin"
                        ? "bg-[#1D4ED8] text-white"
                        : m.sender === "bot"
                        ? "border border-white/10 bg-white/[0.03] text-zinc-400 italic"
                        : "border border-white/10 bg-white/[0.05] text-zinc-200"
                    )}
                  >
                    {m.body}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendReply} className="flex items-center gap-2 border-t border-white/10 p-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Reply to visitor…"
                className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1D4ED8] text-white disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ==================== SHELL ==================== */

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("submissions");

  useEffect(() => {
    if (!getAdminToken()) {
      navigate("/admin/login");
      return;
    }
    adminFetch("/api/admin/me").catch(() => {});
  }, [navigate]);

  const logout = () => {
    clearAdminToken();
    navigate("/admin/login");
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Dashboard | IT Meta Solutions</title>
      </Helmet>
      <div className="flex h-screen flex-col bg-[#0D1222]">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-6">
            <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              IT Meta Solutions — Admin
            </span>
            <nav className="flex gap-1">
              <button
                onClick={() => setTab("submissions")}
                className={cx(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
                  tab === "submissions" ? "bg-[#1D4ED8]/15 text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                <Inbox className="h-4 w-4" /> Submissions
              </button>
              <button
                onClick={() => setTab("chat")}
                className={cx(
                  "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors",
                  tab === "chat" ? "bg-[#1D4ED8]/15 text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                <MessageCircle className="h-4 w-4" /> Live Chat
              </button>
            </nav>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" /> Log out
          </button>
        </div>

        {tab === "submissions" ? <SubmissionsTab /> : <ChatTab />}
      </div>
    </>
  );
}
