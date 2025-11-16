// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (hamburger && hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cookie Consent
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    
    // Check if user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieConsent.style.display = 'block';
        }, 1000);
    }
    
    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieConsent.style.display = 'none';
        });
    }
    
    // Modal Functionality
    const privacyLink = document.getElementById('privacyLink');
    const termsLink = document.getElementById('termsLink');
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const closeButtons = document.querySelectorAll('.close');
    
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            privacyModal.style.display = 'block';
        });
    }
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            termsModal.style.display = 'block';
        });
    }
    
    // Close modals when clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Contact Form Submission (updated for GitHub Pages)
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create the email content
        const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0ASubject: ${subject}%0D%0AMessage: ${message}`;
        
        // Open user's email client with pre-filled content
        window.location.href = `mailto:Dervux@protonmail.com?subject=Website Contact: ${subject}&body=${emailBody}`;
        
        // Show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    });
}    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});
// Feedback Widget Functionality
document.addEventListener('DOMContentLoaded', function() {
    const feedbackWidget = document.getElementById('feedbackWidget');
    const feedbackToggle = document.getElementById('feedbackToggle');
    const feedbackContent = document.querySelector('.feedback-content');
    const feedbackClose = document.getElementById('feedbackClose');
    const stars = document.querySelectorAll('.star');
    const submitFeedback = document.getElementById('submitFeedback');
    const feedbackThankYou = document.getElementById('feedbackThankYou');
    const userComment = document.getElementById('userComment');
    
    let currentRating = 0;
    
    // Toggle feedback widget
    if (feedbackToggle) {
        feedbackToggle.addEventListener('click', function() {
            feedbackContent.classList.toggle('active');
        });
    }
    
    // Close feedback widget
    if (feedbackClose) {
        feedbackClose.addEventListener('click', function() {
            feedbackContent.classList.remove('active');
        });
    }
    
    // Star rating functionality
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            currentRating = rating;
            
            // Update stars appearance
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.classList.add('active');
                    s.textContent = '★';
                } else {
                    s.classList.remove('active');
                    s.textContent = '☆';
                }
            });
        });
        
        // Hover effects
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            stars.forEach(s => {
                const starRating = parseInt(s.getAttribute('data-rating'));
                if (starRating <= rating) {
                    s.style.color = '#ffc107';
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            stars.forEach(s => {
                if (!s.classList.contains('active')) {
                    s.style.color = '#ddd';
                }
            });
        });
    });
    
    // Submit feedback
    if (submitFeedback) {
        submitFeedback.addEventListener('click', function() {
            if (currentRating === 0) {
                alert('Please select a rating before submitting');
                return;
            }
            
            const comment = userComment.value.trim();
            
            // In a real implementation, you would send this data to your server
            // For now, we'll log it and show thank you message
            console.log('Feedback submitted:', {
                rating: currentRating,
                comment: comment,
                timestamp: new Date().toISOString(),
                page: window.location.href
            });
            
            // Send to your email (optional)
            const feedbackBody = `Rating: ${currentRating}/5%0D%0AComment: ${comment}%0D%0APage: ${window.location.href}`;
            window.location.href = `mailto:Dervux@protonmail.com?subject=Website Feedback (${currentRating}/5)&body=${feedbackBody}`;
            
            // Show thank you message
            feedbackContent.style.display = 'none';
            feedbackThankYou.style.display = 'block';
            
            // Reset after 3 seconds
            setTimeout(() => {
                feedbackContent.classList.remove('active');
                feedbackThankYou.style.display = 'none';
                feedbackContent.style.display = 'block';
                
                // Reset form
                currentRating = 0;
                userComment.value = '';
                stars.forEach(star => {
                    star.classList.remove('active');
                    star.textContent = '☆';
                    star.style.color = '#ddd';
                });
            }, 3000);
        });
    }
    
    // Close when clicking outside
    document.addEventListener('click', function(event) {
        if (!feedbackWidget.contains(event.target) && feedbackContent.classList.contains('active')) {
            feedbackContent.classList.remove('active');
        }
    });
});
// Hosting Option Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hostingCheckboxes = document.querySelectorAll('.hosting-checkbox');
    
    hostingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const plan = this.getAttribute('data-plan');
            const basePrice = getBasePrice(plan);
            const hostingFee = 50;
            const totalPrice = this.checked ? basePrice + hostingFee : basePrice;
            
            // Update the button link with new price
            const button = this.closest('.pricing-card').querySelector('a');
            const currentHref = button.getAttribute('href');
            const newHref = currentHref.replace(/amount=\d+/, `amount=${totalPrice}`) + (this.checked ? '&hosting=true' : '');
            button.setAttribute('href', newHref);
            
            // Update price display temporarily
            const priceElement = this.closest('.pricing-card').querySelector('.price');
            const originalText = priceElement.textContent;
            priceElement.textContent = `R${totalPrice}`;
            priceElement.style.color = this.checked ? 'var(--success)' : 'var(--primary)';
            
            // Add first month hosting note if checked
            const priceNote = this.closest('.pricing-card').querySelector('.price-note');
            if (this.checked) {
                priceNote.textContent = `R${basePrice} + R50 hosting`;
                priceNote.style.color = 'var(--success)';
            } else {
                priceNote.textContent = 'one-time fee';
                priceNote.style.color = 'var(--gray)';
            }
        });
    });
    
    function getBasePrice(plan) {
        switch(plan) {
            case 'starter': return 550;
            case 'professional': return 1000;
            case 'premium': return 1500;
            default: return 0;
        }
    }
    // Real Public Testimonials System
document.addEventListener('DOMContentLoaded', function() {
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    const addTestimonialBtn = document.getElementById('addTestimonialBtn');
    const testimonialModal = document.getElementById('testimonialModal');
    const modalClose = testimonialModal.querySelector('.testimonial-modal-close');
    const modalStars = testimonialModal.querySelectorAll('.testimonial-modal-star');
    const submitTestimonial = document.getElementById('submitTestimonial');
    
    let currentRating = 0;
    
    // Sample initial testimonials (you can remove these later)
    const initialTestimonials = [
        {
            name: "Sarah M",
            business: "Beauty Salon Owner",
            rating: 5,
            text: "Dervux created a stunning website for my salon that doubled my online bookings! The process was smooth and professional.",
            date: "2024-01-15",
            initials: "SM"
        },
        {
            name: "James K",
            business: "Local Restaurant",
            rating: 5,
            text: "Our new website has brought in so many new customers. Fast service and great communication throughout the project.",
            date: "2024-01-10",
            initials: "JK"
        },
        {
            name: "Lisa T",
            business: "Fitness Coach",
            rating: 4,
            text: "Professional service and exactly what I needed to grow my online presence. Highly recommend for small businesses!",
            date: "2024-01-08",
            initials: "LT"
        }
    ];
    
    // Load testimonials
    function loadTestimonials() {
        const savedTestimonials = localStorage.getItem('dervuxPublicTestimonials');
        const testimonials = savedTestimonials ? JSON.parse(savedTestimonials) : initialTestimonials;
        
        testimonialsContainer.innerHTML = '';
        
        testimonials.forEach(testimonial => {
            addTestimonialToPage(testimonial, false);
        });
    }
    
    // Add testimonial to page
    function addTestimonialToPage(testimonial, save = true) {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        
        const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
        const date = new Date(testimonial.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        testimonialCard.innerHTML = `
            <div class="testimonial-header">
                <div class="testimonial-stars">${stars}</div>
                <div class="testimonial-date">${date}</div>
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="testimonial-avatar">${testimonial.initials}</div>
                <div class="testimonial-author-info">
                    <strong>${testimonial.name}</strong>
                    <span>${testimonial.business}</span>
                </div>
            </div>
        `;
        
        testimonialsContainer.appendChild(testimonialCard);
        
        if (save) {
            saveTestimonials();
        }
    }
    
    // Save testimonials to localStorage
    function saveTestimonials() {
        const testimonials = [];
        const testimonialCards = testimonialsContainer.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            const stars = card.querySelector('.testimonial-stars').textContent;
            const rating = (stars.match(/★/g) || []).length;
            const text = card.querySelector('.testimonial-text').textContent.replace(/"/g, '');
            const name = card.querySelector('.testimonial-author-info strong').textContent;
            const business = card.querySelector('.testimonial-author-info span').textContent;
            const date = card.querySelector('.testimonial-date').textContent;
            const initials = card.querySelector('.testimonial-avatar').textContent;
            
            testimonials.push({
                name: name,
                business: business,
                rating: rating,
                text: text,
                date: new Date().toISOString().split('T')[0],
                initials: initials
            });
        });
        
        localStorage.setItem('dervuxPublicTestimonials', JSON.stringify(testimonials));
    }
    
    // Open modal
    if (addTestimonialBtn) {
        addTestimonialBtn.addEventListener('click', function() {
            testimonialModal.style.display = 'block';
            currentRating = 0;
            // Reset stars
            modalStars.forEach(star => {
                star.textContent = '☆';
                star.classList.remove('active');
            });
            // Clear form
            document.getElementById('testimonialName').value = '';
            document.getElementById('testimonialText').value = '';
        });
    }
    
    // Star rating in modal
    modalStars.forEach(star => {
        star.addEventListener('click', function() {
            currentRating = parseInt(this.getAttribute('data-rating'));
            
            modalStars.forEach(s => {
                const rating = parseInt(s.getAttribute('data-rating'));
                if (rating <= currentRating) {
                    s.classList.add('active');
                    s.textContent = '★';
                } else {
                    s.classList.remove('active');
                    s.textContent = '☆';
                }
            });
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', function() {
        testimonialModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    testimonialModal.addEventListener('click', function(e) {
        if (e.target === testimonialModal) {
            testimonialModal.style.display = 'none';
        }
    });
    
    // Submit testimonial
    submitTestimonial.addEventListener('click', function() {
        const nameInput = document.getElementById('testimonialName').value.trim();
        const textInput = document.getElementById('testimonialText').value.trim();
        
        if (currentRating === 0) {
            alert('Please select a star rating');
            return;
        }
        
        if (!nameInput) {
            alert('Please enter your name or business name');
            return;
        }
        
        if (!textInput) {
            alert('Please write your review');
            return;
        }
        
        // Create testimonial object
        const names = nameInput.split(' ');
        const initials = names.length >= 2 ? 
            (names[0][0] + names[names.length - 1][0]).toUpperCase() : 
            nameInput.substring(0, 2).toUpperCase();
        
        const newTestimonial = {
            name: nameInput.split(' from ')[0] || nameInput,
            business: nameInput.includes(' from ') ? nameInput.split(' from ')[1] : 'Business Owner',
            rating: currentRating,
            text: textInput,
            date: new Date().toISOString().split('T')[0],
            initials: initials
        };
        
        // Add to page
        addTestimonialToPage(newTestimonial, true);
        
        // Send email notification (optional)
        const testimonialBody = `New Public Testimonial: ${currentRating}/5 stars%0D%0A%0D%0AName: ${nameInput}%0D%0AReview: ${textInput}%0D%0A%0D%0AThis review is now visible on your website.`;
        window.location.href = `mailto:Dervux@protonmail.com?subject=New Public Testimonial (${currentRating}/5)&body=${testimonialBody}`;
        
        // Close modal and show success
        testimonialModal.style.display = 'none';
        alert('Thank you for your review! It is now visible to other visitors.');
    });
    
    // Load testimonials on page load
    loadTestimonials();
});
});
