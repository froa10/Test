// Split headings into words for the staggered reveal
document.querySelectorAll('[data-words]').forEach((el) => {
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map((w, i) => `<span class="w" style="--i:${i}">${w}</span>`).join(' ');
});

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal, [data-words], .impact').forEach((el) => io.observe(el));

// Nav: blur when scrolled, light over light sections
const nav = document.getElementById('nav');
const darkSections = [...document.querySelectorAll('.tone-dark')];
function updateNav() {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  const y = nav.offsetHeight / 2;
  const overDark = darkSections.some((s) => {
    const r = s.getBoundingClientRect();
    return r.top <= y && r.bottom >= y;
  });
  nav.classList.toggle('light', !overDark);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Parallel portals panel
const portals = ['Carrier A', 'Carrier B', 'Carrier C', 'Carrier D', 'Carrier E', 'Carrier F',
  'Carrier G', 'Carrier H', 'Carrier I', 'Carrier J', 'Carrier K', 'Carrier L'];
const grid = document.getElementById('portal-grid');
const count = document.getElementById('portal-count');
grid.innerHTML = portals.map((p) => `<li class="portal">${p}<small>Waiting…</small><span class="prog"></span></li>`).join('');

let portalTimers = [];
function runPortals() {
  portalTimers.forEach(clearTimeout);
  portalTimers = [];
  let done = 0;
  count.textContent = `0 of ${portals.length} done`;
  count.classList.remove('done');
  grid.querySelectorAll('.portal').forEach((el) => {
    const prog = el.querySelector('.prog');
    const label = el.querySelector('small');
    el.classList.remove('done');
    prog.style.transition = 'none';
    prog.style.width = '0';
    label.textContent = 'Waiting…';
    const start = 200 + Math.random() * 800;
    const dur = 1500 + Math.random() * 3500;
    portalTimers.push(setTimeout(() => {
      label.textContent = 'Filling form…';
      prog.style.transition = `width ${dur}ms linear`;
      prog.style.width = '100%';
    }, start));
    portalTimers.push(setTimeout(() => {
      el.classList.add('done');
      label.textContent = `$${(900 + Math.random() * 600).toFixed(0)}/yr`;
      done++;
      count.textContent = `${done} of ${portals.length} done`;
      if (done === portals.length) {
        count.classList.add('done');
        portalTimers.push(setTimeout(runPortals, 3500));
      }
    }, start + dur));
  });
}
new IntersectionObserver((entries, obs) => {
  if (entries[0].isIntersecting) { runPortals(); obs.disconnect(); }
}, { threshold: 0.3 }).observe(grid);

// Agent tabs (auto-rotating until the user picks one)
const agentCopy = [
  { t: 'Personal lines quoting agent', d: 'Runs auto and health quotes across carrier portals, fills every form, pulls coverages and premiums, and assembles a side-by-side comparison.' },
  { t: 'Commercial quoting agent', d: 'Packages submissions for risks no portal handles, emails them to the right markets and tracks every response in one place.' },
  { t: 'Payment check agent', d: 'Compares your records with what carriers report, flags mismatches and warns you before a policy lapses for non-payment.' },
  { t: 'Collections agent', d: 'Finds overdue premiums, sends polite reminders with a payment link and escalates to your team only when it needs a human.' },
];
const tabs = document.querySelectorAll('.agent-tabs button');
const views = document.querySelectorAll('.agent-view');
const copyEl = document.getElementById('agent-copy');
let current = 0;
let autoplay = setInterval(() => showAgent((current + 1) % tabs.length), 6000);
function showAgent(i) {
  current = i;
  tabs.forEach((t, j) => t.classList.toggle('active', i === j));
  views.forEach((v, j) => v.classList.toggle('active', i === j));
  copyEl.innerHTML = `<h3>${agentCopy[i].t}</h3><p>${agentCopy[i].d}</p><a href="#" class="link-arrow light">See the agent <span>→</span></a>`;
}
tabs.forEach((t, i) => t.addEventListener('click', () => { clearInterval(autoplay); showAgent(i); }));
showAgent(0);

// Integrations tabs
const integrations = {
  carriers: ['Carrier A', 'Carrier B', 'Carrier C', 'Carrier D', 'Carrier E', 'Carrier F',
    'Carrier G', 'Carrier H', 'Carrier I', 'Carrier J', 'Carrier K', '+ 90 more'],
  systems: ['Dynamics 365', 'Salesforce', 'HubSpot', 'Gmail', 'Outlook', 'WhatsApp', 'Excel', 'Google Sheets', 'Slack', 'SAP', 'Zoho', 'ERPs'],
};
const intGrid = document.getElementById('int-grid');
function showInt(key) {
  intGrid.innerHTML = integrations[key].map((n, i) => `<li style="animation-delay:${i * 30}ms">${n}</li>`).join('');
  document.querySelectorAll('.int-tabs button').forEach((b) => b.classList.toggle('active', b.dataset.int === key));
}
document.querySelectorAll('.int-tabs button').forEach((b) => b.addEventListener('click', () => showInt(b.dataset.int)));
showInt('carriers');
