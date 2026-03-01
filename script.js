// data produk

var produk = [
  {
    id: 1,
    nama: "Floaty",
    kategori: "snack",
    harga: 4500,
    gambar: "img/snack/floaty.webp",
    promo: false,
  },
  {
    id: 2,
    nama: "Jetz",
    kategori: "snack",
    harga: 3000,
    gambar: "img/snack/jetz.jpg",
    promo: false,
  },
  {
    id: 3,
    nama: "Smax Ring",
    kategori: "snack",
    harga: 5000,
    gambar: "img/snack/ring.webp",
    promo: true,
  },
  {
    id: 4,
    nama: "ABC Kopi Susu",
    kategori: "minuman",
    harga: 2500,
    gambar: "img/minuman/abckopisusu.webp",
    promo: false,
  },
  {
    id: 5,
    nama: "Lemonilo Mie Instan",
    kategori: "bahan",
    harga: 4500,
    gambar: "img/bahan/lemonilo-mie-instan.webp",
    promo: true,
  },
  {
    id: 6,
    nama: "Bumbu Rendang",
    kategori: "bahan",
    harga: 3000,
    gambar: "img/bahan/bumbu-rendang.webp",
    promo: false,
  },
  {
    id: 7,
    nama: "Antangin (1 box)",
    kategori: "kesehatan",
    harga: 8000,
    gambar: "img/kesehatan/antangin-box.webp",
    promo: false,
  },
  {
    id: 8,
    nama: "CDR Vitamin",
    kategori: "kesehatan",
    harga: 9000,
    gambar: "img/kesehatan/cdr.webp",
    promo: true,
  },
  {
    id: 9,
    nama: "Sari Gandum Coklat",
    kategori: "snack",
    harga: 4900,
    gambar: "img/snack/sarigndumcoklat.webp",
    promo: false,
  },
  {
    id: 10,
    nama: "Imboost",
    kategori: "kesehatan",
    harga: 6000,
    gambar: "img/kesehatan/imboost.webp",
    promo: false,
  },
  {
    id: 9,
    nama: "Sedaap Mie Instan",
    kategori: "bahan",
    harga: 4900,
    gambar: "img/bahan/sedap-mieinstan.webp",
    promo: false,
  },
  {
    id: 10,
    nama: "Bumbu Opor Ayam Instan",
    kategori: "bahan",
    harga: 1500,
    gambar: "img/bahan/bumbu-opor-ayam.webp",
    promo: false,
  },
  {
    id: 11,
    nama: "Indomie Kari Ayam",
    kategori: "bahan",
    harga: 3000,
    gambar: "img/bahan/indomie-kari-ayam.webp",
    promo: true,
  },
];

var keranjang = [];
var favorit = [];
var kategoriAktif = "all";

// saat halaman dimuat
window.onload = function () {
  tampilkanProduk(produk);
  tampilkanPromo();
};

function toggleMenu() {
  var navbar = document.getElementById("navbar");
  navbar.classList.toggle("active");
}
function tutupMenu() {
  var navbar = document.getElementById("navbar");
  navbar.classList.remove("active");
}

function tampilkanPromo() {
  var container = document.getElementById("promo-container");
  container.innerHTML = "";

  for (var i = 0; i < produk.length; i++) {
    if (produk[i].promo === true) {
      var p = produk[i];
      var html = "";
      html = html + '<div class="promo-card">';
      html = html + '<span class="promo-tag">PROMO</span>';
      html = html + '<img src="' + p.gambar + '">';
      html = html + '<div class="promo-info">';
      html = html + "<h3>" + p.nama + "</h3>";
      html = html + "<p>₩" + p.harga.toLocaleString() + "</p>";
      html = html + "</div>";
      html = html + "</div>";
      container.innerHTML = container.innerHTML + html;
    }
  }
}

function tampilkanProduk(dataProduk) {
  var container = document.getElementById("daftar-produk");
  container.innerHTML = "";

  for (var i = 0; i < dataProduk.length; i++) {
    var p = dataProduk[i];

    //cek apakah sudah msauk di fav
    var sudahFav = false;
    for (var j = 0; j < favorit.length; j++) {
      if (favorit[j] === p.id) {
        sudahFav = true;
        break;
      }
    }

    // tentukan icon heart
    var iconHeart = "fa-regular";
    var kelasLove = "";
    if (sudahFav === true) {
      iconHeart = "fa-solid";
      kelasLove = "loved";
    }

    //buat html produk
    var html = "";
    html += '<div class="produk-card">';
    html += '<img src="' + p.gambar + '" alt"' + p.nama + '">';
    html += '<div class="produk-info">';
    html += "<span class='produk-cat'>" + p.kategori + "</span>";
    html += '<h3 class="produk-name">' + p.nama + "</h3>";
    html += '<p class="produk-price">₩' + p.harga.toLocaleString() + "</p>";
    html += "</div>";
    html += '<div class="produk-actions">';
    html +=
      '<button class="action-btn ' +
      kelasLove +
      '" onclick="toggleFavorit(' +
      p.id +
      ')">';
    html += '<i class="' + iconHeart + ' fa-heart"></i>';
    html += "</button>";
    html +=
      '<button class="action-btn" onclick="tambahKeranjang(' + p.id + ')">';
    html += '<i class="fa-solid fa-cart-plus"></i>';
    html += "</button>";
    html += "</div>";
    html += "</div>";

    container.innerHTML = container.innerHTML + html;
  }
}

// filter & search
function filterProduk() {
  var kataCari = document.getElementById("cari").value;
  kataCari = kataCari.toLowerCase();

  var hasilFilter = [];

  for (var i = 0; i < produk.length; i++) {
    var p = produk[i];

    var cocokNama = p.nama.toLocaleLowerCase().indexOf(kataCari) !== -1;
    var cocokKategori = kategoriAktif === "all" || p.kategori === kategoriAktif;

    if (cocokNama && cocokKategori) {
      hasilFilter.push(p);
    }
  }

  tampilkanProduk(hasilFilter);
}

function pilihKategori(kat, tombol) {
  var semuaTombol = document.querySelectorAll(".filter-btn");
  for (var i = 0; i < semuaTombol.length; i++) {
    semuaTombol[i].classList.remove("active");
  }
  tombol.classList.add("active");

  //update kategori aktif
  kategoriAktif = kat;
  filterProduk();
}

function tambahKeranjang(id) {
  var sudahAda = false;

  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id === id) {
      keranjang[i].jumlah = keranjang[i].jumlah + 1;
      sudahAda = true;
      break;
    }
  }

  if (sudahAda === false) {
    keranjang.push({ id: id, jumlah: 1 });
  }

  updateJumlahCart();
}

function updateJumlahCart() {
  var total = 0;
  for (var i = 0; i < keranjang.length; i++) {
    total += keranjang[i].jumlah;
  }
  document.getElementById("jumlah-cart").innerHTML = total;
}

function tampilkanKeranjang() {
  var container = document.getElementById("isi-keranjang");
  var totalHarga = 0;
  container.innerHTML = "";

  if (keranjang.length === 0) {
    container.innerHTML = "<p>Keranjang kosong</p>";
  } else {
    for (var i = 0; i < keranjang.length; i++) {
      var item = keranjang[i];
      var produkItem = null;

      for (var j = 0; j < produk.length; j++) {
        if (produk[j].id === item.id) {
          produkItem = produk[j];
          break;
        }
      }

      if (produkItem !== null) {
        var subtotal = produkItem.harga * item.jumlah;
        totalHarga = totalHarga + subtotal;

        var html = "";
        html = html + '<div class="cart-item">';
        html = html + '<img src="' + produkItem.gambar + '">';
        html = html + '<div style="flex:1">';
        html = html + "<h4>" + produkItem.nama + "</h4>";
        html = html + "<p>₩" + produkItem.harga.toLocaleString() + "</p>";

        // TOMBOL + DAN -
        html =
          html +
          '<div style="display:flex; align-items:center; gap:10px; margin-top:5px;">';
        html =
          html +
          '<button onclick="kurangJumlah(' +
          produkItem.id +
          ')" style="width:25px; height:25px; background:#ddd; border:none; cursor:pointer;">-</button>';
        html = html + "<span>" + item.jumlah + "</span>";
        html =
          html +
          '<button onclick="tambahJumlah(' +
          produkItem.id +
          ')" style="width:25px; height:25px; background:#ddd; border:none; cursor:pointer;">+</button>';
        html =
          html +
          '<button class="btn-delete" onclick="hapusKeranjang(' +
          produkItem.id +
          ')" style="margin-left:auto;">Hapus</button>';
        html = html + "</div>";

        html = html + "</div>";
        html = html + "</div>";
        container.innerHTML = container.innerHTML + html;
      }
    }
  }

  document.getElementById("total-harga").innerHTML =
    "Total: ₩" + totalHarga.toLocaleString();
}

function tambahJumlah(id) {
  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id === id) {
      keranjang[i].jumlah = keranjang[i].jumlah + 1;
      break;
    }
  }
  tampilkanKeranjang();
  updateJumlahCart;
}

function hapusKeranjang(id) {
  var keranjangBaru = [];
  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].id !== id) {
      keranjangBaru.push(keranjang[i]);
    }
  }
  keranjang = keranjangBaru;
  tampilkanKeranjang();
  updateJumlahCart();
}

function toggleFavorit(id) {
  var ditemukan = false;
  var index = -1;

  for (var i = 0; i < favorit.length; i++) {
    if (favorit[i] === id) {
      ditemukan = true;
      index = i;
      break;
    }
  }

  if (ditemukan === true) {
    favorit.splice(index, 1);
  } else {
    favorit.push(id);
  }

  filterProduk();
}

function tampilkanFavorit() {
  var container = document.getElementById("isi-fav");
  container.innerHTML = "";

  if (favorit.length === 0) {
    container.innerHTML = "<p>Belum ada produk yang ditambahkan</p>";
  } else {
    for (var i = 0; i < favorit.length; i++) {
      var produkId = favorit[i];
      var produkItem = null;

      for (var j = 0; j < produk.length; j++) {
        if (produk[j].id === produkId) {
          produkItem = produk[j];
          break;
        }
      }

      if (produkItem !== null) {
        var html = "";
        html += '<div class="cart-item">';
        html += '<img src="' + produkItem.gambar + '">';
        html += "<div>";
        html += "<h4>" + produkItem.nama + "</h4>";
        html += "<p>₩" + produkItem.harga.toLocaleString() + "</p>";
        html +=
          '<button class="btn-delete" style="background:#e53935; margin-right:5px;" onclick="tambahKeranjang(' +
          produkItem.id +
          "); toggleFavorit(" +
          produkItem.id +
          ')">Masukkan Keranjang</button>';
        html +=
          '<button class="btn-delete" onclick="toggleFavorit(' +
          produkItem.id +
          ')">Hapus</button>';
        html += "</div>";
        html += "</div>";
        container.innerHTML = container.innerHTML + html;
      }
    }
  }
}

function bukaKeranjang() {
  tampilkanKeranjang();
  document.getElementById("modal-keranjang").style.display = "block";
}

function bukaFavorit() {
  tampilkanFavorit();
  document.getElementById("modal-fav").style.display = "block";
}

function tutupModal(idModal) {
  document.getElementById(idModal).style.display = "none";
}

function bayar() {
  if (keranjang.length > 0) {
    var total = document.getElementById("total-harga").innerHTML;
    alert("Terima kasih! Pembayaran berhasil.\n" + total);
    keranjang = [];
    updateJumlahCart();
    document.getElementById("modal-keranjang").style.display = "none";
  } else {
    alert("Keranjan kosong :(");
  }
}
