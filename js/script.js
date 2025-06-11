// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
    
    // Dropdown Menu for Mobile - Only show on click
    const menuItems = document.querySelectorAll('.menu-item-has-children > a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 767) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other open submenus first
                document.querySelectorAll('.menu-item-has-children').forEach(el => {
                    if (el !== this.parentElement) {
                        el.classList.remove('active');
                        el.querySelector('.sub-menu').style.display = 'none';
                    }
                });
                
                // Toggle current submenu
                const parent = this.parentElement;
                parent.classList.toggle('active');
                const subMenu = this.nextElementSibling;
                subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Close submenus when clicking elsewhere
    document.addEventListener('click', function() {
        if (window.innerWidth <= 767) {
            document.querySelectorAll('.menu-item-has-children').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.sub-menu').style.display = 'none';
            });
            
            if (mainNav) {
                mainNav.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.querySelector('i').classList.remove('fa-times');
                    mobileToggle.querySelector('i').classList.add('fa-bars');
                }
            }
        }
    });
    
    // Prevent clicks inside nav from closing
    if (mainNav) {
        mainNav.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });
        
        testimonialsSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialsSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialsSlider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        testimonialsSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });
        
        testimonialsSlider.addEventListener('touchend', () => {
            isDown = false;
        });
        
        testimonialsSlider.addEventListener('touchmove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Clients Slider Animation
    const clientsSlider = document.querySelector('.clients-slider');
    if (clientsSlider) {
        let direction = -1;
        
        function animateClients() {
            if (clientsSlider.scrollLeft + clientsSlider.clientWidth >= clientsSlider.scrollWidth) {
                direction = 1;
            } else if (clientsSlider.scrollLeft <= 0) {
                direction = -1;
            }
            
            clientsSlider.scrollLeft += direction * 1;
            requestAnimationFrame(animateClients);
        }
        
        // Only animate if there's overflow
        if (clientsSlider.scrollWidth > clientsSlider.clientWidth) {
            animateClients();
        }
    }
    
    // Scroll reveal animation
    if (typeof ScrollReveal !== 'undefined') {
        const scrollReveal = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: true
        });
        
        scrollReveal.reveal('.service-card, .blog-post, .testimonial-item', {
            interval: 200
        });
        
        scrollReveal.reveal('.about-image, .about-content', {
            interval: 200,
            origin: 'left'
        });
        
        scrollReveal.reveal('.section-title', {
            origin: 'top'
        });
    }
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Chat Widget
const chatButton = document.querySelector('.chat-button');
const chatWindow = document.querySelector('.chat-window');
const closeChat = document.querySelector('.close-chat');
const chatForm = document.getElementById('chat-form');
const chatBody = document.querySelector('.chat-body');

if (chatButton && chatWindow && chatForm && chatBody) {
    const chatSuccess = document.createElement('div');
    chatSuccess.className = 'chat-success';
    chatSuccess.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <h4>Message Sent!</h4>
        <p>We'll get back to you soon.</p>
    `;

    // Add pulse animation every 10 seconds
    setInterval(() => {
        chatButton.classList.add('pulse');
        setTimeout(() => {
            chatButton.classList.remove('pulse');
        }, 2000);
    }, 10000);

    chatButton.addEventListener('click', function() {
        chatWindow.classList.toggle('active');
        chatButton.classList.remove('pulse');
    });

    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatWindow.classList.remove('active');
        });
    }

    chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('chat-name').value;
        const email = document.getElementById('chat-email').value;
        const phone = document.getElementById('chat-phone').value;
        const message = document.getElementById('chat-message').value;
        
        // Here you would typically send the data to your server
        console.log('Message submitted:', { name, email, phone, message });
        
        // Show success message
        chatBody.innerHTML = '';
        chatBody.appendChild(chatSuccess);
        chatSuccess.style.display = 'block';
        
        // Reset form after 3 seconds
        setTimeout(() => {
            chatForm.reset();
            chatBody.innerHTML = '';
            chatBody.appendChild(chatForm);
            chatWindow.classList.remove('active');
        }, 3000);
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.chat-widget') && !e.target.closest('.chat-button')) {
            chatWindow.classList.remove('active');
        }
    });
}
