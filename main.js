document.addEventListener("DOMContentLoaded", function() {
    // 1. OTOMATİK ARKA PLAN EKLEME (Tek tek HTML'e yazmana gerek kalmaz)
    if (!document.querySelector('.fluid-bg')) {
        const fluidBg = document.createElement('div');
        fluidBg.className = 'fluid-bg';
        document.body.insertBefore(fluidBg, document.body.firstChild);
    }

    // 2. KESİNTİSİZ MÜZİK YÖNETİMİ
    let audio = document.getElementById('global-bg-music');
    
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'global-bg-music';
        audio.src = 'music/music.mp3';
        audio.loop = true;
        audio.volume = 0.4; // Ses seviyesi (%40)
        document.body.appendChild(audio);
    }

    // Müziğin kaldığı saniyeyi hafızada tutma (Sayfa değişse bile devam etmesi için)
    let savedTime = localStorage.getItem('musicTime');
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Tarayıcı politikaları (Autoplay engeline takılmamak için ilk tıklamada başlatma ve hafızada tutma)
    audio.play().catch(() => {
        // Kullanıcı sayfada herhangi bir yere ilk tıkladığında müzik devreye girer
        document.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    });

    // Her saniye müziğin anlık süresini tarayıcıya kaydet
    setInterval(() => {
        if(!audio.paused) {
            localStorage.setItem('musicTime', audio.currentTime);
        }
    }, 1000);
});
