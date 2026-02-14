const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');

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
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

const loveGifs = [
   

    "https://upload.wikimedia.org/wikipedia/commons/2/29/Smiley-Love.gif",
    "https://upload.wikimedia.org/wikipedia/commons/e/e3/Animated_heart5.gif",
    "https://upload.wikimedia.org/wikipedia/commons/f/f1/Heart_anim.gif",
    "https://upload.wikimedia.org/wikipedia/commons/b/b4/Happy_Cat.gif",
    "https://upload.wikimedia.org/wikipedia/commons/f/f5/Wikimania2023_Animated_Sticker_Flower_02.gif",
    "https://upload.wikimedia.org/wikipedia/commons/a/a2/Heart_pulsing.gif"
];

// Pré-chargement des images pour éviter les délais de chargement
loveGifs.forEach(gif => {
    const img = new Image();
    img.src = gif;
});

const fallbackImages = [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
    "https://images.unsplash.com/photo-1494972308255-a23c3399ad95",
    "https://images.unsplash.com/photo-1516589174184-c68536575fc0"
];

yesBtn.addEventListener('click', () => {
    const longText = `
        Mon amour, depuis que tu es dans ma vie, chaque jour est une aventure merveilleuse. 
        Ton sourire éclaire mes journées les plus sombres et ton rire est la plus belle mélodie que j'ai jamais entendue. 
        Je ne peux pas imaginer passer une seule seconde sans toi à mes côtés. 
        Tu es mon roc, ma confidente, et la personne qui me pousse à être meilleur chaque jour. 
        Merci d'être qui tu es et de m'aimer comme tu le fais. Je t'aime plus que les mots ne peuvent l'exprimer... 
        Aujourd'hui, demain, et pour toujours. ❤️✨
    `;

    document.querySelector('.container').innerHTML = `
        <h1>YAAAAAY !!! ❤️❤️❤️</h1>
        <div class="gif-container">
            <img id="main-gif" src="${loveGifs[0]}" alt="Happy Gif" onerror="this.src='${fallbackImages[0]}'">
        </div>
        <div class="love-text">${longText}</div>
    `;

    const mainGif = document.getElementById('main-gif');
    let currentGifIndex = 0;

    const gifInterval = setInterval(() => {
        if (mainGif) {
            mainGif.style.opacity = 0;
            setTimeout(() => {
                currentGifIndex = (currentGifIndex + 1) % loveGifs.length;
                // On utilise l'URL directe car elles sont maintenant pré-chargées
                mainGif.src = loveGifs[currentGifIndex];
                
                mainGif.onload = () => {
                    mainGif.style.opacity = 1;
                };
            }, 400); // Transition plus rapide (0.4s)
        } else {
            clearInterval(gifInterval);
        }
    }, 2000); // Intervalle réduit à 2 secondes
});
