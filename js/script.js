document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".column_project");
  const circleWraps = document.querySelectorAll('.circle-wrap');


  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Hapus class 'active' dari semua tombol filter
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Tambahkan class 'active' ke tombol yang diklik
      button.classList.add("active");

      const selectedCategory = button.dataset.category;

      projectCards.forEach((card) => {
        const cardCategories = card.dataset.category; // Dapatkan kategori dari kartu proyek

        // Jika kategori yang dipilih adalah 'all' atau kartu memiliki kategori yang dipilih
        if (
          selectedCategory === "all" ||
          cardCategories.includes(selectedCategory)
        ) {
          card.style.display = "block"; // Tampilkan kartu (sesuaikan dengan layout Anda, bisa juga 'flex' atau 'grid')
        } else {
          card.style.display = "none"; // Sembunyikan kartu
        }
      });
    });
  });

   function updateCircleProgress(circleWrapElement) {
        const percentage = parseInt(circleWrapElement.dataset.percentage);
        const fillElement = circleWrapElement.querySelector('.fill');
        const maskFullElement = circleWrapElement.querySelector('.mask.full');
        const insideCircleElement = circleWrapElement.querySelector('.inside-circle');

        if (isNaN(percentage)) {
            console.warn('Data-percentage tidak valid:', circleWrapElement);
            return;
        }

        // Tampilkan persentase di dalam lingkaran
        insideCircleElement.textContent = `${percentage}%`;

        // BAGIAN INI HARUS TETAP ADA AGAR WARNA HIJAU MUNCUL SESUAI PERSENTASE
        const rotationDegrees = (percentage / 100) * 360;

        // Reset transform
        fillElement.style.transform = 'rotate(0deg)';
        maskFullElement.style.transform = 'rotate(0deg)';
        
        // Paksa reflow (ini tetap penting agar perubahan transform diterapkan)
        void fillElement.offsetWidth; 
        void maskFullElement.offsetWidth;

        // Terapkan rotasi akhir (ini yang membuat warna hijau terlihat)
        if (percentage > 50) {
            maskFullElement.style.transform = `rotate(180deg)`; 
            fillElement.style.transform = `rotate(${rotationDegrees}deg)`;
        } else {
            fillElement.style.transform = `rotate(${rotationDegrees}deg)`;
        }
    }

    // Menggunakan Intersection Observer untuk memicu update saat elemen masuk viewport
    // Ini akan memastikan warna hijau muncul begitu elemen terlihat, tanpa animasi.
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCircleProgress(entry.target);
                // Jika ingin hanya sekali muncul (tidak ter-reset saat keluar viewport)
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    circleWraps.forEach((circleWrap) => {
        observer.observe(circleWrap);
    });
});
