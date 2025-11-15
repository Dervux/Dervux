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
    
    // Get plan from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan') || 'Professional';
    const amount = urlParams.get('amount') || '1000';
    
    // Set plan and amount in the summary
    document.getElementById('selectedPlan').textContent = `${plan} (R${amount})`;
    document.getElementById('totalAmount').textContent = `R${amount}`;
    
    // Payment Confirmation
    const confirmPayment = document.getElementById('confirmPayment');
    const paymentSuccess = document.getElementById('paymentSuccess');
    const agreeTerms = document.getElementById('agreeTerms');
    
    if (confirmPayment) {
        confirmPayment.addEventListener('click', function() {
            const reference = document.getElementById('reference').value;
            const email = document.getElementById('email').value;
            
            // Basic validation
            if (!reference || !email) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!agreeTerms.checked) {
                alert('Please agree to the terms and conditions');
                return;
            }
            
            // In a real implementation, you would process the payment here
            // For demonstration, we'll just show the success message
            
            // Hide the payment form and show success message
            document.querySelector('.payment-container').style.display = 'none';
            paymentSuccess.style.display = 'block';
            
            // In a real implementation, you would send the payment details to your server
            console.log('Payment details:', {
                plan: plan,
                amount: amount,
                reference: reference,
                email: email
            });
        });
    }
    
    // Modal Functionality
    const privacyLink = document.getElementById('privacyLinkPayment');
    const termsLink = document.getElementById('termsLinkPayment');
    const termsLinkFooter = document.getElementById('termsLinkPaymentFooter');
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
    
    if (termsLinkFooter) {
        termsLinkFooter.addEventListener('click', function(e) {
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