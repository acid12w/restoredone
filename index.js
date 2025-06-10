window.addEventListener("load", (event) => {
    sessionStorage.setItem("loadStatus", "hasLoaded");    
});

const lenis = new Lenis()

lenis.on('scroll', (e) => {
 
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})


gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
CustomEase.create('hop', "0.9, 0, 0.1, 1");

document.addEventListener("DOMContentLoaded", () => {
    const sessionStatus = sessionStorage.getItem("loadStatus");

    console.log(sessionStatus)

    const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
            ease: 'hop'
        }
    })
    
   if(sessionStatus === "hasLoaded") {
    tl.set("#block", {display: "none"})

    tl.set('#hero-img', { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', })
    tl.to('#hero-img', { scale: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', })

    tl.to([".nav-ul", ".line h1", ".word p", ".cta-label button"], {
        y: '0%',
        duration: 1.3,
        stagger: 0.2,
        onStart: () => gsap.to('.cta-label button', { scale: 1, duration: 1.5, stagger: 0.75, delay: 0.75, ease: "hop"})
    },
    "<")

    return;
    }else {
       
        tl.to("#block", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 1,
            stagger: 0.1,
            delay: 0.75,
            onStart: () => gsap.to('#hero-img', { scale: 1, duration: 2, ease: "hop"})
        });

        tl.to([".nav-ul", ".line h1", ".word p", ".cta-label button"], {
            y: '0%',
            duration: 1.5,
            stagger: 0.2,
            onStart: () => gsap.to('.cta-label button', { scale: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.5, stagger: 0.75, delay: 0.75, ease: "hop"})
        },
        "<")
    }
    
    

    
})


document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");
                console.log(window.location.pathname)
                if(href && !href.startsWith('#') && href !== window.location.pathname) {
                    animateTransition().then(()=> {
                        window.location.href = href;
                    });
                }
                
            });
        });

    revealTransition().then(() => {
       
    });

    function revealTransition(){
        
        return new Promise((resolve) => {
            
            gsap.to(".img-transition", {
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                duration: 1,
                stagger: 0.1,
                delay: 0.075,
                ease: 'hop',
                onComplete: resolve,
            })

            gsap.to([ ".line h2", ".line p"], {
                y: '0%',
                duration: 1.5,
                stagger: 0.2,
            },
            "<")
         

        })
    };

    function animateTransition(){
        console.log("transition")
        return new Promise((resolve) => {
            gsap.to("#transition-block", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: .5,
                stagger: 0.1,
                delay: 0.75,
                onComplete: resolve,
            })
        })
    };
});


gsap.to("#clipy", {
    scrollTrigger: {
        trigger: "#testimonial",
        start: 500, // when the top of the trigger hits the top of the viewport
          end: "bottom bottom", // bottom of the trigger hits the bottom of the vp
        scrub: true,
        onEnter: playVid, 
        // onLeave: pauseVid,
    },
    clipPath: "inset(0 0 0 0)",
    ease: "power4.inOut",
});

let vid = document.getElementById("myVideo");

function playVid() {
    vid.play();
}

function pauseVid() {
    console.log("pause video"),
    vid.pause();
}


const accordion = document.querySelector("#acc-box");
const accordions = document.querySelectorAll("#acc");

accordion.addEventListener("click", function(e){

    const target = e.target.closest('#acc');

    if(!target) return;

    accordions.forEach(el => {

        if(el === target) {

            gsap.to(el, {
                width: "45%", 
                ease: "power4.inOut",
                duration: .5,
            })
        }else {
            gsap.to(el, {
                width: "25%",
                ease: "power4.inOut",
                duration: .5,
            }) 
        }
    });
   
});                                                     