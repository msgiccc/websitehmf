-- =============================================
-- MIGRATION SCRIPT: Tabel Bidang & Lembaga
-- =============================================

CREATE TABLE IF NOT EXISTS "public"."BidangLembaga" (
    "slug"       text NOT NULL,
    "name"       text NOT NULL,
    "shortName"  text NOT NULL,
    "desc"       text NOT NULL,
    "icon"       text NOT NULL,
    "color"      text NOT NULL,
    PRIMARY KEY ("slug")
);

-- Seed Data Awal dari data-program-kerja.ts
INSERT INTO "public"."BidangLembaga" ("slug", "name", "shortName", "desc", "icon", "color")
VALUES
    ('lembaga-kesekretariatan', 'Lembaga Kesekretariatan', 'Kesekretariatan', 'Jantung administrasi himpunan, memastikan alur komunikasi dan pendataan terekam dengan rapi dan aman.', 'Briefcase', 'from-blue-500 to-cyan-400'),
    ('lembaga-keuangan', 'Lembaga Keuangan', 'Keuangan', 'Mengelola arus kas, merancang anggaran, dan memastikan stabilitas finansial demi berjalannya seluruh program.', 'Wallet', 'from-emerald-500 to-teal-400'),
    ('bidang-akademik', 'Bidang Akademik', 'Akademik', 'Wadah pengembangan potensi keilmuan, menunjang prestasi, dan memfasilitasi kebutuhan akademis mahasiswa.', 'GraduationCap', 'from-indigo-500 to-blue-500'),
    ('bidang-ekonomi-dan-bisnis', 'Bidang Ekonomi dan Bisnis', 'Ekobis', 'Membangun kemandirian finansial himpunan melalui kewirausahaan inovatif dan kemitraan strategis.', 'TrendingUp', 'from-amber-500 to-orange-400'),
    ('bidang-kaderisasi', 'Bidang Kaderisasi', 'Kaderisasi', 'Mencetak generasi penerus yang berkarakter, memiliki jiwa kepemimpinan, dan memahami nilai-nilai himpunan.', 'Users', 'from-red-500 to-rose-400'),
    ('bidang-kerohanian', 'Bidang Kerohanian', 'Kerohanian', 'Membangun keseimbangan spiritual dan mewadahi kegiatan keagamaan guna membentuk insan yang berakhlak mulia.', 'Heart', 'from-sky-400 to-indigo-400'),
    ('bidang-komunikasi-dan-media-informasi', 'Bidang Komunikasi dan Media Informasi', 'Kominfo', 'Pusat informasi dan wajah himpunan di dunia digital, mengelola media sosial dengan desain yang kreatif.', 'Megaphone', 'from-fuchsia-500 to-pink-500'),
    ('bidang-penelitian-dan-pengembangan', 'Bidang Penelitian dan Pengembangan', 'Litbang', 'Mengevaluasi kinerja, memonitor progres, dan mencari inovasi baru untuk kemajuan organisasi yang berkelanjutan.', 'Search', 'from-purple-500 to-violet-500'),
    ('bidang-pengembangan-minat-dan-bakat', 'Bidang Pengembangan Minat dan Bakat', 'Mikat', 'Eksplorasi bakat non-akademik! Mendukung minat mahasiswa di bidang olahraga, seni, dan kreativitas lainnya.', 'Music', 'from-yellow-400 to-amber-500'),
    ('bidang-sosial-dan-politik', 'Bidang Sosial dan Politik', 'Sospol', 'Menumbuhkan kepekaan sosial, advokasi kesejahteraan, dan menanamkan kepedulian mahasiswa terhadap isu masyarakat.', 'Globe', 'from-green-500 to-emerald-500')
ON CONFLICT ("slug") DO UPDATE 
SET "name" = EXCLUDED."name",
    "shortName" = EXCLUDED."shortName",
    "desc" = EXCLUDED."desc",
    "icon" = EXCLUDED."icon",
    "color" = EXCLUDED."color";
