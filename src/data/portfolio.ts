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
    label: "Recruitment email",
    kind: "email",
    icon: "mail",
    value: "daniellaky.uni@gmail.com",
    href: "mailto:daniellaky.uni@gmail.com?subject=Remote%20opportunity%20for%20Daniel%20Laky",
    availability: "available",
    analyticsEvent: "email_clicked",
    ariaLabel: "Email Daniel Laky about a job opportunity",
  },
  businessEmail: {
    id: "business-email",
    label: "Project enquiries",
    kind: "email",
    icon: "handshake",
    value: "r.creation.st@gmail.com",
    href: "mailto:r.creation.st@gmail.com?subject=Project%20enquiry%20for%20Daniel%20Laky",
    availability: "available",
    analyticsEvent: "email_clicked",
    ariaLabel: "Email Daniel Laky about freelance work or a project enquiry",
  },
  phone: {
    id: "phone",
    label: "Phone",
    kind: "phone",
    icon: "phone",
    value: "+421 949 093 583",
    href: "tel:+421949093583",
    availability: "available",
    analyticsEvent: "contact_action",
    analyticsContext: "phone",
    ariaLabel: "Call Daniel Laky at plus 421 949 093 583",
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
    label: "Download CV — English",
    kind: "download",
    icon: "file-down",
    value: "Daniel_Laky_Remote_Roles_CV.pdf",
    href: "/documents/Daniel_Laky_Remote_Roles_CV.pdf",
    availability: "asset-dependent",
    download: "Daniel_Laky_Remote_Roles_CV.pdf",
    analyticsEvent: "cv_downloaded",
    ariaLabel: "Download Daniel Laky's English CV as a PDF",
  },
  cvSlovak: {
    id: "cv-slovak",
    label: "Stiahnuť CV — Slovensky",
    kind: "download",
    icon: "file-down",
    value: "Daniel_Laky_CV_Slovak.pdf",
    href: "/documents/Daniel_Laky_CV_Slovak.pdf",
    availability: "asset-dependent",
    download: "Daniel_Laky_CV_Slovak.pdf",
    analyticsEvent: "cv_downloaded",
    ariaLabel: "Stiahnuť slovenské CV Daniela Lakyho vo formáte PDF",
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
    analyticsEvent: "project_link_clicked",
    analyticsContext: "klinepilot",
    analyticsDestination: "live_site",
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
    analyticsEvent: "project_link_clicked",
    analyticsContext: "klinepilot",
    analyticsDestination: "repository",
    ariaLabel: "Klinepilot repository link not yet configured",
  },
} as const satisfies Record<string, PortfolioAction>;

type CredentialDraft = Pick<
  Credential,
  "id" | "title" | "issuer" | "category" | "verificationType" | "description" | "skills"
>;

const plannedCredential = (draft: CredentialDraft): Credential => ({
  ...draft,
  issueDate: null,
  expirationDate: null,
  credentialId: null,
  credentialUrl: null,
  certificateUrl: null,
  certificateName: null,
  certificateImage: null,
  status: "planned",
  featured: false,
});

export const credentials: readonly Credential[] = [
  {
    id: "openai-ai-foundations",
    title: "AI Foundations",
    issuer: "OpenAI Academy",
    category: "OpenAI",
    issueDate: "2026-08-08",
    expirationDate: null,
    credentialId: "ee4dbt13hc",
    credentialUrl: "https://academy.openai.com/public/certificate/ee4dbt13hc",
    certificateUrl: "/documents/certificates/openai-ai-foundations-ee4dbt13hc.pdf",
    certificateName: "Dano Laky",
    certificateImage: null,
    status: "earned",
    verificationType: "Course Completion Certificate",
    description:
      "Completed OpenAI Academy learning covering foundational concepts for responsible and practical AI use.",
    skills: ["AI foundations", "responsible AI use", "practical AI use"],
    featured: true,
  },
  {
    id: "openai-applied-ai-foundations",
    title: "Applied AI Foundations",
    issuer: "OpenAI Academy",
    category: "OpenAI",
    issueDate: "2026-08-08",
    expirationDate: null,
    credentialId: "0ib8lgjtrv",
    credentialUrl: "https://academy.openai.com/public/certificate/0ib8lgjtrv",
    certificateUrl: "/documents/certificates/openai-applied-ai-foundations-0ib8lgjtrv.pdf",
    certificateName: "Dano Laky",
    certificateImage: null,
    status: "earned",
    verificationType: "Course Completion Certificate",
    description:
      "Completed OpenAI Academy learning focused on applying AI concepts to practical tasks and workflows.",
    skills: ["applied AI", "task decomposition", "structured AI-assisted work"],
    featured: true,
  },
  {
    id: "openai-agents-and-workflows",
    title: "Agents and Workflows",
    issuer: "OpenAI Academy",
    category: "OpenAI",
    issueDate: "2026-08-08",
    expirationDate: null,
    credentialId: "77ariorgbi",
    credentialUrl: "https://academy.openai.com/public/certificate/77ariorgbi",
    certificateUrl: "/documents/certificates/openai-agents-and-workflows-77ariorgbi.pdf",
    certificateName: "Dano Laky",
    certificateImage: null,
    status: "earned",
    verificationType: "Course Completion Certificate",
    description:
      "Completed OpenAI Academy learning on agent and workflow concepts for structured AI-assisted processes.",
    skills: ["AI agents", "workflow design", "task decomposition"],
    featured: true,
  },
  plannedCredential({
    id: "anthropic-claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    category: "Anthropic",
    verificationType: "Course Completion",
    description: "Planned introductory Claude learning; not yet completed.",
    skills: ["Claude"],
  }),
  plannedCredential({
    id: "anthropic-ai-fluency-framework-and-foundations",
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    category: "Anthropic",
    verificationType: "Course Completion",
    description: "Planned AI fluency learning; not yet completed.",
    skills: ["AI fluency"],
  }),
  plannedCredential({
    id: "anthropic-claude-code-in-action",
    title: "Claude Code in Action",
    issuer: "Anthropic",
    category: "Anthropic",
    verificationType: "Course Completion",
    description: "Planned Claude Code learning; not yet completed.",
    skills: ["Claude Code", "agent-assisted development"],
  }),
  plannedCredential({
    id: "google-analytics-certification",
    title: "Google Analytics Certification",
    issuer: "Google",
    category: "Google",
    verificationType: "Vendor Certification",
    description: "Planned Google Analytics certification; not yet completed.",
    skills: ["Google Analytics", "measurement"],
  }),
  plannedCredential({
    id: "google-ads-search-certification",
    title: "Google Ads Search Certification",
    issuer: "Google",
    category: "Google",
    verificationType: "Vendor Certification",
    description: "Planned Google Ads Search certification; not yet completed.",
    skills: ["Google Ads", "search advertising"],
  }),
  {
    id: "google-ai-powered-shopping-ads-certification",
    title: "AI-Powered Shopping ads Certification",
    issuer: "Skillshop / Google",
    category: "Google",
    issueDate: "2026-08-09",
    expirationDate: "2027-08-09",
    credentialId: "191040496",
    credentialUrl: "https://www.credential.net/d7037419-917a-4d37-93c6-cc8e809fb597",
    certificateUrl: "/documents/certificates/google-ai-powered-shopping-ads-191040496.pdf",
    certificateName: "Daniel Laky",
    certificateImage: {
      id: "google-ai-powered-shopping-ads-badge",
      src: "/documents/certificates/google-ai-powered-shopping-ads-badge.png",
      alt: "Official Shopping Ads Certified badge from Skillshop",
      placeholderLabel: "Shopping Ads Certified badge",
      availability: "available",
      width: 400,
      height: 400,
    },
    status: "earned",
    verificationType: "Vendor Certification",
    description:
      "Google Skillshop certification supporting knowledge of Shopping ads fundamentals, Merchant Center and product feeds, Shopping policies, campaign selection, Performance Max for Retail, and optimization principles. It does not represent claimed client campaign results.",
    skills: [
      "Shopping ads",
      "Merchant Center concepts",
      "product feeds",
      "Shopping Ads policies",
      "Performance Max for Retail concepts",
      "campaign optimization principles",
    ],
    featured: true,
  },
  plannedCredential({
    id: "hubspot-digital-marketing-certification",
    title: "Digital Marketing Certification",
    issuer: "HubSpot",
    category: "HubSpot",
    verificationType: "Vendor Certification",
    description: "Planned digital marketing certification; not yet completed.",
    skills: ["digital marketing"],
  }),
  plannedCredential({
    id: "hubspot-inbound-sales-certification",
    title: "Inbound Sales Certification",
    issuer: "HubSpot",
    category: "HubSpot",
    verificationType: "Vendor Certification",
    description: "Planned inbound sales certification; not yet completed.",
    skills: ["inbound sales", "sales support"],
  }),
  plannedCredential({
    id: "hubspot-revenue-operations-certification",
    title: "Revenue Operations Certification",
    issuer: "HubSpot",
    category: "HubSpot",
    verificationType: "Vendor Certification",
    description: "Planned revenue operations certification; not yet completed.",
    skills: ["revenue operations"],
  }),
  plannedCredential({
    id: "ibm-project-management-fundamentals",
    title: "Project Management Fundamentals",
    issuer: "IBM",
    category: "IBM",
    verificationType: "Learning Badge",
    description: "Planned project management learning; not yet completed.",
    skills: ["project management"],
  }),
  plannedCredential({
    id: "ibm-data-fundamentals",
    title: "Data Fundamentals",
    issuer: "IBM",
    category: "IBM",
    verificationType: "Learning Badge",
    description: "Planned data fundamentals learning; not yet completed.",
    skills: ["data fundamentals", "analytics"],
  }),
  plannedCredential({
    id: "microsoft-create-and-manage-automated-processes-with-power-automate",
    title: "Create and manage automated processes by using Power Automate",
    issuer: "Microsoft Applied Skills",
    category: "Microsoft Applied Skills",
    verificationType: "Applied Skills Credential",
    description: "Planned Microsoft Applied Skills credential; not yet completed.",
    skills: ["Power Automate", "process automation"],
  }),
  plannedCredential({
    id: "microsoft-streamline-business-workflows-with-ai-chat",
    title: "Streamline business workflows with AI chat",
    issuer: "Microsoft Applied Skills",
    category: "Microsoft Applied Skills",
    verificationType: "Applied Skills Credential",
    description: "Planned Microsoft Applied Skills credential; not yet completed.",
    skills: ["AI chat", "business workflows"],
  }),
  plannedCredential({
    id: "microsoft-generate-reports-with-ai-research-agents",
    title: "Generate reports with AI research agents",
    issuer: "Microsoft Applied Skills",
    category: "Microsoft Applied Skills",
    verificationType: "Applied Skills Credential",
    description: "Planned Microsoft Applied Skills credential; not yet completed.",
    skills: ["AI research", "reporting"],
  }),
  plannedCredential({
    id: "github-foundations-certification",
    title: "GitHub Foundations Certification",
    issuer: "GitHub",
    category: "GitHub",
    verificationType: "GitHub Certification",
    description: "Planned GitHub Foundations certification; not yet completed.",
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
    descriptor: "Business-minded, practical and evidence-led",
    kind: "detail",
    icon: "file-text",
    detail: detail(
      "Professional Summary",
      "Business/economics-minded builder combining customer-facing and operational experience with practical AI, web, marketing and analytics capability. I use verified learning to build working systems, document decisions and improve from evidence. I am currently focused on stronger remote career options and developing credible small-business web and AI services without overstating client experience.",
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
    descriptor: "Stronger remote work and credible web/AI services",
    kind: "detail",
    icon: "compass",
    detail: detail(
      "Career Direction",
      "Build stable, flexible income through stronger remote career options and credible web and AI service capability, using practical execution, measurement and visible projects to turn learning into commercial value.",
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
    descriptor: "Career momentum, web/AI services and visible proof",
    kind: "detail",
    icon: "focus",
    detail: detail("Current Focus", "The highest-priority work and learning areas now.", {
      sections: [
        {
          id: "current-focus-list",
          items: [
            "remote career and income improvement",
            "Growthstack and professional small-business web/AI services",
            "applying completed OpenAI learning in working systems",
            "marketing, analytics and Shopping Ads knowledge",
            "visible project proof and documented implementation",
            "repeatable service delivery and business workflows",
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
    childCount: 7,
    detail: detail(
      "Contact Daniel",
      "Daniel is open to suitable remote opportunities based in Slovakia.",
      {
        actions: [portfolioActions.email, portfolioActions.businessEmail, portfolioActions.phone],
      },
    ),
  },
  {
    id: "contact-email",
    slug: "email",
    title: "Email",
    descriptor: "Recruitment and project enquiries",
    kind: "contact",
    icon: "mail",
    detail: detail(
      "Email Daniel",
      "Choose the address that matches your enquiry. Recruitment messages and project enquiries are kept separate.",
      { actions: [portfolioActions.email, portfolioActions.businessEmail] },
    ),
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
    descriptor: "Code, products and project repositories",
    kind: "contact",
    icon: "github",
    action: portfolioActions.github,
    detail: detail("GitHub", "Explore Daniel's code, products and project repositories.", {
      actions: [portfolioActions.github],
    }),
  },
  {
    id: "contact-cv",
    slug: "download-cv",
    title: "Download CV — English",
    descriptor: "Current professional CV · PDF",
    kind: "contact",
    icon: "file-down",
    action: portfolioActions.cv,
    detail: detail(
      "Download CV — English",
      "Download Daniel's English CV for remote customer support, operations and digital roles.",
      { actions: [portfolioActions.cv] },
    ),
  },
  {
    id: "contact-cv-slovak",
    slug: "download-cv-slovak",
    title: "Stiahnuť CV — Slovensky",
    descriptor: "Slovenský profesijný životopis · PDF",
    kind: "contact",
    icon: "file-down",
    action: portfolioActions.cvSlovak,
    detail: detail(
      "Stiahnuť CV — Slovensky",
      "Stiahnite si slovenský životopis Daniela pre pracovné príležitosti.",
      { actions: [portfolioActions.cvSlovak] },
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
              "analytics and conversion-measurement setup",
              "SEO and Search Console foundations",
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
              "scope, access and ownership planning",
              "information and copy structure",
              "design and development",
              "review and mobile optimisation",
              "domain, DNS, hosting and deployment preparation",
              "forms, email routing, analytics and SEO checks",
              "handoff, maintenance and support planning",
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
    detail: detail(
      "Tools",
      "Tools and delivery areas currently used, learned or evaluated while developing Growthstack; this is not presented as completed client work.",
      {
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
              "deployment and hosting tools",
              "design tools",
              "analytics and Search Console foundations",
            ],
          },
        ],
      },
    ),
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
      "An e-commerce approach is planned, with product, fulfilment and launch decisions still to be validated. If a real catalogue and store launch, measurement would be configured before any advertising claims are made.",
      {
        status: "planned",
        sections: [
          {
            id: "emotecture-ecommerce-measurement",
            title: "Future implementation path",
            items: [
              "GA4 and consent-aware event measurement",
              "Google Tag Manager where technically appropriate",
              "Search Console and technical SEO",
              "Merchant Center and product-feed preparation",
              "Shopping Ads and Performance Max for Retail only after the store is ready",
            ],
          },
        ],
      },
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
    proficiency: "project-demonstrated",
  },
  {
    slug: "branding",
    title: "Branding",
    descriptor: "Identity and visual direction concepts",
    icon: "palette",
    proficiency: "project-demonstrated",
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
    proficiency: "project-demonstrated",
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
    title: "Customer and Sales",
    descriptor: "Customer understanding, sales support and clear communication",
    icon: "heart-handshake",
    items: [
      {
        slug: "customer-service",
        title: "Customer Service",
        descriptor: "Customer-focused help in fast-paced environments",
        proficiency: "applied",
      },
      {
        slug: "sales-support",
        title: "Sales Support",
        descriptor: "Supporting product choice and purchase decisions",
        proficiency: "applied",
      },
      {
        slug: "product-communication",
        title: "Product Communication",
        descriptor: "Explaining products clearly and usefully",
        proficiency: "applied",
      },
      {
        slug: "customer-needs-analysis",
        title: "Customer Needs Analysis",
        descriptor: "Listening and matching needs to practical options",
        proficiency: "practical",
      },
      {
        slug: "client-communication",
        title: "Client Communication",
        descriptor: "Clear discovery, expectation-setting and follow-up",
        proficiency: "practical",
      },
      {
        slug: "inbound-sales",
        title: "Inbound Sales",
        descriptor: "Planned learning in discovery and buyer-focused sales",
        proficiency: "learning",
      },
    ],
  },
  {
    id: "skills-operations",
    slug: "operations",
    title: "Operations and Management",
    descriptor: "Reliable execution, coordination and structured delivery",
    icon: "settings-2",
    items: [
      {
        slug: "task-coordination",
        title: "Task Coordination",
        descriptor: "Organising practical work and priorities",
        proficiency: "applied",
      },
      {
        slug: "process-adherence",
        title: "Process Adherence",
        descriptor: "Following detailed procedures reliably",
        proficiency: "applied",
      },
      {
        slug: "problem-solving",
        title: "Problem-solving",
        descriptor: "Resolving practical issues under pressure",
        proficiency: "applied",
      },
      {
        slug: "time-management",
        title: "Time Management",
        descriptor: "Meeting expectations in busy environments",
        proficiency: "applied",
      },
      {
        slug: "quality-awareness",
        title: "Quality Awareness",
        descriptor: "Maintaining standards during repeated tasks",
        proficiency: "applied",
      },
      {
        slug: "cross-cultural-teamwork",
        title: "Cross-cultural Teamwork",
        descriptor: "Cooperating in international teams",
        proficiency: "applied",
      },
      {
        slug: "project-management",
        title: "Project Management",
        descriptor: "Structured execution with formal learning planned",
        proficiency: "learning",
      },
    ],
  },
  {
    id: "skills-digital",
    slug: "web-technical",
    title: "Web and Technical",
    descriptor: "Web delivery, repositories, deployment and ownership fundamentals",
    icon: "monitor-smartphone",
    items: [
      {
        slug: "website-project-coordination",
        title: "Website Project Coordination",
        descriptor: "Structuring and moving website work forward",
        proficiency: "project-demonstrated",
      },
      {
        slug: "web-development",
        title: "Web Development",
        descriptor: "Building responsive web interfaces and static deployments",
        proficiency: "project-demonstrated",
      },
      {
        slug: "git-github",
        title: "Git and GitHub",
        descriptor: "Repository-based development and version control",
        proficiency: "project-demonstrated",
      },
      {
        slug: "deployment-hosting",
        title: "Deployment and Hosting",
        descriptor: "Static deployment, build workflows and hosting fundamentals",
        proficiency: "project-demonstrated",
      },
      {
        slug: "domains-dns-ownership",
        title: "Domains, DNS and Ownership",
        descriptor: "Practical understanding of access, ownership and handoff requirements",
        proficiency: "practical",
      },
      {
        slug: "seo-foundations",
        title: "SEO Foundations",
        descriptor: "Metadata, crawlability, structured data and Search Console preparation",
        proficiency: "project-demonstrated",
      },
      {
        slug: "maintenance-handoff",
        title: "Maintenance and Handoff",
        descriptor: "Planning access, backups, support and client ownership",
        proficiency: "learning",
      },
    ],
  },
  {
    id: "skills-ai-workflow",
    slug: "ai-workflow",
    title: "AI and Workflows",
    descriptor: "Credential-backed foundations with practical application",
    icon: "bot",
    items: [
      {
        slug: "ai-foundations",
        title: "AI Foundations",
        descriptor: "Responsible and practical foundational AI concepts",
        proficiency: "credential-backed",
      },
      {
        slug: "applied-ai-use",
        title: "Applied AI Use",
        descriptor: "Applying AI concepts to useful tasks and processes",
        proficiency: "credential-backed",
      },
      {
        slug: "agents-workflows",
        title: "AI Agents and Workflows",
        descriptor: "Agent and workflow concepts for structured processes",
        proficiency: "credential-backed",
      },
      {
        slug: "task-decomposition",
        title: "Task Decomposition",
        descriptor: "Breaking complex work into clear, checkable steps",
        proficiency: "credential-backed",
      },
      {
        slug: "agent-assisted-development",
        title: "Agent-assisted Development",
        descriptor: "Using coding agents within reviewed development workflows",
        proficiency: "project-demonstrated",
      },
      {
        slug: "output-evaluation",
        title: "Output Evaluation",
        descriptor: "Reviewing AI output for usefulness, accuracy and evidence",
        proficiency: "practical",
      },
      {
        slug: "process-documentation",
        title: "Process Documentation",
        descriptor: "Recording decisions, steps and expected results",
        proficiency: "project-demonstrated",
      },
      {
        slug: "claude",
        title: "Anthropic / Claude",
        descriptor: "Focused Claude and AI-fluency learning is planned",
        proficiency: "learning",
      },
    ],
  },
  {
    id: "skills-marketing-analytics",
    slug: "marketing-analytics",
    title: "Marketing and Analytics",
    descriptor: "Credential-backed Shopping knowledge and developing measurement skills",
    icon: "chart-no-axes-combined",
    items: [
      {
        slug: "shopping-ads",
        title: "Google Shopping Ads",
        descriptor: "Shopping campaign fundamentals and policy concepts",
        proficiency: "credential-backed",
      },
      {
        slug: "merchant-center-product-feeds",
        title: "Merchant Center and Product Feeds",
        descriptor: "Credential-backed concepts awaiting real implementation",
        proficiency: "credential-backed",
      },
      {
        slug: "performance-max-retail",
        title: "Performance Max for Retail",
        descriptor: "Credential-backed campaign and optimization concepts",
        proficiency: "credential-backed",
      },
      {
        slug: "google-analytics",
        title: "Google Analytics",
        descriptor: "Planned certification and real-site measurement practice",
        proficiency: "learning",
      },
      {
        slug: "conversion-tracking",
        title: "Conversion Tracking",
        descriptor: "Developing event design and consent-aware measurement capability",
        proficiency: "learning",
      },
      {
        slug: "digital-marketing",
        title: "Digital Marketing",
        descriptor: "Planned structured learning applied to real projects",
        proficiency: "learning",
      },
      {
        slug: "paid-acquisition",
        title: "Paid Acquisition Concepts",
        descriptor: "Campaign-selection knowledge without claimed client results",
        proficiency: "learning",
      },
    ],
  },
  {
    id: "skills-business",
    slug: "business",
    title: "Business and Commercial",
    descriptor: "Economics orientation, commercial thinking and service delivery",
    icon: "briefcase-business",
    items: [
      {
        slug: "business-economics",
        title: "Business and Economics",
        descriptor: "Academic foundation supported by current studies",
        proficiency: "learning",
      },
      {
        slug: "commercial-thinking",
        title: "Commercial Thinking",
        descriptor: "Connecting customer needs, delivery and business purpose",
        proficiency: "applied",
      },
      {
        slug: "service-delivery",
        title: "Service Delivery",
        descriptor: "Structuring scope, delivery, handoff and support",
        proficiency: "practical",
      },
      {
        slug: "entrepreneurship",
        title: "Entrepreneurship",
        descriptor: "Developing independent projects and service concepts",
        proficiency: "practical",
      },
      {
        slug: "revenue-operations",
        title: "Revenue Operations",
        descriptor: "Planned learning in connected sales and operational workflows",
        proficiency: "learning",
      },
      {
        slug: "workflow-automation",
        title: "Business Workflow Automation",
        descriptor: "Planned applied learning with Power Automate and AI",
        proficiency: "learning",
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
        proficiency: "project-demonstrated",
      },
      {
        slug: "clothing-design",
        title: "Clothing Design",
        descriptor: "Exploring garments through custom work and concepts",
        proficiency: "project-demonstrated",
      },
      {
        slug: "visual-identity",
        title: "Visual Identity",
        descriptor: "Developing consistent graphic languages",
        proficiency: "project-demonstrated",
      },
      {
        slug: "photography",
        title: "Photography",
        descriptor: "Practical image-making and composition",
        proficiency: "applied",
      },
      {
        slug: "creative-direction",
        title: "Creative Direction",
        descriptor: "Shaping an overall visual concept",
        proficiency: "practical",
      },
      {
        slug: "product-mockups",
        title: "Product Mockups",
        descriptor: "Visualising product and clothing ideas",
        proficiency: "project-demonstrated",
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
  description:
    "Capabilities are labelled by evidence: credential-backed, applied, practical, learning or project-demonstrated.",
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
  { id: "certifications-google", slug: "google", title: "Google", icon: "globe-2" },
  {
    id: "certifications-anthropic",
    slug: "anthropic",
    title: "Anthropic",
    icon: "sparkles",
  },
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
    title: "Microsoft Applied Skills",
    icon: "monitor-smartphone",
  },
  { id: "certifications-github", slug: "github", title: "GitHub", icon: "github" },
] as const satisfies readonly CredentialCategoryDraft[];

const credentialStatusIcon = (status: Credential["status"]): PortfolioIconKey => {
  if (status === "earned") return "badge-check";
  if (status === "in progress") return "activity";
  return "circle-dashed";
};

const credentialNode = (credential: Credential): PortfolioNode => ({
  id: `credential-${credential.id}`,
  slug: credential.id,
  title: credential.title,
  descriptor: `${credential.verificationType} · ${credential.status === "earned" ? "completed" : credential.status}`,
  kind: "credential",
  icon: credentialStatusIcon(credential.status),
  status: credential.status,
  featured: credential.featured,
  meta: {
    issuer: credential.issuer,
    verificationType: credential.verificationType,
    layoutWeight: credential.featured ? 1.45 : credential.title.length > 34 ? 1.3 : 1,
  },
  detail:
    credential.status === "earned"
      ? {
          title: credential.title,
          subtitle: credential.issuer,
          eyebrow: credential.verificationType,
          description: credential.description,
          status: credential.status,
          dates: credential.issueDate ?? undefined,
          tags: credential.skills,
          images: credential.certificateImage ? [credential.certificateImage] : undefined,
          actions: [
            ...(credential.certificateUrl
              ? [
                  {
                    id: `certificate-${credential.id}`,
                    label: "View certificate",
                    kind: "external" as const,
                    icon: "file-text" as const,
                    value: credential.certificateUrl,
                    href: credential.certificateUrl,
                    availability: "available" as const,
                    external: true,
                    analyticsEvent: "credential_verification_clicked" as const,
                    analyticsContext: credential.id,
                    analyticsDestination: "certificate" as const,
                    ariaLabel: `View ${credential.title} certificate PDF in a new tab`,
                  },
                ]
              : []),
            ...(credential.credentialUrl
              ? [
                  {
                    id: `verify-${credential.id}`,
                    label: "Verify credential",
                    kind: "external" as const,
                    icon: "badge-check" as const,
                    value: credential.credentialUrl,
                    href: credential.credentialUrl,
                    availability: "available" as const,
                    external: true,
                    analyticsEvent: "credential_verification_clicked" as const,
                    analyticsContext: credential.id,
                    analyticsDestination: "verification" as const,
                    ariaLabel: `Verify ${credential.title} in a new tab`,
                  },
                ]
              : []),
          ],
          credential,
        }
      : undefined,
});

const createCredentialGraph = (category: CredentialCategoryDraft): GraphDefinition => {
  const categoryCredentials = credentials
    .filter((credential) => credential.category === category.title)
    .slice()
    .sort((left, right) => {
      if (left.status === right.status) return left.title.localeCompare(right.title);
      return left.status === "earned" ? -1 : 1;
    });
  const completedCount = categoryCredentials.filter(
    (credential) => credential.status === "earned",
  ).length;
  const plannedCount = categoryCredentials.filter(
    (credential) => credential.status === "planned",
  ).length;
  const centerNodeId = `${category.id}-center`;
  const nodes: readonly PortfolioNode[] = [
    {
      id: centerNodeId,
      slug: category.slug,
      title: category.title,
      descriptor: `${completedCount} completed · ${plannedCount} planned`,
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
    description:
      "Completed credentials are verified where public evidence exists. Planned learning remains clearly separate and non-interactive.",
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
    descriptor: "4 completed · 14 planned core credentials",
    kind: "category",
    icon: "award",
    featured: true,
    childCount: credentialCategories.length,
  },
  ...credentialCategories.map((category): PortfolioNode => {
    const categoryCredentials = credentials.filter(
      (credential) => credential.category === category.title,
    );
    const completedCount = categoryCredentials.filter(
      (credential) => credential.status === "earned",
    ).length;
    const plannedCount = categoryCredentials.filter(
      (credential) => credential.status === "planned",
    ).length;
    const count = categoryCredentials.length;
    return {
      id: category.id,
      slug: category.slug,
      title: category.title,
      descriptor: `${completedCount} completed · ${plannedCount} planned`,
      kind: "credential-category",
      icon: category.icon,
      childGraphId: category.id,
      childCount: count,
      featured: completedCount > 0,
      meta: {
        issuer: category.title,
        countLabel: `${count} credentials`,
        layoutWeight: completedCount > 0 ? 1.25 : 1,
      },
    };
  }),
];

const certificationsGraph: GraphDefinition = {
  id: "certifications",
  slug: "certifications",
  title: "Certifications and Learning",
  description:
    "Four completed credentials support the current capability story. Fourteen focused credentials remain planned and are not presented as completed.",
  centerNodeId: "certifications-center",
  nodes: certificationNodes,
  edges: connectFromCenter("certifications-center", certificationNodes),
  layout: "radial",
  parentGraphId: "root",
  parentNodeId: "root-certifications",
};

export const portfolioIdentity = {
  name: "Daniel Laky",
  descriptor: "Business & Economics-Minded Builder · AI, Web, Marketing and Operations",
  location: "Senec, Slovakia",
  status: "Open to remote roles and practical web/AI work",
  profileImage: placeholderImage(
    "daniel-laky-profile",
    "/images/profile/daniel-laky.jpg",
    "Portrait of Daniel Laky",
    "DL",
  ),
} as const;

export const portfolioMetadata = {
  title: "Daniel Laky | Business, AI, Web and Digital Projects",
  description:
    "Portfolio of Daniel Laky, a Slovakia-based business and economics-minded builder developing practical capability across AI, web technology, marketing, analytics, sales and automation.",
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
    descriptor: "Business & Economics-Minded Builder · AI, Web, Marketing and Operations",
    kind: "profile",
    icon: "user-round",
    featured: true,
    childCount: 7,
    meta: { location: "Senec, Slovakia", layoutWeight: 1.65 },
    detail: detail(
      "Daniel Laky",
      "Business & Economics-Minded Builder · AI, Web, Marketing and Operations",
      {
        subtitle: "Open to remote roles and practical web/AI work",
        location: "Senec, Slovakia",
        images: [portfolioIdentity.profileImage],
        actions: [
          portfolioActions.linkedin,
          portfolioActions.cv,
          portfolioActions.cvSlovak,
          portfolioActions.email,
        ],
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
    descriptor: "Evidence-oriented capabilities across business, AI and web",
    kind: "category",
    icon: "tool-case",
    childGraphId: "skills",
    childCount: skillClusters.length,
    meta: { countLabel: `${skillClusters.length} clusters` },
  },
  {
    id: "root-certifications",
    slug: "certifications",
    title: "Certifications",
    descriptor: "4 completed · 14 planned core credentials",
    kind: "category",
    icon: "award",
    childGraphId: "certifications",
    childCount: credentialCategories.length,
    meta: { countLabel: `${credentialCategories.length} issuers` },
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
    childCount: 7,
    meta: { countLabel: "7 options" },
  },
] as const satisfies readonly PortfolioNode[];

const rootGraph: GraphDefinition = {
  id: "root",
  slug: "root",
  title: "Daniel Laky",
  description:
    "An interactive map connecting verified learning, practical capability and working projects.",
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
