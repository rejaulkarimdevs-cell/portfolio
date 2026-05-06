const menuBtn = document.getElementById("menuBtn");
const drawerClose = document.getElementById("drawerClose");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("drawerOverlay");
function openDrawer() {
  drawer.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}
menuBtn.addEventListener("click", openDrawer);
drawerClose.addEventListener("click", closeDrawer);
overlay.addEventListener("click", closeDrawer);
document
  .querySelectorAll(".drawer-link")
  .forEach((el) => el.addEventListener("click", closeDrawer));

// Nav active state
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

function setActiveLink(id) {
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + id);
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  },
  { threshold: 0, rootMargin: "-80px 0px -50% 0px" },
);
sections.forEach((s) => sectionObserver.observe(s));

navLinks.forEach((a) => {
  a.addEventListener("click", () => {
    const id = a.getAttribute("href").slice(1);
    setActiveLink(id);
  });
});

// Contact form — Web3Forms
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const btn = document.getElementById("formSubmitBtn");
  const status = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = "Sending…";
    status.className = "form-status";
    status.textContent = "";

    const formData = new FormData(contactForm);
    formData.append("access_key", "9972a272-7894-4871-9c5a-625b57d82297");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        status.className = "form-status success";
        status.textContent =
          "Message sent! I'll get back to you within 24 hours.";
        contactForm.reset();
      } else {
        throw new Error(json.message || "Submission failed");
      }
    } catch (err) {
      status.className = "form-status error";
      status.textContent = "Something went wrong. Please email me directly.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message →";
    }
  });
}

// Portfolio filter
const pfBtns = document.querySelectorAll(".pf-btn");
const pfCards = document.querySelectorAll(".pf-card");

pfBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    pfBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    pfCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.style.display = show ? "" : "none";
    });
  });
});

// Scroll reveal
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);
document
  .querySelectorAll(
    ".service-card,.testi-card,.result-metric,.about-bullet,.stat-bar-item,.pf-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    obs.observe(el);
  });
