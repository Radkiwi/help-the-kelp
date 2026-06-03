// ===== ANIMATED COUNTERS =====
function animateCounter(el, target, suffix = '', duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start).toLocaleString() + suffix;
  }, 16);
}

// Trigger counters when hero is visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(document.getElementById('m2-counter'), 12400, '');
      animateCounter(document.getElementById('plant-counter'), 8750, '');
      animateCounter(document.getElementById('donor-counter'), 3200, '');
      observer.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroCounter = document.querySelector('.hero-counter');
if (heroCounter) observer.observe(heroCounter);

// ===== DONATE TABS =====
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.donate-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.add('hidden'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
  });
});

// ===== AMOUNT SELECTION =====
function setupAmounts(panelId, labelId) {
  const panel = document.getElementById(panelId);
  if (!panel) return;
  const amounts = panel.querySelectorAll('.amount');
  const label = document.getElementById(labelId);
  const custom = panel.querySelector('.custom-amount');

  amounts.forEach(btn => {
    btn.addEventListener('click', () => {
      amounts.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (label) label.textContent = '$' + btn.dataset.amount;
      if (custom) custom.value = '';
    });
  });

  if (custom) {
    custom.addEventListener('input', () => {
      if (custom.value) {
        amounts.forEach(b => b.classList.remove('active'));
        if (label) label.textContent = '$' + custom.value;
      }
    });
  }
}

setupAmounts('tab-plant', 'plant-label');
setupAmounts('tab-restore', 'restore-label');
