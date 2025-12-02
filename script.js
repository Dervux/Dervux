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
            // Live Comments Display System
    const liveComments = document.getElementById('liveComments');
    const commentsContainer = document.getElementById('commentsContainer');
    const closeComments = document.getElementById('closeComments');
    const addCommentBtn = document.getElementById('addCommentBtn');
    
    // Create toggle button
    const commentsToggle = document.createElement('button');
    commentsToggle.className = 'comments-toggle';
    commentsToggle.innerHTML = '💬';
    commentsToggle.title = 'Show Recent Reviews';
    document.body.appendChild(commentsToggle);
    
    // Sample initial comments (replace with real ones from localStorage)
    const initialComments = [
        {
            id: 1,
            author: "Sarah M.",
            rating: 5,
            text: "Fast service and professional results! My website was ready in 2 days.",
            date: "2024-01-15",
            time: "14:30"
        },
        {
            id: 2,
            author: "James K.",
            rating: 4,
            text: "Great value for money. The mobile optimization is perfect.",
            date: "2024-01-14",
            time: "10:15"
        },
        {
            id: 3,
            author: "Lisa T.",
            rating: 5,
            text: "Highly recommend for small businesses. Excellent support!",
            date: "2024-01-13",
            time: "16:45"
        }
    ];
    
    // Load comments
    function loadComments() {
        const savedComments = localStorage.getItem('dervuxLiveComments');
        const comments = savedComments ? JSON.parse(savedComments) : initialComments;
        
        commentsContainer.innerHTML = '';
        
        if (comments.length === 0) {
            commentsContainer.innerHTML = `
                <div class="empty-comments">
                    <p>No reviews yet. Be the first to share your experience!</p>
                </div>
            `;
            return;
        }
        
        // Display only last 5 comments
        const recentComments = comments.slice(-5).reverse();
        
        recentComments.forEach(comment => {
            addCommentToDisplay(comment);
        });
    }
    
    // Add comment to display
    function addCommentToDisplay(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-item';
        commentElement.dataset.id = comment.id;
        
        const stars = '★'.repeat(comment.rating) + '☆'.repeat(5 - comment.rating);
        const timeAgo = getTimeAgo(comment.date, comment.time);
        
        commentElement.innerHTML = `
            <div class="comment-header">
                <div class="comment-author">${comment.author}</div>
                <div class="comment-date">${timeAgo}</div>
            </div>
            <div class="comment-rating">${stars}</div>
            <p class="comment-text">${comment.text}</p>
            <div class="comment-actions">
                <button class="delete-comment" data-id="${comment.id}">Remove</button>
            </div>
        `;
        
        commentsContainer.appendChild(commentElement);
        
        // Add delete functionality
        const deleteBtn = commentElement.querySelector('.delete-comment');
        deleteBtn.addEventListener('click', function() {
            deleteComment(comment.id);
        });
    }
    
    // Get time ago format
    function getTimeAgo(date, time) {
        const commentDate = new Date(`${date}T${time}`);
        const now = new Date();
        const diffMs = now - commentDate;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffMins < 60) {
            return `${diffMins} min ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else {
            return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        }
    }
    
    // Save comments
    function saveComments(comments) {
        localStorage.setItem('dervuxLiveComments', JSON.stringify(comments));
    }
    
    // Add new comment
    function addNewComment(author, rating, text) {
        const comments = JSON.parse(localStorage.getItem('dervuxLiveComments') || '[]');
        const newComment = {
            id: Date.now(),
            author: author || 'Anonymous',
            rating: rating,
            text: text,
            date: new Date().toISOString().split('T')[0],
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        
        comments.push(newComment);
        saveComments(comments);
        addCommentToDisplay(newComment);
        
        // Show success message
        showCommentSuccess();
    }
    
    // Delete comment
    function deleteComment(id) {
        let comments = JSON.parse(localStorage.getItem('dervuxLiveComments') || '[]');
        comments = comments.filter(comment => comment.id !== id);
        saveComments(comments);
        
        // Remove from display
        const commentElement = document.querySelector(`.comment-item[data-id="${id}"]`);
        if (commentElement) {
            commentElement.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                commentElement.remove();
                loadComments(); // Reload to refresh display
            }, 300);
        }
    }
    
    // Show success message
    function showCommentSuccess() {
        const successMsg = document.createElement('div');
        successMsg.className = 'comment-success';
        successMsg.textContent = 'Review added successfully!';
        successMsg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 1rem;
            border-radius: var(--border-radius);
            z-index: 1006;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => successMsg.remove(), 300);
        }, 3000);
    }
    
    // Add CSS animations for success message
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Toggle comments display
    commentsToggle.addEventListener('click', function() {
        liveComments.style.display = 'block';
        commentsToggle.style.display = 'none';
        loadComments();
    });
    
    closeComments.addEventListener('click', function() {
        liveComments.style.display = 'none';
        commentsToggle.style.display = 'flex';
    });
    
    // Add comment button - link to testimonials form
    addCommentBtn.addEventListener('click', function() {
        // Scroll to testimonials section
        const testimonialsSection = document.getElementById('testimonials');
        if (testimonialsSection) {
            window.scrollTo({
                top: testimonialsSection.offsetTop - 80,
                behavior: 'smooth'
            });
            // Open the testimonial modal if it exists
            const addTestimonialBtn = document.getElementById('addTestimonialBtn');
            if (addTestimonialBtn) {
                setTimeout(() => addTestimonialBtn.click(), 500);
            }
        }
        
        // Close comments panel
        liveComments.style.display = 'none';
        commentsToggle.style.display = 'flex';
    });
    
    // Close comments when clicking outside
    document.addEventListener('click', function(event) {
        if (!liveComments.contains(event.target) && 
            !commentsToggle.contains(event.target) && 
            liveComments.style.display === 'block') {
            liveComments.style.display = 'none';
            commentsToggle.style.display = 'flex';
        }
    });
    
    // Auto-hide comments after 30 seconds
    let commentsTimeout;
    function startCommentsTimeout() {
        clearTimeout(commentsTimeout);
        commentsTimeout = setTimeout(() => {
            if (liveComments.style.display === 'block') {
                liveComments.style.display = 'none';
                commentsToggle.style.display = 'flex';
            }
        }, 30000); // 30 seconds
    }
    
    // Reset timeout on interaction
    liveComments.addEventListener('mouseenter', function() {
        clearTimeout(commentsTimeout);
    });
    
    liveComments.addEventListener('mouseleave', function() {
        startCommentsTimeout();
    });
    
    // Initialize comments system
    loadComments();
    startCommentsTimeout();
    
    // Sync with testimonials system
    function syncWithTestimonials() {
        // This function would sync comments with your existing testimonials
        // For now, we'll just load comments on page load
        console.log('Comments system ready');
    }
    
    syncWithTestimonials();
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
    // Delay Guarantee System
const delayNotification = document.getElementById('delayNotification');
const closeNotification = document.getElementById('closeNotification');
const discountCode = document.getElementById('discountCode');

// Function to generate random discount code
function generateDiscountCode() {
    const prefix = 'DERVUX';
    const numbers = Math.floor(100 + Math.random() * 900); // 3 random digits
    return `${prefix}${numbers}`;
}

// Check if there's a delayed project (for demonstration)
// In real implementation, this would check your project management system
function checkForDelays() {
    // Simulate checking for delays (remove this in production)
    const hasDelayedProject = localStorage.getItem('simulateDelay') === 'true';
    
    if (hasDelayedProject) {
        showDelayNotification();
        localStorage.removeItem('simulateDelay'); // Clear after showing
    }
    
    // Check URL parameters for delay notification
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('delay') === 'true') {
        showDelayNotification();
    }
}

function showDelayNotification() {
    const newDiscountCode = generateDiscountCode();
    discountCode.textContent = newDiscountCode;
    delayNotification.style.display = 'block';
    
    // Save to localStorage so user can access it later
    localStorage.setItem('dervuxDiscountCode', newDiscountCode);
    localStorage.setItem('dervuxDiscountExpiry', new Date().getTime() + (60 * 24 * 60 * 60 * 1000)); // 60 days
    
    // Auto-hide after 30 seconds
    setTimeout(() => {
        if (delayNotification.style.display === 'block') {
            delayNotification.style.display = 'none';
        }
    }, 30000);
}

// Close notification
if (closeNotification) {
    closeNotification.addEventListener('click', function() {
        delayNotification.style.display = 'none';
    });
}

// Check for active discount code on page load
function checkActiveDiscount() {
    const savedCode = localStorage.getItem('dervuxDiscountCode');
    const expiry = localStorage.getItem('dervuxDiscountExpiry');
    
    if (savedCode && expiry && new Date().getTime() < parseInt(expiry)) {
        // Discount is still valid
        console.log('Active discount code:', savedCode);
        // You could show a small indicator that user has an active discount
    } else if (savedCode) {
        // Discount expired, clean up
        localStorage.removeItem('dervuxDiscountCode');
        localStorage.removeItem('dervuxDiscountExpiry');
    }
}

});// Booking System
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('bookingName').value;
        const email = document.getElementById('bookingEmail').value;
        const phone = document.getElementById('bookingPhone').value;
        const business = document.getElementById('bookingBusiness').value;
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('bookingTime').value;
        const message = document.getElementById('bookingMessage').value;
        
        // Basic validation
        if (!name || !email || !phone || !date || !time) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Create booking email
        const bookingBody = `New Consultation Booking:%0D%0A%0D%0A` +
                           `Name: ${name}%0D%0A` +
                           `Email: ${email}%0D%0A` +
                           `Phone: ${phone}%0D%0A` +
                           `Business: ${business || 'Not provided'}%0D%0A` +
                           `Date: ${date}%0D%0A` +
                           `Time: ${time}%0D%0A` +
                           `Project Details: ${message || 'Not provided'}%0D%0A%0D%0A` +
                           `Booking received: ${new Date().toLocaleString()}`;
        
        // Send booking email
        window.location.href = `mailto:Dervux@protonmail.com?subject=New Consultation Booking - ${name}&body=${bookingBody}`;
        
        // Show success message
        bookingForm.style.display = 'none';
        bookingSuccess.style.display = 'block';
        
        // Save to localStorage (simple CRM)
        const booking = {
            name: name,
            email: email,
            phone: phone,
            business: business,
            date: date,
            time: time,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        const bookings = JSON.parse(localStorage.getItem('dervuxBookings') || '[]');
        bookings.push(booking);
        localStorage.setItem('dervuxBookings', JSON.stringify(bookings));
    });
                                 }
