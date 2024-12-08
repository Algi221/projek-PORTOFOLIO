document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Menghitung jarak scroll
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const startPosition = window.scrollY;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Durasi animasi dalam milidetik
            let startTime = null;

            // Fungsi animasi
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            // Fungsi easing
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});
/*Untuk membuat section lebih smooth*/

// Menampilkan tombol ketika menggulir ke bawah
window.onscroll = function() {
    const button = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block"; // Tampilkan tombol
    } else {
        button.style.display = "none"; // Sembunyikan tombol
    }
};

// Fungsi untuk scroll ke atas dengan animasi halus
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    const startPosition = window.scrollY;
    const targetPosition = 0;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Durasi animasi dalam milidetik
    let startTime = null;

    // Fungsi animasi
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress); // Fungsi easing

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Fungsi easing (ease-in-out)
    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
});
/*seeprojek*/
function showProjectImage(imageSrc) {
    document.getElementById('projectImage').src = imageSrc; // Set gambar
    document.getElementById('projectImageModal').style.display = 'flex'; // Tampilkan modal
}

function closeProjectImage() {
    document.getElementById('projectImageModal').style.display = 'none'; // Sembunyikan modal
}

/*reset feedback*/
var form = document.getElementById("feedbackForm");

async function handleSubmit(event) {
    event.preventDefault();
    var data = new FormData(event.target);
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            alert("Thanks for your submission!"); // Menggunakan alert untuk sukses
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    alert(data["errors"].map(error => error["message"]).join(", ")); // Menggunakan alert untuk menampilkan kesalahan
                } else {
                    alert("Oops! There was a problem submitting your form"); // Menggunakan alert untuk kesalahan umum
                }
            });
        }
    }).catch(error => {
        alert("Oops! There was a problem submitting your form"); // Menggunakan alert untuk kesalahan jaringan
    });
}

form.addEventListener("submit", handleSubmit);