# sabfodel.github.io

Kişisel site: fizik notları, projeler ve serbest yazılar. Astro ile statik üretim,
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

### `src/content/journal/` — serbest yazılar

```yaml
---
title: Hello world, again
date: 2026-07-31
summary: Tek cümle.
tags: [meta, personal]
mood: decided             # isteğe bağlı
draft: false
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

Herhangi bir içerikte kullandığın etiket otomatik olarak `/tags/<ad>/` sayfası üretir ve
üç bölümün hepsinden o etiketi taşıyan girdileri bir arada listeler. Ayrıca bir şey
yapman gerekmez.

## Ayarlar

`src/site.ts` — site başlığı, slogan, gezinme menüsü, üstteki kayan yazı.
`src/styles/global.css` — bütün renkler en üstteki `:root` bloğunda ("field notes" teması:
kâğıt zemin, kareli ızgara, pas/çelik mavisi/pirinç vurgular). Fontlar: Source Serif 4 (başlık),
IBM Plex Sans (gövde), IBM Plex Mono (etiketler) — Google Fonts'tan `Base.astro` içinde.

### Proje sayfaları

Ana sayfadaki "Selected work" listesine girmesi için projeye `featured: true` ver. İsteğe bağlı
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

`/lab/` etkileşimli deneyler. Bloch küresi `src/components/BlochSphere.astro` içinde; ana
sayfada da kullanılıyor.

## Görseller

- `public/img/bg-taht-salonu.jpg` — sabit sayfa arka planı. `body::before` içinde,
  üstüne karartma + kan sisi gradyanı biniyor. Metin fazla soluk/fazla karanlık gelirse
  o kuraldaki `linear-gradient` alfa değerlerini (`.30 / .58 / .78`) oynat.
- `public/img/claymore.png` — üst bantta duran maskot. Kaynak dosyada şeffaflık **yoktu**
  (dama deseni gerçek piksel olarak gömülüydü); kenardan taşma-doldurma ile temizlenip
  saydamlaştırıldı ve karaktere kırpıldı. Değiştirirsen gerçekten alfa kanalı olan bir
  PNG kullan.

Arka plan `background-attachment: fixed` yerine sabit konumlu bir katman olarak duruyor —
iOS Safari o özelliği düzgün uygulamıyor.

### Fontlar

Gövde Georgia, etiketler Courier New — ikisi de sistem fontu. Dışarıdan yalnızca gotik
başlık fontu (Pirata One) geliyor.

Pikselli font denemek istersen dikkat: **Silkscreen ve DotGothic16'da `ş ğ İ` yok**.
Pixelify Sans, Press Start 2P ve VT323 latin-ext'i tam taşıyor. Site şu an İngilizce
olduğu için sorun değil, ama Türkçe içerik eklersen sıkıntı çıkarır.
