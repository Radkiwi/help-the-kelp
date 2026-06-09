// Shared nav + footer injected into every page

const NAV_HTML = `
<nav class="nav" id="main-nav">
  <a href="/" class="nav-logo">🌿 Kelp <span class="accent">Helpers</span></a>
  <div class="nav-links" id="nav-links">
    <a href="/#why">Why Kelp</a>
    <a href="/#initiatives">Initiatives</a>
    <a href="/#impact">Impact</a>
    <a href="/#join">Get Involved</a>
    <a href="https://kelphelpers.com" target="_blank" class="btn-nav">Shop Coasters</a>
  </div>
  <button class="nav-hamburger" id="hamburger" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>🌿 Kelp Helpers</h3>
        <p>Restoring Aotearoa's underwater forests and reviving the mauri of coastal ecosystems — one kina at a time.</p>
      </div>
      <div class="footer-col">
        <h4>Initiatives</h4>
        <ul>
          <li><a href="/kiwikrete">KiwiKrete</a></li>
          <li><a href="/calcara">Calcara</a></li>
          <li><a href="/removals">Removals</a></li>
          <li><a href="/pingo">Pingo</a></li>
          <li><a href="/seafoo">Seafoo</a></li>
          <li><a href="/reef-rescue">Reef Rescue</a></li>
          <li><a href="/seasniper">SeaSniper</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <ul>
          <li><a href="https://kelphelpers.com" target="_blank">Restoration Coasters</a></li>
          <li><a href="https://linkedin.com/company/kelphelpers" target="_blank">LinkedIn</a></li>
          <li><a href="https://github.com/Radkiwi/help-the-kelp" target="_blank">GitHub</a></li>
          <li><a href="mailto:hello@kelphelpers.com">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Kelp Helpers Charitable Trust · Aotearoa New Zealand</span>
      <a href="/">Restore the kelp. Restore the balance.</a>
    </div>
  </div>
</footer>`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;

  // Inject footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;

  // Hamburger
  setTimeout(() => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }
  }, 0);

  // Animate progress bars
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => { bar.style.width = '0%'; bar.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)'; observer.observe(bar); });
});
