"""Build Daniel Laky's matching English and Slovak one-page CV PDFs.

The visual system mirrors the approved English CV. A Unicode-capable Arial-style
font is embedded because Slovak text contains glyphs unavailable in PDF's base
Helvetica font.
"""

from __future__ import annotations

import shutil
from pathlib import Path
from typing import TypedDict

import reportlab
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIRECTORY = ROOT / "public" / "documents"
ARTIFACT_DIRECTORY = ROOT / "output" / "pdf"

ENGLISH_FILENAME = "Daniel_Laky_Remote_Roles_CV.pdf"
SLOVAK_FILENAME = "Daniel_Laky_CV_Slovak.pdf"

PHONE_DISPLAY = "+421 949 093 583"
PHONE_LINK = "tel:+421949093583"
RECRUITMENT_EMAIL = "daniellaky.uni@gmail.com"
BUSINESS_EMAIL = "r.creation.st@gmail.com"
PORTFOLIO_URL = "https://daniel-techai.github.io/DLportfolio/"
LINKEDIN_URL = "https://www.linkedin.com/in/daniel-laky-141a9b350/"
GITHUB_URL = "https://github.com/daniel-techAI"

INK = colors.HexColor("#202321")
MUTED = colors.HexColor("#555B56")
ACCENT = colors.HexColor("#8A5D2E")
RULE = colors.HexColor("#D8D2C7")


class Role(TypedDict):
    title: str
    company: str
    meta: str
    bullets: list[str]


class Project(TypedDict):
    title: str
    status: str
    description: str


class CvContent(TypedDict):
    language: str
    headline: str
    location: str
    business_email_label: str
    portfolio_label: str
    linkedin_label: str
    github_label: str
    portfolio_prompt: str
    linkedin_prompt: str
    sections: dict[str, str]
    summary: str
    roles: list[Role]
    projects: list[Project]
    education: list[str]
    skills: list[tuple[str, str]]
    footer: str
    title: str
    subject: str


ENGLISH: CvContent = {
    "language": "en",
    "headline": "CUSTOMER SUPPORT | OPERATIONS | SALES SUPPORT | DIGITAL PROJECTS",
    "location": "Senec, Slovakia",
    "business_email_label": "Project enquiries",
    "portfolio_label": "Portfolio",
    "linkedin_label": "LinkedIn",
    "github_label": "GitHub",
    "portfolio_prompt": "Explore my interactive portfolio and full project overview online.",
    "linkedin_prompt": "View my LinkedIn profile for additional professional information.",
    "sections": {
        "summary": "Professional Summary",
        "experience": "Professional Experience",
        "projects": "Selected Digital Projects",
        "education": "Education",
        "skills": "Skills, Tools and Languages",
    },
    "summary": (
        "Adaptable and commercially minded professional with experience in customer-facing "
        "retail, international production, and independent digital projects. Comfortable "
        "working in fast-paced environments, communicating across cultures, solving practical "
        "problems, and taking ownership of tasks. Seeking a remote role in customer support, "
        "sales support, operations, e-commerce, or digital coordination while continuing to "
        "build strong business and technology skills."
    ),
    "roles": [
        {
            "title": "Production Employee",
            "company": "OTTO Work Force B.V.",
            "meta": "Netherlands | July 2026 - Present",
            "bullets": [
                "Work reliably in a high-volume international production environment while meeting quality, safety and productivity requirements.",
                "Follow detailed procedures, adapt to changing shifts and responsibilities, and maintain dependable execution under time pressure.",
                "Cooperate with colleagues from different cultural and language backgrounds.",
            ],
        },
        {
            "title": "Sales Assistant",
            "company": "Foot Locker",
            "meta": "Prague, Czechia | October 2025 - June 2026",
            "bullets": [
                "Assisted customers with product selection, sizing and purchasing decisions using clear, customer-focused communication.",
                "Supported sales through product knowledge and helped with stock, merchandising, order questions and daily store operations.",
                "Worked effectively during busy periods in an international retail environment.",
            ],
        },
    ],
    "projects": [
        {
            "title": "Growthstack",
            "status": "active development",
            "description": (
                "A developing service concept focused on professional websites, clear digital "
                "presentation and practical growth systems for small businesses."
            ),
        },
        {
            "title": "Klinepilot",
            "status": "early-stage development",
            "description": (
                "An early-stage digital product being developed through user research, feature "
                "planning, interface concepts and AI-assisted implementation."
            ),
        },
        {
            "title": "Emotecture Studio",
            "status": "active development",
            "description": (
                "Explores clothing, visual identity and emotionally driven design through gothic, "
                "architectural and cybersigil-influenced concepts."
            ),
        },
    ],
    "education": [
        (
            "<b>Prague University of Economics and Business (VŠE)</b> - Business and economics "
            "studies, 2025 - 2026. Relevant areas: economics, management, marketing, law, "
            "mathematics and information technology."
        ),
        (
            "<b>Secondary Vocational School of Gastronomy and Hotel Services, Slovakia</b> - "
            "Hotel Academy, 2020 - 2025. Relevant areas: hospitality, customer service, tourism, "
            "business communication, practical operations and gastronomy."
        ),
    ],
    "skills": [
        (
            "Customer and commercial",
            "Customer service, sales support, product communication, written communication, customer needs analysis and e-commerce support.",
        ),
        (
            "Operations",
            "Task coordination, process adherence, task follow-up, practical problem-solving, time management, quality awareness and cross-cultural teamwork.",
        ),
        (
            "Digital and workflow",
            "Google Workspace, Microsoft Office, Canva, GitHub, digital content, basic analytics, website project coordination, AI-assisted research, prompt design and process documentation.",
        ),
        (
            "Languages",
            "Slovak - native; Czech - professional working proficiency; English - professional working proficiency.",
        ),
    ],
    "footer": "Daniel Laky | CV | Updated August 2026",
    "title": "Daniel Laky - Remote Roles CV",
    "subject": "Customer support, operations, sales support, e-commerce and digital coordination CV",
}


SLOVAK: CvContent = {
    "language": "sk",
    "headline": "ZÁKAZNÍCKA PODPORA | OPERATÍVA | PODPORA PREDAJA | DIGITÁLNE PROJEKTY",
    "location": "Senec, Slovensko",
    "business_email_label": "Projektové dopyty",
    "portfolio_label": "Portfólio",
    "linkedin_label": "LinkedIn",
    "github_label": "GitHub",
    "portfolio_prompt": "Pozrite si moje interaktívne portfólio a prehľad projektov online.",
    "linkedin_prompt": "Viac profesionálnych informácií nájdete na LinkedIn profile.",
    "sections": {
        "summary": "Profesijný profil",
        "experience": "Pracovné skúsenosti",
        "projects": "Vybrané digitálne projekty",
        "education": "Vzdelanie",
        "skills": "Zručnosti, nástroje a jazyky",
    },
    "summary": (
        "Prispôsobivý a obchodne zmýšľajúci profesionál so skúsenosťami v maloobchodnom "
        "predaji, medzinárodnej výrobe a vlastných digitálnych projektoch. Dokáže efektívne "
        "pracovať v dynamickom prostredí, komunikovať naprieč kultúrami, riešiť praktické "
        "problémy a preberať zodpovednosť za úlohy. Hľadá prácu na diaľku v oblasti zákazníckej "
        "podpory, podpory predaja, operatívy, e-commerce alebo digitálnej koordinácie a zároveň "
        "si ďalej rozvíja obchodné a technologické zručnosti."
    ),
    "roles": [
        {
            "title": "Pracovník vo výrobe",
            "company": "OTTO Work Force B.V.",
            "meta": "Holandsko | júl 2026 - súčasnosť",
            "bullets": [
                "Spoľahlivo pracuje v medzinárodnom výrobnom prostredí s vysokým objemom produkcie pri plnení požiadaviek na kvalitu, bezpečnosť a produktivitu.",
                "Dodržiava podrobné pracovné postupy, prispôsobuje sa zmenám smien a zodpovedností a udržiava spoľahlivý výkon pod časovým tlakom.",
                "Spolupracuje s kolegami z rôznych kultúrnych a jazykových prostredí.",
            ],
        },
        {
            "title": "Predajný asistent",
            "company": "Foot Locker",
            "meta": "Praha, Česko | október 2025 - jún 2026",
            "bullets": [
                "Pomáhal zákazníkom s výberom produktov, veľkostí a nákupným rozhodovaním prostredníctvom zrozumiteľnej komunikácie orientovanej na zákazníka.",
                "Podporoval predaj znalosťami produktov a pomáhal so skladom, merchandisingom, otázkami k objednávkam a každodennou prevádzkou predajne.",
                "Efektívne pracoval počas vyťažených období v medzinárodnom maloobchodnom prostredí.",
            ],
        },
    ],
    "projects": [
        {
            "title": "Growthstack",
            "status": "aktívny vývoj",
            "description": (
                "Rozvíjaný koncept služieb zameraný na profesionálne webové stránky, zrozumiteľnú "
                "digitálnu prezentáciu a praktické systémy rastu pre malé podniky."
            ),
        },
        {
            "title": "Klinepilot",
            "status": "raná fáza vývoja",
            "description": (
                "Digitálny produkt v ranej fáze vývoja, rozvíjaný prostredníctvom používateľského "
                "prieskumu, plánovania funkcií, návrhov rozhrania a implementácie s podporou AI."
            ),
        },
        {
            "title": "Emotecture Studio",
            "status": "aktívny vývoj",
            "description": (
                "Skúma odevný dizajn, vizuálnu identitu a emocionálne ladenú tvorbu prostredníctvom "
                "gotických, architektonických a cybersigilových konceptov."
            ),
        },
    ],
    "education": [
        (
            "<b>Prague University of Economics and Business (VŠE)</b> - Štúdium podnikania a "
            "ekonómie, 2025 - 2026. Relevantné oblasti: ekonómia, manažment, marketing, právo, "
            "matematika a informačné technológie."
        ),
        (
            "<b>Stredná odborná škola gastronómie a hotelových služieb, Slovensko</b> - Hotelová "
            "akadémia, 2020 - 2025. Relevantné oblasti: hotelierstvo, zákaznícky servis, cestovný "
            "ruch, obchodná komunikácia, praktická prevádzka a gastronómia."
        ),
    ],
    "skills": [
        (
            "Zákaznícke a obchodné zručnosti",
            "Zákaznícky servis, podpora predaja, komunikácia o produktoch, písomná komunikácia, analýza potrieb zákazníkov a podpora e-commerce.",
        ),
        (
            "Operatíva",
            "Koordinácia úloh, dodržiavanie procesov, sledovanie úloh, praktické riešenie problémov, manažment času, dôraz na kvalitu a spolupráca v medzikultúrnom tíme.",
        ),
        (
            "Digitálne nástroje a pracovné postupy",
            "Google Workspace, Microsoft Office, Canva, GitHub, digitálny obsah, základná analytika, koordinácia webových projektov, výskum s podporou AI, tvorba promptov a dokumentácia procesov.",
        ),
        (
            "Jazyky",
            "Slovenčina - materinský jazyk; čeština - profesionálna pracovná úroveň; angličtina - profesionálna pracovná úroveň.",
        ),
    ],
    "footer": "Daniel Laky | CV | Aktualizované: august 2026",
    "title": "Daniel Laky - Životopis v slovenčine",
    "subject": "Životopis pre pozície v zákazníckej podpore, operatíve a digitálnych projektoch",
}


def register_fonts() -> None:
    reportlab_fonts = Path(reportlab.__file__).resolve().parent / "fonts"
    font_families = [
        (
            Path("C:/Windows/Fonts/arial.ttf"),
            Path("C:/Windows/Fonts/arialbd.ttf"),
            Path("C:/Windows/Fonts/ariali.ttf"),
        ),
        (
            Path("/Library/Fonts/Arial.ttf"),
            Path("/Library/Fonts/Arial Bold.ttf"),
            Path("/Library/Fonts/Arial Italic.ttf"),
        ),
        (
            Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Regular.ttf"),
            Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf"),
            Path("/usr/share/fonts/truetype/liberation2/LiberationSans-Italic.ttf"),
        ),
        (
            reportlab_fonts / "Vera.ttf",
            reportlab_fonts / "VeraBd.ttf",
            reportlab_fonts / "VeraIt.ttf",
        ),
    ]

    for regular, bold, italic in font_families:
        if all(path.is_file() for path in (regular, bold, italic)):
            pdfmetrics.registerFont(TTFont("PortfolioSans", regular))
            pdfmetrics.registerFont(TTFont("PortfolioSans-Bold", bold))
            pdfmetrics.registerFont(TTFont("PortfolioSans-Italic", italic))
            pdfmetrics.registerFontFamily(
                "PortfolioSans",
                normal="PortfolioSans",
                bold="PortfolioSans-Bold",
                italic="PortfolioSans-Italic",
                boldItalic="PortfolioSans-Bold",
            )
            return

    raise FileNotFoundError("No supported Unicode sans-serif font family was found.")


def make_styles() -> dict[str, ParagraphStyle]:
    styles = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=styles["Title"],
            fontName="PortfolioSans-Bold",
            fontSize=24,
            leading=27,
            textColor=INK,
            alignment=TA_CENTER,
            spaceAfter=4,
        ),
        "headline": ParagraphStyle(
            "Headline",
            parent=styles["Normal"],
            fontName="PortfolioSans-Bold",
            fontSize=9.4,
            leading=12,
            textColor=ACCENT,
            alignment=TA_CENTER,
            spaceAfter=5,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=styles["Normal"],
            fontName="PortfolioSans",
            fontSize=7.8,
            leading=11,
            textColor=MUTED,
            alignment=TA_CENTER,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=styles["Heading2"],
            fontName="PortfolioSans-Bold",
            fontSize=9,
            leading=11,
            textColor=ACCENT,
            spaceBefore=6,
            spaceAfter=2,
            uppercase=True,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=styles["BodyText"],
            fontName="PortfolioSans",
            fontSize=8.2,
            leading=11.2,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=3,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=styles["BodyText"],
            fontName="PortfolioSans-Bold",
            fontSize=8.7,
            leading=11.5,
            textColor=INK,
            alignment=TA_LEFT,
            spaceBefore=2,
            spaceAfter=1,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=styles["BodyText"],
            fontName="PortfolioSans-Italic",
            fontSize=7.7,
            leading=10,
            textColor=MUTED,
            alignment=TA_LEFT,
            spaceAfter=1,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=styles["BodyText"],
            fontName="PortfolioSans",
            leftIndent=9,
            firstLineIndent=-6,
            fontSize=7.8,
            leading=10.3,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=1.2,
        ),
        "compact": ParagraphStyle(
            "Compact",
            parent=styles["BodyText"],
            fontName="PortfolioSans",
            fontSize=7.8,
            leading=10.4,
            textColor=INK,
            alignment=TA_LEFT,
            spaceAfter=2,
        ),
    }


def section(title: str, style: ParagraphStyle) -> list[object]:
    return [
        Paragraph(title.upper(), style),
        HRFlowable(width="100%", thickness=0.55, color=RULE, spaceBefore=0, spaceAfter=3),
    ]


def linked_text(href: str, label: str, color: str = "#555B56") -> str:
    return f'<link href="{href}" color="{color}">{label}</link>'


def make_footer(content: CvContent):
    def footer(canvas, document) -> None:
        canvas.saveState()
        canvas.setTitle(content["title"])
        canvas.setAuthor("Daniel Laky")
        canvas.setSubject(content["subject"])
        canvas.setCreator("Daniel Laky Portfolio")
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.4)
        canvas.line(18 * mm, 12 * mm, A4[0] - 18 * mm, 12 * mm)
        canvas.setFillColor(MUTED)
        canvas.setFont("PortfolioSans", 6.8)
        canvas.drawString(18 * mm, 8.2 * mm, content["footer"])
        page_label = "Strana" if content["language"] == "sk" else "Page"
        canvas.drawRightString(A4[0] - 18 * mm, 8.2 * mm, f"{page_label} {document.page}")
        canvas.restoreState()

    return footer


def build_cv(content: CvContent, output_path: Path) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    styles = make_styles()
    document = SimpleDocTemplate(
        str(output_path),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=14 * mm,
        bottomMargin=18 * mm,
        title=content["title"],
        author="Daniel Laky",
        subject=content["subject"],
    )

    story: list[object] = [
        Paragraph("Daniel Laky", styles["name"]),
        Paragraph(content["headline"], styles["headline"]),
        Paragraph(
            f'{content["location"]} &nbsp; | &nbsp; '
            f'{linked_text(PHONE_LINK, PHONE_DISPLAY)} &nbsp; | &nbsp; '
            f'{linked_text(f"mailto:{RECRUITMENT_EMAIL}", RECRUITMENT_EMAIL)}',
            styles["contact"],
        ),
        Paragraph(
            f'{content["portfolio_label"]}: '
            f'{linked_text(PORTFOLIO_URL, PORTFOLIO_URL)} &nbsp; | &nbsp; '
            f'{content["business_email_label"]}: '
            f'{linked_text(f"mailto:{BUSINESS_EMAIL}", BUSINESS_EMAIL)}',
            styles["contact"],
        ),
        Paragraph(
            f'{content["linkedin_label"]}: {linked_text(LINKEDIN_URL, LINKEDIN_URL)}'
            f' &nbsp; | &nbsp; {content["github_label"]}: {linked_text(GITHUB_URL, GITHUB_URL)}',
            styles["contact"],
        ),
        Paragraph(
            f'{linked_text(PORTFOLIO_URL, content["portfolio_prompt"], "#8A5D2E")} '
            f'{linked_text(LINKEDIN_URL, content["linkedin_prompt"], "#8A5D2E")}',
            styles["contact"],
        ),
        Spacer(1, 4),
    ]

    story.extend(section(content["sections"]["summary"], styles["section"]))
    story.append(Paragraph(content["summary"], styles["body"]))

    story.extend(section(content["sections"]["experience"], styles["section"]))
    for role in content["roles"]:
        story.append(Paragraph(f'{role["title"]} | {role["company"]}', styles["role"]))
        story.append(Paragraph(role["meta"], styles["meta"]))
        story.extend(Paragraph(f'- {item}', styles["bullet"]) for item in role["bullets"])

    story.extend(section(content["sections"]["projects"], styles["section"]))
    for project in content["projects"]:
        story.append(
            Paragraph(
                f'<b>{project["title"]} - {project["status"]}:</b> {project["description"]}',
                styles["compact"],
            )
        )

    story.extend(section(content["sections"]["education"], styles["section"]))
    story.extend(Paragraph(item, styles["compact"]) for item in content["education"])

    story.extend(section(content["sections"]["skills"], styles["section"]))
    story.extend(
        Paragraph(f"<b>{label}:</b> {description}", styles["compact"])
        for label, description in content["skills"]
    )

    footer = make_footer(content)
    document.build(story, onFirstPage=footer, onLaterPages=footer)


def build_all() -> None:
    register_fonts()
    PUBLIC_DIRECTORY.mkdir(parents=True, exist_ok=True)
    ARTIFACT_DIRECTORY.mkdir(parents=True, exist_ok=True)

    outputs = [
        (ENGLISH, ENGLISH_FILENAME),
        (SLOVAK, SLOVAK_FILENAME),
    ]
    for content, filename in outputs:
        public_path = PUBLIC_DIRECTORY / filename
        build_cv(content, public_path)
        shutil.copy2(public_path, ARTIFACT_DIRECTORY / filename)


if __name__ == "__main__":
    build_all()
