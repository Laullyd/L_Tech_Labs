const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu');
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-button');
const sentStatus = document.getElementById('sent-status');

/* HEADER & NAV */
menuButton.addEventListener('click', (e) => {
  e.stopPropagation();
  navMenu.classList.toggle('active');
  menuButton.classList.toggle('active');
});
navMenu.addEventListener('click', (e) => {
  e.stopPropagation();
});
window.addEventListener('click', (e) => {
  if (navMenu.classList.contains('active') && menuButton.classList.contains('active')) {
    navMenu.classList.toggle('active');
    menuButton.classList.toggle('active');
  }
});

/* FORM SUBMISSION */
form.addEventListener('submit', function(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending...';
  return fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    submitBtn.innerHTML = '<b>✓</b> Message Sent';
    submitBtn.style.color = 'green';
    submitBtn.style.fontSize = '135%';
    submitBtn.style.fontWeight = 'bold';
    setTimeout(() => {
      submitBtn.innerHTML = 'Send Message <span>↗</span>';
      submitBtn.style.color = '';
      submitBtn.disabled = false;
      submitBtn.style.fontSize = '';
      submitBtn.style.fontWeight = '';
    }, 3500);
    console.log(data);
    form.reset();
  })
  .catch(error => {
    submitBtn.innerHTML = '<b>X</b> Could not send message. Please try again';
    submitBtn.style.color = 'red';
    submitBtn.style.fontSize = '135%';
    submitBtn.style.fontWeight = 'bold';
    setTimeout(() => {
      submitBtn.innerHTML = 'Send Message <span>↗</span>';
      submitBtn.style.color = '';
      submitBtn.disabled = false;
      submitBtn.style.fontSize = '';
      submitBtn.style.fontWeight = '';
    }, 3500);
    console.error(error)
  });
});