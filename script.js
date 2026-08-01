const portfolio = {
  id: 'root',
  index: 'CORE',
  label: 'Daniel Laky',
  subtitle: 'Customer support · Operations · Digital projects · Business development',
  kicker: 'DANIEL LAKY',
  title: 'Customer support, operations and digital projects',
  summary: 'A systems-minded entrepreneurial builder combining practical work experience with business, technology and creative execution.',
  status: 'Open to remote opportunities',
  points: [
    'Based in Senec, Slovakia, with recent international work experience in the Netherlands and Prague.',
    'Developing service, software and creative projects with a focus on useful outcomes rather than decorative activity.',
    'Interested in remote roles where customer understanding, operations, business thinking and digital tools overlap.'
  ],
  tags: ['Business', 'Operations', 'Customer support', 'Digital projects', 'AI-assisted work'],
  links: [
    { label: 'LinkedIn profile', href: 'https://sk.linkedin.com/in/daniel-laky-141a9b350' },
    { label: 'GitHub profile', href: 'https://github.com/daniel-techAI' }
  ],
  children: [
    {
      id: 'about', index: '01', label: 'About', subtitle: 'Direction, mindset and working style', kicker: 'ABOUT', title: 'Strategy connected to execution', status: 'Current',
      summary: 'I work best where a vague goal has to become a clear system, offer, product or operating plan.',
      points: ['Business-first and systems-oriented thinking', 'Fast learning through building and iteration', 'Direct communication without inflated claims'],
      tags: ['Systems thinking', 'Ownership', 'Adaptability'],
      children: [
        { id: 'direction', index: 'A1', label: 'Direction', subtitle: 'Remote income and scalable businesses', kicker: 'LONG-TERM DIRECTION', title: 'Build options, not just obligations', status: 'Active', summary: 'The long-term objective is financial independence through useful skills, remote work, productized services and scalable digital assets.', points: ['Remote income and location flexibility', 'Compounding skill and project portfolio', 'Deliberate secondary tracks in fitness and creative work'], tags: ['Independence', 'Leverage', 'Consistency'] },
        { id: 'working-style', index: 'A2', label: 'Working style', subtitle: 'Analyse, structure, execute, improve', kicker: 'WORKING STYLE', title: 'Complexity reduced into a route', status: 'Active', summary: 'I naturally examine problems from multiple angles, then reduce them into priorities, constraints and an immediate next action.', points: ['Question assumptions before execution', 'Prefer measurable progress over hype', 'Keep quality high without waiting for theoretical perfection'], tags: ['Analysis', 'Planning', 'Iteration'] },
        { id: 'value', index: 'A3', label: 'Value', subtitle: 'Commercial sense with creative range', kicker: 'VALUE PROPOSITION', title: 'Connect the business goal to the actual work', status: 'Active', summary: 'My strongest advantage is combining customer awareness, operational realism, design judgement and emerging technical capability.', points: ['Translate ideas into clear offers and interfaces', 'Understand both front-line customer contact and back-end execution', 'Use AI as an execution tool, not a substitute for judgement'], tags: ['Commercial thinking', 'Design sense', 'AI fluency'] }
      ]
    },
    {
      id: 'experience', index: '02', label: 'Experience', subtitle: 'Customer-facing and operational work', kicker: 'EXPERIENCE', title: 'Practical work across sales and production', status: 'Current',
      summary: 'Front-line experience developed through customer service, retail sales and international production operations.',
      points: ['Working in different countries and operating environments', 'Customer communication and product guidance', 'Reliability, safety and execution under real constraints'],
      tags: ['Retail', 'Operations', 'International experience'],
      children: [
        { id: 'otto', index: 'E1', label: 'OTTO Work Force B.V.', subtitle: 'Production employee · Netherlands', kicker: 'JULY 2026 — PRESENT', title: 'Production Employee', status: 'Current role', summary: 'Production work in the Netherlands through OTTO Work Force B.V., supporting day-to-day operational output in an international environment.', points: ['Production, packing and order-related tasks as assigned', 'Following workplace safety, hygiene and operational instructions', 'Adapting to international housing, transport and work systems'], tags: ['Production', 'Operations', 'Netherlands'] },
        { id: 'footlocker', index: 'E2', label: 'Foot Locker', subtitle: 'Sales assistant · Prague', kicker: 'OCTOBER 2025 — JUNE 2026', title: 'Sales Assistant', status: 'Completed', summary: 'Customer-facing retail role focused on helping customers, supporting store operations and representing products clearly.', points: ['Customer assistance and product recommendations', 'Sales-floor presentation and stock support', 'Communication in a busy international retail environment'], tags: ['Sales', 'Customer service', 'Retail'] },
        { id: 'independent-work', index: 'E3', label: 'Independent projects', subtitle: 'Digital products, websites and creative work', kicker: 'ONGOING', title: 'Independent digital project work', status: 'Active', summary: 'Self-directed work developing offers, product concepts, interfaces, brand systems and AI-assisted workflows.', points: ['Research and offer development', 'Website and product prototyping', 'Creative direction and content systems'], tags: ['Entrepreneurship', 'Digital', 'Creative'] }
      ]
    },
    {
      id: 'projects', index: '03', label: 'Projects', subtitle: 'Services, software and creative systems', kicker: 'PROJECTS', title: 'Building three serious tracks', status: 'In development',
      summary: 'The current project portfolio balances a near-term service cash engine, a private software concept and a long-term creative brand.',
      points: ['Growthstack: productized website and growth services', 'Klinepilot: early-stage private digital product', 'Emotecture Studio: creative and apparel brand in pre-launch'],
      tags: ['Services', 'Software', 'Brand'],
      children: [
        { id: 'growthstack', index: 'P1', label: 'Growthstack', subtitle: 'Website and growth service', kicker: 'CASH-ENGINE PROJECT', title: 'Websites that improve credibility and enquiries', status: 'Launch-first', summary: 'A focused service helping small businesses improve their websites and turn more visitors into enquiries or bookings.', points: ['Website build and mobile optimisation', 'Copy cleanup and offer structure', 'Enquiry or booking flow, domain, hosting and analytics', 'Initial objective: first paying client and case study'], tags: ['Web services', 'Small business', 'Lead generation'] },
        { id: 'klinepilot', index: 'P2', label: 'Klinepilot', subtitle: 'Private early-stage digital product', kicker: 'SOFTWARE PROJECT', title: 'From user problem to focused product', status: 'Early stage', summary: 'A private software project currently centred on user research, feature planning, interface concepts and AI-assisted development.', points: ['User problem and product framing', 'Core feature prioritisation', 'UX research and interface work', 'Technical development and roadmap'], tags: ['Product strategy', 'UX', 'AI-assisted development'] },
        { id: 'emotecture', index: 'P3', label: 'Emotecture Studio', subtitle: 'Creative, apparel and art direction', kicker: 'LONG-TERM CREATIVE BRAND', title: 'Emotion structured into visual identity', status: 'Pre-launch', summary: 'A creative studio and apparel direction combining clothing, accessories, artwork and custom fashion through a distinctive gothic and cybersigil visual language.', points: ['Three-product capsule before expansion', 'Samples, costs, content and waitlist before inventory', 'Cathedral forms, distressed textures and symbolic systems', 'No false launch theatre or oversized stock order'], tags: ['Apparel', 'Art direction', 'Brand system'] },
        { id: 'hades-theory', index: 'P4', label: 'Hades Theory', subtitle: 'Conceptual media and storytelling', kicker: 'MEDIA PROJECT', title: 'Psychology, identity and transformation', status: 'Active concept', summary: 'A symbolic content project exploring discipline, shadow, perception, identity and personal transformation.', points: ['Short-form visual storytelling', 'Philosophical and psychological themes', 'Distinctive symbolic art direction'], tags: ['Content', 'Psychology', 'Storytelling'] },
        { id: 'microlearning', index: 'P5', label: 'Microlearning feed', subtitle: 'A useful alternative to doomscrolling', kicker: 'PRODUCT CONCEPT', title: 'Scroll, but leave smarter', status: 'Concept development', summary: 'A scrolling learning app designed to replace passive doomscrolling with concise lessons across business, economics and practical skills.', points: ['Fast lesson consumption', 'Personalised topic feeds', 'Retention and progression mechanics', 'AI-supported content operations with human quality control'], tags: ['EdTech', 'Product design', 'Microlearning'] }
      ]
    },
    {
      id: 'skills', index: '04', label: 'Skills', subtitle: 'Commercial, operational and digital capability', kicker: 'SKILLS', title: 'A deliberately broad, connected skill stack', status: 'Developing',
      summary: 'The strongest combination is not one isolated skill. It is the connection between customer understanding, business structure, visual judgement and digital execution.',
      points: ['Customer communication and sales support', 'Website strategy, structure and responsive design', 'AI-assisted research, workflows and prototyping'],
      tags: ['Commercial', 'Digital', 'Creative'],
      children: [
        { id: 'customer-commercial', index: 'S1', label: 'Customer & commercial', subtitle: 'Support, sales and offer clarity', kicker: 'CUSTOMER & COMMERCIAL', title: 'Understand the person before optimising the process', status: 'Practical experience', summary: 'Customer-facing experience supports clearer communication, stronger offers and more realistic business decisions.', points: ['Customer support and needs discovery', 'Retail sales and product explanation', 'Offer positioning and conversion thinking'], tags: ['Support', 'Sales', 'Positioning'] },
        { id: 'operations', index: 'S2', label: 'Operations', subtitle: 'Structure, reliability and execution', kicker: 'OPERATIONS', title: 'Make the work repeatable', status: 'Practical experience', summary: 'Operational thinking means turning expectations into steps, standards and repeatable workflows.', points: ['Task prioritisation and process discipline', 'International work adaptability', 'Documentation and practical quality control'], tags: ['Process', 'Reliability', 'Execution'] },
        { id: 'digital', index: 'S3', label: 'Web & digital', subtitle: 'Sites, interfaces and systems', kicker: 'WEB & DIGITAL', title: 'Build a credible digital surface', status: 'Active development', summary: 'Website and product work focused on responsive structure, clear messaging, maintainability and user action.', points: ['Responsive website structure', 'Interface and interaction concepts', 'Hosting, domains, analytics and lead capture planning'], tags: ['HTML/CSS/JS', 'UX', 'Web strategy'] },
        { id: 'ai', index: 'S4', label: 'AI workflows', subtitle: 'Research, automation and assisted building', kicker: 'AI WORKFLOWS', title: 'Use AI where it creates leverage', status: 'Active development', summary: 'AI is applied to research, content operations, product planning, prototyping and repetitive workflows with human judgement kept in the loop.', points: ['Prompt and workflow design', 'AI-assisted research and synthesis', 'Agent and automation concepts'], tags: ['AI fluency', 'Automation', 'Quality control'] },
        { id: 'creative', index: 'S5', label: 'Creative direction', subtitle: 'Brand systems and distinctive visual work', kicker: 'CREATIVE DIRECTION', title: 'Build identity people can actually remember', status: 'Active practice', summary: 'Creative work ranges from clean commercial presentation to gothic and cybersigil-inspired apparel and symbolic art.', points: ['Brand and visual direction', 'Concept development and storytelling', 'Apparel graphics and symbolic composition'], tags: ['Branding', 'Design', 'Art direction'] }
      ]
    },
    {
      id: 'certifications', index: '05', label: 'Certifications', subtitle: 'Planned learning and earned credentials', kicker: 'CERTIFICATIONS', title: 'A transparent learning roadmap', status: 'Planned',
      summary: 'Credentials are listed honestly. Planned courses remain planned until completed, because certificates are not Pokémon and there is no prize for pretending to collect them.',
      points: ['Priority: AI foundations and practical workflow fluency', 'Priority: inbound sales, marketing and analytics', 'Priority: visible practical GitHub work'],
      tags: ['Planned', 'No credential inflation', 'Learning roadmap'],
      children: [
        { id: 'openai-foundations', index: 'C1', label: 'OpenAI AI Foundations', subtitle: 'Course-completion certificate', kicker: 'PRIORITY 1', title: 'OpenAI AI Foundations', status: 'Planned', summary: 'Foundational AI learning intended to strengthen practical understanding and responsible use.', points: ['Provider: OpenAI Academy', 'Estimated short completion format', 'Will be marked completed only after evidence exists'], tags: ['AI', 'Foundations', 'Planned'], links: [{ label: 'Course', href: 'https://academy.openai.com/public/courses/ai-foundations-juzjs?autoEnroll=true' }] },
        { id: 'hubspot-inbound', index: 'C2', label: 'HubSpot Inbound', subtitle: 'HubSpot Academy certification', kicker: 'PRIORITY 1', title: 'HubSpot Inbound Certification', status: 'Planned', summary: 'Inbound methodology covering how businesses attract, engage and support customers.', points: ['Customer-centred growth framework', 'Relevant to sales, marketing and service work', 'Status remains planned until completed'], tags: ['Inbound', 'HubSpot', 'Planned'], links: [{ label: 'Course', href: 'https://academy.hubspot.com/courses/inbound' }] },
        { id: 'anthropic-fluency', index: 'C3', label: 'Anthropic AI Fluency', subtitle: 'Framework and foundations', kicker: 'PRIORITY 1', title: 'AI Fluency: Framework & Foundations', status: 'Planned', summary: 'A short course focused on understanding and applying AI fluently rather than merely pressing the shiny button.', points: ['Provider: Anthropic', 'Foundational AI framework', 'Status remains planned until completed'], tags: ['AI fluency', 'Anthropic', 'Planned'], links: [{ label: 'Course', href: 'https://anthropic.skilljar.com/ai-fluency-framework-foundations' }] },
        { id: 'google-analytics', index: 'C4', label: 'Google Analytics', subtitle: 'Google Skillshop certification', kicker: 'NEXT PRIORITY', title: 'Google Analytics Certification', status: 'Planned', summary: 'Analytics training intended to support evidence-based website, marketing and product decisions.', points: ['Measurement and reporting', 'Relevant to Growthstack service delivery', 'Status remains planned until completed'], tags: ['Analytics', 'Google', 'Planned'], links: [{ label: 'Skillshop', href: 'https://skillshop.withgoogle.com/' }] },
        { id: 'github-skills', index: 'C5', label: 'GitHub Skills', subtitle: 'Practical repository courses', kicker: 'PRACTICAL TRACK', title: 'GitHub Skills learning path', status: 'Planned / in progress', summary: 'Practical courses that produce visible repository activity rather than another ceremonial multiple-choice badge.', points: ['Introduction to GitHub and Git', 'GitHub Pages and Actions', 'Markdown, Copilot and testing workflows'], tags: ['GitHub', 'Practical', 'Portfolio evidence'], links: [{ label: 'GitHub Skills', href: 'https://skills.github.com/' }] }
      ]
    },
    {
      id: 'education', index: '06', label: 'Education', subtitle: 'Business, economics and hospitality', kicker: 'EDUCATION', title: 'Commercial studies grounded in service experience', status: 'Completed / attended',
      summary: 'Education combines hospitality and gastronomy training with later business and economics studies.',
      points: ['Hotel Academy, 2020–2025', 'VŠE business and economics studies, 2025–2026', 'VŠE entry is not presented as a completed degree'],
      tags: ['Business', 'Economics', 'Hospitality'],
      children: [
        { id: 'vse', index: 'ED1', label: 'VŠE', subtitle: 'Business and economics studies · 2025–2026', kicker: '2025 — 2026', title: 'Prague University of Economics and Business', status: 'Studies attended', summary: 'Business and economics studies at VŠE in Prague. This is intentionally not described as a completed degree.', points: ['Business and economics exposure', 'Academic development alongside work and projects', 'No completed-degree claim'], tags: ['VŠE', 'Business', 'Economics'] },
        { id: 'hotel-academy', index: 'ED2', label: 'Hotel Academy', subtitle: 'Hospitality and gastronomy · 2020–2025', kicker: '2020 — 2025', title: 'Hotel Academy', status: 'Completed', summary: 'Secondary education focused on hospitality, gastronomy, service and commercial operations.', points: ['Hospitality and customer service foundation', 'Gastronomy and practical service environment', 'Operational and communication discipline'], tags: ['Hospitality', 'Gastronomy', 'Service'] }
      ]
    },
    {
      id: 'contact', index: '07', label: 'Contact', subtitle: 'Remote roles, collaboration and project work', kicker: 'CONTACT', title: 'Open to useful conversations', status: 'Available',
      summary: 'Currently open to remote opportunities and selected collaboration across customer support, operations, business development, websites and digital projects.',
      points: ['Location: Senec, Slovakia', 'LinkedIn: Daniel Laky', 'GitHub: daniel-techAI', 'A public email can be added later when ready'],
      tags: ['Remote', 'Slovakia', 'Collaboration'],
      links: [
        { label: 'LinkedIn profile', href: 'https://sk.linkedin.com/in/daniel-laky-141a9b350' },
        { label: 'GitHub profile', href: 'https://github.com/daniel-techAI' }
      ]
    }
  ]
};

const colors = ['#b8ff65', '#6ed7ff', '#a98cff', '#ffbd6e', '#ff7e91', '#79f0cf', '#d7a7ff'];
const state = { path: [], selectedId: 'root', scale: window.innerWidth < 760 ? 0.58 : 0.82, x: 0, y: 0, dragging: false, startX: 0, startY: 0 };

const els = {
  breadcrumbs: document.getElementById('breadcrumbs'),
  viewTitle: document.getElementById('viewTitle'),
  mapViewport: document.getElementById('mapViewport'),
  mapStage: document.getElementById('mapStage'),
  mapLines: document.getElementById('mapLines'),
  mapNodes: document.getElementById('mapNodes'),
  backButton: document.getElementById('backButton'),
  zoomIn: document.getElementById('zoomIn'),
  zoomOut: document.getElementById('zoomOut'),
  resetView: document.getElementById('resetView'),
  detailIndex: document.getElementById('detailIndex'),
  detailStatus: document.getElementById('detailStatus'),
  detailProfile: document.getElementById('detailProfile'),
  detailKicker: document.getElementById('detailKicker'),
  detailTitle: document.getElementById('detailTitle'),
  detailSummary: document.getElementById('detailSummary'),
  detailPoints: document.getElementById('detailPoints'),
  detailTags: document.getElementById('detailTags'),
  detailLinks: document.getElementById('detailLinks'),
  detailEnter: document.getElementById('detailEnter'),
  statusButton: document.getElementById('statusButton')
};

function getNodeByPath(path) {
  let node = portfolio;
  for (const id of path) {
    const next = node.children?.find(child => child.id === id);
    if (!next) break;
    node = next;
  }
  return node;
}

function findNodeInView(id) {
  const current = getNodeByPath(state.path);
  if (current.id === id) return current;
  return current.children?.find(child => child.id === id) || current;
}

function titleCase(value) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

function updateHash(replace = false) {
  const hash = '#/' + state.path.join('/');
  if (replace) history.replaceState({ path: state.path }, '', hash);
  else history.pushState({ path: state.path }, '', hash);
}

function parseHash() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const valid = [];
  let node = portfolio;
  for (const id of parts) {
    const next = node.children?.find(child => child.id === id);
    if (!next) break;
    valid.push(id);
    node = next;
  }
  state.path = valid;
  state.selectedId = node.id;
}

function layoutNodes(count) {
  const center = { x: 620, y: 380 };
  if (count <= 0) return { center, positions: [] };
  const radiusX = count > 5 ? 430 : 390;
  const radiusY = count > 5 ? 270 : 235;
  const start = -Math.PI / 2;
  return {
    center,
    positions: Array.from({ length: count }, (_, index) => {
      const angle = start + (Math.PI * 2 * index) / count;
      return { x: center.x + Math.cos(angle) * radiusX, y: center.y + Math.sin(angle) * radiusY };
    })
  };
}

function createLine(x1, y1, x2, y2, active) {
  const dx = (x2 - x1) * 0.45;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
  path.setAttribute('class', `map-line${active ? ' active' : ''}`);
  return path;
}

function renderMap() {
  const current = getNodeByPath(state.path);
  const children = current.children || [];
  const { center, positions } = layoutNodes(children.length);
  els.viewTitle.textContent = current.id === 'root' ? 'Portfolio overview' : current.label;
  els.backButton.disabled = state.path.length === 0;
  els.mapNodes.innerHTML = '';
  els.mapLines.innerHTML = '';
  els.mapLines.setAttribute('viewBox', '0 0 1240 760');

  const centerButton = document.createElement('button');
  centerButton.className = `map-node center-node${state.selectedId === current.id ? ' selected' : ''}`;
  centerButton.style.left = `${center.x}px`;
  centerButton.style.top = `${center.y}px`;
  centerButton.dataset.id = current.id;
  centerButton.innerHTML = `<span class="node-index">${current.index}</span><strong>${current.label}</strong><small>${current.subtitle}</small><i class="node-dot" style="--node-color:${colors[0]}"></i>`;
  centerButton.addEventListener('click', () => selectNode(current.id));
  els.mapNodes.appendChild(centerButton);

  children.forEach((child, index) => {
    const position = positions[index];
    els.mapLines.appendChild(createLine(center.x, center.y, position.x, position.y, state.selectedId === child.id));
    const button = document.createElement('button');
    button.className = `map-node${state.selectedId === child.id ? ' selected' : ''}`;
    button.style.left = `${position.x}px`;
    button.style.top = `${position.y}px`;
    button.dataset.id = child.id;
    button.innerHTML = `<span class="node-index">${child.index}</span><strong>${child.label}</strong><small>${child.subtitle}</small><i class="node-dot" style="--node-color:${colors[index % colors.length]}"></i>`;
    button.addEventListener('click', () => selectNode(child.id));
    button.addEventListener('dblclick', () => child.children?.length && enterNode(child.id));
    els.mapNodes.appendChild(button);
  });

  renderBreadcrumbs();
  applyTransform();
}

function renderBreadcrumbs() {
  const crumbs = [{ label: 'Overview', path: [] }];
  let node = portfolio;
  const built = [];
  for (const id of state.path) {
    node = node.children.find(child => child.id === id);
    built.push(id);
    crumbs.push({ label: node.label, path: [...built] });
  }
  els.breadcrumbs.innerHTML = '';
  crumbs.forEach((crumb, index) => {
    if (index > 0) {
      const separator = document.createElement('span');
      separator.className = 'breadcrumb-separator';
      separator.textContent = '/';
      els.breadcrumbs.appendChild(separator);
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = crumb.label;
    button.addEventListener('click', () => navigateTo(crumb.path));
    els.breadcrumbs.appendChild(button);
  });
}

function renderDetail(node) {
  els.detailIndex.textContent = node.index || '—';
  els.detailStatus.textContent = node.status || 'Active';
  els.detailKicker.textContent = node.kicker || titleCase(node.id);
  els.detailTitle.textContent = node.title || node.label;
  els.detailSummary.textContent = node.summary || '';
  els.detailPoints.innerHTML = (node.points || []).map(point => `<li>${point}</li>`).join('');
  els.detailTags.innerHTML = (node.tags || []).map(tag => `<span>${tag}</span>`).join('');
  els.detailLinks.innerHTML = (node.links || []).map(link => `<a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join('');
  els.detailProfile.hidden = node.id !== 'root';
  const canEnter = Boolean(node.children?.length) && node.id !== getNodeByPath(state.path).id;
  els.detailEnter.hidden = !canEnter;
  els.detailEnter.dataset.id = canEnter ? node.id : '';
}

function selectNode(id) {
  state.selectedId = id;
  const node = findNodeInView(id);
  renderDetail(node);
  renderMap();
}

function enterNode(id) {
  const node = findNodeInView(id);
  if (!node.children?.length) return;
  state.path.push(id);
  state.selectedId = id;
  resetTransform(false);
  updateHash();
  renderDetail(node);
  renderMap();
}

function navigateTo(path, push = true) {
  state.path = [...path];
  const node = getNodeByPath(state.path);
  state.selectedId = node.id;
  resetTransform(false);
  if (push) updateHash();
  renderDetail(node);
  renderMap();
}

function goBack() {
  if (!state.path.length) return;
  state.path.pop();
  const node = getNodeByPath(state.path);
  state.selectedId = node.id;
  resetTransform(false);
  updateHash();
  renderDetail(node);
  renderMap();
}

function applyTransform() {
  els.mapStage.style.transform = `translate(calc(-50% + ${state.x}px), calc(-50% + ${state.y}px)) scale(${state.scale})`;
}

function resetTransform(render = true) {
  state.scale = window.innerWidth < 760 ? 0.58 : 0.82;
  state.x = 0;
  state.y = 0;
  if (render) applyTransform();
}

els.detailEnter.addEventListener('click', () => enterNode(els.detailEnter.dataset.id));
els.backButton.addEventListener('click', goBack);
els.zoomIn.addEventListener('click', () => { state.scale = Math.min(1.25, state.scale + .1); applyTransform(); });
els.zoomOut.addEventListener('click', () => { state.scale = Math.max(.38, state.scale - .1); applyTransform(); });
els.resetView.addEventListener('click', () => resetTransform());
els.statusButton.addEventListener('click', () => navigateTo(['contact']));

els.mapViewport.addEventListener('pointerdown', event => {
  if (event.target.closest('button')) return;
  state.dragging = true;
  state.startX = event.clientX - state.x;
  state.startY = event.clientY - state.y;
  els.mapViewport.setPointerCapture(event.pointerId);
});
els.mapViewport.addEventListener('pointermove', event => {
  if (!state.dragging) return;
  state.x = event.clientX - state.startX;
  state.y = event.clientY - state.startY;
  applyTransform();
});
els.mapViewport.addEventListener('pointerup', () => { state.dragging = false; });
els.mapViewport.addEventListener('pointercancel', () => { state.dragging = false; });
els.mapViewport.addEventListener('wheel', event => {
  event.preventDefault();
  state.scale = Math.max(.38, Math.min(1.25, state.scale + (event.deltaY < 0 ? .06 : -.06)));
  applyTransform();
}, { passive: false });

els.mapViewport.addEventListener('keydown', event => {
  if (event.key === 'Escape' || event.key === 'Backspace') {
    event.preventDefault();
    goBack();
  }
  if (event.key === '+' || event.key === '=') {
    event.preventDefault();
    els.zoomIn.click();
  }
  if (event.key === '-') {
    event.preventDefault();
    els.zoomOut.click();
  }
});

window.addEventListener('popstate', () => {
  parseHash();
  resetTransform(false);
  renderDetail(getNodeByPath(state.path));
  renderMap();
});

window.addEventListener('resize', () => {
  if (window.innerWidth < 760 && state.scale > .72) state.scale = .58;
  applyTransform();
});

document.getElementById('year').textContent = new Date().getFullYear();
if (!location.hash) history.replaceState({ path: [] }, '', '#/');
parseHash();
renderDetail(getNodeByPath(state.path));
renderMap();
