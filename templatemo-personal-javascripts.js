/*

TemplateMo 593 personal shape

https://templatemo.com/tm-593-personal-shape

*/

// JavaScript Document

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for portfolio items
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            const portfolioSection = document.querySelector('.portfolio-grid');
            if (portfolioSection) {
                portfolioObserver.observe(portfolioSection);
            }
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced form submission: prepare mailto and open email client; provide fallback with copy link
        (function() {
            const form = document.querySelector('.contact-form');
            const feedbackEl = document.getElementById('contact-feedback');
            const submitBtn = document.querySelector('.submit-btn');

            function showFeedback(text, type = 'info', extraHTML = '') {
                if (!feedbackEl) return;
                feedbackEl.style.display = 'block';
                feedbackEl.className = 'contact-feedback ' + type;
                feedbackEl.innerHTML = `<div>${text}</div>` + extraHTML;
            }

            function clearFeedback() {
                if (!feedbackEl) return;
                feedbackEl.style.display = 'none';
                feedbackEl.className = 'contact-feedback';
                feedbackEl.innerHTML = '';
            }

            function copyToClipboard(text) {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    return navigator.clipboard.writeText(text);
                } else {
                    const ta = document.createElement('textarea');
                    ta.value = text;
                    document.body.appendChild(ta);
                    ta.select();
                    try { document.execCommand('copy'); } catch(e) {}
                    document.body.removeChild(ta);
                    return Promise.resolve();
                }
            }

            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const originalText = submitBtn ? submitBtn.textContent : 'Send Message';

                    if (submitBtn) {
                        submitBtn.textContent = 'Preparing...';
                        submitBtn.disabled = true;
                        submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';
                    }

                    const name = form.name.value.trim();
                    const fromEmail = form.email.value.trim();
                    const subject = form.subject.value.trim();
                    const message = form.message.value.trim();
                    if (!name || !fromEmail || !subject || !message) {
                        showFeedback('Please fill out all fields.', 'error');
                        if (submitBtn) {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                            submitBtn.style.background = '';
                        }
                        return;
                    }

                    const to = 'jnguyen@bmtisd.com';
                    const mailSubject = `${subject} — ${name}`;
                    const body = `Name: ${name}\nEmail: ${fromEmail}\n\n${message}`;
                    const mailto = `mailto:${to}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;

                    showFeedback('Opening your email client. If it does not open, you can copy the message or click the link below.', 'info', `<div style="margin-top:0.5rem"><a class="contact-link" href="${mailto}">Open email client</a> · <button id="contact-copy-btn" class="contact-copy-btn">Copy message</button></div>`);

                    // Try to open the mailto link
                    window.location.href = mailto;

                    // Bind copy button
                    setTimeout(() => {
                        const copyBtn = document.getElementById('contact-copy-btn');
                        if (copyBtn) {
                            copyBtn.addEventListener('click', () => {
                                copyToClipboard(`To: ${to}\nSubject: ${mailSubject}\n\n${body}`).then(() => {
                                    showFeedback('Message copied to clipboard. Paste it into your email client.', 'success');
                                });
                            });
                        }
                    }, 50);

                    // After a short delay reset the button and optionally keep the form
                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.textContent = 'Message Ready';
                            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                        }
                        // Do not auto-reset form; let user confirm send in their email app
                    }, 800);
                });
            }
        })();


        // Enhanced parallax effect for hero background
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

