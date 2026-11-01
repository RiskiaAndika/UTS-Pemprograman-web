// Sambal Bu Rini - interaktivitas
(function () {
  "use strict";

  /* ===== 1. Pengganti tema terang / gelap ===== */
  var html = document.documentElement;
  var tombolTema = document.getElementById("tombolTema");

  function terapkanTema(tema) {
    html.setAttribute("data-bs-theme", tema);
    if (tombolTema) {
      tombolTema.textContent = tema === "dark" ? "Mode terang" : "Mode gelap";
      tombolTema.setAttribute("aria-pressed", tema === "dark" ? "true" : "false");
    }
  }

  var temaTersimpan = "light";
  try { temaTersimpan = localStorage.getItem("tema") || "light"; } catch (e) { /* abaikan */ }
  terapkanTema(temaTersimpan);

  if (tombolTema) {
    tombolTema.addEventListener("click", function () {
      var baru = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      terapkanTema(baru);
      try { localStorage.setItem("tema", baru); } catch (e) { /* abaikan */ }
    });
  }

  /* ===== 2. Validasi formulir kontak ===== */
  var form = document.getElementById("formKontak");
  if (!form) { return; }

  var inputNama = document.getElementById("nama");
  var inputEmail = document.getElementById("email");
  var inputProduk = document.getElementById("produk");
  var inputPesan = document.getElementById("pesan");

  function setError(input, idPesan, teks) {
    document.getElementById(idPesan).textContent = teks;
    if (teks) { input.classList.add("tidak-valid"); } else { input.classList.remove("tidak-valid"); }
    return teks === "";
  }

  function cekNama() {
    var nilai = inputNama.value.trim();
    if (nilai === "") { return setError(inputNama, "errNama", "Nama wajib diisi dan tidak boleh hanya spasi."); }
    return setError(inputNama, "errNama", "");
  }

  function cekEmail() {
    var nilai = inputEmail.value.trim();
    var pola = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (nilai === "") { return setError(inputEmail, "errEmail", "Email wajib diisi."); }
    if (!pola.test(nilai)) { return setError(inputEmail, "errEmail", "Format email belum benar, contoh: nama@email.com."); }
    return setError(inputEmail, "errEmail", "");
  }

  function cekProduk() {
    if (inputProduk.value === "") { return setError(inputProduk, "errProduk", "Pilih salah satu produk."); }
    return setError(inputProduk, "errProduk", "");
  }

  function cekPesan() {
    var nilai = inputPesan.value.trim();
    if (nilai.length < 10) { return setError(inputPesan, "errPesan", "Pesan minimal 10 karakter agar kami paham kebutuhan Anda."); }
    return setError(inputPesan, "errPesan", "");
  }

  // Koreksi langsung saat pengguna mengetik
  inputNama.addEventListener("input", cekNama);
  inputEmail.addEventListener("input", cekEmail);
  inputProduk.addEventListener("change", cekProduk);
  inputPesan.addEventListener("input", cekPesan);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Semua pengecekan dijalankan agar semua pesan error tampil sekaligus
    var hasil = [cekNama(), cekEmail(), cekProduk(), cekPesan()];
    var semuaValid = hasil.every(function (ok) { return ok; });
    var ringkasan = document.getElementById("ringkasan");

    if (!semuaValid) {
      ringkasan.hidden = true;
      return;
    }

    document.getElementById("outNama").textContent = inputNama.value.trim();
    document.getElementById("outEmail").textContent = inputEmail.value.trim();
    document.getElementById("outProduk").textContent = inputProduk.value;
    document.getElementById("outPesan").textContent = inputPesan.value.trim();
    ringkasan.hidden = false;
    form.reset();
  });
})();
