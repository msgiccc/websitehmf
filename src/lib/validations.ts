import { z } from "zod";

export const PengurusSchema = z.object({
    nama: z.string().min(2, "Nama terlalu pendek"),
    npm: z.string().min(5, "NPM tidak valid"),
    jabatan: z.string().min(2, "Jabatan tidak valid"),
    divisi: z.string().min(2, "Divisi tidak valid"),
    angkatan: z.string().min(4, "Angkatan tidak valid (contoh: 2021)"),
    fotoUrl: z.string().url({ message: "URL foto tidak valid" }),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    instagramUrl: z.string().url().optional().or(z.literal("")),
});

export const ArtikelSchema = z.object({
    judul: z.string().min(5, "Judul artikel terlalu pendek"),
    slug: z.string().min(3, "Slug harus mengandung minimal 3 huruf"),
    ringkasan: z.string().min(10, "Ringkasan terlalu pendek"),
    konten: z.string().min(20, "Konten artikel terlalu pendek"),
    thumbnail: z.string().url({ message: "URL thumbnail tidak valid" }),
    author: z.string().min(2, "Nama author terlalu pendek"),
    status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const BidangSchema = z.object({
    slug: z.string().min(2, "Slug terlalu pendek"),
    name: z.string().min(3, "Nama bidang terlalu pendek"),
    shortName: z.string().min(2, "Singkatan terlalu pendek"),
    desc: z.string().min(10, "Deskripsi bidang terlalu pendek"),
    icon: z.string().optional(),
    color: z.string().optional(),
});

export const ProkerSchema = z.object({
    nama: z.string().min(3, "Nama proker terlalu pendek"),
    deskripsi: z.string().min(10, "Deskripsi terlalu pendek"),
    status: z.enum(["PLANNING", "ONGOING", "COMPLETED"]),
    bidang: z.string().min(1, "Bidang harus dipilih"),
});

export const GaleriSchema = z.object({
    judul: z.string().min(3, "Judul foto terlalu pendek"),
    imageUrl: z.string().url({ message: "URL foto tidak valid" }),
    kategori: z.enum(["KEGIATAN", "PRESTASI"]),
});

export const KabinetSchema = z.object({
    namaKabinet: z.string().min(3, "Nama kabinet minimal 3 karakter"),
    periode: z.string().regex(/^\d{4}\/\d{4}$/, "Format periode harus YYYY/YYYY"),
    logoUrl: z.string().url("Path URL Logo tidak valid").or(z.string().startsWith('/')).optional().or(z.literal("")),
    visi: z.string().min(10, "Visi terlalu pendek"),
    misi: z.string().min(10, "Misi terlalu pendek"),
    lambangUrl: z.string().url("URL Lambang tidak valid").or(z.string().startsWith('/')).optional().or(z.literal("")),
    filosofiLambang: z.string().optional().or(z.literal("")),
    heroPhoto1: z.string().url().or(z.string().startsWith('/')).optional().or(z.literal("")),
    heroPhoto2: z.string().url().or(z.string().startsWith('/')).optional().or(z.literal("")),
    heroPhoto3: z.string().url().or(z.string().startsWith('/')).optional().or(z.literal("")),
    heroPhoto4: z.string().url().or(z.string().startsWith('/')).optional().or(z.literal("")),
});

export const ProfilSchema = z.object({
    sejarah_p1: z.string().min(10, "Teks terlalu pendek"),
    sejarah_p2: z.string().min(10, "Teks terlalu pendek"),
    sejarah_card1: z.string().min(10, "Teks terlalu pendek"),
    sejarah_card2: z.string().min(10, "Teks terlalu pendek"),
    lambang_desc: z.string().min(10, "Teks terlalu pendek"),
    lambang_tulisan: z.string().min(10, "Teks terlalu pendek"),
    lambang_mahkota: z.string().min(10, "Teks terlalu pendek"),
    lambang_lingkaran: z.string().min(10, "Teks terlalu pendek"),
    lambang_sayap: z.string().min(10, "Teks terlalu pendek"),
    lambang_elektron: z.string().min(10, "Teks terlalu pendek"),
    lambang_segitiga: z.string().min(10, "Teks terlalu pendek"),
    warna_biru: z.string().min(10, "Teks terlalu pendek"),
    warna_merah: z.string().min(10, "Teks terlalu pendek"),
    warna_putih: z.string().min(10, "Teks terlalu pendek"),
    mars_ciptaan: z.string().min(2, "Teks terlalu pendek"),
    mars_lirik: z.string().min(10, "Teks terlalu pendek"),
    hymne_ciptaan: z.string().min(2, "Teks terlalu pendek"),
    hymne_lirik: z.string().min(10, "Teks terlalu pendek"),
});

export const ProgramUnggulanSchema = z.object({
    id: z.string().optional(),
    kabinetId: z.string().uuid(),
    nama: z.string().min(2, "Nama program terlalu pendek"),
    deskripsi: z.string().min(10, "Deskripsi harus detail dan informatif"),
    iconSvg: z.string().optional().or(z.literal("")),
});

export const ShortLinkSchema = z.object({
    id: z.string().optional(),
    slug: z.string().min(2, "Slug/Kata Kunci terlalu pendek").regex(/^[a-zA-Z0-9_-]+$/, "Hanya boleh huruf, angka, strip (-), dan underscore (_)"),
    url_asli: z.string().url("URL asli harus valid (berawalan http:// atau https://)"),
    isPublic: z.boolean().default(true).optional(),
});
