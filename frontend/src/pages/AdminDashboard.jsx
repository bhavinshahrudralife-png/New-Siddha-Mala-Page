import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flower2, LogOut, Users, FileText, Trash2, Loader2, Save } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { fetchMe, logout, fetchLeads, deleteLead, fetchContent, updateContent, formatApiError } from "../lib/api";
import { toast } from "sonner";

const CONTENT_FIELDS = [
  { key: "hero_title", label: "Hero Tagline", textarea: true },
  { key: "hero_subtitle", label: "Hero Description", textarea: true },
  { key: "phone", label: "Phone Number" },
  { key: "whatsapp", label: "WhatsApp Number (with country code, no +)" },
  { key: "email", label: "Email" },
  { key: "website", label: "Website" },
  { key: "address", label: "Address" },
  { key: "hours", label: "Working Hours" },
  { key: "stat_certified", label: "Stat: Certified (e.g. 100%)" },
  { key: "stat_years", label: "Stat: Years (e.g. 25+)" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [content, setContent] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then((r) => {
        setUser(r.data);
        return Promise.all([fetchLeads(), fetchContent()]);
      })
      .then(([l, c]) => {
        setLeads(l.data);
        setContent(c.data);
      })
      .catch(() => navigate("/admin/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const onLogout = async () => {
    try { await logout(); } catch {}
    navigate("/admin/login");
  };

  const onDelete = async (id) => {
    try {
      await deleteLead(id);
      setLeads(leads.filter((l) => l.id !== id));
      toast.success("Lead deleted");
    } catch (err) {
      toast.error(formatApiError(err));
    }
  };

  const onSaveContent = async () => {
    setSaving(true);
    try {
      await updateContent(content);
      toast.success("Page content updated — live on the site now");
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="min-h-screen px-5 sm:px-8 py-8 max-w-7xl mx-auto">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
            <Flower2 className="text-primary" size={18} />
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold">Rudralife Admin</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <button
          data-testid="admin-logout-button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
        >
          <LogOut size={15} /> Logout
        </button>
      </header>

      <div className="flex gap-3 mb-8">
        <button
          data-testid="admin-tab-leads"
          onClick={() => setTab("leads")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            tab === "leads" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
          }`}
        >
          <Users size={15} /> Leads ({leads.length})
        </button>
        <button
          data-testid="admin-tab-content"
          onClick={() => setTab("content")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
            tab === "content" ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary/40"
          }`}
        >
          <FileText size={15} /> Edit Page Content
        </button>
      </div>

      {tab === "leads" && (
        <div data-testid="admin-leads-panel" className="space-y-4">
          {leads.length === 0 && (
            <p className="text-muted-foreground text-sm glass rounded-2xl p-10 text-center">
              No enquiries yet. New form submissions will appear here instantly.
            </p>
          )}
          {leads.map((l) => (
            <div key={l.id} data-testid={`lead-card-${l.id}`} className="glass rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-3 flex-wrap">
                  <p className="font-display text-lg font-bold">{l.name}</p>
                  <span className="text-[10px] uppercase tracking-widest text-primary border border-primary/40 rounded-full px-2 py-0.5">
                    {l.profession}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{l.email} · {l.phone} · {l.city}</p>
                {l.message && <p className="text-sm text-foreground/80 leading-relaxed">"{l.message}"</p>}
                <p className="text-[11px] text-muted-foreground/70">
                  {new Date(l.created_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
              <button
                data-testid={`lead-delete-${l.id}`}
                onClick={() => onDelete(l.id)}
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-destructive/50 text-destructive-foreground text-xs hover:bg-destructive/30 transition-colors"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "content" && (
        <div data-testid="admin-content-panel" className="glass rounded-3xl p-6 sm:p-9 space-y-5 max-w-3xl">
          <p className="text-sm text-muted-foreground">
            Edit the live page content below. Changes appear on the landing page immediately after saving.
          </p>
          {CONTENT_FIELDS.map((f) => (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={`content-${f.key}`} className="text-sm">{f.label}</Label>
              {f.textarea ? (
                <Textarea
                  id={`content-${f.key}`}
                  data-testid={`content-input-${f.key}`}
                  rows={3}
                  value={content[f.key] || ""}
                  onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                  className="bg-background/60 border-input resize-none"
                />
              ) : (
                <Input
                  id={`content-${f.key}`}
                  data-testid={`content-input-${f.key}`}
                  value={content[f.key] || ""}
                  onChange={(e) => setContent({ ...content, [f.key]: e.target.value })}
                  className="bg-background/60 border-input h-11"
                />
              )}
            </div>
          ))}
          <button
            data-testid="content-save-button"
            onClick={onSaveContent}
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-[#e5c04a] transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}
