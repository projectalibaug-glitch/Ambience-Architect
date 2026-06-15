import { useState } from "react";

// ── Brand tokens ──────────────────────────────────────────────────────────
// Black (#0A0A0A) base, gold (#C9A13B) primary accent, warm white (#F5F0E8) canvas
// Laurel wreath SVG inline logo matching uploaded brand identity

const B = {
  black: "#0A0A0A",
  blackSoft: "#141414",
  blackCard: "#1A1A1A",
  gold: "#C9A13B",
  goldLight: "#E8D08A",
  goldDark: "#8B6A1A",
  goldBg: "rgba(201,161,59,0.08)",
  goldBorder: "rgba(201,161,59,0.25)",
  canvas: "#F5F0E8",
  canvasDark: "#EDE7D8",
  white: "#FFFFFF",
  text: "#1A1208",
  muted: "#6B6355",
  border: "#D8D0C0",
  green: "#2E7D52",
  greenBg: "#E8F5EE",
  red: "#C0392B",
  redBg: "#FDECEA",
  blue: "#1A6FA8",
  blueBg: "#E8F2FA",
};

const css = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui,-apple-system,sans-serif; background:${B.canvas}; color:${B.text}; min-height:100vh; }

/* ── Layout ── */
.app { display:flex; min-height:100vh; }
.sidebar {
  width:252px; min-width:252px; background:${B.black}; color:#fff;
  display:flex; flex-direction:column; position:fixed; top:0; left:0; height:100vh; z-index:100;
  border-right:1px solid rgba(201,161,59,0.15);
}
.main { margin-left:252px; flex:1; display:flex; flex-direction:column; min-height:100vh; }

/* ── Sidebar brand ── */
.brand {
  padding:28px 20px 22px;
  border-bottom:1px solid rgba(201,161,59,0.15);
  display:flex; flex-direction:column; align-items:center; gap:10px;
}
.brand-name {
  font-family:Georgia,serif; font-size:13.5px; font-weight:normal;
  color:${B.gold}; letter-spacing:2px; text-transform:uppercase; text-align:center; line-height:1.4;
}
.brand-sub { font-size:10px; color:rgba(255,255,255,0.3); letter-spacing:1.5px; text-transform:uppercase; }

/* ── Nav ── */
.nav-section { padding:18px 0 6px; }
.nav-label { font-size:9.5px; color:rgba(255,255,255,0.25); letter-spacing:2px; text-transform:uppercase; padding:0 20px 8px; }
.nav-item {
  display:flex; align-items:center; gap:10px; padding:10px 20px;
  cursor:pointer; font-size:13px; color:rgba(255,255,255,0.55);
  transition:all 0.15s; border-left:2px solid transparent; line-height:1;
}
.nav-item:hover { color:rgba(255,255,255,0.9); background:rgba(255,255,255,0.04); }
.nav-item.active { color:${B.gold}; border-left-color:${B.gold}; background:rgba(201,161,59,0.07); }
.nav-icon { font-size:15px; width:18px; text-align:center; opacity:0.9; }
.nav-divider { height:1px; background:rgba(255,255,255,0.06); margin:8px 20px; }

/* Project selector in sidebar */
.proj-list { padding:8px 12px; }
.proj-chip {
  display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:6px;
  cursor:pointer; font-size:12.5px; color:rgba(255,255,255,0.5); transition:all 0.15s; margin-bottom:2px;
}
.proj-chip:hover { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.85); }
.proj-chip.active { background:rgba(201,161,59,0.12); color:${B.gold}; }
.proj-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; }

/* ── Topbar ── */
.topbar {
  background:${B.white}; border-bottom:1px solid ${B.border};
  padding:14px 32px; display:flex; align-items:center; justify-content:space-between;
  position:sticky; top:0; z-index:50;
}
.topbar-title { font-family:Georgia,serif; font-size:20px; color:${B.black}; }
.topbar-sub { font-size:12px; color:${B.muted}; margin-top:2px; }
.status-dot { width:8px; height:8px; border-radius:50%; background:${B.green}; display:inline-block; margin-right:6px; }

/* ── Content ── */
.content { padding:28px 32px; flex:1; }

/* ── Cards ── */
.card { background:${B.white}; border:1px solid ${B.border}; border-radius:8px; padding:22px; }
.card-gold { border-top:3px solid ${B.gold}; }
.card-title { font-family:Georgia,serif; font-size:15px; color:${B.black}; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; }

/* ── Stats ── */
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
.stat { background:${B.white}; border:1px solid ${B.border}; border-radius:8px; padding:18px; }
.stat-label { font-size:10.5px; color:${B.muted}; text-transform:uppercase; letter-spacing:1px; }
.stat-value { font-size:26px; font-family:Georgia,serif; color:${B.black}; margin-top:5px; line-height:1; }
.stat-sub { font-size:11.5px; color:${B.muted}; margin-top:5px; }
.t-gold { border-top:3px solid ${B.gold}; }
.t-green { border-top:3px solid ${B.green}; }
.t-red { border-top:3px solid ${B.red}; }
.t-black { border-top:3px solid ${B.black}; }

/* ── Grid ── */
.g2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.g3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }

/* ── Table ── */
.tbl-wrap { overflow-x:auto; }
table { width:100%; border-collapse:collapse; font-size:13px; }
th { background:${B.canvasDark}; color:${B.black}; font-size:10.5px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; padding:9px 13px; text-align:left; border-bottom:2px solid ${B.border}; }
td { padding:10px 13px; border-bottom:1px solid ${B.canvasDark}; vertical-align:middle; }
tr:last-child td { border-bottom:none; }
tr:hover td { background:${B.canvas}; }

/* ── Badge ── */
.badge { display:inline-block; font-size:10.5px; font-weight:700; padding:3px 9px; border-radius:20px; letter-spacing:0.4px; }
.bg { background:${B.greenBg}; color:${B.green}; }
.by { background:#FDF3D8; color:#7A5500; }
.br { background:${B.redBg}; color:${B.red}; }
.bb { background:${B.blueBg}; color:${B.blue}; }
.bgr { background:${B.canvasDark}; color:${B.muted}; }

/* ── Buttons ── */
.btn { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:600; cursor:pointer; border:none; transition:all 0.15s; font-family:inherit; }
.btn-gold { background:${B.gold}; color:${B.black}; }
.btn-gold:hover { background:#b88e2f; }
.btn-outline { background:transparent; color:${B.black}; border:1px solid ${B.border}; font-weight:500; }
.btn-outline:hover { background:${B.canvas}; }
.btn-sm { padding:5px 12px; font-size:12px; }
.btn-dark { background:${B.black}; color:${B.gold}; }
.btn-dark:hover { background:#222; }

/* ── Form ── */
input,select,textarea { width:100%; padding:8px 11px; border:1px solid ${B.border}; border-radius:6px; font-size:13px; font-family:inherit; background:${B.white}; color:${B.text}; transition:border-color 0.15s; }
input:focus,select:focus,textarea:focus { outline:none; border-color:${B.gold}; }
label { font-size:11px; font-weight:700; color:${B.black}; display:block; margin-bottom:5px; text-transform:uppercase; letter-spacing:0.5px; }
.fg { margin-bottom:14px; }
.fr { display:grid; grid-template-columns:1fr 1fr; gap:12px; }

/* ── Modal ── */
.overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:300; }
.modal { background:${B.white}; border-radius:10px; width:540px; max-width:95vw; max-height:85vh; overflow-y:auto; }
.modal-hd { padding:18px 22px; border-bottom:1px solid ${B.border}; display:flex; align-items:center; justify-content:space-between; }
.modal-title { font-family:Georgia,serif; font-size:17px; color:${B.black}; }
.modal-bd { padding:22px; }
.modal-ft { padding:14px 22px; border-top:1px solid ${B.border}; display:flex; gap:8px; justify-content:flex-end; }
.close-x { background:none; border:none; font-size:22px; cursor:pointer; color:${B.muted}; line-height:1; padding:0 4px; }

/* ── Progress ── */
.pbar { background:${B.canvasDark}; border-radius:4px; height:7px; overflow:hidden; }
.pfill { height:100%; background:${B.gold}; border-radius:4px; transition:width 0.3s; }

/* ── Misc ── */
.tr { text-align:right; }
.mono { font-family:'Courier New',monospace; }
.cr { color:${B.green}; font-weight:700; }
.dr { color:${B.red}; font-weight:700; }
.tag { display:inline-block; background:${B.goldBg}; color:${B.goldDark}; font-size:10.5px; padding:2px 8px; border-radius:4px; font-weight:700; border:1px solid ${B.goldBorder}; }
.sec-head { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; }
.sec-title { font-family:Georgia,serif; font-size:20px; color:${B.black}; }
.sec-sub { font-size:12.5px; color:${B.muted}; margin-top:3px; }
.tabs { display:flex; gap:2px; margin-bottom:20px; background:${B.canvasDark}; border-radius:8px; padding:3px; width:fit-content; }
.tab { padding:6px 16px; border-radius:6px; font-size:13px; cursor:pointer; color:${B.muted}; font-weight:500; transition:all 0.15s; }
.tab.active { background:${B.white}; color:${B.black}; font-weight:700; box-shadow:0 1px 3px rgba(0,0,0,0.08); }
.mb16 { margin-bottom:16px; }
.mb24 { margin-bottom:24px; }
.divider { border:none; border-top:1px solid ${B.border}; margin:16px 0; }
.empty { text-align:center; padding:48px 24px; color:${B.muted}; }
.att-grid { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
.att-dot { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; cursor:pointer; }
.ap { background:${B.green}; color:#fff; }
.ah { background:${B.gold}; color:${B.black}; }
.aa { background:${B.red}; color:#fff; }
.au { background:${B.canvasDark}; color:${B.muted}; border:2px dashed ${B.border}; }

/* Projects screen */
.proj-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; }
.proj-card {
  background:${B.white}; border:1px solid ${B.border}; border-radius:10px;
  padding:22px; cursor:pointer; transition:all 0.18s; position:relative; overflow:hidden;
}
.proj-card:hover { border-color:${B.gold}; box-shadow:0 4px 16px rgba(201,161,59,0.12); }
.proj-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:${B.gold}; }
.proj-status-bar { display:flex; align-items:center; justify-content:space-between; margin-top:14px; }
`;

// ── Data helpers ─────────────────────────────────────────────────────────
const TODAY = new Date().toISOString().split("T")[0];
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const stColor = (s) => ({ Completed: "bg", "In Progress": "bb", Pending: "by", Delayed: "br" }[s] || "bgr");

const DEMO_PROJECT = {
  id: 1,
  name: "Kapoor Penthouse",
  location: "Juhu, Mumbai",
  area: "4,100 sq ft",
  budget: 6500000,
  startDate: "2026-04-15",
  endDate: "2026-10-31",
  completion: 42,
  color: B.gold,
  tasks: [
    { id: 1, title: "False ceiling — Living Room", category: "Civil", assignee: "Ramesh & Co", status: "In Progress", priority: "High", due: "2026-06-25", progress: 65, notes: "Grid done, boards pending" },
    { id: 2, title: "Electrical rough-in", category: "Electrical", assignee: "Vinod Electricals", status: "Completed", priority: "High", due: "2026-06-10", progress: 100, notes: "" },
    { id: 3, title: "Kitchen cabinets", category: "Carpentry", assignee: "Mehta Woodworks", status: "Pending", priority: "High", due: "2026-07-10", progress: 0, notes: "Material awaited" },
    { id: 4, title: "Master bath tiling", category: "Tiling", assignee: "Raju Tiles", status: "In Progress", priority: "Medium", due: "2026-06-28", progress: 50, notes: "" },
  ],
  contractors: [
    { id: 1, name: "Ramesh & Co", trade: "Civil & Masonry", contact: "9820001122", rate: "₹700/day", status: "Active" },
    { id: 2, name: "Vinod Electricals", trade: "Electrical", contact: "9833445566", rate: "₹800/day", status: "Active" },
    { id: 3, name: "Mehta Woodworks", trade: "Carpentry", contact: "9810223344", rate: "Fixed", status: "Active" },
    { id: 4, name: "Raju Tiles", trade: "Tiling", contact: "9867788990", rate: "₹600/day", status: "Active" },
  ],
  attendance: [
    { id: 1, contractorId: 1, date: TODAY, workers: [{ name: "Ramesh", status: "P" }, { name: "Helper 1", status: "P" }, { name: "Helper 2", status: "H" }] },
    { id: 2, contractorId: 4, date: TODAY, workers: [{ name: "Raju", status: "P" }, { name: "Tile Helper", status: "A" }] },
  ],
  materials: [
    { id: 1, name: "Gypsum Board 4×8ft", category: "Civil", unit: "Sheets", required: 140, received: 90, pending: 50, unitCost: 380, vendor: "Gyproc India" },
    { id: 2, name: "Wire 2.5mm", category: "Electrical", unit: "Meters", required: 700, received: 700, pending: 0, unitCost: 32, vendor: "Havells" },
    { id: 3, name: "Italian Marble 24×24", category: "Flooring", unit: "Sq ft", required: 560, received: 560, pending: 0, unitCost: 240, vendor: "Stone World" },
  ],
  ledger: [
    { id: 1, date: "2026-04-20", description: "Client Advance — Stage 1", type: "CR", amount: 1500000, category: "Receipt", ref: "CHQ-001" },
    { id: 2, date: "2026-05-05", description: "Civil mobilization — Ramesh", type: "DR", amount: 95000, category: "Labour", ref: "PMT-001" },
    { id: 3, date: "2026-05-18", description: "Electrical materials", type: "DR", amount: 74000, category: "Material", ref: "PMT-002" },
    { id: 4, date: "2026-05-30", description: "Client Advance — Stage 2", type: "CR", amount: 1000000, category: "Receipt", ref: "CHQ-002" },
    { id: 5, date: "2026-06-08", description: "Marble supply — Stone World", type: "DR", amount: 134400, category: "Material", ref: "PMT-003" },
    { id: 6, date: "2026-06-12", description: "Labour — Tile & Civil", type: "DR", amount: 82000, category: "Labour", ref: "PMT-004" },
  ],
  updates: [
    { id: 1, date: "2026-06-14", contractor: "Ramesh & Co", message: "Living room false ceiling grid 100% done. Starting boards tomorrow. Need 50 more gypsum sheets by Monday.", photos: 0 },
    { id: 2, date: "2026-06-13", contractor: "Raju Tiles", message: "Master bathroom 50% tiled. Cut tiles near window pending. Will complete by Friday.", photos: 0 },
  ],
  quotes: [
    { id: 1, workItem: "False Ceiling — Living & Dining", contractor: "Ramesh & Co", clientQuote: 185000, contractorQuote: 140000, paidToContractor: 70000 },
    { id: 2, workItem: "Electrical Works — Full Flat", contractor: "Vinod Electricals", clientQuote: 220000, contractorQuote: 175000, paidToContractor: 175000 },
    { id: 3, workItem: "Master Bath Tiling", contractor: "Raju Tiles", clientQuote: 95000, contractorQuote: 72000, paidToContractor: 36000 },
    { id: 4, workItem: "Kitchen Cabinets & Wardrobe", contractor: "Mehta Woodworks", clientQuote: 380000, contractorQuote: 310000, paidToContractor: 0 },
  ],
};

// ── Shared Modal ──────────────────────────────────────────────────────────
function Modal({ title, onClose, children, footer }) {
  return (
    <div className="overlay" onClick={e => e.target.className === "overlay" && onClose()}>
      <div className="modal">
        <div className="modal-hd">
          <span className="modal-title">{title}</span>
          <button className="close-x" onClick={onClose}>×</button>
        </div>
        <div className="modal-bd">{children}</div>
        {footer && <div className="modal-ft">{footer}</div>}
      </div>
    </div>
  );
}

// ── PROJECTS SCREEN ───────────────────────────────────────────────────────
function Projects({ projects, setProjects, onOpen }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", area: "", budget: "", startDate: "", endDate: "" });

  const create = () => {
    if (!form.name.trim()) return;
    const p = { ...BLANK_PROJECT(), ...form, budget: Number(form.budget) || 0, id: Date.now() };
    setProjects(ps => [...ps, p]);
    setModal(false);
    setForm({ name: "", location: "", area: "", budget: "", startDate: "", endDate: "" });
  };

  const del = (e, id) => {
    e.stopPropagation();
    if (confirm("Delete this project? This cannot be undone.")) setProjects(ps => ps.filter(p => p.id !== id));
  };

  return (
    <div>
      <div className="sec-head">
        <div>
          <div className="sec-title">All Projects</div>
          <div className="sec-sub">{projects.length} project{projects.length !== 1 ? "s" : ""} · Ambience Architects</div>
        </div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>+ New Project</button>
      </div>

      {projects.length === 0 ? (
        <div className="empty"><div style={{ fontSize: 36, marginBottom: 12 }}>🏗️</div><div>No projects yet. Create your first one.</div></div>
      ) : (
        <div className="proj-grid">
          {projects.map(p => {
            const spent = p.ledger.filter(l => l.type === "DR").reduce((s, l) => s + l.amount, 0);
            const done = p.tasks.filter(t => t.status === "Completed").length;
            return (
              <div className="proj-card" key={p.id} onClick={() => onOpen(p.id)} style={{ "--acc": p.color }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: p.color }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ fontFamily: "Georgia,serif", fontSize: 16, color: B.black, flex: 1, paddingRight: 8 }}>{p.name}</div>
                  <button onClick={e => del(e, p.id)} style={{ background: "none", border: "none", color: B.muted, cursor: "pointer", fontSize: 16, padding: "0 2px" }}>×</button>
                </div>
                <div style={{ fontSize: 12, color: B.muted, marginBottom: 14 }}>📍 {p.location || "No location"} · 📐 {p.area || "—"}</div>
                <div className="proj-status-bar">
                  <div>
                    <div style={{ fontSize: 11, color: B.muted, marginBottom: 3 }}>Budget</div>
                    <div style={{ fontSize: 15, fontFamily: "Georgia,serif", color: B.black }}>{p.budget ? fmt(p.budget) : "—"}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 11, color: B.muted, marginBottom: 3 }}>Progress</div>
                    <div style={{ fontSize: 20, fontFamily: "Georgia,serif", color: p.color }}>{p.completion}%</div>
                  </div>
                </div>
                <div className="pbar" style={{ marginTop: 12 }}>
                  <div className="pfill" style={{ width: `${p.completion}%`, background: p.color }} />
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 12, color: B.muted }}>
                  <span>✅ {done}/{p.tasks.length} tasks</span>
                  <span>💰 {fmt(spent)} spent</span>
                  <span>👷 {p.contractors.length} contractors</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal && (
        <Modal title="Create New Project" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={create}>Create Project</button></>}>
          <div className="fg"><label>Project Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Sharma Residence — Bandra" /></div>
          <div className="fr">
            <div className="fg"><label>Location</label><input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. Bandra West, Mumbai" /></div>
            <div className="fg"><label>Area</label><input value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} placeholder="e.g. 2,400 sq ft" /></div>
          </div>
          <div className="fg"><label>Total Budget (₹)</label><input type="number" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} placeholder="5000000" /></div>
          <div className="fr">
            <div className="fg"><label>Start Date</label><input type="date" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></div>
            <div className="fg"><label>End Date</label><input type="date" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} /></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function Dashboard({ proj }) {
  const totalCR = proj.ledger.filter(l => l.type === "CR").reduce((s, l) => s + l.amount, 0);
  const totalDR = proj.ledger.filter(l => l.type === "DR").reduce((s, l) => s + l.amount, 0);
  const todayPresent = proj.attendance.filter(a => a.date === TODAY).reduce((s, a) => s + a.workers.filter(w => w.status === "P").length, 0);

  return (
    <div>
      <div className="card card-gold mb24">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: B.black }}>{proj.name}</div>
            <div style={{ fontSize: 12.5, color: B.muted, marginTop: 5 }}>📍 {proj.location} &nbsp;·&nbsp; 📐 {proj.area} &nbsp;·&nbsp; 📅 {proj.startDate} → {proj.endDate}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: B.muted }}>Overall Completion</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 34, color: proj.color || B.gold, marginTop: 2 }}>{proj.completion}%</div>
            <div className="pbar" style={{ width: 160, marginTop: 6 }}><div className="pfill" style={{ width: `${proj.completion}%`, background: proj.color || B.gold }} /></div>
          </div>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat t-gold"><div className="stat-label">Budget</div><div className="stat-value" style={{ fontSize: 20 }}>{fmt(proj.budget)}</div></div>
        <div className="stat t-green"><div className="stat-label">Received</div><div className="stat-value" style={{ fontSize: 20 }}>{fmt(totalCR)}</div><div className="stat-sub">{pct(totalCR, proj.budget)}% of budget</div></div>
        <div className="stat t-red"><div className="stat-label">Spent</div><div className="stat-value" style={{ fontSize: 20 }}>{fmt(totalDR)}</div><div className="stat-sub">{pct(totalDR, proj.budget)}% of budget</div></div>
        <div className="stat t-black"><div className="stat-label">Cash in Hand</div><div className="stat-value" style={{ fontSize: 20 }}>{fmt(totalCR - totalDR)}</div></div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-title">Task Overview</div>
          {["Completed", "In Progress", "Pending", "Delayed"].map(s => {
            const c = proj.tasks.filter(t => t.status === s).length;
            const cols = { Completed: B.green, "In Progress": B.blue, Pending: B.gold, Delayed: B.red };
            return (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span className={`badge ${stColor(s)}`} style={{ width: 86, textAlign: "center", fontSize: 10 }}>{s}</span>
                <div className="pbar" style={{ flex: 1 }}><div className="pfill" style={{ width: `${pct(c, proj.tasks.length)}%`, background: cols[s] }} /></div>
                <span style={{ fontSize: 13, fontWeight: 700, width: 18 }}>{c}</span>
              </div>
            );
          })}
          <hr className="divider" />
          <div style={{ display: "flex", gap: 24 }}>
            <div><div className="stat-label">Workers Today</div><div style={{ fontSize: 22, fontFamily: "Georgia,serif", color: B.black, marginTop: 4 }}>{todayPresent}</div></div>
            <div><div className="stat-label">Pending Materials</div><div style={{ fontSize: 22, fontFamily: "Georgia,serif", color: B.red, marginTop: 4 }}>{proj.materials.filter(m => m.pending > 0).length}</div></div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">Latest Updates</div>
          {proj.updates.length === 0 ? <div style={{ color: B.muted, fontSize: 13 }}>No updates yet.</div> :
            proj.updates.slice(0, 3).map(u => (
              <div key={u.id} style={{ borderBottom: `1px solid ${B.canvasDark}`, paddingBottom: 11, marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: B.black }}>{u.contractor}</span>
                  <span style={{ fontSize: 11, color: B.muted }}>{u.date}</span>
                </div>
                <p style={{ fontSize: 13, color: B.text, lineHeight: 1.5 }}>{u.message}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

// ── TASKS ─────────────────────────────────────────────────────────────────
function Tasks({ proj, update }) {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ title: "", category: "Civil", assignee: "", status: "Pending", priority: "High", due: "", progress: 0, notes: "" });
  const cats = ["Civil", "Electrical", "Carpentry", "Tiling", "Flooring", "Painting", "Plumbing", "Furniture", "Other"];

  const filtered = filter === "All" ? proj.tasks : proj.tasks.filter(t => t.status === filter);

  const add = () => {
    update(p => ({ ...p, tasks: [...p.tasks, { ...form, id: Date.now(), progress: Number(form.progress) }] }));
    setModal(false); setForm({ title: "", category: "Civil", assignee: "", status: "Pending", priority: "High", due: "", progress: 0, notes: "" });
  };

  const setProgress = (id, v) => update(p => ({
    ...p, tasks: p.tasks.map(t => t.id === id ? { ...t, progress: Number(v), status: Number(v) === 100 ? "Completed" : t.status } : t)
  }));

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Task Tracker</div><div className="sec-sub">{proj.tasks.length} tasks · {proj.tasks.filter(t => t.status === "Completed").length} completed</div></div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>+ Add Task</button>
      </div>
      <div className="tabs">
        {["All", "Pending", "In Progress", "Completed", "Delayed"].map(s => <div key={s} className={`tab ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>{s}</div>)}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Task</th><th>Category</th><th>Assigned To</th><th>Priority</th><th>Due</th><th>Progress</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.length === 0 ? <tr><td colSpan={7} style={{ textAlign: "center", color: B.muted, padding: 32 }}>No tasks.</td></tr> :
                filtered.map(t => (
                  <tr key={t.id}>
                    <td><div style={{ fontWeight: 700, color: B.black }}>{t.title}</div>{t.notes && <div style={{ fontSize: 11, color: B.muted }}>{t.notes}</div>}</td>
                    <td><span className="tag">{t.category}</span></td>
                    <td style={{ fontSize: 12 }}>{t.assignee}</td>
                    <td><span className={`badge ${t.priority === "High" ? "br" : t.priority === "Medium" ? "by" : "bgr"}`}>{t.priority}</span></td>
                    <td style={{ fontSize: 12 }}>{t.due}</td>
                    <td style={{ width: 150 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="pbar" style={{ flex: 1 }}><div className="pfill" style={{ width: `${t.progress}%`, background: t.progress === 100 ? B.green : B.gold }} /></div>
                        <span style={{ fontSize: 11, fontWeight: 700, width: 28 }}>{t.progress}%</span>
                      </div>
                      <input type="range" min="0" max="100" step="5" value={t.progress} onChange={e => setProgress(t.id, e.target.value)} style={{ width: "100%", padding: 0, height: 4, marginTop: 4 }} />
                    </td>
                    <td><span className={`badge ${stColor(t.status)}`}>{t.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <Modal title="Add Task" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Add Task</button></>}>
          <div className="fg"><label>Task Title</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Install false ceiling — Bedroom 2" /></div>
          <div className="fr">
            <div className="fg"><label>Category</label><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{cats.map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label>Priority</label><select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}><option>High</option><option>Medium</option><option>Low</option></select></div>
          </div>
          <div className="fr">
            <div className="fg"><label>Assigned To</label><input value={form.assignee} onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))} placeholder="Contractor name" /></div>
            <div className="fg"><label>Due Date</label><input type="date" value={form.due} onChange={e => setForm(f => ({ ...f, due: e.target.value }))} /></div>
          </div>
          <div className="fg"><label>Notes</label><textarea rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} /></div>
        </Modal>
      )}
    </div>
  );
}

// ── ATTENDANCE ────────────────────────────────────────────────────────────
function Attendance({ proj, update }) {
  const [date, setDate] = useState(TODAY);
  const [workerModal, setWorkerModal] = useState(null);
  const [newW, setNewW] = useState("");

  const dayRec = proj.attendance.filter(a => a.date === date);
  const totalP = dayRec.reduce((s, a) => s + a.workers.filter(w => w.status === "P").length, 0);
  const totalH = dayRec.reduce((s, a) => s + a.workers.filter(w => w.status === "H").length, 0);
  const totalA = dayRec.reduce((s, a) => s + a.workers.filter(w => w.status === "A").length, 0);

  const toggle = (cId, name) => update(p => ({
    ...p, attendance: p.attendance.map(a =>
      a.contractorId === cId && a.date === date
        ? { ...a, workers: a.workers.map(w => w.name === name ? { ...w, status: w.status === "P" ? "H" : w.status === "H" ? "A" : "P" } : w) }
        : a
    )
  }));

  const startAtt = (cId) => {
    if (!dayRec.find(a => a.contractorId === cId))
      update(p => ({ ...p, attendance: [...p.attendance, { id: Date.now(), contractorId: cId, date, workers: [] }] }));
  };

  const addWorker = (cId) => {
    if (!newW.trim()) return;
    update(p => ({ ...p, attendance: p.attendance.map(a => a.contractorId === cId && a.date === date ? { ...a, workers: [...a.workers, { name: newW, status: "P" }] } : a) }));
    setNewW(""); setWorkerModal(null);
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Attendance Register</div><div className="sec-sub">Daily worker tracking · click dot to toggle status</div></div>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: 160 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, maxWidth: 460, marginBottom: 24 }}>
        <div className="stat t-green"><div className="stat-label">Present</div><div className="stat-value">{totalP}</div></div>
        <div className="stat t-gold"><div className="stat-label">Half Day</div><div className="stat-value">{totalH}</div></div>
        <div className="stat t-red"><div className="stat-label">Absent</div><div className="stat-value">{totalA}</div></div>
      </div>
      {proj.contractors.filter(c => c.status === "Active").length === 0
        ? <div className="empty">Add contractors first from the Contractors section.</div>
        : proj.contractors.filter(c => c.status === "Active").map(c => {
          const rec = dayRec.find(a => a.contractorId === c.id);
          return (
            <div className="card mb16" key={c.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div><div style={{ fontWeight: 700, color: B.black }}>{c.name}</div><div style={{ fontSize: 12, color: B.muted }}>{c.trade}</div></div>
                {!rec ? <button className="btn btn-outline btn-sm" onClick={() => startAtt(c.id)}>+ Start Attendance</button>
                  : <button className="btn btn-outline btn-sm" onClick={() => setWorkerModal(c.id)}>+ Add Worker</button>}
              </div>
              {rec ? (
                <>
                  <div className="att-grid">
                    {rec.workers.map(w => (
                      <div key={w.name} className={`att-dot ${w.status === "P" ? "ap" : w.status === "H" ? "ah" : "aa"}`}
                        onClick={() => toggle(c.id, w.name)} title={`${w.name} — click to toggle`}>
                        {w.name.charAt(0).toUpperCase()}
                      </div>
                    ))}
                    {rec.workers.length === 0 && <div style={{ fontSize: 13, color: B.muted }}>No workers added yet.</div>}
                  </div>
                  <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
                    {rec.workers.map(w => (
                      <div key={w.name} style={{ fontSize: 12, color: B.muted }}>
                        <b style={{ color: B.black }}>{w.name}</b> — {w.status === "P" ? "Present" : w.status === "H" ? "Half Day" : "Absent"}
                      </div>
                    ))}
                  </div>
                </>
              ) : <div style={{ fontSize: 13, color: B.muted }}>No attendance recorded.</div>}
              {workerModal === c.id && (
                <Modal title={`Add Worker — ${c.name}`} onClose={() => setWorkerModal(null)}
                  footer={<><button className="btn btn-outline" onClick={() => setWorkerModal(null)}>Cancel</button><button className="btn btn-gold" onClick={() => addWorker(c.id)}>Add</button></>}>
                  <div className="fg"><label>Worker Name</label><input value={newW} onChange={e => setNewW(e.target.value)} placeholder="e.g. Helper 3" /></div>
                </Modal>
              )}
            </div>
          );
        })}
    </div>
  );
}

// ── CONTRACTORS ───────────────────────────────────────────────────────────
function Contractors({ proj, update }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", trade: "", contact: "", rate: "", status: "Active" });

  const add = () => {
    update(p => ({ ...p, contractors: [...p.contractors, { ...form, id: Date.now() }] }));
    setModal(false); setForm({ name: "", trade: "", contact: "", rate: "", status: "Active" });
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Contractors</div><div className="sec-sub">{proj.contractors.length} registered</div></div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>+ Add Contractor</button>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Name</th><th>Trade</th><th>Contact</th><th>Rate</th><th>Status</th></tr></thead>
            <tbody>
              {proj.contractors.length === 0 ? <tr><td colSpan={5} style={{ textAlign: "center", color: B.muted, padding: 32 }}>No contractors added.</td></tr> :
                proj.contractors.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 700, color: B.black }}>{c.name}</td>
                    <td><span className="tag">{c.trade}</span></td>
                    <td style={{ fontSize: 13 }}>{c.contact}</td>
                    <td style={{ fontSize: 13 }}>{c.rate}</td>
                    <td><span className={`badge ${c.status === "Active" ? "bg" : "bgr"}`}>{c.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <Modal title="Add Contractor" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Add</button></>}>
          <div className="fg"><label>Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Mehta Woodworks" /></div>
          <div className="fr">
            <div className="fg"><label>Trade</label><input value={form.trade} onChange={e => setForm(f => ({ ...f, trade: e.target.value }))} placeholder="e.g. Carpentry" /></div>
            <div className="fg"><label>Contact</label><input value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="Mobile number" /></div>
          </div>
          <div className="fr">
            <div className="fg"><label>Daily Rate</label><input value={form.rate} onChange={e => setForm(f => ({ ...f, rate: e.target.value }))} placeholder="e.g. ₹700/day" /></div>
            <div className="fg"><label>Status</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}><option>Active</option><option>Upcoming</option><option>Completed</option></select></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── MATERIALS ─────────────────────────────────────────────────────────────
function Materials({ proj, update }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", category: "Civil", unit: "Nos", required: "", received: 0, unitCost: "", vendor: "" });

  const totalVal = proj.materials.reduce((s, m) => s + m.required * m.unitCost, 0);
  const recVal = proj.materials.reduce((s, m) => s + m.received * m.unitCost, 0);

  const add = () => {
    const req = Number(form.required), rec = Number(form.received);
    update(p => ({ ...p, materials: [...p.materials, { ...form, id: Date.now(), required: req, received: rec, pending: req - rec, unitCost: Number(form.unitCost) }] }));
    setModal(false);
  };

  const setRec = (id, v) => update(p => ({ ...p, materials: p.materials.map(m => m.id === id ? { ...m, received: Number(v), pending: m.required - Number(v) } : m) }));

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Material Tracker</div><div className="sec-sub">Procurement & delivery status</div></div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>+ Add Material</button>
      </div>
      <div className="stats-row">
        <div className="stat t-gold"><div className="stat-label">Total Value</div><div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalVal)}</div></div>
        <div className="stat t-green"><div className="stat-label">Received</div><div className="stat-value" style={{ fontSize: 18 }}>{fmt(recVal)}</div></div>
        <div className="stat t-red"><div className="stat-label">Pending</div><div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalVal - recVal)}</div></div>
        <div className="stat t-black"><div className="stat-label">Items Pending</div><div className="stat-value">{proj.materials.filter(m => m.pending > 0).length}</div></div>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Material</th><th>Category</th><th>Vendor</th><th>Unit</th><th>Required</th><th>Received</th><th>Pending</th><th>Unit Cost</th><th>Status</th></tr></thead>
            <tbody>
              {proj.materials.length === 0 ? <tr><td colSpan={9} style={{ textAlign: "center", color: B.muted, padding: 32 }}>No materials added.</td></tr> :
                proj.materials.map(m => (
                  <tr key={m.id}>
                    <td style={{ fontWeight: 700, color: B.black }}>{m.name}</td>
                    <td><span className="tag">{m.category}</span></td>
                    <td style={{ fontSize: 12 }}>{m.vendor}</td>
                    <td style={{ fontSize: 12 }}>{m.unit}</td>
                    <td className="tr">{m.required}</td>
                    <td><input type="number" value={m.received} min={0} max={m.required} onChange={e => setRec(m.id, e.target.value)} style={{ width: 70, padding: "4px 8px", textAlign: "right" }} /></td>
                    <td className="tr" style={{ color: m.pending > 0 ? B.red : B.green, fontWeight: 700 }}>{m.pending}</td>
                    <td className="tr mono" style={{ fontSize: 12 }}>{fmt(m.unitCost)}</td>
                    <td><span className={`badge ${m.pending === 0 ? "bg" : m.received > 0 ? "by" : "br"}`}>{m.pending === 0 ? "Received" : m.received > 0 ? "Partial" : "Pending"}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <Modal title="Add Material" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Add</button></>}>
          <div className="fg"><label>Material Name</label><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Italian Marble 24×24" /></div>
          <div className="fr">
            <div className="fg"><label>Category</label><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{["Civil","Electrical","Carpentry","Tiling","Flooring","Painting","Plumbing"].map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label>Unit</label><input value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="Sheets / Litres / Sq ft" /></div>
          </div>
          <div className="fr">
            <div className="fg"><label>Qty Required</label><input type="number" value={form.required} onChange={e => setForm(f => ({ ...f, required: e.target.value }))} /></div>
            <div className="fg"><label>Unit Cost (₹)</label><input type="number" value={form.unitCost} onChange={e => setForm(f => ({ ...f, unitCost: e.target.value }))} /></div>
          </div>
          <div className="fg"><label>Vendor</label><input value={form.vendor} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} /></div>
        </Modal>
      )}
    </div>
  );
}

// ── UPDATES ───────────────────────────────────────────────────────────────
function Updates({ proj, update }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ contractor: "", message: "" });

  const add = () => {
    update(p => ({ ...p, updates: [{ id: Date.now(), date: TODAY, contractor: form.contractor, message: form.message, photos: 0 }, ...p.updates] }));
    setModal(false); setForm({ contractor: "", message: "" });
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Work Updates</div><div className="sec-sub">Daily progress from site</div></div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>+ Post Update</button>
      </div>
      {proj.updates.length === 0 ? <div className="empty">No updates yet. Post the first one.</div> :
        proj.updates.map(u => (
          <div className="card mb16" key={u.id} style={{ borderLeft: `3px solid ${B.gold}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
              <span style={{ fontWeight: 700, color: B.black, fontSize: 14 }}>{u.contractor}</span>
              <span style={{ fontSize: 11, color: B.muted }}>{u.date}</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: B.text }}>{u.message}</p>
          </div>
        ))}
      {modal && (
        <Modal title="Post Work Update" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Post</button></>}>
          <div className="fg"><label>Contractor</label><select value={form.contractor} onChange={e => setForm(f => ({ ...f, contractor: e.target.value }))}><option value="">Select contractor…</option>{proj.contractors.map(c => <option key={c.id}>{c.name}</option>)}</select></div>
          <div className="fg"><label>Update</label><textarea rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="What work was done today? Any issues or pending items?" /></div>
        </Modal>
      )}
    </div>
  );
}

// ── LEDGER ────────────────────────────────────────────────────────────────
function Ledger({ proj, update }) {
  const [modal, setModal] = useState(false);
  const [tab, setTab] = useState("All");
  const [form, setForm] = useState({ date: TODAY, description: "", type: "DR", amount: "", category: "Labour", ref: "" });

  const totalCR = proj.ledger.filter(l => l.type === "CR").reduce((s, l) => s + l.amount, 0);
  const totalDR = proj.ledger.filter(l => l.type === "DR").reduce((s, l) => s + l.amount, 0);

  let running = 0;
  const withBal = [...proj.ledger].sort((a, b) => a.date.localeCompare(b.date)).map(l => {
    running += l.type === "CR" ? l.amount : -l.amount;
    return { ...l, balance: running };
  });

  const visible = tab === "All" ? withBal : withBal.filter(l => l.type === tab);

  const add = () => {
    update(p => ({ ...p, ledger: [...p.ledger, { ...form, id: Date.now(), amount: Number(form.amount) }] }));
    setModal(false); setForm({ date: TODAY, description: "", type: "DR", amount: "", category: "Labour", ref: "" });
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Cash Book & Ledger</div><div className="sec-sub">All receipts and payments</div></div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>+ Add Entry</button>
      </div>
      <div className="stats-row">
        <div className="stat t-green"><div className="stat-label">Total Receipts</div><div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalCR)}</div></div>
        <div className="stat t-red"><div className="stat-label">Total Payments</div><div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalDR)}</div></div>
        <div className="stat t-gold"><div className="stat-label">Cash Balance</div><div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalCR - totalDR)}</div></div>
        <div className="stat t-black"><div className="stat-label">Entries</div><div className="stat-value">{proj.ledger.length}</div></div>
      </div>
      <div className="card">
        <div className="tabs">
          {["All", "CR", "DR"].map(t => <div key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>{t === "All" ? "All Entries" : t === "CR" ? "Receipts" : "Payments"}</div>)}
        </div>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Ref</th><th className="tr">Receipt (CR)</th><th className="tr">Payment (DR)</th><th className="tr">Balance</th></tr></thead>
            <tbody>
              {visible.length === 0 ? <tr><td colSpan={7} style={{ textAlign: "center", color: B.muted, padding: 32 }}>No entries.</td></tr> :
                visible.map(l => (
                  <tr key={l.id}>
                    <td style={{ fontSize: 12, whiteSpace: "nowrap" }}>{l.date}</td>
                    <td style={{ fontWeight: 600 }}>{l.description}</td>
                    <td><span className="badge bgr">{l.category}</span></td>
                    <td style={{ fontSize: 12, color: B.muted }}>{l.ref}</td>
                    <td className="tr cr mono">{l.type === "CR" ? fmt(l.amount) : ""}</td>
                    <td className="tr dr mono">{l.type === "DR" ? fmt(l.amount) : ""}</td>
                    <td className="tr mono" style={{ color: l.balance >= 0 ? B.green : B.red, fontWeight: 700 }}>{fmt(Math.abs(l.balance))}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal && (
        <Modal title="New Ledger Entry" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Save</button></>}>
          <div className="fr">
            <div className="fg"><label>Date</label><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} /></div>
            <div className="fg"><label>Type</label><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}><option value="DR">Payment (DR)</option><option value="CR">Receipt (CR)</option></select></div>
          </div>
          <div className="fg"><label>Description</label><input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="e.g. Labour payment — Ramesh" /></div>
          <div className="fr">
            <div className="fg"><label>Category</label><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>{["Labour","Material","Consultant","Receipt","Advance","Other"].map(c => <option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label>Amount (₹)</label><input type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} /></div>
          </div>
          <div className="fg"><label>Reference</label><input value={form.ref} onChange={e => setForm(f => ({ ...f, ref: e.target.value }))} placeholder="Cheque / UPI / Invoice no." /></div>
        </Modal>
      )}
    </div>
  );
}

// ── CONTRACTOR QUOTES ────────────────────────────────────────────────────
function Quotes({ proj, update }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ workItem: "", contractor: "", clientQuote: "", contractorQuote: "", paidToContractor: 0 });

  const quotes = proj.quotes || [];
  const totalClientQuote = quotes.reduce((s, q) => s + Number(q.clientQuote), 0);
  const totalContractorQuote = quotes.reduce((s, q) => s + Number(q.contractorQuote), 0);
  const totalPaid = quotes.reduce((s, q) => s + Number(q.paidToContractor), 0);
  const totalProfit = totalClientQuote - totalContractorQuote;
  const totalBalance = totalContractorQuote - totalPaid;

  const add = () => {
    update(p => ({ ...p, quotes: [...(p.quotes||[]), { ...form, id: Date.now(), clientQuote: Number(form.clientQuote), contractorQuote: Number(form.contractorQuote), paidToContractor: Number(form.paidToContractor) }] }));
    setModal(false);
    setForm({ workItem: "", contractor: "", clientQuote: "", contractorQuote: "", paidToContractor: 0 });
  };

  const updatePaid = (id, val) => update(p => ({ ...p, quotes: (p.quotes||[]).map(q => q.id === id ? { ...q, paidToContractor: Number(val) } : q) }));

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Contractor Quotes</div><div className="sec-sub">Client quote vs contractor cost vs payments</div></div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>+ Add Quote</button>
      </div>

      <div className="stats-row">
        <div className="stat t-gold">
          <div className="stat-label">Quoted to Client</div>
          <div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalClientQuote)}</div>
        </div>
        <div className="stat t-black">
          <div className="stat-label">Contractor Cost</div>
          <div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalContractorQuote)}</div>
        </div>
        <div className="stat t-red">
          <div className="stat-label">Paid to Contractors</div>
          <div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalPaid)}</div>
        </div>
        <div className="stat t-green">
          <div className="stat-label">Total Profit Margin</div>
          <div className="stat-value" style={{ fontSize: 18 }}>{fmt(totalProfit)}</div>
          <div className="stat-sub">{pct(totalProfit, totalClientQuote)}% margin</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20, background: "rgba(201,161,59,0.05)", border: `1px solid ${B.goldBorder}` }}>
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div className="stat-label">Balance to Pay Contractors</div>
            <div style={{ fontSize: 22, fontFamily: "Georgia,serif", color: B.red, marginTop: 4 }}>{fmt(totalBalance)}</div>
          </div>
          <div>
            <div className="stat-label">Amount Collected from Contractors</div>
            <div style={{ fontSize: 22, fontFamily: "Georgia,serif", color: B.green, marginTop: 4 }}>{fmt(totalPaid)}</div>
          </div>
          <div>
            <div className="stat-label">Profit Locked In</div>
            <div style={{ fontSize: 22, fontFamily: "Georgia,serif", color: B.gold, marginTop: 4 }}>{fmt(totalProfit)}</div>
            <div style={{ fontSize: 12, color: B.muted, marginTop: 2 }}>After full contractor payment</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Work Item</th>
                <th>Contractor</th>
                <th className="tr">Quoted to Client</th>
                <th className="tr">Contractor Quote</th>
                <th className="tr">Profit</th>
                <th className="tr">Paid till Date</th>
                <th className="tr">Balance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length === 0
                ? <tr><td colSpan={8} style={{ textAlign: "center", color: B.muted, padding: 32 }}>No quotes added yet.</td></tr>
                : quotes.map(q => {
                  const profit = q.clientQuote - q.contractorQuote;
                  const balance = q.contractorQuote - q.paidToContractor;
                  const profitPct = pct(profit, q.clientQuote);
                  const paidPct = pct(q.paidToContractor, q.contractorQuote);
                  return (
                    <tr key={q.id}>
                      <td style={{ fontWeight: 700, color: B.black }}>{q.workItem}</td>
                      <td style={{ fontSize: 12 }}>{q.contractor}</td>
                      <td className="tr mono" style={{ fontSize: 12 }}>{fmt(q.clientQuote)}</td>
                      <td className="tr mono" style={{ fontSize: 12 }}>{fmt(q.contractorQuote)}</td>
                      <td className="tr" style={{ color: profit >= 0 ? B.green : B.red, fontWeight: 700, fontSize: 12 }}>
                        {fmt(profit)}<br/>
                        <span style={{ fontSize: 10, fontWeight: 400 }}>{profitPct}% margin</span>
                      </td>
                      <td>
                        <input type="number" value={q.paidToContractor} min={0} max={q.contractorQuote}
                          onChange={e => updatePaid(q.id, e.target.value)}
                          style={{ width: 90, padding: "4px 8px", textAlign: "right" }} />
                        <div className="pbar" style={{ marginTop: 4 }}>
                          <div className="pfill" style={{ width: `${Math.min(paidPct,100)}%`, background: paidPct === 100 ? B.green : B.gold }} />
                        </div>
                      </td>
                      <td className="tr mono" style={{ color: balance > 0 ? B.red : B.green, fontWeight: 700, fontSize: 12 }}>{fmt(balance)}</td>
                      <td>
                        <span className={`badge ${paidPct === 100 ? "bg" : paidPct > 0 ? "by" : "br"}`}>
                          {paidPct === 100 ? "Paid" : paidPct > 0 ? "Partial" : "Unpaid"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <Modal title="Add Contractor Quote" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Save Quote</button></>}>
          <div className="fg"><label>Work Item</label><input value={form.workItem} onChange={e => setForm(f => ({ ...f, workItem: e.target.value }))} placeholder="e.g. False Ceiling — Master Bedroom" /></div>
          <div className="fg">
            <label>Contractor</label>
            <select value={form.contractor} onChange={e => setForm(f => ({ ...f, contractor: e.target.value }))}>
              <option value="">Select contractor…</option>
              {proj.contractors.map(c => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="fr">
            <div className="fg"><label>Quoted to Client (₹)</label><input type="number" value={form.clientQuote} onChange={e => setForm(f => ({ ...f, clientQuote: e.target.value }))} placeholder="200000" /></div>
            <div className="fg"><label>Contractor Quote (₹)</label><input type="number" value={form.contractorQuote} onChange={e => setForm(f => ({ ...f, contractorQuote: e.target.value }))} placeholder="155000" /></div>
          </div>
          <div className="fg"><label>Paid to Contractor till Date (₹)</label><input type="number" value={form.paidToContractor} onChange={e => setForm(f => ({ ...f, paidToContractor: e.target.value }))} placeholder="0" /></div>
          {form.clientQuote && form.contractorQuote && (
            <div style={{ background: B.goldBg, border: `1px solid ${B.goldBorder}`, borderRadius: 8, padding: "12px 16px", marginTop: 8 }}>
              <div style={{ fontSize: 12, color: B.muted }}>Estimated Profit</div>
              <div style={{ fontSize: 20, fontFamily: "Georgia,serif", color: B.green, marginTop: 2 }}>
                {fmt(Number(form.clientQuote) - Number(form.contractorQuote))}
                <span style={{ fontSize: 13, color: B.muted, marginLeft: 8 }}>
                  ({pct(Number(form.clientQuote) - Number(form.contractorQuote), Number(form.clientQuote))}% margin)
                </span>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────
const PAGES = [
  { id: "dashboard", label: "Dashboard", icon: "⬜" },
  { id: "tasks", label: "Tasks", icon: "✅" },
  { id: "contractors", label: "Contractors", icon: "👷" },
  { id: "attendance", label: "Attendance", icon: "📋" },
  { id: "materials", label: "Materials", icon: "📦" },
  { id: "updates", label: "Work Updates", icon: "📝" },
  { id: "quotes", label: "Contractor Quotes", icon: "💰" },
  { id: "ledger", label: "Ledger", icon: "📒" },
];

export default function App() {
  const [page, setPage] = useState("projects");
  const [projects, setProjects] = useState([DEMO_PROJECT]);
  const [activeId, setActiveId] = useState(null);

  const proj = projects.find(p => p.id === activeId);
  const updateProj = (fn) => setProjects(ps => ps.map(p => p.id === activeId ? fn(p) : p));

  const openProject = (id) => { setActiveId(id); setPage("dashboard"); };
  const backToProjects = () => { setActiveId(null); setPage("projects"); };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* Sidebar */}
        <nav className="sidebar">
          <div className="brand" onClick={backToProjects} style={{ cursor: "pointer" }}>
            <div className="brand-name">Ambience<br />Architects</div>
          </div>

          {!proj ? (
            <div className="nav-section">
              <div className="nav-label">Navigation</div>
              <div className={`nav-item active`}><span className="nav-icon">🏗️</span>All Projects</div>
            </div>
          ) : (
            <>
              <div className="nav-section" style={{ paddingBottom: 0 }}>
                <div className="nav-label">Project</div>
                <div style={{ padding: "4px 12px 12px" }}>
                  <div style={{ background: "rgba(201,161,59,0.1)", border: "1px solid rgba(201,161,59,0.2)", borderRadius: 6, padding: "8px 12px" }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: B.gold, lineHeight: 1.4 }}>{proj.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{proj.location}</div>
                  </div>
                </div>
              </div>
              <div className="nav-divider" />
              <div className="nav-section">
                <div className="nav-label">Modules</div>
                {PAGES.map(p => (
                  <div key={p.id} className={`nav-item ${page === p.id ? "active" : ""}`} onClick={() => setPage(p.id)}>
                    <span className="nav-icon">{p.icon}</span>{p.label}
                  </div>
                ))}
              </div>
              <div className="nav-divider" />
              <div className="nav-section">
                <div className="nav-label">Switch</div>
                {projects.map(p => (
                  <div key={p.id} className={`nav-item ${p.id === activeId ? "active" : ""}`} onClick={() => openProject(p.id)} style={{ fontSize: 12 }}>
                    <div className="proj-dot" style={{ background: p.color }} />
                    {p.name}
                  </div>
                ))}
                <div className="nav-item" onClick={backToProjects}><span className="nav-icon">🏗️</span>All Projects</div>
              </div>
            </>
          )}

          <div style={{ marginTop: "auto", padding: "14px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", lineHeight: 1.8 }}>
              Interior Project Manager<br />v2.0 · Multi-Project
            </div>
          </div>
        </nav>

        {/* Main */}
        <div className="main">
          <div className="topbar">
            <div>
              <div className="topbar-title">
                {page === "projects" ? "All Projects" : PAGES.find(p => p.id === page)?.label}
              </div>
              <div className="topbar-sub">
                {proj ? `${proj.name} · ${proj.location}` : `${projects.length} project${projects.length !== 1 ? "s" : ""} · Ambience Architects`}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {proj && <span style={{ background: B.goldBg, border: `1px solid ${B.goldBorder}`, color: B.goldDark, fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>Active · {proj.completion}% done</span>}
              <span style={{ fontSize: 12, color: B.muted }}>{TODAY}</span>
            </div>
          </div>

          <div className="content">
            {page === "projects" && <Projects projects={projects} setProjects={setProjects} onOpen={openProject} />}
            {proj && page === "dashboard" && <Dashboard proj={proj} />}
            {proj && page === "tasks" && <Tasks proj={proj} update={updateProj} />}
            {proj && page === "contractors" && <Contractors proj={proj} update={updateProj} />}
            {proj && page === "attendance" && <Attendance proj={proj} update={updateProj} />}
            {proj && page === "materials" && <Materials proj={proj} update={updateProj} />}
            {proj && page === "updates" && <Updates proj={proj} update={updateProj} />}
            {proj && page === "quotes" && <Quotes proj={proj} update={updateProj} />}
            {proj && page === "ledger" && <Ledger proj={proj} update={updateProj} />}
          </div>
        </div>
      </div>
    </>
  );
}
