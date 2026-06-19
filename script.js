/* =============================================
   script.js — Portfolio Interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- NAVBAR scroll behavior ----- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ----- HAMBURGER MENU ----- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate the three bars
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ----- PROFILE IMAGE UPLOAD ----- */
  function setupImageUpload(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img         = document.getElementById('profileImg');
        const placeholder = document.getElementById('profilePlaceholder');
        const changeBtn   = document.getElementById('changePhotoBtn');
        img.src = ev.target.result;
        img.style.display = 'block';
        placeholder.style.display = 'none';
        changeBtn.style.display = 'block';
      };
      reader.readAsDataURL(file);
    });
  }

  setupImageUpload('imageUpload');
  setupImageUpload('imageUpload2');

  /* ----- INTERSECTION OBSERVER: reveal sections ----- */
  const revealEls = document.querySelectorAll('.reveal, .timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger delay based on data-index if present
        const delay = entry.target.dataset.index
          ? parseInt(entry.target.dataset.index) * 120
          : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => observer.observe(el));

  /* ----- SKILL BARS animation ----- */
  const skillsSection = document.getElementById('skills');
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        document.querySelectorAll('.bar-fill').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('animate'), i * 100);
        });
      }
    });
  }, { threshold: 0.3 });

  skillsObserver.observe(skillsSection);

  /* ----- Add reveal class to section elements dynamically ----- */
  const sectionsToReveal = [
    '.section-header',
    '.cert-card',
    '.contact-info',
    '.contact-form'
  ];
  sectionsToReveal.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  });

 
  /* ----- Smooth active nav highlight on scroll ----- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navAnchors.forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === `#${current}`) {
        a.style.color = 'var(--accent)';
      }
    });
  });

});
