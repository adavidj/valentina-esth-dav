const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

window.addEventListener('load', () => {
    hideLoader();
});

// Sécurité : masquer le loader après 5 secondes même si tout n'est pas chargé
setTimeout(hideLoader, 5000);

function hideLoader() {
    const loader = document.getElementById('loader');
    if (!loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        document.body.classList.remove('is-loading');
        
        // On précharge les images après le chargement de la page
        loveGifs.forEach(gif => {
            const img = new Image();
            img.src = gif;
        });
    }
}

function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveButton);

document.addEventListener('mousemove', (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(Math.pow(e.clientX - btnCenterX, 2) + Math.pow(e.clientY - btnCenterY, 2));
    
    if (distance < 100) {
        moveButton();
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const heartTypes = ['❤️', '💖', '💝', '💕', '💗'];
    heart.innerHTML = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

const loveGifs = [
    "img/WhatsApp Image 2026-02-14 at 13.51.16.jpeg",
    "img/WhatsApp Image 2026-02-14 at 13.53.53.jpeg",
    "img/WhatsApp Image 2026-02-14 at 13.53.53 (1).jpeg",
    "img/Animated_heart5.gif",
    "img/Wikimania2023_Animated_Sticker_Flower_02.gif",
    "img/photo-1518199266791-5375a83190b7.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/e/e3/Animated_heart5.gif",
    "https://upload.wikimedia.org/wikipedia/commons/f/f1/Heart_anim.gif",
    "https://upload.wikimedia.org/wikipedia/commons/a/a2/Heart_pulsing.gif"
];

const fallbackImages = [
    
   
];

function typeWriter(text, elementId, speed, callback) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

yesBtn.addEventListener('click', () => {
    const longText = "Mon amour, depuis que tu es dans ma vie, chaque jour est une aventure merveilleuse. Ton sourire éclaire mes journées les plus sombres et ton rire est la plus belle mélodie que j'ai jamais entendue. Je ne peux pas imaginer passer une seule seconde sans toi à mes côtés. Tu es mon roc, ma confidente, et la personne qui me pousse à être meilleur chaque jour. Merci d'être qui tu es et de m'aimer comme tu le fais. Je t'aime plus que les mots ne peuvent l'exprimer... Aujourd'hui, demain, et pour toujours. ❤️✨";

    // Explosion de confettis
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        if (typeof confetti === 'function') {
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }
    }, 250);

    // Changement de contenu
    document.querySelector('.container').innerHTML = `
        <h1>YAAAAAY !!! ❤️❤️❤️</h1>
        <div class="gif-container">
            <img id="main-gif" src="${loveGifs[0]}" alt="Happy Gif" onerror="this.src='${fallbackImages[0]}'">
        </div>
        <div class="love-text" id="typewriter"></div>
        <button id="openRoseBtn">Ouvrir 🌹</button>
    `;

    typeWriter(longText, "typewriter", 40, () => {
        const openBtn = document.getElementById('openRoseBtn');
        openBtn.style.display = 'block';
        openBtn.addEventListener('click', () => {
            const roseOverlay = document.getElementById('roseOverlay');
            roseOverlay.style.display = 'flex';
            
            // Relancer l'animation avec les nouveaux sélecteurs
            const pathObjects = document.querySelectorAll('.rose-path');
            pathObjects.forEach(p => {
                p.style.animation = 'none';
                void p.offsetHeight; // force reflow
                p.style.animation = null;
            });

            // Sparkle final après l'éclosion
            setTimeout(() => {
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#ff0a54', '#ff758f', '#ffccd5']
                    });
                }
            }, 8500); // Correspond à la fin de l'animation de la rose
        });
    });

    let currentGifIndex = 0;
    const gifInterval = setInterval(() => {
        const mainGif = document.getElementById('main-gif');
        if (mainGif) {
            mainGif.style.opacity = 0;
            setTimeout(() => {
                currentGifIndex = (currentGifIndex + 1) % loveGifs.length;
                const nextImg = new Image();
                nextImg.src = loveGifs[currentGifIndex];
                nextImg.onload = () => {
                    mainGif.src = loveGifs[currentGifIndex];
                    mainGif.style.opacity = 1;
                };
                nextImg.onerror = () => {
                    mainGif.src = fallbackImages[currentGifIndex % fallbackImages.length];
                    mainGif.style.opacity = 1;
                };
            }, 400);
        } else {
            clearInterval(gifInterval);
        }
    }, 3000);
});
