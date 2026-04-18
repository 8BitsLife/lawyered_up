import React from "react";
import { useNavigate } from "react-router-dom";

const navigationItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "cases", label: "Case Pipeline" },
  { key: "messages", label: "Messages" },
  { key: "reviews", label: "Reputation" }
];

const kpiCards = [
  { label: "Active Cases", value: "14", delta: "+3 this week", tone: "blue" },
  { label: "New Leads", value: "27", delta: "+11% conversion", tone: "indigo" },
  { label: "Revenue (MTD)", value: "$18,420", delta: "+8.4% vs last month", tone: "violet" },
  { label: "Avg Response", value: "42m", delta: "Top 12% in city", tone: "slate" }
];

const leadColumns = [
  {
    title: "New Requests",
    count: 6,
    tone: "blue",
    items: [
      { title: "Contract Review", client: "Arjun Malhotra", budget: "$1,200", priority: "High" },
      { title: "Land Dispute", client: "Riya Patel", budget: "$2,800", priority: "Medium" }
    ]
  },
  {
    title: "In Consultation",
    count: 4,
    tone: "indigo",
    items: [
      { title: "Employment Termination", client: "Samir Khan", budget: "$3,500", priority: "High" },
      { title: "Criminal Defense", client: "Nina Shah", budget: "$5,000", priority: "Urgent" }
    ]
  },
  {
    title: "Awaiting Decision",
    count: 5,
    tone: "violet",
    items: [
      { title: "Family Settlement", client: "Aditi Rao", budget: "$2,200", priority: "Low" },
      { title: "Tenant Eviction", client: "Kabir Mehta", budget: "$1,900", priority: "Medium" }
    ]
  }
];

const caseRows = [
  { id: "LUP-1001", title: "Divorce Case", client: "Jay Mehta", city: "New York", value: "$2,000", phase: "Drafting" },
  { id: "LUP-1002", title: "Workplace Harassment", client: "Priya Singh", city: "Chicago", value: "$3,200", phase: "Evidence Review" },
  { id: "LUP-1003", title: "Property Transfer", client: "Rahul Arora", city: "Los Angeles", value: "$2,600", phase: "Verification" },
  { id: "LUP-1004", title: "Criminal Defense", client: "Nikhil Roy", city: "San Francisco", value: "$6,400", phase: "Court Prep" }
];

const messageThreads = [
  { name: "Jay Mehta", topic: "Divorce filing timeline", time: "2m", unread: true },
  { name: "Priya Singh", topic: "Documents shared", time: "15m", unread: true },
  { name: "Rahul Arora", topic: "Need a quick call", time: "1h", unread: false },
  { name: "Support Ops", topic: "Payout released", time: "3h", unread: false }
];

const reviewRows = [
  { client: "Ananya Rao", stars: 5, summary: "Clear legal strategy and strong communication.", caseType: "Family Law", date: "Apr 12" },
  { client: "Michael Torres", stars: 4, summary: "Very responsive, precise documentation.", caseType: "Employment", date: "Apr 09" },
  { client: "Sara Kim", stars: 5, summary: "Excellent courtroom preparation support.", caseType: "Criminal", date: "Apr 05" }
];

function initials(firstName, lastName) {
  const a = (firstName || "L").charAt(0).toUpperCase();
  const b = (lastName || "U").charAt(0).toUpperCase();
  return `${a}${b}`;
}

function toneClass(tone) {
  if (tone === "blue") return "from-blue-600 to-blue-400";
  if (tone === "indigo") return "from-indigo-600 to-indigo-400";
  if (tone === "violet") return "from-violet-600 to-violet-400";
  return "from-slate-700 to-slate-500";
}

function priorityClass(priority) {
  if (priority === "Urgent") return "bg-red-100 text-red-700";
  if (priority === "High") return "bg-amber-100 text-amber-700";
  if (priority === "Medium") return "bg-blue-100 text-blue-700";
  return "bg-slate-100 text-slate-700";
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
        active ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

function Sidebar({ user, activeTab, setActiveTab, onLogout }) {
  const fullName = `${user.firstName || "Lawyer"} ${user.lastName || ""}`.trim();

  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-sm font-black text-white">
            {initials(user.firstName, user.lastName)}
          </div>
          <div>
            <p className="text-lg font-black text-slate-900">{fullName}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{user.role.toLowerCase()}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-slate-50 p-2">
            <p className="font-semibold text-slate-500">Success Rate</p>
            <p className="text-sm font-black text-slate-900">91%</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <p className="font-semibold text-slate-500">Rating</p>
            <p className="text-sm font-black text-slate-900">4.8/5</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="px-2 pb-2 text-xs font-bold uppercase tracking-[0.11em] text-slate-400">Workspace</p>
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition ${
                activeTab === item.key ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-black text-slate-900">Focus Window</p>
        <p className="mt-1 text-xs font-medium text-slate-500">You have 2 hearings and 5 pending responses today.</p>
        <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-xs font-bold uppercase tracking-[0.1em] text-white">Open Calendar</button>
        <button
          onClick={onLogout}
          className="mt-2 w-full rounded-lg border border-slate-200 py-2 text-xs font-bold uppercase tracking-[0.1em] text-slate-600"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

function TopCommandBar({ firstName, activeTab, setActiveTab }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Lawyer Command Center</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Good to see you, {firstName}</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {navigationItems.map((item) => (
            <TabButton key={item.key} active={activeTab === item.key} onClick={() => setActiveTab(item.key)}>
              {item.label}
            </TabButton>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-[1.2fr_1fr_1fr_auto]">
        <input
          placeholder="Search client, case id, or keyword"
          className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400"
        />
        <select className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700">
          <option>Practice Area</option>
          <option>Family Law</option>
          <option>Criminal Defense</option>
          <option>Corporate Law</option>
        </select>
        <select className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700">
          <option>Priority</option>
          <option>Urgent</option>
          <option>High</option>
          <option>Medium</option>
        </select>
        <button className="h-11 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-500 px-5 text-sm font-semibold text-white">Run Search</button>
      </div>
    </div>
  );
}

function DashboardTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-4">
        {kpiCards.map((item) => (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-black text-slate-900">{item.value}</p>
            <div className="mt-2 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${toneClass(item.tone)}`}></div>
              <p className="text-xs font-semibold text-slate-500">{item.delta}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">Lead Pipeline</h3>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">Configure</button>
          </div>

          <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
            {leadColumns.map((column) => (
              <div key={column.title} className="rounded-xl bg-slate-50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-black text-slate-900">{column.title}</p>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-600">{column.count}</span>
                </div>
                <div className="space-y-2">
                  {column.items.map((item) => (
                    <div key={item.title} className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="text-sm font-black text-slate-900">{item.title}</p>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">{item.client}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600">{item.budget}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${priorityClass(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-black text-slate-900">Today Schedule</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-bold text-slate-900">10:30 AM - Client Call</p>
                <p className="text-xs text-slate-500">Jay Mehta | Divorce strategy review</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-bold text-slate-900">1:00 PM - Draft Review</p>
                <p className="text-xs text-slate-500">Priya Singh | Employment complaint</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="font-bold text-slate-900">4:15 PM - Court Prep</p>
                <p className="text-xs text-slate-500">Nikhil Roy | Criminal defense</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="text-lg font-black text-slate-900">Revenue Sparkline</h3>
            <div className="mt-3 flex h-32 items-end gap-2">
              {[22, 30, 41, 38, 52, 63, 58, 72, 81].map((height) => (
                <div key={height} className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 to-blue-300" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CasesTab() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-black text-slate-900">Case Pipeline</h3>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">Filters</button>
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600">Sort by Value</button>
          <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">New Case</button>
        </div>
      </div>

      <div className="space-y-2">
        {caseRows.map((row) => (
          <div key={row.id} className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 p-3 md:grid-cols-[0.9fr_1.2fr_1fr_0.7fr_0.8fr_auto] md:items-center">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">{row.id}</p>
            <p className="font-bold text-slate-900">{row.title}</p>
            <p className="text-sm font-medium text-slate-600">{row.client} | {row.city}</p>
            <p className="text-sm font-bold text-slate-800">{row.value}</p>
            <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700 w-fit">{row.phase}</span>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900">Messages</h3>
        <button className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">Compose</button>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[280px_1fr_240px]">
        <div className="space-y-2">
          {messageThreads.map((thread) => (
            <button key={thread.name} className="w-full rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black text-slate-900">{thread.name}</p>
                <span className="text-xs font-semibold text-slate-400">{thread.time}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{thread.topic}</p>
              {thread.unread && <span className="mt-2 inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-700">Unread</span>}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-200 p-3">
          <div className="border-b border-slate-200 pb-2">
            <p className="font-black text-slate-900">Jay Mehta</p>
            <p className="text-xs font-semibold text-slate-500">Divorce filing timeline</p>
          </div>

          <div className="mt-3 space-y-2 text-sm">
            <div className="max-w-[86%] rounded-lg bg-slate-100 p-3 text-slate-700">Can we file next week? I have shared signed docs.</div>
            <div className="ml-auto max-w-[86%] rounded-lg bg-indigo-600 p-3 text-white">Yes. I will complete drafting tonight and send you the filing checklist.</div>
          </div>

          <div className="mt-3 flex gap-2">
            <input className="h-10 flex-1 rounded-lg border border-slate-200 px-3 text-sm" placeholder="Reply to client..." />
            <button className="rounded-lg bg-indigo-600 px-4 text-xs font-bold uppercase tracking-[0.1em] text-white">Send</button>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 p-3">
          <p className="text-sm font-black text-slate-900">Thread Insights</p>
          <div className="mt-2 space-y-2 text-xs">
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="font-semibold text-slate-500">Response SLA</p>
              <p className="font-black text-slate-900">32 minutes avg</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="font-semibold text-slate-500">Pending Docs</p>
              <p className="font-black text-slate-900">2 attachments</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2">
              <p className="font-semibold text-slate-500">Next Deadline</p>
              <p className="font-black text-slate-900">Apr 20, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Average Rating</p>
          <p className="mt-1 text-3xl font-black text-slate-900">4.8 / 5</p>
          <p className="text-xs text-slate-500">from 187 verified reviews</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Recommendation</p>
          <p className="mt-1 text-3xl font-black text-slate-900">96%</p>
          <p className="text-xs text-slate-500">would hire again</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">Case Closure Score</p>
          <p className="mt-1 text-3xl font-black text-slate-900">9.1</p>
          <p className="text-xs text-slate-500">timeliness + client satisfaction</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-xl font-black text-slate-900">Latest Client Feedback</h3>
        <div className="space-y-2">
          {reviewRows.map((row) => (
            <div key={row.client} className="rounded-xl border border-slate-200 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-black text-slate-900">{row.client}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">{row.caseType}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-amber-600">{"*".repeat(row.stars)}{"-".repeat(5 - row.stars)}</p>
                  <p className="text-[11px] font-semibold text-slate-400">{row.date}</p>
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{row.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LawyerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState("dashboard");

  const user = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("lawyeredup_user");
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }, []);

  React.useEffect(() => {
    if (!user || user.role !== "LAWYER") {
      navigate("/login");
    }
  }, [navigate, user]);

  const onLogout = () => {
    localStorage.removeItem("lawyeredup_user");
    navigate("/login");
  };

  if (!user || user.role !== "LAWYER") {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-[#eef2f8]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.12),transparent_28%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.14),transparent_30%)]"></div>

      <main className="relative w-full px-4 py-5 md:px-6 xl:px-8">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[290px_1fr]">
          <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

          <section className="space-y-4">
            <TopCommandBar firstName={user.firstName || "Counsel"} activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "dashboard" && <DashboardTab />}
            {activeTab === "cases" && <CasesTab />}
            {activeTab === "messages" && <MessagesTab />}
            {activeTab === "reviews" && <ReviewsTab />}
          </section>
        </div>
      </main>
    </div>
  );
}
