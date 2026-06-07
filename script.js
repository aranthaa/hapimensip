// 1. DRAG AND DROP LOGIC (SMOOTH & BUG-FREE)
const dragItems = document.querySelectorAll('.drag-item');
let activeItem = null;
let initialX, initialY;
let maxZIndex = 10;


dragItems.forEach(item => {
    // Inisialisasi posisi awal (Tx, Ty) di CSS
    item.style.setProperty('--tx', '0px');
    item.style.setProperty('--ty', '0px');


    // Event Desktop
    item.addEventListener('mousedown', dragStart);
    // Event Mobile (Touch)
    item.addEventListener('touchstart', dragStart, {passive: false});
});


document.addEventListener('mouseup', dragEnd);
document.addEventListener('mousemove', drag);
document.addEventListener('touchend', dragEnd);
document.addEventListener('touchmove', drag, {passive: false});


function dragStart(e) {
    // Jangan drag kalau yang disentuh adalah video player
    if(e.target.tagName.toLowerCase() === 'video') return;


    activeItem = e.currentTarget;
    
    // Pindahkan item ke paling atas
    maxZIndex++;
    activeItem.style.zIndex = maxZIndex;


    // Ambil posisi awal kursor/jari
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    } else {
        initialX = e.clientX;
        initialY = e.clientY;
    }


    // Ambil nilai translate yang lagi aktif (kalau udah pernah digeser)
    activeItem.dataset.startX = parseFloat(activeItem.style.getPropertyValue('--tx')) || 0;
    activeItem.dataset.startY = parseFloat(activeItem.style.getPropertyValue('--ty')) || 0;
}


function dragEnd() {
    activeItem = null;
}


function drag(e) {
    if (activeItem !== null) {
        e.preventDefault(); // Mencegah layar ikut scroll pas lagi narik item


        let currentX, currentY;


        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        } else {
            currentX = e.clientX;
            currentY = e.clientY;
        }


        // Hitung jarak geseran
        let deltaX = currentX - initialX;
        let deltaY = currentY - initialY;


        // Setel posisi baru menggunakan CSS variables
        let newTx = parseFloat(activeItem.dataset.startX) + deltaX;
        let newTy = parseFloat(activeItem.dataset.startY) + deltaY;


        activeItem.style.setProperty('--tx', `${newTx}px`);
        activeItem.style.setProperty('--ty', `${newTy}px`);
    }
}


// 2. LIVE TIMER JADIAN LOGIC (SUDAH DIUBAH KE 7 APRIL 2026)
const startDate = new Date("April 07, 2026 00:00:00").getTime();


function updateTimer() {
    const now = new Date().getTime();
    const difference = now - startDate;


    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);


    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}


setInterval(updateTimer, 1000);
updateTimer();

