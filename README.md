# saitguzel.github.io

Sait Güzel'in kişisel portfolyo sitesi: **https://saitguzel.github.io**

Derleme adımı olmayan, statik ve hızlı bir tek sayfa uygulama: HTML + CSS + az miktarda JavaScript.

## Özellikler

- Türkçe (`/`) ve İngilizce (`/en/`) sürümler, `hreflang` bağlantıları ve dil düğmesi
- Açık / koyu tema (sistem tercihini izler, seçim tarayıcıda hatırlanır)
- Mobil uyumlu düzen, mobil menü, aktif bölüm vurgusu
- Deneyim zaman çizelgesi, kişisel projeler, yetenekler, eğitim ve sertifikalar
- İndirilebilir CV: Türkçe (`cv/sait-guzel-cv-2026-tr.pdf`) ve İngilizce (`cv/sait-guzel-cv-2026-en.pdf`)
- [Buy Me a Coffee](https://buymeacoffee.com/saitguzel) destek bağlantısı
- SEO: meta açıklamaları, Open Graph, `schema.org/Person` JSON-LD, `sitemap.xml`, `robots.txt`
- Erişilebilirlik: anlamsal başlıklar, klavye odağı, "içeriğe geç" bağlantısı, `prefers-reduced-motion` desteği

## Yapı

```
index.html            # Türkçe sayfa (CV verisinden üretilir)
en/index.html         # İngilizce sayfa
assets/css/style.css  # Tasarım sistemi ve bileşenler
assets/js/main.js     # Tema, menü, kaydırma etkileşimleri
assets/img/           # Profil fotoğrafı
cv/                   # PDF CV
favicon.svg, robots.txt, sitemap.xml
```

## İçeriği güncellemek

`index.html` elle düzenlenmez; CV ile aynı veri kaynaklarından (`cv_data.py`, `cv_data_en.py`) `build_site.py` betiğiyle üretilir.
Böylece CV (PDF/DOCX) ve site her zaman aynı bilgiyi gösterir.

```bash
python3 build_site.py      # index.html, fotoğraf, CV PDF ve sitemap.xml yenilenir
```

Yerelde önizleme:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

GitHub Pages `main` dalının kökünden yayın yapar; push sonrası birkaç dakika içinde canlıya çıkar.
