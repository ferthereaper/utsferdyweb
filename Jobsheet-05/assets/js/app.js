function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

function initHapusConfirm() {
    document.querySelectorAll(".button-hapus").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const row = btn.closest("tr");
            const nama = row ? row.querySelector("td")?.textContent : "data ini";
            const yakin = confirm("Yakin ingin menghapus \"" +nama +"\"?");
            if (yakin && row) {
                row.remove();
                updateCounter();
            }
        });
    });
}

function initTableFilter() {
    const input = document.getElementById("search-input");
    const table = document.querySelector(".table-responsive table");
    if (!input || !table) return;

    input.addEventListener("keyup", function () {
        const keyword = input.value.toLowerCase();
        const rows = table.querySelectorAll("tbody tr");
        rows.forEach(function (row) {
            // const teks = row.textContent.toLowerCase();
            // JS 5 Latihan 3
            const kolomjudul = row.querySelector("td");
            const teks = kolomjudul ? kolomjudul.textContent.toLowerCase() : "";
            
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
        updateCounter();
    });
}

function tampilkanError(input, pesan) {
    hapusError(input);
    const span = document.createElement("span");
    span.className = "error";
    span.textContent = pesan;
    input.insertAdjacentElement("afterend", span);
}

function hapusError(input) {
    const next = input.nextElementSibling;
    if (next && next.classList.contains("error")) {
        next.remove();
    }
}

// JS 5 Latihan 4
function updateCounter() {
    const table = document.querySelector(".table-responsive table");
    const infoArea = document.getElementById("table-info");
    if (!table || !infoArea) return;

    const totalRows = table.querySelectorAll("tbody tr").length;
    let visibleRows = 0;
    
    table.querySelectorAll("tbody tr").forEach(row => {
        if (row.style.display !== "none") visibleRows++;
    });

    infoArea.textContent = `Menampilkan ${visibleRows} dari ${totalRows} data`;
}

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        // const namaProduk = form.querySelector("[name='nama_produk'], [name='nama']");
        // if (namaProduk && namaProduk.value.trim() === "") {
        //     tampilkanError(namaProduk, "Field ini wajib diisi.");
        //     valid = false;
        // } else if (namaProduk) {
        //     hapusError(namaProduk);
        // }

        // const kategori = form.querySelector("[name='kategori']");
        // if (kategori && kategori.value.trim() === "") {
        //     tampilkanError(kategori, "Kategori wajib diisi.");
        //     valid = false;
        // } else if (kategori) {
        //     hapusError(kategori);
        // }

        // JS 5 Latihan 5
        const fieldWajib = [
            { selector: "[name='nama_produk'], [name='nama']", pesan: "Field ini wajib diisi." },
            { selector: "[name='kategori']", pesan: "Kategori wajib diisi." }
        ];

        fieldWajib.forEach(function(item) {
            const elemen = form.querySelector(item.selector);
            if (elemen && elemen.value.trim() === "") {
                tampilkanError(elemen, item.pesan);
                valid = false;
            } else if (elemen) {
                hapusError(elemen);
            }
        });

        const harga = form.querySelector("[name='harga']");
        if (harga) {
            const nilai = parseInt(harga.value, 10);
            if (isNaN(nilai) || nilai < 0) {
                tampilkanError(harga, "Harga harus berupa angka 0 atau lebih.");
                valid = false;
            } else {
                hapusError(harga);
            }
        }

        const stok = form.querySelector("[name='stok']");
        if (stok) {
            const nilai = parseInt(stok.value, 10);
            if (isNaN(nilai) || nilai < 0) {
                tampilkanError(stok, "Stok tidak boleh negatif.");
                valid = false;
            } else {
                hapusError(stok);
            }
        }

        // JS 5 Latihan 1
        const noHp = form.querySelector("[name='no_hp']");
        if (noHp && noHp.value.trim() !== "") {
            const regexNoHp = /^[0-9]+$/;
            if (!regexNoHp.test(noHp.value)) {
                tampilkanError(noHp, "No. HP hanya boleh berisi angka.")
                valid = false;
            } else {
                hapusError(noHp);
            }
        }

        if (!valid) {
            e.preventDefault();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
    updateCounter();
});