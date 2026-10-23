const destinations = [
    {
        id: 1,
        name: "Kelingking Beach",
        location: "Nusa Penida, Bali",
        category: "Beach",
        image: "kelingking.jpg",
        description: "Pantai dengan tebing ikonik dan laut biru yang indah."
    },
    {
        id: 2,
        name: "Savana Bekol",
        location: "Taman Nasional Baluran, Jawa Timur",
        category: "Nature",
        image: "savanabekol.jpeg",
        description: "Padang savana luas dengan pemandangan alam yang eksotis."
    },
    {
        id: 3,
        name: "Tumpak Sewu Waterfall",
        location: "Lumajang, Jawa Timur",
        category: "Nature",
        image: "tumpaksewu.jpg",
        description: "Air terjun megah yang dikelilingi tebing hijau."
    },
    {
        id: 4,
        name: "Mount Bromo",
        location: "Jawa Timur",
        category: "Mountain",
        image: "bromo.jpg",
        description: "Nikmati sunrise dan lautan pasir yang ikonik."
    },
    {
        id: 5,
        name: "Ijen Crater",
        location: "Banyuwangi, Jawa Timur",
        category: "Mountain",
        image: "ijencrater.jpg",
        description: "Kawah gunung berapi dengan danau berwarna turquoise."
    },
    {
        id: 6,
        name: "Padar Island",
        location: "Taman Nasional Komodo, NTT",
        category: "Nature",
        image: "padar.jpg",
        description: "Bukit dengan pemandangan teluk dan pantai yang unik."
    },
    {
        id: 7,
        name: "Pink Beach",
        location: "Taman Nasional Komodo, NTT",
        category: "Beach",
        image: "pinkbeach.jpg",
        description: "Pantai eksotis dengan pasir bernuansa merah muda."
    },
    {
        id: 8,
        name: "Borobudur Temple",
        location: "Magelang, Jawa Tengah",
        category: "Culture",
        image: "borobudur.jpg",
        description: "Candi bersejarah dengan stupa dan relief yang khas."
    },
    {
        id: 9,
        name: "Wae Rebo Village",
        location: "Flores, Nusa Tenggara Timur",
        category: "Culture",
        image: "waerebo.jpg",
        description: "Desa adat dengan rumah tradisional di pegunungan."
    },
    {
        id: 10,
        name: "Kawah Putih",
        location: "Ciwidey, Bandung, Jawa Barat",
        category: "Nature",
        image: "kawahputih.jpg",
        description: "Danau kawah dengan air berwarna pucat dan suasana berkabut."
    },
    {
        id: 11,
        name: "Prambanan Temple",
        location: "Sleman, DI Yogyakarta",
        category: "Culture",
        image: "prambanan.jpg",
        description: "Kompleks candi Hindu dengan arsitektur yang megah."
    },
    {
        id: 12,
        name: "Malioboro Street",
        location: "Yogyakarta, DI Yogyakarta",
        category: "Culture",
        image: "malioboro.jpg",
        description: "Kawasan populer untuk berjalan-jalan dan berburu oleh-oleh."
    },
    {
        id: 13,
        name: "Pink Beach Lombok",
        location: "Jerowaru, Lombok Timur, NTB",
        category: "Beach",
        image: "pinkbeachlombok.png",
        description: "Pantai dengan pasir merah muda dan air laut yang jernih."
    },
    {
        id: 14,
        name: "Lake Toba",
        location: "Sumatera Utara",
        category: "Nature",
        image: "laketoba.jpg",
        description: "Danau vulkanik luas yang dikelilingi perbukitan hijau."
    },
    {
        id: 15,
        name: "Pangandaran Beach",
        location: "Pangandaran, Jawa Barat",
        category: "Beach",
        image: "pangandaranbeach.jpg",
        description: "Pantai untuk menikmati pemandangan laut dan suasana pesisir."
    }
];

// Mengambil data yang tersimpan di browser
let bucket = JSON.parse(localStorage.getItem("bucket")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

let currentCategory = "All";

// Membuat link Google Maps
function getMapsLink(place) {
    const query = encodeURIComponent(place.location);

    return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// Menyimpan data ke browser
function saveData() {
    localStorage.setItem("bucket", JSON.stringify(bucket));
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

// Membuat kartu destinasi
function makeCard(place) {
    const mapsLink = getMapsLink(place);
    const isInBucket = bucket.includes(place.id);
    const isFavorite = favorites.includes(place.id);

    return `
        <article class="card">
            <img
                src="${place.image}"
                alt="${place.name}"
                onerror="this.onerror=null; this.alt='Gambar tidak ditemukan';"
            >

            <div class="card-content">
                <h3>${place.name}</h3>

                <p>
                    📍
                    <a
                        href="${mapsLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="location-link"
                        title="Buka lokasi di Google Maps"
                    >${place.location}</a>
                </p>

                <p>${place.description}</p>

                <a
                    href="${mapsLink}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="maps-button"
                >
                    View on Maps ↗
                </a>

                <div class="card-actions">
                    <button data-add="${place.id}">
                        ${isInBucket ? "✓ Added to Bucket" : "+ Bucket List"}
                    </button>

                    <button
                        class="favorite"
                        data-favorite="${place.id}"
                    >
                        ${isFavorite ? "♥ Favorited" : "♡ Favorite"}
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Menampilkan destinasi berdasarkan pencarian dan kategori
function showPlaces() {
    const keyword = document
        .getElementById("search")
        .value.toLowerCase()
        .trim();

    const result = destinations.filter(place => {
        const matchesSearch =
            place.name.toLowerCase().includes(keyword) ||
            place.location.toLowerCase().includes(keyword);

        const matchesCategory =
            currentCategory === "All" ||
            place.category === currentCategory;

        return matchesSearch && matchesCategory;
    });

    document.getElementById("destination-list").innerHTML =
        result.length > 0
            ? result.map(makeCard).join("")
            : '<p class="empty-message">Destinasi tidak ditemukan. Coba kata kunci lain, ya!</p>';
}

// Menampilkan Bucket List dan Favorites
function showSaved() {
    const bucketPlaces = bucket
        .map(id => destinations.find(place => place.id === id))
        .filter(Boolean);

    const favoritePlaces = favorites
        .map(id => destinations.find(place => place.id === id))
        .filter(Boolean);

    document.getElementById("bucket-list").innerHTML =
        bucketPlaces.length > 0
            ? bucketPlaces.map(makeCard).join("")
            : '<p class="empty-message">Bucket List kamu masih kosong. Yuk, pilih destinasi impianmu!</p>';

    document.getElementById("favorite-list").innerHTML =
        favoritePlaces.length > 0
            ? favoritePlaces.map(makeCard).join("")
            : '<p class="empty-message">Belum ada tempat favorit. Klik Favorite pada destinasi pilihanmu.</p>';
}

// Menghapus destinasi dari daftar tersimpan
function removePlace(type, id) {
    if (type === "bucket") {
        bucket = bucket.filter(item => item !== id);
    }

    if (type === "favorites") {
        favorites = favorites.filter(item => item !== id);
    }

    saveData();
    refreshPage();
}

// Memperbarui tampilan
function refreshPage() {
    showPlaces();
    showSaved();
}

// Mengatur tombol kategori, Bucket List, dan Favorites
document.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    if (button.classList.contains("category")) {
        currentCategory = button.dataset.category;

        document.querySelectorAll(".category").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");
        showPlaces();
        return;
    }

    if (button.dataset.add) {
        const id = Number(button.dataset.add);

        if (bucket.includes(id)) {
            bucket = bucket.filter(item => item !== id);
        } else {
            bucket.push(id);
        }

        saveData();
        refreshPage();
        return;
    }

    if (button.dataset.favorite) {
        const id = Number(button.dataset.favorite);

        if (favorites.includes(id)) {
            favorites = favorites.filter(item => item !== id);
        } else {
            favorites.push(id);
        }

        saveData();
        refreshPage();
    }
});

// Fitur pencarian
document.getElementById("search").addEventListener("input", showPlaces);

// Fitur Surprise Me
document.getElementById("surprise-btn").addEventListener("click", function() {
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const place = destinations[randomIndex];

    const result = document.getElementById("surprise-result");

    result.innerHTML = `
        ✨ Your next adventure:
        <strong>${place.name}</strong> — ${place.location}
        <a href="${getMapsLink(place)}" target="_blank" rel="noopener noreferrer">
            View on Google Maps ↗
        </a>
    `;

    result.style.display = "block";

    document.getElementById("search").value = "";
    currentCategory = "All";

    document.querySelectorAll(".category").forEach(item => {
        item.classList.remove("active");
    });

    document.querySelector('[data-category="All"]').classList.add("active");

    showPlaces();
});

// Menampilkan website saat pertama dibuka
refreshPage();
