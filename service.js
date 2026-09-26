// Service pages: mobile menu + footer year

const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");
const menuIconI = menuIcon.querySelector("i");

// menu open/close: icon hamburger <-> cross (X)
function setMenu(open) {
    navlist.classList.toggle("open", open);
    if (!open) document.querySelectorAll(".has-dropdown.open").forEach(li => li.classList.remove("open"));
    menuIcon.classList.toggle("active", open);
    menuIconI.classList.toggle("bx-menu", !open);
    menuIconI.classList.toggle("bx-x", open);
    menuIcon.setAttribute("aria-expanded", open);
    menuIcon.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuIcon.onclick = () => setMenu(!navlist.classList.contains("open"));

navlist.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
window.addEventListener("scroll", () => {
    if (navlist.classList.contains("open")) setMenu(false);
});

// footer year
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// scroll reveal animations
document.querySelectorAll(".svc-heading, .svc-cta").forEach(el => el.classList.add("scroll-scale"));
document.querySelectorAll(".svc-hero-content").forEach(el => el.classList.add("scroll-bottom"));
document.querySelectorAll(".svc-grid, .svc-steps, .svc-others, .svc-hero-stats").forEach(el => el.classList.add("stagger"));

document.querySelectorAll(".stagger").forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty("--d", i));
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll(".scroll-scale, .scroll-bottom, .stagger").forEach(el => revealObserver.observe(el));

// Services dropdown (menu)
document.querySelectorAll(".has-dropdown").forEach((item) => {
    const toggle = item.querySelector(".dropdown-toggle");
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const open = item.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open);
    });
});

// bahar click karne par dropdown band
document.addEventListener("click", (e) => {
    document.querySelectorAll(".has-dropdown.open").forEach((item) => {
        if (!item.contains(e.target)) {
            item.classList.remove("open");
            item.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
        }
    });
});