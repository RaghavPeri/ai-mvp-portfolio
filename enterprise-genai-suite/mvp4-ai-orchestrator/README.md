# ✍️ MVP 4: AI Content Studio with Orchestrator

This flagship MVP is a centralized AI Content Studio designed to orchestrate multi-agent workflows for generating, reviewing, and refining product content. It enables marketing, compliance, and creative teams to collaborate in real time through role-based interfaces and task-specific AI modules.

Built to support scalable AI adoption in retail environments, it serves as a modular command center integrating image generation, copywriting, code assistance, and review rewriting — all governed through a centralized orchestrator and secure session handling.

---

## 💡 Features

- **Modular AI Workflows**: Image Generator, Review Rewriter, Code Assistant, and more — each in its own tab
- **AI Orchestrator Module**: Role-based coordination of agents such as QA, Compliance, and Publisher
- **Session Control**: Track content history, input/output flows, and validation outcomes
- **User Authentication UI (Demo-Only)**: Simulated login flow and role-specific access handling
- **Custom Logging**: Tracks generation outcomes and reviewer decisions
- **Enterprise UX**: Minimal, modern, brand-consistent layout using Tailwind and component architecture

---

## ⚙️ How It Works

1. **Navigation**:
   - Top nav bar for switching between modules
   - AI Orchestrator acts as the control center to validate or route content

2. **Module Interaction**:
   - Each module (e.g., Image Generator, Review Rewriter) accepts user input, generates outputs via OpenAI, and routes through role agents

3. **Agent Roles**:
   - Agents act independently in reviewing or critiquing output based on brand tone, clarity, compliance, and publishability

4. **Logging & Review**:
   - All interactions are logged with agent decisions stored for each session

---

## 🧠 Why It’s Enterprise-Grade

- **Unified Platform** for creative, compliance, and QA teams
- **Plug-and-Play Architecture** to add or remove AI modules
- **Role-Based Review Pipelines** modeled after real enterprise governance (QA, Legal, Brand)
- **Persistent Session Views** and audit-friendly output history
- Easily extendable to **CMS/PIM/DAM integrations** in enterprise content ecosystems

---

## 🛠️ Stack

| Component         | Tech Used                      |
|------------------|--------------------------------|
| Frontend UI      | React 18 + Tailwind CSS        |
| State Management | React Context / Hooks          |
| Backend API      | Express.js (Node)              |
| LLM Engine       | OpenAI (GPT-4 for generation, role agents) |
| Database         | PostgreSQL (Neon)              |
| Deployment       | Replit (Dev), ready for Vercel |
| Auth UI          | Role-based access simulation (demo scope) |

---

## 🚀 Deployment (Dev to Prod)

This project is dev-hosted on Replit and is production-ready for deployment to Vercel or Render.

### To deploy:

1. Clone the repo and install dependencies  
   ```bash
   npm install

2. Set up environment variables
   ```bash
   Copy .env.example → .env

Add your OpenAI key and Neon DB URL

3. For local testing:
   ```bash
   npm run dev

4. To deploy on Vercel:

Connect GitHub repo to Vercel

Add environment variables in Vercel dashboard

Deploy frontend (client/) and backend (server/) as monorepo

✅ Already tested for monorepo compatibility.

---

## 🗂️ File Structure

```
├── client/                      → Frontend (React + Tailwind)
│   ├── components/              → UI blocks (navbar, cards, form elements)
│   ├── pages/                   → ImageGenerator.tsx, ReviewRewriter.tsx, Orchestrator.tsx
│   └── context/                 → Role context and session handler
│
├── server/                      → Express backend API for LLM calls
│   ├── routes/                  → Endpoints for each module
│   └── orchestrator.js          → Agent coordination logic
│
├── shared/                      → Types, prompt templates, constants
├── db/                          → PostgreSQL connection and table schema (Neon)
├── tailwind.config.ts           → Custom design system
├── vite.config.ts               → Vite build config
├── tsconfig.json                → TypeScript config
├── ENTERPRISE_DEPLOYMENT.md     → Setup guide for cloud deployment
```

👉 A `.env.example` file is included to show required keys — copy it to `.env` and fill in your values.


---

## 🧭 Roadmap

- [ ] Add real authentication (currently mock login for demo)
- [ ] Integrate CMS connector (e.g., Contentful or Sanity.io)
- [ ] Add analytics dashboard for content usage and decision logs
- [ ] Auto-save session to PIM/DAM systems (optional plugins)

---

## ✅ Status

🟢 Working MVP  
✅ Modular, orchestrated, role-aware content studio  
🧩 Extendable into a production-grade content operating system

---
## 🔗 Related

- 📁 [Back to Enterprise GenAI Suite](../)  
- 📹 [Watch demo (8:13)](https://youtu.be/0Ht1q3K1rwE?si=a0_m8NHXDx2QEL88)

---

## 🙏 Credits & Inspiration

Inspired by internal AI workflows used by marketing and compliance teams in retail organizations.  
OpenAI’s agent patterns and LangChain’s orchestration logic helped shape the review system.

This MVP was built as part of the [Enterprise GenAI Suite](../) by Raghav Peri.

