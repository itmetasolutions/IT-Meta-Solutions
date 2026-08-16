import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { API_BASE_URL } from "../../lib/api";
import { setAdminToken } from "../../lib/adminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Invalid username or password");
      const { token } = await res.json();
      setAdminToken(token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Admin Login | IT Meta Solutions</title>
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-[#0D1222] px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1D4ED8]/15">
              <Lock className="h-5 w-5 text-[#60A5FA]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin Login</h1>
              <p className="text-xs text-zinc-500">IT Meta Solutions dashboard</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-400">Username</label>
              <input
                type="text"
                autoComplete="username"
                value={form.username}
                onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-400">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30"
                required
              />
            </div>
          </div>

          {error && <p className="mt-4 text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#162f8f] disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
