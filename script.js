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
