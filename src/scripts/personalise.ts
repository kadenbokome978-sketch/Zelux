// "See it with your business": the visitor types a business name and picks a trade, and the
// example sites on the page (hero phone, build week, closing band) re-dress themselves as theirs.
// Pure templating on the visitor's device. Nothing is sent anywhere; it lasts for the browser tab only.

export type Trade = {
  label: string;
  name: string; // made-up default business name
  sub: string;
  kicker: string;
  h1: string;
  cta: string;
  ghost: string;
  trust: [string, string];
  services: [string, string][];
  note: string;
  notes: string[]; // Day 1 call notes in the build week
  colors: { bg: string; soft: string; line: string; ac: string; acInk: string; ink: string };
  icon?: string; // 24px stroke path for the hero art (plumber keeps the van)
};

export const trades: Record<string, Trade> = {
  plumber: {
    label: 'Plumber', name: 'Brookfield', sub: 'Plumbing & Heating', kicker: 'Gas Safe · Same-week visits',
    h1: 'Boiler playing up? Book a visit in two taps.', cta: 'Book a visit', ghost: 'Call us',
    trust: ['Fixed prices before you book', 'Same-week visits'],
    services: [['Boiler service', 'from £85'], ['Leak or repair', 'from £60'], ['New radiator', 'from £180']],
    note: 'We’ll text when we’re on the way.',
    notes: ['Missed calls while on jobs = missed work', 'Wants online booking with real slots', '5 pages, prices shown up front', 'Keep the van photo, lose the clip art'],
    colors: { bg: '#0e3b2f', soft: '#15493b', line: '#2a5a4b', ac: '#f2b33d', acInk: '#1d1a10', ink: '#f3f1e7' },
  },
  electrician: {
    label: 'Electrician', name: 'Brightwire', sub: 'Electrical', kicker: 'NICEIC approved · Local',
    h1: 'Lights tripping? Book an electrician in two taps.', cta: 'Book a visit', ghost: 'Call us',
    trust: ['Fixed prices before you book', 'Certificates sent by email'],
    services: [['Fault finding', '1 hr'], ['New sockets', 'Half day'], ['EV charger', 'Full day']],
    note: 'We’ll text when we’re on the way.',
    notes: ['Quotes chased by phone every evening', 'Wants booking for small jobs', 'Show the EV charger work', 'Certificates sent automatically'],
    colors: { bg: '#14183a', soft: '#1e2452', line: '#323a72', ac: '#facc15', acInk: '#1a1600', ink: '#eef0ff' },
    icon: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  },
  salon: {
    label: 'Hair salon', name: 'Studio Nine', sub: 'Hair & colour', kicker: 'Open late Thursdays',
    h1: 'New look? Book your chair in two taps.', cta: 'Book a chair', ghost: 'Call us',
    trust: ['Pick your stylist', 'Reminder the day before'],
    services: [['Cut & finish', '45 min'], ['Colour', '2 hrs'], ['Blow-dry', '30 min']],
    note: 'We’ll send a reminder the day before.',
    notes: ['Phone rings mid-appointment', 'Wants clients to pick their stylist', 'Fewer no-shows', 'Gallery of real work'],
    colors: { bg: '#f6e4e9', soft: '#efd2da', line: '#e2b9c5', ac: '#9d2b52', acInk: '#fff6f8', ink: '#3a1d27' },
    icon: 'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.1 7.9 20 20M8.1 16.1 20 4',
  },
  cafe: {
    label: 'Café or bakery', name: 'Corner Loaf', sub: 'Bakery & coffee', kicker: 'Order by 8pm, collect from 7:30',
    h1: 'Skip the queue. Order ahead in two taps.', cta: 'Order ahead', ghost: 'Menu',
    trust: ['Pay online', 'Collect without queueing'],
    services: [['Sourdough loaf', 'Tomorrow'], ['Breakfast box', 'From 7:30'], ['Flat white', 'Ready in 5']],
    note: 'We’ll text when it’s ready to collect.',
    notes: ['Queues out the door at 8am', 'Wants pre-orders for tomorrow’s bake', 'Sell out, not throw away', 'Menu that’s easy to update'],
    colors: { bg: '#241e1a', soft: '#332a24', line: '#4a3e35', ac: '#e8c07a', acInk: '#241a0c', ink: '#f6ecdf' },
    icon: 'M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6V8Zm13 2h2a2 2 0 0 1 0 4h-2M8 2v3m4-3v3',
  },
  builder: {
    label: 'Builder', name: 'Oakline', sub: 'Building & renovation', kicker: 'Extensions · Lofts · Kitchens',
    h1: 'Planning a build? Book a quote visit in two taps.', cta: 'Book a quote visit', ghost: 'Our work',
    trust: ['Written quotes', 'Photos of past jobs'],
    services: [['Extensions', 'Quote visit'], ['Loft conversions', 'Quote visit'], ['Kitchens', 'Quote visit']],
    note: 'We’ll confirm the visit by text.',
    notes: ['Time-wasters booking quote visits', 'Wants photos of finished jobs up front', 'Ask budget before the visit', 'Look as solid as the work'],
    colors: { bg: '#1f2933', soft: '#2b3742', line: '#3e4c59', ac: '#f97316', acInk: '#1c0d02', ink: '#f2f4f6' },
    icon: 'M3 11 12 4l9 7M5 10v10h14V10M10 20v-6h4v6',
  },
  groomer: {
    label: 'Dog groomer', name: 'Muddy Paws', sub: 'Grooming studio', kicker: 'Small, calm, one dog at a time',
    h1: 'Pick a groom, pick a time, done.', cta: 'Book a groom', ghost: 'Prices',
    trust: ['Reminder the day before', 'Move or cancel online'],
    services: [['Bath & tidy', '45 min'], ['Full groom', '2 hrs'], ['Puppy intro', '30 min']],
    note: 'We’ll send a reminder the day before.',
    notes: ['Diary run on WhatsApp', 'Wants owners to book themselves', 'Reminders to stop no-shows', 'Friendly, not clinical'],
    colors: { bg: '#fbe9e2', soft: '#f6d7cc', line: '#ebc3b6', ac: '#a8325a', acInk: '#fff7f9', ink: '#3b1f2b' },
    icon: 'M12 13c3 0 5 3 5 5s-2 2-5 2-5 0-5-2 2-5 5-5ZM6 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm12 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM9 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z',
  },
  cleaner: {
    label: 'Cleaner', name: 'Fresh Start', sub: 'Home cleaning', kicker: 'Insured · Same cleaner each week',
    h1: 'Come home to a clean house. Book in two taps.', cta: 'Book a clean', ghost: 'Prices',
    trust: ['Same cleaner each visit', 'Pay after each clean'],
    services: [['Regular clean', '2 hrs'], ['Deep clean', '5 hrs'], ['End of tenancy', 'Full day']],
    note: 'We’ll text the day before.',
    notes: ['Booking regulars by text, one by one', 'Wants repeat bookings to run themselves', 'Clear prices per clean', 'Payment after each visit'],
    colors: { bg: '#e3f3ef', soft: '#cdeae3', line: '#acd8cd', ac: '#0f766e', acInk: '#f0fdfa', ink: '#0f3b36' },
    icon: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Zm7 11 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1L19 14Z',
  },
  garage: {
    label: 'Garage', name: 'Gearbox', sub: 'Servicing & MOTs', kicker: 'MOTs while you wait',
    h1: 'MOT due? Book it in two taps.', cta: 'Book an MOT', ghost: 'Call us',
    trust: ['Price confirmed before work', 'Text when it’s ready'],
    services: [['MOT', '1 hr'], ['Full service', 'Half day'], ['Brakes & tyres', 'Same day']],
    note: 'We’ll text when it’s ready.',
    notes: ['Phones ring all morning for MOTs', 'Wants online booking by slot', 'Reminder when MOT is due', 'Text when the car is ready'],
    colors: { bg: '#111827', soft: '#1c2533', line: '#2f3b4d', ac: '#ef4444', acInk: '#fff5f5', ink: '#f3f4f6' },
    icon: 'M3 13l2-6h14l2 6v5h-3v-2H6v2H3v-5Zm0 0h18M7 16h.01M17 16h.01',
  },
};

export type Preview = { name: string; trade: string } | null;
const KEY = 'zelux-preview';

export const load = (): Preview => {
  try { const v = sessionStorage.getItem(KEY); return v ? (JSON.parse(v) as Preview) : null; } catch { return null; }
};
export const save = (p: Preview) => {
  try { if (p) sessionStorage.setItem(KEY, JSON.stringify(p)); else sessionStorage.removeItem(KEY); } catch { /* private mode: still works for this page */ }
  window.dispatchEvent(new CustomEvent('zelux:preview', { detail: p }));
};

export const resolve = (p: Preview) => {
  const t = trades[p?.trade ?? ''] ?? trades.plumber;
  const typed = (p?.name ?? '').replace(/\s+/g, ' ').trim().slice(0, 26);
  const name = typed || t.name;
  const slug = typed.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '');
  return { t, name, typed: !!typed, initial: name.charAt(0).toUpperCase(), domain: slug ? `${slug}.co.uk` : 'yourbusiness.co.uk' };
};

export const onPreview = (fn: (p: Preview) => void) => {
  fn(load());
  window.addEventListener('zelux:preview', (e) => fn((e as CustomEvent<Preview>).detail));
};

export const paint = (el: HTMLElement, c: Trade['colors']) => {
  el.style.setProperty('--p-bg', c.bg); el.style.setProperty('--p-soft', c.soft); el.style.setProperty('--p-line', c.line);
  el.style.setProperty('--p-ac', c.ac); el.style.setProperty('--p-acink', c.acInk); el.style.setProperty('--p-ink', c.ink);
};

// Set text on every [data-p="key"] inside root
export const fill = (root: ParentNode, values: Record<string, string>) => {
  root.querySelectorAll<HTMLElement>('[data-p]').forEach((el) => {
    const v = values[el.dataset.p!];
    if (v !== undefined && el.textContent !== v) el.textContent = v;
  });
};

export const artSvg = (t: Trade) =>
  `<svg viewBox="0 0 280 130" preserveAspectRatio="xMidYMid slice"><rect width="280" height="130" fill="${t.colors.soft}"/><path d="M0 96 L40 70 L80 92 L120 62 L170 90 L210 66 L280 98 V130 H0Z" fill="${t.colors.line}" opacity=".7"/><circle cx="140" cy="62" r="34" fill="${t.colors.ac}"/><g transform="translate(122 44) scale(1.5)" fill="none" stroke="${t.colors.acInk}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${t.icon}"/></g></svg>`;
