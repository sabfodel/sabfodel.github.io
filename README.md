# sabfodel.github.io

Fizik portfolyosu: projeler, lab ve notlar. Astro ile statik üretim,
Markdown içerik. Site dili İngilizce.

## Çalıştırma

```bash
npm run dev
```

`http://localhost:4321` — dosya kaydedince anında yenilenir.

```bash
npm run build     # dist/ üretir
npm run preview   # dist/ çıktısını yerelde sunar
npm run check     # tip ve içerik şeması kontrolü
```

## Yayına alma

GitHub Pages **kullanıcı sitesi** olarak kurulu. Adres kök dizinde çalışır, `base` ayarı yok.

İlk kurulum, sırasıyla:

1. GitHub'da `sabfodel/sabfodel.github.io` adında repo aç.
2. Bu klasörü oraya it:

```bash
git init && git add -A && git commit -m "initial commit" && git branch -M main && git remote add origin https://github.com/sabfodel/sabfodel.github.io.git && git push -u origin main
```

3. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions** seç.

Bundan sonra `main`'e her push otomatik yayınlanır (`.github/workflows/deploy.yml`).
Elle tetiklemek için Actions sekmesindeki **Run workflow** düğmesi var.

Repo adını farklı koyarsan (`sabfodel/blog` gibi) adres `sabfodel.github.io/blog/` olur;
o durumda `astro.config.mjs` içine `base: '/blog'` eklemen gerekir.

## Yazı eklemek

Her bölüm `src/content/` altında bir klasör. Yeni bir `.md` dosyası eklemen yeterli —
dosya adı URL olur (`toric-code.md` → `/notes/toric-code/`). Dosya adlarında Türkçe
karakter ve boşluk kullanma.

### `src/content/notes/` — fizik notları

```yaml
---
title: Bloch's theorem and periodic potentials
date: 2026-07-12
field: condensed matter   # listede bu başlık altında gruplanır
summary: Listede görünen tek cümle.
tags: [condensed-matter, lecture-notes]
draft: false              # true ise sitede görünmez
---
```

### `src/content/projects/` — projeler

```yaml
---
title: qsim-rs
date: 2026-05-10
order: 100                # büyük olan üstte
status: active            # active | paused | done | idea
lang: Rust
repo: https://github.com/sabfodel/qsim-rs
summary: Tek cümle.
tags: [rust, simulation]
---
```

## Denklem yazmak

KaTeX açık. Satır içi `$E = mc^2$`, blok için:

```markdown
$$
H = -\sum_{v} A_v - \sum_{p} B_p
$$
```

## Etiketler

Projelerde ve notlarda kullandığın her etiket otomatik olarak `/tags/<ad>/` sayfası üretir.

## Ayarlar

`src/site.ts` — site başlığı, açıklama, gezinme menüsü, GitHub / LinkedIn / CV bağlantıları.
`src/styles/global.css` — renkler en üstteki `:root` bloğunda (tek, koyu tema).
`src/styles/cine.css` — ana sayfanın sinematik parçaları, üst bant, gradyan katmanı.
Fontlar: Archivo (başlıklar), IBM Plex Sans (gövde), IBM Plex Mono (etiketler), Source Serif 4
(denklem/italik) — Google Fonts'tan `Base.astro` içinde; logo için BlexMono Nerd Font.

### Proje sayfaları

Ana sayfadaki proje şeridine girmesi için projeye `featured: true` ver. İsteğe bağlı
alanlar:

```yaml
cover: /img/work/foo.png      # public/ altında
coverAlt: Ekran okuyucu açıklaması
caption: Figür altı yazısı
coverDark: true               # görselin kendi koyu zemini varsa
result: Tek satırlık ölçülebilir sonuç
```

Yazı sırası önerisi: problem → fizik → yöntem → sonuç → sınırlamalar → sonraki adım.

### Lab

`/lab/` etkileşimli deneyler. Bloch küresi `src/components/BlochSphere.astro` içinde.
Kaos (Lorenz, Yu-Wang, Thomas) ana sayfada: `src/components/cine/ChaosLab.astro`.

## Ana sayfa

`src/pages/index.astro` bölümleri sırayla dizer; her bölüm `src/components/cine/` altında
kendi dosyasında: açılış (`Preloader`), kara delik parçacıkları (`HeroGather`), hakkımda kartı
(`AboutZoom`), yolculuk (`Journey`), proje şeridi (`CurvedCarousel`), proje halkası
(`WorksRing`), kaos (`ChaosLab`), yetenekler (`Capabilities`) ve iletişim (`LetsTalk`).
Kaydırma: Lenis + GSAP ScrollTrigger, `src/scripts/motion.ts`.

### Arka plan, logo ve font

- `src/components/GradientBg.tsx` — [ruucm/shadergradient](https://github.com/ruucm/shadergradient)
  ile tüm sayfaların arkasındaki 3B gradyan (React adası, `client:only`). Renkler ve hareket
  bu dosyadaki `ShaderGradient` özelliklerinde. Yalnızca `data-sg` işaretli bir bölüm
  ekrandayken canlanır.
- `src/scripts/liquid-logo.ts` — [collidingScopes/liquid-logo](https://github.com/collidingScopes/liquid-logo)
  gölgelendiricisinden uyarlanmış sıvı metal "sabfodel" logosu (MIT, lisans metni dosyada).
  Ön ayar `PRESET` içinde ("Galaxy").
- `public/fonts/blexmono-nerd-bold.woff2` — BlexMono Nerd Font Bold (IBM Plex Mono'nun Nerd
  Fonts sürümü), yalnızca Latin harfleri ve birkaç ikonla küçültülmüş. Lisans: SIL OFL 1.1,
  `public/fonts/BlexMono-Nerd-Font-OFL.txt`.

### Kaldırılan bölümler

Fotoğraf, okuma, pratik, günlük ve `uses` sayfaları siteden kaldırıldı (yalnızca portfolyo
kalsın diye). İçerik dosyaları `src/content/` altında ve görseller `public/img/photos/`
altında duruyor; sayfaları geri getirmek için git geçmişindeki `src/pages/photos/` vb.
klasörleri geri yüklemek yeterli.
