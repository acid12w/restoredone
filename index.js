// The home-page intro plays once per browser session. The flag is only set by
// the home page itself (see below), so visiting About/Services first no longer
// "uses up" the intro.
const INTRO_KEY = "homeIntroPlayed";

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {}
}

const lenis = new Lenis();

lenis.on("scroll", (e) => {});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

document.addEventListener("DOMContentLoaded", () => {
  // Only the home page has the hero intro; other pages use revealTransition().
  if (!document.querySelector("#hero-img")) return;

  const introSeen = hasSeenIntro();

  const tl = gsap.timeline({
    delay: 0.3,
    defaults: {
      ease: "hop",
    },
  });

  if (introSeen) {
    // Returning to home: skip the intro, behave like any other page transition.
    tl.set("#block", { display: "none" });

    tl.set("#hero-img", {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    });
    tl.to("#hero-img", {
      scale: 1,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    });

    tl.to(
      [".nav-ul", ".line h1", ".word p", ".cta-label button"],
      {
        y: "0%",
        duration: 1.3,
        stagger: 0.2,
        onStart: () =>
          gsap.to(".cta-label button", {
            scale: 1,
            duration: 1.5,
            stagger: 0.75,
            delay: 0.75,
            ease: "hop",
          }),
      },
      "<"
    );

    return;
  } else {
    // First visit to home this session: play the full intro once.
    markIntroSeen();

    tl.to("#block", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      stagger: 0.1,
      delay: 0.75,
      onStart: () =>
        gsap.to("#hero-img", { scale: 1, duration: 2, ease: "hop" }),
    });

    tl.to(
      [".nav-ul", ".line h1", ".word p", ".cta-label button"],
      {
        y: "0%",
        duration: 1.5,
        stagger: 0.2,
        onStart: () =>
          gsap.to(".cta-label button", {
            scale: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.5,
            stagger: 0.75,
            delay: 0.75,
            ease: "hop",
          }),
      },
      "<"
    );
  }
});

const mobileNav = document.querySelector("#mobile-nav");
const navbarDropdown = document.querySelector("#navbar-dropdown");
let isActive = false;

// (naming kept from the original: "show" slides the menu in, "hide" slides it out)
function closeMobileMenu() {
  if (!isActive) return;
  isActive = false;
  mobileNav.setAttribute("aria-expanded", "false");
  gsap.to(navbarDropdown, {
    x: 750,
    ease: "power4.inOut",
    // Hide it from keyboard/screen readers once it has slid out of view.
    onComplete: () => {
      if (!isActive) navbarDropdown.classList.remove("is-open");
    },
  });
}

mobileNav.addEventListener("click", function (e) {
  if (isActive) {
    closeMobileMenu();
  } else {
    navbarDropdown.classList.add("is-open");
    mobileNav.setAttribute("aria-expanded", "true");
    gsap.to(navbarDropdown, { x: 0, ease: "power4.inOut" });
    isActive = true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // "/", "/index.html" and "index.html" are all the same page.
  const normalizePath = (path) => path.replace(/index\.html$/, "");

  let isTransitioning = false;

  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", (event) => {
      // Let the browser handle new-tab clicks, downloads, etc.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.hasAttribute("download") ||
        (link.target && link.target !== "_self")
      ) {
        return;
      }

      // Resolve against the current page so relative and absolute hrefs behave the same.
      const url = new URL(link.href, window.location.href);

      // External sites, mailto:, tel:, etc. -> normal navigation, no transition.
      if (url.protocol !== window.location.protocol || url.origin !== window.location.origin) {
        return;
      }

      const samePage =
        normalizePath(url.pathname) === normalizePath(window.location.pathname);

      // In-page anchors (#section) -> normal scrolling.
      if (samePage && url.hash) return;

      event.preventDefault();

      if (samePage) {
        // Already here: don't reload, just close the mobile menu if it's open.
        if (typeof closeMobileMenu === "function") closeMobileMenu();
        return;
      }

      if (isTransitioning) return;
      isTransitioning = true;

      animateTransition().then(() => {
        window.location.href = url.href;
      });
    });
  });

  // Coming back via the browser's back/forward cache would otherwise leave the
  // transition curtain covering the page.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    isTransitioning = false;
    gsap.set("#transition-block", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
  });

  revealTransition().then(() => {});

  function revealTransition() {
    return new Promise((resolve) => {
      gsap.to(".img-transition", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
        stagger: 0.1,
        delay: 0.075,
        ease: "hop",
        onComplete: resolve,
      });

      gsap.to(
        [".line h2", ".line p"],
        {
          y: "0%",
          duration: 1.5,
          stagger: 0.2,
        },
        "<"
      );
    });
  }

  function animateTransition() {
    return new Promise((resolve) => {
      gsap.to("#transition-block", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.5,
        stagger: 0.1,
        delay: 0.75,
        onComplete: resolve,
      });
    });
  }
});

// ---------- Adaptive navigation bar ----------
// Looks at what is painted behind the (transparent) nav and flips it between
// light text ("light" background) and white text ("dark" background).
// A section can force the result with data-nav-theme="dark|light".
const siteNav = document.querySelector(".site-nav");

function parseColor(value) {
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(parseFloat);
  return { r, g, b, a };
}

function themeAtPoint(x, y) {
  for (const el of document.elementsFromPoint(x, y)) {
    // Skip the nav itself and fixed overlays (page-transition curtains).
    if (siteNav.contains(el)) continue;
    const style = getComputedStyle(el);
    if (style.position === "fixed") continue;

    if (el.dataset.navTheme) return el.dataset.navTheme;

    const color = parseColor(style.backgroundColor);
    if (color && color.a > 0.5) {
      const luminance = (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255;
      return luminance < 0.5 ? "dark" : "light";
    }
  }
  return "light";
}

function updateNavTheme() {
  if (!siteNav) return;
  const rect = siteNav.getBoundingClientRect();
  const y = rect.top + rect.height / 2;

  // Sample left / middle / right so one odd element doesn't decide for the whole bar.
  const votes = [0.15, 0.5, 0.85].map((f) => themeAtPoint(window.innerWidth * f, y));
  const dark = votes.filter((v) => v === "dark").length >= 2;

  siteNav.dataset.navTheme = dark ? "dark" : "light";
  siteNav.dataset.scrolled = window.scrollY > 8 ? "true" : "false";
}

let navTick = false;
function queueNavUpdate() {
  if (navTick) return;
  navTick = true;
  requestAnimationFrame(() => {
    navTick = false;
    updateNavTheme();
  });
}

window.addEventListener("scroll", queueNavUpdate, { passive: true });
window.addEventListener("resize", queueNavUpdate);
window.addEventListener("load", queueNavUpdate);
window.addEventListener("pageshow", queueNavUpdate);
lenis.on("scroll", queueNavUpdate);
updateNavTheme();

// Fade-up on scroll for anything marked data-reveal (skipped for reduced motion).
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.utils.toArray("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

// Testimonial video: the clipped frame opens up as it scrolls into view.
// (Triggered by the video frame itself so it works at any screen size.)
if (document.querySelector("#clipy")) {
  gsap.to("#clipy", {
    scrollTrigger: {
      trigger: "#clipy",
      start: "top 85%",
      end: "top 30%",
      scrub: true,
      onEnter: playVid,
    },
    clipPath: "inset(0 0 0 0)",
    ease: "power4.inOut",
  });
}

let vid = document.getElementById("myVideo");

function playVid() {
  // play() returns a promise that rejects if the browser blocks autoplay.
  if (vid) vid.play().catch(() => {});
}

function pauseVid() {
  if (vid) vid.pause();
}

// const accordion = document.querySelector("#acc-box");
// const accordions = document.querySelectorAll("#acc");

// accordion.addEventListener("click", function(e){

//     const target = e.target.closest('#acc');

//     if(!target) return;

//     accordions.forEach(el => {

//         if(el === target) {

//             gsap.to(el, {
//                 width: "45%",
//                 ease: "power4.inOut",
//                 duration: .5,
//             })
//         }else {
//             gsap.to(el, {
//                 width: "25%",
//                 ease: "power4.inOut",
//                 duration: .5,
//             })
//         }
//     });

// });

const testimonialCards = gsap.utils.toArray("#testimonial-cards");

// const animate = gsap.to(testimonialCards, {
//         stagger: 1,
//         duration: 1.5,
//         rotation: -120,
//         y: -700,
//         ease: "power4.in",

// })

// const pinTl = gsap.timeline();

//     ScrollTrigger.create({
//         trigger: ".square",
//         start:"top 30%",
//         end: "+=1000",
//         pin: true,
//         animation: animate,
//         scrub: 0.5,
//     });

// testimonialCards.forEach(card => {
//     gsap.set(card, {
//        y: window.innerHeight,
//     })
// })

//     ScrollTrigger.create({
//         trigger: ".sticky-cards",
//         start:"top top",
//         end: `+=${window.innerHeight * 3}px`,
//         pin: true,
//         pinSpacing: true,
//         scrub: 2,
//         onUpdate: (self) => {
//             const progress = self.progress;
//             const totalCards = testimonialCards.length;
//             const progressPerCard = 1 / totalCards;

//             testimonialCards.forEach((card, index) => {
//                 const cardStart = index * progressPerCard;
//                 let cardProgress = (progress - cardStart) / progressPerCard;
//                 cardProgress = Math.min(Math.max(cardProgress, 0), 1);

//                 let yPas = window.innerHeight * (1 - cardProgress);
//                 let xPas = 0;

//                 if(cardProgress === 1 && index < totalCards - 1 ){
//                     const remainingProgress = (progress - (cardStart + progressPerCard)) / (1 - (cardStart + progressPerCard))
//                     if (remainingProgress > 0){
//                         const distanceMultiplier = 1 - index * 0.15;
//                         xPas = -window.innerWidth * 0.3 * distanceMultiplier * remainingProgress;
//                         yPas = -window.innerHeight * 0.3 * distanceMultiplier * remainingProgress;
//                     }
//                 }

//                 gsap.to(card, {
//                     y: yPas,
//                     // x: xPas,
//                     duration: 0,
//                     ease: "none"
//                 })
//             });
//         }
//     });

const stickyCardsAnimation = () => {
  const stickyCards = document.querySelectorAll(".sticky-card");

  stickyCards.forEach((card, index) => {
    if (index < stickyCards.length - 1) {
      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        endTrigger: stickyCards[stickyCards.length - 1],
        end: "top top",
        pin: true,
        pinSpacing: false,
      });
    }

    if (index < stickyCards.length - 1) {
      ScrollTrigger.create({
        trigger: stickyCards[index + 1],
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 - progress * 0.25;
          const rotation = (index % 2 === 0 ? 5 : -5) * progress;
          const afterOpacity = progress;

          gsap.set(card, {
            scale: scale,
            rotation: rotation,
            "--after-opacity": afterOpacity,
          });
        },
      });
    }
  });
};

// Pinned/stacking cards need a full viewport per card, which phones and
// tablets don't have, so below 1024px the cards simply stack in normal flow.
gsap.matchMedia().add("(min-width: 1024px)", () => {
  stickyCardsAnimation();
});

/* ScrollTrigger Docs

https://greensock.com/docs/v3/Plugins/ScrollTrigger

*/

/* 

learn more GreenSock and ScrollTrigger

https://www.creativeCodingClub.com

new lessons weekly
less than $1 per week

*/
