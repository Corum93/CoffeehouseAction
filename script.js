const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function addOtherBusinessBanner() {
  if (document.querySelector('.other-business-banner')) return;
  const footer = document.querySelector('.site-footer');
  if (!footer) return;

  const banner = document.createElement('aside');
  banner.className = 'other-business-banner';
  banner.setAttribute('aria-label', 'Visit our other business');
  banner.innerHTML = `
    <p><strong>Love The Toll House?</strong><br />Please visit our other business, Toll House Deli.</p>
    <a href="https://www.tollhousedeli.co.uk/" target="_blank" rel="noopener">Visit Toll House Deli</a>
  `;
  footer.parentNode.insertBefore(banner, footer);
}

const COOKIE_KEY = 'coffeeHouseCookieConsent';

function injectCookieStyles() {
  if (document.getElementById('cookie-consent-styles')) return;

  const style = document.createElement('style');
  style.id = 'cookie-consent-styles';
  style.textContent = `
    .cookie-banner {
      position: fixed;
      left: 24px;
      right: 24px;
      bottom: 24px;
      z-index: 9999;
      max-width: 980px;
      margin: 0 auto;
      padding: 22px;
      border: 1px solid rgba(143, 33, 27, .16);
      border-radius: 26px;
      background: #fff8ed;
      box-shadow: 0 24px 80px rgba(31, 19, 13, .22);
      color: #2a211b;
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 20px;
      align-items: center;
    }
    .cookie-banner[hidden], .cookie-settings-panel[hidden] { display: none !important; }
    .cookie-banner h2, .cookie-settings-panel h2 {
      margin: 0 0 8px;
      font-family: Inter, system-ui, sans-serif;
      font-size: 1.1rem;
      line-height: 1.2;
      letter-spacing: 0;
      color: #5f211d;
    }
    .cookie-banner p, .cookie-settings-panel p {
      margin: 0;
      color: #5f524d;
      line-height: 1.55;
      font-size: .96rem;
    }
    .cookie-actions { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
    .cookie-btn {
      min-height: 44px;
      padding: 0 16px;
      border: 1px solid rgba(200, 58, 48, .22);
      border-radius: 999px;
      background: #f8dfd7;
      color: #c83a30;
      font: inherit;
      font-weight: 800;
      cursor: pointer;
    }
    .cookie-btn.primary { background: #c83a30; color: #fff8ed; border-color: #c83a30; }
    .cookie-btn.dark { background: #5f211d; color: #fff8ed; border-color: #5f211d; }
    .cookie-settings-panel {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: grid;
      place-items: center;
      padding: 20px;
      background: rgba(31, 19, 13, .58);
    }
    .cookie-settings-card {
      width: min(720px, 100%);
      max-height: min(720px, 92vh);
      overflow: auto;
      padding: 24px;
      border-radius: 28px;
      background: #fff8ed;
      box-shadow: 0 24px 90px rgba(31, 19, 13, .34);
    }
    .cookie-option {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      padding: 18px 0;
      border-top: 1px solid rgba(143, 33, 27, .14);
    }
    .cookie-option strong { display: block; margin-bottom: 6px; color: #5f211d; }
    .cookie-option small { display: block; color: #5f524d; line-height: 1.5; }
    .cookie-toggle {
      width: 54px;
      height: 30px;
      flex: 0 0 54px;
      appearance: none;
      border-radius: 999px;
      background: #d8c8bd;
      position: relative;
      cursor: pointer;
      border: 0;
    }
    .cookie-toggle::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 24px;
      top: 3px;
      left: 3px;
      border-radius: 50%;
      background: white;
      transition: transform .18s ease;
      box-shadow: 0 2px 8px rgba(31, 19, 13, .18);
    }
    .cookie-toggle:checked { background: #c83a30; }
    .cookie-toggle:checked::after { transform: translateX(24px); }
    .cookie-toggle:disabled { opacity: .7; cursor: not-allowed; }
    .cookie-floating-settings {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 9998;
      min-height: 42px;
      padding: 0 14px;
      border: 1px solid rgba(143, 33, 27, .16);
      border-radius: 999px;
      background: #fff8ed;
      color: #5f211d;
      font: inherit;
      font-weight: 800;
      box-shadow: 0 14px 40px rgba(31, 19, 13, .16);
      cursor: pointer;
    }
    @media (max-width: 720px) {
      .cookie-banner { left: 12px; right: 12px; bottom: 12px; grid-template-columns: 1fr; padding: 18px; }
      .cookie-actions { justify-content: stretch; }
      .cookie-btn { width: 100%; }
      .cookie-settings-card { padding: 20px; border-radius: 22px; }
      .cookie-option { align-items: flex-start; }
      .cookie-floating-settings { right: 12px; bottom: 12px; font-size: .9rem; }
    }
  `;
  document.head.appendChild(style);
}

function getCookieConsent() {
  try {
    return JSON.parse(localStorage.getItem(COOKIE_KEY));
  } catch (error) {
    return null;
  }
}

function saveCookieConsent(settings) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...settings, savedAt: new Date().toISOString() }));
}

function createCookieConsent() {
  injectCookieStyles();

  const existingConsent = getCookieConsent();

  const settingsButton = document.createElement('button');
  settingsButton.className = 'cookie-floating-settings';
  settingsButton.type = 'button';
  settingsButton.textContent = 'Cookie Settings';
  document.body.appendChild(settingsButton);

  const banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = `
    <div>
      <h2>Cookies on The Toll House Acton</h2>
      <p>We use necessary cookies to make this website work. With your permission, we may also use optional cookies to understand visits and improve the site.</p>
    </div>
    <div class="cookie-actions">
      <button class="cookie-btn" type="button" data-cookie-action="necessary">Necessary only</button>
      <button class="cookie-btn dark" type="button" data-cookie-action="settings">Cookie settings</button>
      <button class="cookie-btn primary" type="button" data-cookie-action="all">Accept all</button>
    </div>
  `;
  document.body.appendChild(banner);

  const panel = document.createElement('div');
  panel.className = 'cookie-settings-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Cookie settings');
  panel.hidden = true;
  panel.innerHTML = `
    <div class="cookie-settings-card">
      <h2>Cookie settings</h2>
      <p>Choose which optional cookies you are happy for us to use. Necessary cookies are always on because the website needs them to work.</p>
      <div class="cookie-option">
        <span><strong>Necessary cookies</strong><small>Required for basic website functions such as navigation and remembering your cookie choice.</small></span>
        <input class="cookie-toggle" type="checkbox" checked disabled aria-label="Necessary cookies always on" />
      </div>
      <div class="cookie-option">
        <span><strong>Analytics cookies</strong><small>Help us understand how people use the website so we can improve it. These will only be used if analytics is added later.</small></span>
        <input class="cookie-toggle" type="checkbox" data-cookie-toggle="analytics" aria-label="Analytics cookies" />
      </div>
      <div class="cookie-option">
        <span><strong>Marketing cookies</strong><small>Help with social media or promotional features. These will only be used if marketing tools are added later.</small></span>
        <input class="cookie-toggle" type="checkbox" data-cookie-toggle="marketing" aria-label="Marketing cookies" />
      </div>
      <div class="cookie-actions" style="margin-top:18px">
        <button class="cookie-btn" type="button" data-cookie-action="close">Cancel</button>
        <button class="cookie-btn dark" type="button" data-cookie-action="necessary">Necessary only</button>
        <button class="cookie-btn primary" type="button" data-cookie-action="save">Save choices</button>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  const analyticsToggle = panel.querySelector('[data-cookie-toggle="analytics"]');
  const marketingToggle = panel.querySelector('[data-cookie-toggle="marketing"]');

  function openSettings() {
    const current = getCookieConsent();
    analyticsToggle.checked = Boolean(current?.analytics);
    marketingToggle.checked = Boolean(current?.marketing);
    panel.hidden = false;
  }

  function closeSettings() {
    panel.hidden = true;
  }

  function acceptNecessaryOnly() {
    saveCookieConsent({ necessary: true, analytics: false, marketing: false });
    banner.hidden = true;
    closeSettings();
  }

  function acceptAll() {
    saveCookieConsent({ necessary: true, analytics: true, marketing: true });
    banner.hidden = true;
    closeSettings();
  }

  function saveChoices() {
    saveCookieConsent({ necessary: true, analytics: analyticsToggle.checked, marketing: marketingToggle.checked });
    banner.hidden = true;
    closeSettings();
  }

  banner.addEventListener('click', (event) => {
    const action = event.target?.dataset?.cookieAction;
    if (action === 'necessary') acceptNecessaryOnly();
    if (action === 'all') acceptAll();
    if (action === 'settings') openSettings();
  });

  panel.addEventListener('click', (event) => {
    if (event.target === panel) closeSettings();
    const action = event.target?.dataset?.cookieAction;
    if (action === 'close') closeSettings();
    if (action === 'necessary') acceptNecessaryOnly();
    if (action === 'save') saveChoices();
  });

  settingsButton.addEventListener('click', openSettings);

  if (existingConsent) {
    banner.hidden = true;
  }
}

function initialisePageEnhancements() {
  addOtherBusinessBanner();
  createCookieConsent();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialisePageEnhancements);
} else {
  initialisePageEnhancements();
}
