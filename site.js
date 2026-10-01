document.documentElement.classList.add('js');

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const arrow = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/></svg>';

/* ---------- data ---------- */
const REELS = [
  ['Every business starts from zero', 'Every business starts from zero-11cf7f33', 'DddfD5cRyky'],
  ['Karna kya hai?', 'karna kya ha-babc5899', 'DdjfsqvxMwg'],
  ['Only you know your hard days', 'Only you know your hard days-cab9a82e', 'DdapOfDxwG0'],
  ['Say no to feelings', 'Say no to feelings-e4f24458', 'Ddfrr6wseuW'],
  ['Fear is temporary, regret is forever', 'Fear is temporary, Regret is forever-677c6caa', 'DdYUe29xE3Y'],
  ['Investor ko kya chahiye?', 'Investor ko kya chahiye-60eb65b8', 'DdBKXzhxkiY'],
  ['No risk no story', 'No risk no story-724db17c', 'Dc8ARykxvJe'],
  ['Hardships make you a man', 'Hardships make you a man-24fa52e5', 'Dc5ZqKlRvWm'],
  ['Face your fears', 'Face your fears-5a531736', 'Dc2-wmeRpEk'],
  ['One decision can change your life', 'One decision can change your life-bb031985', 'DcytofeR6TZ'],
  ['Self-accountability zero', 'Self Accountability Zero-32255a39', 'Dcsy6gWRmYg'],
  ['No one is coming to save you', 'No one is coming to save you-ee57093b', 'Dcp8fbHRT8s'],
  ['Everything is possible', 'Everything is possible-f873217a', 'DcnYXsJOwZ-'],
  ['Decide, commit, execute', 'Decide Commit Execute-9d63afbf', 'DckyOeIgy0t'],
  ['Go beyond your limits', 'Go beyind your limits-971311a4', 'DciU8tzx4fz'],
  ['5 year study plan', '5 year study plan-2c8df772', 'DcfqUjyxZrw'],
  ['Create 25th hour', 'Create 25th hour-9dc29a18', 'DcDqOCuxuHv'],
  ['Think like an owner, not a worker', 'Think like an owner not a worker-56d1b17b', 'Dcah-Fyx4hf'],
  ['Built by tough days', 'Built by tough days-8f41b623', 'DcX787zxs7W'],
  ['You have to work', 'You have to work-23d23206', 'DcLCWJpxmRN'],
  ['Your family depends on you', 'Your family depends on you-5910241d', 'Db-PNXPAr-L'],
  ['Stay humble, table always turns', 'Stay humble, table always turns-10b9b879', 'DdGOgkuRFmH'],
  ['The 1% mindset', 'The 1% Mindset-4379f73e', 'DdDumC1uX_S'],
  ['Think beyond yourself', 'Think beyond yourself-897bae4d', 'Dc-hDICx8TN']
];

const PODS = [
  ['gz5yMEZzrsM', 'How Saad Made His Millions', 'Business Breakdown', 'Two operators unpack how Saad built his multi-million dollar empire.'],
  ['iUn7TTXfTmk', 'The Money Game', 'Sapiens Experience with Uzair', 'An entrepreneur’s honest take on chasing capital and conviction.'],
  ['kCjLfHKCPJ4', 'H University’s Free Courses', 'The Nakash Khan Show', 'The mission to create six million jobs, one free course at a time.'],
  ['MVXua-u3SW4', 'Unfiltered Talk', 'First Time, With Saad Hashmani', 'An unguarded first-time conversation on fame, ego, and the climb.'],
  ['wAnStcdDy-w', 'Mindset To Become Millionaire', 'Episode #41', 'The daily mindset shifts behind a self-made fortune.'],
  ['Wk0Ch-UzEEY', 'Making It Big In The US', 'Junaid Akram’s Podcast · #136', 'A kid from the streets of Karachi, building a business in Houston.'],
  ['xbcH7a01Qc0', 'Rise To Power In US, Part 1', 'Two Flags, One Ambition', 'Comparing the road to power in Pakistan and the United States.'],
  ['xZrWIopkOkY', 'Blueprint Of A Millionaire Mind, Part 1', 'Sapiens Experience with Uzair', 'Reverse-engineering the mindset behind the money.'],
  ['yKeCu0Rn-xA', 'How To Become A Millionaire Living In Pakistan', 'Money Loves Me · Episode 37', 'Building wealth without ever leaving home.'],
  ['ZAU6U6WGwGY', 'Ghurbat Seh Lena, Zillat Na Sehna', 'Mufti Tariq Masood Podcast', 'A candid conversation on poverty, dignity, and self-respect.'],
  ['zYObkTusSEc', 'I Made A Free University', 'EON', 'The story behind building an education platform that costs nothing.'],
  ['A7AaahqIfHQ', 'Million Dollar Journey', 'Founder To Founder', 'Tracing the milestones from first dollar to first million.'],
  ['qbVuRiarIbc', 'Main Logo Ko Ameer Kerdonga', 'Featuring Saad Hashmani', 'A promise to help others build their own path to wealth.'],
  ['qhC3EDWL9SQ', 'The Mindset That Made Him A Millionaire In America', 'How Does It Work? · Tecno', 'Breaking down the discipline behind an immigrant success story.'],
  ['yDY7oO_HTj4', 'Pakistan, India Ya Bangladesh: Sabke Liye!', 'A Message For The Region', 'Why the lessons of building a business apply across every border.'],
  ['dfKuHC0YpXY', 'The Truth About My Cars, Money And Ego', 'Talha Ahad Podcast · Ep 154', 'An honest reckoning with fame, wealth, and what it costs.'],
  ['fnp1dEWSpbs', 'Blueprint Of Success', 'Sapiens Experience with Uzair', 'A working framework for building something that lasts.'],
  ['tVilzpqgHJo', 'Millionaire Mindset', 'Episode 203', 'What actually separates the 1% from everyone else.'],
  ['5cltPCLP7ec', 'Funding For AI Startups In Pakistan', 'The Next Frontier', 'A look at where early-stage capital is heading next.'],
  ['CiJ_uX3VPGU', 'The Real Hashmani Success Philosophy', 'Unpacked', 'Separating the myth from the method behind the name.'],
  ['dxbStzijYtg', 'Shaping Mindsets', 'Houston To The World', 'How one perspective shift changes everything that follows.']
];

/* ---------- render ---------- */
$('[data-reels]').innerHTML = REELS.map(([t, img, id], i) =>
  `<li class="reel"><button type="button" data-ig="${id}" aria-label="Play reel: ${esc(t)}"><span class="reel__img"><img src="uploads/${encodeURI(img)}.webp" alt="" loading="lazy" width="384" height="683"><span class="reel__play">${arrow}</span></span><span class="reel__t">${esc(t)}</span></button></li>`).join('');

$('[data-pods]').innerHTML = PODS.map(([id, t, show, d]) =>
  `<li class="pod"><button type="button" data-yt="${id}" aria-label="Play episode: ${esc(t)}"><span class="pod__img"><img src="uploads/${id}@34.webp" alt="" loading="lazy" width="448" height="600"></span><span class="pod__t">${esc(t)}</span><span class="pod__d">${esc(d)}</span><span class="pod__show">${esc(show)}</span></button></li>`).join('');

/* ---------- menu ---------- */
const menuBtn = $('.nav__menu'), menu = $('#menu');
function toggleMenu(open) {
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', open);
  menuBtn.textContent = open ? 'Close' : 'Menu';
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) $('a', menu).focus({ focusVisible: false });
}
menuBtn.addEventListener('click', () => toggleMenu(menu.hidden));
menu.addEventListener('click', e => { if (e.target.closest('a')) toggleMenu(false); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { toggleMenu(false); menuBtn.focus(); } });

/* ---------- timeline: drag + scrub ---------- */
const track = $('[data-tl-track]'), range = $('[data-tl-range]');
const maxScroll = () => track.scrollWidth - track.clientWidth;
const journey = $('#journey');
function syncRange() {
  const p = maxScroll() > 0 ? track.scrollLeft / maxScroll() : 0;
  range.value = Math.round(p * 1000);
  range.style.setProperty('--p', p * 100 + '%');
  journey.style.setProperty('--jx', 18 + p * 70 + '%');   // key light walks with the years
}
track.addEventListener('scroll', syncRange, { passive: true });
range.addEventListener('input', () => {
  track.style.scrollSnapType = 'none';
  track.scrollLeft = range.value / 1000 * maxScroll();
  range.style.setProperty('--p', range.value / 10 + '%');
});
range.addEventListener('change', () => { track.style.scrollSnapType = ''; });
let drag = null;
track.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'mouse') return;          // touch scrolls natively
  drag = { x: e.clientX, left: track.scrollLeft, moved: false };
});
addEventListener('pointermove', e => {
  if (!drag) return;
  const dx = e.clientX - drag.x;
  if (!drag.moved && Math.abs(dx) > 4) { drag.moved = true; track.classList.add('is-drag'); }
  if (drag.moved) track.scrollLeft = drag.left - dx;
});
addEventListener('pointerup', () => {
  if (drag && drag.moved) {
    track.classList.remove('is-drag');
    const items = $$('.ms', track), x = track.scrollLeft;
    const nearest = items.reduce((a, b) => Math.abs(b.offsetLeft - track.offsetLeft - x) < Math.abs(a.offsetLeft - track.offsetLeft - x) ? b : a);
    track.scrollTo({ left: nearest.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduce ? 'auto' : 'smooth' });
  }
  drag = null;
});

/* ---------- podcast nav ---------- */
const pods = $('[data-pods]'), prev = $('[data-pods-prev]'), next = $('[data-pods-next]');
const podStep = () => pods.clientWidth * .8;
prev.addEventListener('click', () => pods.scrollBy({ left: -podStep() }));
next.addEventListener('click', () => pods.scrollBy({ left: podStep() }));
function podEdges() {
  prev.disabled = pods.scrollLeft < 4;
  next.disabled = pods.scrollLeft > pods.scrollWidth - pods.clientWidth - 4;
}
pods.addEventListener('scroll', podEdges, { passive: true });
podEdges();

/* ---------- video viewer ---------- */
const viewer = $('[data-viewer]'), frame = $('[data-viewer-frame]');
function openViewer(kind, id) {
  frame.className = 'viewer__frame viewer__frame--' + kind;
  frame.innerHTML = kind === 'yt'
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0" title="Podcast episode" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
    : `<iframe src="https://www.instagram.com/reel/${id}/embed" title="Instagram reel" allow="autoplay; encrypted-media" loading="lazy"></iframe>`;
  viewer.showModal();
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-yt],[data-ig]');
  if (b) openViewer(b.dataset.yt ? 'yt' : 'ig', b.dataset.yt || b.dataset.ig);
});
$('[data-viewer-close]').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', e => { if (e.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => { if (!viewer.open) frame.innerHTML = ''; });   // close fires async; don't wipe a video opened right after

/* ---------- chat-style contact form ---------- */
const form = $('[data-chat]'), log = $('[data-chat-log]');
const steps = Object.fromEntries($$('[data-step]', form).map(s => [s.dataset.step, s]));
const say = (text, who) => {
  const li = document.createElement('li');
  li.className = 'bub bub--' + who;
  li.textContent = text;
  log.append(li);
};
function show(name) {
  Object.values(steps).forEach(s => s.classList.toggle('is-on', s === steps[name]));
  const f = $('input:not([type=radio]):not([type=file]),textarea', steps[name]);
  if (f && form.dataset.started) f.focus({ preventScroll: false });
}
const err = (step, msg) => { $('[data-err]', steps[step]).textContent = msg; };

function start() {
  form.reset();
  log.innerHTML = '';
  $('[data-file-name]').textContent = 'Attach a deck (optional)';
  show('type');
}
$$('input[name=type]', form).forEach(r => r.addEventListener('change', () => {
  form.dataset.started = '1';
  say(steps.type.querySelector('legend').textContent, 'q');
  say(r.value, 'a');
  show('name');
}));
function advance(step) {
  const input = $('input', steps[step]);
  const v = input.value.trim();
  if (!v) return err(step, step === 'name' ? 'Please enter your name.' : 'Please enter your email.');
  if (step === 'email' && !input.checkValidity()) return err(step, 'That email does not look right. Check it and try again.');
  err(step, '');
  say($('label', steps[step]).textContent, 'q');
  say(v, 'a');
  show(step === 'name' ? 'email' : 'message');
}
$$('[data-next]', form).forEach(b => b.addEventListener('click', () => advance(b.closest('[data-step]').dataset.step)));
$$('[data-step=name] input,[data-step=email] input', form).forEach(i => i.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); advance(i.closest('[data-step]').dataset.step); }
}));

const MAX_FILE = 10 * 1024 * 1024;
$('[data-file]').addEventListener('change', e => {
  const f = e.target.files[0];
  if (f && f.size > MAX_FILE) { e.target.value = ''; err('message', 'That file is over 10 MB. Attach a smaller file or leave it out.'); return; }
  err('message', '');
  $('[data-file-name]').textContent = f ? f.name : 'Attach a deck (optional)';
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const msg = $('textarea', form).value.trim();
  if (!msg) return err('message', 'Tell Saad a little about what you are building.');
  err('message', '');
  const btn = $('[data-submit]');
  btn.setAttribute('aria-busy', 'true');
  btn.textContent = 'Sending…';
  try {
    const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) throw new Error(data.error || 'Server error');
    say($('label', steps.message).textContent, 'q');
    say(msg, 'a');
    const name = $('[name=name]', form).value.trim().split(' ')[0];
    say(`Thank you, ${name}. Your message is with Saad’s team.`, 'q');
    show('again');
  } catch (e2) {
    err('message', 'Your message did not send. Check your connection and try again.');
  } finally {
    btn.removeAttribute('aria-busy');
    btn.textContent = 'Connect with Saad';
  }
});
$$('[data-again]', form).forEach(b => b.addEventListener('click', () => {
  if (b.dataset.again === 'yes') { start(); $('input[name=type]', form).focus(); }
  else { say('No, I’m done', 'a'); steps.again.classList.remove('is-on'); say('Talk soon.', 'q'); }
}));
start();

/* ---------- hero: pin, part the name, relight ---------- */
const pin = $('.hero-pin');
if (!reduce && pin) {
  const hero = $('.hero'), first = $('.hero__first'), last = $('.hero__last'), img = $('.hero__portrait img'),
    light = $('.hero__light');
  let ticking = false;
  const ease = t => 1 - Math.pow(1 - t, 3);
  function frameHero() {
    ticking = false;
    const span = pin.offsetHeight - innerHeight;
    const p = Math.min(1, Math.max(0, scrollY / span));
    const e = ease(p);
    hero.style.setProperty('--p', p);
    first.style.transform = `translateY(${-e * 14}%) scale(${1 - e * .06})`;
    first.style.opacity = 1 - e * .55;
    last.style.transform = `translateY(${e * 8}%)`;
    img.style.transform = `scale(${1 + e * .07})`;
    img.style.transformOrigin = '50% 30%';
    light.style.opacity = Math.min(1, p * 2.4);
    light.style.setProperty('--lx', 18 + e * 64 + '%');

  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frameHero); } }, { passive: true });
  frameHero();
}
