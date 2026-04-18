import React from "react";
import { useNavigate } from "react-router-dom";

const openCases = [
  { id: "C-2041", title: "Rental Agreement Dispute", lawyer: "Jessica Patel", status: "In Progress", nextDate: "Apr 21, 2026", budget: "$1,800" },
  { id: "C-1992", title: "Workplace Harassment Complaint", lawyer: "Michael Sharma", status: "Awaiting Docs", nextDate: "Apr 19, 2026", budget: "$2,400" },
  { id: "C-1877", title: "Property Title Verification", lawyer: "Sophia Verma", status: "Review Stage", nextDate: "Apr 23, 2026", budget: "$1,100" }
];

const proposals = [
  { name: "Aisha Khan", specialty: "Civil Litigation", quote: "$1,500", eta: "2 days" },
  { name: "Daniel Brooks", specialty: "Immigration Law", quote: "$1,200", eta: "1 day" },
  { name: "Robert Lee", specialty: "Real Estate Law", quote: "$2,000", eta: "3 days" }
];

const messages = [
  { name: "Jessica Patel", preview: "I reviewed your draft. Please upload the final signed copy.", time: "3m", unread: true },
  { name: "Michael Sharma", preview: "We can file this on Monday morning after your approval.", time: "24m", unread: false },
  { name: "Support Team", preview: "Your payment for case C-2041 was received successfully.", time: "2h", unread: false }
];

const documents = [
  { name: "Rental Agreement.pdf", type: "Contract", updated: "Apr 16" },
  { name: "Case Notes - Hearing 1.docx", type: "Notes", updated: "Apr 14" },
  { name: "Identity Proof.zip", type: "ID Pack", updated: "Apr 13" }
];

function UserInitials({ firstName, lastName }) {
  const first = (firstName || "C").charAt(0).toUpperCase();
  const last = (lastName || "L").charAt(0).toUpperCase();
  return <span>{`${first}${last}`}</span>;
}

function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

function DashboardTab({ firstName }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-600">Client Center</p>
          <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Welcome back, {firstName}</h2>
          <p className="mt-2 text-slate-600">Track your active matters, compare proposals, and stay in sync with your lawyers.</p>

          <div className="mt-5 grid grid-cols-1 gap-2 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
            <select className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700"><option>Legal Issue</option></select>
            <select className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700"><option>Location</option></select>
            <select className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700"><option>Budget</option></select>
            <button className="h-11 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 px-6 text-sm font-semibold text-white">Find Lawyers</button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Case Summary</p>
          <p className="mt-2 text-3xl font-black text-slate-900">3 Active Cases</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold">
              <span>Upcoming Hearings</span>
              <span className="text-blue-700">2</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold">
              <span>Unread Messages</span>
              <span className="text-blue-700">1</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold">
              <span>Pending Payments</span>
              <span className="text-blue-700">$350</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-black tracking-tight text-slate-900">Your Open Cases</h3>
            <button className="text-sm font-semibold text-blue-700">View All</button>
          </div>
          <div className="space-y-3">
            {openCases.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-black text-slate-900">{item.title}</p>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{item.status}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-600">{item.id} | Assigned to {item.lawyer}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
                  <span className="rounded-md bg-slate-100 px-2 py-1">Next date: {item.nextDate}</span>
                  <span className="rounded-md bg-slate-100 px-2 py-1">Budget: {item.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-2xl font-black tracking-tight text-slate-900">Best New Proposals</h3>
          <div className="mt-4 space-y-3">
            {proposals.map((item) => (
              <div key={item.name} className="rounded-xl border border-slate-200 p-4">
                <p className="font-black text-slate-900">{item.name}</p>
                <p className="text-sm font-medium text-slate-500">{item.specialty}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700">{item.quote}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">ETA {item.eta}</span>
                </div>
                <button className="mt-3 w-full rounded-lg bg-slate-900 py-2 text-xs font-bold uppercase tracking-wider text-white">View Profile</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CasesTab() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-3xl font-black tracking-tight text-slate-900">All Case Listings</h3>
        <div className="flex gap-2">
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">Filters</button>
          <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600">Sort</button>
        </div>
      </div>
      <div className="space-y-3">
        {openCases.map((item) => (
          <div key={item.id} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-[1.6fr_1fr_auto] md:items-center">
            <div>
              <p className="text-xl font-black text-slate-900">{item.title}</p>
              <p className="text-sm font-medium text-slate-500">{item.location}</p>
            </div>
            <div className="text-sm font-semibold text-slate-600">
              <p>Lawyer: {item.lawyer}</p>
              <p>Status: {item.status}</p>
            </div>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MessagesTab() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-3xl font-black tracking-tight text-slate-900">Messages</h3>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">New</button>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {messages.map((thread) => (
            <button key={thread.name} className="w-full rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50">
              <div className="flex items-center justify-between">
                <p className="font-black text-slate-900">{thread.name}</p>
                <span className="text-xs font-semibold text-slate-400">{thread.time}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{thread.preview}</p>
              {thread.unread && <span className="mt-2 inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">Unread</span>}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="font-black text-slate-900">Conversation with Jessica Patel</p>
          <div className="mt-3 space-y-2">
            <div className="max-w-[85%] rounded-xl bg-slate-100 p-3 text-sm text-slate-700">Please upload the signed agreement so we can proceed with filing.</div>
            <div className="ml-auto max-w-[85%] rounded-xl bg-blue-600 p-3 text-sm text-white">Uploading now. Can we also schedule a call tomorrow?</div>
          </div>
          <div className="mt-4 flex gap-2">
            <input className="h-11 flex-1 rounded-xl border border-slate-200 px-4 text-sm" placeholder="Type your message..." />
            <button className="rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentsTab() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-3xl font-black tracking-tight text-slate-900">Payment Timeline</h3>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <p className="font-black text-slate-900">Case C-2041 Milestone 1</p>
              <span className="text-sm font-bold text-green-600">Paid</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Paid on Apr 15, 2026 | $700</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <p className="font-black text-slate-900">Case C-1992 Consultation</p>
              <span className="text-sm font-bold text-amber-600">Due</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">Due on Apr 18, 2026 | $350</p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-2xl font-black tracking-tight text-slate-900">Quick Pay</h3>
        <p className="mt-2 text-sm text-slate-600">Pay pending invoices securely from here.</p>
        <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 py-3 text-sm font-semibold text-white">Pay $350 Now</button>
      </div>
    </div>
  );
}

function DocumentsTab() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-3xl font-black tracking-tight text-slate-900">Documents Vault</h3>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Upload</button>
      </div>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div key={doc.name} className="grid grid-cols-1 gap-2 rounded-xl border border-slate-200 p-4 md:grid-cols-[1.4fr_0.6fr_auto] md:items-center">
            <p className="font-black text-slate-900">{doc.name}</p>
            <p className="text-sm font-semibold text-slate-500">{doc.type} | {doc.updated}</p>
            <button className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700">Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientDashboard() {
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
    if (!user || user.role !== "CLIENT") {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user || user.role !== "CLIENT") return null;

  const fullName = `${user.firstName || "Client"} ${user.lastName || ""}`.trim();

  return (
    <div className="min-h-screen w-full bg-[#eef2f8]">
      <header className="border-b border-blue-300/30 bg-gradient-to-r from-[#1a3f8d] via-[#3569b8] to-[#3b82f6] px-5 py-4 text-white md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/40 bg-white/10 text-lg">&#9878;</div>
            <h1 className="text-4xl font-black tracking-tight">LawyeredUp</h1>
          </div>
          <div className="rounded-xl bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-sm">Client Workspace</div>
        </div>
      </header>

      <main className="w-full px-4 py-5 md:px-6 xl:px-8">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[280px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-sm font-bold text-white">
                  <UserInitials firstName={user.firstName} lastName={user.lastName} />
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900">{fullName}</p>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">client account</p>
                </div>
              </div>
              <button className="mt-4 text-sm font-semibold text-blue-700">Manage Profile</button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Navigation</p>
              <div className="space-y-1">
                <Tab active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>Dashboard</Tab>
                <Tab active={activeTab === "cases"} onClick={() => setActiveTab("cases")}>My Cases</Tab>
                <Tab active={activeTab === "messages"} onClick={() => setActiveTab("messages")}>Messages</Tab>
                <Tab active={activeTab === "payments"} onClick={() => setActiveTab("payments")}>Payments</Tab>
                <Tab active={activeTab === "documents"} onClick={() => setActiveTab("documents")}>Documents</Tab>
              </div>
            </div>
          </aside>

          <section className="space-y-4">
            {activeTab === "dashboard" && <DashboardTab firstName={user.firstName || "Client"} />}
            {activeTab === "cases" && <CasesTab />}
            {activeTab === "messages" && <MessagesTab />}
            {activeTab === "payments" && <PaymentsTab />}
            {activeTab === "documents" && <DocumentsTab />}
          </section>
        </div>
      </main>
    </div>
  );
}
