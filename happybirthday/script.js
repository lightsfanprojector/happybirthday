document.addEventListener('DOMContentLoaded', function() {

    // --- Live Age Counter ---
    const birthDate = new Date('2026-01-13T19:00:00');
    const countdownElement = document.getElementById('countdown');

    // function updateAge() {
    //     const now = new Date();

    //     let years = birthDate.getFullYear() - now.getFullYear();
    //     let months = birthDate.getMonth() - now.getMonth();
    //     let days = birthDate.getDate() - now.getDate();
    //     let hours = birthDate.getHours() - now.getHours();
    //     let minutes = birthDate.getMinutes() - now.getMinutes();
    //     let seconds = birthDate.getSeconds() - now.getSeconds();

    //     if (seconds < 0) { seconds += 60; minutes--; }
    //     if (minutes < 0) { minutes += 60; hours--; }
    //     if (hours < 0) { hours += 24; days--; }
    //     if (days < 0) {
    //         const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    //         days += prevMonth.getDate();
    //         months--;
    //     }
    //     if (months < 0) { months += 12; years--; }

    //     countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    // }

    function updateAge() {
    const now = new Date();
    let diff = birthDate - now;

    if (diff <= 0) {
        countdownElement.innerHTML = "0d 0h 0m 0s";
        return;
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours   = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

    setInterval(updateAge, 1000);
    updateAge();

        
    // function checkcountdown() {
    //     const now = new Date();
    //     if (now >= birthDate) {
    //         document.getElementById("bruh").style.display = 'block';
    //         document.getElementById("countdown").style.display = 'none';

    //     } else {
    //         document.getElementById("bruh").style.display = 'none';
    //     }
    // }

    function checkcountdown() {
        if (new Date() >= birthDate) {
            bruh.style.display = 'block';
        } else {
            bruh.style.display = 'none';
        }
    }
    setInterval(checkcountdown, 1000);
    checkcountdown();


    // --- Initialize AOS (Animate on Scroll) ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- Initialize LightGallery ---
    lightGallery(document.getElementById('lightgallery'), {
        speed: 500,
        download: false
    });

    // --- Hall of Fame Scroller ---
    const scroller = document.getElementById('hall-of-fame-scroller');
    const scrollLeftBtn = document.getElementById('scroll-left-btn');
    const scrollRightBtn = document.getElementById('scroll-right-btn');
    if (scroller && scrollLeftBtn && scrollRightBtn) {
        const card = scroller.querySelector('.snap-center');
        const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card.parentElement).gap);

        scrollRightBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        scrollLeftBtn.addEventListener('click', () => {
            scroller.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    // --- Video Uploader ---
    const videoUploadInput = document.getElementById('video-upload');
    const videoPlayer = document.getElementById('video-player');
    const videoUploadLabel = document.getElementById('video-upload-label');

    if(videoUploadInput && videoPlayer && videoUploadLabel) {
        videoUploadLabel.addEventListener('click', () => {
            videoUploadInput.click();
        });

        videoUploadInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                videoPlayer.src = videoURL;
                videoPlayer.classList.remove('hidden');
                videoUploadLabel.classList.add('hidden');
                videoPlayer.play();
            }
        });
    }

// --- Five-Pointed Star Animation ---
const canvas = document.getElementById('sakura-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    const numStars = 30;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function Star() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.radius = 6 + Math.random() * 6;
        this.opacity = 0.5 + Math.random() * 0.5;
        this.xSpeed = 0.2 + Math.random() * 0.6;
        this.ySpeed = 0.5 + Math.random() * 1.2;
        this.rotation = Math.random() * Math.PI;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
    }

    function drawStar(cx, cy, spikes, outerRadius, innerRadius, rotation) {
        let step = Math.PI / spikes;
        let rot = rotation;

        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            let r = (i % 2 === 0) ? outerRadius : innerRadius;
            let x = cx + Math.cos(rot) * r;
            let y = cy + Math.sin(rot) * r;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.closePath();
        ctx.fill();
    }

    Star.prototype.draw = function () {
        if (this.y > canvas.height || this.x > canvas.width) {
            this.x = Math.random() * canvas.width;
            this.y = -20;
        }

        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#c3dde4ff';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffffffff';

        drawStar(
            this.x,
            this.y,
            5,
            this.radius,
            this.radius / 2,
            this.rotation
        );

        ctx.restore();
    };

    Star.prototype.update = function () {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.rotation += this.rotationSpeed;
        this.draw();
    };

    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => star.update());
        requestAnimationFrame(animate);
    }

    createStars();
    animate();
}


});

