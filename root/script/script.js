/* ─── PRELOADER ─────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 400);
});

/* ─── LENIS SMOOTH SCROLL ───────────────────── */
let lenis;
if (typeof Lenis !== 'undefined') {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      lenis.scrollTo(this.getAttribute('href'));
    });
  });
}

/* ─── LOGO FALLBACK ─────────────────────────── */
document.getElementById('logo-img').onerror = function(){
  this.style.display = 'none';
  document.getElementById('logo-fallback').style.display = 'block';
};

/* ─── CUSTOM CURSOR & SCROLL PROGRESS ───────── */
const cDot = document.getElementById('cursor-dot');
const cRing = document.getElementById('cursor-ring');
const sProg = document.getElementById('scroll-progress');

if(cDot && cRing) {
  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cDot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
  });

  const renderCursor = () => {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    cRing.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;
    requestAnimationFrame(renderCursor);
  };
  requestAnimationFrame(renderCursor);

  const interactives = document.querySelectorAll('a, button, input, textarea, .sc-card, .svc-card, .proj, .cl, .nav-logo, .soc, .cs-soc');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cRing.classList.add('hovered');
      cDot.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      cRing.classList.remove('hovered');
      cDot.classList.remove('hovered');
    });
  });
}

if(sProg) {
  window.addEventListener('scroll', () => {
    const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if(winHeightPx > 0) {
      const scrolled = (scrollPx / winHeightPx) * 100;
      sProg.style.width = scrolled + '%';
    }
  });
}

/* ─── 3D TILT CARDS ─────────────────────────── */
const tiltElements = document.querySelectorAll('.svc-card, .proj, .sc-card, .cert-card');
tiltElements.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = 'none';
  });
  
  el.addEventListener('mouseleave', () => {
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    el.style.transition = 'transform 0.5s ease';
    
    setTimeout(() => {
      if(!el.matches(':hover')){
        el.style.transform = '';
        el.style.transition = '';
      }
    }, 500);
  });
});

/* ─── HERO CANVAS PARTICLES ─────────────────── */
(function(){
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = {x:-9999, y:-9999};
  const N = 55;

  function resize(){
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle(){
    this.reset = function(){
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      this.r  = Math.random() * 1.8 + .6;
      this.a  = Math.random() * .5 + .15;
    };
    this.reset();
  }

  for(let i = 0; i < N; i++){
    const p = new Particle();
    particles.push(p);
  }

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });

  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < 0 || p.x > W) p.vx *= -1;
      if(p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(96,165,250,${p.a})`;
      ctx.fill();
    });
    /* connection lines */
    for(let i = 0; i < particles.length; i++){
      for(let j = i+1; j < particles.length; j++){
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 130){
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59,130,246,${.18 * (1 - dist/130)})`;
          ctx.lineWidth = .6;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    /* mouse-particle connections */
    particles.forEach(p => {
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 160){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(6,182,212,${.28 * (1 - dist/160)})`;
        ctx.lineWidth = .8;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  draw();
})();

/* ─── TYPING ANIMATION ──────────────────────── */
const roles = ['Web Applications','Data Pipelines','UI Experiences','Digital Solutions','Data Insights'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-role');

function type(){
  const cur = roles[ri];
  if(deleting){
    typedEl.textContent = cur.substring(0, ci-1);
    ci--;
  } else {
    typedEl.textContent = cur.substring(0, ci+1);
    ci++;
  }
  let spd = deleting ? 55 : 88;
  if(!deleting && ci === cur.length){ spd = 2000; deleting = true; }
  else if(deleting && ci === 0){ deleting = false; ri = (ri+1)%roles.length; spd = 380; }
  setTimeout(type, spd);
}
type();

/* ─── NAV SCROLL + ACTIVE LINKS ─────────────── */
const navEl = document.getElementById('nav');
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navEl.classList.toggle('scrolled', window.scrollY > 40);
  let cur = '';
  sections.forEach(s => {
    if(window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

/* ─── SCROLL MOTION (Framer Motion–style) ───── */
/* Automatically staggers children of [data-stagger]
   and applies per-element [data-delay] offsets.     */
(function(){
  /* Auto-assign stagger delays to children of [data-stagger] containers */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const gap = parseInt(parent.dataset.stagger) || 100;
    const children = parent.querySelectorAll(':scope > [data-motion]');
    children.forEach((child, i) => {
      child.style.transitionDelay = (i * gap) + 'ms';
    });
  });

  /* Main observer — fires .in-view when elements enter viewport */
  const motionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        if(delay > 0){
          setTimeout(() => el.classList.add('in-view'), delay);
        } else {
          el.classList.add('in-view');
        }
        motionObserver.unobserve(el);
      }
    });
  }, {threshold: 0.08, rootMargin: '0px 0px -60px 0px'});

  /* Observe every [data-motion] element */
  document.querySelectorAll('[data-motion], .text-reveal').forEach(el => motionObserver.observe(el));

  /* Respect prefers-reduced-motion */
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('[data-motion], .text-reveal').forEach(el => {
      el.style.transition = 'none';
      el.classList.add('in-view');
    });
  }

  // Also split text-reveal elements
  document.querySelectorAll('.text-reveal').forEach(el => {
    const text = el.innerText;
    el.innerHTML = '';
    const words = text.split(' ');
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.innerText = word + ' ';
      span.style.transitionDelay = `${i * 0.08}s`;
      el.appendChild(span);
    });
  });

  setTimeout(() => {
    document.querySelectorAll('[data-motion], .text-reveal').forEach(el => el.classList.add('in-view'));
  }, 100);
})();

/* ─── STAT COUNTERS ─────────────────────────── */
const co = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let n = 0;
      const step = target / 60;
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = Math.floor(n);
        if(n >= target) clearInterval(t);
      }, 22);
      co.unobserve(el);
    }
  });
}, {threshold:.5});
document.querySelectorAll('.count').forEach(el => co.observe(el));

/* ─── MOBILE MENU ───────────────────────────── */
function toggleMob(){
  document.getElementById('mob-menu').classList.toggle('open');
  document.getElementById('burger').classList.toggle('open');
  const nav = document.getElementById('nav');
  if(nav) nav.classList.toggle('menu-open');
}

/* ─── FORM SUBMIT & TOAST ───────────────────── */
function showToast(message) {
  const toast = document.getElementById('toast');
  if(toast) {
    toast.innerHTML = '<i class="fa-solid fa-check-circle" style="margin-right:8px"></i>' + message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}

function submitForm(event){
  event.preventDefault();
  const btn = event.target.querySelector('button[type="submit"]');
  const ogText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
  
  setTimeout(() => {
    showToast('Message sent successfully!');
    btn.innerHTML = ogText;
    event.target.reset();
  }, 1500);
}

/* ─── MAGNETIC BUTTONS ──────────────────────── */
const magnets = document.querySelectorAll('.btn, .soc, .cs-soc, .nav-logo');
magnets.forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    btn.style.transition = 'none';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.4s cubic-bezier(.16,1,.3,1)';
  });
});

/* ─── BACK TO TOP ───────────────────────────── */
const backToTop = document.getElementById('back-to-top');
if(backToTop) {
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    backToTop.classList.add('skew-launch');
    
    if (typeof lenis !== 'undefined') {
      lenis.scrollTo(0, { duration: 2.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    setTimeout(() => {
      backToTop.classList.remove('skew-launch');
      backToTop.classList.remove('show');
    }, 1500);
  });
}

/* ─── PAGE TRANSITIONS ──────────────────────── */
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if(href && href.endsWith('.html') && !href.startsWith('http') && !link.hasAttribute('target')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.remove('loaded');
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  }
});

/* ─── THEME TOGGLE ──────────────────────────── */
const themeToggles = document.querySelectorAll('.theme-toggle-btn');
if(themeToggles.length > 0) {
  const logoImg = document.getElementById('logo-img');
  const favicon = document.getElementById('favicon');
  const preloaderImgs = document.querySelectorAll('.preloader-img');
  
  function applyTheme(isCyber) {
    if(isCyber) {
      document.body.classList.add('theme-cyber');
      if(logoImg) logoImg.src = logoImg.src.replace(/logo\.png$/i, 'logo_cyber.png');
      if(favicon) favicon.href = favicon.href.replace(/favicon\.png$/i, 'favicon_cyber.png');
      preloaderImgs.forEach(img => {
        img.src = img.src.replace(/favicon\.png$/i, 'favicon_cyber.png');
      });
      themeToggles.forEach(btn => btn.innerText = 'Default');
    } else {
      document.body.classList.remove('theme-cyber');
      if(logoImg) logoImg.src = logoImg.src.replace(/logo_cyber\.png$/i, 'logo.png');
      if(favicon) favicon.href = favicon.href.replace(/favicon_cyber\.png$/i, 'favicon.png');
      preloaderImgs.forEach(img => {
        img.src = img.src.replace(/favicon_cyber\.png$/i, 'favicon.png');
      });
      themeToggles.forEach(btn => btn.innerText = 'Cyber');
    }
  }

  // Check local storage
  const isCyber = localStorage.getItem('theme') === 'cyber';
  applyTheme(isCyber);
  
  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isNowCyber = !document.body.classList.contains('theme-cyber');
      applyTheme(isNowCyber);
      localStorage.setItem('theme', isNowCyber ? 'cyber' : 'dark');
    });
  });
}

/* ─── SPOTLIGHT CARDS ───────────────────────── */
const spotCards = document.querySelectorAll('.sc-card, .svc-card, .proj');
spotCards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

/* ─── 3D TILT EFFECT ────────────────────────── */
const tiltEls = document.querySelectorAll('.img-wrap');
tiltEls.forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;
    
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    el.style.transition = 'none';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    el.style.transition = 'transform 0.5s ease';
  });
});

/* ─── STAGGERED PILLS & TIMELINE ───────────────────────── */
const staggerItems = document.querySelectorAll('.pill, .lang-chip, .tl-item');
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const parent = entry.target.parentElement;
      const siblings = parent.querySelectorAll('.pill, .lang-chip, .tl-item');
      const index = Array.from(siblings).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('show');
      }, index * 100);
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
staggerItems.forEach(item => staggerObserver.observe(item));

/* ─── TIMELINE LINE DRAWING ───────────────────────── */
const timelines = document.querySelectorAll('.tl');
const tlObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('draw');
      tlObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
timelines.forEach(tl => tlObserver.observe(tl));

/* ─── SCROLL TEXT BOUNCE ───────────────────────── */
const scrollText = document.querySelector('.scroll-text-anim');
if (scrollText) {
  setTimeout(() => {
    scrollText.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(10px)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 1000,
      iterations: 3,
      easing: 'ease-in-out'
    });
  }, 1500); // Wait 1.5 seconds after load
}

/* ─── SHOWCASE FILTERS & LOAD MORE ───────────────────────── */
const showcaseGrid = document.getElementById('project-grid');
if (showcaseGrid) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const allCards = Array.from(showcaseGrid.querySelectorAll('.sc-card'));
  const loadMoreContainer = document.getElementById('load-more-container');
  const loadMoreBtn = document.getElementById('btn-load-more');
  
  let currentFilter = 'all';
  const initialCount = 6;
  let visibleCount = initialCount;

  function updateGrid() {
    let matchCount = 0;
    
    allCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const matches = currentFilter === 'all' || category === currentFilter;
      
      if (matches) {
        if (matchCount < visibleCount) {
          if (card.style.display === 'none') {
            card.classList.remove('in-view'); // Reset animation
            card.style.display = 'block';
            if (typeof motionObserver !== 'undefined') {
              motionObserver.observe(card); // Re-observe to trigger animation
            }
          }
        } else {
          card.style.display = 'none';
        }
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (loadMoreContainer) {
      if (matchCount > visibleCount) {
        loadMoreContainer.style.display = 'block';
      } else {
        loadMoreContainer.style.display = 'none';
      }
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      visibleCount = initialCount;
      updateGrid();
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      visibleCount += 6;
      updateGrid();
    });
  }

  // Initialize display on load
  // First, hide all cards to prevent them all from flashing, then run updateGrid
  allCards.forEach(card => card.style.display = 'none');
  updateGrid();
}
