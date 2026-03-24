/* ============================================
   BLUEPEAK FINANCIAL - JavaScript
   ============================================ */

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMobileNav() {
  if (navLinks && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        closeMobileNav();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnToggle = mobileToggle.contains(event.target);

      if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });

    // Ensure mobile menu closes when switching to desktop view
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        closeMobileNav();
      }
    });
  }
});

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // close mobile menu after clicking anchor link
    closeMobileNav();
  });
});

// Contact Form Submission
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // If validation passes, submit to Formspree
    contactForm.submit();
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);

// Add scroll animation effect
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card, .plan-card, .testimonial, .step').forEach(el => {
    observer.observe(el);
  });
});

// Investment calculator (for services page)
function initInvestmentCalculator() {
  const amountInput = document.getElementById('investment-amount');
  const planSelect = document.getElementById('plan-select');
  const resultDisplay = document.getElementById('calculator-result');

  if (!amountInput || !planSelect || !resultDisplay) return;

  const plans = {
    basic: { rate: 5, returnRate: 0.08 },
    standard: { rate: 8, returnRate: 0.12 },
    premium: { rate: 12, returnRate: 0.15 }
  };

  function calculateReturn() {
    const amount = parseFloat(amountInput.value);
    const plan = planSelect.value;

    if (!amount || amount <= 0 || !plan) {
      resultDisplay.innerHTML = '';
      return;
    }

    const planData = plans[plan];
    const yearlyReturn = (amount * planData.returnRate);
    const monthlyReturn = yearlyReturn / 12;

    resultDisplay.innerHTML = `
      <div class="calculator-result">
        <h4>Estimated Returns</h4>
        <p><strong>Investment Amount:</strong> $${amount.toFixed(2)}</p>
        <p><strong>Plan:</strong> ${plan.charAt(0).toUpperCase() + plan.slice(1)}</p>
        <p><strong>Est. Monthly Return:</strong> <span class="highlight">$${monthlyReturn.toFixed(2)}</span></p>
        <p><strong>Est. Yearly Return:</strong> <span class="highlight">$${yearlyReturn.toFixed(2)}</span></p>
        <p style="font-size: 0.85rem; color: #999; margin-top: 1rem;">*Returns are estimated and not guaranteed. Actual returns depend on market conditions and investment performance.</p>
      </div>
    `;
  }

  amountInput.addEventListener('input', calculateReturn);
  planSelect.addEventListener('change', calculateReturn);
}

document.addEventListener('DOMContentLoaded', initInvestmentCalculator);

// Dashboard data (simulated)
function initDashboard() {
  const balanceElement = document.getElementById('current-balance');
  if (!balanceElement) return;

  // Simulated user data
  const userData = {
    balance: 25438.50,
    invested: 15000.00,
    returns: 10438.50,
    activeInvestments: 3
  };

  // Update dashboard with sample data
  if (document.getElementById('user-balance')) {
    document.getElementById('user-balance').textContent = `$${userData.balance.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }
  if (document.getElementById('invested-amount')) {
    document.getElementById('invested-amount').textContent = `$${userData.invested.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }
  if (document.getElementById('returns-earned')) {
    document.getElementById('returns-earned').textContent = `$${userData.returns.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }
  if (document.getElementById('active-count')) {
    document.getElementById('active-count').textContent = userData.activeInvestments;
  }
}

document.addEventListener('DOMContentLoaded', initDashboard);

// Add active class to current year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearSpans = document.querySelectorAll('.current-year');
  yearSpans.forEach(span => {
    span.textContent = new Date().getFullYear();
  });
});

// Scroll to top button (if needed)
const scrollTopBtn = document.querySelector('.scroll-top-btn');
if (scrollTopBtn) {
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = 'block';
    } else {
      scrollTopBtn.style.display = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
