import type {
  Credential,
  GraphDefinition,
  PortfolioAction,
  PortfolioDetail,
  PortfolioEdge,
  PortfolioIconKey,
  PortfolioImage,
  PortfolioNode,
  PortfolioSiteData,
  Proficiency,
} from "../types/portfolio";

const placeholderImage = (
  id: string,
  src: string,
  alt: string,
  placeholderLabel: string,
): PortfolioImage => ({
  id,
  src,
  alt,
  placeholderLabel,
  availability: "placeholder",
});

const connectFromCenter = (
  centerNodeId: string,
  nodes: readonly PortfolioNode[],
  kind: PortfolioEdge["kind"] = "default",
): PortfolioEdge[] =>
  nodes
    .filter((node) => node.id !== centerNodeId)
    .map((node) => ({
      id: `${centerNodeId}--${node.id}`,
      source: centerNodeId,
      target: node.id,
      kind,
    }));

const detail = (
  title: string,
  description: string,
  options: Omit<PortfolioDetail, "title" | "description"> = {},
): PortfolioDetail => ({ title, description, ...options });

export const portfolioActions = {
  email: {
    id: "email",
    label: "Email",
    kind: "email",
    icon: "mail",
    value: "[EMAIL]",
    availability: "placeholder",
    analyticsEvent: "email_clicked",
    ariaLabel: "Email address not yet configured",
  },
  phone: {
    id: "phone",
    label: "Phone",
    kind: "phone",
    icon: "phone",
    value: "[PHONE]",
    availability: "placeholder",
    ariaLabel: "Phone number not yet configured",
  },
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    kind: "external",
    icon: "linkedin",
    value: "linkedin.com/in/daniel-laky-141a9b350",
    href: "https://www.linkedin.com/in/daniel-laky-141a9b350/",
    availability: "available",
    external: true,
    analyticsEvent: "linkedin_clicked",
    ariaLabel: "Open Daniel Laky's LinkedIn profile in a new tab",
  },
  github: {
    id: "github",
    label: "GitHub",
    kind: "external",
    icon: "github",
    value: "github.com/daniel-techAI",
    href: "https://github.com/daniel-techAI",
    availability: "available",
    external: true,
    analyticsEvent: "github_clicked",
    ariaLabel: "Open Daniel Laky's GitHub profile in a new tab",
  },
  cv: {
    id: "cv",
    label: "Download CV",
    kind: "download",
    icon: "file-down",
    value: "Daniel_Laky_Remote_Roles_CV.pdf",
    href: "/documents/Daniel_Laky_Remote_Roles_CV.pdf",
    availability: "asset-dependent",
    download: "Daniel_Laky_Remote_Roles_CV.pdf",
    analyticsEvent: "cv_downloaded",
    ariaLabel: "Download Daniel Laky's CV as a PDF",
  },
  klinepilotLive: {
    id: "klinepilot-live",
    label: "Open live app",
    kind: "external",
    icon: "globe-2",
    value: "klinepilot-live.daniel-laky.chatgpt.site",
    href: "https://klinepilot-live.daniel-laky.chatgpt.site/",
    availability: "available",
    external: true,
    ariaLabel: "Open the live Klinepilot research app in a new tab",
  },
  klinepilotRepository: {
    id: "klinepilot-repository",
    label: "Repository",
    kind: "external",
    icon: "folder-git-2",
    value: "[KLINEPILOT_REPOSITORY_URL]",
    availability: "placeholder",
    external: true,
    analyticsEvent: "github_clicked",
    ariaLabel: "Klinepilot repository link not yet configured",
  },
} as const satisfies Record<string, PortfolioAction>;

type CredentialDraft = Pick<
  Credential,
  "id" | "title" | "issuer" | "verificationType" | "description" | "skills"
>;

const plannedCredential = (draft: CredentialDraft): Credential => ({
  ...draft,
  category: draft.issuer,
  issueDate: null,
  expirationDate: null,
  credentialUrl: null,
  certificateImage: null,
  status: "planned",
  featured: false,
});

export const credentials: readonly Credential[] = [
  plannedCredential({
    id: "openai-ai-foundations",
    title: "AI Foundations",
    issuer: "OpenAI",
    verificationType: "course completion",
    description: "Planned foundational learning. This credential has not been earned yet.",
    skills: ["AI foundations"],
  }),
  plannedCredential({
    id: "openai-applied-ai-foundations",
    title: "Applied AI Foundations",
    issuer: "OpenAI",
    verificationType: "course completion",
    description: "Planned applied AI learning. This credential has not been earned yet.",
    skills: ["applied AI"],
  }),
  plannedCredential({
    id: "openai-agents-and-workflows",
    title: "Agents and Workflows",
    issuer: "OpenAI",
    verificationType: "course completion",
    description:
      "Planned learning about agents and AI-assisted workflows. This credential has not been earned yet.",
    skills: ["AI agents", "workflow design"],
  }),
  plannedCredential({
    id: "anthropic-ai-fluency-framework-and-foundations",
    title: "AI Fluency: Framework and Foundations",
    issuer: "Anthropic",
    verificationType: "course completion",
    description: "Planned AI fluency learning. This credential has not been earned yet.",
    skills: ["AI fluency"],
  }),
  plannedCredential({
    id: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    verificationType: "course completion",
    description: "Planned introductory Claude learning. This credential has not been earned yet.",
    skills: ["Claude"],
  }),
  plannedCredential({
    id: "anthropic-claude-code-in-action",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    verificationType: "course completion",
    description: "Planned Claude Code learning. This credential has not been earned yet.",
    skills: ["Claude Code", "agent-assisted development"],
  }),
  plannedCredential({
    id: "google-analytics-certification",
    title: "Google Analytics Certification",
    issuer: "Google",
    verificationType: "formal certification",
    description: "Planned analytics certification. This credential has not been earned yet.",
    skills: ["Google Analytics", "measurement"],
  }),
  plannedCredential({
    id: "google-ads-search-certification",
    title: "Google Ads Search Certification",
    issuer: "Google",
    verificationType: "formal certification",
    description:
      "Planned search advertising certification. This credential has not been earned yet.",
    skills: ["Google Ads", "search advertising"],
  }),
  plannedCredential({
    id: "hubspot-inbound-certification",
    title: "Inbound Certification",
    issuer: "HubSpot",
    verificationType: "formal certification",
    description:
      "Planned inbound methodology certification. This credential has not been earned yet.",
    skills: ["inbound methodology"],
  }),
  plannedCredential({
    id: "hubspot-inbound-sales-certification",
    title: "Inbound Sales Certification",
    issuer: "HubSpot",
    verificationType: "formal certification",
    description: "Planned inbound sales certification. This credential has not been earned yet.",
    skills: ["inbound sales", "sales support"],
  }),
  plannedCredential({
    id: "hubspot-digital-marketing-certification",
    title: "Digital Marketing Certification",
    issuer: "HubSpot",
    verificationType: "formal certification",
    description:
      "Planned digital marketing certification. This credential has not been earned yet.",
    skills: ["digital marketing"],
  }),
  plannedCredential({
    id: "hubspot-revenue-operations-certification",
    title: "Revenue Operations Certification",
    issuer: "HubSpot",
    verificationType: "formal certification",
    description:
      "Planned revenue operations certification. This credential has not been earned yet.",
    skills: ["revenue operations"],
  }),
  plannedCredential({
    id: "ibm-customer-engagement-fundamentals",
    title: "Customer Engagement Fundamentals",
    issuer: "IBM",
    verificationType: "learning badge",
    description: "Planned customer engagement learning. This credential has not been earned yet.",
    skills: ["customer engagement"],
  }),
  plannedCredential({
    id: "ibm-artificial-intelligence-fundamentals",
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM",
    verificationType: "learning badge",
    description: "Planned AI fundamentals learning. This credential has not been earned yet.",
    skills: ["artificial intelligence"],
  }),
  plannedCredential({
    id: "ibm-agile-explorer",
    title: "Agile Explorer",
    issuer: "IBM",
    verificationType: "learning badge",
    description: "Planned agile practices learning. This credential has not been earned yet.",
    skills: ["agile practices"],
  }),
  plannedCredential({
    id: "ibm-project-management-fundamentals",
    title: "Project Management Fundamentals",
    issuer: "IBM",
    verificationType: "learning badge",
    description: "Planned project management learning. This credential has not been earned yet.",
    skills: ["project management"],
  }),
  plannedCredential({
    id: "microsoft-streamline-business-workflows-with-ai-chat",
    title: "Streamline Business Workflows with AI Chat",
    issuer: "Microsoft",
    verificationType: "course completion",
    description: "Planned business workflow learning. This credential has not been earned yet.",
    skills: ["AI chat", "business workflows"],
  }),
  plannedCredential({
    id: "microsoft-generate-reports-with-ai-research-agents",
    title: "Generate Reports with AI Research Agents",
    issuer: "Microsoft",
    verificationType: "course completion",
    description: "Planned AI research-agent learning. This credential has not been earned yet.",
    skills: ["AI research", "reporting"],
  }),
  plannedCredential({
    id: "microsoft-create-and-manage-automated-processes-with-power-automate",
    title: "Create and Manage Automated Processes with Power Automate",
    issuer: "Microsoft",
    verificationType: "course completion",
    description: "Planned workflow automation learning. This credential has not been earned yet.",
    skills: ["Power Automate", "process automation"],
  }),
  plannedCredential({
    id: "github-introduction-to-github",
    title: "Introduction to GitHub",
    issuer: "GitHub",
    verificationType: "course completion",
    description: "Planned introductory GitHub learning. This credential has not been earned yet.",
    skills: ["GitHub"],
  }),
  plannedCredential({
    id: "github-introduction-to-git",
    title: "Introduction to Git",
    issuer: "GitHub",
    verificationType: "course completion",
    description: "Planned introductory Git learning. This credential has not been earned yet.",
    skills: ["Git"],
  }),
  plannedCredential({
    id: "github-foundations-certification",
    title: "GitHub Foundations Certification",
    issuer: "GitHub",
    verificationType: "formal certification",
    description:
      "Planned GitHub Foundations certification. This credential has not been earned yet.",
    skills: ["GitHub", "Git", "repositories"],
  }),
];

const gallery = (
  project: "growthstack" | "emotecture" | "klinepilot" | "creative",
  subject: string,
  count = 2,
): readonly PortfolioImage[] =>
  Array.from({ length: count }, (_, index) =>
    placeholderImage(
      `${project}-${subject}-${index + 1}`,
      `/images/projects/${project}/${subject}-${index + 1}.jpg`,
      `${subject} image for ${project}`,
      `${subject} image placeholder ${index + 1}`,
    ),
  );

const aboutNodes = [
  {
    id: "about-center",
    slug: "about",
    title: "About Daniel",
    descriptor: "Professional profile, working style and direction",
    kind: "category",
    icon: "user-round",
    featured: true,
    childCount: 6,
  },
  {
    id: "about-professional-summary",
    slug: "professional-summary",
    title: "Professional Summary",
    descriptor: "Adaptable, commercially minded and practical",
    kind: "detail",
    icon: "file-text",
    detail: detail(
      "Professional Summary",
      "Adaptable and commercially minded professional with experience in customer-facing retail, international production, and independent digital projects. Comfortable working in fast-paced environments, communicating across cultures, solving practical problems, and taking ownership of tasks. Seeking a remote role in customer support, sales support, operations, e-commerce, or digital coordination while continuing to build strong business and technology skills.",
    ),
  },
  {
    id: "about-working-style",
    slug: "working-style",
    title: "Working Style",
    descriptor: "Independent, reliable and systems-oriented",
    kind: "detail",
    icon: "settings-2",
    detail: detail("Working Style", "A practical approach to learning, ownership and execution.", {
      sections: [
        {
          id: "working-style-traits",
          items: [
            "independent",
            "reliable",
            "systems-oriented",
            "commercially aware",
            "analytical",
            "adaptable",
            "comfortable learning new tools",
            "focused on practical execution",
          ],
        },
      ],
    }),
  },
  {
    id: "about-languages",
    slug: "languages",
    title: "Languages",
    descriptor: "Slovak, Czech and English",
    kind: "detail",
    icon: "languages",
    detail: detail("Languages", "Languages used across local and international environments.", {
      sections: [
        {
          id: "language-proficiency",
          items: [
            "Slovak: Native",
            "Czech: Professional working proficiency",
            "English: Professional working proficiency",
          ],
        },
      ],
    }),
  },
  {
    id: "about-career-direction",
    slug: "career-direction",
    title: "Career Direction",
    descriptor: "A stable remote career with room to build",
    kind: "detail",
    icon: "compass",
    detail: detail(
      "Career Direction",
      "Build a stable remote career in operations, customer support, sales support, e-commerce, digital coordination or junior technology-enabled business roles while developing independent digital and creative businesses.",
    ),
  },
  {
    id: "about-strengths",
    slug: "strengths",
    title: "Strengths",
    descriptor: "Reliable execution and cross-cultural communication",
    kind: "detail",
    icon: "sparkles",
    detail: detail(
      "Strengths",
      "Strengths demonstrated through customer-facing work, international production and independent projects.",
      {
        sections: [
          {
            id: "strengths-list",
            items: [
              "reliable execution",
              "practical problem-solving",
              "cross-cultural communication",
              "customer-focused thinking",
              "adaptability under pressure",
              "commercial awareness",
            ],
          },
        ],
      },
    ),
  },
  {
    id: "about-current-focus",
    slug: "current-focus",
    title: "Current Focus",
    descriptor: "Remote work, digital projects and AI-assisted workflows",
    kind: "detail",
    icon: "focus",
    detail: detail("Current Focus", "The work and learning areas receiving attention now.", {
      sections: [
        {
          id: "current-focus-list",
          items: [
            "remote employment in Slovakia",
            "Growthstack",
            "Emotecture Studio",
            "Klinepilot",
            "AI-assisted workflows",
            "web and digital product skills",
          ],
        },
      ],
    }),
  },
] as const satisfies readonly PortfolioNode[];

const aboutGraph: GraphDefinition = {
  id: "about",
  slug: "about",
  title: "About Daniel",
  description: "Professional summary, working style, languages and direction.",
  centerNodeId: "about-center",
  nodes: aboutNodes,
  edges: connectFromCenter("about-center", aboutNodes),
  layout: "radial",
  parentGraphId: "root",
  parentNodeId: "root-about",
};

const experienceNodes = [
  {
    id: "experience-center",
    slug: "experience",
    title: "Professional Experience",
    descriptor: "Customer-facing retail and international production",
    kind: "category",
    icon: "briefcase-business",
    featured: true,
    childCount: 2,
  },
  {
    id: "experience-otto",
    slug: "production-employee-otto-work-force",
    title: "Production Employee",
    descriptor: "OTTO Work Force B.V. · Netherlands",
    kind: "timeline",
    icon: "building-2",
    status: "current",
    meta: {
      company: "OTTO Work Force B.V.",
      location: "Netherlands",
      dates: "July 2026 – Present",
      layoutWeight: 1.2,
    },
    detail: detail(
      "Production Employee",
      "A high-volume production role requiring dependable execution, quality awareness and cooperation in an international team.",
      {
        subtitle: "OTTO Work Force B.V.",
        dates: "July 2026 – Present",
        location: "Netherlands",
        status: "current",
        sections: [
          {
            id: "otto-responsibilities",
            title: "Responsibilities",
            items: [
              "Work reliably in a high-volume production environment while meeting quality, safety and productivity requirements.",
              "Adapt to changing shifts, responsibilities and international team structures.",
              "Follow detailed procedures and maintain reliability under time pressure.",
              "Communicate and cooperate with colleagues from different cultural and language backgrounds.",
            ],
          },
          {
            id: "otto-skills",
            title: "Skills demonstrated",
            items: [
              "reliability",
              "process adherence",
              "international teamwork",
              "time management",
              "adaptability",
              "quality awareness",
            ],
          },
        ],
      },
    ),
  },
  {
    id: "experience-foot-locker",
    slug: "sales-assistant-foot-locker",
    title: "Sales Assistant",
    descriptor: "Foot Locker · Prague, Czechia",
    kind: "timeline",
    icon: "shopping-bag",
    status: "completed",
    meta: {
      company: "Foot Locker",
      location: "Prague, Czechia",
      dates: "October 2025 – June 2026",
      layoutWeight: 1.2,
    },
    detail: detail(
      "Sales Assistant",
      "A customer-facing retail role combining sales support, product communication and daily store operations.",
      {
        subtitle: "Foot Locker",
        dates: "October 2025 – June 2026",
        location: "Prague, Czechia",
        status: "completed",
        sections: [
          {
            id: "foot-locker-responsibilities",
            title: "Responsibilities",
            items: [
              "Assisted customers with product selection, sizing and purchasing decisions.",
              "Supported sales through product knowledge, clear communication and customer-focused service.",
              "Helped with stock, merchandising, order questions and daily store operations.",
              "Worked effectively during busy periods in an international retail environment.",
            ],
          },
          {
            id: "foot-locker-skills",
            title: "Skills demonstrated",
            items: [
              "customer service",
              "sales support",
              "product communication",
              "retail operations",
              "problem-solving",
              "teamwork",
            ],
          },
        ],
      },
    ),
  },
] as const satisfies readonly PortfolioNode[];

const experienceGraph: GraphDefinition = {
  id: "experience",
  slug: "experience",
  title: "Professional Experience",
  description: "A timeline of customer-facing and operational work.",
  centerNodeId: "experience-center",
  nodes: experienceNodes,
  edges: connectFromCenter("experience-center", experienceNodes, "timeline"),
  layout: "timeline",
  parentGraphId: "root",
  parentNodeId: "root-experience",
};

const educationNodes = [
  {
    id: "education-center",
    slug: "education",
    title: "Education",
    descriptor: "Business, economics, hospitality and service",
    kind: "category",
    icon: "graduation-cap",
    featured: true,
    childCount: 2,
  },
  {
    id: "education-vse",
    slug: "prague-university-economics-business",
    title: "Business and Economics Studies",
    descriptor: "Prague University of Economics and Business, VŠE",
    kind: "timeline",
    icon: "book-open",
    status: "studies",
    meta: {
      dates: "2025 – 2026",
      location: "Prague, Czechia",
      layoutWeight: 1.3,
    },
    detail: detail("Business and Economics Studies", "Business and economics studies", {
      subtitle: "Prague University of Economics and Business, VŠE",
      dates: "2025 – 2026",
      location: "Prague, Czechia",
      status: "studies",
      sections: [
        {
          id: "vse-relevant-areas",
          title: "Relevant areas",
          items: [
            "economics",
            "management",
            "marketing",
            "law",
            "mathematics",
            "information technology",
          ],
        },
      ],
    }),
  },
  {
    id: "education-hotel-academy",
    slug: "hotel-academy",
    title: "Hotel Academy",
    descriptor: "Secondary Vocational School of Gastronomy and Hotel Services",
    kind: "timeline",
    icon: "graduation-cap",
    status: "completed",
    meta: {
      dates: "2020 – 2025",
      location: "Slovakia",
      layoutWeight: 1.3,
    },
    detail: detail(
      "Hotel Academy",
      "Secondary vocational education focused on hospitality, service and practical operations.",
      {
        subtitle: "Secondary Vocational School of Gastronomy and Hotel Services",
        dates: "2020 – 2025",
        location: "Slovakia",
        status: "completed",
        sections: [
          {
            id: "hotel-academy-relevant-areas",
            title: "Relevant areas",
            items: [
              "hospitality",
              "customer service",
              "tourism",
              "business communication",
              "practical operations",
              "gastronomy",
            ],
          },
        ],
      },
    ),
  },
] as const satisfies readonly PortfolioNode[];

const educationGraph: GraphDefinition = {
  id: "education",
  slug: "education",
  title: "Education",
  description: "Business, economics, hospitality and service studies.",
  centerNodeId: "education-center",
  nodes: educationNodes,
  edges: connectFromCenter("education-center", educationNodes, "timeline"),
  layout: "timeline",
  parentGraphId: "root",
  parentNodeId: "root-education",
};

const contactNodes = [
  {
    id: "contact-center",
    slug: "contact",
    title: "Contact Daniel",
    descriptor: "Remote opportunities and professional connections",
    kind: "contact",
    icon: "contact",
    featured: true,
    childCount: 6,
    detail: detail(
      "Contact Daniel",
      "Daniel is open to suitable remote opportunities based in Slovakia.",
      { actions: [portfolioActions.email, portfolioActions.phone] },
    ),
  },
  {
    id: "contact-email",
    slug: "email",
    title: "Email",
    descriptor: "Address awaiting configuration",
    kind: "contact",
    icon: "mail",
    action: portfolioActions.email,
    detail: detail("Email", "Daniel's email address will be shown here after it is configured.", {
      actions: [portfolioActions.email],
    }),
  },
  {
    id: "contact-linkedin",
    slug: "linkedin",
    title: "LinkedIn",
    descriptor: "Professional profile",
    kind: "contact",
    icon: "linkedin",
    action: portfolioActions.linkedin,
    detail: detail("LinkedIn", "Connect with Daniel on LinkedIn.", {
      actions: [portfolioActions.linkedin],
    }),
  },
  {
    id: "contact-github",
    slug: "github",
    title: "GitHub",
    descriptor: "Profile link awaiting configuration",
    kind: "contact",
    icon: "github",
    action: portfolioActions.github,
    detail: detail(
      "GitHub",
      "Daniel's GitHub profile will be linked here after it is configured.",
      {
        actions: [portfolioActions.github],
      },
    ),
  },
  {
    id: "contact-cv",
    slug: "download-cv",
    title: "Download CV",
    descriptor: "PDF · available when supplied",
    kind: "contact",
    icon: "file-down",
    action: portfolioActions.cv,
    detail: detail(
      "Download CV",
      "The download becomes available when Daniel_Laky_Remote_Roles_CV.pdf is added to public/documents.",
      { actions: [portfolioActions.cv] },
    ),
  },
  {
    id: "contact-location",
    slug: "location",
    title: "Location",
    descriptor: "Senec, Slovakia",
    kind: "contact",
    icon: "map-pin",
    detail: detail("Location", "Senec, Slovakia"),
  },
  {
    id: "contact-work-preferences",
    slug: "work-preferences",
    title: "Work Preferences",
    descriptor: "Remote, Slovakia-based opportunities",
    kind: "contact",
    icon: "briefcase-business",
    detail: detail(
      "Work Preferences",
      "Daniel is seeking remote, Slovakia-based employment in practical customer, operational and digital roles.",
      {
        sections: [
          {
            id: "work-preferences-list",
            items: [
              "remote",
              "Slovakia-based employment",
              "customer support",
              "operations",
              "sales support",
              "e-commerce",
              "digital coordination",
              "junior AI-enabled business roles",
            ],
          },
        ],
      },
    ),
  },
] as const satisfies readonly PortfolioNode[];

const contactGraph: GraphDefinition = {
  id: "contact",
  slug: "contact",
  title: "Contact Daniel",
  description: "Professional contact details, CV and work preferences.",
  centerNodeId: "contact-center",
  nodes: contactNodes,
  edges: connectFromCenter("contact-center", contactNodes),
  layout: "radial",
  parentGraphId: "root",
  parentNodeId: "root-contact",
};

const growthstackNodes = [
  {
    id: "growthstack-center",
    slug: "growthstack",
    title: "Growthstack",
    descriptor: "Website services and digital growth systems",
    kind: "project",
    icon: "trending-up",
    status: "active development",
    featured: true,
    childCount: 8,
    meta: { category: "Website services and digital growth systems", layoutWeight: 1.3 },
    detail: detail(
      "Growthstack",
      "Growthstack is a developing service concept focused on professional websites, clear digital presentation and practical growth systems for small businesses.",
      {
        eyebrow: "Website services and digital growth systems",
        status: "active development",
      },
    ),
  },
  {
    id: "growthstack-problem",
    slug: "problem",
    title: "Problem",
    descriptor: "Outdated sites and unclear conversion paths",
    kind: "detail",
    icon: "search",
    detail: detail(
      "Problem",
      "Many small service businesses have outdated websites, weak information structure and unclear conversion paths.",
      { status: "concept" },
    ),
  },
  {
    id: "growthstack-target-customers",
    slug: "target-customers",
    title: "Target Customers",
    descriptor: "Small service businesses",
    kind: "detail",
    icon: "target",
    detail: detail(
      "Target Customers",
      "Small service businesses that need a credible website and a clearer path from visitor to enquiry.",
      { status: "concept" },
    ),
  },
  {
    id: "growthstack-services",
    slug: "services",
    title: "Services",
    descriptor: "Potential website and launch support",
    kind: "detail",
    icon: "layers-3",
    status: "planned",
    detail: detail(
      "Potential Services",
      "The service offer is still being developed. Potential services include:",
      {
        status: "planned",
        sections: [
          {
            id: "growthstack-potential-services",
            items: [
              "website strategy",
              "website design",
              "website development",
              "mobile optimisation",
              "copy structure",
              "enquiry systems",
              "analytics",
              "launch support",
            ],
          },
        ],
      },
    ),
  },
  {
    id: "growthstack-process",
    slug: "process",
    title: "Process",
    descriptor: "A practical delivery process in development",
    kind: "detail",
    icon: "workflow",
    status: "in development",
    detail: detail(
      "Process",
      "A clear, repeatable website delivery process is being structured and tested.",
      {
        status: "in development",
        sections: [
          {
            id: "growthstack-process-outline",
            title: "Working outline",
            items: [
              "discovery and goals",
              "information and copy structure",
              "design and development",
              "review and mobile optimisation",
              "launch preparation and support",
            ],
          },
        ],
      },
    ),
  },
  {
    id: "growthstack-tools",
    slug: "tools",
    title: "Tools",
    descriptor: "Modern web, research and analytics tools",
    kind: "detail",
    icon: "tool-case",
    detail: detail("Tools", "Tools currently used or evaluated while developing Growthstack.", {
      status: "in development",
      sections: [
        {
          id: "growthstack-tools-list",
          items: [
            "Next.js",
            "React",
            "TypeScript",
            "AI-assisted research",
            "GitHub",
            "design tools",
            "analytics tools",
          ],
        },
      ],
    }),
  },
  {
    id: "growthstack-demonstrations",
    slug: "demonstrations",
    title: "Demonstrations",
    descriptor: "Demonstration work will be added here",
    kind: "gallery",
    icon: "monitor-smartphone",
    status: "planned",
    detail: detail(
      "Demonstrations",
      "Planned demonstration websites and interface examples will appear here as they are developed.",
      {
        status: "planned",
        images: gallery("growthstack", "demonstration"),
      },
    ),
  },
  {
    id: "growthstack-case-studies",
    slug: "case-studies",
    title: "Case Studies",
    descriptor: "No finished case studies claimed",
    kind: "detail",
    icon: "file-text",
    status: "planned",
    detail: detail(
      "Case Studies",
      "Case studies are planned. No customer results or completed client outcomes are claimed at this stage.",
      { status: "planned" },
    ),
  },
  {
    id: "growthstack-status",
    slug: "status",
    title: "Status",
    descriptor: "Active development",
    kind: "detail",
    icon: "activity",
    status: "active development",
    detail: detail(
      "Status",
      "Growthstack is in active development as a website services and digital growth systems concept.",
      { status: "active development" },
    ),
  },
] as const satisfies readonly PortfolioNode[];

const growthstackGraph: GraphDefinition = {
  id: "growthstack",
  slug: "growthstack",
  title: "Growthstack",
  description: "Website services and digital growth systems for small businesses.",
  centerNodeId: "growthstack-center",
  nodes: growthstackNodes,
  edges: connectFromCenter("growthstack-center", growthstackNodes),
  layout: "radial",
  parentGraphId: "projects",
  parentNodeId: "projects-growthstack",
};

const emotectureNodes = [
  {
    id: "emotecture-center",
    slug: "emotecture",
    title: "Emotecture Studio",
    descriptor: "Clothing, visual identity and creative e-commerce",
    kind: "project",
    icon: "shirt",
    status: "active development",
    featured: true,
    childCount: 8,
    meta: { category: "Clothing, visual identity and creative e-commerce", layoutWeight: 1.3 },
    detail: detail(
      "Emotecture Studio",
      "Emotecture Studio explores clothing, visual identity and emotionally driven design through gothic, architectural and cybersigil-influenced concepts.",
      {
        eyebrow: "Clothing, visual identity and creative e-commerce",
        status: "active development",
      },
    ),
  },
  {
    id: "emotecture-brand-concept",
    slug: "brand-concept",
    title: "Brand Concept",
    descriptor: "Emotion, architecture and visual symbolism",
    kind: "detail",
    icon: "lightbulb",
    status: "concept",
    detail: detail(
      "Brand Concept",
      "An evolving creative concept connecting emotional expression, architectural references and clothing.",
      { status: "concept" },
    ),
  },
  {
    id: "emotecture-clothing-designs",
    slug: "clothing-designs",
    title: "Clothing Designs",
    descriptor: "Gothic and architectural experiments",
    kind: "gallery",
    icon: "shirt",
    status: "experimental",
    detail: detail(
      "Clothing Designs",
      "Experimental clothing concepts and works in development. Images can be added without changing the interface.",
      {
        status: "experimental",
        images: gallery("emotecture", "clothing-design", 3),
      },
    ),
  },
  {
    id: "emotecture-creative-process",
    slug: "creative-process",
    title: "Creative Process",
    descriptor: "Research, sketches, iteration and mockups",
    kind: "detail",
    icon: "workflow",
    status: "in development",
    detail: detail(
      "Creative Process",
      "A developing process that moves from visual research and concepts through iteration and product mockups.",
      { status: "in development" },
    ),
  },
  {
    id: "emotecture-visual-identity",
    slug: "visual-identity",
    title: "Visual Identity",
    descriptor: "Gothic, architectural and cybersigil influences",
    kind: "gallery",
    icon: "palette",
    status: "in development",
    detail: detail(
      "Visual Identity",
      "An evolving visual language influenced by gothic forms, architecture and cybersigil-inspired graphics.",
      {
        status: "in development",
        images: gallery("emotecture", "visual-identity"),
      },
    ),
  },
  {
    id: "emotecture-social-content",
    slug: "social-content",
    title: "Social Content",
    descriptor: "Content direction in development",
    kind: "gallery",
    icon: "image",
    status: "planned",
    detail: detail(
      "Social Content",
      "Social content formats and visual storytelling are planned as part of the brand's development.",
      {
        status: "planned",
        images: gallery("emotecture", "social-content"),
      },
    ),
  },
  {
    id: "emotecture-product-development",
    slug: "product-development",
    title: "Product Development",
    descriptor: "Concepts, prototypes and practical evaluation",
    kind: "detail",
    icon: "wrench",
    status: "in development",
    detail: detail(
      "Product Development",
      "Clothing concepts are being explored and evaluated before any finished range is claimed.",
      { status: "in development" },
    ),
  },
  {
    id: "emotecture-ecommerce-plan",
    slug: "e-commerce-plan",
    title: "E-commerce Plan",
    descriptor: "A future path from concept to shop",
    kind: "detail",
    icon: "shopping-bag",
    status: "planned",
    detail: detail(
      "E-commerce Plan",
      "An e-commerce approach is planned, with product, fulfilment and launch decisions still to be validated.",
      { status: "planned" },
    ),
  },
  {
    id: "emotecture-gallery",
    slug: "gallery",
    title: "Gallery",
    descriptor: "Creative work will be collected here",
    kind: "gallery",
    icon: "gallery-horizontal-end",
    status: "in development",
    detail: detail(
      "Gallery",
      "A growing visual archive for Emotecture Studio concepts and experiments.",
      {
        status: "in development",
        images: gallery("emotecture", "gallery", 4),
      },
    ),
  },
] as const satisfies readonly PortfolioNode[];

const emotectureGraph: GraphDefinition = {
  id: "emotecture",
  slug: "emotecture",
  title: "Emotecture Studio",
  description: "Clothing, visual identity and emotionally driven design.",
  centerNodeId: "emotecture-center",
  nodes: emotectureNodes,
  edges: connectFromCenter("emotecture-center", emotectureNodes),
  layout: "radial",
  parentGraphId: "projects",
  parentNodeId: "projects-emotecture",
};

const klinepilotNodes = [
  {
    id: "klinepilot-center",
    slug: "klinepilot",
    title: "Klinepilot",
    descriptor: "Digital product and software concept",
    kind: "project",
    icon: "code-2",
    status: "early-stage product development",
    featured: true,
    childCount: 8,
    meta: { category: "Digital product and software concept", layoutWeight: 1.3 },
    detail: detail(
      "Klinepilot",
      "Klinepilot is an early-stage digital product being developed through user research, feature planning, interface concepts and AI-assisted implementation.",
      {
        eyebrow: "Digital product and software concept",
        status: "early-stage product development",
        actions: [portfolioActions.klinepilotLive],
      },
    ),
  },
  {
    id: "klinepilot-user-problem",
    slug: "user-problem",
    title: "User Problem",
    descriptor: "Research is shaping the problem definition",
    kind: "detail",
    icon: "search",
    status: "in development",
    detail: detail(
      "User Problem",
      "The user problem is being investigated and refined through early research. No validated market claim is made yet.",
      { status: "in development" },
    ),
  },
  {
    id: "klinepilot-product-concept",
    slug: "product-concept",
    title: "Product Concept",
    descriptor: "An early-stage software concept",
    kind: "detail",
    icon: "lightbulb",
    status: "concept",
    detail: detail(
      "Product Concept",
      "An early-stage digital product concept that is still being defined and tested.",
      { status: "concept" },
    ),
  },
  {
    id: "klinepilot-core-features",
    slug: "core-features",
    title: "Core Features",
    descriptor: "Feature priorities are being planned",
    kind: "detail",
    icon: "list-checks",
    status: "planned",
    detail: detail(
      "Core Features",
      "Core features are being prioritised. Specific capabilities will be published after the product direction is validated.",
      { status: "planned" },
    ),
  },
  {
    id: "klinepilot-ux-research",
    slug: "ux-research",
    title: "UX Research",
    descriptor: "User research and problem framing",
    kind: "detail",
    icon: "users-round",
    status: "in development",
    detail: detail(
      "UX Research",
      "Early research is being used to clarify user needs, assumptions and product direction.",
      { status: "in development" },
    ),
  },
  {
    id: "klinepilot-interface-work",
    slug: "interface-work",
    title: "Interface Work",
    descriptor: "Interface concepts and prototypes",
    kind: "gallery",
    icon: "monitor-smartphone",
    status: "prototype",
    detail: detail(
      "Interface Work",
      "Early interface concepts and prototypes will be documented here as the product develops.",
      {
        status: "prototype",
        images: gallery("klinepilot", "interface", 3),
      },
    ),
  },
  {
    id: "klinepilot-technical-development",
    slug: "technical-development",
    title: "Technical Development",
    descriptor: "AI-assisted implementation experiments",
    kind: "detail",
    icon: "code-2",
    status: "in development",
    detail: detail(
      "Technical Development",
      "Technical exploration and AI-assisted implementation are in progress. This is not presented as a finished product.",
      { status: "in development" },
    ),
  },
  {
    id: "klinepilot-roadmap",
    slug: "roadmap",
    title: "Roadmap",
    descriptor: "Research, prototype, test and refine",
    kind: "detail",
    icon: "route",
    status: "planned",
    detail: detail(
      "Roadmap",
      "The current direction is to continue research, define a focused prototype, test assumptions and refine the product plan.",
      { status: "planned" },
    ),
  },
  {
    id: "klinepilot-repository",
    slug: "repository",
    title: "Repository",
    descriptor: "Private while the project is in development",
    kind: "detail",
    icon: "folder-git-2",
    detail: detail(
      "Repository",
      "The source repository remains private while Klinepilot is in development. The public app can be opened from the Klinepilot overview.",
      {
        status: "in development",
        actions: [portfolioActions.klinepilotLive],
      },
    ),
  },
] as const satisfies readonly PortfolioNode[];

const klinepilotGraph: GraphDefinition = {
  id: "klinepilot",
  slug: "klinepilot",
  title: "Klinepilot",
  description: "Early-stage product research, interface work and technical development.",
  centerNodeId: "klinepilot-center",
  nodes: klinepilotNodes,
  edges: connectFromCenter("klinepilot-center", klinepilotNodes),
  layout: "radial",
  parentGraphId: "projects",
  parentNodeId: "projects-klinepilot",
};

const creativeWorkItems = [
  {
    slug: "custom-clothing",
    title: "Custom Clothing",
    descriptor: "Wearable design experiments",
    icon: "shirt",
    proficiency: "practical",
  },
  {
    slug: "custom-shoes",
    title: "Custom Shoes",
    descriptor: "One-off footwear concepts",
    icon: "sparkles",
    proficiency: "practical",
  },
  {
    slug: "graphic-concepts",
    title: "Graphic Concepts",
    descriptor: "Experimental visual compositions",
    icon: "image",
    proficiency: "developing",
  },
  {
    slug: "branding",
    title: "Branding",
    descriptor: "Identity and visual direction concepts",
    icon: "palette",
    proficiency: "developing",
  },
  {
    slug: "photography",
    title: "Photography",
    descriptor: "Selected photographic work",
    icon: "camera",
    proficiency: "practical",
  },
  {
    slug: "visual-experiments",
    title: "Visual Experiments",
    descriptor: "Open-ended creative exploration",
    icon: "sparkles",
    proficiency: "developing",
  },
] as const satisfies readonly {
  slug: string;
  title: string;
  descriptor: string;
  icon: PortfolioIconKey;
  proficiency: Proficiency;
}[];

const creativeWorkNodes: readonly PortfolioNode[] = [
  {
    id: "creative-work-center",
    slug: "creative",
    title: "Creative Work",
    descriptor: "Clothing, graphics, branding and photography",
    kind: "project",
    icon: "palette",
    status: "experimental",
    featured: true,
    childCount: creativeWorkItems.length,
    detail: detail(
      "Creative Work",
      "A collection of creative practice across clothing, footwear, graphics, branding, photography and visual experiments.",
      { status: "experimental" },
    ),
  },
  ...creativeWorkItems.map((item): PortfolioNode => ({
    id: `creative-work-${item.slug}`,
    slug: item.slug,
    title: item.title,
    descriptor: item.descriptor,
    kind: "gallery",
    icon: item.icon,
    proficiency: item.proficiency,
    status: "experimental",
    detail: detail(
      item.title,
      `${item.descriptor}. This gallery is ready for Daniel's real project images.`,
      {
        status: "experimental",
        images: gallery("creative", item.slug, 3),
      },
    ),
  })),
];

const creativeWorkGraph: GraphDefinition = {
  id: "creative",
  slug: "creative",
  title: "Creative Work",
  description: "Creative practice and visual experiments.",
  centerNodeId: "creative-work-center",
  nodes: creativeWorkNodes,
  edges: connectFromCenter("creative-work-center", creativeWorkNodes),
  layout: "radial",
  parentGraphId: "projects",
  parentNodeId: "projects-creative",
};

const projectNodes = [
  {
    id: "projects-center",
    slug: "projects",
    title: "Selected Projects",
    descriptor: "Digital products, services and creative work",
    kind: "category",
    icon: "layers-3",
    featured: true,
    childCount: 4,
  },
  {
    id: "projects-growthstack",
    slug: "growthstack",
    title: "Growthstack",
    descriptor: "Website services and digital growth systems",
    kind: "project",
    icon: "trending-up",
    childGraphId: "growthstack",
    status: "active development",
    featured: true,
    childCount: 8,
    meta: { category: "Website services and digital growth systems", layoutWeight: 1.3 },
    detail: growthstackNodes[0].detail,
  },
  {
    id: "projects-emotecture",
    slug: "emotecture",
    title: "Emotecture Studio",
    descriptor: "Clothing, visual identity and creative e-commerce",
    kind: "project",
    icon: "shirt",
    childGraphId: "emotecture",
    status: "active development",
    featured: true,
    childCount: 8,
    meta: { category: "Clothing, visual identity and creative e-commerce", layoutWeight: 1.3 },
    detail: emotectureNodes[0].detail,
  },
  {
    id: "projects-klinepilot",
    slug: "klinepilot",
    title: "Klinepilot",
    descriptor: "Digital product and software concept",
    kind: "project",
    icon: "code-2",
    childGraphId: "klinepilot",
    status: "early-stage product development",
    featured: true,
    childCount: 8,
    meta: { category: "Digital product and software concept", layoutWeight: 1.3 },
    detail: klinepilotNodes[0].detail,
  },
  {
    id: "projects-creative",
    slug: "creative",
    title: "Creative Work",
    descriptor: "Clothing, graphics, branding and photography",
    kind: "project",
    icon: "palette",
    childGraphId: "creative",
    status: "experimental",
    childCount: creativeWorkItems.length,
    meta: { category: "Creative practice", layoutWeight: 1.2 },
    detail: creativeWorkNodes[0].detail,
  },
] as const satisfies readonly PortfolioNode[];

const projectsGraph: GraphDefinition = {
  id: "projects",
  slug: "projects",
  title: "Selected Projects",
  description:
    "Independent digital, product and creative projects at honest stages of development.",
  centerNodeId: "projects-center",
  nodes: projectNodes,
  edges: connectFromCenter("projects-center", projectNodes, "featured"),
  layout: "radial",
  parentGraphId: "root",
  parentNodeId: "root-projects",
};

interface SkillDraft {
  slug: string;
  title: string;
  descriptor: string;
  proficiency: Proficiency;
}

interface SkillClusterDraft {
  id: string;
  slug: string;
  title: string;
  descriptor: string;
  icon: PortfolioIconKey;
  items: readonly SkillDraft[];
}

const skillClusters = [
  {
    id: "skills-customer-commercial",
    slug: "customer-commercial",
    title: "Customer and Commercial",
    descriptor: "Customer understanding, sales support and communication",
    icon: "heart-handshake",
    items: [
      {
        slug: "customer-service",
        title: "Customer Service",
        descriptor: "Customer-focused help in fast-paced environments",
        proficiency: "strong",
      },
      {
        slug: "sales-support",
        title: "Sales Support",
        descriptor: "Supporting product choice and purchase decisions",
        proficiency: "practical",
      },
      {
        slug: "product-communication",
        title: "Product Communication",
        descriptor: "Explaining products clearly and usefully",
        proficiency: "practical",
      },
      {
        slug: "customer-needs-analysis",
        title: "Customer Needs Analysis",
        descriptor: "Listening and matching needs to practical options",
        proficiency: "practical",
      },
      {
        slug: "e-commerce-support",
        title: "E-commerce Support",
        descriptor: "Developing online customer and order support skills",
        proficiency: "developing",
      },
      {
        slug: "written-communication",
        title: "Written Communication",
        descriptor: "Clear, practical communication across tasks",
        proficiency: "practical",
      },
    ],
  },
  {
    id: "skills-operations",
    slug: "operations",
    title: "Operations",
    descriptor: "Reliable execution, coordination and process awareness",
    icon: "settings-2",
    items: [
      {
        slug: "task-coordination",
        title: "Task Coordination",
        descriptor: "Organising practical work and priorities",
        proficiency: "practical",
      },
      {
        slug: "process-adherence",
        title: "Process Adherence",
        descriptor: "Following detailed procedures reliably",
        proficiency: "strong",
      },
      {
        slug: "order-task-follow-up",
        title: "Order and Task Follow-up",
        descriptor: "Tracking requests and next actions",
        proficiency: "practical",
      },
      {
        slug: "problem-solving",
        title: "Problem-solving",
        descriptor: "Resolving practical issues under pressure",
        proficiency: "practical",
      },
      {
        slug: "time-management",
        title: "Time Management",
        descriptor: "Meeting expectations in busy environments",
        proficiency: "strong",
      },
      {
        slug: "quality-awareness",
        title: "Quality Awareness",
        descriptor: "Maintaining standards during repeated tasks",
        proficiency: "strong",
      },
      {
        slug: "cross-cultural-teamwork",
        title: "Cross-cultural Teamwork",
        descriptor: "Cooperating in international teams",
        proficiency: "strong",
      },
    ],
  },
  {
    id: "skills-digital",
    slug: "digital",
    title: "Digital",
    descriptor: "Web projects, content and everyday business tools",
    icon: "monitor-smartphone",
    items: [
      {
        slug: "website-project-coordination",
        title: "Website Project Coordination",
        descriptor: "Structuring and moving website work forward",
        proficiency: "developing",
      },
      {
        slug: "digital-content",
        title: "Digital Content",
        descriptor: "Creating and organising practical digital content",
        proficiency: "practical",
      },
      {
        slug: "google-workspace",
        title: "Google Workspace",
        descriptor: "Everyday documents, spreadsheets and collaboration",
        proficiency: "working knowledge",
      },
      {
        slug: "microsoft-office",
        title: "Microsoft Office",
        descriptor: "Everyday productivity and document work",
        proficiency: "working knowledge",
      },
      {
        slug: "canva",
        title: "Canva",
        descriptor: "Fast visual content and presentation work",
        proficiency: "practical",
      },
      {
        slug: "github",
        title: "GitHub",
        descriptor: "Repository-based project work and collaboration",
        proficiency: "developing",
      },
      {
        slug: "basic-analytics",
        title: "Basic Analytics",
        descriptor: "Foundational digital measurement concepts",
        proficiency: "foundational",
      },
    ],
  },
  {
    id: "skills-ai-workflow",
    slug: "ai-workflow",
    title: "AI and Workflow",
    descriptor: "Research, structured prompting and process support",
    icon: "bot",
    items: [
      {
        slug: "ai-assisted-research",
        title: "AI-assisted Research",
        descriptor: "Using AI to accelerate structured exploration",
        proficiency: "developing",
      },
      {
        slug: "prompt-design",
        title: "Prompt Design",
        descriptor: "Giving systems clear context and constraints",
        proficiency: "developing",
      },
      {
        slug: "workflow-structuring",
        title: "Workflow Structuring",
        descriptor: "Breaking work into repeatable steps",
        proficiency: "developing",
      },
      {
        slug: "output-evaluation",
        title: "Output Evaluation",
        descriptor: "Reviewing AI output for usefulness and accuracy",
        proficiency: "developing",
      },
      {
        slug: "agent-assisted-development",
        title: "Agent-assisted Development",
        descriptor: "Early practical work with coding agents",
        proficiency: "foundational",
      },
      {
        slug: "process-documentation",
        title: "Process Documentation",
        descriptor: "Recording decisions, steps and expected results",
        proficiency: "practical",
      },
    ],
  },
  {
    id: "skills-creative",
    slug: "creative-skills",
    title: "Creative",
    descriptor: "Brand, clothing, imagery and visual direction",
    icon: "palette",
    items: [
      {
        slug: "brand-concepts",
        title: "Brand Concepts",
        descriptor: "Developing coherent creative directions",
        proficiency: "practical",
      },
      {
        slug: "clothing-design",
        title: "Clothing Design",
        descriptor: "Exploring garments through custom work and concepts",
        proficiency: "practical",
      },
      {
        slug: "visual-identity",
        title: "Visual Identity",
        descriptor: "Developing consistent graphic languages",
        proficiency: "developing",
      },
      {
        slug: "photography",
        title: "Photography",
        descriptor: "Practical image-making and composition",
        proficiency: "practical",
      },
      {
        slug: "creative-direction",
        title: "Creative Direction",
        descriptor: "Shaping an overall visual concept",
        proficiency: "developing",
      },
      {
        slug: "product-mockups",
        title: "Product Mockups",
        descriptor: "Visualising product and clothing ideas",
        proficiency: "practical",
      },
    ],
  },
] as const satisfies readonly SkillClusterDraft[];

const createSkillGraph = (cluster: SkillClusterDraft): GraphDefinition => {
  const centerNodeId = `${cluster.id}-center`;
  const nodes: readonly PortfolioNode[] = [
    {
      id: centerNodeId,
      slug: cluster.slug,
      title: cluster.title,
      descriptor: cluster.descriptor,
      kind: "skill-cluster",
      icon: cluster.icon,
      featured: true,
      childCount: cluster.items.length,
    },
    ...cluster.items.map((skill): PortfolioNode => ({
      id: `${cluster.id}-${skill.slug}`,
      slug: skill.slug,
      title: skill.title,
      descriptor: skill.descriptor,
      kind: "skill",
      icon: cluster.icon,
      proficiency: skill.proficiency,
      meta: { category: cluster.title },
      detail: detail(skill.title, skill.descriptor, {
        eyebrow: cluster.title,
        sections: [
          {
            id: `${cluster.id}-${skill.slug}-proficiency`,
            title: "Proficiency",
            body: skill.proficiency,
          },
        ],
        tags: [skill.proficiency],
      }),
    })),
  ];

  return {
    id: cluster.id,
    slug: cluster.slug,
    title: cluster.title,
    description: cluster.descriptor,
    centerNodeId,
    nodes,
    edges: connectFromCenter(centerNodeId, nodes),
    layout: "radial",
    parentGraphId: "skills",
    parentNodeId: cluster.id,
  };
};

const skillGraphs = Object.fromEntries(
  skillClusters.map((cluster) => [cluster.id, createSkillGraph(cluster)]),
) as Record<string, GraphDefinition>;

const skillNodes: readonly PortfolioNode[] = [
  {
    id: "skills-center",
    slug: "skills",
    title: "Skills and Tools",
    descriptor: "Practical strengths and developing capabilities",
    kind: "category",
    icon: "tool-case",
    featured: true,
    childCount: skillClusters.length,
  },
  ...skillClusters.map((cluster): PortfolioNode => ({
    id: cluster.id,
    slug: cluster.slug,
    title: cluster.title,
    descriptor: cluster.descriptor,
    kind: "skill-cluster",
    icon: cluster.icon,
    childGraphId: cluster.id,
    childCount: cluster.items.length,
    meta: { countLabel: `${cluster.items.length} skills`, layoutWeight: 1.15 },
  })),
];

const skillsGraph: GraphDefinition = {
  id: "skills",
  slug: "skills",
  title: "Skills and Tools",
  description: "Evidence-based capabilities with honest proficiency labels.",
  centerNodeId: "skills-center",
  nodes: skillNodes,
  edges: connectFromCenter("skills-center", skillNodes),
  layout: "radial",
  parentGraphId: "root",
  parentNodeId: "root-skills",
};

interface CredentialCategoryDraft {
  id: string;
  slug: string;
  title: string;
  icon: PortfolioIconKey;
}

const credentialCategories = [
  { id: "certifications-openai", slug: "openai", title: "OpenAI", icon: "bot" },
  {
    id: "certifications-anthropic",
    slug: "anthropic",
    title: "Anthropic",
    icon: "sparkles",
  },
  { id: "certifications-google", slug: "google", title: "Google", icon: "globe-2" },
  {
    id: "certifications-hubspot",
    slug: "hubspot",
    title: "HubSpot",
    icon: "trending-up",
  },
  { id: "certifications-ibm", slug: "ibm", title: "IBM", icon: "building-2" },
  {
    id: "certifications-microsoft",
    slug: "microsoft",
    title: "Microsoft",
    icon: "monitor-smartphone",
  },
  { id: "certifications-github", slug: "github", title: "GitHub", icon: "github" },
  {
    id: "certifications-salesforce",
    slug: "salesforce",
    title: "Salesforce",
    icon: "cloud",
  },
  {
    id: "certifications-atlassian",
    slug: "atlassian",
    title: "Atlassian",
    icon: "workflow",
  },
  {
    id: "certifications-freecodecamp",
    slug: "freecodecamp",
    title: "FreeCodeCamp",
    icon: "code-2",
  },
] as const satisfies readonly CredentialCategoryDraft[];

const credentialStatusIcon = (status: Credential["status"]): PortfolioIconKey => {
  if (status === "earned") return "badge-check";
  if (status === "in progress") return "activity";
  return "circle-dashed";
};

const credentialNode = (credential: Credential): PortfolioNode => ({
  id: `credential-${credential.id}`,
  slug: credential.id.replace(`${credential.issuer.toLowerCase()}-`, ""),
  title: credential.title,
  descriptor: `${credential.verificationType} · ${credential.status}`,
  kind: "credential",
  icon: credentialStatusIcon(credential.status),
  status: credential.status,
  featured: credential.featured,
  meta: {
    issuer: credential.issuer,
    verificationType: credential.verificationType,
    layoutWeight: credential.title.length > 34 ? 1.3 : 1,
  },
  detail: {
    title: credential.title,
    subtitle: credential.issuer,
    eyebrow: credential.verificationType,
    description: credential.description,
    status: credential.status,
    dates: credential.issueDate ?? undefined,
    tags: credential.skills,
    images: credential.certificateImage ? [credential.certificateImage] : undefined,
    actions: credential.credentialUrl
      ? [
          {
            id: `verify-${credential.id}`,
            label: "Verify credential",
            kind: "external",
            icon: "badge-check",
            value: credential.credentialUrl,
            href: credential.credentialUrl,
            availability: "available",
            external: true,
            analyticsEvent: "credential_viewed",
            ariaLabel: `Verify ${credential.title} in a new tab`,
          },
        ]
      : undefined,
    credential,
  },
});

const createCredentialGraph = (category: CredentialCategoryDraft): GraphDefinition => {
  const categoryCredentials = credentials.filter(
    (credential) => credential.issuer === category.title,
  );
  const centerNodeId = `${category.id}-center`;
  const nodes: readonly PortfolioNode[] = [
    {
      id: centerNodeId,
      slug: category.slug,
      title: category.title,
      descriptor:
        categoryCredentials.length > 0
          ? `${categoryCredentials.length} planned learning ${categoryCredentials.length === 1 ? "item" : "items"}`
          : "No credentials listed yet",
      kind: "credential-category",
      icon: category.icon,
      featured: true,
      childCount: categoryCredentials.length,
      meta: {
        issuer: category.title,
        countLabel: `${categoryCredentials.length} credentials`,
      },
    },
    ...categoryCredentials.map(credentialNode),
  ];

  return {
    id: category.id,
    slug: category.slug,
    title: category.title,
    description: `${category.title} certifications and learning plans.`,
    centerNodeId,
    nodes,
    edges: connectFromCenter(centerNodeId, nodes),
    layout: "radial",
    parentGraphId: "certifications",
    parentNodeId: category.id,
    emptyState:
      categoryCredentials.length === 0
        ? {
            title: `No ${category.title} credentials listed yet`,
            description:
              "This category is ready for future credentials. Nothing here is represented as earned or in progress.",
          }
        : undefined,
  };
};

const credentialGraphs = Object.fromEntries(
  credentialCategories.map((category) => [category.id, createCredentialGraph(category)]),
) as Record<string, GraphDefinition>;

const certificationNodes: readonly PortfolioNode[] = [
  {
    id: "certifications-center",
    slug: "certifications",
    title: "Certifications and Learning",
    descriptor: "A transparent view of earned, active and planned learning",
    kind: "category",
    icon: "award",
    featured: true,
    childCount: credentialCategories.length,
  },
  ...credentialCategories.map((category): PortfolioNode => {
    const count = credentials.filter((credential) => credential.issuer === category.title).length;
    return {
      id: category.id,
      slug: category.slug,
      title: category.title,
      descriptor: count > 0 ? `${count} planned` : "No entries yet",
      kind: "credential-category",
      icon: category.icon,
      childGraphId: category.id,
      childCount: count,
      meta: {
        issuer: category.title,
        countLabel: count > 0 ? `${count} planned` : "Empty category",
      },
    };
  }),
];

const certificationsGraph: GraphDefinition = {
  id: "certifications",
  slug: "certifications",
  title: "Certifications and Learning",
  description:
    "Credentials are labelled by their real status. Planned learning is never presented as completed.",
  centerNodeId: "certifications-center",
  nodes: certificationNodes,
  edges: connectFromCenter("certifications-center", certificationNodes),
  layout: "radial",
  parentGraphId: "root",
  parentNodeId: "root-certifications",
};

export const portfolioIdentity = {
  name: "Daniel Laky",
  descriptor: "Customer Support, Operations, Digital Projects and Business Development",
  location: "Senec, Slovakia",
  status: "Open to remote opportunities",
  profileImage: placeholderImage(
    "daniel-laky-profile",
    "/images/profile/daniel-laky.jpg",
    "Portrait of Daniel Laky",
    "DL",
  ),
} as const;

export const portfolioMetadata = {
  title: "Daniel Laky | Customer Support, Operations and Digital Projects",
  description:
    "Portfolio of Daniel Laky, a Slovakia-based professional focused on customer support, operations, sales support, e-commerce, digital projects and AI-assisted workflows.",
  siteName: "Daniel Laky Portfolio",
  locale: "en_SK",
  canonicalUrl: null,
  socialImage: {
    id: "daniel-laky-social",
    src: "/og.png",
    alt: "Daniel Laky interactive professional portfolio mind map",
    placeholderLabel: "Daniel Laky portfolio social image",
    availability: "available",
    width: 1200,
    height: 630,
  },
} as const;

const rootNodes = [
  {
    id: "root-daniel",
    slug: "daniel-laky",
    title: "Daniel Laky",
    descriptor: "Customer Support, Operations, Digital Projects and Business Development",
    kind: "profile",
    icon: "user-round",
    featured: true,
    childCount: 7,
    meta: { location: "Senec, Slovakia", layoutWeight: 1.65 },
    detail: detail(
      "Daniel Laky",
      "Customer Support, Operations, Digital Projects and Business Development",
      {
        subtitle: "Open to remote opportunities",
        location: "Senec, Slovakia",
        images: [portfolioIdentity.profileImage],
        actions: [portfolioActions.linkedin, portfolioActions.cv],
      },
    ),
  },
  {
    id: "root-about",
    slug: "about",
    title: "About",
    descriptor: "Profile, working style and direction",
    kind: "category",
    icon: "user-round",
    childGraphId: "about",
    childCount: 6,
    meta: { countLabel: "6 topics" },
  },
  {
    id: "root-experience",
    slug: "experience",
    title: "Experience",
    descriptor: "Retail and international production",
    kind: "category",
    icon: "briefcase-business",
    childGraphId: "experience",
    childCount: 2,
    meta: { countLabel: "2 roles" },
  },
  {
    id: "root-projects",
    slug: "projects",
    title: "Projects",
    descriptor: "Digital, product and creative work",
    kind: "category",
    icon: "layers-3",
    childGraphId: "projects",
    childCount: 4,
    featured: true,
    meta: { countLabel: "4 projects", layoutWeight: 1.15 },
  },
  {
    id: "root-skills",
    slug: "skills",
    title: "Skills",
    descriptor: "Practical capabilities and developing tools",
    kind: "category",
    icon: "tool-case",
    childGraphId: "skills",
    childCount: 5,
    meta: { countLabel: "5 clusters" },
  },
  {
    id: "root-certifications",
    slug: "certifications",
    title: "Certifications",
    descriptor: "Credentials and transparent learning plans",
    kind: "category",
    icon: "award",
    childGraphId: "certifications",
    childCount: 10,
    meta: { countLabel: "10 issuers" },
  },
  {
    id: "root-education",
    slug: "education",
    title: "Education",
    descriptor: "Business, economics and hospitality",
    kind: "category",
    icon: "graduation-cap",
    childGraphId: "education",
    childCount: 2,
    meta: { countLabel: "2 programmes" },
  },
  {
    id: "root-contact",
    slug: "contact",
    title: "Contact",
    descriptor: "Connect, download the CV and view preferences",
    kind: "category",
    icon: "contact",
    childGraphId: "contact",
    childCount: 6,
    meta: { countLabel: "6 options" },
  },
] as const satisfies readonly PortfolioNode[];

const rootGraph: GraphDefinition = {
  id: "root",
  slug: "root",
  title: "Daniel Laky",
  description: "An interactive map of Daniel's experience, skills, projects and direction.",
  centerNodeId: "root-daniel",
  nodes: rootNodes,
  edges: connectFromCenter("root-daniel", rootNodes, "featured"),
  layout: "radial",
};

export const rootGraphId = "root" as const;

export const graphs: Readonly<Record<string, GraphDefinition>> = {
  root: rootGraph,
  about: aboutGraph,
  experience: experienceGraph,
  projects: projectsGraph,
  growthstack: growthstackGraph,
  emotecture: emotectureGraph,
  klinepilot: klinepilotGraph,
  creative: creativeWorkGraph,
  skills: skillsGraph,
  ...skillGraphs,
  certifications: certificationsGraph,
  ...credentialGraphs,
  education: educationGraph,
  contact: contactGraph,
};

export const portfolioData = {
  rootGraphId,
  identity: portfolioIdentity,
  metadata: portfolioMetadata,
  actions: portfolioActions,
  credentials,
  graphs,
} as const satisfies PortfolioSiteData;

export default portfolioData;
