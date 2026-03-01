-- Migrasi Skema: Hapus kolom penanggungJawab dan tanggalPelaksanaan
ALTER TABLE "public"."ProgramKerja" DROP COLUMN IF EXISTS "penanggungJawab";
ALTER TABLE "public"."ProgramKerja" DROP COLUMN IF EXISTS "tanggalPelaksanaan";

-- Kosongkan seluruh data ProgramKerja lama
DELETE FROM "public"."ProgramKerja";

-- Isi tabel dengan Data Program Kerja Terbaru
INSERT INTO "public"."ProgramKerja" ("nama", "deskripsi", "status", "bidang")
VALUES
-- Lembaga Kesekretariatan
('Pembaruan Basis Data Mahasiswa Aktif', 'Sebuah data individu 4 angkatan aktif yang berisi identitas lengkap Mahasiswa Departemen Pendidikan Fisika. Data tersebut menjadi milik HMF dan dijamin keamanannya oleh HMF FPMIPA UPI. Kegiatan ini berguna untuk mempermudah apabila ada kepentingan yang memerlukan data tersebut.', 'ONGOING', 'lembaga-kesekretariatan'),
('Pembuatan Basis Data Pengurus Harian', 'Sekumpulan data yang berisi identitas umum pengurus harian HMF FPMIPA UPI. Data tersebut akan menjadi milik HMF dan dijamin keamanannya oleh HMF FPMIPA UPI. Kegiatan ini berguna untuk mempermudah apabila ada kepentingan yang membutuhkan data tersebut.', 'ONGOING', 'lembaga-kesekretariatan'),
('Pembuatan Kalender dan Timeline Program Kerja', 'Kegiatan pengumpulan tanggal pelaksanaan program kerja tiap bidang, lembaga, UKK, dan DPM. Kalender dipublikasikan setiap bulannya dengan tujuan sebagai acuan pelaksanaan program kerja setiap bulannya.', 'ONGOING', 'lembaga-kesekretariatan'),
('Pembuatan Struktur Kepengurusan', 'Kegiatan pembuatan struktur/susunan tiap bagian yang ada di HMF FPMIPA UPI. Struktur tersebut berisi identitas pengurus dengan tujuan mengetahui susunan dan hubungan tiap bagian secara posisi untuk mencapai tujuan operasional.', 'ONGOING', 'lembaga-kesekretariatan'),
('Pengelolaan Inventaris', 'Kegiatan pendataan, peminjaman, pengembalian, dan pendaftaran seluruh inventaris milik HMF FPMIPA UPI.', 'ONGOING', 'lembaga-kesekretariatan'),
('Pemeliharaan Kesekretariatan', 'Kegiatan yang dilakukan oleh perwakilan tiap bidang/lembaga untuk melaksanakan piket di sekretariat HMF setiap bulan secara bergiliran.', 'ONGOING', 'lembaga-kesekretariatan'),
('Manajemen Sirkulasi Administrasi', 'Kegiatan pengarsipan dan pendataan seluruh administrasi HMF FPMIPA UPI baik administrasi umum, bidang, lembaga maupun kegiatan.', 'ONGOING', 'lembaga-kesekretariatan'),
('Manajemen Notula Rapat', 'Kegiatan merekap, mengarsipkan, dan mengatur standarisasi format notula rapat serta mempublikasikan notula rapat kepada peserta rapat sesuai kebutuhan.', 'ONGOING', 'lembaga-kesekretariatan'),
('Pembuatan Sertifikat Pengurus Harian', 'Kegiatan untuk mengapresiasi pengurus harian yang telah berkontribusi aktif dalam kegiatan HMF FPMIPA UPI. Sertifikat berisi Nama dan posisi (jabatan) dalam kepengurusan HMF FPMIPA UPI.', 'ONGOING', 'lembaga-kesekretariatan'),

-- Lembaga Keuangan
('Perancangan Anggaran HMF', 'Pembuatan Rancangan Anggaran Pendapatan dan Belanja Organisasi (RAPBO) setiap progam kerja oleh setiap bidang/lembaga, UKK dan DPM.', 'ONGOING', 'lembaga-keuangan'),
('Laporan Kondisi Keuangan', 'Pembukuan serta pelaporan kondisi keuangan HMF FPMIPA UPI kepada ketua himpunan, DPM, pengurus harian serta warga fisika FPMIPA UPI dengan tujuan memberikan transparansi kondisi keuangan HMF FPMIPA UPI.', 'ONGOING', 'lembaga-keuangan'),
('Kontrol Anggaran Dana Proker', 'Kontrol anggaran dana secara rutin oleh bendahara kabinet kepada bendahara proker serta pengumpulan Laporan Keuangan setiap program kerja dengan tujuan memantau dana untuk setiap program kerja.', 'ONGOING', 'lembaga-keuangan'),

-- Bidang Akademik
('Phyfest (Physics Festival)', 'Physics festival yaitu program kerja yang menjadi wadah sekaligus fasilitas bagi mahasiswa departemen Pendidikan Fisika FPMIPA UPI dan khalayak umum yang dihimpun dalam satu ruang untuk mengembangkan potensi dan kecakapannya dalam keilmuan di bidang fisika melalui perlombaan, webinar, dan informasi keilmuan fisika', 'PLANNING', 'bidang-akademik'),
('PK (Perencanaan Karir)', 'Program kerja yang memfasilitasi mahasiswa fisika untuk mengetahui bidang kajian apa yang akan di ambil dan memfasilitasi mahasiswa pendidikan fisika dan mahasiswa fisika untuk dapat menambah wawasan serta informasi mengenai dunia industri dan profesi. Terdapat kegiatan Kunjungan Industri serta Kelompok Bidang Kajian', 'PLANNING', 'bidang-akademik'),
('BEARR (Bank soal, E-book, Aplikasi, Responsi, Referensi belajar)', 'Program kerja yang memfasilitasi mahasiswa untuk memperoleh ilmu dan memperluas wawasan dalam bidang perkuliahan sehingga dapat membantu mahasiswa dalam mempersiapkan diri menghadapi ujian – ujian yang akan datang lewat bank soal, e-book, responsi, kumpulan PPT dosen dan kumpulan catatan mahasiswa. Selain itu, tersedia juga aplikasi – aplikasi yang mendukung jalannya perkuliahan.', 'ONGOING', 'bidang-akademik'),
('Rangers Talk', 'Program kerja yang berfokus dalam pengembangan serta penyebaran informasi kepada mahasiswa terkait akademik, lowongan pekerjaan, MAPRES, dan ONMIPA serta pengembangan kemampuan prestasi akademik melalui klub PKM, klub English, klub komputasi, dan klub olimpiade.', 'ONGOING', 'bidang-akademik'),

-- Bidang Ekonomi dan Bisnis
('Dana Usaha', 'Dana usaha merupakan salah satu sumber pemasukan dana non-IUK yang bertujuan untuk memperoleh keuntungan yang akan digunakan dalam kegiatan himpunan. Dana usaha terbagi menjadi 3 bagian yaitu danus harian, danus bulanan, dan impuls (instagram, e-commerce, dan pulsa).', 'ONGOING', 'bidang-ekobis'),
('Kerja Sama', 'Kerja sama ini bertujuan untuk memperoleh banyak relasi dengan berbagai pihak, serta memperoleh dana tambahan (Non-IUK) himpunan. Kerja sama ini terdiri dari 2 jenis, yaitu Kerja Sama Internal dan Kerja Sama Eksternal.', 'ONGOING', 'bidang-ekobis'),
('Pelatihan Kewirausahaan (KWU)', 'Pelatihan Kewirausahaan (KWU) merupakan salah satu program kerja eventual Himpunan Mahasiswa Fisika kolaborasi antara Bidang ekobis dan juga kominfo berupa pelatihan yang dilakukan secara bertahap. Pelatihan kewirausahaan ini diselenggarakan dengan tujuan untuk memfasilitasi mahasiswa UPI dalam mengembangkan jiwa kewirausahaan di era digital sekaligus sebagai pemenuhan salah satu persyaratan sidang, yaitu memiliki sertifikat pelatihan kewirausahaan.', 'PLANNING', 'bidang-ekobis'),

-- Bidang Kaderisasi
('Restitusi (Registrasi untuk Silaturrahmi)', 'Restitusi merupakan kegiatan yang bertujuan untuk melakukan silaturahmi antara mahasiswa baru dengan panitia rangkaian kaderisasi dan antar sesama mahasiswa baru, serta untuk mengumpulkan data mahasiswa baru Pendidikan Fisika dan Fisika.', 'PLANNING', 'bidang-kaderisasi'),
('Spectrum (Study Program Orientation Call for Young Member)', 'Spectrum merupakan suatu kegiatan pengenalan Program Studi Pendidikan Fisika dan Fisika secara umum yang diselenggarakan pada MOKA-KU', 'PLANNING', 'bidang-kaderisasi'),
('MABIM (Masa Bimbingan)', 'Mabim adalah kegiatan bimbingan dan pematerian yang diikuti oleh anggota muda yang diberikan oleh mentor dan pemateri. Terdapat dua rangkaian kegiatan yaitu Mabim Terpusat dan Mabim Harian. Pada Mabim Terpusat, anggota muda mengikuti kegiatan pematerian. Lalu, Mabim Harian atau disebut juga mentoring, yang dimana anggota muda dibagi menjadi beberapa kelompok dan dibimbing oleh satu orang mentor ditiap kelompoknya.', 'PLANNING', 'bidang-kaderisasi'),
('Phylament (Physics Leadership and Training Management)', 'Phylament merupakan bagian dari rangkaian kaderisasi dengan tujuan memberikan pemahaman mengenai organisasi, kepemimpinan, dan kemampuan manajemen isu.', 'PLANNING', 'bidang-kaderisasi'),
('IMAFIS (Inaugurasi Mahasiswa Fisika)', 'Imafis merupakan kegiatan puncak yang dilaksanakan pada rangkaian kaderisasi dengan tujuan melaksanakan pengevaluasian dan pelantikan anggota muda menjadi anggota biasa.', 'PLANNING', 'bidang-kaderisasi'),
('PASOSORE (Pakumpul Sosonoan jeung Social Project Rame-rame)', 'Pasosore merupakan rangkaian kaderisasi pada tahap aplikasi. Kegiatan ini bertujuan untuk meningkatkan tali silaturahmi antara mahasiswa baru dengan warga fisika dan meningkatkan kesadaran akan masalah sosial di lingkungan sekitar.', 'PLANNING', 'bidang-kaderisasi'),

-- Bidang Kerohanian
('AQUR (Amalan Qur''an)', 'Program kerja yang kegiatannya membaca, memahami, dan mengamalkan Al-Qur’an secara bersama-sama, khususnya untuk Pengurus Harian HMF dan umumnya untuk mahasiswa pendidikan fisika dan fisika FPMIPA UPI. Terdiri dari kegiatan BucinQu (Rabu Cinta Qur’an) dan Jumat Berkah (Jumat bersama Al-Kahfi)', 'ONGOING', 'bidang-kerohanian'),
('SUQRAN (Sedekah Qurban)', 'Program kerja yang dilaksanakan untuk merayakan puncak dari ibadah haji yaitu Hari Raya Idul Adha dalam bentuk sedekah hewan qurban seperti sapi, domba maupun kambing yang nantinya akan disedekahkan kepada orang yang memiliki keinginan kuat untuk berqurban namun belum mampu melaksanakannya.', 'PLANNING', 'bidang-kerohanian'),
('MATFIS (Majlis Ta''lim Fisika)', 'Program kerja yang berupa kegiatan ta’lim atau training motivasi, khususnya untuk mahasiswa pendidikan fisika dan fisika dan pengurus harian HMF FPMIPA UPI, serta umumnya.', 'ONGOING', 'bidang-kerohanian'),
('GIGITARAN (Bagi-bagi Takjil Ramadhan)', 'Program kerja yang dilaksanakan khusus di bulan Ramadhan, dalam rangka berbagi kebaikan berupa takjil serta sebagai ajang silaturahmi warga fisika UPI.', 'PLANNING', 'bidang-kerohanian'),
('RADIASI (Lingkar Diskusi Akhwat Fisika)', 'Program kerja yang berupa kegiatan diskusi ataupun berbentuk kajian kemuslimahan, sebagai wujud dalam memfasilitasi kebutuhan rohani Mahasiswi, mahasiswa pendidikan fisika dan fisika FPMIPA UPI.', 'ONGOING', 'bidang-kerohanian'),
('SYIAR (Amalan Yaumi, Amalan Ramadhan, Konten IG)', 'Program kerja yang isinya berupa kegiatan dakwah atau ajakan untuk melaksanakan kebaikan di akun sosial media juga sebagai ladang ibadah, khususnya untuk Pengurus Harian HMF dan umumnya untuk mahasiswa pendidikan fisika dan fisika FPMIPA UPI.', 'ONGOING', 'bidang-kerohanian'),

-- Bidang Komunikasi dan Media Informasi
('Media Desain', 'Media desain bertujuan untuk mengolah segala informasi ke dalam bentuk multimedia agar informasi yang disampaikan lebih mudah diterima dan menarik bagi khalayak umum dan khususnya warga fisika FPMIPA UPI.', 'ONGOING', 'bidang-kominfo'),
('Media Publik', 'Media Publik bertugas untuk menyebarluaskan informasi yang telah diolah menjadi infografis sehingga dapat diterima oleh khalayak.', 'ONGOING', 'bidang-kominfo'),
('Pelatihan Management Media Social dan Desain', 'Merupakan suatu acara untuk meningkatkan kemampuan mahasiswa dalam mendesain atau dalam editor video.', 'PLANNING', 'bidang-kominfo'),
('Komunikasi dan Relasi', 'Komunikasi dan Relasi merupakan kegiatan mengelola komunikasi mencakup komunikasi internal dan eksternal, pengembangan relasi dan pendelegasian HMF FPMIPA UPI.', 'ONGOING', 'bidang-kominfo'),
('Content Creator', 'Merupakan tim youtube dan Tiktok HMF FPMIPA UPI yang bertugas untuk membuat konten khusus di youtube dan Tiktok HMF FPMIPA UPI.', 'ONGOING', 'bidang-kominfo'),

-- Bidang Penelitian dan Pengembangan
('Studi Banding Internal', 'Studi banding merupakan kegiatan saling bertukar ide serta pengalaman dari para pimpinan bidang periode sebelumnya untuk berbagi informasi dari periode ke periode.', 'PLANNING', 'bidang-litbang'),
('Studi Banding Eksternal', 'Kegiatan kunjungan HMF ke himpunan lain baik yang berada di UPI ataupun universitas lain untuk berbagi informasi. Bertujuan menggali insight baru untuk pengembangan himpunan serta menjalin silaturahmi.', 'PLANNING', 'bidang-litbang'),
('Pendekatan PH (PPH)', 'Pendekatan pengurus harian terdiri atas sharing antar pengurus dan fun games. Bertujuan untuk menjalin silaturahmi, meningkatkan komunikasi dan keakraban pengurus harian, serta meningkatkan kinerja dalam berorganisasi.', 'ONGOING', 'bidang-litbang'),
('Monitoring dan Evaluasi (MONEV)', 'Kegiatan pengumpulan informasi dan analisis terkait kinerja seluruh pengurus HMF secara dua arah melalui format penilaian. Bertujuan untuk melihat kinerja dan keaktifan setiap pengurus harian.', 'ONGOING', 'bidang-litbang'),
('Apresiasi Kinerja PH', 'Tindak lanjut dari hasil MONEV yang menghasilkan nilai terbaik dari staff maupun pimpinan. Pengurus terbaik di-upload di instagram HMF sebagai tanda apresiasi kinerja setiap bulannya.', 'ONGOING', 'bidang-litbang'),
('Upgrading', 'Upgrading merupakan kegiatan awal sebagai acuan administrasi dan birokrasi pengurus pada saat melakukan proker untuk satu periode ke depan.', 'PLANNING', 'bidang-litbang'),
('Angket Aspirasi', 'Kegiatan untuk mengetahui aspirasi dari pengurus himpunan yang dilaksanakan 3 kali selama kepengurusan (ketika Raker) dan melalui angket curhat online yang dapat diakses setiap saat.', 'ONGOING', 'bidang-litbang'),

-- Bidang Pengembangan Minat dan Bakat
('Pengontrolan Klub dan Inisiasi', 'Program yang berupaya mengawasi keadaan yang ada di dalam klub dan inisiasi baik dari teknis pelaksanaan, anggota, inventaris, dan keuangan dari masing masing klub dan inisiasi yang ada di HMF.', 'ONGOING', 'bidang-bakat'),
('Informasi, Delegasi, dan Apresiasi', 'Program yang berfungsi untuk menginformasikan perlombaan olahraga, seni, dan multimedia, mendelegasikan mahasiswa ke perlombaan tersebut, serta memberikan apresiasi atas prestasinya.', 'ONGOING', 'bidang-bakat'),
('Pekan Olahraga dan Seni Fisika Bumi Siliwangi (Polarisasi)', 'Polarisasi adalah suatu program dalam bentuk kompetisi seni dan olahraga untuk warga mahasiswa pendidikan fisika dan fisika UPI.', 'PLANNING', 'bidang-bakat'),
('Pagelaran Sasefi', 'Pagelaran SASEFI adalah program kerja berbentuk penampilan atau pementasan berbagai karya karya seni sebagai wujud kreativitas anggota klub SASEFI (Sanggar Seni Fisika) HMF FPMIPA UPI.', 'PLANNING', 'bidang-bakat'),

-- Bidang Sosial dan Politik
('Advokesma (Advokasi Kesejahteraan Mahasiswa)', 'Program bidang sospol untuk menjalankan fungsinya dalam membantu mahasiswa khususnya dalam masalah Akademik dan Keuangan serta pelayanan Informasi Beasiswa.', 'ONGOING', 'bidang-sospol'),
('Fisika Mengabdi', 'Fisika Mengabdi merupakan kegiatan pemberdayaan masyarakat di daerah tertentu. Agenda acara yang dilaksanakan pada kegiatan ini sangat beragam sesuai dengan kebutuhan daerah tersebut.', 'PLANNING', 'bidang-sospol'),
('HMF Darling', 'HMF Darling merupakan bentuk kontribusi kepekaan dalam ranah lingkungan. Programnya berupa Bank Sampah, Konten Dalang Sampah, HMF Darling Challenge, dan Peringatan Hari Lingkungan.', 'ONGOING', 'bidang-sospol'),
('HMF Peduli', 'HMF Peduli merupakan program kerja penghimpun dan pendayagunaan dana sosial yang berasal dari warga fisika untuk agenda-agenda sosial seperti bencana alam, bantuan, peminjaman dana, dll.', 'ONGOING', 'bidang-sospol'),
('Kajian', 'Forum diskusi antar mahasiswa yang membahas isu-isu masyarakat dengan fokus kajian sosial dan politik (Kajian Akbar dan Kajian Strategis berupa paper kajian, press release, dan propaganda).', 'ONGOING', 'bidang-sospol'),
('Pelepasan Wi-Fi (Pelepasan Wisuda Fisika)', 'Wisuda Fisika adalah apresiasi kelulusan wisudawan fisika dan silaturahmi dengan orang tua wisudawan. Terdiri dari penjempuatan pra-event dan syukuran wisuda departemen.', 'PLANNING', 'bidang-sospol');
