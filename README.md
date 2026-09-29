# 🎨 Contrast Ratio Checker

Aplikasi pengukur kontras warna (*Contrast Ratio Checker*) berbasis web sederhana. Alat ini membantu menguji apakah kombinasi warna latar dan teks memiliki nilai keterbacaan yang cukup jelas sesuai dengan standar aksesibilitas web **WCAG (Web Content Accessibility Guidelines)**.

---

## 🎯 Konsep Pembelajaran RPL / Pemrograman Web

1. **Rumus Perhitungan Luminance & Kontras:**
   Memahami cara menghitung tingkat kecerahan relatif (*relative luminance*) dari warna RGB dan rumus rasio kontras `(L1 + 0.05) / (L2 + 0.05)`.
2. **Standar Aksesibilitas Web (WCAG):**
   - **AA Level:** Minimal rasio `4.5 : 1` untuk teks biasa.
   - **AAA Level:** Minimal rasio `7.0 : 1` untuk tingkat kejelasan ekstra.
3. **Sinkronisasi Input Ganda (Color Picker & Hex Text):**
   Satu alur update data yang menghubungkan input warna `type="color"` dengan field teks `type="text"`.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Elemen input warna dan area tampilan preview teks
├── style.css        # Tampilan Neobrutalism dan indikator status
└── script.js        # Logika rumus perhitungan matematika rasio kontras
