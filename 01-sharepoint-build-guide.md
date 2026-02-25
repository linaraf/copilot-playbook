# SharePoint Build Guide — AI Copilot Playbook

Step-by-step instructions to build your SharePoint Communication Site from scratch.

---

## STEP 1 — Create the Communication Site

1. Go to your Microsoft 365 home → click **SharePoint**
2. Click **+ Create site** → Choose **Communication site**
3. Fill in:
   - **Site name**: `AI Copilot Playbook`
   - **Site description**: `Your company's hub for all things AI — learn, share prompts, track progress, and become an AI Champion.`
   - **Language**: English
4. Click **Finish**

> Tip: Note the site URL (e.g. `yourcompany.sharepoint.com/sites/AIPlaybook`) — you'll need it for links.

---

## STEP 2 — Set Up Navigation

1. Click **Edit** on the top navigation bar
2. Add these top-level links:
   - Home
   - Learn
   - Prompts
   - Use Cases
   - My IDP
   - Certs & Badges
   - Agents & Tools
   - Community
   - Governance
3. Save

---

## STEP 3 — Build the Home Dashboard Page

Edit the home page and add these **web parts** in order:

### A. Hero Section
- Add web part: **Hero**
- Title: `Welcome to the AI Copilot Playbook`
- Subtitle: `Learn. Share. Grow. Become the AI Champion of your team.`
- Use an AI/tech-themed image (Microsoft provides free stock photos)
- Add a call-to-action button: `Start Learning` → links to Learn page

### B. AI Tip of the Day
- Add web part: **Text**
- Title: `AI Tip of the Day`
- Update this manually each morning (or weekly)
- Example tip: *"Try asking Copilot to 'summarize this email thread and suggest 3 action items' instead of reading the whole chain."*

### C. Quick Links
- Add web part: **Quick links**
- Add these cards:
  | Label | Link |
  |-------|------|
  | Start Learning | /sites/AIPlaybook/SitePages/Learn.aspx |
  | Prompt Library | /sites/AIPlaybook/Lists/PromptLibrary |
  | Log a Win | (your Use Cases form link) |
  | Submit a Prompt | (your Prompt form link) |
  | My IDP | /sites/AIPlaybook/Lists/AIIDP |
  | Microsoft Learn AI | https://learn.microsoft.com/en-us/ai/ |

### D. Featured This Week (optional)
- Add web part: **Call to action**
- Title: `Course of the Week`
- Update weekly with a highlighted course

### E. Activity Feed
- Add web part: **News**
- Source: `This site`
- This will automatically show new news posts you publish

---

## STEP 4 — Create the SharePoint Lists

Create each list by going to **Site contents** → **+ New** → **List**.

### List 1: AI IDP Tracker
Name: `AI IDP Tracker`

Add these columns (beyond default Title):
| Column Name | Type | Options |
|-------------|------|---------|
| Person | Person or Group | — |
| AI Skill Goal | Multiple lines of text | — |
| Learning Path | Choice | Beginner; Intermediate; Advanced; Role-Based |
| Target Date | Date and time | Date only |
| Status | Choice | Not Started; In Progress; Completed |
| Courses Completed | Number | Min: 0 |
| Certificates Earned | Number | Min: 0 |
| Notes | Multiple lines of text | — |
| Manager Sign-off | Yes/No | Default: No |

**Set up views:**
- Rename default view to `All Records (Admin)`
- Create a new view → Name: `My Goals` → Filter: `Person is equal to [Me]`
- Set `My Goals` as the default view

---

### List 2: Prompt Library
Name: `Prompt Library`

Add columns:
| Column Name | Type | Options |
|-------------|------|---------|
| The Prompt | Multiple lines of text | — |
| Category | Choice | Writing; Analysis; Meetings; Research; Email; Planning; Coding; Learning; General |
| Tool | Choice | Copilot (General); Copilot Analyst; Copilot Researcher; Copilot Agent; Teams Copilot; Outlook Copilot |
| Role / Use Case | Single line of text | — |
| Submitted By | Person or Group | — |
| Verified by AI Guru | Yes/No | Default: No |
| Star Rating | Number | Min 1, Max 5 |

**Set up views:**
- `All Prompts` — default, all approved prompts
- `By Category` — group by Category column
- `Top Rated` — sort by Star Rating descending
- `Pending Approval` — filter: Verified by AI Guru = No (admin use)

---

### List 3: Certs & Badges
Name: `Certs & Badges`

Add columns:
| Column Name | Type | Options |
|-------------|------|---------|
| Person | Person or Group | — |
| Issuer | Choice | Microsoft; LinkedIn Learning; Coursera; Google; Other |
| Date Earned | Date and time | Date only |
| Expiry Date | Date and time | Date only |
| Verification Link | Hyperlink | — |
| Badge Image | Image | — |

**Set up views:**
- `Gallery` view — select this view type when creating, show Badge Image prominently
- `By Person` — group by Person

---

### List 4: Use Cases Gallery
Name: `Use Cases`

Add columns:
| Column Name | Type | Options |
|-------------|------|---------|
| Department | Single line of text | — |
| Problem Solved | Multiple lines of text | — |
| AI Tool Used | Choice | Copilot; Copilot Analyst; Copilot Researcher; Copilot Agent; Teams Copilot; Outlook Copilot; Multiple |
| Time / Effort Saved | Single line of text | e.g. "2 hours per week" |
| How-To Steps | Multiple lines of text | — |
| Submitted By | Person or Group | — |
| Date Submitted | Date and time | — |

---

### List 5: Leaderboard Points
Name: `Leaderboard`

Add columns:
| Column Name | Type | Options |
|-------------|------|---------|
| Person | Person or Group | — |
| Total Points | Number | Min: 0 |
| Level | Choice | Copilot Curious; Copilot Explorer; Copilot Pro; AI Champion |
| Courses Completed | Number | — |
| Certs Earned | Number | — |
| Prompts Submitted | Number | — |
| Use Cases Submitted | Number | — |
| Challenges Completed | Number | — |

**View:** Sort by Total Points descending. Display on Community page.

---

## STEP 5 — Create the Sub-Pages

For each navigation item, create a new page: **Pages** → **+ New** → **Site page**

### Learn Page
- Title: `Learning Hub`
- Add **3 sections** with card layouts:
  - Beginner Path
  - Intermediate Path
  - Advanced Path
- Add a **Text and image** web part per course in each path
- See `03-learning-paths.md` for full course content to paste in

### Prompts Page
- Title: `Prompt Library`
- Add a **List** web part → connect to `Prompt Library` list → `By Category` view
- Add a **Call to action** button: `Submit a Prompt` → link to your Microsoft Form

### Use Cases Page
- Title: `Use Cases Gallery`
- Add a **List** web part → connect to `Use Cases` list → default view
- Add a **Call to action** button: `Submit a Win`

### My IDP Page
- Title: `My AI Development Plan`
- Add a **List** web part → connect to `AI IDP Tracker` → `My Goals` view
- Add explanatory text: *"Set your AI learning goals, track your progress, and celebrate your growth."*

### Certs & Badges Page
- Title: `Certifications Wall`
- Add a **List** web part → connect to `Certs & Badges` → Gallery view
- Add a **Call to action** button: `Submit Your Certificate`

### Agents & Tools Page
- Title: `Agents & Tools Directory`
- Paste content from `06-agents-tools-content.md`

### Community Page
- Title: `Community & Challenges`
- Add a **Text** web part for the Monthly Challenge
- Add a **List** web part → connect to `Leaderboard` → sorted by Total Points
- Add a **Text** web part for AI Champion of the Month

### Governance Page
- Title: `Governance & Responsible AI`
- Paste content from `05-governance-content.md`

---

## STEP 6 — Create Microsoft Forms for Submissions

Go to **Microsoft Forms** (forms.office.com) and create 3 forms:

### Form 1: Submit a Prompt
Questions:
1. Your name (Person picker or short text)
2. Prompt title (Short text)
3. The prompt text (Long text)
4. Category (Dropdown: Writing, Analysis, Meetings, Research, Email, Planning, Coding, Learning, General)
5. Which Copilot tool? (Dropdown)
6. Best for which role/task? (Short text)

Connect to SharePoint via Power Automate → Create item in Prompt Library list

### Form 2: Submit a Certificate
Questions:
1. Your name
2. Certificate name
3. Issuer
4. Date earned
5. Verification link (URL)

### Form 3: Submit a Use Case / Win
Questions:
1. Your name
2. Use case title
3. Department
4. What problem did it solve?
5. Which AI tool did you use?
6. How much time/effort did it save?
7. Describe the steps you took

---

## STEP 7 — Set Permissions

1. Go to **Site settings** → **Site permissions**
2. For the pilot:
   - Add your 2–5 pilot users as **Members** (can edit content and submit to lists)
   - You remain as **Owner** (can manage structure)
3. For wider launch later: change to **Visitors** for most staff, keep a small **Members** group for content contributions

---

## STEP 8 — Publish and Share

1. Ensure all pages are published (click **Republish** or **Publish** on each page)
2. Share the site URL with pilot users
3. Pin the site in Teams: In your pilot Teams channel → add a **Tab** → SharePoint → select your site
4. Schedule a 30-minute walkthrough with your pilot group

---

## Checklist Before Launch

- [ ] Site created with correct name and description
- [ ] Navigation links all working
- [ ] All 5 lists created with correct columns
- [ ] Home page has Hero, Quick Links, Tip of the Day
- [ ] Learn page has at least Beginner path content
- [ ] Prompt Library has 10+ starter prompts loaded
- [ ] At least 2 use cases in the gallery
- [ ] Forms created for submissions
- [ ] Pilot users have access
- [ ] Site pinned in Teams
