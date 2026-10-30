/**
 * TechLink SL - Official Dataset & Business Logic Store
 * Single source of truth derived directly from Project Requirement Specification (PRS)
 */

window.TechLinkData = {
  company: {
    name: "TechLink SL",
    legalName: "TechLink Sierra Leone Ltd",
    tagline: "Empowering Sierra Leone & Beyond with World-Class Digital Solutions",
    visionStatement: "To build the most impressive, trustworthy, and conversion-focused technology company website in Sierra Leone — a website that instantly communicates innovation, wins client confidence, and turns visitors into paying customers.",
    mission: "To empower businesses and organisations in Sierra Leone and beyond with innovative, affordable, and reliable technology solutions.",
    vision: "To become West Africa's most trusted technology partner for digital transformation.",
    values: [
      { title: "Innovation", desc: "Pushing creative & technical boundaries continuously." },
      { title: "Integrity", desc: "Honest, transparent, and ethical partnerships." },
      { title: "Excellence", desc: "Delivering world-class code and design standards." },
      { title: "Customer-First", desc: "Your growth and success is our primary measure." },
      { title: "Reliability", desc: "Dependable 24/7 uptime and prompt IT support." },
      { title: "Continuous Learning", desc: "Staying ahead with cutting-edge tech & AI." }
    ],
    contact: {
      address: "31C Short Street, Low Cost, Freetown, Sierra Leone",
      phones: ["+232 78 091467", "+232 71 345276"],
      whatsapp: "+23271345276",
      email: "techlinksl247@gmail.com",
      supportEmail: "techlinksl247@gmail.com",
      careersEmail: "careers@techlinksl.com",
      hours: "Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM"
    },
    socials: {
      facebook: "https://facebook.com/techlinksl",
      instagram: "https://instagram.com/techlinksl",
      tiktok: "https://tiktok.com/@techlinksl",
      telegram: "https://t.me/techlinksl",
      linkedin: "https://linkedin.com/company/TechLinkSL",
      twitter: "https://x.com/TechLinkSL",
      whatsapp: "https://wa.me/23271345276?text=Hello%20TechLink%20SL%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
    },
    stats: {
      projectsCompleted: 145,
      happyClients: 98,
      yearsExperience: 6,
      teamMembers: 14,
      clientSatisfaction: 99
    }
  },

  services: [
    {
      id: "web-apps",
      title: "Web Application Development",
      shortDesc: "Custom web applications, dashboards, portals, booking systems, e-commerce platforms, and business automation tools.",
      fullDesc: "We build scalable, high-performance web applications tailored to your business workflows. From complex enterprise dashboards to seamless customer portals and automated booking engines, our solutions are engineered with modern frameworks for security, speed, and maximum uptime.",
      icon: "layout-dashboard",
      flyerImage: "./assets/flyer_stunning_website.jpg",
      deliverables: [
        "Custom SaaS & Business Automation Tools",
        "Enterprise Resource Dashboards & Analytics",
        "E-Commerce Platforms & Payment Integrations (Mobile Money & Cards)",
        "Customer & Vendor Web Portals",
        "Custom Booking & Reservation Systems"
      ],
      whoItsFor: ["SMEs", "Fintechs & Financial Institutions", "NGOs", "Government Agencies", "Retail & Hospitality"],
      process: [
        "Requirement Gathering & Flow Architecture",
        "UX/UI Design System & Prototyping",
        "Agile Full-Stack Frontend & Backend Build",
        "Security Audit & Performance Optimization",
        "Deployment & User Training"
      ],
      techUsed: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "Tailwind CSS"],
      faqs: [
        { q: "How long does custom web application development take?", a: "Typically between 4 to 8 weeks depending on scope, API integrations, and feature complexity." },
        { q: "Can you integrate local Sierra Leone payment gateways?", a: "Yes! We integrate Mobile Money (Orange Money, Africell Afrimoney), local bank APIs, as well as Stripe & PayPal." }
      ]
    },
    {
      id: "websites",
      title: "Website Design & Development",
      shortDesc: "Corporate websites, landing pages, NGO websites, blogs, and portfolio sites — responsive, fast, and SEO-ready.",
      fullDesc: "Your website is your digital headquarters. We create striking, modern websites that establish immediate trust, communicate your value proposition, and convert visitors into paying clients or partners.",
      icon: "globe",
      flyerImage: "./assets/flyer_stunning_website.jpg",
      deliverables: [
        "Corporate & Enterprise Websites",
        "NGO & International Development Portals",
        "High-Conversion Landing Pages",
        "Blog & News Media Platforms",
        "Full Mobile Responsiveness & On-Page SEO"
      ],
      whoItsFor: ["Corporations", "NGOs & Non-Profits", "Schools & Universities", "Law & Consulting Firms", "Diaspora Investors"],
      process: [
        "Brand Strategy & Sitemap Definition",
        "Visual Wireframing & Responsive Mockups",
        "Clean HTML5/React/Vite Build",
        "SEO Optimization & Analytics Setup",
        "Domain Launch & Professional Email Configuration"
      ],
      techUsed: ["HTML5", "CSS3 / Tailwind", "JavaScript / React", "WordPress / CMS", "Vercel / Cloudflare"],
      faqs: [
        { q: "Will I be able to update content myself?", a: "Absoluty. We include a user-friendly CMS dashboard and train your team to edit text, images, blogs, and services without code." },
        { q: "Is domain name and hosting included?", a: "We manage domain registration (e.g. .com or .sl) and hosting setup with 99.9% uptime guarantees." }
      ]
    },
    {
      id: "graphic-design",
      title: "Graphic Design & Branding",
      shortDesc: "Logos, brand identity, flyers, banners, social media creatives, business cards, and complete visual packages.",
      fullDesc: "Stand out in a crowded market with memorable visual branding. Our design studio crafts cohesive brand identities, captivating graphic art, corporate collateral, and promotional campaigns that elevate your brand perception.",
      icon: "palette",
      flyerImage: "./assets/flyer_social_media.jpg",
      deliverables: [
        "Complete Brand Identity Packages (Logo, Colors, Typography)",
        "Social Media Campaign Graphics & Templates",
        "Business Cards, Letterheads & Corporate Stationery",
        "Print & Digital Flyers, Banners, & Billboards",
        "Company Profile Books & Annual Report Layouts"
      ],
      whoItsFor: ["Startups", "Rebranding Enterprises", "Retail Brands", "Event Organizers", "Institutions"],
      process: [
        "Brand Discovery & Creative Brief",
        "Concept Sketching & Moodboarding",
        "Vector Design & Color Palette Selection",
        "Client Feedback & Refinements",
        "Final Asset Export in Print & Web Formats"
      ],
      techUsed: ["Adobe Photoshop", "Adobe Illustrator", "Figma", "CorelDraw", "Adobe InDesign"],
      faqs: [
        { q: "What format will I receive my logo in?", a: "You get full vector source files (AI, EPS, SVG) along with high-res PNG, JPG, transparent background, and dark/light mode variants." },
        { q: "Can you handle monthly social media graphic design retainers?", a: "Yes! We offer monthly retainer packages providing 15 to 30 custom graphics per month." }
      ]
    },
    {
      id: "ai-solutions",
      title: "Artificial Intelligence (AI) Solutions",
      shortDesc: "AI chatbots, process automation, data analysis, workflow AI integration, and strategic AI consultancy.",
      fullDesc: "Harness the power of AI to transform your business efficiency. We build custom conversational AI chatbots, automate repetitive office tasks, analyze business data for actionable insights, and integrate LLMs into existing systems.",
      icon: "bot",
      flyerImage: "./assets/AI Solution.jpg",
      deliverables: [
        "Customer Service AI Chatbots (Web & WhatsApp)",
        "Internal Knowledge Base AI Assistants",
        "Workflow & Document Automation Pipelines",
        "Automated Lead Capture & Nurturing Bots",
        "AI Readiness Strategy & Staff Training"
      ],
      whoItsFor: ["Telecoms & Financial Institutions", "Customer Support Teams", "E-Commerce", "Healthcare", "Forward-Thinking Businesses"],
      process: [
        "Workflow Analysis & AI Opportunity Mapping",
        "Custom Model / Knowledge Base Training",
        "Chatbot & API Integration",
        "User Interface & Escalation Flow Setup",
        "Continuous Performance Fine-Tuning"
      ],
      techUsed: ["OpenAI API", "Python", "LangChain", "Vector Databases", "Node.js", "WhatsApp Business API"],
      faqs: [
        { q: "Can the AI Chatbot answer questions about our specific company services?", a: "Yes! We train the chatbot on your specific documents, FAQs, pricing, and procedures so it acts like a human expert." },
        { q: "What happens if the chatbot cannot answer a complex question?", a: "It seamlessly hands off the conversation to a human team member via email or WhatsApp." }
      ]
    },
    {
      id: "social-media",
      title: "Social Media Management",
      shortDesc: "Content strategy, content creation, scheduling, community management, paid advertising, and analytics reporting.",
      fullDesc: "Turn social media followers into loyal customers. We manage your presence across Facebook, Instagram, LinkedIn, TikTok, and X (Twitter) with engaging content schedules, targeted ad campaigns, and proactive community engagement.",
      icon: "share-2",
      flyerImage: "./assets/Social media.jpg",
      deliverables: [
        "Monthly Content Strategy & Editorial Calendar",
        "Professional Graphic & Video Content Creation",
        "Targeted Paid Ad Campaign Setup & Optimization",
        "Community Management (Comment & Message Replies)",
        "Detailed Monthly Performance & Growth Analytics"
      ],
      whoItsFor: ["SMEs", "Consumer Brands", "Public Figures", "Event Producers", "Hospitality"],
      process: [
        "Audience Research & Brand Tone Definition",
        "Monthly Content Calendar Approval",
        "Graphic & Copywriting Production",
        "Scheduling & Live Community Engagement",
        "Monthly ROI & Performance Review"
      ],
      techUsed: ["Meta Business Suite", "TikTok Ads Manager", "Canva Pro", "Hootsuite / Buffer", "Google Analytics"],
      faqs: [
        { q: "Which platforms do you manage?", a: "We cover Facebook, Instagram, LinkedIn, TikTok, X (Twitter), and YouTube." },
        { q: "Do you create video reels and shorts?", a: "Yes, our team edits high-engagement short-form video content tailored for TikTok and Instagram Reels." }
      ]
    },
    {
      id: "video-content",
      title: "Video Editing & Content Creation",
      shortDesc: "Scroll-stopping short videos and polished content for your brand's social channels and campaigns.",
      fullDesc: "We help brands turn ideas and raw footage into clear, engaging social content. From editing Reels, TikToks, and YouTube Shorts to creating branded promotional videos, we prepare platform-ready content that fits your message and audience.",
      icon: "video",
      flyerImage: "./assets/video-editing-content-creation.jpg",
      deliverables: [
        "Editing for Reels, TikTok, YouTube Shorts & other social formats",
        "Branded Promotional and Product Videos",
        "Captions, Subtitles, Transitions & Motion Graphics",
        "Video Covers, Thumbnails & Platform-Specific Exports",
        "Content Planning and Creative Direction"
      ],
      whoItsFor: ["Small Businesses", "Consumer Brands", "Creators & Public Figures", "Event Organizers", "NGOs"],
      process: [
        "Creative Brief, Audience & Platform Planning",
        "Footage Review or Content Shoot Planning",
        "Video Editing, Sound, Captions & Branding",
        "Review, Revisions & Final Approval",
        "Delivery in Formats Ready to Publish"
      ],
      techUsed: ["Adobe Premiere Pro", "CapCut", "DaVinci Resolve", "Canva"],
      faqs: [
        { q: "Can you edit videos we have already recorded?", a: "Yes. Share your footage and creative direction, and we can edit it into finished, platform-ready content." },
        { q: "Can you create short videos for Reels and TikTok?", a: "Yes. We edit vertical short-form videos with captions, branding, and pacing tailored to each platform." }
      ]
    },
    {
      id: "mobile-apps",
      title: "Mobile App Development",
      shortDesc: "Custom iOS and Android apps designed around your customers, workflows, and business goals.",
      fullDesc: "We design and build mobile applications for iOS and Android, from the first user journeys to launch-ready builds. Whether you need a customer-facing app or a companion app for your team, we create secure, reliable experiences that work well on real devices and local networks.",
      icon: "smartphone",
      flyerImage: "./assets/mobile-app-development.jpg",
      deliverables: [
        "Custom iOS and Android App Design & Development",
        "Cross-Platform Apps for Faster Delivery",
        "Customer Accounts, Booking, Payments & Notifications",
        "API, Website & Business System Integrations",
        "App Store and Google Play Submission Support"
      ],
      whoItsFor: ["Startups", "Retail & E-Commerce", "Schools & Universities", "Healthcare Providers", "Service Businesses"],
      process: [
        "Discovery, Requirements & User Journey Planning",
        "Interface Design & Interactive Prototype",
        "App Development for iOS and Android",
        "Device Testing, Security Review & Refinement",
        "Store Submission, Launch & Ongoing Support"
      ],
      techUsed: ["Flutter", "React Native", "iOS", "Android", "REST APIs", "Firebase"],
      faqs: [
        { q: "Can you build an app for both iPhone and Android?", a: "Yes. We can build for both platforms, often from one shared codebase to keep delivery and maintenance efficient." },
        { q: "Can the app connect to our website or existing software?", a: "Yes. We can connect the app to your website, payments, and other business systems through APIs." }
      ]
    },
    {
      id: "software-dev",
      title: "Custom Software Development",
      shortDesc: "Desktop and mobile software, enterprise systems, POS systems, school/hospital management, and API integrations.",
      fullDesc: "Robust, enterprise-grade software engineered specifically for local and regional operating environments. We build desktop apps, mobile applications (iOS/Android), inventory systems, POS solutions, and specialized management software.",
      icon: "code",
      flyerImage: "./assets/software dev.jpg",
      deliverables: [
        "Cross-Platform Mobile Apps (iOS & Android)",
        "Point of Sale (POS) & Retail Inventory Systems",
        "School & University Management Systems",
        "Hospital & Clinic Information Systems",
        "Custom Desktop Software & Third-Party API Bridges"
      ],
      whoItsFor: ["Retail Stores & Supermarkets", "Educational Institutions", "Hospitals & Clinics", "Logistics Companies", "Large Enterprises"],
      process: [
        "System Architecture Design & Database Modeling",
        "Frontend & Offline-Capable Mobile/Desktop Build",
        "Hardware Integration (Barcode Scanners, Printers)",
        "User Acceptance Testing (UAT)",
        "On-Site Deployment & Hardware Setup"
      ],
      techUsed: ["Flutter / React Native", "Node.js / Express", "Python", "MySQL / PostgreSQL", "Electron"],
      faqs: [
        { q: "Can your POS or management software work offline?", a: "Yes! We build offline-first architectures that sync automatically once an internet connection is re-established." },
        { q: "Do you provide hardware along with software?", a: "We configure compatible hardware (receipt printers, barcode scanners, touch POS screens) and provide full on-site setup." }
      ]
    },
    {
      id: "it-support",
      title: "IT Support & Infrastructure",
      shortDesc: "Hardware & software support, network setup, cybersecurity, cloud services, training, and managed IT services.",
      fullDesc: "Keep your organization running smoothly without technical downtime. Our IT support team handles office networking, hardware maintenance, cybersecurity hardening, cloud backups, and 24/7 technical helpdesk assistance.",
      icon: "shield-check",
      flyerImage: "./assets/IT Support.jpg",
      deliverables: [
        "24/7 Managed IT Helpdesk & On-Site Support",
        "Office Network Design, Router Setup & WiFi Coverage",
        "Cybersecurity Hardening & Antivirus Deployment",
        "Cloud Storage & Automated Data Backup Solutions",
        "Staff Cybersecurity Awareness Training"
      ],
      whoItsFor: ["Corporate Offices", "NGO Headquarters", "Banks & Microfinance", "Schools", "Growing Businesses"],
      process: [
        "IT Infrastructure Audit & Risk Assessment",
        "Network & Hardware Standardization",
        "Security Rule Enforcement & Cloud Backup Setup",
        "SLA Agreement & Emergency Response Protocol",
        "Regular Preventive Maintenance Checks"
      ],
      techUsed: ["Ubiquiti / Cisco Networking", "Microsoft 365", "Google Workspace", "Linux / Windows Server", "Synology NAS"],
      faqs: [
        { q: "How fast is your response time for IT emergencies in Freetown?", a: "We guarantee an emergency response time of under 30 minutes for remote assistance and under 2 hours for on-site visits." },
        { q: "Do you offer monthly maintenance retainers?", a: "Yes, our Managed IT Service plans provide unlimited support for a fixed monthly fee." }
      ]
    },
    {
      id: "virtual-assistance",
      title: "Virtual Assistance & Help Desk",
      shortDesc: "Reliable remote support for everyday admin tasks, customer inquiries, and first-line help desk requests.",
      fullDesc: "Keep day-to-day work moving with a remote support partner for your team and customers. We can help manage routine administrative tasks, respond to common inquiries, organize requests, and route technical issues to the right person, with clear handoffs and regular updates.",
      icon: "headset",
      flyerImage: "./assets/virtual-assistance-help-desk.jpg",
      deliverables: [
        "Email, Calendar & Appointment Coordination",
        "Customer Inquiry and Message Handling",
        "First-Line Help Desk Triage & Ticket Tracking",
        "Document Preparation, Data Entry & Records Support",
        "Request Routing, Follow-Ups & Status Updates"
      ],
      whoItsFor: ["Small Businesses", "Busy Founders & Executives", "Customer Support Teams", "NGOs", "Growing Organizations"],
      process: [
        "Review Your Workflow, Tools & Support Needs",
        "Set Up Task Ownership and Communication Channels",
        "Handle Agreed Admin and Help Desk Requests",
        "Escalate Issues Requiring Specialist Access",
        "Share Regular Activity and Open-Request Updates"
      ],
      techUsed: ["Microsoft 365", "Google Workspace", "Email & Calendar Tools", "Help Desk and Ticketing Platforms"],
      faqs: [
        { q: "Can you support both admin tasks and customer inquiries?", a: "Yes. We can agree on a mix of administrative tasks and customer-facing requests based on your workflows." },
        { q: "Do you provide technical IT support too?", a: "We can triage and route first-line requests. Infrastructure, security, and advanced technical work are handled through our IT Support service." }
      ]
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing",
      shortDesc: "Grow your brand online with search optimization, paid campaigns, email marketing, and measurable digital strategy.",
      fullDesc: "Reach the right audience and turn attention into growth with a coordinated digital marketing strategy. We plan and manage campaigns across search, social, and email, then use performance reporting to improve results over time.",
      icon: "trending-up",
      flyerImage: "./assets/Digital merketing.jpg",
      deliverables: [
        "Search Engine Optimization (SEO)",
        "Paid Search & Social Advertising",
        "Email Marketing Campaigns",
        "Digital Campaign Strategy & Content Planning",
        "Analytics, Conversion Tracking & Reporting"
      ],
      whoItsFor: ["Small & Medium Businesses", "Retail & E-Commerce", "Professional Services", "Startups", "Non-Profits"],
      process: [
        "Business Goals & Audience Discovery",
        "Channel and Campaign Strategy",
        "Creative, Copy & Campaign Setup",
        "Launch, Monitor & Optimize",
        "Performance Review & Recommendations"
      ],
      techUsed: ["Google Ads", "Google Analytics", "Meta Ads", "Search Console", "Email Marketing Platforms"],
      faqs: [
        { q: "Can you manage our existing social and search campaigns?", a: "Yes. We can audit existing campaigns, improve their setup, and manage ongoing optimization and reporting." },
        { q: "How do you measure campaign performance?", a: "We agree on relevant goals such as qualified leads, sales, website visits, or engagement and report against those metrics." }
      ]
    },
    {
      id: "project-management",
      title: "Project Management",
      shortDesc: "Plan, coordinate, and deliver business and technology projects with clear goals, timelines, and team communication.",
      fullDesc: "Move projects forward with practical planning and coordination. We help define scope, organize tasks and milestones, track progress, manage risks, and keep stakeholders aligned from kickoff through delivery.",
      icon: "clipboard-list",
      flyerImage: "./assets/project-management.jpg",
      deliverables: [
        "Project Scope, Goals & Delivery Plans",
        "Task, Timeline & Milestone Coordination",
        "Team Communication & Stakeholder Updates",
        "Progress, Risks & Issue Tracking",
        "Project Closeout and Handover Documentation"
      ],
      whoItsFor: ["Small Businesses", "NGOs", "Technology Teams", "Growing Organizations", "Project-Based Teams"],
      process: [
        "Confirm Goals, Scope & Success Measures",
        "Build a Work Plan, Schedule & Responsibilities",
        "Coordinate Work and Track Milestones",
        "Share Progress and Address Risks or Blockers",
        "Complete Handover and Review Outcomes"
      ],
      techUsed: ["Project Planning", "Agile Workflows", "Task Tracking", "Progress Reporting"],
      faqs: [
        { q: "Can you manage technology implementation projects?", a: "Yes. We can coordinate project plans, schedules, teams, and handovers for technology and business projects." },
        { q: "Do you work with our existing project tools?", a: "Yes. We can adapt to your existing tools and workflows, or help set up a clear project tracking process." }
      ]
    }
  ],

  portfolio: [
    {
      id: "proj-loving-baby-steps",
      title: "Social Media Management for Loving Baby Steps",
      client: "Loving Baby Steps",
      trustLogo: "./assets/loving-baby-steps-logo.png",
      category: "Social Media",
      categorySlug: "social-media",
      image: "./assets/loving-baby-steps.png",
      summary: "Social media support for a mama and baby focused business serving families from pregnancy through postpartum.",
      challenge: "Loving Baby Steps offers hospital delivery bags, mama and baby essentials, gift packages, and postpartum wellness care. Its social media presence needs to make these offerings clear to expectant and new parents.",
      solution: "Social media management focused on presenting the brand's products and services clearly, planning useful content, and supporting conversations with its community across social channels.",
      results: "The work is centered on building a consistent, informative presence that helps families understand Loving Baby Steps' offerings and how to get in touch.",
      tech: ["Social Media Management", "Content Planning", "Community Engagement"]
    },
    {
      id: "proj-abc-development",
      title: "ABC Development Website",
      client: "ABC Development",
      trustLogo: "./assets/abc-development-logo.png",
      category: "Web Apps",
      categorySlug: "web-apps",
      image: "./assets/abc-development-website.png",
      summary: "A website showcasing ABC Development's education, community programs, news, resources, and impact work in Sierra Leone.",
      challenge: "ABC Development needed a clear online home for its work, including rural school rehabilitation, learning materials, and support that helps girls return to education.",
      solution: "Created a website with dedicated Projects, News, Impact, Resources, and Contact sections, plus clear paths for visitors to learn about the girls' education work and get involved.",
      results: "The site brings ABC Development's programs and education work together in one place, with clear routes for visitors, partners, and volunteers to learn more and make contact.",
      tech: ["Website Design & Development", "Project and Impact Content", "Volunteer Contact Flow"]
    },
    {
      id: "proj-intellect-digital-world",
      title: "Intellect Digital World Website",
      client: "Intellect Digital World",
      trustLogo: "./assets/intellect-digital-world-logo.png",
      category: "Web Apps",
      categorySlug: "web-apps",
      image: "./assets/intellect-digital-world-website.png",
      summary: "Website for a digital skills and technology solutions provider, presenting its services, training, and organizational mission.",
      challenge: "Intellect Digital World needed a clear online presence to introduce its practical digital skills, technology services, and training to students, professionals, and businesses.",
      solution: "Designed and built a responsive website with clear navigation, service and training information, and an About section explaining the organization’s work.",
      results: "The website presents Intellect Digital World’s offerings and mission in one place, with clear routes for visitors to explore and make contact.",
      tech: ["Website Design & Development", "Responsive Layout", "Content Structure"]
    }
  ],

  team: [
    {
      name: "Matthew Mohamed Vonjo",
      role: "Founder",
      bio: "Leadership and strategy lead driving TechLink's vision for digital growth and transformation across Sierra Leone and West Africa.",
      image: "./assets/Matthew Mohamed Vonjo (1).jpg",
      linkedin: "https://linkedin.com/in/techlinksl"
    },
    {
      name: "Osman Alhaji Mansarray",
      role: "Creative & Brand Design Lead",
      bio: "Leads creative direction, brand specifications, and design at TechLink SL. He develops clear visual identities, brand guidelines, and polished designs that keep each client’s brand consistent and help it stand out across digital and print channels.",
      image: "./assets/Osman Alhaji Mansarray.jpg",
      linkedin: "https://linkedin.com/in/techlinksl"
    },
    {
      name: "Shalom GC Alabi",
      role: "Lead Branding & Advertising Ambassador",
      bio: "Leads branding and advertising for TechLink SL, helping our clients build memorable brands and reach the right audiences.",
      image: "./assets/Shalom GC Alabi.jpg",
      linkedin: "https://linkedin.com/in/techlinksl"
    }
  ],

  testimonials: [
    {
      quote: "TechLink SL transformed our digital presence completely. Their web development team built our portal on time, and their ongoing IT support keeps our operations seamless.",
      company: "ABC Development",
      logo: "./assets/abc-development-logo.png",
      rating: 5,
    },
    {
      quote: "The graphic design package and social media management TechLink SL provided exceeded our expectations. Our customer inquiries doubled within a month!",
      company: "Loving Baby Steps",
      logo: "./assets/loving-baby-steps-logo.png",
      rating: 5,
    },
    {
      quote: "Implementing TechLink's AI Chatbot on our website has streamlined our customer support. Visitors get instant answers 24/7, and our consultation bookings have skyrocketed.",
      company: "Intellect Digital World",
      logo: "./assets/intellect-digital-world-logo.png",
      rating: 5,
    }
  ],

  blogs: [
    {
      id: "post-1",
      title: "Why Businesses in Sierra Leone Need a Modern Digital Headquarters in 2026",
      category: "Tech in Sierra Leone",
      date: "October 1, 2026",
      readTime: "5 min read",
      author: "Medvon Joson",
      image: "./assets/flyer_stunning_website.jpg",
      excerpt: "In today's fast-moving market, an outdated website costs you lucrative contracts. Discover how a modern, mobile-responsive web platform drives trust and revenue.",
      content: `
        <p class="mb-4">In 2026, prospective clients in Freetown and internationally no longer judge a business solely by its physical office. Your website is your digital headquarters — the primary channel through which corporate clients, NGOs, and diaspora investors evaluate your credibility.</p>
        <h3 class="text-xl font-bold mb-2 text-emerald-400">1. Mobile-First is Mandatory</h3>
        <p class="mb-4">Over 85% of internet traffic in West Africa occurs on smartphones. If your website is slow, broken on mobile screens, or lacks clear WhatsApp contact options, visitors bounce immediately to your competitors.</p>
        <h3 class="text-xl font-bold mb-2 text-emerald-400">2. Instant Lead Generation</h3>
        <p class="mb-4">A high-converting website isn't just an online brochure. It incorporates multi-step quote request forms, AI support assistants, and direct call-to-actions that turn passive visitors into scheduled consultation meetings.</p>
        <h3 class="text-xl font-bold mb-2 text-emerald-400">3. SEO Drives Inbound Clients</h3>
        <p class="mb-4">When international partners or local companies search for 'IT Support Freetown' or 'Web Developer Sierra Leone', ranking on Page 1 of Google ensures your agency gets discovered first.</p>
      `
    },
    {
      id: "post-2",
      title: "How AI Chatbots are Revolutionizing Customer Service Across West Africa",
      category: "AI Solutions",
      date: "September 24, 2026",
      readTime: "4 min read",
      author: "Samuel Koroma",
      image: "./assets/logo.png",
      excerpt: "Learn how conversational AI chatbots handle inquiries 24/7, reduce support costs, and capture leads while your team sleeps.",
      content: `
        <p class="mb-4">Artificial Intelligence is no longer just a futuristic concept — it is actively driving customer retention and sales automation for businesses across Freetown, Monrovia, and Accra.</p>
        <h3 class="text-xl font-bold mb-2 text-emerald-400">Zero Wait Time Support</h3>
        <p class="mb-4">Customers expect immediate responses. An AI chatbot answers pricing, service offerings, and booking availability within milliseconds at any hour of the night.</p>
      `
    },
    {
      id: "post-3",
      title: "The Power of Visual Branding: How Design Drives Corporate Trust",
      category: "Graphic Design",
      date: "September 15, 2026",
      readTime: "6 min read",
      author: "Mohamed Bangura",
      image: "./assets/flyer_social_media.jpg",
      excerpt: "Your logo and graphic creatives are the first impression your brand makes. Here is how professional graphic design elevates your brand value.",
      content: `
        <p class="mb-4">Visual identity is a silent salesman. A clean, modern logo and cohesive social media creatives communicate professionalism before a client reads a single word of your proposal.</p>
      `
    }
  ],

  jobs: [
    {
      id: "job-1",
      title: "Senior Full-Stack Developer (React / Node.js)",
      type: "Full-Time",
      location: "Freetown, Sierra Leone (Hybrid)",
      department: "Engineering",
      desc: "We are seeking an experienced Full-Stack Engineer to lead frontend & backend web application projects.",
      requirements: [
        "3+ years experience building web applications with React/Next.js and Node.js/Express.",
        "Proficiency in SQL (PostgreSQL) and NoSQL (MongoDB).",
        "Experience building and consuming RESTful APIs and GraphQL.",
        "Strong understanding of responsive design, web security, and git version control."
      ]
    },
    {
      id: "job-2",
      title: "UI/UX & Brand Identity Designer",
      type: "Full-Time",
      location: "Freetown, Sierra Leone",
      department: "Creative Studio",
      desc: "Join our creative team to design stunning web interfaces, vector branding, and promotional collateral.",
      requirements: [
        "Strong portfolio demonstrating UI/UX wireframing, web design, and logo design.",
        "Expertise in Figma, Adobe Illustrator, and Photoshop.",
        "Ability to translate client goals into modern visual design systems."
      ]
    },
    {
      id: "job-3",
      title: "AI & Automation Specialist",
      type: "Full-Time / Contract",
      location: "Remote / Freetown",
      department: "AI & Data Solutions",
      desc: "Build AI chatbots, LLM agent workflows, and process automation pipelines for enterprise clients.",
      requirements: [
        "Proficiency in Python, LangChain, and AI API integrations (OpenAI, Claude, Llama).",
        "Understanding of vector databases, RAG architectures, and API webhooks.",
        "Passion for emerging AI technologies and workflow automation."
      ]
    }
  ],

  chatbotKnowledge: {
    greetings: [
      "Hello! Welcome to TechLink SL (Sierra Leone Ltd). How can I assist you with your technology needs today?",
      "Hi there! I am the TechLink AI Assistant. Are you interested in Web Apps, Graphic Design, AI Solutions, or requesting a custom quote?"
    ],
    fallback: "Thank you for reaching out! Our team at TechLink SL is ready to assist. You can submit a Quote Request, book a free consultation, or chat directly with our team on our official WhatsApp Business account at +232 71 345276."
  }
};
