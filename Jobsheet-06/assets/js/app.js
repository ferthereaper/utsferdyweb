function initNavToggle() {
    const toggleBtn = document.getElementById("nav-toggle-btn");
    const nav = document.querySelector("header nav");
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener("click", function () {
        nav.classList.toggle("nav-open");
    });
}

function initHapusConfirm() {
    document.addEventListener("click", function (e) {
        console.log("Elemen yang diklik:", e.target);
        
        const btn = e.target.closest(".button-hapus");
        if (!btn) return;

        const row = btn.closest("tr");
        const nama = row ? row.querySelector("td")?.textContent : "data ini";
        const yakin = confirm("Yakin ingin menghapus \"" + nama + "\"?");
        if (yakin && row) {
            row.remove();

            if (typeof updateCounter === "function") {
                updateCounter();
            }
        }
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
            const teks = row.textContent.toLowerCase();
            row.style.display = teks.includes(keyword) ? "" : "none";
        });
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

function initValidasiForm() {
    const form = document.getElementById("form-tambah");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        let valid = true;

        const namaProduk = form.querySelector("[name='nama_produk'], [name='nama']");
        if (namaProduk && namaProduk.value.trim() === "") {
            tampilkanError(namaProduk, "Field ini wajib diisi.");
            valid = false;
        } else if (namaProduk) {
            hapusError(namaProduk);
        }

        const kategori = form.querySelector("[name='kategori']");
        if (kategori && kategori.value.trim() === "") {
            tampilkanError(kategori, "Kategori wajib diisi.");
            valid = false;
        } else if (kategori) {
            hapusError(kategori);
        }

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

        if (!valid) {
            e.preventDefault();
        }
    });
}

// JS 6 Latihan 2
async function muatDataTabel(urlJson, selectorTbody, renderCallback) {
    const tbody = document.querySelector(selectorTbody);
    const loading = document.getElementById("loading-indicator");
    if (!tbody) return;

    try {
        if (loading) loading.style.display = "block";
        tbody.innerHTML = "";

        const response = await fetch(urlJson);
        const data = await response.json();

        // Simulasi jeda / delay
        await new Promise(resolve => setTimeout(resolve, 600));

        renderCallback(data, tbody);
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red;">Gagal memuat data.</td></tr>`;
    } finally {
        if (loading) loading.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHapusConfirm();
    initTableFilter();
    initValidasiForm();
});