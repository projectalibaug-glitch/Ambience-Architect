import { useState, useEffect } from "react";

const SUPABASE_URL = "https://axtbgqlsznbpbitzggyg.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dGJncWxzem5icGJpdHpnZ3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDU2OTIsImV4cCI6MjA5NzEyMTY5Mn0.My7ikK8kpFapMZ3NrSP7aQv8MnRClicA_bzKcgMDsng";

const sb = async (path, method = "GET", body = null) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": method === "POST" ? "return=representation" : method === "PATCH" ? "return=representation" : "",
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

const B = {
  black: "#0A0A0A", blackSoft: "#141414", blackCard: "#1A1A1A",
  gold: "#C9A13B", goldLight: "#E8D08A", goldDark: "#8B6A1A",
  goldBg: "rgba(201,161,59,0.08)", goldBorder: "rgba(201,161,59,0.25)",
  canvas: "#F5F0E8", canvasDark: "#EDE7D8", white: "#FFFFFF",
  text: "#1A1208", muted: "#6B6355", border: "#D8D0C0",
  green: "#2E7D52", greenBg: "#E8F5EE", red: "#C0392B", redBg: "#FDECEA",
  blue: "#1A6FA8", blueBg: "#E8F2FA",
};

const css = `
* { box-sizing:border-box; margin:0; padding:0; }
body { font-family:system-ui,-apple-system,sans-serif; background:${B.canvas}; color:${B.text}; min-height:100vh; }
.app { display:flex; min-height:100vh; }
.sidebar { width:252px; min-width:252px; background:${B.black}; color:#fff; display:flex; flex-direction:column; position:fixed; top:0; left:0; height:100vh; z-index:100; border-right:1px solid rgba(201,161,59,0.15); }
.main { margin-left:252px; flex:1; display:flex; flex-direction:column; min-height:100vh; }
.brand { padding:28px 20px 22px; border-bottom:1px solid rgba(201,161,59,0.15); display:flex; flex-direction:column; align-items:center; gap:10px; cursor:pointer; }
.brand-name { font-family:Georgia,serif; font-size:13.5px; font-weight:normal; color:${B.gold}; letter-spacing:2px; text-transform:uppercase; text-align:center; line-height:1.4; }
.nav-section { padding:18px 0 6px; }
.nav-label { font-size:9.5px; color:rgba(255,255,255,0.25); letter-spacing:2px; text-transform:uppercase; padding:0 20px 8px; }
.nav-item { display:flex; align-items:center; gap:10px; padding:10px 20px; cursor:pointer; font-size:13px; color:rgba(255,255,255,0.55); transition:all 0.15s; border-left:2px solid transparent; line-height:1; }
.nav-item:hover { color:rgba(255,255,255,0.9); background:rgba(255,255,255,0.04); }
.nav-item.active { color:${B.gold}; border-left-color:${B.gold}; background:rgba(201,161,59,0.07); }
.nav-icon { font-size:15px; width:18px; text-align:center; }
.nav-divider { height:1px; background:rgba(255,255,255,0.06); margin:8px 20px; }
.topbar { background:${B.white}; border-bottom:1px solid ${B.border}; padding:14px 32px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50; }
.topbar-title { font-family:Georgia,serif; font-size:20px; color:${B.black}; }
.topbar-sub { font-size:12px; color:${B.muted}; margin-top:2px; }
.content { padding:28px 32px; flex:1; }
.card { background:${B.white}; border:1px solid ${B.border}; border-radius:8px; padding:22px; }
.card-gold { border-top:3px solid ${B.gold}; }
.card-title { font-family:Georgia,serif; font-size:15px; color:${B.black}; margin-bottom:16px; display:flex; align-items:center; justify-content:space-between; }
.stats-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:24px; }
.stat { background:${B.white}; border:1px solid ${B.border}; border-radius:8px; padding:18px; }
.stat-label { font-size:10.5px; color:${B.muted}; text-transform:uppercase; letter-spacing:1px; }
.stat-value { font-size:26px; font-family:Georgia,serif; color:${B.black}; margin-top:5px; line-height:1; }
.stat-sub { font-size:11.5px; color:${B.muted}; margin-top:5px; }
.t-gold { border-top:3px solid ${B.gold}; } .t-green { border-top:3px solid ${B.green}; } .t-red { border-top:3px solid ${B.red}; } .t-black { border-top:3px solid ${B.black}; }
.g2 { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.tbl-wrap { overflow-x:auto; }
table { width:100%; border-collapse:collapse; font-size:13px; }
th { background:${B.canvasDark}; color:${B.black}; font-size:10.5px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; padding:9px 13px; text-align:left; border-bottom:2px solid ${B.border}; }
td { padding:10px 13px; border-bottom:1px solid ${B.canvasDark}; vertical-align:middle; }
tr:last-child td { border-bottom:none; }
tr:hover td { background:${B.canvas}; }
.badge { display:inline-block; font-size:10.5px; font-weight:700; padding:3px 9px; border-radius:20px; letter-spacing:0.4px; }
.bg { background:${B.greenBg}; color:${B.green}; } .by { background:#FDF3D8; color:#7A5500; } .br { background:${B.redBg}; color:${B.red}; } .bb { background:${B.blueBg}; color:${B.blue}; } .bgr { background:${B.canvasDark}; color:${B.muted}; }
.btn { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:600; cursor:pointer; border:none; transition:all 0.15s; font-family:inherit; }
.btn-gold { background:${B.gold}; color:${B.black}; } .btn-gold:hover { background:#b88e2f; }
.btn-outline { background:transparent; color:${B.black}; border:1px solid ${B.border}; font-weight:500; } .btn-outline:hover { background:${B.canvas}; }
.btn-sm { padding:5px 12px; font-size:12px; }
input,select,textarea { width:100%; padding:8px 11px; border:1px solid ${B.border}; border-radius:6px; font-size:13px; font-family:inherit; background:${B.white}; color:${B.text}; transition:border-color 0.15s; }
input:focus,select:focus,textarea:focus { outline:none; border-color:${B.gold}; }
label { font-size:11px; font-weight:700; color:${B.black}; display:block; margin-bottom:5px; text-transform:uppercase; letter-spacing:0.5px; }
.fg { margin-bottom:14px; } .fr { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); display:flex; align-items:center; justify-content:center; z-index:300; }
.modal { background:${B.white}; border-radius:10px; width:540px; max-width:95vw; max-height:85vh; overflow-y:auto; }
.modal-hd { padding:18px 22px; border-bottom:1px solid ${B.border}; display:flex; align-items:center; justify-content:space-between; }
.modal-title { font-family:Georgia,serif; font-size:17px; color:${B.black}; }
.modal-bd { padding:22px; } .modal-ft { padding:14px 22px; border-top:1px solid ${B.border}; display:flex; gap:8px; justify-content:flex-end; }
.close-x { background:none; border:none; font-size:22px; cursor:pointer; color:${B.muted}; line-height:1; padding:0 4px; }
.pbar { background:${B.canvasDark}; border-radius:4px; height:7px; overflow:hidden; }
.pfill { height:100%; background:${B.gold}; border-radius:4px; transition:width 0.3s; }
.tr { text-align:right; } .mono { font-family:'Courier New',monospace; }
.cr { color:${B.green}; font-weight:700; } .dr { color:${B.red}; font-weight:700; }
.tag { display:inline-block; background:${B.goldBg}; color:${B.goldDark}; font-size:10.5px; padding:2px 8px; border-radius:4px; font-weight:700; border:1px solid ${B.goldBorder}; }
.sec-head { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; }
.sec-title { font-family:Georgia,serif; font-size:20px; color:${B.black}; }
.sec-sub { font-size:12.5px; color:${B.muted}; margin-top:3px; }
.tabs { display:flex; gap:2px; margin-bottom:20px; background:${B.canvasDark}; border-radius:8px; padding:3px; width:fit-content; }
.tab { padding:6px 16px; border-radius:6px; font-size:13px; cursor:pointer; color:${B.muted}; font-weight:500; transition:all 0.15s; }
.tab.active { background:${B.white}; color:${B.black}; font-weight:700; box-shadow:0 1px 3px rgba(0,0,0,0.08); }
.mb16 { margin-bottom:16px; } .mb24 { margin-bottom:24px; }
.divider { border:none; border-top:1px solid ${B.border}; margin:16px 0; }
.empty { text-align:center; padding:48px 24px; color:${B.muted}; }
.att-grid { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
.att-dot { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; cursor:pointer; }
.ap { background:${B.green}; color:#fff; } .ah { background:${B.gold}; color:${B.black}; } .aa { background:${B.red}; color:#fff; }
.proj-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; }
.proj-card { background:${B.white}; border:1px solid ${B.border}; border-radius:10px; padding:22px; cursor:pointer; transition:all 0.18s; position:relative; overflow:hidden; }
.proj-card:hover { border-color:${B.gold}; box-shadow:0 4px 16px rgba(201,161,59,0.12); }
.proj-card::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:${B.gold}; }
.proj-status-bar { display:flex; align-items:center; justify-content:space-between; margin-top:14px; }
.loading { display:flex; align-items:center; justify-content:center; padding:80px; color:${B.muted}; font-family:Georgia,serif; font-size:18px; }
.toast { position:fixed; bottom:24px; right:24px; background:${B.black}; color:${B.gold}; padding:12px 20px; border-radius:8px; font-size:13px; font-weight:600; z-index:999; border:1px solid ${B.goldBorder}; }
`;

const TODAY = new Date().toISOString().split("T")[0];
const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const stColor = (s) => ({ Completed:"bg","In Progress":"bb",Pending:"by",Delayed:"br" }[s]||"bgr");
const PROJ_COLORS = [B.gold,"#4A90D9","#2ECC71","#E74C3C","#9B59B6","#1ABC9C"];

function Modal({ title, onClose, children, footer }) {
  return (
    <div className="overlay" onClick={e => e.target.className==="overlay"&&onClose()}>
      <div className="modal">
        <div className="modal-hd"><span className="modal-title">{title}</span><button className="close-x" onClick={onClose}>×</button></div>
        <div className="modal-bd">{children}</div>
        {footer && <div className="modal-ft">{footer}</div>}
      </div>
    </div>
  );
}

function Toast({ msg }) {
  return msg ? <div className="toast">{msg}</div> : null;
}

// ── PROJECTS ──────────────────────────────────────────────────────────────
function Projects({ projects, loading, onCreate, onOpen, onDelete }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", location:"", area:"", budget:"", startDate:"", endDate:"", completion:0 });

  const create = async () => {
    if (!form.name.trim()) return;
    await onCreate({ ...form, budget: Number(form.budget)||0, completion: Number(form.completion)||0, color: PROJ_COLORS[Math.floor(Math.random()*PROJ_COLORS.length)] });
    setModal(false);
    setForm({ name:"", location:"", area:"", budget:"", startDate:"", endDate:"", completion:0 });
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">All Projects</div><div className="sec-sub">{projects.length} project{projects.length!==1?"s":""} · Ambience Architects</div></div>
        <button className="btn btn-gold" onClick={() => setModal(true)}>+ New Project</button>
      </div>
      {loading ? <div className="loading">Loading projects…</div> : projects.length === 0 ? (
        <div className="empty"><div style={{fontSize:36,marginBottom:12}}>🏗️</div><div>No projects yet. Create your first one.</div></div>
      ) : (
        <div className="proj-grid">
          {projects.map(p => (
            <div className="proj-card" key={p.id} onClick={() => onOpen(p.id)} style={{"--acc":p.color||B.gold}}>
              <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:p.color||B.gold}} />
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{fontFamily:"Georgia,serif",fontSize:16,color:B.black,flex:1,paddingRight:8}}>{p.name}</div>
                <button onClick={e=>{e.stopPropagation();if(confirm("Delete this project?"))onDelete(p.id)}} style={{background:"none",border:"none",color:B.muted,cursor:"pointer",fontSize:16}}>×</button>
              </div>
              <div style={{fontSize:12,color:B.muted,marginBottom:14}}>📍 {p.location||"No location"} · 📐 {p.area||"—"}</div>
              <div className="proj-status-bar">
                <div><div className="stat-label">Budget</div><div style={{fontSize:15,fontFamily:"Georgia,serif",color:B.black}}>{p.budget?fmt(p.budget):"—"}</div></div>
                <div style={{textAlign:"right"}}><div className="stat-label">Progress</div><div style={{fontSize:20,fontFamily:"Georgia,serif",color:p.color||B.gold}}>{p.completion||0}%</div></div>
              </div>
              <div className="pbar" style={{marginTop:12}}><div className="pfill" style={{width:`${p.completion||0}%`,background:p.color||B.gold}} /></div>
            </div>
          ))}
        </div>
      )}
      {modal && (
        <Modal title="Create New Project" onClose={() => setModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={create}>Create Project</button></>}>
          <div className="fg"><label>Project Name</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Sharma Residence — Bandra" /></div>
          <div className="fr">
            <div className="fg"><label>Location</label><input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} placeholder="e.g. Bandra West, Mumbai" /></div>
            <div className="fg"><label>Area</label><input value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))} placeholder="e.g. 2,400 sq ft" /></div>
          </div>
          <div className="fr">
            <div className="fg"><label>Total Budget (₹)</label><input type="number" value={form.budget} onChange={e=>setForm(f=>({...f,budget:e.target.value}))} placeholder="5000000" /></div>
            <div className="fg"><label>Completion %</label><input type="number" min="0" max="100" value={form.completion} onChange={e=>setForm(f=>({...f,completion:e.target.value}))} placeholder="0" /></div>
          </div>
          <div className="fr">
            <div className="fg"><label>Start Date</label><input type="date" value={form.startDate} onChange={e=>setForm(f=>({...f,startDate:e.target.value}))} /></div>
            <div className="fg"><label>End Date</label><input type="date" value={form.endDate} onChange={e=>setForm(f=>({...f,endDate:e.target.value}))} /></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function Dashboard({ proj, tasks, ledger, materials, attendance, updates }) {
  const totalCR = ledger.filter(l=>l.type==="CR").reduce((s,l)=>s+l.amount,0);
  const totalDR = ledger.filter(l=>l.type==="DR").reduce((s,l)=>s+l.amount,0);
  const todayPresent = attendance.filter(a=>a.date===TODAY&&a.status==="P").length;
  return (
    <div>
      <div className="card card-gold mb24">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontFamily:"Georgia,serif",fontSize:22,color:B.black}}>{proj.name}</div>
            <div style={{fontSize:12.5,color:B.muted,marginTop:5}}>📍 {proj.location} · 📐 {proj.area} · 📅 {proj.startDate} → {proj.endDate}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:B.muted}}>Overall Completion</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:34,color:proj.color||B.gold,marginTop:2}}>{proj.completion||0}%</div>
            <div className="pbar" style={{width:160,marginTop:6}}><div className="pfill" style={{width:`${proj.completion||0}%`,background:proj.color||B.gold}} /></div>
          </div>
        </div>
      </div>
      <div className="stats-row">
        <div className="stat t-gold"><div className="stat-label">Budget</div><div className="stat-value" style={{fontSize:20}}>{fmt(proj.budget||0)}</div></div>
        <div className="stat t-green"><div className="stat-label">Received</div><div className="stat-value" style={{fontSize:20}}>{fmt(totalCR)}</div></div>
        <div className="stat t-red"><div className="stat-label">Spent</div><div className="stat-value" style={{fontSize:20}}>{fmt(totalDR)}</div></div>
        <div className="stat t-black"><div className="stat-label">Cash in Hand</div><div className="stat-value" style={{fontSize:20}}>{fmt(totalCR-totalDR)}</div></div>
      </div>
      <div className="g2">
        <div className="card">
          <div className="card-title">Task Overview</div>
          {["Completed","In Progress","Pending","Delayed"].map(s=>{
            const c=tasks.filter(t=>t.status===s).length;
            const cols={Completed:B.green,"In Progress":B.blue,Pending:B.gold,Delayed:B.red};
            return(<div key={s} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span className={`badge ${stColor(s)}`} style={{width:86,textAlign:"center",fontSize:10}}>{s}</span>
              <div className="pbar" style={{flex:1}}><div className="pfill" style={{width:`${pct(c,tasks.length)}%`,background:cols[s]}} /></div>
              <span style={{fontSize:13,fontWeight:700,width:18}}>{c}</span>
            </div>);
          })}
          <hr className="divider" />
          <div style={{display:"flex",gap:24}}>
            <div><div className="stat-label">Workers Today</div><div style={{fontSize:22,fontFamily:"Georgia,serif",color:B.black,marginTop:4}}>{todayPresent}</div></div>
            <div><div className="stat-label">Pending Materials</div><div style={{fontSize:22,fontFamily:"Georgia,serif",color:B.red,marginTop:4}}>{materials.filter(m=>m.pending>0).length}</div></div>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Latest Updates</div>
          {updates.length===0?<div style={{color:B.muted,fontSize:13}}>No updates yet.</div>:
            updates.slice(0,3).map(u=>(
              <div key={u.id} style={{borderBottom:`1px solid ${B.canvasDark}`,paddingBottom:11,marginBottom:11}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontWeight:700,fontSize:13,color:B.black}}>{u.contractor}</span>
                  <span style={{fontSize:11,color:B.muted}}>{u.date}</span>
                </div>
                <p style={{fontSize:13,color:B.text,lineHeight:1.5}}>{u.message}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ── TASKS ─────────────────────────────────────────────────────────────────
function Tasks({ projId, tasks, setTasks, toast }) {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ title:"", category:"Civil", assignee:"", status:"Pending", priority:"High", due:"", progress:0, notes:"" });
  const cats = ["Civil","Electrical","Carpentry","Tiling","Flooring","Painting","Plumbing","Furniture","Other"];
  const filtered = filter==="All"?tasks:tasks.filter(t=>t.status===filter);

  const add = async () => {
    const row = { project_id:projId, title:form.title, category:form.category, assignee:form.assignee, status:form.status, priority:form.priority, due:form.due||null, progress:Number(form.progress), notes:form.notes };
    const res = await sb("tasks","POST",row);
    setTasks(t=>[...t,...res]);
    setModal(false); toast("Task added!");
    setForm({ title:"", category:"Civil", assignee:"", status:"Pending", priority:"High", due:"", progress:0, notes:"" });
  };

  const setProgress = async (id, v) => {
    const status = Number(v)===100?"Completed":tasks.find(t=>t.id===id)?.status;
    await sb(`tasks?id=eq.${id}`,"PATCH",{ progress:Number(v), status });
    setTasks(t=>t.map(x=>x.id===id?{...x,progress:Number(v),status}:x));
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Task Tracker</div><div className="sec-sub">{tasks.length} tasks · {tasks.filter(t=>t.status==="Completed").length} completed</div></div>
        <button className="btn btn-gold" onClick={()=>setModal(true)}>+ Add Task</button>
      </div>
      <div className="tabs">
        {["All","Pending","In Progress","Completed","Delayed"].map(s=><div key={s} className={`tab ${filter===s?"active":""}`} onClick={()=>setFilter(s)}>{s}</div>)}
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Task</th><th>Category</th><th>Assigned To</th><th>Priority</th><th>Due</th><th>Progress</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.length===0?<tr><td colSpan={7} style={{textAlign:"center",color:B.muted,padding:32}}>No tasks.</td></tr>:
                filtered.map(t=>(
                  <tr key={t.id}>
                    <td><div style={{fontWeight:700,color:B.black}}>{t.title}</div>{t.notes&&<div style={{fontSize:11,color:B.muted}}>{t.notes}</div>}</td>
                    <td><span className="tag">{t.category}</span></td>
                    <td style={{fontSize:12}}>{t.assignee}</td>
                    <td><span className={`badge ${t.priority==="High"?"br":t.priority==="Medium"?"by":"bgr"}`}>{t.priority}</span></td>
                    <td style={{fontSize:12}}>{t.due}</td>
                    <td style={{width:150}}>
                      <div style={{display:"flex",alignItems:"center",gap:6}}>
                        <div className="pbar" style={{flex:1}}><div className="pfill" style={{width:`${t.progress}%`,background:t.progress===100?B.green:B.gold}} /></div>
                        <span style={{fontSize:11,fontWeight:700,width:28}}>{t.progress}%</span>
                      </div>
                      <input type="range" min="0" max="100" step="5" value={t.progress} onChange={e=>setProgress(t.id,e.target.value)} style={{width:"100%",padding:0,height:4,marginTop:4}} />
                    </td>
                    <td><span className={`badge ${stColor(t.status)}`}>{t.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal&&(
        <Modal title="Add Task" onClose={()=>setModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Add Task</button></>}>
          <div className="fg"><label>Task Title</label><input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. Install false ceiling" /></div>
          <div className="fr">
            <div className="fg"><label>Category</label><select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{cats.map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label>Priority</label><select value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}><option>High</option><option>Medium</option><option>Low</option></select></div>
          </div>
          <div className="fr">
            <div className="fg"><label>Assigned To</label><input value={form.assignee} onChange={e=>setForm(f=>({...f,assignee:e.target.value}))} /></div>
            <div className="fg"><label>Due Date</label><input type="date" value={form.due} onChange={e=>setForm(f=>({...f,due:e.target.value}))} /></div>
          </div>
          <div className="fg"><label>Notes</label><textarea rows={2} value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} /></div>
        </Modal>
      )}
    </div>
  );
}

// ── CONTRACTORS ───────────────────────────────────────────────────────────
function Contractors({ projId, contractors, setContractors, toast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", trade:"", contact:"", rate:"", status:"Active" });

  const add = async () => {
    const res = await sb("contractors","POST",{ project_id:projId, ...form });
    setContractors(c=>[...c,...res]);
    setModal(false); toast("Contractor added!");
    setForm({ name:"", trade:"", contact:"", rate:"", status:"Active" });
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Contractors</div><div className="sec-sub">{contractors.length} registered</div></div>
        <button className="btn btn-gold" onClick={()=>setModal(true)}>+ Add Contractor</button>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Name</th><th>Trade</th><th>Contact</th><th>Rate</th><th>Status</th></tr></thead>
            <tbody>
              {contractors.length===0?<tr><td colSpan={5} style={{textAlign:"center",color:B.muted,padding:32}}>No contractors added.</td></tr>:
                contractors.map(c=>(
                  <tr key={c.id}>
                    <td style={{fontWeight:700,color:B.black}}>{c.name}</td>
                    <td><span className="tag">{c.trade}</span></td>
                    <td style={{fontSize:12}}>{c.contact}</td>
                    <td style={{fontSize:12}}>{c.rate}</td>
                    <td><span className={`badge ${c.status==="Active"?"bg":"bgr"}`}>{c.status}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal&&(
        <Modal title="Add Contractor" onClose={()=>setModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Add</button></>}>
          <div className="fg"><label>Name</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div className="fr">
            <div className="fg"><label>Trade</label><input value={form.trade} onChange={e=>setForm(f=>({...f,trade:e.target.value}))} placeholder="e.g. Carpentry" /></div>
            <div className="fg"><label>Contact</label><input value={form.contact} onChange={e=>setForm(f=>({...f,contact:e.target.value}))} /></div>
          </div>
          <div className="fr">
            <div className="fg"><label>Rate</label><input value={form.rate} onChange={e=>setForm(f=>({...f,rate:e.target.value}))} placeholder="e.g. ₹700/day" /></div>
            <div className="fg"><label>Status</label><select value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}><option>Active</option><option>Upcoming</option><option>Completed</option></select></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── ATTENDANCE ────────────────────────────────────────────────────────────
function Attendance({ projId, contractors, attendance, setAttendance, toast }) {
  const [date, setDate] = useState(TODAY);
  const dayRec = attendance.filter(a=>a.date===date);
  const totalP = dayRec.filter(a=>a.status==="P").length;
  const totalH = dayRec.filter(a=>a.status==="H").length;
  const totalA = dayRec.filter(a=>a.status==="A").length;

  const markWorker = async (contractorId, workerName, currentStatus) => {
    const next = currentStatus==="P"?"H":currentStatus==="H"?"A":"P";
    const existing = dayRec.find(a=>a.contractor_id===contractorId&&a.worker_name===workerName);
    if (existing) {
      await sb(`attendance?id=eq.${existing.id}`,"PATCH",{ status:next });
      setAttendance(a=>a.map(x=>x.id===existing.id?{...x,status:next}:x));
    } else {
      const res = await sb("attendance","POST",{ project_id:projId, contractor_id:contractorId, worker_name:workerName, date, status:next });
      setAttendance(a=>[...a,...res]);
    }
  };

  const addWorker = async (contractorId, workerName) => {
    if (!workerName.trim()) return;
    const res = await sb("attendance","POST",{ project_id:projId, contractor_id:contractorId, worker_name:workerName, date, status:"P" });
    setAttendance(a=>[...a,...res]);
    toast("Worker added!");
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Attendance Register</div><div className="sec-sub">Click dot to toggle P → Half → Absent</div></div>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{width:160}} />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,maxWidth:460,marginBottom:24}}>
        <div className="stat t-green"><div className="stat-label">Present</div><div className="stat-value">{totalP}</div></div>
        <div className="stat t-gold"><div className="stat-label">Half Day</div><div className="stat-value">{totalH}</div></div>
        <div className="stat t-red"><div className="stat-label">Absent</div><div className="stat-value">{totalA}</div></div>
      </div>
      {contractors.filter(c=>c.status==="Active").map(c=>{
        const workers = dayRec.filter(a=>a.contractor_id===c.id);
        const [newW, setNewW] = useState("");
        return (
          <div className="card mb16" key={c.id}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div><div style={{fontWeight:700,color:B.black}}>{c.name}</div><div style={{fontSize:12,color:B.muted}}>{c.trade}</div></div>
            </div>
            <div className="att-grid">
              {workers.map(w=>(
                <div key={w.id} className={`att-dot ${w.status==="P"?"ap":w.status==="H"?"ah":"aa"}`}
                  onClick={()=>markWorker(c.id,w.worker_name,w.status)} title={w.worker_name}>
                  {w.worker_name.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8,marginTop:12}}>
              <input value={newW} onChange={e=>setNewW(e.target.value)} placeholder="Worker name" style={{maxWidth:200}} onKeyDown={e=>e.key==="Enter"&&addWorker(c.id,newW).then(()=>setNewW(""))} />
              <button className="btn btn-outline btn-sm" onClick={()=>addWorker(c.id,newW).then(()=>setNewW(""))}>+ Add</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── MATERIALS ─────────────────────────────────────────────────────────────
function Materials({ projId, materials, setMaterials, toast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name:"", category:"Civil", unit:"Nos", required:"", received:0, unitCost:"", vendor:"" });
  const totalVal = materials.reduce((s,m)=>s+m.required*m.unitCost,0);
  const recVal = materials.reduce((s,m)=>s+m.received*m.unitCost,0);

  const add = async () => {
    const req=Number(form.required),rec=Number(form.received);
    const res = await sb("materials","POST",{ project_id:projId, ...form, required:req, received:rec, pending:req-rec, unitCost:Number(form.unitCost) });
    setMaterials(m=>[...m,...res]);
    setModal(false); toast("Material added!");
  };

  const setRec = async (id, v) => {
    const m = materials.find(x=>x.id===id);
    await sb(`materials?id=eq.${id}`,"PATCH",{ received:Number(v), pending:m.required-Number(v) });
    setMaterials(ms=>ms.map(x=>x.id===id?{...x,received:Number(v),pending:x.required-Number(v)}:x));
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Material Tracker</div><div className="sec-sub">Procurement & delivery status</div></div>
        <button className="btn btn-gold" onClick={()=>setModal(true)}>+ Add Material</button>
      </div>
      <div className="stats-row">
        <div className="stat t-gold"><div className="stat-label">Total Value</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalVal)}</div></div>
        <div className="stat t-green"><div className="stat-label">Received</div><div className="stat-value" style={{fontSize:18}}>{fmt(recVal)}</div></div>
        <div className="stat t-red"><div className="stat-label">Pending</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalVal-recVal)}</div></div>
        <div className="stat t-black"><div className="stat-label">Items Pending</div><div className="stat-value">{materials.filter(m=>m.pending>0).length}</div></div>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Material</th><th>Category</th><th>Vendor</th><th>Unit</th><th>Required</th><th>Received</th><th>Pending</th><th>Unit Cost</th><th>Status</th></tr></thead>
            <tbody>
              {materials.length===0?<tr><td colSpan={9} style={{textAlign:"center",color:B.muted,padding:32}}>No materials added.</td></tr>:
                materials.map(m=>(
                  <tr key={m.id}>
                    <td style={{fontWeight:700,color:B.black}}>{m.name}</td>
                    <td><span className="tag">{m.category}</span></td>
                    <td style={{fontSize:12}}>{m.vendor}</td>
                    <td style={{fontSize:12}}>{m.unit}</td>
                    <td className="tr">{m.required}</td>
                    <td><input type="number" value={m.received} min={0} max={m.required} onChange={e=>setRec(m.id,e.target.value)} style={{width:70,padding:"4px 8px",textAlign:"right"}} /></td>
                    <td className="tr" style={{color:m.pending>0?B.red:B.green,fontWeight:700}}>{m.pending}</td>
                    <td className="tr mono" style={{fontSize:12}}>{fmt(m.unitCost)}</td>
                    <td><span className={`badge ${m.pending===0?"bg":m.received>0?"by":"br"}`}>{m.pending===0?"Received":m.received>0?"Partial":"Pending"}</span></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal&&(
        <Modal title="Add Material" onClose={()=>setModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Add</button></>}>
          <div className="fg"><label>Material Name</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} /></div>
          <div className="fr">
            <div className="fg"><label>Category</label><select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{["Civil","Electrical","Carpentry","Tiling","Flooring","Painting","Plumbing"].map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label>Unit</label><input value={form.unit} onChange={e=>setForm(f=>({...f,unit:e.target.value}))} /></div>
          </div>
          <div className="fr">
            <div className="fg"><label>Qty Required</label><input type="number" value={form.required} onChange={e=>setForm(f=>({...f,required:e.target.value}))} /></div>
            <div className="fg"><label>Unit Cost (₹)</label><input type="number" value={form.unitCost} onChange={e=>setForm(f=>({...f,unitCost:e.target.value}))} /></div>
          </div>
          <div className="fg"><label>Vendor</label><input value={form.vendor} onChange={e=>setForm(f=>({...f,vendor:e.target.value}))} /></div>
        </Modal>
      )}
    </div>
  );
}

// ── UPDATES ───────────────────────────────────────────────────────────────
function Updates({ projId, contractors, updates, setUpdates, toast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ contractor:"", message:"" });

  const add = async () => {
    const res = await sb("updates","POST",{ project_id:projId, contractor:form.contractor, message:form.message, date:TODAY });
    setUpdates(u=>[...res,...u]);
    setModal(false); toast("Update posted!");
    setForm({ contractor:"", message:"" });
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Work Updates</div><div className="sec-sub">Daily progress from site</div></div>
        <button className="btn btn-gold" onClick={()=>setModal(true)}>+ Post Update</button>
      </div>
      {updates.length===0?<div className="empty">No updates yet.</div>:
        updates.map(u=>(
          <div className="card mb16" key={u.id} style={{borderLeft:`3px solid ${B.gold}`}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
              <span style={{fontWeight:700,color:B.black,fontSize:14}}>{u.contractor}</span>
              <span style={{fontSize:11,color:B.muted}}>{u.date}</span>
            </div>
            <p style={{fontSize:13.5,lineHeight:1.6,color:B.text}}>{u.message}</p>
          </div>
        ))}
      {modal&&(
        <Modal title="Post Work Update" onClose={()=>setModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Post</button></>}>
          <div className="fg"><label>Contractor</label><select value={form.contractor} onChange={e=>setForm(f=>({...f,contractor:e.target.value}))}><option value="">Select…</option>{contractors.map(c=><option key={c.id}>{c.name}</option>)}</select></div>
          <div className="fg"><label>Update</label><textarea rows={4} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="What was done today?" /></div>
        </Modal>
      )}
    </div>
  );
}

// ── QUOTES ────────────────────────────────────────────────────────────────
function Quotes({ projId, contractors, quotes, setQuotes, toast }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ workItem:"", contractor:"", clientQuote:"", contractorQuote:"", paidToContractor:0 });
  const totalCQ = quotes.reduce((s,q)=>s+Number(q.clientQuote),0);
  const totalCtQ = quotes.reduce((s,q)=>s+Number(q.contractorQuote),0);
  const totalPaid = quotes.reduce((s,q)=>s+Number(q.paidToContractor),0);
  const totalProfit = totalCQ-totalCtQ;

  const add = async () => {
    const res = await sb("quotes","POST",{ project_id:projId, work_item:form.workItem, contractor:form.contractor, client_quote:Number(form.clientQuote), contractor_quote:Number(form.contractorQuote), paid_to_contractor:Number(form.paidToContractor) });
    setQuotes(q=>[...q,...res.map(r=>({ id:r.id, workItem:r.work_item, contractor:r.contractor, clientQuote:r.client_quote, contractorQuote:r.contractor_quote, paidToContractor:r.paid_to_contractor }))]);
    setModal(false); toast("Quote saved!");
  };

  const updatePaid = async (id, v) => {
    await sb(`quotes?id=eq.${id}`,"PATCH",{ paid_to_contractor:Number(v) });
    setQuotes(q=>q.map(x=>x.id===id?{...x,paidToContractor:Number(v)}:x));
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Contractor Quotes</div><div className="sec-sub">Client quote vs contractor cost vs payments</div></div>
        <button className="btn btn-gold" onClick={()=>setModal(true)}>+ Add Quote</button>
      </div>
      <div className="stats-row">
        <div className="stat t-gold"><div className="stat-label">Quoted to Client</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalCQ)}</div></div>
        <div className="stat t-black"><div className="stat-label">Contractor Cost</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalCtQ)}</div></div>
        <div className="stat t-red"><div className="stat-label">Paid to Contractors</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalPaid)}</div></div>
        <div className="stat t-green"><div className="stat-label">Total Profit</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalProfit)}</div><div className="stat-sub">{pct(totalProfit,totalCQ)}% margin</div></div>
      </div>
      <div className="card">
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Work Item</th><th>Contractor</th><th className="tr">Client Quote</th><th className="tr">Contractor Quote</th><th className="tr">Profit</th><th className="tr">Paid till Date</th><th className="tr">Balance</th><th>Status</th></tr></thead>
            <tbody>
              {quotes.length===0?<tr><td colSpan={8} style={{textAlign:"center",color:B.muted,padding:32}}>No quotes added.</td></tr>:
                quotes.map(q=>{
                  const profit=q.clientQuote-q.contractorQuote;
                  const balance=q.contractorQuote-q.paidToContractor;
                  const pp=pct(q.paidToContractor,q.contractorQuote);
                  return(<tr key={q.id}>
                    <td style={{fontWeight:700,color:B.black}}>{q.workItem}</td>
                    <td style={{fontSize:12}}>{q.contractor}</td>
                    <td className="tr mono" style={{fontSize:12}}>{fmt(q.clientQuote)}</td>
                    <td className="tr mono" style={{fontSize:12}}>{fmt(q.contractorQuote)}</td>
                    <td className="tr" style={{color:profit>=0?B.green:B.red,fontWeight:700,fontSize:12}}>{fmt(profit)}<br/><span style={{fontSize:10,fontWeight:400}}>{pct(profit,q.clientQuote)}%</span></td>
                    <td>
                      <input type="number" value={q.paidToContractor} min={0} max={q.contractorQuote} onChange={e=>updatePaid(q.id,e.target.value)} style={{width:90,padding:"4px 8px",textAlign:"right"}} />
                      <div className="pbar" style={{marginTop:4}}><div className="pfill" style={{width:`${Math.min(pp,100)}%`,background:pp===100?B.green:B.gold}} /></div>
                    </td>
                    <td className="tr mono" style={{color:balance>0?B.red:B.green,fontWeight:700,fontSize:12}}>{fmt(balance)}</td>
                    <td><span className={`badge ${pp===100?"bg":pp>0?"by":"br"}`}>{pp===100?"Paid":pp>0?"Partial":"Unpaid"}</span></td>
                  </tr>);
                })}
            </tbody>
          </table>
        </div>
      </div>
      {modal&&(
        <Modal title="Add Contractor Quote" onClose={()=>setModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Save Quote</button></>}>
          <div className="fg"><label>Work Item</label><input value={form.workItem} onChange={e=>setForm(f=>({...f,workItem:e.target.value}))} placeholder="e.g. False Ceiling — Living Room" /></div>
          <div className="fg"><label>Contractor</label><select value={form.contractor} onChange={e=>setForm(f=>({...f,contractor:e.target.value}))}><option value="">Select…</option>{contractors.map(c=><option key={c.id}>{c.name}</option>)}</select></div>
          <div className="fr">
            <div className="fg"><label>Quoted to Client (₹)</label><input type="number" value={form.clientQuote} onChange={e=>setForm(f=>({...f,clientQuote:e.target.value}))} /></div>
            <div className="fg"><label>Contractor Quote (₹)</label><input type="number" value={form.contractorQuote} onChange={e=>setForm(f=>({...f,contractorQuote:e.target.value}))} /></div>
          </div>
          <div className="fg"><label>Paid till Date (₹)</label><input type="number" value={form.paidToContractor} onChange={e=>setForm(f=>({...f,paidToContractor:e.target.value}))} /></div>
          {form.clientQuote&&form.contractorQuote&&(
            <div style={{background:B.goldBg,border:`1px solid ${B.goldBorder}`,borderRadius:8,padding:"12px 16px",marginTop:8}}>
              <div style={{fontSize:12,color:B.muted}}>Estimated Profit</div>
              <div style={{fontSize:20,fontFamily:"Georgia,serif",color:B.green,marginTop:2}}>{fmt(Number(form.clientQuote)-Number(form.contractorQuote))} <span style={{fontSize:13,color:B.muted}}>({pct(Number(form.clientQuote)-Number(form.contractorQuote),Number(form.clientQuote))}% margin)</span></div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

// ── LEDGER ────────────────────────────────────────────────────────────────
function Ledger({ projId, ledger, setLedger, toast }) {
  const [modal, setModal] = useState(false);
  const [tab, setTab] = useState("All");
  const [form, setForm] = useState({ date:TODAY, description:"", type:"DR", amount:"", category:"Labour", ref:"" });
  const totalCR = ledger.filter(l=>l.type==="CR").reduce((s,l)=>s+l.amount,0);
  const totalDR = ledger.filter(l=>l.type==="DR").reduce((s,l)=>s+l.amount,0);

  let running=0;
  const withBal=[...ledger].sort((a,b)=>a.date.localeCompare(b.date)).map(l=>{
    running+=l.type==="CR"?l.amount:-l.amount;
    return{...l,balance:running};
  });
  const visible=tab==="All"?withBal:withBal.filter(l=>l.type===tab);

  const add = async () => {
    const res = await sb("ledger","POST",{ project_id:projId, date:form.date, description:form.description, type:form.type, amount:Number(form.amount), category:form.category, ref:form.ref });
    setLedger(l=>[...l,...res]);
    setModal(false); toast("Entry saved!");
    setForm({ date:TODAY, description:"", type:"DR", amount:"", category:"Labour", ref:"" });
  };

  return (
    <div>
      <div className="sec-head">
        <div><div className="sec-title">Cash Book & Ledger</div><div className="sec-sub">All receipts and payments</div></div>
        <button className="btn btn-gold" onClick={()=>setModal(true)}>+ Add Entry</button>
      </div>
      <div className="stats-row">
        <div className="stat t-green"><div className="stat-label">Total Receipts</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalCR)}</div></div>
        <div className="stat t-red"><div className="stat-label">Total Payments</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalDR)}</div></div>
        <div className="stat t-gold"><div className="stat-label">Cash Balance</div><div className="stat-value" style={{fontSize:18}}>{fmt(totalCR-totalDR)}</div></div>
        <div className="stat t-black"><div className="stat-label">Entries</div><div className="stat-value">{ledger.length}</div></div>
      </div>
      <div className="card">
        <div className="tabs">
          {["All","CR","DR"].map(t=><div key={t} className={`tab ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t==="All"?"All Entries":t==="CR"?"Receipts":"Payments"}</div>)}
        </div>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Date</th><th>Description</th><th>Category</th><th>Ref</th><th className="tr">Receipt</th><th className="tr">Payment</th><th className="tr">Balance</th></tr></thead>
            <tbody>
              {visible.length===0?<tr><td colSpan={7} style={{textAlign:"center",color:B.muted,padding:32}}>No entries.</td></tr>:
                visible.map(l=>(
                  <tr key={l.id}>
                    <td style={{fontSize:12,whiteSpace:"nowrap"}}>{l.date}</td>
                    <td style={{fontWeight:600}}>{l.description}</td>
                    <td><span className="badge bgr">{l.category}</span></td>
                    <td style={{fontSize:12,color:B.muted}}>{l.ref}</td>
                    <td className="tr cr mono">{l.type==="CR"?fmt(l.amount):""}</td>
                    <td className="tr dr mono">{l.type==="DR"?fmt(l.amount):""}</td>
                    <td className="tr mono" style={{color:l.balance>=0?B.green:B.red,fontWeight:700}}>{fmt(Math.abs(l.balance))}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modal&&(
        <Modal title="New Ledger Entry" onClose={()=>setModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setModal(false)}>Cancel</button><button className="btn btn-gold" onClick={add}>Save</button></>}>
          <div className="fr">
            <div className="fg"><label>Date</label><input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))} /></div>
            <div className="fg"><label>Type</label><select value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}><option value="DR">Payment (DR)</option><option value="CR">Receipt (CR)</option></select></div>
          </div>
          <div className="fg"><label>Description</label><input value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} /></div>
          <div className="fr">
            <div className="fg"><label>Category</label><select value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>{["Labour","Material","Consultant","Receipt","Advance","Other"].map(c=><option key={c}>{c}</option>)}</select></div>
            <div className="fg"><label>Amount (₹)</label><input type="number" value={form.amount} onChange={e=>setForm(f=>({...f,amount:e.target.value}))} /></div>
          </div>
          <div className="fg"><label>Reference</label><input value={form.ref} onChange={e=>setForm(f=>({...f,ref:e.target.value}))} placeholder="Cheque / UPI / Invoice no." /></div>
        </Modal>
      )}
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────
const PAGES = [
  { id:"dashboard", label:"Dashboard", icon:"⬜" },
  { id:"tasks", label:"Tasks", icon:"✅" },
  { id:"contractors", label:"Contractors", icon:"👷" },
  { id:"attendance", label:"Attendance", icon:"📋" },
  { id:"materials", label:"Materials", icon:"📦" },
  { id:"updates", label:"Work Updates", icon:"📝" },
  { id:"quotes", label:"Contractor Quotes", icon:"💰" },
  { id:"ledger", label:"Ledger", icon:"📒" },
];

export default function App() {
  const [page, setPage] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [ledger, setLedger] = useState([]);
  const [toastMsg, setToastMsg] = useState("");
  const [dbReady, setDbReady] = useState(false);

  const toast = (msg) => { setToastMsg(msg); setTimeout(()=>setToastMsg(""),2500); };

  // Init DB tables
  useEffect(() => {
    const init = async () => {
      try {
        await sb("projects?limit=1");
        setDbReady(true);
      } catch(e) {
        toast("⚠️ Database not set up yet. See setup instructions.");
      }
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!dbReady) return;
    sb("projects?order=created_at.asc").then(data => { setProjects(data||[]); setLoading(false); });
  }, [dbReady]);

  const loadProject = async (id) => {
    setActiveId(id); setPage("dashboard");
    const [t,c,a,m,u,q,l] = await Promise.all([
      sb(`tasks?project_id=eq.${id}&order=created_at.asc`),
      sb(`contractors?project_id=eq.${id}&order=created_at.asc`),
      sb(`attendance?project_id=eq.${id}&order=date.desc`),
      sb(`materials?project_id=eq.${id}&order=created_at.asc`),
      sb(`updates?project_id=eq.${id}&order=created_at.desc`),
      sb(`quotes?project_id=eq.${id}&order=created_at.asc`),
      sb(`ledger?project_id=eq.${id}&order=date.asc`),
    ]);
    setTasks(t||[]); setContractors(c||[]); setAttendance(a||[]);
    setMaterials(m||[]); setUpdates(u||[]); setLedger(l||[]);
    setQuotes((q||[]).map(r=>({ id:r.id, workItem:r.work_item, contractor:r.contractor, clientQuote:r.client_quote, contractorQuote:r.contractor_quote, paidToContractor:r.paid_to_contractor })));
  };

  const createProject = async (data) => {
    const res = await sb("projects","POST",{ name:data.name, location:data.location, area:data.area, budget:data.budget, start_date:data.startDate||null, end_date:data.endDate||null, completion:data.completion||0, color:data.color });
    setProjects(p=>[...p,...res]);
    toast("Project created!");
  };

  const deleteProject = async (id) => {
    await sb(`projects?id=eq.${id}`,"DELETE");
    setProjects(p=>p.filter(x=>x.id!==id));
    toast("Project deleted.");
  };

  const proj = projects.find(p=>p.id===activeId);

  if (loading) return (<><style>{css}</style><div className="loading">Loading Ambience Architects…</div></>);

  if (!dbReady) return (
    <><style>{css}</style>
    <div style={{maxWidth:600,margin:"80px auto",padding:32}}>
      <div style={{fontFamily:"Georgia,serif",fontSize:28,color:B.black,marginBottom:8}}>Ambience Architects</div>
      <div style={{fontSize:14,color:B.red,marginBottom:24,fontWeight:600}}>⚠️ Database setup required</div>
      <div style={{fontSize:13,color:B.text,lineHeight:1.8}}>
        Please go to your <b>Supabase dashboard</b> → <b>SQL Editor</b> and run the setup SQL provided.
      </div>
    </div></>
  );

  return (
    <><style>{css}</style>
    <Toast msg={toastMsg} />
    <div className="app">
      <nav className="sidebar">
        <div className="brand" onClick={()=>{setActiveId(null);setPage("projects");}}>
          <div className="brand-name">Ambience<br/>Architects</div>
        </div>
        {!proj?(
          <div className="nav-section">
            <div className="nav-label">Navigation</div>
            <div className="nav-item active"><span className="nav-icon">🏗️</span>All Projects</div>
          </div>
        ):(
          <>
            <div className="nav-section" style={{paddingBottom:0}}>
              <div className="nav-label">Project</div>
              <div style={{padding:"4px 12px 12px"}}>
                <div style={{background:"rgba(201,161,59,0.1)",border:"1px solid rgba(201,161,59,0.2)",borderRadius:6,padding:"8px 12px"}}>
                  <div style={{fontSize:12.5,fontWeight:700,color:B.gold,lineHeight:1.4}}>{proj.name}</div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.35)",marginTop:2}}>{proj.location}</div>
                </div>
              </div>
            </div>
            <div className="nav-divider" />
            <div className="nav-section">
              <div className="nav-label">Modules</div>
              {PAGES.map(p=>(
                <div key={p.id} className={`nav-item ${page===p.id?"active":""}`} onClick={()=>setPage(p.id)}>
                  <span className="nav-icon">{p.icon}</span>{p.label}
                </div>
              ))}
            </div>
            <div className="nav-divider" />
            <div className="nav-section">
              <div className="nav-label">Switch Project</div>
              {projects.map(p=>(
                <div key={p.id} className={`nav-item ${p.id===activeId?"active":""}`} onClick={()=>loadProject(p.id)} style={{fontSize:12}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:p.color||B.gold,flexShrink:0}} />
                  {p.name}
                </div>
              ))}
              <div className="nav-item" onClick={()=>{setActiveId(null);setPage("projects");}}><span className="nav-icon">🏗️</span>All Projects</div>
            </div>
          </>
        )}
        <div style={{marginTop:"auto",padding:"14px 20px",borderTop:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.2)",lineHeight:1.8}}>Interior Project Manager<br/>Powered by Supabase</div>
        </div>
      </nav>
      <div className="main">
        <div className="topbar">
          <div>
            <div className="topbar-title">{page==="projects"?"All Projects":PAGES.find(p=>p.id===page)?.label}</div>
            <div className="topbar-sub">{proj?`${proj.name} · ${proj.location}`:`${projects.length} projects · Ambience Architects`}</div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            {proj&&<span style={{background:B.goldBg,border:`1px solid ${B.goldBorder}`,color:B.goldDark,fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20}}>Active · {proj.completion||0}% done</span>}
            <span style={{fontSize:12,color:B.muted}}>{TODAY}</span>
          </div>
        </div>
        <div className="content">
          {page==="projects"&&<Projects projects={projects} loading={loading} onCreate={createProject} onOpen={loadProject} onDelete={deleteProject} />}
          {proj&&page==="dashboard"&&<Dashboard proj={proj} tasks={tasks} ledger={ledger} materials={materials} attendance={attendance} updates={updates} />}
          {proj&&page==="tasks"&&<Tasks projId={proj.id} tasks={tasks} setTasks={setTasks} toast={toast} />}
          {proj&&page==="contractors"&&<Contractors projId={proj.id} contractors={contractors} setContractors={setContractors} toast={toast} />}
          {proj&&page==="attendance"&&<Attendance projId={proj.id} contractors={contractors} attendance={attendance} setAttendance={setAttendance} toast={toast} />}
          {proj&&page==="materials"&&<Materials projId={proj.id} materials={materials} setMaterials={setMaterials} toast={toast} />}
          {proj&&page==="updates"&&<Updates projId={proj.id} contractors={contractors} updates={updates} setUpdates={setUpdates} toast={toast} />}
          {proj&&page==="quotes"&&<Quotes projId={proj.id} contractors={contractors} quotes={quotes} setQuotes={setQuotes} toast={toast} />}
          {proj&&page==="ledger"&&<Ledger projId={proj.id} ledger={ledger} setLedger={setLedger} toast={toast} />}
        </div>
      </div>
    </div>
    </>
  );
}
