document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typewriter-text');
    textElement.classList.add('typewriter-cursor');
    
    const phrases = [
        {text: "Привет, Коллега!", pause: 1000},
        {text: "Моё имя", pause: 1000},
        {text: "Басенко Иван", pause: 2000, final: true}
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.text.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
            
            if (charIndex === 0) {
                isDeleting = false;
                if (!currentPhrase.final) {
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                }
                setTimeout(typeWriter, 300);
                return;
            }
        } else {
            textElement.textContent = currentPhrase.text.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100 + Math.random() * 50;
            
            if (charIndex === currentPhrase.text.length) {
                typingSpeed = currentPhrase.pause;
                if (!currentPhrase.final) {
                    isDeleting = true;
                } else {
                    textElement.classList.remove('typewriter-cursor');
                    return;
                }
            }
        }
        
        setTimeout(typeWriter, typingSpeed);
    }

    setTimeout(typeWriter, 500);

    // Обработчик клика для кнопки "Обо мне"
    document.querySelector('.glitch-button[data-text="Обо мне"]').addEventListener('click', function(e) {
        e.preventDefault();
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-text">Загрузка</div>
            <div class="loading-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        
        setTimeout(() => {
            window.location.href = 'loading.html';
        }, 500);
    });

        // Обработчик клика для кнопки "Портфолио"
    document.querySelector('.glitch-button[data-text="Опыт работы"]').addEventListener('click', function(e) {
        e.preventDefault();
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-text">Загрузка</div>
            <div class="loading-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        
        setTimeout(() => {
            window.location.href = 'workexp.html';
        }, 500);
    });
    

            // Обработчик клика для кнопки "Портфолио"
    document.querySelector('.glitch-button[data-text="Портфолио"]').addEventListener('click', function(e) {
        e.preventDefault();
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-text">Загрузка</div>
            <div class="loading-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        
        setTimeout(() => {
            window.location.href = 'portfolio.html';
        }, 500);
    });
    

        // Обработчик клика для кнопки "Контакты"
    document.querySelector('.glitch-button[data-text="Контакты"]').addEventListener('click', function(e) {
        e.preventDefault();
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-text">Загрузка</div>
            <div class="loading-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        
        setTimeout(() => {
            window.location.href = 'contact.html';
        }, 500);
    });
    

    // Обработчик для показа фото после анимации
    setTimeout(() => {
        const movingBox = document.querySelector('.moving-box');
        movingBox.classList.add('animation-complete'); // Добавляем класс сразу
        
        movingBox.addEventListener('mouseenter', function() {
            if (this.classList.contains('animation-complete')) {
                this.querySelector('.photo').style.opacity = '1';
                this.querySelector('.photo').style.transform = 'scale(1)';
            }
        });
        
        movingBox.addEventListener('mouseleave', function() {
            if (this.classList.contains('animation-complete')) {
                this.querySelector('.photo').style.opacity = '0';
                this.querySelector('.photo').style.transform = 'scale(0.8)';
            }
        });
    }, 13000); // 9s (задержка) + 4s (длительность анимации)
});