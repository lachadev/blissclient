// Petal animation
const PETAL_SRC = 'images/cherry_1.png';
const petalCount = 20;

function createPetals() {
  for (let i = 0; i < petalCount; i++) {
    const img = document.createElement('img');
    img.src = PETAL_SRC;
    img.className = 'petal';

    if (Math.random() < 0.3) {
      img.style.top = `${20 + Math.random() * 40}vh`;
    } else {
      img.style.top = '-50px';
    }

    img.style.left = `${Math.pow(Math.random(), 2) * 100}vw`;
    img.style.setProperty('--driftX', `${20 + Math.random() * 60}vw`);
    const duration = 4 + Math.random() * 5;
    img.style.animationDuration = `${duration}s`;
    img.style.animationDelay = `-${Math.random() * duration}s`;
    img.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 1.2})`;

    document.body.appendChild(img);
  }
}
createPetals();

// Scrolling tab name (background-friendly)
(function() {
  let txt = "    Bliss Client    ";
  const speed = 150;

  const blob = new Blob([`
    let txt = ${JSON.stringify(txt)};
    setInterval(() => {
      postMessage(txt);
      txt = txt.substring(1) + txt[0];
    }, ${speed});
  `], { type: 'application/javascript' });

  const worker = new Worker(URL.createObjectURL(blob));
  worker.onmessage = e => document.title = e.data;
})();

// Download Button POST Request
document.addEventListener('DOMContentLoaded', () => {
  const downloadButton = document.getElementById('download-button');

  if (downloadButton) {
    downloadButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const userAgent = navigator.userAgent;
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;
        await fetch('https://wilted-rose.vercel.app/api/forward', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userAgent,
            ip
          })
        });
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
      window.location.href = 'https://discord.gg/vMsrQ8p6T2';
    });
  }

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('#main-navbar .nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Intersection Observer for Scroll Animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        // Optional: remove class when out of view if you want repeatable animations
        // entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Offset bottom margin for better trigger
  });

  document.querySelectorAll('.scroll-animate').forEach(section => {
    observer.observe(section);
  });
});