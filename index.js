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

const mobileNav = document.querySelector('#mobile-nav');
const navbarDropdown = document.querySelector('#navbar-dropdown');
let isActive = false;

mobileNav.addEventListener('click', function(e){

    console.log(isActive)

    if(isActive){
        open()
    }else{
        close()
    }

    function open(){
        gsap.to(navbarDropdown, {
            x: 750,
            ease: "power4.inOut",
        })  
        isActive = false;
    }

    function close(){
        gsap.to(navbarDropdown, {
            x: 0,
            ease: "power4.inOut",
        })  
        isActive = true;
    }
    
    
});


document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", (event) => {
            event.preventDefault();
            const href = link.getAttribute("href");
                console.log(href, window.location.pathname)
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
                    endTrigger: stickyCards[stickyCards.length -1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                })
            }

            if(index < stickyCards.length - 1){
                ScrollTrigger.create({
                    trigger: stickyCards[index + 1],
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.25;
                        const rotation = (index % 2 === 0 ? 5: - 5) * progress;
                        const afterOpacity = progress;

                        gsap.set(card, {
                            scale: scale, 
                            rotation: rotation,
                            "--after-opacity": afterOpacity,
                        })
                    }
                })
            }
        })

        
    }

    stickyCardsAnimation()














 



/* ScrollTrigger Docs

https://greensock.com/docs/v3/Plugins/ScrollTrigger

*/





/* 

learn more GreenSock and ScrollTrigger

https://www.creativeCodingClub.com

new lessons weekly
less than $1 per week

*/
