# 🔍 SEO Audit & Google Indexing Fix
## Portfolio: `andypratama.vercel.app`
> Dibuat berdasarkan crawling langsung + analisis struktur proyek oleh Claude Copilot  
> Siap dieksekusi oleh **Claude Code sub-agents** — Mei 2026

---

## 🏗️ Arsitektur Proyek

Berdasarkan analisis Claude Copilot terhadap source code di `/Users/andypratama3/Development/magic-portfolio-andy/`:

```
magic-portfolio-andy/
├── src/
│   ├── app/                        ← Next.js App Router
│   │   ├── layout.tsx              ← Root layout + global metadata
│   │   ├── page.tsx                ← Homepage
│   │   ├── about/page.tsx
│   │   ├── work/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx     ← Dynamic project pages
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── sitemap.ts              ← Next.js sitemap (perlu dicek)
│   │   ├── robots.ts               ← Next.js robots (perlu dicek)
│   │   └── api/                    ← Auth + OG image routes
│   ├── components/                 ← Reusable React components
│   ├── resources/                  ← 🎯 CONFIG UTAMA ADA DI SINI
│   │   ├── config.js               ← Site config (baseURL, social, SEO)
│   │   └── index.ts                ← Content exports
│   └── utils/                      ← Helper functions
├── next.config.ts
└── package.json                    ← Next.js 16.1.3 + Once UI
```

**Tech Stack:**
- Next.js `16.1.3` + React `18.3.1` (TypeScript)
- Once UI `@once-ui-system/core` — design system
- MDX — konten blog & projects
- SASS + CSS-in-JS via Once UI

---

## 📋 Ringkasan Masalah

Setelah crawling `https://andypratama.vercel.app`, ditemukan **5 masalah kritis**:

| # | Masalah | File Terkait | Tingkat |
|---|---------|-------------|---------|
| 1 | Google Site Verification token **tidak cocok** | `src/resources/config.js` | 🔴 Kritis |
| 2 | `sitemap.ts` belum include halaman dynamic (work slugs) | `src/app/sitemap.ts` | 🔴 Kritis |
| 3 | `robots.ts` mungkin missing atau salah config | `src/app/robots.ts` | 🔴 Kritis |
| 4 | Body konten kosong saat di-crawl (CSR issue) | `src/app/page.tsx` | 🟡 Sedang |
| 5 | Tidak ada JSON-LD Structured Data | `src/app/layout.tsx` | 🟡 Sedang |

---

## 🚨 Detail Masalah

### Masalah 1 — Token Verifikasi Tidak Cocok

**Ditemukan di meta tag live site:**
```
XShhQ1RuY_570n6Lv4mG5Dk38o62_KeZmWjhlSswwMg
```

**Token yang harus digunakan (dari Google Search Console kamu):**
```
4ycIf0n_hJhGXE5tc2Xv3OHLhUkIofJUSQkj0wsaUo8
```

Di magic-portfolio, token ini dikonfigurasi di `src/resources/config.js` lalu dipass ke `layout.tsx`. Token yang salah menyebabkan Google Search Console **gagal verifikasi kepemilikan** → situs tidak bisa diindex.

---

### Masalah 2 — Sitemap Tidak Lengkap

Magic-portfolio sudah memiliki `sitemap.ts` bawaan, tetapi kemungkinan:
- Tidak include halaman `/work/[slug]` secara dinamis dari MDX files
- Tidak include `/blog/[slug]` jika blog diaktifkan
- Base URL mungkin masih default template, bukan `https://andypratama.vercel.app`

---

### Masalah 3 — robots.txt Bermasalah

URL `https://andypratama.vercel.app/robots.txt` tidak bisa diakses saat crawling. File `robots.ts` mungkin belum ada atau ada bug pada konfigurasi.

---

### Masalah 4 — Konten Minim Saat Di-crawl

Hasil crawl menunjukkan body hampir kosong — hanya navigasi dan footer. Magic-portfolio menggunakan Next.js App Router yang seharusnya SSR, tapi mungkin ada komponen yang hanya render di client. Googlebot perlu waktu lebih untuk second-wave JavaScript rendering.

---

### Masalah 5 — Tidak Ada JSON-LD Structured Data

Tidak ditemukan schema markup `Person`, `WebSite`, atau `ProfilePage`. Ini mengurangi peluang muncul di rich results Google.

---

## ✅ Sub-Agent Instructions untuk Claude Code

> Copy setiap blok instruksi ke **Claude Code** dan jalankan satu per satu sesuai urutan.

---

### 🤖 Sub-Agent 1 — Fix baseURL di config.js

**Paste instruksi ini ke Claude Code:**

```
Project: magic-portfolio Next.js
Path: /Users/andypratama3/Development/magic-portfolio-andy/

Tugas: Pastikan baseURL sudah benar di konfigurasi

1. Buka src/resources/config.js (atau index.ts)
2. Cari semua referensi ke baseURL, domain, atau URL site
3. Pastikan nilainya adalah: https://andypratama.vercel.app
   (bukan: localhost, https://yourname.vercel.app, atau template default)
4. Cek juga next.config.ts — pastikan tidak ada hardcoded URL yang salah
5. Tampilkan semua perubahan yang dibuat
```

---

### 🤖 Sub-Agent 2 — Fix Google Site Verification Token

**Paste instruksi ini ke Claude Code:**

```
Project: magic-portfolio Next.js
Path: /Users/andypratama3/Development/magic-portfolio-andy/

Tugas: Ganti google-site-verification token lama dengan yang baru.

Token LAMA (yang ada sekarang di live site):
  XShhQ1RuY_570n6Lv4mG5Dk38o62_KeZmWjhlSswwMg

Token BARU:
  4ycIf0n_hJhGXE5tc2Xv3OHLhUkIofJUSQkj0wsaUo8

Langkah:
1. Cek src/resources/config.js — cari properti yang berisi token lama
2. Jika tidak ada di sana, cek src/app/layout.tsx pada bagian export const metadata
3. Ganti token lama dengan token baru di mana pun ditemukan
4. Pastikan format akhir di layout.tsx adalah:
   verification: { google: '4ycIf0n_hJhGXE5tc2Xv3OHLhUkIofJUSQkj0wsaUo8' }
5. Tampilkan diff perubahan yang dibuat
```

**Kode target di `src/app/layout.tsx`:**

```typescript
export const metadata: Metadata = {
  // ... metadata lainnya
  verification: {
    google: '4ycIf0n_hJhGXE5tc2Xv3OHLhUkIofJUSQkj0wsaUo8',
  },
}
```

**Atau jika config berasal dari `src/resources/config.js`:**

```javascript
// src/resources/config.js
export const baseURL = 'https://andypratama.vercel.app'

export const meta = {
  // ...
  verification: {
    google: '4ycIf0n_hJhGXE5tc2Xv3OHLhUkIofJUSQkj0wsaUo8'
  }
}
```

---

### 🤖 Sub-Agent 3 — Fix robots.ts

**Paste instruksi ini ke Claude Code:**

```
Project: magic-portfolio Next.js
Path: /Users/andypratama3/Development/magic-portfolio-andy/

Tugas: Cek dan perbaiki file src/app/robots.ts

1. Buka file src/app/robots.ts (atau cari jika namanya berbeda)
2. Pastikan userAgent '*' diizinkan untuk semua halaman publik
3. Pastikan sitemap URL benar: https://andypratama.vercel.app/sitemap.xml
4. Jika file tidak ada, buat baru dengan konten di bawah
5. Pastikan hanya /api/ yang di-disallow
6. Tampilkan isi file setelah selesai
```

**Konten `src/app/robots.ts` yang benar:**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://andypratama.vercel.app/sitemap.xml',
    host: 'https://andypratama.vercel.app',
  }
}
```

---

### 🤖 Sub-Agent 4 — Fix & Lengkapi sitemap.ts

**Paste instruksi ini ke Claude Code:**

```
Project: magic-portfolio Next.js
Path: /Users/andypratama3/Development/magic-portfolio-andy/

Tugas: Perbaiki atau buat file src/app/sitemap.ts yang lengkap.

Requirements:
1. Include semua static routes: /, /about, /work, /gallery, /blog (jika ada)
2. Include semua dynamic routes dari MDX files:
   - Baca semua file di direktori work projects
   - Baca semua file di direktori blog posts (jika ada)
3. baseURL harus 'https://andypratama.vercel.app'
4. Gunakan Next.js MetadataRoute.Sitemap type
5. Gunakan fungsi utils yang sudah ada di project (cek src/utils/)

Cek terlebih dahulu:
- Apakah sitemap.ts sudah ada di src/app/?
- Fungsi apa yang digunakan untuk membaca MDX posts? (cek src/utils/)
- Di mana MDX files disimpan? (work/projects/, content/, dll)

Sesuaikan kode dengan struktur yang ada. Tampilkan isi file final.
```

**Template `src/app/sitemap.ts`:**

```typescript
import { MetadataRoute } from 'next'
import { getPosts } from '@/app/utils/utils'  // sesuaikan dengan path utils yang ada

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://andypratama.vercel.app'

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dynamic work/project pages
  let workRoutes: MetadataRoute.Sitemap = []
  try {
    const works = getPosts(['src', 'app', 'work', 'projects'])
    workRoutes = works.map((work) => ({
      url: `${baseUrl}/work/${work.slug}`,
      lastModified: work.metadata?.publishedAt
        ? new Date(work.metadata.publishedAt)
        : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch (e) {
    console.error('Could not load work posts for sitemap', e)
  }

  // Dynamic blog pages
  let blogRoutes: MetadataRoute.Sitemap = []
  try {
    const posts = getPosts(['src', 'app', 'blog', 'posts'])
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.metadata?.publishedAt
        ? new Date(post.metadata.publishedAt)
        : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch (e) {
    // blog mungkin tidak diaktifkan
  }

  return [...staticRoutes, ...workRoutes, ...blogRoutes]
}
```

---

### 🤖 Sub-Agent 5 — Tambahkan JSON-LD Structured Data

**Paste instruksi ini ke Claude Code:**

```
Project: magic-portfolio Next.js
Path: /Users/andypratama3/Development/magic-portfolio-andy/

Tugas: Tambahkan JSON-LD structured data ke src/app/layout.tsx

1. Buka src/app/layout.tsx
2. Tambahkan script JSON-LD di dalam <body>, sebelum {children}
3. Gunakan schema Person + WebSite dengan data berikut:
   - Name: Andy Pratama
   - Job: Fullstack Developer
   - URL: https://andypratama.vercel.app
   - Location: Samarinda, East Kalimantan, ID
   - GitHub: https://github.com/andypratama3
   - LinkedIn: https://www.linkedin.com/in/andypratama3
   - Email: andypratama1211@gmail.com
   - Skills: Laravel, Next.js, React, PHP, JavaScript, TypeScript
4. Jangan ubah bagian lain dari layout.tsx
5. Tampilkan diff perubahan
```

**Kode yang harus ditambahkan di `src/app/layout.tsx`:**

```typescript
// Tambahkan di dalam fungsi RootLayout, di dalam <body> sebelum {children}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://andypratama.vercel.app/#person',
        name: 'Andy Pratama',
        jobTitle: 'Fullstack Developer',
        description: 'Fullstack Developer specializing in Laravel, Next.js, and production-grade web systems for education, government, and commercial sectors.',
        url: 'https://andypratama.vercel.app',
        sameAs: [
          'https://github.com/andypratama3',
          'https://www.linkedin.com/in/andypratama3',
        ],
        email: 'andypratama1211@gmail.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Samarinda',
          addressRegion: 'East Kalimantan',
          addressCountry: 'ID',
        },
        knowsAbout: [
          'Laravel', 'Next.js', 'React', 'PHP',
          'JavaScript', 'TypeScript', 'Fullstack Development',
          'Web Systems', 'Education Technology', 'Government Systems'
        ],
        image: 'https://andypratama.vercel.app/images/og/home.jpg',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://andypratama.vercel.app/#website',
        url: 'https://andypratama.vercel.app',
        name: 'Andy Pratama — Fullstack Developer',
        description: 'Portfolio of Andy Pratama — Fullstack Developer specializing in Laravel and Next.js',
        author: { '@id': 'https://andypratama.vercel.app/#person' },
        inLanguage: 'id-ID',
      },
    ],
  }

  return (
    <html lang="id">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
```

---

### 🤖 Sub-Agent 6 — Commit & Deploy

**Paste instruksi ini ke Claude Code:**

```
Project: magic-portfolio Next.js
Path: /Users/andypratama3/Development/magic-portfolio-andy/

Tugas: Commit semua perubahan SEO dan push ke GitHub untuk auto-deploy ke Vercel.

1. Jalankan: git status (tampilkan file yang berubah)
2. Jalankan: git add src/resources/config.js src/app/layout.tsx src/app/sitemap.ts src/app/robots.ts
3. Jalankan: git commit -m "fix: SEO - update google verification, sitemap, robots, add JSON-LD"
4. Jalankan: git push origin main
5. Konfirmasi push berhasil
```

---

### 🤖 Sub-Agent 7 — Verifikasi Google Search Console (Manual)

> Sub-agent ini **harus dilakukan manual** di browser.

Setelah Vercel selesai deploy (±2 menit setelah push):

**Cek di browser terlebih dahulu:**
- `https://andypratama.vercel.app/sitemap.xml` → harus tampil XML dengan daftar URL
- `https://andypratama.vercel.app/robots.txt` → harus tampil teks allow/disallow
- View Source halaman → cari `google-site-verification` → harus ada token baru

**Langkah Google Search Console:**
1. Buka [search.google.com/search-console](https://search.google.com/search-console)
2. Add Property → URL prefix → `https://andypratama.vercel.app`
3. Pilih verifikasi via **HTML meta tag** → konfirmasi token:
   ```
   google-site-verification=4ycIf0n_hJhGXE5tc2Xv3OHLhUkIofJUSQkj0wsaUo8
   ```
4. Klik **Verify** → harus sukses ✅
5. Sitemaps menu → Add sitemap → masukkan: `sitemap.xml` → Submit
6. URL Inspection → `https://andypratama.vercel.app` → **Request Indexing**
7. Ulangi request indexing untuk: `/about`, `/work`, `/gallery`

---

## 📁 Ringkasan File yang Perlu Diubah

```
magic-portfolio-andy/
└── src/
    ├── app/
    │   ├── layout.tsx        ← UBAH: ganti token + tambah JSON-LD
    │   ├── sitemap.ts        ← UBAH/BUAT: lengkapi dengan dynamic routes
    │   └── robots.ts         ← UBAH/BUAT: pastikan config benar
    └── resources/
        └── config.js         ← UBAH: pastikan baseURL & token benar
```

---

## 🔄 Urutan Eksekusi Sub-Agents

```
Sub-Agent 1 → Fix baseURL di config.js
      ↓
Sub-Agent 2 → Fix verification token
      ↓
Sub-Agent 3 → Fix robots.ts
      ↓
Sub-Agent 4 → Lengkapi sitemap.ts
      ↓
Sub-Agent 5 → Tambah JSON-LD
      ↓
Sub-Agent 6 → git commit & push
      ↓
Sub-Agent 7 → Google Search Console (manual)
```

---

## ⏱️ Estimasi Waktu Indexing

| Tahap | Estimasi |
|-------|----------|
| Vercel deploy setelah push | ~1–2 menit |
| Verifikasi kepemilikan di GSC | Instan |
| Sitemap diproses Googlebot | 1–3 hari |
| Halaman crawled & indexed | 3–7 hari |
| Muncul di hasil pencarian | 7–14 hari |

---

## 🔗 Referensi

- [Google Search Console](https://search.google.com/search-console)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Next.js sitemap.ts docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js robots.ts docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots)
- [Schema.org Person](https://schema.org/Person)
- [Once UI Magic Portfolio](https://once-ui.com/products/magic-portfolio)

---

*Audit berdasarkan: crawling langsung `https://andypratama.vercel.app` + analisis source code oleh Claude Copilot — Mei 2026*
