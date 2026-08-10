import type {
  PortfolioAction,
  PortfolioDetail,
  PortfolioDetailSection,
  PortfolioImage,
  PortfolioItemStatus,
  PortfolioNode,
  PortfolioNodeKind,
  PortfolioSiteData,
  Proficiency,
  VerificationType,
} from "@/types/portfolio";

export const portfolioLocales = ["en", "sk"] as const;
export type PortfolioLocale = (typeof portfolioLocales)[number];

export const defaultPortfolioLocale: PortfolioLocale = "en";

export function isPortfolioLocale(value: unknown): value is PortfolioLocale {
  return typeof value === "string" && portfolioLocales.includes(value as PortfolioLocale);
}

export function resolvePortfolioLocale(value: unknown): PortfolioLocale {
  return isPortfolioLocale(value) ? value : defaultPortfolioLocale;
}

type ShortcutCopy = readonly [keys: string, description: string];

export interface PortfolioUiCopy {
  languageName: string;
  languageSwitcherLabel: string;
  switchToEnglish: string;
  switchToSlovak: string;
  shell: {
    skipToTextPortfolio: string;
    rootMapLabel: string;
    professionalIdentityMap: string;
    canvasInstructions: string;
    connectedItem: string;
    connectedItems: string;
    currentMapAnnouncement: string;
  };
  controls: {
    label: string;
    mobileLabel: string;
    back: string;
    home: string;
    showMap: string;
    showList: string;
    keyboardHelp: string;
    englishCv: string;
    englishCvMissing: string;
    englishCvMissingTitle: string;
    slovakCv: string;
    slovakCvMissing: string;
    slovakCvMissingTitle: string;
  };
  breadcrumbs: {
    label: string;
  };
  canvas: {
    interactiveMapLabel: (graphTitle: string) => string;
  };
  node: {
    currentMap: string;
    item: string;
    items: string;
    download: string;
    open: string;
    inactiveCredential: (title: string, status: string) => string;
    openMap: (title: string, count: number) => string;
    runAction: (verb: string, title: string) => string;
    viewDetails: (title: string) => string;
    kind: Readonly<Record<PortfolioNodeKind, string>>;
  };
  list: {
    label: (graphTitle: string) => string;
    eyebrow: (layout: string) => string;
    workInProgress: string;
    unavailableCredential: (title: string, status: string) => string;
    verifiedAfterCompletion: string;
    openMap: string;
    openDetails: string;
    noEntries: string;
    detailsWhenAvailable: string;
  };
  detail: {
    close: string;
    statusAndDates: string;
    overview: string;
    fallbackDescription: string;
    credentialInformation: string;
    issuer: string;
    status: string;
    issued: string;
    expires: string;
    credentialId: string;
    certificateName: string;
    viewCertificate: string;
    verifyCredential: string;
    plannedNotice: string;
    verificationUnavailable: string;
    skillsAndThemes: string;
    gallery: string;
    actions: string;
    unavailable: string;
    unavailableTitle: string;
    opensNewTab: string;
  };
  help: {
    eyebrow: string;
    title: string;
    close: string;
    shortcutsTitle: string;
    shortcuts: readonly ShortcutCopy[];
    motionTitle: string;
    motionDescription: string;
  };
  linkedinProfile: string;
  loading: string;
  status: Readonly<Record<PortfolioItemStatus, string>>;
  proficiency: Readonly<Record<Proficiency, string>>;
}

const kindCopyEn: Readonly<Record<PortfolioNodeKind, string>> = {
  profile: "profile",
  category: "category",
  project: "project",
  "skill-cluster": "skill cluster",
  skill: "skill",
  "credential-category": "credential category",
  credential: "credential",
  timeline: "timeline",
  contact: "contact",
  detail: "detail",
  gallery: "gallery",
};

const kindCopySk: Readonly<Record<PortfolioNodeKind, string>> = {
  profile: "profil",
  category: "kategória",
  project: "projekt",
  "skill-cluster": "oblasť zručností",
  skill: "zručnosť",
  "credential-category": "kategória osvedčení",
  credential: "osvedčenie",
  timeline: "časová os",
  contact: "kontakt",
  detail: "detail",
  gallery: "galéria",
};

export const portfolioUiCopy: Readonly<Record<PortfolioLocale, PortfolioUiCopy>> = {
  en: {
    languageName: "English",
    languageSwitcherLabel: "Portfolio language",
    switchToEnglish: "Switch portfolio language to English",
    switchToSlovak: "Switch portfolio language to Slovak",
    shell: {
      skipToTextPortfolio: "Skip to text portfolio",
      rootMapLabel: "Return to Daniel Laky's root map",
      professionalIdentityMap: "Professional identity map",
      canvasInstructions: "Drag to pan · Select a node to move deeper · View fits automatically",
      connectedItem: "connected item",
      connectedItems: "connected items",
      currentMapAnnouncement: "Current portfolio map",
    },
    controls: {
      label: "Portfolio controls",
      mobileLabel: "Mobile portfolio navigation",
      back: "Go back one portfolio level",
      home: "Return to portfolio root",
      showMap: "Show interactive map",
      showList: "Show accessible list view",
      keyboardHelp: "Open keyboard help",
      englishCv: "Download CV — English",
      englishCvMissing: "Daniel Laky's English CV is not yet available",
      englishCvMissingTitle: "English CV file not yet added",
      slovakCv: "Download CV — Slovak",
      slovakCvMissing: "Daniel Laky's Slovak CV is not yet available",
      slovakCvMissingTitle: "Slovak CV file not yet added",
    },
    breadcrumbs: { label: "Portfolio path" },
    canvas: {
      interactiveMapLabel: (graphTitle) =>
        `${graphTitle} interactive mind map. Use Tab to move between nodes.`,
    },
    node: {
      currentMap: "Current map",
      item: "item",
      items: "items",
      download: "Download",
      open: "Open",
      inactiveCredential: (title, status) =>
        `${title}, ${status}. Details will be available after completion.`,
      openMap: (title, count) =>
        `Open ${title} map${count ? `, ${count} ${count === 1 ? "item" : "items"}` : ""}`,
      runAction: (verb, title) => `${verb} ${title}`,
      viewDetails: (title) => `View details for ${title}`,
      kind: kindCopyEn,
    },
    list: {
      label: (graphTitle) => `${graphTitle} accessible list view`,
      eyebrow: (layout) => `Text portfolio · ${layout} map`,
      workInProgress: "Work in progress",
      unavailableCredential: (title, status) =>
        `${title}, ${status}. Details will be available after completion.`,
      verifiedAfterCompletion: "Verified details will be added after this credential is completed.",
      openMap: "Open map",
      openDetails: "Open details",
      noEntries: "No entries yet",
      detailsWhenAvailable: "Details will be added as they become available.",
    },
    detail: {
      close: "Close details",
      statusAndDates: "Item status and dates",
      overview: "Overview",
      fallbackDescription: "Additional details will be added as this work develops.",
      credentialInformation: "Credential information",
      issuer: "Issuer",
      status: "Status",
      issued: "Issued",
      expires: "Expires",
      credentialId: "Credential ID",
      certificateName: "Name on certificate",
      viewCertificate: "View certificate",
      verifyCredential: "Verify credential",
      plannedNotice: "This is planned learning and is not presented as a completed credential.",
      verificationUnavailable: "Verification will appear when a credential URL is available.",
      skillsAndThemes: "Skills and themes",
      gallery: "Gallery",
      actions: "Actions",
      unavailable: "unavailable",
      unavailableTitle: "This detail has not been configured yet",
      opensNewTab: "opens in a new tab",
    },
    help: {
      eyebrow: "Navigation guide",
      title: "Keyboard help",
      close: "Close keyboard help",
      shortcutsTitle: "Shortcuts",
      shortcuts: [
        ["Tab", "Move between portfolio nodes and controls"],
        ["Enter or Space", "Open the focused node"],
        ["Escape", "Close details or move back one portfolio level"],
        ["Home", "Return to Daniel's root map"],
      ],
      motionTitle: "Motion preference",
      motionDescription:
        "Reduced-motion preferences are respected automatically. When active, map changes use short fades without large viewport movement.",
    },
    linkedinProfile: "LinkedIn profile",
    loading: "Mapping Daniel's portfolio",
    status: {
      earned: "Completed",
      "in progress": "In progress",
      planned: "Planned",
      "active development": "Active development",
      "early-stage product development": "Early-stage development",
      "in development": "In development",
      prototype: "Prototype",
      concept: "Concept",
      experimental: "Experimental",
      current: "Current",
      completed: "Completed",
      studies: "Studies",
    },
    proficiency: {
      "credential-backed": "Credential-backed",
      applied: "Applied",
      practical: "Practical",
      learning: "Learning",
      "project-demonstrated": "Project-demonstrated",
    },
  },
  sk: {
    languageName: "Slovenčina",
    languageSwitcherLabel: "Jazyk portfólia",
    switchToEnglish: "Prepnúť jazyk portfólia do angličtiny",
    switchToSlovak: "Prepnúť jazyk portfólia do slovenčiny",
    shell: {
      skipToTextPortfolio: "Prejsť na textové portfólio",
      rootMapLabel: "Vrátiť sa na hlavnú mapu Daniela Lakyho",
      professionalIdentityMap: "Mapa profesionálneho profilu",
      canvasInstructions:
        "Potiahnutím posúvajte mapu · Výberom uzla prejdete hlbšie · Zobrazenie sa prispôsobí automaticky",
      connectedItem: "prepojená položka",
      connectedItems: "prepojených položiek",
      currentMapAnnouncement: "Aktuálna mapa portfólia",
    },
    controls: {
      label: "Ovládanie portfólia",
      mobileLabel: "Mobilná navigácia portfólia",
      back: "Vrátiť sa o jednu úroveň portfólia",
      home: "Vrátiť sa na hlavnú mapu portfólia",
      showMap: "Zobraziť interaktívnu mapu",
      showList: "Zobraziť prístupný zoznam",
      keyboardHelp: "Otvoriť pomoc ku klávesnici",
      englishCv: "Stiahnuť CV — anglicky",
      englishCvMissing: "Anglické CV Daniela Lakyho zatiaľ nie je dostupné",
      englishCvMissingTitle: "Súbor anglického CV zatiaľ nebol pridaný",
      slovakCv: "Stiahnuť CV — slovensky",
      slovakCvMissing: "Slovenské CV Daniela Lakyho zatiaľ nie je dostupné",
      slovakCvMissingTitle: "Súbor slovenského CV zatiaľ nebol pridaný",
    },
    breadcrumbs: { label: "Cesta portfóliom" },
    canvas: {
      interactiveMapLabel: (graphTitle) =>
        `Interaktívna myšlienková mapa: ${graphTitle}. Medzi uzlami sa presúvajte klávesom Tab.`,
    },
    node: {
      currentMap: "Aktuálna mapa",
      item: "položka",
      items: "položiek",
      download: "Stiahnuť",
      open: "Otvoriť",
      inactiveCredential: (title, status) =>
        `${title}, ${status}. Podrobnosti budú dostupné po dokončení.`,
      openMap: (title, count) =>
        `Otvoriť mapu ${title}${count ? `, počet položiek: ${count}` : ""}`,
      runAction: (verb, title) => `${verb}: ${title}`,
      viewDetails: (title) => `Zobraziť podrobnosti: ${title}`,
      kind: kindCopySk,
    },
    list: {
      label: (graphTitle) => `Prístupný zoznam: ${graphTitle}`,
      eyebrow: (layout) =>
        `Textové portfólio · mapa typu ${layout === "radial" ? "radiálna" : "časová os"}`,
      workInProgress: "Rozpracované",
      unavailableCredential: (title, status) =>
        `${title}, ${status}. Podrobnosti budú dostupné po dokončení.`,
      verifiedAfterCompletion: "Overené podrobnosti budú pridané po dokončení osvedčenia.",
      openMap: "Otvoriť mapu",
      openDetails: "Otvoriť podrobnosti",
      noEntries: "Zatiaľ bez položiek",
      detailsWhenAvailable: "Podrobnosti budú doplnené, keď budú dostupné.",
    },
    detail: {
      close: "Zavrieť podrobnosti",
      statusAndDates: "Stav a dátumy položky",
      overview: "Prehľad",
      fallbackDescription: "Ďalšie podrobnosti budú pridané počas rozvoja tejto práce.",
      credentialInformation: "Informácie o osvedčení",
      issuer: "Vydavateľ",
      status: "Stav",
      issued: "Vydané",
      expires: "Platnosť do",
      credentialId: "ID osvedčenia",
      certificateName: "Meno na osvedčení",
      viewCertificate: "Zobraziť osvedčenie",
      verifyCredential: "Overiť osvedčenie",
      plannedNotice: "Ide o plánované vzdelávanie, nie o dokončené osvedčenie.",
      verificationUnavailable: "Overenie sa zobrazí po pridaní odkazu na osvedčenie.",
      skillsAndThemes: "Zručnosti a témy",
      gallery: "Galéria",
      actions: "Akcie",
      unavailable: "nedostupné",
      unavailableTitle: "Tento detail zatiaľ nie je nastavený",
      opensNewTab: "otvorí sa na novej karte",
    },
    help: {
      eyebrow: "Sprievodca navigáciou",
      title: "Ovládanie klávesnicou",
      close: "Zavrieť pomoc ku klávesnici",
      shortcutsTitle: "Klávesové skratky",
      shortcuts: [
        ["Tab", "Presun medzi uzlami portfólia a ovládacími prvkami"],
        ["Enter alebo medzerník", "Otvorenie vybraného uzla"],
        ["Escape", "Zavretie detailu alebo návrat o jednu úroveň portfólia"],
        ["Home", "Návrat na hlavnú mapu Daniela"],
      ],
      motionTitle: "Nastavenie pohybu",
      motionDescription:
        "Nastavenie obmedzenia pohybu sa rešpektuje automaticky. Pri jeho zapnutí sa zmeny mapy zobrazia krátkym prelínaním bez výrazného pohybu zobrazenia.",
    },
    linkedinProfile: "Profil na LinkedIn",
    loading: "Pripravuje sa Danielovo portfólio",
    status: {
      earned: "Dokončené",
      "in progress": "Prebieha",
      planned: "Plánované",
      "active development": "Aktívny vývoj",
      "early-stage product development": "Počiatočný vývoj produktu",
      "in development": "Vo vývoji",
      prototype: "Prototyp",
      concept: "Koncept",
      experimental: "Experimentálne",
      current: "Súčasnosť",
      completed: "Dokončené",
      studies: "Štúdium",
    },
    proficiency: {
      "credential-backed": "Podložené osvedčením",
      applied: "Aplikované",
      practical: "Praktické",
      learning: "Vo vzdelávaní",
      "project-demonstrated": "Preukázané projektom",
    },
  },
};

export function getPortfolioUiCopy(locale: PortfolioLocale): PortfolioUiCopy {
  return portfolioUiCopy[locale];
}

const slovakText: Readonly<Record<string, string>> = {
  // Profile, navigation, contact and education.
  "About Daniel": "O Danielovi",
  "Portrait of Daniel Laky": "Portrét Daniela Lakyho",
  "Daniel Laky interactive professional portfolio mind map":
    "Interaktívna myšlienková mapa profesionálneho portfólia Daniela Lakyho",
  "Daniel Laky portfolio social image": "Sociálny obrázok portfólia Daniela Lakyho",
  "Professional profile, working style and direction":
    "Profesionálny profil, pracovný štýl a smerovanie",
  "Professional Summary": "Profesionálne zhrnutie",
  "Working Style": "Pracovný štýl",
  Languages: "Jazyky",
  "Slovak, Czech and English": "Slovenčina, čeština a angličtina",
  "Career Direction": "Kariérne smerovanie",
  Strengths: "Silné stránky",
  "Current Focus": "Aktuálne zameranie",
  "Business-minded, practical and evidence-led":
    "Biznisovo orientovaný, praktický a vedený dôkazmi",
  "Business/economics-minded builder combining customer-facing and operational experience with practical AI, web, marketing and analytics capability. I use verified learning to build working systems, document decisions and improve from evidence. I am currently focused on stronger remote career options and developing credible small-business web and AI services without overstating client experience.":
    "Som tvorca orientovaný na biznis a ekonómiu. Skúsenosti so zákazníkmi a prevádzkou prepájam s praktickými schopnosťami v AI, webe, marketingu a analytike. Overené vzdelávanie používam na tvorbu funkčných systémov, dokumentovanie rozhodnutí a zlepšovanie podľa dôkazov. Aktuálne sa zameriavam na lepšie možnosti práce na diaľku a dôveryhodné webové a AI služby pre malé firmy bez zveličovania skúseností s klientmi.",
  "Stronger remote work and credible web/AI services":
    "Lepšia práca na diaľku a dôveryhodné webové/AI služby",
  "Build stable, flexible income through stronger remote career options and credible web and AI service capability, using practical execution, measurement and visible projects to turn learning into commercial value.":
    "Budovať stabilný a flexibilný príjem prostredníctvom lepších možností práce na diaľku a dôveryhodných webových a AI služieb. Praktickou realizáciou, meraním a viditeľnými projektmi premieňať vzdelávanie na komerčnú hodnotu.",
  "Career momentum, web/AI services and visible proof":
    "Kariérny posun, webové/AI služby a viditeľné dôkazy",
  "The highest-priority work and learning areas now.":
    "Aktuálne oblasti práce a vzdelávania s najvyššou prioritou.",
  "remote career and income improvement": "zlepšenie kariéry a príjmu na diaľku",
  "Growthstack and professional small-business web/AI services":
    "Growthstack a profesionálne webové/AI služby pre malé firmy",
  "applying completed OpenAI learning in working systems":
    "uplatňovanie dokončeného vzdelávania OpenAI vo funkčných systémoch",
  "marketing, analytics and Shopping Ads knowledge":
    "znalosti marketingu, analytiky a Shopping Ads",
  "visible project proof and documented implementation":
    "viditeľné projektové dôkazy a zdokumentovaná implementácia",
  "repeatable service delivery and business workflows":
    "opakovateľné poskytovanie služieb a firemné pracovné postupy",
  "Professional Experience": "Pracovné skúsenosti",
  "Customer-facing retail and international production":
    "Maloobchodný predaj so zákazníkmi a medzinárodná výroba",
  "Production Employee": "Pracovník vo výrobe",
  "Sales Assistant": "Asistent predaja",
  Responsibilities: "Zodpovednosti",
  "Skills demonstrated": "Preukázané zručnosti",
  Education: "Vzdelanie",
  "Business, economics, hospitality and service": "Biznis, ekonómia, hotelierstvo a služby",
  "Business and Economics Studies": "Štúdium biznisu a ekonómie",
  "Business and economics studies": "Štúdium biznisu a ekonómie",
  "Prague University of Economics and Business, VŠE": "Vysoká škola ekonomická v Prahe, VŠE",
  "Hotel Academy": "Hotelová akadémia",
  "Secondary Vocational School of Gastronomy and Hotel Services":
    "Stredná odborná škola gastronómie a hotelových služieb",
  "Relevant areas": "Relevantné oblasti",
  "Contact Daniel": "Kontaktovať Daniela",
  "Remote opportunities and professional connections": "Práca na diaľku a profesionálne kontakty",
  Email: "E-mail",
  "Recruitment and project enquiries": "Pracovné ponuky a projektové dopyty",
  "Professional profile": "Profesionálny profil",
  "Code, products and project repositories": "Kód, produkty a projektové repozitáre",
  "Download CV — English": "Stiahnuť CV — anglicky",
  "Current professional CV · PDF": "Aktuálne profesijné CV · PDF",
  "Stiahnuť CV — Slovensky": "Stiahnuť CV — slovensky",
  "Slovenský profesijný životopis · PDF": "Slovenský profesijný životopis · PDF",
  Location: "Poloha",
  "Work Preferences": "Pracovné preferencie",
  "Remote, Slovakia-based opportunities": "Práca na diaľku so zamestnaním na Slovensku",
  "Business & Economics-Minded Builder · AI, Web, Marketing and Operations":
    "Tvorca orientovaný na biznis a ekonómiu · AI, web, marketing a prevádzka",
  "Open to remote roles and practical web/AI work":
    "Otvorený práci na diaľku a praktickým webovým/AI projektom",
  "Daniel Laky | Business, AI, Web and Digital Projects":
    "Daniel Laky | Biznis, AI, web a digitálne projekty",
  "Portfolio of Daniel Laky, a Slovakia-based business and economics-minded builder developing practical capability across AI, web technology, marketing, analytics, sales and automation.":
    "Portfólio Daniela Lakyho, tvorcu zo Slovenska orientovaného na biznis a ekonómiu, ktorý rozvíja praktické schopnosti v AI, webových technológiách, marketingu, analytike, predaji a automatizácii.",
  "Evidence-oriented capabilities across business, AI and web":
    "Schopnosti podložené dôkazmi v biznise, AI a webe",
  "Profile, working style and direction": "Profil, pracovný štýl a smerovanie",
  "Retail and international production": "Maloobchod a medzinárodná výroba",
  "Digital, product and creative work": "Digitálna, produktová a tvorivá práca",
  "Business, economics and hospitality": "Biznis, ekonómia a hotelierstvo",
  "Connect, download the CV and view preferences": "Kontakt, stiahnutie CV a pracovné preferencie",
  "Independent, reliable and systems-oriented": "Samostatný, spoľahlivý a systémovo orientovaný",
  "A practical approach to learning, ownership and execution.":
    "Praktický prístup k vzdelávaniu, zodpovednosti a realizácii.",
  "Languages used across local and international environments.":
    "Jazyky používané v miestnom aj medzinárodnom prostredí.",
  "Reliable execution and cross-cultural communication":
    "Spoľahlivá realizácia a komunikácia naprieč kultúrami",
  "Strengths demonstrated through customer-facing work, international production and independent projects.":
    "Silné stránky preukázané prácou so zákazníkmi, v medzinárodnej výrobe a na nezávislých projektoch.",
  "A high-volume production role requiring dependable execution, quality awareness and cooperation in an international team.":
    "Práca vo vysokoobjemovej výrobe vyžadujúca spoľahlivú realizáciu, dôraz na kvalitu a spoluprácu v medzinárodnom tíme.",
  "A customer-facing retail role combining sales support, product communication and daily store operations.":
    "Maloobchodná práca so zákazníkmi prepájajúca podporu predaja, komunikáciu o produktoch a každodennú prevádzku predajne.",
  "Secondary vocational education focused on hospitality, service and practical operations.":
    "Stredoškolské odborné vzdelanie zamerané na hotelierstvo, služby a praktickú prevádzku.",
  "Email Daniel": "Napísať Danielovi",
  "Choose the address that matches your enquiry. Recruitment messages and project enquiries are kept separate.":
    "Vyberte adresu podľa typu dopytu. Pracovné ponuky a projektové dopyty sú oddelené.",
  "Connect with Daniel on LinkedIn.": "Spojte sa s Danielom na LinkedIn.",
  "Explore Daniel's code, products and project repositories.":
    "Pozrite si Danielov kód, produkty a projektové repozitáre.",
  "Download Daniel's English CV for remote customer support, operations and digital roles.":
    "Stiahnite si Danielovo anglické CV pre prácu na diaľku v zákazníckej podpore, prevádzke a digitálnych rolách.",
  "4 completed · 14 planned core credentials": "4 dokončené · 14 plánovaných kľúčových osvedčení",
  "An interactive map connecting verified learning, practical capability and working projects.":
    "Interaktívna mapa prepájajúca overené vzdelávanie, praktické schopnosti a funkčné projekty.",

  // Project maps. Official project names and technology names intentionally remain unchanged.
  "Selected Projects": "Vybrané projekty",
  "Digital products, services and creative work": "Digitálne produkty, služby a tvorivá práca",
  "Independent digital, product and creative projects at honest stages of development.":
    "Nezávislé digitálne, produktové a tvorivé projekty v pravdivo označených fázach vývoja.",
  "Growthstack is a developing service concept focused on professional websites, clear digital presentation and practical growth systems for small businesses.":
    "Growthstack je rozvíjaný koncept služieb zameraný na profesionálne weby, jasnú digitálnu prezentáciu a praktické systémy rastu pre malé firmy.",
  "Emotecture Studio explores clothing, visual identity and emotionally driven design through gothic, architectural and cybersigil-influenced concepts.":
    "Emotecture Studio skúma oblečenie, vizuálnu identitu a dizajn vedený emóciami prostredníctvom gotických, architektonických a cybersigil konceptov.",
  "Klinepilot is an early-stage digital product being developed through user research, feature planning, interface concepts and AI-assisted implementation.":
    "Klinepilot je digitálny produkt v počiatočnej fáze, ktorý sa rozvíja pomocou používateľského výskumu, plánovania funkcií, konceptov rozhrania a implementácie podporovanej AI.",
  "A collection of creative practice across clothing, footwear, graphics, branding, photography and visual experiments.":
    "Zbierka tvorivej praxe v oblasti oblečenia, obuvi, grafiky, brandingu, fotografie a vizuálnych experimentov.",
  "Website services and digital growth systems": "Webové služby a systémy digitálneho rastu",
  Problem: "Problém",
  "Outdated sites and unclear conversion paths": "Zastarané weby a nejasné konverzné cesty",
  "Many small service businesses have outdated websites, weak information structure and unclear conversion paths.":
    "Mnohé malé firmy poskytujúce služby majú zastarané weby, slabú informačnú štruktúru a nejasné konverzné cesty.",
  "Target Customers": "Cieľoví zákazníci",
  "Small service businesses": "Malé firmy poskytujúce služby",
  "Small service businesses that need a credible website and a clearer path from visitor to enquiry.":
    "Malé firmy poskytujúce služby, ktoré potrebujú dôveryhodný web a jasnejšiu cestu od návštevníka k dopytu.",
  Services: "Služby",
  "Potential Services": "Možné služby",
  "Potential website and launch support": "Možná podpora webu a spustenia",
  "The service offer is still being developed. Potential services include:":
    "Ponuka služieb sa stále rozvíja. Medzi možné služby patria:",
  Process: "Proces",
  "A practical delivery process in development": "Praktický proces realizácie vo vývoji",
  "A clear, repeatable website delivery process is being structured and tested.":
    "Jasný a opakovateľný proces realizácie webu sa štruktúruje a testuje.",
  "Working outline": "Pracovný návrh",
  Tools: "Nástroje",
  "Modern web, research and analytics tools": "Moderné webové, výskumné a analytické nástroje",
  "analytics and conversion-measurement setup": "nastavenie analytiky a merania konverzií",
  "SEO and Search Console foundations": "základy SEO a Search Console",
  "scope, access and ownership planning": "plánovanie rozsahu, prístupov a vlastníctva",
  "domain, DNS, hosting and deployment preparation": "príprava domény, DNS, hostingu a nasadenia",
  "forms, email routing, analytics and SEO checks":
    "kontrola formulárov, smerovania e-mailov, analytiky a SEO",
  "handoff, maintenance and support planning": "plánovanie odovzdania, údržby a podpory",
  "Tools and delivery areas currently used, learned or evaluated while developing Growthstack; this is not presented as completed client work.":
    "Nástroje a oblasti realizácie, ktoré sa pri vývoji Growthstacku aktuálne používajú, učia alebo vyhodnocujú. Nie sú prezentované ako dokončená práca pre klienta.",
  "deployment and hosting tools": "nástroje na nasadenie a hosting",
  "analytics and Search Console foundations": "základy analytiky a Search Console",
  Demonstrations: "Ukážky",
  "Demonstration work will be added here": "Ukážky práce budú doplnené",
  "Planned demonstration websites and interface examples will appear here as they are developed.":
    "Plánované ukážkové weby a príklady rozhraní sa tu zobrazia počas vývoja.",
  "Case Studies": "Prípadové štúdie",
  "No finished case studies claimed": "Bez tvrdení o dokončených prípadových štúdiách",
  "Case studies are planned. No customer results or completed client outcomes are claimed at this stage.":
    "Prípadové štúdie sú naplánované. V tejto fáze sa netvrdia žiadne výsledky zákazníkov ani dokončené výstupy pre klientov.",
  Status: "Stav",
  "Active development": "Aktívny vývoj",
  "Growthstack is in active development as a website services and digital growth systems concept.":
    "Growthstack sa aktívne vyvíja ako koncept webových služieb a systémov digitálneho rastu.",
  "Clothing, visual identity and creative e-commerce":
    "Oblečenie, vizuálna identita a kreatívny e-commerce",
  "Brand Concept": "Koncept značky",
  "Emotion, architecture and visual symbolism": "Emócie, architektúra a vizuálna symbolika",
  "An evolving creative concept connecting emotional expression, architectural references and clothing.":
    "Rozvíjaný tvorivý koncept prepájajúci emocionálne vyjadrenie, architektonické odkazy a oblečenie.",
  "Clothing Designs": "Návrhy oblečenia",
  "Gothic and architectural experiments": "Gotické a architektonické experimenty",
  "Experimental clothing concepts and works in development. Images can be added without changing the interface.":
    "Experimentálne koncepty oblečenia a rozpracované diela. Obrázky možno pridávať bez zmeny rozhrania.",
  "Creative Process": "Tvorivý proces",
  "Research, sketches, iteration and mockups": "Výskum, skice, iterácie a makety",
  "A developing process that moves from visual research and concepts through iteration and product mockups.":
    "Rozvíjaný proces od vizuálneho výskumu a konceptov cez iterácie až po produktové makety.",
  "Visual Identity": "Vizuálna identita",
  "Gothic, architectural and cybersigil influences": "Gotické, architektonické a cybersigil vplyvy",
  "An evolving visual language influenced by gothic forms, architecture and cybersigil-inspired graphics.":
    "Rozvíjaný vizuálny jazyk ovplyvnený gotickými formami, architektúrou a grafikou inšpirovanou cybersigil estetikou.",
  "Social Content": "Obsah pre sociálne siete",
  "Content direction in development": "Smerovanie obsahu vo vývoji",
  "Social content formats and visual storytelling are planned as part of the brand's development.":
    "Formáty obsahu pre sociálne siete a vizuálne rozprávanie sú naplánované ako súčasť rozvoja značky.",
  "Product Development": "Vývoj produktu",
  "Concepts, prototypes and practical evaluation": "Koncepty, prototypy a praktické overovanie",
  "Clothing concepts are being explored and evaluated before any finished range is claimed.":
    "Koncepty oblečenia sa skúmajú a vyhodnocujú skôr, než sa bude hovoriť o dokončenej kolekcii.",
  "E-commerce Plan": "Plán e-commerce",
  "A future path from concept to shop": "Budúca cesta od konceptu k obchodu",
  "An e-commerce approach is planned, with product, fulfilment and launch decisions still to be validated. If a real catalogue and store launch, measurement would be configured before any advertising claims are made.":
    "E-commerce prístup je naplánovaný, no rozhodnutia o produkte, vybavovaní objednávok a spustení sa ešte musia overiť. Pri reálnom katalógu a spustení obchodu by sa meranie nastavilo skôr, než by vznikli akékoľvek tvrdenia o reklame.",
  "Future implementation path": "Budúci postup implementácie",
  "GA4 and consent-aware event measurement": "GA4 a meranie udalostí so zohľadnením súhlasu",
  "Google Tag Manager where technically appropriate":
    "Google Tag Manager tam, kde je technicky vhodný",
  "Search Console and technical SEO": "Search Console a technické SEO",
  "Merchant Center and product-feed preparation": "príprava Merchant Center a produktového feedu",
  "Shopping Ads and Performance Max for Retail only after the store is ready":
    "Shopping Ads a Performance Max for Retail až po pripravení obchodu",
  Gallery: "Galéria",
  "Creative work will be collected here": "Tvorivá práca bude zhromaždená tu",
  "A growing visual archive for Emotecture Studio concepts and experiments.":
    "Rozrastajúci sa vizuálny archív konceptov a experimentov Emotecture Studio.",
  "Digital product and software concept": "Koncept digitálneho produktu a softvéru",
  "User Problem": "Problém používateľa",
  "Research is shaping the problem definition": "Výskum spresňuje definíciu problému",
  "The user problem is being investigated and refined through early research. No validated market claim is made yet.":
    "Problém používateľa sa skúma a spresňuje počiatočným výskumom. Zatiaľ sa neuvádza žiadne overené tvrdenie o trhu.",
  "Product Concept": "Koncept produktu",
  "An early-stage software concept": "Softvérový koncept v počiatočnej fáze",
  "An early-stage digital product concept that is still being defined and tested.":
    "Koncept digitálneho produktu v počiatočnej fáze, ktorý sa ešte definuje a testuje.",
  "Core Features": "Kľúčové funkcie",
  "Feature priorities are being planned": "Priority funkcií sa plánujú",
  "Core features are being prioritised. Specific capabilities will be published after the product direction is validated.":
    "Kľúčové funkcie sa prioritizujú. Konkrétne schopnosti budú zverejnené po overení smerovania produktu.",
  "UX Research": "UX výskum",
  "User research and problem framing": "Používateľský výskum a vymedzenie problému",
  "Early research is being used to clarify user needs, assumptions and product direction.":
    "Počiatočný výskum sa používa na objasnenie potrieb používateľov, predpokladov a smerovania produktu.",
  "Interface Work": "Práca na rozhraní",
  "Interface concepts and prototypes": "Koncepty rozhrania a prototypy",
  "Early interface concepts and prototypes will be documented here as the product develops.":
    "Počiatočné koncepty rozhrania a prototypy budú dokumentované počas vývoja produktu.",
  "Technical Development": "Technický vývoj",
  "AI-assisted implementation experiments": "Experimenty s implementáciou podporovanou AI",
  "Technical exploration and AI-assisted implementation are in progress. This is not presented as a finished product.":
    "Prebieha technické skúmanie a implementácia podporovaná AI. Nie je to prezentované ako hotový produkt.",
  Roadmap: "Plán rozvoja",
  "Research, prototype, test and refine": "Skúmať, prototypovať, testovať a zlepšovať",
  "The current direction is to continue research, define a focused prototype, test assumptions and refine the product plan.":
    "Aktuálnym smerom je pokračovať vo výskume, definovať zameraný prototyp, testovať predpoklady a spresňovať produktový plán.",
  Repository: "Repozitár",
  "Private while the project is in development": "Súkromný počas vývoja projektu",
  "The source repository remains private while Klinepilot is in development. The public app can be opened from the Klinepilot overview.":
    "Zdrojový repozitár zostáva počas vývoja Klinepilotu súkromný. Verejnú aplikáciu možno otvoriť z prehľadu Klinepilot.",
  "Creative Work": "Tvorivá práca",
  "Clothing, graphics, branding and photography": "Oblečenie, grafika, branding a fotografia",
  "Custom Clothing": "Vlastné oblečenie",
  "Wearable design experiments": "Experimenty s dizajnom oblečenia",
  "Wearable design experiments. This gallery is ready for Daniel's real project images.":
    "Experimenty s nositeľným dizajnom. Galéria je pripravená na Danielove reálne projektové obrázky.",
  "Custom Shoes": "Vlastné topánky",
  "One-off footwear concepts": "Jedinečné koncepty obuvi",
  "One-off footwear concepts. This gallery is ready for Daniel's real project images.":
    "Jedinečné koncepty obuvi. Galéria je pripravená na Danielove reálne projektové obrázky.",
  "Graphic Concepts": "Grafické koncepty",
  "Experimental visual compositions": "Experimentálne vizuálne kompozície",
  "Experimental visual compositions. This gallery is ready for Daniel's real project images.":
    "Experimentálne vizuálne kompozície. Galéria je pripravená na Danielove reálne projektové obrázky.",
  Branding: "Branding",
  "Identity and visual direction concepts": "Koncepty identity a vizuálneho smerovania",
  "Identity and visual direction concepts. This gallery is ready for Daniel's real project images.":
    "Koncepty identity a vizuálneho smerovania. Galéria je pripravená na Danielove reálne projektové obrázky.",
  Photography: "Fotografia",
  "Selected photographic work": "Výber fotografickej práce",
  "Selected photographic work. This gallery is ready for Daniel's real project images.":
    "Výber fotografickej práce. Galéria je pripravená na Danielove reálne projektové obrázky.",
  "Visual Experiments": "Vizuálne experimenty",
  "Open-ended creative exploration": "Otvorené tvorivé skúmanie",
  "Open-ended creative exploration. This gallery is ready for Daniel's real project images.":
    "Otvorené tvorivé skúmanie. Galéria je pripravená na Danielove reálne projektové obrázky.",

  // Skills and evidence labels.
  "Skills and Tools": "Zručnosti a nástroje",
  "Practical strengths and developing capabilities":
    "Praktické silné stránky a rozvíjané schopnosti",
  "Customer and Sales": "Zákaznícke a predajné zručnosti",
  "Customer understanding, sales support and clear communication":
    "Porozumenie zákazníkovi, podpora predaja a jasná komunikácia",
  "Customer-focused help in fast-paced environments":
    "Pomoc zákazníkom v rýchlom pracovnom prostredí",
  "Supporting product choice and purchase decisions":
    "Podpora pri výbere produktu a nákupnom rozhodovaní",
  "Explaining products clearly and usefully": "Jasné a užitočné vysvetľovanie produktov",
  "Listening and matching needs to practical options":
    "Počúvanie a prepájanie potrieb s praktickými možnosťami",
  "Client Communication": "Komunikácia s klientmi",
  "Clear discovery, expectation-setting and follow-up":
    "Jasné zisťovanie potrieb, nastavenie očakávaní a následná komunikácia",
  "Inbound Sales": "Inbound predaj",
  "Planned learning in discovery and buyer-focused sales":
    "Plánované vzdelávanie v zisťovaní potrieb a predaji zameranom na kupujúceho",
  "Operations and Management": "Prevádzka a manažment",
  "Reliable execution, coordination and structured delivery":
    "Spoľahlivá realizácia, koordinácia a štruktúrované dodanie",
  "Organising practical work and priorities": "Organizovanie praktickej práce a priorít",
  "Following detailed procedures reliably": "Spoľahlivé dodržiavanie podrobných postupov",
  "Resolving practical issues under pressure": "Riešenie praktických problémov pod tlakom",
  "Meeting expectations in busy environments": "Plnenie očakávaní v rušnom prostredí",
  "Maintaining standards during repeated tasks": "Udržiavanie štandardov pri opakovaných úlohách",
  "Cooperating in international teams": "Spolupráca v medzinárodných tímoch",
  "Structured execution with formal learning planned":
    "Štruktúrovaná realizácia s plánovaným formálnym vzdelávaním",
  "Web and Technical": "Web a technické zručnosti",
  "Web delivery, repositories, deployment and ownership fundamentals":
    "Realizácia webov, repozitáre, nasadenie a základy vlastníctva",
  "Structuring and moving website work forward": "Štruktúrovanie a posúvanie práce na webe",
  "Web Development": "Vývoj webov",
  "Building responsive web interfaces and static deployments":
    "Tvorba responzívnych webových rozhraní a statických nasadení",
  "Git and GitHub": "Git a GitHub",
  "Repository-based development and version control": "Vývoj v repozitároch a správa verzií",
  "Deployment and Hosting": "Nasadenie a hosting",
  "Static deployment, build workflows and hosting fundamentals":
    "Statické nasadenie, build pracovné postupy a základy hostingu",
  "Domains, DNS and Ownership": "Domény, DNS a vlastníctvo",
  "Practical understanding of access, ownership and handoff requirements":
    "Praktické porozumenie prístupom, vlastníctvu a požiadavkám na odovzdanie",
  "SEO Foundations": "Základy SEO",
  "Metadata, crawlability, structured data and Search Console preparation":
    "Metadáta, indexovateľnosť, štruktúrované dáta a príprava Search Console",
  "Maintenance and Handoff": "Údržba a odovzdanie",
  "Planning access, backups, support and client ownership":
    "Plánovanie prístupov, záloh, podpory a vlastníctva klienta",
  "AI and Workflows": "AI a pracovné postupy",
  "Credential-backed foundations with practical application":
    "Základy podložené osvedčeniami s praktickým uplatnením",
  "Responsible and practical foundational AI concepts":
    "Zodpovedné a praktické základné koncepty AI",
  "Applied AI Use": "Praktické využitie AI",
  "Applying AI concepts to useful tasks and processes":
    "Uplatňovanie konceptov AI pri užitočných úlohách a procesoch",
  "Agent and workflow concepts for structured processes":
    "Koncepty agentov a pracovných postupov pre štruktúrované procesy",
  "Task Decomposition": "Rozklad úloh",
  "Breaking complex work into clear, checkable steps":
    "Rozdelenie komplexnej práce na jasné a kontrolovateľné kroky",
  "Using coding agents within reviewed development workflows":
    "Používanie programovacích agentov v kontrolovaných vývojových postupoch",
  "Reviewing AI output for usefulness, accuracy and evidence":
    "Kontrola výstupov AI z hľadiska užitočnosti, presnosti a dôkazov",
  "Recording decisions, steps and expected results":
    "Zaznamenávanie rozhodnutí, krokov a očakávaných výsledkov",
  "Anthropic / Claude": "Anthropic / Claude",
  "Focused Claude and AI-fluency learning is planned":
    "Plánované je cielené vzdelávanie v Claude a AI fluency",
  "Customer and Commercial": "Zákaznícke a obchodné zručnosti",
  Operations: "Prevádzka",
  Digital: "Digitálne zručnosti",
  "AI and Workflow": "AI a pracovné postupy",
  "Marketing and Analytics": "Marketing a analytika",
  "Credential-backed Shopping knowledge and developing measurement skills":
    "Znalosti Shopping podložené certifikáciou a rozvíjané schopnosti merania",
  "Google Shopping Ads": "Google Shopping Ads",
  "Shopping campaign fundamentals and policy concepts":
    "Základy Shopping kampaní a koncepty pravidiel",
  "Credential-backed concepts awaiting real implementation":
    "Koncepty podložené certifikáciou, ktoré čakajú na reálnu implementáciu",
  "Performance Max for Retail": "Performance Max for Retail",
  "Credential-backed campaign and optimization concepts":
    "Koncepty kampaní a optimalizácie podložené certifikáciou",
  "Google Analytics": "Google Analytics",
  "Planned certification and real-site measurement practice":
    "Plánovaná certifikácia a praktické meranie na reálnom webe",
  "Conversion Tracking": "Meranie konverzií",
  "Developing event design and consent-aware measurement capability":
    "Rozvíjanie návrhu udalostí a merania so zohľadnením súhlasu",
  "Planned structured learning applied to real projects":
    "Plánované štruktúrované vzdelávanie uplatnené na reálnych projektoch",
  "Paid Acquisition Concepts": "Koncepty platenej akvizície",
  "Campaign-selection knowledge without claimed client results":
    "Znalosti výberu kampaní bez tvrdení o výsledkoch klientov",
  "Business and Commercial": "Biznis a obchod",
  "Economics orientation, commercial thinking and service delivery":
    "Ekonomická orientácia, obchodné myslenie a poskytovanie služieb",
  "Business and Economics": "Biznis a ekonómia",
  "Academic foundation supported by current studies": "Akademický základ podporený štúdiom",
  "Connecting customer needs, delivery and business purpose":
    "Prepájanie potrieb zákazníka, realizácie a obchodného účelu",
  "Structuring scope, delivery, handoff and support":
    "Štruktúrovanie rozsahu, realizácie, odovzdania a podpory",
  "Developing independent projects and service concepts":
    "Rozvoj nezávislých projektov a konceptov služieb",
  "Planned learning in connected sales and operational workflows":
    "Plánované vzdelávanie v prepojených predajných a prevádzkových postupoch",
  "Planned applied learning with Power Automate and AI":
    "Plánované aplikované vzdelávanie s Power Automate a AI",
  "Business and Management": "Biznis a manažment",
  Creative: "Tvorivosť",
  "Brand, clothing, imagery and visual direction":
    "Značka, oblečenie, obrazová tvorba a vizuálne smerovanie",
  Proficiency: "Úroveň dôkazu",
  "Customer Service": "Zákaznícky servis",
  "Sales Support": "Podpora predaja",
  "Product Communication": "Komunikácia o produktoch",
  "Customer Needs Analysis": "Analýza potrieb zákazníka",
  "E-commerce Support": "Podpora e-commerce",
  "Written Communication": "Písomná komunikácia",
  "Task Coordination": "Koordinácia úloh",
  "Process Adherence": "Dodržiavanie procesov",
  "Order and Task Follow-up": "Sledovanie objednávok a úloh",
  "Problem-solving": "Riešenie problémov",
  "Time Management": "Riadenie času",
  "Quality Awareness": "Dôraz na kvalitu",
  "Cross-cultural Teamwork": "Spolupráca naprieč kultúrami",
  "Website Project Coordination": "Koordinácia webových projektov",
  "Digital Content": "Digitálny obsah",
  "Basic Analytics": "Základy analytiky",
  "AI-assisted Research": "Výskum podporovaný AI",
  "AI Foundations": "AI Foundations",
  "Applied AI": "Aplikované AI",
  "AI Agents and Workflows": "AI agenti a pracovné postupy",
  "Prompt Design": "Tvorba promptov",
  "Workflow Structuring": "Štruktúrovanie pracovných postupov",
  "Output Evaluation": "Hodnotenie výstupov",
  "Agent-assisted Development": "Vývoj podporovaný agentmi",
  "Process Documentation": "Dokumentácia procesov",
  "Shopping Ads Concepts": "Koncepty Shopping Ads",
  "Merchant Center and Product Feeds": "Merchant Center a produktové feedy",
  "Performance Max for Retail Concepts": "Koncepty Performance Max for Retail",
  "Conversion Measurement": "Meranie konverzií",
  "Digital Marketing": "Digitálny marketing",
  "Project Management": "Projektový manažment",
  "Revenue Operations": "Revenue operations",
  "Business Workflow Automation": "Automatizácia firemných pracovných postupov",
  "Commercial Thinking": "Obchodné myslenie",
  Entrepreneurship: "Podnikanie",
  "Service Delivery": "Poskytovanie služieb",
  "Brand Concepts": "Koncepty značiek",
  "Developing coherent creative directions": "Rozvíjanie ucelených tvorivých smerov",
  "Clothing Design": "Dizajn oblečenia",
  "Exploring garments through custom work and concepts":
    "Skúmanie odevov prostredníctvom zákazkovej práce a konceptov",
  "Developing consistent graphic languages": "Rozvíjanie konzistentných grafických jazykov",
  "Practical image-making and composition": "Praktická tvorba obrazu a kompozícia",
  "Creative Direction": "Kreatívne smerovanie",
  "Shaping an overall visual concept": "Formovanie celkového vizuálneho konceptu",
  "Product Mockups": "Produktové makety",
  "Visualising product and clothing ideas": "Vizualizovanie nápadov na produkty a oblečenie",

  // Root maps and credential framing.
  About: "O mne",
  Experience: "Skúsenosti",
  Projects: "Projekty",
  Skills: "Zručnosti",
  Certifications: "Osvedčenia",
  Contact: "Kontakt",
  "Certifications and Learning": "Osvedčenia a vzdelávanie",
  "Work in progress": "Rozpracované",
  "No entries yet": "Zatiaľ bez položiek",
  "No credentials listed yet": "Zatiaľ bez osvedčení",
  "Professional Certification": "Profesijná certifikácia",
  "Vendor Certification": "Certifikácia dodávateľa",
  "Applied Skills Credential": "Osvedčenie Applied Skills",
  "GitHub Certification": "Certifikácia GitHub",
  "Course Completion Certificate": "Certifikát o absolvovaní kurzu",
  "Learning Badge": "Vzdelávací odznak",
  "Course Completion": "Absolvovanie kurzu",
  "View certificate": "Zobraziť osvedčenie",
  "Verify credential": "Overiť osvedčenie",
  "Official Shopping Ads Certified badge from Skillshop":
    "Oficiálny odznak Shopping Ads Certified od Skillshop",
  "Shopping Ads Certified badge": "Odznak Shopping Ads Certified",
  "Completed credentials are verified where public evidence exists. Planned learning remains clearly separate and non-interactive.":
    "Dokončené osvedčenia sú overené tam, kde existuje verejný dôkaz. Plánované vzdelávanie zostáva jasne oddelené a neinteraktívne.",
  "Four completed credentials support the current capability story. Fourteen focused credentials remain planned and are not presented as completed.":
    "Štyri dokončené osvedčenia podporujú aktuálny profil schopností. Štrnásť cielených osvedčení zostáva plánovaných a nie sú prezentované ako dokončené.",
  "Capabilities are labelled by evidence: credential-backed, applied, practical, learning or project-demonstrated.":
    "Schopnosti sú označené podľa dôkazov: podložené osvedčením, aplikované, praktické, vo vzdelávaní alebo preukázané projektom.",
  "Microsoft Applied Skills": "Microsoft Applied Skills",
  "AI foundations": "základy AI",
  "responsible AI use": "zodpovedné používanie AI",
  "practical AI use": "praktické používanie AI",
  "applied AI": "aplikované AI",
  "task decomposition": "rozklad úloh",
  "structured AI-assisted work": "štruktúrovaná práca podporovaná AI",
  "AI agents": "AI agenti",
  "workflow design": "návrh pracovných postupov",
  "AI fluency": "AI fluency",
  "agent-assisted development": "vývoj podporovaný agentmi",
  measurement: "meranie",
  "search advertising": "reklama vo vyhľadávaní",
  "Shopping ads": "Shopping ads",
  "Merchant Center concepts": "koncepty Merchant Center",
  "product feeds": "produktové feedy",
  "Shopping Ads policies": "pravidlá Shopping Ads",
  "campaign optimization principles": "princípy optimalizácie kampaní",
  "digital marketing": "digitálny marketing",
  "inbound sales": "inbound predaj",
  "sales support": "podpora predaja",
  "revenue operations": "revenue operations",
  "project management": "projektový manažment",
  "data fundamentals": "základy dát",
  "process automation": "automatizácia procesov",
  "business workflows": "firemné pracovné postupy",
  "AI research": "AI výskum",
  reporting: "tvorba reportov",
  repositories: "repozitáre",
};

const slovakDescriptions: Readonly<Record<string, string>> = {
  "Professional summary, working style, languages and direction.":
    "Profesionálne zhrnutie, pracovný štýl, jazyky a smerovanie.",
  "A timeline of customer-facing and operational work.":
    "Časová os práce so zákazníkmi a prevádzkových skúseností.",
  "Business, economics, hospitality and service studies.":
    "Štúdium biznisu, ekonómie, hotelierstva a služieb.",
  "Professional contact details, CV and work preferences.":
    "Profesionálne kontaktné údaje, CV a pracovné preferencie.",
  "Website services and digital growth systems for small businesses.":
    "Webové služby a systémy digitálneho rastu pre malé firmy.",
  "Clothing, visual identity and emotionally driven design.":
    "Oblečenie, vizuálna identita a dizajn vedený emóciami.",
  "Early-stage product research, interface work and technical development.":
    "Počiatočný produktový výskum, práca na rozhraní a technický vývoj.",
  "Creative practice and visual experiments.": "Tvorivá prax a vizuálne experimenty.",
  "Evidence-based capabilities with honest proficiency labels.":
    "Schopnosti podložené dôkazmi s úprimným označením úrovne.",
  "An interactive map of Daniel's experience, skills, projects and direction.":
    "Interaktívna mapa Danielových skúseností, zručností, projektov a smerovania.",
};

const slovakCredentialDescriptions: Readonly<Record<string, string>> = {
  "openai-ai-foundations":
    "Dokončený kurz OpenAI Academy zameraný na základy AI a jej zodpovedné praktické používanie.",
  "openai-applied-ai-foundations":
    "Dokončený kurz OpenAI Academy zameraný na praktické použitie AI pri riešení úloh a pracovných postupoch.",
  "openai-agents-and-workflows":
    "Dokončený kurz OpenAI Academy zameraný na agentov, rozklad úloh a štruktúrované pracovné postupy.",
  "google-ai-powered-shopping-ads-certification":
    "Certifikácia preukazuje znalosti princípov Shopping Ads, Google Merchant Center, produktových feedov, pravidiel a Performance Max for Retail. Neznamená tvrdenie o výsledkoch kampaní pre klientov.",
  "anthropic-claude-101": "Plánované vzdelávanie o základoch Claude; zatiaľ nie je dokončené.",
  "anthropic-ai-fluency-framework-and-foundations":
    "Plánované vzdelávanie v oblasti AI fluency; zatiaľ nie je dokončené.",
  "anthropic-claude-code-in-action":
    "Plánované vzdelávanie o Claude Code; zatiaľ nie je dokončené.",
  "google-analytics-certification":
    "Plánovaná certifikácia Google Analytics; zatiaľ nie je dokončená.",
  "google-ads-search-certification":
    "Plánovaná certifikácia Google Ads Search; zatiaľ nie je dokončená.",
  "hubspot-digital-marketing-certification":
    "Plánovaná certifikácia digitálneho marketingu; zatiaľ nie je dokončená.",
  "hubspot-inbound-sales-certification":
    "Plánovaná certifikácia inbound sales; zatiaľ nie je dokončená.",
  "hubspot-revenue-operations-certification":
    "Plánovaná certifikácia revenue operations; zatiaľ nie je dokončená.",
  "ibm-project-management-fundamentals":
    "Plánované vzdelávanie v základoch projektového manažmentu; zatiaľ nie je dokončené.",
  "ibm-data-fundamentals": "Plánované vzdelávanie v základoch dát; zatiaľ nie je dokončené.",
  "microsoft-create-and-manage-automated-processes-with-power-automate":
    "Plánované osvedčenie Microsoft Applied Skills pre automatizované procesy v Power Automate; zatiaľ nie je dokončené.",
  "microsoft-streamline-business-workflows-with-ai-chat":
    "Plánované osvedčenie Microsoft Applied Skills pre firemné pracovné postupy s AI chatom; zatiaľ nie je dokončené.",
  "microsoft-generate-reports-with-ai-research-agents":
    "Plánované osvedčenie Microsoft Applied Skills pre tvorbu správ pomocou AI výskumných agentov; zatiaľ nie je dokončené.",
  "github-foundations-certification":
    "Plánovaná certifikácia GitHub Foundations; zatiaľ nie je dokončená.",
};

const slovakActionCopy: Readonly<Record<string, { label: string; ariaLabel: string }>> = {
  email: {
    label: "E-mail pre pracovné ponuky",
    ariaLabel: "Poslať Danielovi Lakymu e-mail o pracovnej príležitosti",
  },
  "business-email": {
    label: "Projektové dopyty",
    ariaLabel: "Poslať Danielovi Lakymu e-mail o spolupráci alebo projekte",
  },
  phone: {
    label: "Telefón",
    ariaLabel: "Zavolať Danielovi Lakymu na číslo plus 421 949 093 583",
  },
  linkedin: {
    label: "LinkedIn",
    ariaLabel: "Otvoriť profil Daniela Lakyho na LinkedIn na novej karte",
  },
  github: {
    label: "GitHub",
    ariaLabel: "Otvoriť profil Daniela Lakyho na GitHub na novej karte",
  },
  cv: {
    label: "Stiahnuť CV — anglicky",
    ariaLabel: "Stiahnuť anglické CV Daniela Lakyho vo formáte PDF",
  },
  "cv-slovak": {
    label: "Stiahnuť CV — slovensky",
    ariaLabel: "Stiahnuť slovenské CV Daniela Lakyho vo formáte PDF",
  },
  "klinepilot-live": {
    label: "Otvoriť živú aplikáciu",
    ariaLabel: "Otvoriť výskumnú aplikáciu Klinepilot na novej karte",
  },
  "klinepilot-repository": {
    label: "Repozitár",
    ariaLabel: "Odkaz na repozitár Klinepilot zatiaľ nie je nastavený",
  },
};

const monthReplacements: Readonly<Record<string, string>> = {
  January: "január",
  February: "február",
  March: "marec",
  April: "apríl",
  May: "máj",
  June: "jún",
  July: "júl",
  August: "august",
  September: "september",
  October: "október",
  November: "november",
  December: "december",
  Present: "súčasnosť",
};

function translateCountLabel(value: string): string | null {
  const combinedCore = value.match(/^(\d+) completed · (\d+) planned core credentials$/);
  if (combinedCore) {
    return `${combinedCore[1]} dokončené · ${combinedCore[2]} plánovaných kľúčových osvedčení`;
  }

  const combined = value.match(/^(\d+) completed · (\d+) planned$/);
  if (combined) {
    return `${combined[1]} dokončené · ${combined[2]} plánovaných`;
  }

  const patterns: readonly [RegExp, (count: string) => string][] = [
    [/^(\d+) topics$/, (count) => `${count} tém`],
    [/^(\d+) roles$/, (count) => `${count} pracovné pozície`],
    [/^(\d+) projects$/, (count) => `${count} projekty`],
    [/^(\d+) skills$/, (count) => `${count} zručností`],
    [/^(\d+) clusters$/, (count) => `${count} oblastí`],
    [/^(\d+) issuers$/, (count) => `${count} vydavateľov`],
    [/^(\d+) options$/, (count) => `${count} možností`],
    [/^(\d+) programmes$/, (count) => `${count} programy`],
    [/^(\d+) credentials$/, (count) => `${count} osvedčení`],
    [/^(\d+) planned$/, (count) => `${count} plánovaných`],
    [/^(\d+) completed$/, (count) => `${count} dokončené`],
  ];

  for (const [pattern, format] of patterns) {
    const match = value.match(pattern);
    if (match?.[1]) return format(match[1]);
  }

  return null;
}

function translateDateText(value: string): string {
  let translated = value;
  for (const [english, slovak] of Object.entries(monthReplacements)) {
    translated = translated.replaceAll(english, slovak);
  }
  return translated;
}

function translateText(value: string): string {
  const exact = slovakText[value] ?? slovakDescriptions[value];
  if (exact) return exact;

  if (value in portfolioUiCopy.sk.proficiency) {
    return portfolioUiCopy.sk.proficiency[value as Proficiency];
  }

  if (value in portfolioUiCopy.sk.status) {
    return portfolioUiCopy.sk.status[value as PortfolioItemStatus];
  }

  const imageAlt = value.match(/^(.+) image for (.+)$/);
  if (imageAlt) {
    return `Obrázok ${imageAlt[1].replaceAll("-", " ")} pre projekt ${imageAlt[2]}`;
  }

  const imagePlaceholder = value.match(/^(.+) image placeholder (\d+)$/);
  if (imagePlaceholder) {
    return `Zástupný obrázok ${imagePlaceholder[1].replaceAll("-", " ")} ${imagePlaceholder[2]}`;
  }

  const count = translateCountLabel(value);
  if (count) return count;

  return translateDateText(value)
    .replaceAll("Senec, Slovakia", "Senec, Slovensko")
    .replaceAll("Prague, Czechia", "Praha, Česko")
    .replaceAll("Netherlands", "Holandsko")
    .replaceAll("Slovakia", "Slovensko");
}

function localizeAction(action: PortfolioAction, locale: PortfolioLocale): PortfolioAction {
  if (locale === "en") return action;
  const translation = slovakActionCopy[action.id];
  if (translation) return { ...action, ...translation };

  if (action.analyticsDestination === "certificate") {
    return {
      ...action,
      label: "Zobraziť osvedčenie",
      ariaLabel: `Zobraziť PDF osvedčenia ${action.analyticsContext ?? ""} na novej karte`.trim(),
    };
  }

  if (action.analyticsDestination === "verification") {
    return {
      ...action,
      label: "Overiť osvedčenie",
      ariaLabel: `Overiť osvedčenie ${action.analyticsContext ?? ""} na novej karte`.trim(),
    };
  }

  return action;
}

function localizeImage(image: PortfolioImage, locale: PortfolioLocale): PortfolioImage {
  if (locale === "en") return image;
  return {
    ...image,
    alt: translateText(image.alt),
    placeholderLabel: translateText(image.placeholderLabel),
  };
}

function localizeSection(
  section: PortfolioDetailSection,
  locale: PortfolioLocale,
): PortfolioDetailSection {
  if (locale === "en") return section;
  return {
    ...section,
    title: section.title ? translateText(section.title) : undefined,
    body: section.body ? translateText(section.body) : undefined,
    items: section.items?.map(translateText),
  };
}

function localizeDetail(
  detail: PortfolioDetail | undefined,
  locale: PortfolioLocale,
  actions: Readonly<Record<string, PortfolioAction>>,
  credentials: ReadonlyMap<string, PortfolioSiteData["credentials"][number]>,
): PortfolioDetail | undefined {
  if (!detail || locale === "en") return detail;
  const localizedCredential = detail.credential ? credentials.get(detail.credential.id) : undefined;

  return {
    ...detail,
    title: translateText(detail.title),
    subtitle: detail.subtitle ? translateText(detail.subtitle) : undefined,
    eyebrow: detail.eyebrow ? translateText(detail.eyebrow) : undefined,
    description:
      localizedCredential?.description ??
      (detail.description ? translateText(detail.description) : undefined),
    sections: detail.sections?.map((section) => localizeSection(section, locale)),
    tags: localizedCredential?.skills ?? detail.tags?.map(translateText),
    dates: detail.dates ? translateText(detail.dates) : undefined,
    location: detail.location ? translateText(detail.location) : undefined,
    images: detail.images?.map((image) => localizeImage(image, locale)),
    actions: detail.actions?.map((action) => actions[action.id] ?? localizeAction(action, locale)),
    credential: localizedCredential ?? detail.credential,
  };
}

function localizeNode(
  node: PortfolioNode,
  locale: PortfolioLocale,
  actions: Readonly<Record<string, PortfolioAction>>,
  credentials: ReadonlyMap<string, PortfolioSiteData["credentials"][number]>,
): PortfolioNode {
  if (locale === "en") return node;

  const keepsOfficialTitle = node.kind === "credential";
  const credentialDescriptor =
    node.kind === "credential" && node.meta?.verificationType && node.status
      ? `${translateText(node.meta.verificationType)} · ${formatPortfolioStatus(node.status, locale)}`
      : undefined;
  return {
    ...node,
    title: keepsOfficialTitle ? node.title : translateText(node.title),
    descriptor:
      credentialDescriptor ?? (node.descriptor ? translateText(node.descriptor) : undefined),
    action: node.action
      ? (actions[node.action.id] ?? localizeAction(node.action, locale))
      : undefined,
    detail: localizeDetail(node.detail, locale, actions, credentials),
    meta: node.meta
      ? {
          ...node.meta,
          countLabel: node.meta.countLabel ? translateText(node.meta.countLabel) : undefined,
          dates: node.meta.dates ? translateText(node.meta.dates) : undefined,
          location: node.meta.location ? translateText(node.meta.location) : undefined,
          category: node.meta.category ? translateText(node.meta.category) : undefined,
        }
      : undefined,
  };
}

/**
 * Returns a presentation-localized copy of the central portfolio data.
 *
 * Navigation identifiers, URL slugs, official credential/project/issuer names,
 * technologies, links and file paths are deliberately preserved. The English
 * source object is returned unchanged; Slovak receives a fresh immutable-friendly
 * object graph so switching language cannot mutate the source of truth.
 */
export function localizePortfolioData(
  data: PortfolioSiteData,
  locale: PortfolioLocale,
): PortfolioSiteData {
  if (locale === "en") return data;

  const localizedActions = Object.fromEntries(
    Object.entries(data.actions).map(([key, action]) => [key, localizeAction(action, locale)]),
  ) as Readonly<Record<string, PortfolioAction>>;

  const localizedCredentials = data.credentials.map((credential) => ({
    ...credential,
    description:
      slovakCredentialDescriptions[credential.id] ?? translateText(credential.description),
    skills: credential.skills.map(translateText),
    certificateImage: credential.certificateImage
      ? localizeImage(credential.certificateImage, locale)
      : null,
  }));
  const credentialsById = new Map(
    localizedCredentials.map((credential) => [credential.id, credential] as const),
  );

  const localizedGraphs = Object.fromEntries(
    Object.entries(data.graphs).map(([key, graph]) => [
      key,
      {
        ...graph,
        title: translateText(graph.title),
        description: graph.description ? translateText(graph.description) : undefined,
        nodes: graph.nodes.map((node) =>
          localizeNode(node, locale, localizedActions, credentialsById),
        ),
        edges: graph.edges.map((edge) => ({
          ...edge,
          label: edge.label ? translateText(edge.label) : undefined,
        })),
        emptyState: graph.emptyState
          ? {
              title: translateText(graph.emptyState.title),
              description: translateText(graph.emptyState.description),
            }
          : undefined,
      },
    ]),
  ) as PortfolioSiteData["graphs"];

  return {
    ...data,
    identity: {
      ...data.identity,
      descriptor: translateText(data.identity.descriptor),
      location: translateText(data.identity.location),
      status: translateText(data.identity.status),
      profileImage: localizeImage(data.identity.profileImage, locale),
    },
    metadata: {
      ...data.metadata,
      title: translateText(data.metadata.title),
      description: translateText(data.metadata.description),
      siteName: translateText(data.metadata.siteName),
      locale: "sk_SK",
      socialImage: localizeImage(data.metadata.socialImage, locale),
    },
    actions: localizedActions,
    credentials: localizedCredentials,
    graphs: localizedGraphs,
  };
}

export function formatPortfolioStatus(
  status: PortfolioItemStatus,
  locale: PortfolioLocale,
): string {
  return portfolioUiCopy[locale].status[status];
}

export function formatPortfolioProficiency(
  proficiency: Proficiency,
  locale: PortfolioLocale,
): string {
  return portfolioUiCopy[locale].proficiency[proficiency];
}

const verificationTypeCopy: Readonly<
  Record<PortfolioLocale, Readonly<Record<VerificationType, string>>>
> = {
  en: {
    "Professional Certification": "Professional Certification",
    "Vendor Certification": "Vendor Certification",
    "Applied Skills Credential": "Applied Skills Credential",
    "GitHub Certification": "GitHub Certification",
    "Course Completion Certificate": "Course Completion Certificate",
    "Learning Badge": "Learning Badge",
    "Course Completion": "Course Completion",
  },
  sk: {
    "Professional Certification": "Profesijná certifikácia",
    "Vendor Certification": "Certifikácia dodávateľa",
    "Applied Skills Credential": "Osvedčenie Applied Skills",
    "GitHub Certification": "Certifikácia GitHub",
    "Course Completion Certificate": "Certifikát o absolvovaní kurzu",
    "Learning Badge": "Vzdelávací odznak",
    "Course Completion": "Absolvovanie kurzu",
  },
};

export function formatPortfolioVerificationType(
  verificationType: VerificationType,
  locale: PortfolioLocale,
): string {
  return verificationTypeCopy[locale][verificationType];
}

export function formatPortfolioDate(date: string, locale: PortfolioLocale): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat(locale === "sk" ? "sk-SK" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}
