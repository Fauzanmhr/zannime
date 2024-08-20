# ZANNIME 

ZANNIME adalah antarmuka web sederhana untuk [wajik-anime-api](https://github.com/wajik45/wajik-anime-api/), yang bertujuan untuk memudahkan user dalam streaming dan mengunduh anime dengan subtitle Bahasa Indonesia.

## Daftar Isi

- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- [Docker](https://docs.docker.com/get-docker/)

## Instalasi

1. **Klon repositori:**
   ```sh
   git clone https://github.com/yourusername/zannime.git
   cd zannime
   ```

2. **Inisialisasi dan perbarui submodule:**
   ```sh
   git submodule update --init --recursive
   ```

3. **Build Image Docker:**
   ```sh
   docker compose build
   ```

## Penggunaan

1. **Jalankan layanan:**
   ```sh
   docker compose up -d
   ```

2. **Akses aplikasi:**
   - ZANNIME: [http://localhost:3000](http://localhost:3000)

3. **Hentikan layanan:**
   ```sh
   docker compose down
   ```

## Kontribusi

Saya sangat menghargai kontribusi dari komunitas!

## Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.