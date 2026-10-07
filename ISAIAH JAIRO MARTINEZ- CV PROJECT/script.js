const menuToggle = document.getElementById("menu-toggle");
const siteNavigation = document.getElementById("site-navigation");
const navigationLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navigationLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  siteNavigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
  menuToggle.querySelector(".menu-label").textContent = "Menu";
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNavigation.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
  menuToggle.querySelector(".menu-label").textContent = isOpen ? "Menu" : "Close";
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuToggle.focus();
  }
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
      link.toggleAttribute("aria-current", isCurrent);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

document.getElementById("print-cv").addEventListener("click", () => window.print());

const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");
const email = document.getElementById("mail").textContent.trim();

copyButton.addEventListener("click", async () => {
  try {
    if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
    await navigator.clipboard.writeText(email);
    copyStatus.textContent = "Email copied to your clipboard.";
  } catch {
    copyStatus.textContent = "Copy unavailable. Select the email address above instead.";
  }
});

const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();
