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
        // Eğer sayfada müzik elementi yoksa oluştur
        audio = document.createElement('audio');
        audio.id = 'global-bg-music';
        audio.src = 'music/music.mp3';
        audio.loop = true;
        audio.volume = 0.4;
        document.body.appendChild(audio);

        // Daha önce kaydedilmiş bir zaman varsa oradan başlat
        let savedTime = localStorage.getItem('globalMusicTime');
        if (savedTime) {
            audio.currentTime = parseFloat(savedTime);
        }

        // Müziği oynatmayı dene
        audio.play().catch(() => {
            // Tarayıcı engeline takılırsa ilk tıklamada başlat
            document.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    }

    // Her yarım saniyede bir müziğin anlık saniyesini localStorage'a kaydet
    setInterval(() => {
        if (audio && !audio.paused) {
            localStorage.setItem('globalMusicTime', audio.currentTime);
        }
    }, 500);

    // Sayfa kapanırken veya değiştirilirken zamanı son kez sabitle
    window.addEventListener('beforeunload', () => {
        if (audio) {
            localStorage.setItem('globalMusicTime', audio.currentTime);
        }
    });
});
