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


const animate = gsap.to(testimonialCards, {
        stagger: 1,
        duration: 1.5,
        rotation: -120,
        y: -700,
        ease: "power4.in",

})

const pinTl = gsap.timeline();

    ScrollTrigger.create({
        trigger: ".square",
        start:"top 30%",
        end: "+=1000",
        pin: true,
        animation: animate,
        scrub: 0.5,
    });

    // let testimonials = gsap.utils.toArray("#testimonial-card")

    // pinTl.to(testimonials, {
    //     scrollTrigger: {
    //         trigger: "#testimonials",
    //         start: "top top", // when the top of the trigger hits the top of the viewport
    //         scrub: true,
    //         markers: true
    //     },
    //     stagger: 0.2,
    //     duration: .5,
    //     rotation: -120,
    //     y: -700,
        
    // }, ">");

    // pinTl.to('#testimonial-card-2', {
    //     scrollTrigger: {
    //         trigger: "#testimonials",
    //         start: "top top", // when the top of the trigger hits the top of the viewport
    //         scrub: true,
    //         markers: true
    //     },
    //     stagger: 0.2,
    //     duration: .5,
    //     rotation: -20,
    //     y: -300,
 
    // });

    // pinTl.to('#testimonial-card-3', {
    //     scrollTrigger: {
    //         trigger: "#testimonials",
    //         start: "top top",
    //         scrub: true,
    //         markers: true
    //     },
    //     stagger: 0.2,
    //     duration: .5,
    //     rotation: -20,
    //     y: -300,
    // }, ">");

    // pinTl.to('#testimonial-card-2', {
    //     scrollTrigger: {
    //         trigger: "#testimonials",
    //         start: "500", // when the top of the trigger hits the top of the viewport
    //         end: "bottom bottom", 
    //         scrub: true,
    //         pin: true,
    //     },
    //     stagger: 0.2,
    //     duration: 1.5,
    //     rotation: -20,
    //     y: -300,
    //     ease: "power4.inOut",
    // });

    // pinTl.to('#testimonial-card-3', {
    //     scrollTrigger: {
    //         trigger: "#testimonials",
    //         start: "500", // when the top of the trigger hits the top of the viewport
    //         end: "bottom bottom", 
    //         scrub: true,
    //         pin: true,
    //     },
    //     stagger: 0.2,
    //     duration: 1.5,
    //     rotation: -20,
    //     y: -300,
    //     ease: "power4.inOut",
    // });



// learn what all this code means at
// https://www.creativecodingclub.com/bundles/creative-coding-club
// unlock over 250 GSAP lessons today


const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)")
const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)")


gsap.set(photos, {yPercent:101})

const allPhotos = gsap.utils.toArray(".desktopPhoto")


// create
let mm = gsap.matchMedia();

// add a media query. When it matches, the associated function will run
mm.add("(min-width: 600px)", () => {

  // this setup code only runs when viewport is at least 600px wide
  console.log("desktop")
	
  ScrollTrigger.create({
	trigger:".gallery",
	start:"top top",
	end:"bottom bottom",
	pin:".right"
})

//create scrolltrigger for each details section
//trigger photo animation when headline of each details section 
//reaches 80% of window height
details.forEach((detail, index)=> {

	let headline = detail.querySelector("h1")
	let animation = gsap.timeline()
	   .to(photos[index], {yPercent:0})
	   .set(allPhotos[index], {autoAlpha:0})
	ScrollTrigger.create({
		trigger:headline,
		start:"top 80%",
		end:"top 50%",
		animation:animation,
		scrub:true,
		markers:false
	})
})
	
	
  
  return () => { // optional
    // custom cleanup code here (runs when it STOPS matching)
	  console.log("mobile")
  };
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
