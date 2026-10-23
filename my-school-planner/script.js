
const form = document.getElementById("taskForm");
const daftar = document.getElementById("taskList");

let total = 0;
let selesai = 0;

// Berpindah halaman
function showPage(id) {
    document.querySelectorAll(".page").forEach(function(halaman) {
        halaman.hidden = true;
    });

    document.getElementById(id).hidden = false;
}

// Memperbarui jumlah tugas
function updateJumlah() {
    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = selesai;
    document.getElementById("pendingTasks").textContent = total - selesai;
}

// Menambahkan tugas
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("taskName").value;
    const mapel = document.getElementById("subject").value;
    const tanggal = document.getElementById("deadline").value;

    const item = document.createElement("li");
    item.textContent = nama + " | " + mapel + " | Deadline: " + tanggal;

    item.addEventListener("click", function() {
        if (item.classList.contains("selesai")) {
            item.classList.remove("selesai");
            selesai--;
        } else {
            item.classList.add("selesai");
            selesai++;
        }

        updateJumlah();
    });

    daftar.appendChild(item);
    total++;

    updateJumlah();
    form.reset();
    showPage("tasks");
});
