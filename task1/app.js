// Configuration
const CONFIG = {
  STATS_UPDATE_INTERVAL: 3500,
  STATS_UPDATE_PROBABILITY: 0.45,
  SIGNUP_PROCESSING_DELAY: 800
};

// Initialize year in footer
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Smooth scroll utilities
function scrollToPricing() {
  const pricingSection = document.getElementById("pricing");
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Demo signup handler
function fakeSignup() {
  const buttons = document.querySelectorAll(".btn.primary");

  // Set processing state
  buttons.forEach(btn => {
    btn.textContent = "Processing...";
    btn.disabled = true;
  });

  // Reset after delay
  setTimeout(() => {
    buttons.forEach(btn => {
      btn.textContent = "Start Free Trial";
      btn.disabled = false;
    });
    alert("Signup flow not implemented. This is a demo landing page.");
  }, CONFIG.SIGNUP_PROCESSING_DELAY);
}

// Format number with commas
function formatNumber(num) {
  return num.toLocaleString('en-US');
}

// Generate and display randomized stats
function randomizeStats() {
  const stats = {
    visitors: 10000 + Math.floor(Math.random() * 9000),
    signups: 800 + Math.floor(Math.random() * 900),
    conversion: (Math.random() * 8 + 4).toFixed(1),
    revenue: (Math.random() * 15000).toFixed(0)
  };

  const elements = {
    visitors: document.getElementById("visitors"),
    signups: document.getElementById("signups"),
    conv: document.getElementById("conv"),
    rev: document.getElementById("rev"),
    timeNow: document.getElementById("timeNow")
  };

  if (elements.visitors) elements.visitors.textContent = formatNumber(stats.visitors);
  if (elements.signups) elements.signups.textContent = formatNumber(stats.signups);
  if (elements.conv) elements.conv.textContent = `${stats.conversion}%`;
  if (elements.rev) elements.rev.textContent = `$${formatNumber(stats.revenue)}`;
  if (elements.timeNow) elements.timeNow.textContent = new Date().toLocaleTimeString();
}

// Theme toggle
function toggleMode() {
  document.body.classList.toggle('dark-mode');
}

// Auto-update stats periodically
setInterval(() => {
  if (Math.random() > CONFIG.STATS_UPDATE_PROBABILITY) {
    randomizeStats();
  }
}, CONFIG.STATS_UPDATE_INTERVAL);

// Scroll effect for accent line
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || 0;
  const line = document.getElementById("line");

  if (line) {
    line.style.filter = `hue-rotate(${scrollY % 360}deg)`;
  }
});