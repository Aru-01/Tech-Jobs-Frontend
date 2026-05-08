// lib/mockData.js

export const JOBS = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Vercel Inc.",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Vercel&backgroundColor=000000&textColor=ffffff",
    companyColor: "#000000",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140K – $180K",
    salaryMin: 140000,
    salaryMax: 180000,
    remote: true,
    posted: "2 days ago",
    deadline: "June 30, 2025",
    description: "Build the future of the web with us. Join Vercel's frontend team to create best-in-class developer experiences using React, Next.js, and cutting-edge web technologies.",
    fullDescription: `We're looking for a Senior Frontend Engineer to join our growing team at Vercel. You'll work on the Vercel dashboard, our edge network UI, and contribute to open-source projects that millions of developers rely on daily.

**What you'll do:**
- Lead development of new dashboard features and improve existing ones
- Collaborate with design, backend, and DevRel teams
- Optimize web performance and Core Web Vitals across all surfaces
- Contribute to open-source projects including Next.js

**Requirements:**
- 5+ years of frontend engineering experience
- Deep expertise in React and TypeScript
- Experience with Next.js App Router
- Strong understanding of web performance optimization
- Excellent communication and collaboration skills`,
    tags: ["React", "Next.js", "TypeScript", "GraphQL"],
    category: "Frontend",
    featured: true,
    status: "active",
    applicants: 128,
    createdAt: "2025-05-01",
  },
  {
    id: "2",
    title: "Staff Backend Engineer",
    company: "Stripe",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Stripe&backgroundColor=635BFF&textColor=ffffff",
    companyColor: "#635BFF",
    location: "New York, NY",
    type: "Full-time",
    salary: "$180K – $250K",
    salaryMin: 180000,
    salaryMax: 250000,
    remote: true,
    posted: "1 day ago",
    deadline: "July 15, 2025",
    description: "Help us build the economic infrastructure of the internet. Join Stripe's backend team to architect systems that process hundreds of billions of dollars in payments annually.",
    fullDescription: `Stripe is looking for a Staff Backend Engineer to work on our payments infrastructure. This is a high-impact role where you'll design and build systems at extraordinary scale.

**What you'll do:**
- Design and implement distributed systems that handle global payment flows
- Lead technical direction for major infrastructure initiatives
- Mentor engineers and set technical standards
- Work closely with product, design, and data science

**Requirements:**
- 8+ years of software engineering experience
- Strong background in distributed systems
- Experience with Ruby, Go, or Java at scale
- Deep understanding of payment systems a plus
- Proven track record of leading large-scale technical projects`,
    tags: ["Python", "Go", "Kubernetes", "PostgreSQL"],
    category: "Backend",
    featured: true,
    status: "active",
    applicants: 94,
    createdAt: "2025-05-02",
  },
  {
    id: "3",
    title: "ML Engineer – LLM Infrastructure",
    company: "Anthropic",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Anthropic&backgroundColor=D97706&textColor=ffffff",
    companyColor: "#D97706",
    location: "Remote",
    type: "Full-time",
    salary: "$200K – $300K",
    salaryMin: 200000,
    salaryMax: 300000,
    remote: true,
    posted: "3 days ago",
    deadline: "August 1, 2025",
    description: "Work on the infrastructure powering Claude and frontier AI models. You'll optimize training pipelines, inference systems, and tooling that keeps Anthropic at the AI frontier.",
    fullDescription: `At Anthropic, we're building AI systems that are safe, beneficial, and understandable. We're looking for an ML Engineer to work on our LLM infrastructure — the systems that train and serve Claude.

**What you'll do:**
- Build and optimize distributed training infrastructure for large language models
- Improve inference efficiency and reduce latency for Claude APIs
- Develop tooling for model evaluation and safety testing
- Collaborate with researchers to productionize new model architectures

**Requirements:**
- Strong Python skills and deep learning framework experience (PyTorch)
- Experience with distributed training at scale (thousands of GPUs)
- Background in systems programming (C++, CUDA)
- Passion for AI safety and responsible development`,
    tags: ["Python", "PyTorch", "CUDA", "Distributed Systems"],
    category: "AI/ML",
    featured: true,
    status: "active",
    applicants: 312,
    createdAt: "2025-04-30",
  },
  {
    id: "4",
    title: "DevOps / Platform Engineer",
    company: "Linear",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Linear&backgroundColor=5E6AD2&textColor=ffffff",
    companyColor: "#5E6AD2",
    location: "Remote",
    type: "Full-time",
    salary: "$130K – $160K",
    salaryMin: 130000,
    salaryMax: 160000,
    remote: true,
    posted: "5 days ago",
    deadline: "June 15, 2025",
    description: "Build and maintain the infrastructure behind the best issue tracker on the planet. Join Linear's small but mighty platform team to keep our systems fast, reliable, and scalable.",
    fullDescription: `Linear is where the best product teams track their work. We're looking for a DevOps/Platform Engineer to join our infrastructure team and keep our systems world-class.

**What you'll do:**
- Manage and evolve our Kubernetes-based infrastructure on AWS
- Implement CI/CD pipelines and developer productivity tooling
- Monitor system performance and drive reliability improvements
- Collaborate on architecture decisions with a small, high-trust team

**Requirements:**
- 4+ years of DevOps or platform engineering experience
- Strong Kubernetes and AWS expertise
- Experience with Terraform or similar IaC tools
- Excellent debugging and incident response skills
- Startup mindset — comfortable with ambiguity`,
    tags: ["Kubernetes", "AWS", "Terraform", "Docker"],
    category: "DevOps",
    featured: false,
    status: "active",
    applicants: 57,
    createdAt: "2025-04-28",
  },
  {
    id: "5",
    title: "Senior UI/UX Designer",
    company: "Figma",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Figma&backgroundColor=F24E1E&textColor=ffffff",
    companyColor: "#F24E1E",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150K – $190K",
    salaryMin: 150000,
    salaryMax: 190000,
    remote: false,
    posted: "1 week ago",
    deadline: "July 1, 2025",
    description: "Design the future of design tools. Join Figma's design team to craft interfaces that millions of designers and developers use daily to bring their ideas to life.",
    fullDescription: `At Figma, we believe everyone should be able to design. We're hiring a Senior UI/UX Designer to help us build tools that democratize design across the web.

**What you'll do:**
- Own design for complex product areas end-to-end
- Lead design reviews and establish team-wide patterns
- Work closely with product managers and engineers
- Conduct user research and synthesize insights into product decisions

**Requirements:**
- 6+ years of product design experience
- Expert-level Figma skills (naturally)
- Strong portfolio demonstrating complex problem-solving
- Experience designing for developer-focused or creative tools
- Excellent communication and facilitation skills`,
    tags: ["Figma", "Design Systems", "User Research", "Prototyping"],
    category: "UI/UX",
    featured: true,
    status: "active",
    applicants: 203,
    createdAt: "2025-04-26",
  },
  {
    id: "6",
    title: "Full Stack Engineer",
    company: "PlanetScale",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=PlanetScale&backgroundColor=4B1C82&textColor=ffffff",
    companyColor: "#4B1C82",
    location: "Remote",
    type: "Full-time",
    salary: "$120K – $155K",
    salaryMin: 120000,
    salaryMax: 155000,
    remote: true,
    posted: "4 days ago",
    deadline: "July 20, 2025",
    description: "Build database tooling used by thousands of developers worldwide. Join PlanetScale and work on the platform that makes MySQL infinitely scalable with branching workflows.",
    fullDescription: `PlanetScale is building the most developer-friendly MySQL platform on the planet. We need a Full Stack Engineer to help build the tools that let developers ship database changes with confidence.

**What you'll do:**
- Build web UI features for the PlanetScale console
- Work on API integrations and developer tooling
- Improve database import/export and migration workflows
- Contribute to open-source database tools

**Requirements:**
- 4+ years of full stack experience
- Strong React and TypeScript frontend skills
- Solid backend experience (Go preferred)
- Familiarity with MySQL or distributed databases
- Passion for developer experience`,
    tags: ["React", "Go", "MySQL", "TypeScript"],
    category: "Full Stack",
    featured: false,
    status: "active",
    applicants: 88,
    createdAt: "2025-04-29",
  },
  {
    id: "7",
    title: "Security Engineer",
    company: "1Password",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=1Password&backgroundColor=1A8CFF&textColor=ffffff",
    companyColor: "#1A8CFF",
    location: "Remote",
    type: "Full-time",
    salary: "$130K – $165K",
    salaryMin: 130000,
    salaryMax: 165000,
    remote: true,
    posted: "6 days ago",
    deadline: "June 25, 2025",
    description: "Protect millions of users' secrets. Join 1Password's security team to design and implement security systems for a product that people trust with their most sensitive information.",
    fullDescription: `1Password helps millions of people and teams protect their most important digital assets. We're looking for a Security Engineer to strengthen our product's security posture.

**What you'll do:**
- Design and implement security controls for our password management system
- Conduct security code reviews and threat modeling
- Run penetration tests and vulnerability assessments
- Respond to security incidents and coordinate remediations

**Requirements:**
- 5+ years in application or product security
- Deep understanding of cryptography and secure coding practices
- Experience with security tooling and SAST/DAST
- Strong knowledge of OWASP Top 10 and threat modeling
- Relevant certifications (OSCP, CISSP) a plus`,
    tags: ["Cryptography", "Rust", "Penetration Testing", "Zero-Trust"],
    category: "Security",
    featured: false,
    status: "active",
    applicants: 44,
    createdAt: "2025-04-27",
  },
  {
    id: "8",
    title: "React Native Engineer",
    company: "Notion",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Notion&backgroundColor=191919&textColor=ffffff",
    companyColor: "#191919",
    location: "New York, NY",
    type: "Full-time",
    salary: "$125K – $160K",
    salaryMin: 125000,
    salaryMax: 160000,
    remote: true,
    posted: "3 days ago",
    deadline: "July 10, 2025",
    description: "Build the mobile experience for millions of Notion users. Join our mobile team to craft a best-in-class React Native app that seamlessly mirrors our powerful web product.",
    fullDescription: `Notion is the connected workspace that millions use to think, write, and plan. We're looking for a React Native Engineer to help bring Notion's full power to mobile.

**What you'll do:**
- Build new features for the Notion iOS and Android apps
- Optimize performance and reduce app startup time
- Work closely with design to implement pixel-perfect UIs
- Improve developer experience for the mobile team

**Requirements:**
- 4+ years of mobile development with React Native
- Strong JavaScript/TypeScript skills
- Experience with native iOS or Android development
- Understanding of app performance optimization
- Attention to detail in UI implementation`,
    tags: ["React Native", "TypeScript", "iOS", "Android"],
    category: "Mobile",
    featured: false,
    status: "active",
    applicants: 76,
    createdAt: "2025-04-30",
  },
  {
    id: "9",
    title: "Data Engineer",
    company: "Databricks",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Databricks&backgroundColor=FF3621&textColor=ffffff",
    companyColor: "#FF3621",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$160K – $210K",
    salaryMin: 160000,
    salaryMax: 210000,
    remote: false,
    posted: "2 days ago",
    deadline: "August 15, 2025",
    description: "Build data infrastructure at the company democratizing data and AI. Help Databricks customers get more value from their data by building world-class data pipelines and platform tools.",
    fullDescription: `Databricks is the data and AI company helping teams use data to solve the world's toughest problems. We're hiring a Data Engineer to work on our internal data platform.

**What you'll do:**
- Design and build scalable data pipelines using Spark and Delta Lake
- Develop data quality monitoring and observability tools
- Partner with analytics and ML teams to enable faster insights
- Improve data platform reliability and performance

**Requirements:**
- 5+ years of data engineering experience
- Strong Python and SQL skills
- Experience with Apache Spark and distributed computing
- Familiarity with Delta Lake, Lakehouse architecture
- Experience with cloud data platforms (AWS, GCP, or Azure)`,
    tags: ["Spark", "Python", "Delta Lake", "SQL"],
    category: "Data",
    featured: false,
    status: "active",
    applicants: 135,
    createdAt: "2025-05-01",
  },
  {
    id: "10",
    title: "Developer Advocate",
    company: "Supabase",
    companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Supabase&backgroundColor=3ECF8E&textColor=ffffff",
    companyColor: "#3ECF8E",
    location: "Remote",
    type: "Full-time",
    salary: "$110K – $140K",
    salaryMin: 110000,
    salaryMax: 140000,
    remote: true,
    posted: "5 days ago",
    deadline: "June 30, 2025",
    description: "Be the bridge between Supabase and the developer community. Create amazing content, build demos, and help developers fall in love with the open-source Firebase alternative.",
    fullDescription: `Supabase is the open source Firebase alternative. We're looking for a Developer Advocate who loves the Supabase ecosystem and wants to help developers get the most out of it.

**What you'll do:**
- Create technical content: blog posts, videos, tutorials, and sample apps
- Represent Supabase at conferences, meetups, and online events
- Engage with the community on GitHub, Discord, and Twitter
- Provide product feedback from developer interactions

**Requirements:**
- 3+ years of software development experience
- Strong public communication skills (writing and speaking)
- Experience creating technical content
- Passion for open-source and developer communities
- Familiarity with Supabase, PostgreSQL, or similar tools`,
    tags: ["PostgreSQL", "JavaScript", "DevRel", "Open Source"],
    category: "DevRel",
    featured: false,
    status: "active",
    applicants: 62,
    createdAt: "2025-04-28",
  },
];

export const COMPANIES = [
  {
    id: "1",
    name: "Vercel",
    slug: "vercel",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Vercel&backgroundColor=000000&textColor=ffffff",
    industry: "Developer Tools",
    size: "501–1000",
    location: "San Francisco, CA",
    color: "#000000",
    openJobs: 12,
    website: "https://vercel.com",
    founded: "2015",
    description: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.",
    fullDescription: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration. We enable teams to deploy instantly, scale automatically, and confirm every change at a URL.\n\nOur mission is to enable the world to ship the best products. We believe that developer experience is the key to productivity and innovation. By providing tools like Next.js and a global edge network, we help developers build a faster, more personal web.",
    socials: { twitter: "@vercel", linkedin: "vercel" },
    benefits: ["Remote-first", "Health insurance", "Equity", "Parental leave"],
  },
  {
    id: "2",
    name: "Stripe",
    slug: "stripe",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Stripe&backgroundColor=635BFF&textColor=ffffff",
    industry: "Fintech",
    size: "5001–10000",
    location: "San Francisco, CA",
    color: "#635BFF",
    openJobs: 28,
    website: "https://stripe.com",
    founded: "2010",
    description: "Stripe is a financial infrastructure platform for businesses. Millions of companies use Stripe to accept payments, grow revenue, and accelerate new business opportunities.",
    fullDescription: "Stripe is a financial infrastructure platform for businesses. Millions of companies—from the world's largest enterprises to the most ambitious startups—use Stripe to accept payments, grow revenue, and accelerate new business opportunities.\n\nOur goal is to increase the GDP of the internet. We build infrastructure that allows businesses to easily accept payments and manage their financial operations online.",
    socials: { twitter: "@stripe", linkedin: "stripe" },
    benefits: ["Competitive salary", "Learning budget", "Flexible PTO", "Wellness stipend"],
  },
  {
    id: "3",
    name: "Linear",
    slug: "linear",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Linear&backgroundColor=5E6AD2&textColor=ffffff",
    industry: "Productivity SaaS",
    size: "51–200",
    location: "San Francisco, CA",
    color: "#5E6AD2",
    openJobs: 6,
    website: "https://linear.app",
    founded: "2019",
    description: "Linear is a better way to build products. It's the tool of choice for high-performance teams that need to move fast.",
    fullDescription: "Linear is a better way to build products. It helps teams streamline software projects, sprints, tasks, and bug tracking. It's built for high-performance teams that value craft and speed.\n\nWe focus on creating tools that are fast, intuitive, and beautiful. Our team is remote-first and distributed across the world.",
    socials: { twitter: "@linear", linkedin: "linear-app" },
    benefits: ["Remote work", "High-end equipment", "Stock options", "Annual retreats"],
  },
  {
    id: "4",
    name: "Anthropic",
    slug: "anthropic",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Anthropic&backgroundColor=D97706&textColor=ffffff",
    industry: "AI Research",
    size: "201–500",
    location: "San Francisco, CA",
    color: "#D97706",
    openJobs: 19,
    website: "https://anthropic.com",
    founded: "2021",
    description: "Anthropic is an AI safety company working to build reliable, interpretable, and steerable AI systems.",
    fullDescription: "Anthropic is an AI safety and research company that’s working to build reliable, interpretable, and steerable AI systems. We want AI to be safe and beneficial for humanity.\n\nOur team includes researchers, engineers, and policy experts who are dedicated to developing AI that aligns with human values.",
    socials: { twitter: "@anthropic", linkedin: "anthropic" },
    benefits: ["AI research focus", "Relocation assistance", "Comprehensive benefits", "Mission-driven team"],
  },
  {
    id: "5",
    name: "Figma",
    slug: "figma",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Figma&backgroundColor=F24E1E&textColor=ffffff",
    industry: "Design Tools",
    size: "1001–5000",
    location: "San Francisco, CA",
    color: "#F24E1E",
    openJobs: 15,
    website: "https://figma.com",
    founded: "2012",
    description: "Figma is the leading collaborative design tool for building meaningful products.",
    fullDescription: "Figma is the leading collaborative design tool for building meaningful products. We believe that everyone should be able to design, and our platform makes it easy for teams to work together in real-time.\n\nFrom brainstorming to handoff, Figma is where the world builds products.",
    socials: { twitter: "@figma", linkedin: "figma" },
    benefits: ["Collaborative culture", "Gym membership", "Daily lunch", "Professional development"],
  },
  {
    id: "6",
    name: "Supabase",
    slug: "supabase",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=Supabase&backgroundColor=3ECF8E&textColor=ffffff",
    industry: "Developer Tools",
    size: "51–200",
    location: "Remote",
    color: "#3ECF8E",
    openJobs: 8,
    website: "https://supabase.com",
    founded: "2020",
    description: "Supabase is an open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, and more.",
    fullDescription: "Supabase is an open source Firebase alternative. We're building the features of Firebase using enterprise-grade open source tools. Our goal is to make it easy for developers to build secure and scalable applications.\n\nWe're a remote-first team building the future of the backend.",
    socials: { twitter: "@supabase", linkedin: "supabase" },
    benefits: ["100% remote", "Open source focus", "Flexible hours", "Home office stipend"],
  },
];

export const MANAGE_COMPANIES = [
  { id: "c1", name: "TechCorp", industry: "Enterprise SaaS", location: "New York, NY", status: "verified", created: "Jan 15, 2025", activeJobs: 4 },
  { id: "c2", name: "Design Studio", industry: "Design Agency", location: "London, UK", status: "pending", created: "Mar 10, 2025", activeJobs: 0 },
];


export const CATEGORIES = [
  { id: "frontend", label: "Frontend", count: 38, icon: "Monitor", color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  { id: "backend", label: "Backend", count: 52, icon: "Server", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  { id: "devops", label: "DevOps", count: 24, icon: "Cloud", color: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
  { id: "ai-ml", label: "AI / ML", count: 47, icon: "Brain", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  { id: "remote", label: "Remote Jobs", count: 120, icon: "Globe", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  { id: "ui-ux", label: "UI / UX", count: 31, icon: "Palette", color: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Tariqul Islam",
    role: "Senior Frontend Engineer",
    company: "Hired at Vercel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TariqulIslam&backgroundColor=b6e3f4",
    rating: 5,
    text: "Tech_Jobs made my job search feel effortless. The quality of listings is exceptional — every role felt hand-picked. I landed my dream offer at Vercel within 3 weeks!",
  },
  {
    id: "2",
    name: "Sadia Rahman",
    role: "ML Engineer",
    company: "Hired at Anthropic",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SadiaRahman&backgroundColor=ffdfbf",
    rating: 4,
    text: "The AI/ML job section is incredible. I found roles I couldn't find anywhere else. The detailed job descriptions saved me hours of back-and-forth. Highly recommend for any engineer.",
  },
  {
    id: "3",
    name: "Fahim Shahriar",
    role: "Full Stack Developer",
    company: "Hired at Linear",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FahimShahriar&backgroundColor=d1d4f9",
    rating: 5,
    text: "As someone who values great tools, Tech_Jobs itself felt like a product built by people who care deeply about developer experience. Found my current role in 2 weeks!",
  },
  {
    id: "4",
    name: "Nadia Hossain",
    role: "UI/UX Designer",
    company: "Hired at Figma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NadiaHossain&backgroundColor=ffdfbf",
    rating: 4,
    text: "The platform's design itself is a testament to their focus on quality. I applied to several top design roles and was hired at Figma seamlessly.",
  },
  {
    id: "5",
    name: "Rakib Hasan",
    role: "Backend Engineer",
    company: "Hired at Stripe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RakibHasan&backgroundColor=c0aede",
    rating: 5,
    text: "The best part about Tech_Jobs is the transparency. I knew the salary range and tech stack before even applying. Got an amazing offer from Stripe!",
  },
  {
    id: "6",
    name: "Ayesha Siddiqua",
    role: "Developer Advocate",
    company: "Hired at Supabase",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AyeshaSiddiqua&backgroundColor=ffdfbf",
    rating: 5,
    text: "I was looking for a very specific DevRel role, and Tech_Jobs delivered. The community and matching system are top-notch.",
  },
  {
    id: "7",
    name: "Imran Mahmud",
    role: "DevOps Engineer",
    company: "Hired at Vercel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ImranMahmud&backgroundColor=d1d4f9",
    rating: 4,
    text: "Finally, a job board that understands engineers. No spam, no irrelevant listings. Just high-quality opportunities. Very happy with my new role.",
  }
];

export const STATS = [
  { label: "Active Jobs", value: "12,400+", suffix: "" },
  { label: "Companies Hiring", value: "3,200+", suffix: "" },
  { label: "Successful Hires", value: "98K+", suffix: "" },
  { label: "Avg. Time to Hire", value: "18", suffix: " days" },
];

export const BENEFITS = [
  {
    icon: "Zap",
    title: "Curated Tech Roles",
    description: "Every job is manually vetted. No spam, no noise — only premium engineering and design roles from top companies.",
    color: "#f59e0b",
  },
  {
    icon: "Shield",
    title: "Salary Transparency",
    description: "We require every listing to include a salary range. You'll never waste time on a role that doesn't meet your expectations.",
    color: "#6366f1",
  },
  {
    icon: "Target",
    title: "Precision Matching",
    description: "Smart filters by stack, seniority, remote preference, and salary range. Find exactly what you're looking for in seconds.",
    color: "#10b981",
  },
  {
    icon: "Globe",
    title: "Remote-First",
    description: "Over 60% of our listings are remote-friendly. Work from anywhere — we make sure you can find roles that fit your lifestyle.",
    color: "#06b6d4",
  },
  {
    icon: "Users",
    title: "Company Insights",
    description: "Detailed company profiles with culture, tech stack, team size, and growth trajectory. Apply with confidence.",
    color: "#8b5cf6",
  },
  {
    icon: "TrendingUp",
    title: "Career Growth",
    description: "From junior to staff engineer — we have roles at every level. Grow your career with Tech_Jobs as your partner.",
    color: "#f43f5e",
  },
];

export const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex@techcorp.io",
  avatar: "AJ",
  role: "recruiter",
};

export const MANAGE_JOBS = [
  { id: "m1", title: "Senior Frontend Engineer", company: "TechCorp", salary: "$130K–$160K", status: "active", created: "May 1, 2025", applicants: 24 },
  { id: "m2", title: "Backend Engineer – APIs", company: "TechCorp", salary: "$120K–$150K", status: "active", created: "Apr 28, 2025", applicants: 18 },
  { id: "m3", title: "DevOps Engineer", company: "TechCorp", salary: "$110K–$140K", status: "paused", created: "Apr 20, 2025", applicants: 9 },
  { id: "m4", title: "Product Designer", company: "TechCorp", salary: "$100K–$130K", status: "closed", created: "Apr 10, 2025", applicants: 41 },
];
