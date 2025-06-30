import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Andy",
  lastName: "Pratama",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Fullstack Developer",
  avatar: "/images/photo.jpg",
  email: "andypratama1211@gmail.com",
  location: "Asia/Jakarta",
  languages: ["Indonesian", "English"],
};

const newsletter = {
  display: true,
  title: <>Langganan Newsletter dari {person.firstName}</>,
  description: (
    <>
      Saya sesekali menulis tentang pengembangan web, teknologi terbaru, serta membagikan wawasan tentang Laravel, CodeIgniter, dan praktik terbaik dalam membangun sistem yang efisien.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/andypratama3",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/andypratama3",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Website portofolio yang menampilkan karya dan keahlian saya sebagai ${person.role}`,
  headline: <>Andy Pratama</>,
  featured: {
    display: true,
    title: <>Proyek terkini: <strong className="ml-4">Sistem SD Muhammadiyah 3</strong></>,
    href: "/work/sistem-sekolah-kreatif",
  },
  subline: (
    <>
      Saya Andy Pratama, seorang Fullstack Developer yang berfokus pada Laravel dan CodeIgniter.{" "}
      <br />
      Saya membangun berbagai sistem digital untuk sekolah, instansi, SPA, pembayaran, dan manajemen data kompleks.
    </>
  ),
};

const about = {
  path: "/about",
  label: "Tentang",
  title: `Tentang – ${person.name}`,
  description: `Profil ${person.name}, ${person.role} dari ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Perkenalan",
    description: (
      <>
        Saya adalah seorang pengembang web asal Indonesia yang berfokus pada pengembangan sistem
        berbasis Laravel dan CodeIgniter. Saya memiliki pengalaman dalam membangun berbagai fitur seperti
        sistem sekolah, reservasi SPA, tiket event, hingga manajemen relawan dan dashboard pemerintah.
        Dengan semangat untuk menciptakan solusi digital yang efisien dan bermanfaat, saya terus mengembangkan
        kemampuan di bidang teknologi, desain antarmuka pengguna, dan sistem yang kompleks.
      </>
    ),
  },
  work: {
    display: true,
    title: "Pengalaman Kerja",
    experiences: [
      {
        company: "SD Muhammadiyah 3 Samarinda",
        timeframe: "06/2024 – 05/2025",
        role: "Fullstack Developer",
        achievements: [
          <>Membangun website sekolah dengan CMS dinamis dan konten SEO-friendly.</>,
          <>Mengintegrasikan Midtrans dan VA per siswa untuk pembayaran SPP/DPP.</>,
          <>Notifikasi otomatis via WhatsApp tiap bulan dengan format pesan admin yang dapat dikustomisasi.</>,
          <>Dashboard admin berbasis role, galeri, jadwal, dan modul berita.</>,
        ],
        images: [
          {
            src: "/images/projects/sdmuhammadiyah3.jpeg",
            alt: "Sistem SD Muhammadiyah 3 Samarinda",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/sdmuhammadiyah3.jpeg",
            alt: "Sistem SD Muhammadiyah 3 Samarinda",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/sdmuhammadiyah3.jpeg",
            alt: "Sistem SD Muhammadiyah 3 Samarinda",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/sdmuhammadiyah3.jpeg",
            alt: "Sistem SD Muhammadiyah 3 Samarinda",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Bappeda Kalimantan Timur",
        timeframe: "12/2023 – 01/2024",
        role: "Fullstack Developer",
        achievements: [
          <>Membuat situs resmi Bappeda dengan sistem berita dan artikel yang ramah SEO.</>,
          <>Dashboard interaktif berisi grafik dan laporan PDF/Excel.</>,
          <>Desain responsif dan aksesibilitas lintas perangkat.</>,
        ],
        images: [],
      },
      {
        company: "Karta Spa",
        timeframe: "06/2024 – 11/2024",
        role: "Backend Developer",
        achievements: [
          <>Membangun sistem reservasi, F&B, dan laporan keuangan untuk SPA.</>,
          <>Sistem perhitungan bahan berdasarkan stok dan resep F&B.</>,
          <>Monitoring stok dan notifikasi stok rendah untuk multi-role user.</>,
        ],
        images: [],
      },
      {
        company: "Database Relawan MHF",
        timeframe: "08/2023 – 10/2023",
        role: "Fullstack Developer",
        achievements: [
          <>Mengurangi duplikasi input 90% dengan basis data relawan terpusat.</>,
          <>Validasi NIK dan pengecekan redundansi TPS.</>,
          <>Ekspor PDF/Excel dan visualisasi data suara berdasarkan wilayah.</>,
        ],
        images: [],
      },
      {
        company: "Koetai Mahkota Soundline",
        timeframe: "07/2023 – 08/2023",
        role: "Fullstack Developer",
        achievements: [
          <>Website tiket dengan integrasi Midtrans, tingkatkan penjualan online 45%.</>,
          <>Halaman berita dan acara dinamis, sistem beli tiket otomatis.</>,
        ],
        images: [],
      },
      {
        company: "Proyek Freelance",
        timeframe: "2019 – 2022",
        role: "Web Developer",
        achievements: [
          <>Website profil perusahaan dan sistem manajemen internal UMKM & institusi.</>,
          <>Integrasi API pembayaran, autentikasi, serta laporan dinamis berbasis Laravel dan Vue.js.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Pendidikan",
    institutions: [
      {
        name: "Politeknik Negeri Pertanian Samarinda",
        description: <>Sarjana Terapan di bidang Rekayasa Perangkat Lunak.</>,
      },
      {
        name: "SMK TI Airlangga",
        description: <>Diploma di bidang Software Engineering.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Kemampuan Teknis",
    skills: [
      {
        title: "Laravel & CodeIgniter",
        description: <>REST API, sistem pembayaran Midtrans, dashboard sekolah, validasi NIK, dsb.</>,
        images: [
          {
            src: "/images/projects/laravel-app/cover-01.jpg",
            alt: "Laravel Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        title: "Frontend (Blade, Vue.js)",
        description: <>UI interaktif dengan Blade, TailwindCSS, dan Vue.js untuk kebutuhan dinamis.</>,
        images: [],
      },
      {
        title: "Database & Tools",
        description: <>MySQL, Redis, CI/CD dasar, server Linux, dan task scheduling.</>,
        images: [],
      },
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Tulisan seputar pengembangan web...",
  description: `Baca tulisan terbaru dari ${person.name} seputar Laravel, desain sistem, dan teknologi.`,
};

const work = {
  path: "/work",
  label: "Karya",
  title: `Proyek – ${person.name}`,
  description: `Daftar proyek pengembangan dan desain oleh ${person.name}`,
};

const gallery = {
  path: "/gallery",
  label: "Galeri",
  title: `Galeri Foto – ${person.name}`,
  description: `Kumpulan dokumentasi visual dan momen proyek oleh ${person.name}`,
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
