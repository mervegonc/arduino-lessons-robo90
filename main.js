document.addEventListener("DOMContentLoaded", function() {
    // 1. OTOMATİK ARKA PLAN EKLEME
    if (!document.querySelector('.fluid-bg')) {
        const fluidBg = document.createElement('div');
        fluidBg.className = 'fluid-bg';
        document.body.insertBefore(fluidBg, document.body.firstChild);
    }

    // 2. KESİNTİSİZ GLOBAL MÜZİK VE KONTROL BUTONU
    let audio = document.getElementById('global-bg-music');
    
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'global-bg-music';
        audio.src = 'music/music.mp3';
        audio.loop = true;
        audio.volume = 0.4;
        document.body.appendChild(audio);

        // Ses açma/kapama butonunu ekle
        const soundBtn = document.createElement('button');
        soundBtn.id = 'sound-toggle-btn';
        soundBtn.innerHTML = '🔊 Müzik: Açık';
        soundBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            background: rgba(13, 26, 47, 0.8);
            color: #09D8C7;
            border: 1px solid rgba(9, 216, 199, 0.4);
            padding: 8px 14px;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            font-size: 12px;
            backdrop-filter: blur(8px);
            transition: all 0.2s ease;
        `;
        document.body.appendChild(soundBtn);

        // Daha önceki ses tercihini veya zamanını al
        let savedTime = localStorage.getItem('globalMusicTime');
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }

        let isMuted = localStorage.getItem('globalMusicMuted') === 'true';
        if (isMuted) {
            audio.muted = true;
            soundBtn.innerHTML = '🔇 Müzik: Kapalı';
            soundBtn.style.opacity = '0.6';
        }

        // Butona tıklandığında sesi aç/kapat
        soundBtn.addEventListener('click', () => {
            audio.muted = !audio.muted;
            if (audio.muted) {
                soundBtn.innerHTML = '🔇 Müzik: Kapalı';
                soundBtn.style.opacity = '0.6';
                localStorage.setItem('globalMusicMuted', 'true');
            } else {
                soundBtn.innerHTML = '🔊 Müzik: Açık';
                soundBtn.style.opacity = '1';
                localStorage.setItem('globalMusicMuted', 'false');
                audio.play();
            }
        });

        // Müziği oynatmayı dene
        let playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                const startAudio = () => {
                    if (!audio.muted) audio.play();
                    document.removeEventListener('click', startAudio);
                    document.removeEventListener('keydown', startAudio);
                };
                document.addEventListener('click', startAudio);
                document.addEventListener('keydown', startAudio);
            });
        }
    }

    // Sürekli zamanı kaydet
    setInterval(() => {
        if (audio && !audio.paused) {
            localStorage.setItem('globalMusicTime', audio.currentTime);
        }
    }, 500);

    window.addEventListener('beforeunload', () => {
        if (audio) {
            localStorage.setItem('globalMusicTime', audio.currentTime);
        }
    });
});
