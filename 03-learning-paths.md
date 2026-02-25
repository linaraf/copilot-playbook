# Learning Paths — AI Copilot Playbook

Structured learning paths from beginner to advanced. Use this content to populate the Learning Hub page in SharePoint.

---

## BEGINNER PATH — "Copilot Curious"
**Goal:** Understand what AI and Copilot are, and start using them confidently for everyday tasks.
**Estimated total time:** ~6–8 hours across 2–3 weeks

---

### Module 1: What Is AI? What Is Copilot?
**Skill level:** Absolute beginner | **Time:** 45 min

| # | Course | Where | Duration | Free? |
|---|--------|--------|----------|-------|
| 1 | Intro to AI concepts | [Microsoft Learn: AI Fundamentals](https://learn.microsoft.com/en-us/training/paths/get-started-with-artificial-intelligence-on-azure/) | 30 min | Free |
| 2 | What is Microsoft Copilot? | [Microsoft Learn: Copilot Fundamentals](https://learn.microsoft.com/en-us/training/modules/fundamentals-generative-ai/) | 45 min | Free |
| 3 | Copilot overview video | Microsoft 365 YouTube channel | 10 min | Free |

**Module checkpoint:** Can you explain to a colleague in 2 sentences what Copilot is and what it does?

---

### Module 2: Copilot in Your Daily Tools
**Skill level:** Beginner | **Time:** 2 hours

| # | Course | Where | Duration |
|---|--------|--------|----------|
| 1 | Copilot in Outlook | [Microsoft Learn](https://learn.microsoft.com/en-us/training/modules/introduction-to-microsoft-365-copilot/) | 30 min |
| 2 | Copilot in Teams | Microsoft Learn or in-app help | 30 min |
| 3 | Copilot in Word | Microsoft Learn | 30 min |
| 4 | Copilot in Excel | Microsoft Learn | 30 min |

**Practice exercise:** Use Copilot in Outlook to draft a reply to an email you received today. Compare it to what you would have written. What did it do well? What did you change?

---

### Module 3: Writing Your First Great Prompts
**Skill level:** Beginner | **Time:** 1 hour

**What makes a great prompt? The CRIT Framework:**
- **C**ontext — tell Copilot who you are and why you need this
- **R**ole — ask it to behave as a specific expert
- **I**nstruction — be specific about what you want
- **T**one/Format — specify the output format and tone

**Example (weak):** `Write something about the project.`

**Example (strong):** `You are a senior project manager. Write a 1-page project status update for our Q3 product launch. Audience: senior leadership. Tone: professional and confident. Include: what's on track, one risk, and next milestones. Use a table for milestones.`

**Practice prompts to try:**
1. Summarize an email thread in 5 bullet points
2. Write an agenda for your next team meeting
3. Explain a concept from your work to a new starter
4. Draft a LinkedIn post about something you learned this week

**Resources:**
- [Microsoft Prompt Engineering Tips](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering)
- See Prompt Library on this site for 50 ready-to-use prompts

---

### Module 4: Copilot for Meetings
**Skill level:** Beginner | **Time:** 45 min

Key skills:
- Enable Copilot in Teams meetings (how to turn it on)
- Ask Copilot to take notes during a meeting
- Generate a meeting summary after the call
- Pull out action items automatically

**Copilot meeting prompts to try:**
- `"Summarize what was discussed so far"`
- `"What decisions have been made?"`
- `"List all action items with the person responsible"`
- `"What did [Person] say about [topic]?"`

**Note:** Recording or transcription must be enabled for Copilot to work in meetings.

---

### Module 5: Responsible AI Basics
**Skill level:** Beginner | **Time:** 30 min

**The 5 Rules of Responsible Copilot Use:**

1. **Never share confidential data** — Don't paste client names, personal data, financial figures, or passwords into Copilot chats
2. **Always review Copilot output** — It can be wrong. You are responsible for what you send or publish.
3. **Don't use it for regulated decisions alone** — HR decisions, legal advice, medical information — always involve a human expert
4. **Declare AI assistance when required** — Check your company's policy on disclosing AI-generated content
5. **Treat it like a smart intern** — Useful but needs supervision. Great at drafts, bad at facts without verification.

Resource: [Microsoft's Responsible AI Principles](https://www.microsoft.com/en-us/ai/responsible-ai)

**Beginner path complete! You are now a Copilot Curious ✅**

---

## INTERMEDIATE PATH — "Copilot Explorer"
**Goal:** Go deeper with specialist Copilot tools, start building and sharing use cases.
**Recommended:** Complete Beginner Path first
**Estimated total time:** ~8–10 hours

---

### Module 6: Copilot Analyst Deep Dive
**Skill level:** Intermediate | **Time:** 2 hours

Copilot Analyst is your data and file analysis power tool.

**What it can do:**
- Analyze Excel files and surface insights
- Compare documents and find differences
- Build charts and visualizations from data
- Answer questions about file contents
- Create pivot-style summaries

**Practice exercises:**
1. Upload a spreadsheet → ask "What are the top 3 trends in this data?"
2. Upload a long PDF or Word doc → ask "Summarize the key recommendations"
3. Upload two versions of a document → ask "What changed between these two versions?"

**Key tips:**
- Be specific about what you want analyzed — don't just say "analyze this"
- Ask follow-up questions to drill deeper
- Ask it to format output as a table or chart
- Use it for reports that would take you 30 minutes to read manually

---

### Module 7: Copilot Researcher Deep Dive
**Skill level:** Intermediate | **Time:** 2 hours

Copilot Researcher can search the web and synthesize information for you.

**What it can do:**
- Research topics with cited sources
- Summarize current news and trends
- Compare products, companies, or approaches
- Create briefings and research summaries
- Answer complex questions with evidence

**Practice exercises:**
1. Ask it to brief you on a trend relevant to your industry
2. Ask it to compare 3 competitors in your market
3. Ask it to research best practices for a process in your job
4. Ask it to find the latest thinking on a topic you're learning

**Key tips:**
- Always check the sources it cites — click through to verify
- Ask for "recent" information and a date range
- Use it to save hours of manual research, not to replace judgment
- Ask follow-up questions to go deeper on any section

---

### Module 8: Building Your First Copilot Agent
**Skill level:** Intermediate | **Time:** 3 hours

A Copilot Agent is a custom AI assistant built for a specific purpose.

**Use cases for agents:**
- A "Policy Expert" agent that knows your company policies
- An "Onboarding Helper" that answers new starter questions
- A "Meeting Coach" that gives feedback on meeting notes
- A "Prompt Suggester" that recommends prompts from the library

**How to build a basic agent (Copilot Studio):**
1. Go to [Copilot Studio](https://copilotstudio.microsoft.com)
2. Click **+ New agent**
3. Give it a name, description, and instructions (its "personality" and purpose)
4. Add knowledge sources (SharePoint pages, documents, websites)
5. Test it in the built-in chat
6. Deploy it to Teams

**Resources:**
- [Microsoft Copilot Studio documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- See Agents & Tools page on this site for templates

---

### Module 9: Advanced Prompting Techniques
**Skill level:** Intermediate | **Time:** 1.5 hours

**Technique 1: Chain of Thought**
Ask Copilot to think step by step before answering:
`Before you give me the answer, think through this problem step by step. Then give me your conclusion.`

**Technique 2: Few-Shot Examples**
Show it an example of what you want:
`Here's an example of the format I need: [example]. Now apply the same format to: [your content]`

**Technique 3: Persona Setting**
`For this conversation, you are a senior [role] with 15 years of experience. You are direct, practical, and don't waste words. You always flag risks.`

**Technique 4: Iterative Refinement**
Never accept the first draft. Always follow up with:
- `Make it shorter / more concise`
- `Make the tone more [formal/casual/urgent]`
- `Add more detail to the second section`
- `What did you leave out that might be important?`

**Technique 5: Ask for Alternatives**
`Give me 3 different versions of this: [content]. Each should take a different approach or tone.`

---

### Module 10: Microsoft AI Certifications
**Skill level:** Intermediate | **Time:** 4–8 hours study + exam

**Recommended certifications for beginners:**

| Certification | What It Covers | Link | Cost |
|--------------|---------------|------|------|
| AI-900: Azure AI Fundamentals | AI concepts, Azure AI services | [Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-fundamentals/) | ~$165 |
| MS-900: M365 Fundamentals | Microsoft 365 & Copilot overview | [Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/microsoft-365-fundamentals/) | ~$165 |
| Copilot Foundations (free badge) | Copilot basics, usage best practices | [Microsoft Learn](https://learn.microsoft.com/en-us/training/paths/copilot-foundations/) | Free |

**Free LinkedIn Learning Paths:**
- "Intro to Generative AI" (LinkedIn Learning)
- "Microsoft Copilot for Productivity" (LinkedIn Learning)
- Check if your company has a LinkedIn Learning license — these may be free for you

---

## ADVANCED PATH — "Copilot Pro"
**Goal:** Build solutions, lead others, and drive AI adoption in your team.
**Recommended:** Complete Intermediate Path first

---

### Module 11: Power Platform + Copilot
Power Automate flows triggered by AI actions
Power Apps with Copilot embedded
Power BI with AI visuals and Q&A

### Module 12: Copilot Studio — Advanced Agents
Multi-step conversation flows
Connecting agents to APIs and databases
Building agents for specific departments

### Module 13: AI Change Management
How to get people excited about AI (not scared)
Running an AI champion program
Measuring AI adoption and ROI
Presenting AI business cases to leadership

### Module 14: Microsoft AI-102 Certification
Designing and implementing Azure AI solutions
[Microsoft Learn: AI-102](https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/)

---

## Learning Tips for Beginners

1. **Learn by doing** — Don't just watch videos. Open Copilot and try every prompt you learn about.
2. **Experiment freely** — You can't break anything. Every "bad" result is a learning opportunity.
3. **Keep an experiment log** — Note what worked and what didn't in your OneNote AI Journal.
4. **Share your wins** — Post a use case in the gallery every time Copilot saves you significant time.
5. **Ask questions** — Post questions in the Community section or Teams channel.
6. **Teach someone else** — The best way to solidify learning is to explain it to a colleague.
