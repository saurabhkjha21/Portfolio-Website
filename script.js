// script.js

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Animate stats numbers
  const statNumbers = document.querySelectorAll(".stat-number");
  const animateStats = () => {
    statNumbers.forEach((num) => {
      const target = +num.getAttribute("data-target");
      let count = 0;
      const increment = target / 100;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          num.textContent = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          num.textContent = target;
        }
      };
      updateCount();
    });
  };

  // Animate skill bars
  const skillProgress = document.querySelectorAll(".skill-progress");
  const animateSkills = () => {
    skillProgress.forEach((bar) => {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = `${progress}%`;
    });
  };

  // Intersection Observer for stats and skills
  const observerOptions = { threshold: 0.3 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("hero")) {
          animateStats();
        }
        if (entry.target.classList.contains("skills")) {
          animateSkills();
        }
      }
    });
  }, observerOptions);

  const heroSection = document.querySelector(".hero");
  const skillsSection = document.querySelector(".skills");
  observer.observe(heroSection);
  observer.observe(skillsSection);

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      }
    });
  });

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all required fields.");
      return;
    }
    alert("Thanks for reaching out! Your message has been sent (demo).");
    contactForm.reset();
  });
});
