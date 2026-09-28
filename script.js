// Running timecode in the hero (HH:MM:SS:FF), like a video editor's timeline
const timecode = document.getElementById("timecode");
const start = performance.now();
const pad = (n) => String(n).padStart(2, "0");

function tick() {
  const ms = performance.now() - start;
  const frames = Math.floor((ms % 1000) / (1000 / 30));
  const s = Math.floor(ms / 1000);
  timecode.textContent =
    `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(frames)}`;
  requestAnimationFrame(tick);
}

// Skip the constantly changing timecode if the visitor prefers reduced motion
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  timecode.textContent = "00:00:00:00";
} else {
  tick();
}

// Copy email button
const copyBtn = document.getElementById("copy");
const status = document.getElementById("status");
const email = document.getElementById("mail").textContent.trim();

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = "Email copied.";
  } catch {
    status.textContent = "Could not copy. Select the email above instead.";
  }
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
