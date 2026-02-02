const themeToggle = document.getElementById('themeToggle');
        const htmlElement = document.documentElement;
        
        const savedTheme = localStorage.getItem('theme') || 'dark';
        htmlElement.setAttribute('data-theme', savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
        
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
        
        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Navigation active state
        const navLinks = document.querySelectorAll('.nav-link');
        
        function setActiveNavLink() {
            const sections = document.querySelectorAll('section');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', setActiveNavLink);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') === '#') return;
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, targetId);
                }
            });
        });
        
        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');
                
                // Close all other items
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
        
        // Tawk.to Live Chat Functions
        function openChat() {
            if (typeof Tawk_API !== 'undefined') {
                Tawk_API.maximize();
            } else {
                window.open('https://t.me/your_support_channel', '_blank');
            }
        }
        
        // NowPayment Integration Functions
        function buyPlan(planId, price) {
            // Generate unique IDs for each plan
            const planIds = {
                'weekly': 'PP_WEEKLY_001',
                'monthly_pro': 'PP_MONTHLY_PRO_002', 
                'monthly_elite': 'PP_MONTHLY_ELITE_003'
            };
            
            const productId = planIds[planId] || planId;
            
            // NowPayment integration
            const nowpaymentUrl = `https://nowpayments.io/payment/?iid=YOUR_INVOICE_ID&priceAmount=${price}&priceCurrency=USD&orderId=${productId}&orderDescription=PlusParser%20Subscription`;
            
            // Open payment window
            const paymentWindow = window.open(nowpaymentUrl, 'NowPayment', 'width=800,height=600');
            
            if (paymentWindow) {
                // Listen for payment completion
                const checkPayment = setInterval(() => {
                    try {
                        if (paymentWindow.closed) {
                            clearInterval(checkPayment);
                            // You would typically check payment status via your backend here
                            alert('Payment completed! You will receive your access details shortly.');
                        }
                    } catch (e) {
                        clearInterval(checkPayment);
                    }
                }, 1000);
            } else {
                alert('Please allow popups for this website to proceed with payment.');
            }
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            setActiveNavLink();
            
            // Add hover effects to cards
            document.querySelectorAll('.feature-card, .pricing-card, .blog-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                });
            });
            
            // Preload animations
            setTimeout(() => {
                document.querySelectorAll('.animate-on-scroll').forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight) {
                        el.classList.add('visible');
                    }
                });
            }, 100);
        });
        
        // DMCA Script
        const dmcaScript = document.createElement('script');
        dmcaScript.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js';
        document.body.appendChild(dmcaScript);
