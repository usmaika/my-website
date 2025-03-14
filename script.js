document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const container = document.querySelector(".carousel-container");
    const totalSlides = slides.length;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(nextSlide, 5000); // Geser setiap 5 detik
    const urlParams = new URLSearchParams(window.location.search);
    let seriesName = urlParams.get("series");
    let filmTitle = urlParams.get("title");

    const videoPlayer = document.getElementById("player");
    const videoSource = document.getElementById("video-source");
    const episodeList = document.getElementById("episode-list");
    const episodesDiv = document.getElementById("episodes");

    // Daftar jumlah episode yang benar
    const episodeCounts = {
        konosuba: 11,
        roshidere: 12,
        kekkonsuru: 4
    };

    // Jika ini adalah series, tampilkan daftar episode yang sesuai
    if (seriesName && episodeCounts[seriesName]) {
        episodeList.style.display = "block";

        // Hapus daftar episode lama (jika ada)
        episodesDiv.innerHTML = "";

        // Ambil jumlah episode berdasarkan series yang dipilih
        const totalEpisodes = episodeCounts[seriesName];

        const episodes = [];
        for (let i = 1; i <= totalEpisodes; i++) {
            episodes.push({
                title: `Episode ${i}`,
                url: `videos/${seriesName.toLowerCase()}eps${i}.mp4`
            });
        }

        // Tampilkan daftar episode di halaman
        episodes.forEach((ep, index) => {
            const epLink = document.createElement("a");
            epLink.href = "#";
            epLink.textContent = ep.title;
            epLink.classList.add("episode-link");

            // Ganti video saat episode diklik
            epLink.addEventListener("click", function (e) {
                e.preventDefault();
                videoSource.src = ep.url;
                videoPlayer.load();
                videoPlayer.play();
                document.getElementById("film-title").textContent = `${filmTitle} - ${ep.title}`;
            });

            episodesDiv.appendChild(epLink);

            // **Setel episode pertama secara default**
            if (index === 0) {
                videoSource.src = ep.url;
                videoPlayer.load();
            }
        });
    }
});
