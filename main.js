document.addEventListener("DOMContentLoaded", function() {
    // 1. OTOMATİK ARKA PLAN EKLEME
    if (!document.querySelector('.fluid-bg')) {
        const fluidBg = document.createElement('div');
        fluidBg.className = 'fluid-bg';
        document.body.insertBefore(fluidBg, document.body.firstChild);
    }

    // 2. KESİNTİSİZ GLOBAL MÜZİK YÖNETİMİ
    let audio = document.getElementById('global-bg-music');
    
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'global-bg-music';
        audio.src = 'music/music.mp3';
        audio.loop = true;
        audio.volume = 0.4;
        document.body.appendChild(audio);

        // Kaldığı zamanı hafızadan al
        let savedTime = localStorage.getItem('globalMusicTime');
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }

        // Müziği oynatmayı dene
        let playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Tarayıcı engellerse, ana sayfa dahil herhangi bir yere ilk tıklamada başlat
                const startAudio = () => {
                    audio.play();
                    localStorage.setItem('globalMusicPlaying', 'true');
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
