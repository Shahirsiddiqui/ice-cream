// ===============================
// IceCream Landing Page JS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------
     Smooth Scroll Navigation
  ---------------------------------- */
  const navLinks = document.querySelectorAll("nav a:not(.cta)");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const text = link.textContent.toLowerCase().replace(/\s/g, "");
      const target = document.getElementById(text);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------------------------------
     Sticky Header on Scroll
  ---------------------------------- */
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.style.backdropFilter = "blur(10px)";
      header.style.background = "rgba(255,255,255,0.15)";
    } else {
      header.style.backdropFilter = "none";
      header.style.background = "transparent";
    }
  });

  /* ---------------------------------
     Floating Ice Cream Animation
  ---------------------------------- */
  const ice = document.querySelector(".ice");
  let float = 0;

  function animateIce() {
    float += 0.03;
    ice.style.transform = `translateY(${Math.sin(float) * 8 - 10}px)`;
    requestAnimationFrame(animateIce);
  }
  animateIce();

  /* ---------------------------------
     Animated Stats Counter
  ---------------------------------- */
  const counters = document.querySelectorAll(".stat .num");

  const animateCounter = (el, target) => {
    let current = 0;
    const increment = target / 60;

    const update = () => {
      current += increment;
      if (current < target) {
        el.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    };
    update();
  };

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            animateCounter(counter, parseInt(counter.textContent));
          });
          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.6 }
  );

  statsObserver.observe(document.querySelector(".stats"));

  /* ---------------------------------
     Button Interactions
  ---------------------------------- */
  document.querySelector(".btn-primary").addEventListener("click", () => {
    alert("🍨 Product section coming soon!");
  });

  document.querySelector(".btn-ghost").addEventListener("click", () => {
    alert("📖 Menu will be available shortly!");
  });

  /* ---------------------------------
     Nav Active State on Scroll
  ---------------------------------- */
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.textContent.toLowerCase().replace(/\s/g, "") === current) {
        link.classList.add("active");
      }
    });
  });
});
