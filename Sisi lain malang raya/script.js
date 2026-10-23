// Data Spot Ngopi / Cangkruk Terkenal khusus di wilayah Kota Malang
const dataKopi = [
    {
        id: 1,
        nama: "Latar Ijen Coffee",
        lokasi: "Jl. Besar Ijen, Kota Malang",
        kategori: "Syahdu/Halaman",
        gambar: "latarijen.jpeg",
        deskripsi: "Cafe berkonsep outdoor & halaman asri di kawasan heritage Ijen Boulevard yang tenang, syahdu, dan elegan di pusat kota."
    },
    {
        id: 2,
        nama: "Toko Kopi Kongca",
        lokasi: "Kayutangan, Kota Malang",
        kategori: "Vintage",
        gambar: "kongca.jpeg",
        deskripsi: "Menempati bangunan kuno bergaya kolonial di koridor Kayutangan, menyajikan kopi saring tradisional dan jajanan pasar."
    },
    {
        id: 3,
        nama: "Kopi Lonceng",
        lokasi: "Pusat Kota Malang",
        kategori: "Vintage",
        gambar: "kopilonceng.jpg",
        deskripsi: "Kedai kopi legendaris Kota Malang dengan arsitektur rumah tua kolonial yang autentik dan tenang."
    },
    {
        id: 4,
        nama: "Dialoogi Space & Coffee",
        lokasi: "Lowokwaru, Kota Malang",
        kategori: "Diskusi",
        gambar: "dialogi.jpg",
        deskripsi: "Tempat favorit mahasiswa dan anak muda Kota Malang berkumpul untuk nugas, berdiskusi, atau sekadar ngopi santai."
    },
    {
        id: 5,
        nama: "Nakoa Coffee & Space",
        lokasi: "Jl. Retawu, Kota Malang",
        kategori: "Diskusi",
        gambar: "nakoa.jpeg",
        deskripsi: "Spot nongkrong favorit 24 jam dengan area luas dan modern di Kota Malang, selalu ramai oleh skena diskusi anak muda."
    },
    {
        id: 6,
        nama: "Harmoni Cafe & Study",
        lokasi: "Jl. Soekarno Hatta, Kota Malang",
        kategori: "Diskusi",
        gambar: "harmoni.jpg",
        deskripsi: "Kafe populer di kawasan Suhat yang nyaman untuk mengerjakan tugas kelompok maupun diskusi panjang dengan fasilitas lengkap."
    },
    {
        id: 7,
        nama: "Lafayette Coffee & Eatery",
        lokasi: "Jl. Semeru, Kota Malang",
        kategori: "Syahdu/Halaman",
        gambar: "lafayette.png",
        deskripsi: "Kafe bergaya klasik Eropa dengan balcony dan area outdoor halaman yang cantik, elegan, serta syahdu di pusat kota."
    },
    {
        id: 8,
        nama: "Gartenhaus Co-Working Space",
        lokasi: "Lowokwaru, Kota Malang",
        kategori: "Syahdu/Halaman",
        gambar: "garten.jpg",
        deskripsi: "Kafe berkonsep garden/kebun hijau rindang di kawasan Lowokwaru dengan pepohonan sangat asri, sejuk, dan syahdu."
    },
    {
        id: 9,
        nama: "Hamur Mbah Ndut",
        lokasi: "Kayutangan Heritage, Kota Malang",
        kategori: "Vintage",
        gambar: "mbahdut.jpg",
        deskripsi: "Kedai kopi legendaris di rumah tua era kolonial Belanda kawasan Kayutangan Heritage dengan suasana hangat tempo dulu."
    }
];

// State Variables
let kategoriAktif = 'semua';
let daftarFavorit = JSON.parse(localStorage.getItem('favoritKopiMLG')) || [];

// Fungsi Render Kartu Kopi
function tampilkanKopi(list) {
    const kopiGrid = document.getElementById('kopiGrid');
    if (!kopiGrid) return;
    
    kopiGrid.innerHTML = ''; 

    if (list.length === 0) {
        kopiGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #666; padding: 20px;">Tidak ada tempat cangkruk di daftar favorit umak.</p>`;
        return;
    }

    list.forEach(item => {
        const isFavorit = daftarFavorit.includes(item.id);
        const queryMaps = encodeURIComponent(`${item.nama} ${item.lokasi}`);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${queryMaps}`;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${item.gambar}" alt="${item.nama}" class="card-img">
                <span class="card-tag">${item.kategori}</span>
                <button class="btn-bookmark ${isFavorit ? 'active' : ''}" onclick="toggleFavorit(${item.id}, event)">
                    ${isFavorit ? '❤️' : '🤍'}
                </button>
            </div>
            <div class="card-body">
                <h3>${item.nama}</h3>
                <p style="margin-bottom: 6px;">
                    <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="location-link">
                        📍 ${item.lokasi}
                    </a>
                </p>
                <p>${item.deskripsi}</p>
            </div>
        `;
        kopiGrid.appendChild(card);
    });
}

// Handler Filter Kategori Kopi
function filterKopi(kategori, evt) {
    kategoriAktif = kategori;
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (evt && evt.target) {
        evt.target.classList.add('active');
    }

    if (kategori === 'semua') {
        tampilkanKopi(dataKopi);
    } else if (kategori === 'favorit') {
        const hasilFavorit = dataKopi.filter(item => daftarFavorit.includes(item.id));
        tampilkanKopi(hasilFavorit);
    } else {
        const hasilFilter = dataKopi.filter(item => item.kategori === kategori);
        tampilkanKopi(hasilFilter);
    }
}

// Toggle Simpan / Hapus Favorit
function toggleFavorit(id, evt) {
    evt.stopPropagation();
    if (daftarFavorit.includes(id)) {
        daftarFavorit = daftarFavorit.filter(favId => favId !== id);
    } else {
        daftarFavorit.push(id);
    }
    
    localStorage.setItem('favoritKopiMLG', JSON.stringify(daftarFavorit));
    filterKopi(kategoriAktif, null);
}

// Randomizer Spot Kopi
function pilihKopiAcak() {
    const acak = dataKopi[Math.floor(Math.random() * dataKopi.length)];
    
    document.getElementById('modalNama').innerText = acak.nama;
    document.getElementById('modalGambar').src = acak.gambar;
    document.getElementById('modalLokasi').innerText = `📍 ${acak.lokasi}`;
    document.getElementById('modalDeskripsi').innerText = acak.deskripsi;
    
    const queryMaps = encodeURIComponent(`${acak.nama} ${acak.lokasi}`);
    document.getElementById('modalMapsLink').href = `https://www.google.com/maps/search/?api=1&query=${queryMaps}`;

    document.getElementById('randomModal').style.display = 'flex';
}

function tutupModal() {
    document.getElementById('randomModal').style.display = 'none';
}

// Tutup modal saat klik luar kotak
window.onclick = function(event) {
    const modal = document.getElementById('randomModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Inisialisasi saat DOM Selesai Dimuat
document.addEventListener('DOMContentLoaded', () => {
    tampilkanKopi(dataKopi);
});