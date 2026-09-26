let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
changeText();
setInterval(changeText, 3000);


// mix it up portfolio//

// const circles = document.querySelectorAll('.circle');
// circles.forEach(elem=>{
//     var dots = elem.getAttribute("data-dots");
//     var marked = elem.getAttribute("data-percent");
//     var percent = Math.floor(dots*marked/100);
//     var points = "";
//     var rotate = 360 / dots;


//     for(let i = 0 ; i < dots ; i++){
//         points += '<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>';
//     }
//     elem.innerHTML = points;

//     const pointsMarked = elem.querySelectorAll('.points');
//     for(let i = 0; i<percent ; i++){
//         pointsMarked[i].classList.add('marked')
//     }
// })
// circle--skill--js //

const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 / dots;


    for (let i = 0; i < dots; i++) {
        points += '<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>';
    }
    elem.innerHTML = points;
});

// mix it up portfolio//

var mixer = mixitup('.portfolio-gallery');
// web menu //
let menuli = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');


// menu link ko section ki id se match karta hai (naye sections add karne se nahi tootega)
function activeMenu() {
    let current = section[0];
    section.forEach(sec => {
        if (window.scrollY + 97 >= sec.offsetTop) current = sec;
    });
    let id = current.id;
    menuli.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
}
activeMenu();
window.addEventListener("scroll", activeMenu);



// ---sticky nabar------ //
const header = document.querySelector("header");
window.addEventListener("scroll", function() {
    header.classList.toggle("sticky", window.scrollY > 50)
});

// contact form -> sends to jairamofficail@gmail.com (via FormSubmit)
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const sendBtn = document.querySelector("#send-btn");

// dropdown chunne par rang normal ho jaye
contactForm.querySelectorAll("select").forEach((sel) => {
    sel.addEventListener("change", () => sel.classList.add("chosen"));
});

function buildFormData() {
    const fd = new FormData(contactForm);
    fd.append("_subject", "New message from your portfolio website");
    fd.append("_template", "table");
    fd.append("_captcha", "false");
    return fd;
}

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const showStatus = (text, type) => {
        formStatus.textContent = text;
        formStatus.className = "form-status " + type;
    };

    // FormSubmit sirf live website (http/https) se kaam karta hai, file:// se nahi
    if (location.protocol === "file:") {
        showStatus("Form sirf live website ya local server par kaam karega (file open karne se nahi).", "error");
        return;
    }

    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    showStatus("", "");

    try {
        const res = await fetch("https://formsubmit.co/ajax/jairamofficail@gmail.com", {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: buildFormData()
        });
        const data = await res.json().catch(() => ({}));
        const msg = (data.message || "").toLowerCase();

        if (data.success === true || data.success === "true") {
            showStatus("Thank you! Your message has been sent.", "success");
            contactForm.reset();
            contactForm.querySelectorAll("select").forEach((sel) => sel.classList.remove("chosen"));
        } else if (msg.includes("activat")) {
            // Pehli dafa: FormSubmit ne activation email bheji hai
            showStatus("Form activation pending: jairamofficail@gmail.com inbox (ya spam) mein FormSubmit ki email kholein aur 'Activate Form' dabayein.", "error");
        } else {
            throw new Error(data.message || "Failed");
        }
    } catch (err) {
        console.error("Form error:", err);
        showStatus("Sorry, message could not be sent. Please try WhatsApp.", "error");
    } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send Message";
    }
});

// ---toggle icon navbar------ //
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

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

// link par click ya scroll karne par menu band
navlist.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
window.addEventListener("scroll", () => {
    if (navlist.classList.contains("open")) setMenu(false);
});
// ---parallax------ //


// scroll reveal: ek dafa smooth animation, phir element wahi rehta hai
const revealEls = document.querySelectorAll(".scroll-scale, .scroll-bottom, .scroll-top, .stagger");

// stagger wale grids ke har card ko delay number
document.querySelectorAll(".stagger").forEach((group) => {
    [...group.children].forEach((child, i) => child.style.setProperty("--d", i));
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

revealEls.forEach((el) => observer.observe(el));

// footer year
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
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

// ---- Clean URL: address bar mein sirf domain dikhe (index.html / #section nahi) ----
function cleanUrl() {
    if (location.protocol === "file:") return; // local file par kuch na karein
    const cleanPath = location.pathname.replace(/index\.html$/, "");
    if (location.hash || cleanPath !== location.pathname) {
        history.replaceState(null, "", cleanPath + location.search);
    }
}

// menu / footer ke #links: page scroll ho, URL mein #home wagera na aaye
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
    });
});

// kisi service page se "index.html#services" par aaye to pehle us section tak jao, phir URL saaf
window.addEventListener("load", () => {
    if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) setTimeout(() => target.scrollIntoView(), 60);
    }
    cleanUrl();
});