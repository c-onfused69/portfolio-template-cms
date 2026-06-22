(function() {
  const navContainer = document.getElementById('dynamic-nav');
  if (navContainer) {
    const root = navContainer.getAttribute('data-root') || './';
    const isIndex = root === './';
    const linkPrefix = isIndex ? '' : root + 'index.html';
    const isShowcase = window.location.pathname.includes('showcase.html');

    navContainer.outerHTML = `
      <nav id="nav" class="${!isIndex ? 'scrolled' : ''}">
        <div class="wrap nav-in">
          <a href="${isIndex ? '#home' : linkPrefix}" class="nav-logo" id="nav-logo">
            <img src="${root}root/images/logo.png" alt="Niloy Logo" id="logo-img">
            <span class="logo-text" id="logo-fallback">Niloy</span>
          </a>
          <ul class="nav-links">
            <li><a href="${isIndex ? '#home' : linkPrefix}">Home</a></li>
            <li><a href="${linkPrefix}#about">About</a></li>
            <li><a href="${linkPrefix}#services">Services</a></li>
            <li><a href="${linkPrefix}#portfolio" ${isShowcase ? 'class="active"' : ''}>Work</a></li>
            <li><a href="${linkPrefix}#exp">Experience</a></li>
            <li><a href="${linkPrefix}#contact">Contact</a></li>
          </ul>
          <div class="nav-right">
            <button class="btn btn-o theme-toggle-btn" style="padding:8px 12px; font-size:.82rem; border-radius:var(--r-sm); min-width:84px; justify-content:center; text-align:center;" aria-label="Toggle theme">
              Cyber
            </button>
            <a href="${root}root/Resume/Resume of Md Nahijul Islam Niloy.pdf"
               class="btn btn-o" style="padding:8px 18px;font-size:.82rem;" target="_blank">Download CV &nbsp; &nearr;</a>
          </div>
          <button class="burger" id="burger" aria-label="Open menu" onclick="toggleMob()">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      <!-- MOBILE MENU -->
      <div class="mob-menu" id="mob-menu">
        <div class="mob-menu-blob"></div>
        <div class="mob-nav-links">
          <a href="${isIndex ? '#home' : linkPrefix}" onclick="toggleMob()"><span>01.</span>Home</a>
          <a href="${linkPrefix}#about" onclick="toggleMob()"><span>02.</span>About</a>
          <a href="${linkPrefix}#services" onclick="toggleMob()"><span>03.</span>Services</a>
          <a href="${linkPrefix}#portfolio" onclick="toggleMob()"><span>04.</span>Work</a>
          <a href="${linkPrefix}#exp" onclick="toggleMob()"><span>05.</span>Experience</a>
          <a href="${linkPrefix}#contact" onclick="toggleMob()"><span>06.</span>Contact</a>
        </div>
        <div class="mob-actions">
          <button class="btn btn-o theme-toggle-btn" aria-label="Toggle theme">Cyber</button>
          <a href="${root}root/Resume/Resume of Md Nahijul Islam Niloy.pdf" class="btn btn-p" target="_blank">Download CV &nbsp; &nearr;</a>
        </div>
      </div>
    `;
  }

  const footerContainer = document.getElementById('dynamic-footer');
  if (footerContainer) {
    footerContainer.outerHTML = `
      <footer>
        <div class="wrap">
          <div class="foot-in">
            <div class="foot-t">&copy; 2026 <em>Md. Nahijul Islam Niloy</em>. All rights reserved.</div>
            <div class="foot-t">Built with <em>&hearts;</em> in Bangladesh</div>
          </div>
        </div>
      </footer>
    `;
  }
})();
