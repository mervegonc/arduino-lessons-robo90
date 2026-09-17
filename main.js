document.addEventListener("DOMContentLoaded", function() {
    // OTOMATİK ARKA PLAN EKLEME
    if (!document.querySelector('.fluid-bg')) {
        const fluidBg = document.createElement('div');
        fluidBg.className = 'fluid-bg';
        document.body.insertBefore(fluidBg, document.body.firstChild);
    }
});
