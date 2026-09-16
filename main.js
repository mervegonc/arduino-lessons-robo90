document.addEventListener("DOMContentLoaded", function() {
    // 1. OTOMATİK ARKA PLAN EKLEME
    if (!document.querySelector('.fluid-bg')) {
        const fluidBg = document.createElement('div');
        fluidBg.className = 'fluid-bg';
        document.body.insertBefore(fluidBg, document.body.firstChild);
    }

    // 2. KESİNTİSİZ MÜZİK YÖNETİMİ (GLOBAL SESSION STORAGE)
    // Sayfalar arası geçişte sesin kopmaması için sessionStorage kullanıyoruz
    let audio = window.parent.document.getElementById('global-bg-music');
    
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'global-bg-music';
        audio.src = 'music/music.mp3';
        audio.loop = true;
        audio.volume = 0.4;
        document.body.appendChild(audio);

        // Hafızdaki son konumu al
        let savedTime = sessionStorage.getItem('musicTime');
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }

        audio.play().catch(() => {
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    }

    // Sürekli anlık zamanı kaydet
    setInterval(() => {
        if(audio && !audio.paused) {
            sessionStorage.setItem('musicTime', audio.currentTime);
        }
    }, 500);

    // Sayfa değişirken müziğin anlık durumunu koru
    window.addEventListener('beforeunload', () => {
        if(audio) {
            sessionStorage.setItem('musicTime', audio.currentTime);
        }
    });
});
