const navToggle=document.querySelector('.nav-toggle');
const siteNav=document.querySelector('.site-nav');

if(navToggle&&siteNav){
  navToggle.addEventListener('click',()=>{
    const isOpen=siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded',String(isOpen));
  });
  siteNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    siteNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded','false');
  }));
}

function updateHeaderBranding(){
  const brand=document.querySelector('.brand');
  const title=brand?.querySelector('strong');
  const subtitle=brand?.querySelector('small');
  if(!brand||!title||!subtitle)return;

  title.textContent='THE TOLL HOUSE';
  subtitle.textContent='ACTON COFFEE HOUSE';

  if(!document.getElementById('toll-house-header-brand-styles')){
    const style=document.createElement('style');
    style.id='toll-house-header-brand-styles';
    style.textContent=`
      .brand>span{
        display:flex;
        flex-direction:column;
        justify-content:center;
        gap:2px;
      }
      .brand strong{
        font-family:"Playfair Display",Georgia,serif!important;
        font-size:1.08rem!important;
        font-weight:600!important;
        line-height:1!important;
        letter-spacing:.07em!important;
        text-transform:uppercase!important;
        color:#5b3826!important;
        white-space:nowrap;
      }
      .brand small{
        font-family:Inter,system-ui,sans-serif!important;
        font-size:.62rem!important;
        font-weight:600!important;
        line-height:1.15!important;
        letter-spacing:.16em!important;
        text-transform:uppercase!important;
        color:#5b3826!important;
        white-space:nowrap;
      }
      @media(max-width:640px){
        .brand strong{font-size:.94rem!important;letter-spacing:.055em!important}
        .brand small{font-size:.53rem!important;letter-spacing:.12em!important}
      }
    `;
    document.head.appendChild(style);
  }
}

function addCoffeeMenuSubtitle(){
  const heading=document.querySelector('#coffee-types .section-heading');
  if(!heading||heading.querySelector('.coffee-menu-note'))return;
  const note=document.createElement('p');
  note.className='coffee-menu-note';
  note.textContent='Explore a selection of our favourites, with more drinks available in store.';
  heading.appendChild(note);

  if(!document.getElementById('coffee-menu-note-styles')){
    const style=document.createElement('style');
    style.id='coffee-menu-note-styles';
    style.textContent=`
      .coffee-menu-note{
        max-width:680px;
        margin:18px auto 0;
        color:#4f4f4f;
        font-size:1.05rem;
        line-height:1.6;
      }
      @media(max-width:640px){
        .coffee-menu-note{
          margin-top:14px;
          font-size:.98rem;
          line-height:1.55;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function addOtherBusinessBanner(){
  if(document.querySelector('.other-business-banner'))return;
  const footer=document.querySelector('.site-footer');
  if(!footer)return;
  const banner=document.createElement('aside');
  banner.className='other-business-banner';
  banner.setAttribute('aria-label','Visit our other business');
  banner.innerHTML=`<p><strong>Love The Toll House?</strong><br />Please visit our other business, Toll House Deli.</p><a href="https://www.tollhousedeli.co.uk/" target="_blank" rel="noopener">Visit Toll House Deli</a>`;
  footer.parentNode.insertBefore(banner,footer);
}

function addGoogleReviewsButton(){
  const actions=document.querySelector('#reviews .review-actions');
  if(!actions||actions.querySelector('[data-google-reviews]'))return;
  const googleLink=document.createElement('a');
  googleLink.className='button ghost';
  googleLink.href='https://www.google.com/search?sca_esv=386b99a158a63933&rlz=1C5OZZY_enGB1205GB1205&sxsrf=APpeQnvNjJ72qdFSc07IOy8e74Bfl-t2DA:1783713948734&si=APenkKn5T4YN59srr511wD6k6Pufj9DEzRUvB1XJSwUeeT5afsCSqglOxSYY_l6qhELsbIWoEY7LN23B8INuYFdiDFFXMy3FQ7IziSngcPI5VsvQUpJuTFe_P0aGZVvABj04-TxSPRzH&q=The+Coffee+House+Reviews&sa=X&ved=2ahUKEwjm762i9MiVAxW1V0EAHbmKIIoQ0bkNegQIOhAF&biw=1440&bih=778&dpr=2';
  googleLink.target='_blank';
  googleLink.rel='noopener';
  googleLink.dataset.googleReviews='true';
  googleLink.textContent='Read Google reviews';
  const menuLink=actions.querySelector('a[href="#menu"]');
  menuLink?actions.insertBefore(googleLink,menuLink):actions.appendChild(googleLink);
}

function addGoogleMap(){
  const visitSection=document.querySelector('#visit');
  if(!visitSection||visitSection.querySelector('.google-map-card'))return;
  const mapCard=document.createElement('div');
  mapCard.className='google-map-card';
  mapCard.innerHTML=`<iframe title="Map showing The Toll House Acton" src="https://www.google.com/maps?q=135%20High%20Street%2C%20Acton%2C%20London%20W3%206LY&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  visitSection.appendChild(mapCard);
  if(!document.getElementById('google-map-styles')){
    const style=document.createElement('style');
    style.id='google-map-styles';
    style.textContent=`.google-map-card{grid-column:1/-1;width:100%;min-width:0;overflow:hidden;border:1px solid rgba(17,17,17,.10);border-radius:26px;background:#fff;box-shadow:0 18px 46px rgba(17,17,17,.08)}.google-map-card iframe{display:block;width:100%;height:420px;border:0}@media(max-width:640px){.google-map-card{border-radius:22px}.google-map-card iframe{height:320px}}`;
    document.head.appendChild(style);
  }
}

function removeRedundantGoogleMapsButton(){
  document.querySelector('.visit-actions a[href*="google.com/maps"]')?.remove();
}

const COOKIE_KEY='coffeeHouseCookieConsent';
function getCookieConsent(){try{return JSON.parse(localStorage.getItem(COOKIE_KEY));}catch{return null;}}
function saveCookieConsent(settings){localStorage.setItem(COOKIE_KEY,JSON.stringify({...settings,savedAt:new Date().toISOString()}));}

function createCookieConsent(){
  document.querySelector('.cookie-settings-trigger')?.remove();
  document.querySelector('.cookie-banner')?.remove();
  if(document.querySelector('.cookie-floating-settings'))return;

  const style=document.createElement('style');
  style.id='cookie-consent-styles';
  style.textContent=`.cookie-consent-banner{position:fixed;left:24px;right:24px;bottom:24px;z-index:9999;max-width:980px;margin:0 auto;padding:22px;border:1px solid rgba(85,148,177,.22);border-radius:26px;background:#fff;box-shadow:0 24px 80px rgba(31,19,13,.22);color:#2a211b;display:grid;grid-template-columns:1fr auto;gap:20px;align-items:center}.cookie-consent-banner[hidden],.cookie-settings-panel[hidden]{display:none!important}.cookie-consent-banner h2,.cookie-settings-panel h2{margin:0 0 8px;font-family:Inter,system-ui,sans-serif;font-size:1.1rem;color:#5b3826}.cookie-consent-banner p,.cookie-settings-panel p{margin:0;color:#5f524d;line-height:1.55;font-size:.96rem}.cookie-actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end}.cookie-btn{min-height:42px;padding:0 15px;border:1px solid rgba(85,148,177,.26);border-radius:999px;background:#eef6f9;color:#5b3826;font:inherit;font-weight:800;cursor:pointer}.cookie-btn.primary{background:#5594b1;color:#fff;border-color:#5594b1}.cookie-btn.dark{background:#5b3826;color:#fff;border-color:#5b3826}.cookie-settings-panel{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;padding:20px;background:rgba(31,19,13,.58)}.cookie-settings-card{width:min(720px,100%);max-height:92vh;overflow:auto;padding:24px;border-radius:28px;background:#fff;box-shadow:0 24px 90px rgba(31,19,13,.34)}.cookie-option{display:flex;justify-content:space-between;gap:18px;padding:18px 0;border-top:1px solid rgba(85,148,177,.18)}.cookie-option strong{display:block;margin-bottom:6px;color:#5b3826}.cookie-option small{display:block;color:#5f524d;line-height:1.5}.cookie-toggle{width:54px;height:30px;flex:0 0 54px;appearance:none;border-radius:999px;background:#d8c8bd;position:relative;cursor:pointer;border:0}.cookie-toggle::after{content:'';position:absolute;width:24px;height:24px;top:3px;left:3px;border-radius:50%;background:#fff;transition:transform .18s ease;box-shadow:0 2px 8px rgba(31,19,13,.18)}.cookie-toggle:checked{background:#5594b1}.cookie-toggle:checked::after{transform:translateX(24px)}.cookie-toggle:disabled{opacity:.7;cursor:not-allowed}.cookie-floating-settings{position:fixed;right:16px;bottom:16px;z-index:9998;min-height:36px;padding:0 11px;border:1px solid rgba(85,148,177,.22);border-radius:999px;background:#fff;color:#5b3826;font:inherit;font-size:.82rem;font-weight:800;box-shadow:0 14px 40px rgba(31,19,13,.16);cursor:pointer}@media(max-width:720px){.cookie-consent-banner{left:12px;right:12px;bottom:12px;grid-template-columns:1fr;padding:18px}.cookie-actions{justify-content:stretch}.cookie-btn{width:100%}.cookie-settings-card{padding:20px;border-radius:22px}.cookie-floating-settings{right:12px;bottom:12px;min-height:34px;padding:0 10px;font-size:.78rem}}`;
  document.head.appendChild(style);

  const existingConsent=getCookieConsent();
  const settingsButton=document.createElement('button');
  settingsButton.className='cookie-floating-settings';
  settingsButton.type='button';
  settingsButton.textContent='Cookie Settings';
  document.body.appendChild(settingsButton);

  const banner=document.createElement('section');
  banner.className='cookie-consent-banner';
  banner.setAttribute('aria-label','Cookie consent');
  banner.innerHTML=`<div><h2>Cookies on The Toll House Acton</h2><p>We use necessary cookies to make this website work. With your permission, we may also use optional cookies to understand visits and improve the site.</p></div><div class="cookie-actions"><button class="cookie-btn" type="button" data-cookie-action="necessary">Necessary only</button><button class="cookie-btn dark" type="button" data-cookie-action="settings">Cookie settings</button><button class="cookie-btn primary" type="button" data-cookie-action="all">Accept all</button></div>`;
  document.body.appendChild(banner);

  const panel=document.createElement('div');
  panel.className='cookie-settings-panel';
  panel.hidden=true;
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-modal','true');
  panel.innerHTML=`<div class="cookie-settings-card"><h2>Cookie settings</h2><p>Choose which optional cookies you are happy for us to use.</p><div class="cookie-option"><span><strong>Necessary cookies</strong><small>Required for basic website functions.</small></span><input class="cookie-toggle" type="checkbox" checked disabled /></div><div class="cookie-option"><span><strong>Analytics cookies</strong><small>Help us understand how people use the website.</small></span><input class="cookie-toggle" type="checkbox" data-cookie-toggle="analytics" /></div><div class="cookie-option"><span><strong>Marketing cookies</strong><small>Support social media and promotional features.</small></span><input class="cookie-toggle" type="checkbox" data-cookie-toggle="marketing" /></div><div class="cookie-actions" style="margin-top:18px"><button class="cookie-btn" type="button" data-cookie-action="close">Cancel</button><button class="cookie-btn dark" type="button" data-cookie-action="necessary">Necessary only</button><button class="cookie-btn primary" type="button" data-cookie-action="save">Save choices</button></div></div>`;
  document.body.appendChild(panel);

  const analyticsToggle=panel.querySelector('[data-cookie-toggle="analytics"]');
  const marketingToggle=panel.querySelector('[data-cookie-toggle="marketing"]');
  const openSettings=()=>{const current=getCookieConsent();analyticsToggle.checked=Boolean(current?.analytics);marketingToggle.checked=Boolean(current?.marketing);panel.hidden=false;};
  const closeSettings=()=>{panel.hidden=true;};
  const saveAndClose=settings=>{saveCookieConsent(settings);banner.hidden=true;closeSettings();};

  settingsButton.addEventListener('click',openSettings);
  banner.addEventListener('click',event=>{
    const action=event.target?.dataset?.cookieAction;
    if(action==='necessary')saveAndClose({necessary:true,analytics:false,marketing:false});
    if(action==='all')saveAndClose({necessary:true,analytics:true,marketing:true});
    if(action==='settings')openSettings();
  });
  panel.addEventListener('click',event=>{
    if(event.target===panel||event.target?.dataset?.cookieAction==='close')closeSettings();
    if(event.target?.dataset?.cookieAction==='necessary')saveAndClose({necessary:true,analytics:false,marketing:false});
    if(event.target?.dataset?.cookieAction==='save')saveAndClose({necessary:true,analytics:analyticsToggle.checked,marketing:marketingToggle.checked});
  });
  if(existingConsent)banner.hidden=true;
}

function initialisePageEnhancements(){
  updateHeaderBranding();
  addCoffeeMenuSubtitle();
  addOtherBusinessBanner();
  addGoogleReviewsButton();
  removeRedundantGoogleMapsButton();
  addGoogleMap();
  createCookieConsent();
}

document.readyState==='loading'?document.addEventListener('DOMContentLoaded',initialisePageEnhancements):initialisePageEnhancements();