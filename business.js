(function() {
  "use strict";

  /* -------- CONFIG -------- */
  var WHATSAPP_NUMBER = "919360219967"; // Digits only
  var WHATSAPP_MESSAGE = "Hi, I'm interested in your web/digital services. I would like to discuss my project.";

  function buildWaLink() {
    var num = WHATSAPP_NUMBER.replace(/[^0-9]/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);
  }
  var waHref = buildWaLink();

  /* -------- WHATSAPP BUTTONS -------- */
  var waFloat = document.getElementById("waFloat");
  var waContactBtn = document.getElementById("waContactBtn");
  var waFooterLink = document.getElementById("waFooterLink");

  if (waFloat) {
    waFloat.addEventListener("click", function(e) {
      e.preventDefault();
      window.open(waHref, "_blank", "noopener");
    });
  }
  if (waContactBtn) {
    waContactBtn.addEventListener("click", function(e) {
      e.preventDefault();
      window.open(waHref, "_blank", "noopener");
    });
  }
  if (waFooterLink) {
    waFooterLink.addEventListener("click", function(e) {
      e.preventDefault();
      window.open(waHref, "_blank", "noopener");
    });
  }

  /* -------- NAVBAR & MOBILE MENU -------- */
  var navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", function() {
      navbar.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function() {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navLinks.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -------- PORTFOLIO FILTER -------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var pfCards = document.querySelectorAll(".pf-card");

  if (filterBtns.length > 0 && pfCards.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener("click", function() {
        filterBtns.forEach(function(b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");
        pfCards.forEach(function(card) {
          var match = filter === "all" || card.getAttribute("data-cat") === filter;
          card.classList.toggle("hidden-card", !match);
        });
      });
    });
  }

  /* -------- FAQ ACCORDION -------- */
  var faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length > 0) {
    faqItems.forEach(function(item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (q && a) {
        q.addEventListener("click", function() {
          var isOpen = item.classList.contains("open");
          // Close all other open FAQs
          document.querySelectorAll(".faq-item.open").forEach(function(openItem) {
            if (openItem !== item) {
              openItem.classList.remove("open");
              var openAnswer = openItem.querySelector(".faq-a");
              if (openAnswer) {
                openAnswer.style.maxHeight = null;
              }
            }
          });
          item.classList.toggle("open", !isOpen);
          a.style.maxHeight = !isOpen ? a.scrollHeight + "px" : null;
        });
      }
    });
  }

  /* -------- EMAILJS INITIALIZATION -------- */
  if (window.emailjs) {
    emailjs.init("9nS2g534JgL7dFMuJ"); // Replace with your EmailJS Public Key
  }

  /* -------- QUOTE FORM & DIRECT EMAIL -------- */
  var form = document.getElementById("quoteForm");
  var success = document.getElementById("formSuccess");
  var submitBtn = document.getElementById("submitBtn");

  if (form && success) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (submitBtn) {
        submitBtn.innerText = "Sending Enquiry...";
        submitBtn.disabled = true;
      }

      var templateParams = {
        from_name: document.getElementById("fullName") ? document.getElementById("fullName").value : "N/A",
        biz_name: document.getElementById("bizName") ? document.getElementById("bizName").value || "N/A" : "N/A",
        phone: document.getElementById("phone") ? document.getElementById("phone").value : "N/A",
        reply_to: document.getElementById("email") ? document.getElementById("email").value : "N/A",
        biz_type: document.getElementById("bizType") ? document.getElementById("bizType").value || "N/A" : "N/A",
        service: document.getElementById("service") ? document.getElementById("service").value : "N/A",
        budget: document.getElementById("budget") ? document.getElementById("budget").value || "Not Specified" : "Not Specified",
        message: document.getElementById("desc") ? document.getElementById("desc").value : "N/A"
      };

      if (window.emailjs && window.emailjs.send) {
        emailjs.send("service_41qtuuy", "template_0ctceh8", templateParams)
          .then(function() {
            form.style.display = "none";
            success.classList.add("show");
          }, function(error) {
            alert("Failed to send message via EmailJS. Showing submission success as fallback.");
            form.style.display = "none";
            success.classList.add("show");
          });
      } else {
        // Fallback display
        form.style.display = "none";
        success.classList.add("show");
      }
    });
  }

  /* -------- SCROLL TO TOP WITH PROGRESS RING -------- */
  var scrollTopBtn = document.getElementById("scrollToTopBtn");
  var progressCircle = document.querySelector(".progress-ring-circle");

  if (scrollTopBtn && progressCircle) {
    var circumference = 2 * Math.PI * 20; // 125.6px

    window.addEventListener("scroll", function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (scrollTop > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }

      if (docHeight > 0) {
        var scrollPercent = scrollTop / docHeight;
        var offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
      }
    }, { passive: true });

    scrollTopBtn.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* -------- SCROLL REVEAL -------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function(el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function(el) {
      el.classList.add("in");
    });
  }

  /* -------- FOOTER YEAR -------- */
  var yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

})();