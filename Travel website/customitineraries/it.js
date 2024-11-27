// Locomotive Scroll Initialization
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    multiplier: 1.5
  });
  
  // Update ScrollTrigger on Locomotive Scroll updates
  scroll.on('scroll', ScrollTrigger.update);
  
  ScrollTrigger.scrollerProxy('[data-scroll-container]', {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector('[data-scroll-container]').style.transform
      ? 'transform'
      : 'fixed'
  });
  
  // GSAP ScrollTrigger Animations
  gsap.utils.toArray('.card').forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'bottom 60%',
          scroller: '[data-scroll-container]',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
  
  // Refresh ScrollTrigger and Locomotive after all content is loaded
  ScrollTrigger.addEventListener('refresh', () => scroll.update());
  ScrollTrigger.refresh();
  