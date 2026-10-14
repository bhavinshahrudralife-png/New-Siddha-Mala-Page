import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Flower2, Loader2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { login, formatApiError } from "../lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      setError(formatApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="admin-login-page" className="min-h-screen flex items-center justify-center px-5">
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass rounded-3xl p-8 sm:p-10 w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <span className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
            <Flower2 className="text-primary" size={24} />
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Rudralife Admin</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to manage leads & page content</p>
        </div>
        {error && (
          <p data-testid="admin-login-error" className="text-sm text-destructive-foreground bg-destructive/40 border border-destructive rounded-lg px-4 py-3">
            {error}
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="admin-email">Email</Label>
          <Input
            id="admin-email"
            data-testid="admin-login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/60 border-input h-12"
            placeholder="admin@rudralife.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="admin-password">Password</Label>
          <Input
            id="admin-password"
            data-testid="admin-login-password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background/60 border-input h-12"
            placeholder="••••••••"
          />
        </div>
        <button
          data-testid="admin-login-submit"
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-[#e5c04a] transition-colors duration-300 disabled:opacity-60"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </motion.form>
    </div>
  );
}
