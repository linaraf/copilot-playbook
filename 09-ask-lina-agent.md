# "Ask Lina" Agent — Build & Deploy Guide

How to build a self-service AI agent that answers the questions you normally field —
so your team has somewhere to go while you're on sabbatical. No code required.
Built in **Copilot Studio** and published to **Teams**.

> This is the Phase 2 "AI Guru Bot" from the README, scoped for a one-month cover period.

---

## What This Agent Is (and Isn't)

**It IS:** a friendly first responder for Copilot questions. It knows this entire
playbook and answers in your voice. Think of it as "Lina's brain on the FAQ stuff."

**It does well:**
- "How do I use Copilot for [task]?"
- "Is there a prompt for [X]?" → points to the Prompt Library
- "Are we allowed to put [data] into Copilot?" → answers from the Governance page
- "Help me write a better prompt for…"
- Onboarding a new starter to the Copilot tools

**It does NOT do** (by design — set this expectation up front):
- Approvals, sign-offs, or anything needing human authority
- Questions outside its knowledge sources (it should say "I don't know, ask [backup]")
- Anything confidential or judgment-heavy that's really *your* call

**Golden rule:** the agent handles the routine 80%. Everything else escalates to a
named backup human. Always have a backup human.

---

## Before You Start

You'll need:
- A **Copilot Studio** licence (check with [IT Contact])
- Your playbook content in SharePoint (files `01`–`08`)
- 1–2 hours
- A backup contact for when the agent can't help (`[Backup name]` + their email/Teams)

---

## Step-by-Step Build

### 1. Create the agent
1. Go to [copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)
2. Click **+ New agent**
3. Name it: **Ask Lina**
4. Description: *"Your stand-in for Copilot questions while Lina is on sabbatical. Ask me how to use any Copilot tool, find a prompt, or check what's allowed."*
5. Skip the conversational setup if offered — paste the instructions from Step 3 instead.

### 2. Add knowledge sources
This is what makes it *your* agent. Point it at:
- The **SharePoint site** for this playbook (whole site, or these pages specifically):
  - Agents & Tools Directory (`07`)
  - Prompt Library (`02`)
  - Learning Paths (`03`)
  - Use Cases Gallery (`06`)
  - Governance (`05`)
- Any FAQ doc or recorded answers you have
- (Optional) A short "From Lina" note you write — see Step 4

> Tip: knowledge = SharePoint pages, Word docs, PDFs. The richer the source, the better
> the answers. Don't point it at confidential HR/finance content.

### 3. Write the instructions (the persona)

Paste this into the agent's **Instructions** field and edit the bracketed bits:

```
You are "Ask Lina," a stand-in for Lina while she is on sabbatical for [Month].
You help colleagues at [Company Name] use Microsoft Copilot confidently.

YOUR PERSONALITY:
- Warm, encouraging, and plain-spoken — like a helpful colleague, never a robot.
- Assume the person is busy and may be new to AI. No jargon unless you explain it.
- Be concise. Lead with the answer, then a short "how," then a relevant link.

WHAT YOU KNOW:
- Everything in the Copilot Playbook (tools, prompts, learning paths, use cases, governance).
- When someone asks how to do something, point them to the exact prompt or use case
  if one exists, and link to it.

HOW TO ANSWER:
- If a prompt exists in the Prompt Library for their need, give it to them verbatim.
- For "how do I use [tool]" questions, answer from the Agents & Tools Directory.
- For "am I allowed to…" questions, answer ONLY from the Governance page. If it's not
  covered there, do NOT guess — say so and escalate.

WHAT YOU MUST NOT DO:
- Never invent policy, approvals, or facts not in your knowledge sources.
- Never handle confidential, HR, legal, or financial decisions.
- If you don't know, or it needs a human, say:
  "That's one for a human while Lina's away — please contact [Backup name] at [backup contact]."

ALWAYS end uncertain answers by offering the backup contact. It's better to escalate
than to guess.
```

### 4. (Optional but recommended) A note from you
Write a short "From Lina" message and add it as a knowledge doc, so the agent can
relay it. Example:

```
Hi! I'm on sabbatical for [Month] and built this agent so you're not stuck.
It knows the whole Copilot Playbook. For anything it can't answer, [Backup name]
is covering for me. Keep experimenting while I'm away — see you in [return month]!
```

### 5. Test it
Use the built-in **Test** panel. Try these, and check the answers are accurate and
in-voice:
- "How do I summarize a long Teams meeting?"
- "Is there a prompt for writing a status update?"
- "Can I paste customer data into Copilot?"  ← must answer from Governance, not guess
- "Can you approve my expense report?"  ← must escalate to the backup human
- "I'm brand new — where do I start?"  ← should point to Learning Paths

Tune the instructions until it behaves. Add FAQs to knowledge for any gaps.

### 6. Publish to Teams
1. Click **Publish**
2. Go to **Channels → Microsoft Teams → Add channel**
3. Share the install link, or have IT push it to the pilot team / whole company
4. People can now `@Ask Lina` in Teams or open it as a personal chat

---

## Set Expectations (do this before you leave)

Send one message to the team:
- What "Ask Lina" can and can't do
- Who the backup human is for everything else
- A reminder that it's not *actually* you — it can't make decisions on your behalf

This single message prevents 90% of the "the bot was wrong" frustration.

---

## Governance Notes

- The agent only knows what you feed it — keep confidential content out of its sources.
- Answers are only as current as the SharePoint pages; update them before you go.
- Remind users the agent can make mistakes — verify anything important (same rule as
  the Governance page).
- Decommission or hand over the agent when you return, or keep it as a permanent
  "AI FAQ Bot" (it's useful even when you're back).

---

## Quick Checklist

- [ ] Copilot Studio licence confirmed with IT
- [ ] Playbook pages live and up to date in SharePoint
- [ ] Agent created and named "Ask Lina"
- [ ] Knowledge sources connected (playbook pages)
- [ ] Instructions pasted and personalised
- [ ] Backup human named in the instructions
- [ ] Tested against the 5 sample questions above
- [ ] Published to Teams
- [ ] "How to use Ask Lina" message sent to the team

---

*Built with Claude Code | Copilot Playbook v1.0*
