export interface TerminalOutput {
  type: 'command' | 'output' | 'error' | 'system';
  content: string;
}

export function processCommand(input: string): TerminalOutput[] {
  const cmd = input.trim().toLowerCase();
  const results: TerminalOutput[] = [
    { type: 'command', content: `arslan@portfolio:~$ ${input}` },
  ];

  switch (cmd) {
    case 'help':
      results.push({
        type: 'output',
        content: `
Available commands:
  help        Show this help message
  about       About me
  skills      Technical skills
  projects    My projects
  education   Education background
  experience  Work experience
  contact     Contact information
  whoami      Who am I?
  resume      Download resume
  clear       Clear terminal
  ls          List files
  pwd         Print working directory
  date        Show current date
  neofetch    System info`,
      });
      break;

    case 'about':
      results.push({
        type: 'output',
        content: `
┌─────────────────────────────────────────────┐
│  Hi, I'm Arslan!                            │
│                                             │
│  Data Science Student @ IIT Madras          │
│  Machine Learning Enthusiast                │
│  Python Developer                           │
│  Building AI products                       │
│                                             │
│  Currently focusing on:                     │
│  → DSA & Algorithms                         │
│  → Machine Learning & Deep Learning         │
│  → AWS Cloud Services                       │
│  → Docker & DevOps                          │
│  → Open Source Contributions                │
└─────────────────────────────────────────────┘`,
      });
      break;

    case 'skills':
      results.push({
        type: 'output',
        content: `
Languages:    Python ████████████████████ 90%
              SQL    ████████████████░░░░ 80%
              JS/TS  ████████████░░░░░░░░ 60%

Frameworks:   Flask, Pandas, NumPy, Scikit-learn
Cloud:        AWS, Docker, GitHub Actions
Tools:        Git, VS Code, Jupyter, Linux
Databases:    PostgreSQL, MongoDB, Redis`,
      });
      break;

    case 'projects':
      results.push({
        type: 'output',
        content: `
PROJECT                STATUS        TECH
─────────────────────────────────────────────────
AI Chatbot             ✅ Completed   Python, OpenAI, Flask
Fraud Detection        🔄 In Progress Python, ML, Scikit-learn
Portfolio IDE          🟢 Live        Next.js, TypeScript
Recommender System     ✅ Completed   Python, Collaborative Filtering`,
      });
      break;

    case 'education':
      results.push({
        type: 'output',
        content: `
🎓 BS in Data Science
   Indian Institute of Technology Madras

   Relevant Coursework:
   ├── Python Programming
   ├── Statistics & Probability
   ├── Machine Learning
   ├── Database Systems
   └── Data Structures & Algorithms`,
      });
      break;

    case 'experience':
      results.push({
        type: 'output',
        content: `
💼 Experience
   
   Currently open to internships and collaborations.
   Focused on building real-world AI/ML projects.
   
   Areas of Interest:
   ├── Machine Learning Engineering
   ├── Data Science & Analytics
   ├── Full-Stack Development
   └── Cloud Architecture`,
      });
      break;

    case 'contact':
      results.push({
        type: 'output',
        content: `
📫 Contact Information

   GitHub:     github.com/Arslan-SA
   LinkedIn:   linkedin.com/in/arslansa
   Email:      arslan@example.com
   LeetCode:   leetcode.com/arslansa`,
      });
      break;

    case 'whoami':
      results.push({
        type: 'output',
        content: 'arslan — Data Science Student | ML Enthusiast | Python Developer',
      });
      break;

    case 'resume':
      results.push({
        type: 'system',
        content: '📄 Downloading resume... (resume.pdf)',
      });
      break;

    case 'clear':
      return [{ type: 'system', content: '__CLEAR__' }];

    case 'ls':
      results.push({
        type: 'output',
        content: `about/  skills/  projects/  experience/  education/  contact/`,
      });
      break;

    case 'pwd':
      results.push({
        type: 'output',
        content: '/home/arslan/portfolio',
      });
      break;

    case 'date':
      results.push({
        type: 'output',
        content: new Date().toString(),
      });
      break;

    case 'neofetch':
      results.push({
        type: 'output',
        content: `
        .--.          arslan@portfolio
       |o_o |         ─────────────────
       |:_/ |         OS: Portfolio IDE v1.0
      //   \\ \\        Host: Next.js 16
     (|     | )       Shell: bash 5.0
    /'\\_   _/\`\\       Theme: VS Code Dark+
    \\___)=(___/       Terminal: xterm-256color
                      Languages: Python, TS, SQL
                      Uptime: since 2024`,
      });
      break;

    default:
      if (cmd === '') {
        return results;
      }
      results.push({
        type: 'error',
        content: `bash: ${cmd}: command not found. Type 'help' for available commands.`,
      });
  }

  return results;
}
