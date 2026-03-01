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
    id: z.string().optional(),
    namaKabinet: z.string().min(2, "Nama kabinet tidak valid"),
    periode: z.string().min(9, "Format periode tidak valid"),
    logoUrl: z.string().url().or(z.string().startsWith('/')),
    visi: z.string().min(10, "Visi terlalu pendek"),
    misi: z.string().min(10, "Misi terlalu pendek"),
    isAktif: z.boolean().default(false).optional(),
});

export const ProgramUnggulanSchema = z.object({
    id: z.string().optional(),
    kabinetId: z.string().uuid(),
    nama: z.string().min(2, "Nama program terlalu pendek"),
    deskripsi: z.string().min(10, "Deskripsi harus detail dan informatif"),
    iconSvg: z.string().optional().or(z.literal("")),
});
