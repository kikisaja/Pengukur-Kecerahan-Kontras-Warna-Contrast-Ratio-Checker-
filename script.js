// --- 1. AMBIL ELEMEN DOM ---
const textColorInput = document.getElementById("text-color");
const textHexInput = document.getElementById("text-hex");
const bgColorInput = document.getElementById("bg-color");
const bgHexInput = document.getElementById("bg-hex");

const previewBox = document.getElementById("preview-box");
const contrastRatioEl = document.getElementById("contrast-ratio");
const statusAA = document.getElementById("status-aa");
const statusAAA = document.getElementById("status-aaa");

// --- 2. FUNGSI PERHITUNGAN LUMINANCE & RASIO KONTRAS ---
// Mengubah kode Hex (#RRGGBB) ke bentuk nilai RGB
function hexToRgb(hex) {
    let cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
        cleanHex = cleanHex.split("").map(c => c + c).join("");
    }
    const num = parseInt(cleanHex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

// Menghitung Relative Luminance sesuai standar WCAG
function getLuminance(r, g, b) {
    const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Menghitung Rasio Kontras
function calculateContrastRatio(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);

    return (brightest + 0.05) / (darkest + 0.05);
}

// --- 3. FUNGSI UPDATE TAMPILAN ---
function updateContrastChecker() {
    const textColor = textColorInput.value;
    const bgColor = bgColorInput.value;

    // Update warna di box preview
    previewBox.style.color = textColor;
    previewBox.style.backgroundColor = bgColor;

    // Hitung Rasio
    const ratio = calculateContrastRatio(textColor, bgColor);
    contrastRatioEl.textContent = `${ratio.toFixed(1)} : 1`;

    // Evaluasi Standar WCAG
    // WCAG AA (Teks Normal): minimal 4.5:1
    if (ratio >= 4.5) {
        statusAA.textContent = "LULUS";
        statusAA.className = "status-badge bg-pass";
    } else {
        statusAA.textContent = "GAGAL";
        statusAA.className = "status-badge bg-fail";
    }

    // WCAG AAA (Teks Besar/Sangat Jelas): minimal 7:1
    if (ratio >= 7.0) {
        statusAAA.textContent = "LULUS";
        statusAAA.className = "status-badge bg-pass";
    } else {
        statusAAA.textContent = "GAGAL";
        statusAAA.className = "status-badge bg-fail";
    }
}

// --- 4. EVENT LISTENERS ---
textColorInput.addEventListener("input", (e) => {
    textHexInput.value = e.target.value.toUpperCase();
    updateContrastChecker();
});

bgColorInput.addEventListener("input", (e) => {
    bgHexInput.value = e.target.value.toUpperCase();
    updateContrastChecker();
});

// Sinkronisasi input teks Hex
textHexInput.addEventListener("change", (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        textColorInput.value = e.target.value;
        updateContrastChecker();
    }
});

bgHexInput.addEventListener("change", (e) => {
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        bgColorInput.value = e.target.value;
        updateContrastChecker();
    }
});

// Inisialisasi awal saat halaman dimuat
updateContrastChecker();
