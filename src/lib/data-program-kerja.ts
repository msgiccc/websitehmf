export const KATEGORI_PROGRAM = [
    {
        id: "lembaga-kesekretariatan",
        name: "Lembaga Kesekretariatan",
        shortName: "Kesekretariatan",
        desc: "Jantung administrasi himpunan, memastikan alur komunikasi dan pendataan terekam dengan rapi dan aman.",
        icon: "Briefcase",
        color: "from-blue-500 to-cyan-400"
    },
    {
        id: "lembaga-keuangan",
        name: "Lembaga Keuangan",
        shortName: "Keuangan",
        desc: "Mengelola arus kas, merancang anggaran, dan memastikan stabilitas finansial demi berjalannya seluruh program.",
        icon: "Wallet",
        color: "from-emerald-500 to-teal-400"
    },
    {
        id: "bidang-akademik",
        name: "Bidang Akademik",
        shortName: "Akademik",
        desc: "Wadah pengembangan potensi keilmuan, menunjang prestasi, dan memfasilitasi kebutuhan akademis mahasiswa.",
        icon: "GraduationCap",
        color: "from-indigo-500 to-blue-500"
    },
    {
        id: "bidang-ekonomi-dan-bisnis",
        name: "Bidang Ekonomi dan Bisnis",
        shortName: "Ekobis",
        desc: "Membangun kemandirian finansial himpunan melalui kewirausahaan inovatif dan kemitraan strategis.",
        icon: "TrendingUp",
        color: "from-amber-500 to-orange-400"
    },
    {
        id: "bidang-kaderisasi",
        name: "Bidang Kaderisasi",
        shortName: "Kaderisasi",
        desc: "Mencetak generasi penerus yang berkarakter, memiliki jiwa kepemimpinan, dan memahami nilai-nilai himpunan.",
        icon: "Users",
        color: "from-red-500 to-rose-400"
    },
    {
        id: "bidang-kerohanian",
        name: "Bidang Kerohanian",
        shortName: "Kerohanian",
        desc: "Membangun keseimbangan spiritual dan mewadahi kegiatan keagamaan guna membentuk insan yang berakhlak mulia.",
        icon: "Heart",
        color: "from-sky-400 to-indigo-400"
    },
    {
        id: "bidang-komunikasi-dan-media-informasi",
        name: "Bidang Komunikasi dan Media Informasi",
        shortName: "Kominfo",
        desc: "Pusat informasi dan wajah himpunan di dunia digital, mengelola media sosial dengan desain yang kreatif.",
        icon: "Megaphone",
        color: "from-fuchsia-500 to-pink-500"
    },
    {
        id: "bidang-penelitian-dan-pengembangan",
        name: "Bidang Penelitian dan Pengembangan",
        shortName: "Litbang",
        desc: "Mengevaluasi kinerja, memonitor progres, dan mencari inovasi baru untuk kemajuan organisasi yang berkelanjutan.",
        icon: "Search",
        color: "from-purple-500 to-violet-500"
    },
    {
        id: "bidang-pengembangan-minat-dan-bakat",
        name: "Bidang Pengembangan Minat dan Bakat",
        shortName: "Mikat",
        desc: "Eksplorasi bakat non-akademik! Mendukung minat mahasiswa di bidang olahraga, seni, dan kreativitas lainnya.",
        icon: "Music",
        color: "from-yellow-400 to-amber-500"
    },
    {
        id: "bidang-sosial-dan-politik",
        name: "Bidang Sosial dan Politik",
        shortName: "Sospol",
        desc: "Menumbuhkan kepekaan sosial, advokasi kesejahteraan, dan menanamkan kepedulian mahasiswa terhadap isu masyarakat.",
        icon: "Globe",
        color: "from-green-500 to-emerald-500"
    }
];

export const PROGRAM_DATA: Record<string, { title: string; desc: string; }[]> = {
    "lembaga-kesekretariatan": [
        { title: "Pembaruan Basis Data Mahasiswa Aktif", desc: "Sebuah data individu 4 angkatan aktif yang berisi identitas lengkap Mahasiswa Departemen Pendidikan Fisika. Data tersebut menjadi milik HMF dan dijamin keamanannya oleh HMF FPMIPA UPI. Kegiatan ini berguna untuk mempermudah apabila ada kepentingan yang memerlukan data tersebut." },
        { title: "Pembuatan Basis Data Pengurus Harian", desc: "Sekumpulan data yang berisi identitas umum pengurus harian HMF FPMIPA UPI. Data tersebut akan menjadi milik HMF dan dijamin keamanannya oleh HMF FPMIPA UPI. Kegiatan ini berguna untuk mempermudah apabila ada kepentingan yang membutuhkan data tersebut." },
        { title: "Pembuatan Kalender dan Timeline Program Kerja", desc: "Kegiatan pengumpulan tanggal pelaksanaan program kerja tiap bidang, lembaga, UKK, dan DPM. Kalender dipublikasikan setiap bulannya dengan tujuan sebagai acuan pelaksanaan program kerja setiap bulannya." },
        { title: "Pembuatan Struktur Kepengurusan", desc: "Kegiatan pembuatan struktur/susunan tiap bagian yang ada di HMF FPMIPA UPI. Struktur tersebut berisi identitas pengurus dengan tujuan mengetahui susunan dan hubungan tiap bagian secara posisi untuk mencapai tujuan operasional." },
        { title: "Pengelolaan Inventaris", desc: "Kegiatan pendataan, peminjaman, pengembalian, dan pendaftaran seluruh inventaris milik HMF FPMIPA UPI." },
        { title: "Pemeliharaan Kesekretariatan", desc: "Kegiatan yang dilakukan oleh perwakilan tiap bidang/lembaga untuk melaksanakan piket di sekretariat HMF setiap bulan secara bergiliran." },
        { title: "Manajemen Sirkulasi Administrasi", desc: "Kegiatan pengarsipan dan pendataan seluruh administrasi HMF FPMIPA UPI baik administrasi umum, bidang, lembaga maupun kegiatan." },
        { title: "Manajemen Notula Rapat", desc: "Kegiatan merekap, mengarsipkan, dan mengatur standarisasi format notula rapat serta mempublikasikan notula rapat kepada peserta rapat sesuai kebutuhan." },
        { title: "Pembuatan Sertifikat Pengurus Harian", desc: "Kegiatan untuk mengapresiasi pengurus harian yang telah berkontribusi aktif dalam kegiatan HMF FPMIPA UPI. Sertifikat berisi Nama dan posisi (jabatan) dalam kepengurusan HMF FPMIPA UPI." }
    ],
    "lembaga-keuangan": [
        { title: "Perancangan Anggaran HMF", desc: "Pembuatan Rancangan Anggaran Pendapatan dan Belanja Organisasi (RAPBO) setiap progam kerja oleh setiap bidang/lembaga, UKK dan DPM." },
        { title: "Laporan Kondisi Keuangan", desc: "Pembukuan serta pelaporan kondisi keuangan HMF FPMIPA UPI kepada ketua himpunan, DPM, pengurus harian serta warga fisika FPMIPA UPI dengan tujuan memberikan transparansi kondisi keuangan HMF FPMIPA UPI." },
        { title: "Kontrol Anggaran Dana Proker", desc: "Kontrol anggaran dana secara rutin oleh bendahara kabinet kepada bendahara proker serta pengumpulan Laporan Keuangan setiap program kerja dengan tujuan memantau dana untuk setiap program kerja." }
    ],
    "bidang-akademik": [
        { title: "Phyfest (Physics Festival)", desc: "Physics festival yaitu program kerja yang menjadi wadah sekaligus fasilitas bagi mahasiswa departemen Pendidikan Fisika FPMIPA UPI dan khalayak umum yang dihimpun dalam satu ruang untuk mengembangkan potensi dan kecakapannya dalam keilmuan di bidang fisika melalui perlombaan, webinar, dan informasi keilmuan fisika." },
        { title: "PK (Perencanaan Karir)", desc: "Program kerja yang memfasilitasi mahasiswa fisika untuk mengetahui bidang kajian apa yang akan di ambil dan memfasilitasi mahasiswa pendidikan fisika dan mahasiswa fisika untuk dapat menambah wawasan serta informasi mengenai dunia industri dan profesi. Terdapat kegiatan Kunjungan Industri serta Kelompok Bidang Kajian." },
        { title: "BEARR (Bank soal, E-book, Aplikasi, Responsi, Referensi belajar)", desc: "Program kerja yang memfasilitasi mahasiswa untuk memperoleh ilmu dan memperluas wawasan dalam bidang perkuliahan sehingga dapat membantu mahasiswa dalam mempersiapkan diri menghadapi ujian – ujian yang akan datang lewat bank soal, e-book, responsi, kumpulan PPT dosen dan kumpulan catatan mahasiswa. Selain itu, tersedia juga aplikasi – aplikasi yang mendukung jalannya perkuliahan." },
        { title: "Rangers Talk", desc: "Program kerja yang berfokus dalam pengembangan serta penyebaran informasi kepada mahasiswa terkait akademik, lowongan pekerjaan, MAPRES, dan ONMIPA serta pengembangan kemampuan prestasi akademik melalui klub PKM, klub English, klub komputasi, dan klub olimpiade." }
    ],
    "bidang-ekonomi-dan-bisnis": [
        { title: "Dana Usaha", desc: "Dana usaha merupakan salah satu sumber pemasukan dana non-IUK yang bertujuan untuk memperoleh keuntungan yang akan digunakan dalam kegiatan himpunan. Dana usaha terbagi menjadi 3 bagian yaitu danus harian, danus bulanan, dan impuls (instagram, e-commerce, dan pulsa)." },
        { title: "Kerja Sama", desc: "Kerja sama ini bertujuan untuk memperoleh banyak relasi dengan berbagai pihak, serta memperoleh dana tambahan (Non-IUK) himpunan. Kerja sama ini terdiri dari 2 jenis, yaitu Kerja Sama Internal dan Kerja Sama Eksternal." },
        { title: "Pelatihan Kewirausahaan (KWU)", desc: "Pelatihan Kewirausahaan (KWU) merupakan salah satu program kerja eventual Himpunan Mahasiswa Fisika kolaborasi antara Bidang ekobis dan juga kominfo berupa pelatihan yang dilakukan secara bertahap. Pelatihan kewirausahaan ini diselenggarakan dengan tujuan untuk memfasilitasi mahasiswa UPI dalam mengembangkan jiwa kewirausahaan di era digital sekaligus sebagai pemenuhan salah satu persyaratan sidang, yaitu memiliki sertifikat pelatihan kewirausahaan." }
    ],
    "bidang-kaderisasi": [
        { title: "Restitusi (Registrasi untuk Silaturrahmi)", desc: "Restitusi merupakan kegiatan yang bertujuan untuk melakukan silaturahmi antara mahasiswa baru dengan panitia rangkaian kaderisasi dan antar sesama mahasiswa baru, serta untuk mengumpulkan data mahasiswa baru Pendidikan Fisika dan Fisika." },
        { title: "Spectrum (Study Program Orientation Call for Young Member)", desc: "Spectrum merupakan suatu kegiatan pengenalan Program Studi Pendidikan Fisika dan Fisika secara umum yang diselenggarakan pada MOKA-KU." },
        { title: "MABIM (Masa Bimbingan)", desc: "Mabim adalah kegiatan bimbingan dan pematerian yang diikuti oleh anggota muda yang diberikan oleh mentor dan pemateri. Terdapat dua rangkaian kegiatan yaitu Mabim Terpusat dan Mabim Harian. Pada Mabim Terpusat, anggota muda mengikuti kegiatan pematerian. Lalu, Mabim Harian atau disebut juga mentoring, yang dimana anggota muda dibagi menjadi beberapa kelompok dan dibimbing oleh satu orang mentor ditiap kelompoknya." },
        { title: "Phylament (Physics Leadership and Training Management)", desc: "Phylament merupakan bagian dari rangkaian kaderisasi dengan tujuan memberikan pemahaman mengenai organisasi, kepemimpinan, dan kemampuan manajemen isu." },
        { title: "IMAFIS (Inaugurasi Mahasiswa Fisika)", desc: "Imafis merupakan kegiatan puncak yang dilaksanakan pada rangkaian kaderisasi dengan tujuan melaksanakan pengevaluasian dan pelantikan anggota muda menjadi anggota biasa." },
        { title: "PASOSORE (Pakumpul Sosonoan jeung Social Project Rame-rame)", desc: "Pasosore merupakan rangkaian kaderisasi pada tahap aplikasi. Kegiatan ini bertujuan untuk meningkatkan tali silaturahmi antara mahasiswa baru dengan warga fisika dan meningkatkan kesadaran akan masalah sosial di lingkungan sekitar." }
    ],
    "bidang-kerohanian": [
        { title: "AQUR (Amalan Qur'an)", desc: "Program kerja yang kegiatannya membaca, memahami, dan mengamalkan Al-Qur’an secara bersama-sama, khususnya untuk Pengurus Harian HMF dan umumnya untuk mahasiswa pendidikan fisika dan fisika FPMIPA UPI. Terdapat BucinQu (Rabu Cinta Qur’an) dan Jumat Berkah (Jumat bersama Al-Kahfi)." },
        { title: "SUQRAN (Sedekah Qurban)", desc: "Program kerja yang dilaksanakan untuk merayakan puncak dari ibadah haji yaitu Hari Raya Idul Adha dalam bentuk sedekah hewan qurban seperti sapi, domba maupun kambing yang nantinya akan disedekahkan kepada orang yang memiliki keinginan kuat untuk berqurban namun belum mampu melaksanakannya." },
        { title: "MATFIS (Majlis Ta'lim Fisika)", desc: "Program kerja yang berupa kegiatan ta’lim atau training motivasi, khususnya untuk mahasiswa pendidikan fisika dan fisika dan pengurus harian HMF FPMIPA UPI, serta umumnya." },
        { title: "GIGITARAN (Bagi-bagi Takjil Ramadhan)", desc: "Program kerja yang dilaksanakan khusus di bulan Ramadhan, dalam rangka berbagi kebaikan berupa takjil serta sebagai ajang silaturahmi warga fisika UPI." },
        { title: "RADIASI (Lingkar Diskusi Akhwat Fisika)", desc: "Program kerja yang berupa kegiatan diskusi ataupun berbentuk kajian kemuslimahan, sebagai wujud dalam memfasilitasi kebutuhan rohani Mahasiswi, mahasiswa pendidikan fisika dan fisika FPMIPA UPI." },
        { title: "SYIAR (Amalan Yaumi, Amalan Ramadhan, Konten IG)", desc: "Program kerja yang isinya berupa kegiatan dakwah atau ajakan untuk melaksanakan kebaikan di akun sosial media juga sebagai ladang ibadah, khususnya untuk Pengurus Harian HMF dan umumnya untuk mahasiswa pendidikan fisika dan fisika FPMIPA UPI." }
    ],
    "bidang-komunikasi-dan-media-informasi": [
        { title: "Media Desain", desc: "Media desain bertujuan untuk mengolah segala informasi ke dalam bentuk multimedia agar informasi yang disampaikan lebih mudah diterima dan menarik bagi khalayak umum dan khususnya warga fisika FPMIPA UPI." },
        { title: "Media Publik", desc: "Media Publik bertugas untuk menyebarluaskan informasi yang telah diolah menjadi infografis sehingga dapat diterima oleh khalayak." },
        { title: "Pelatihan Management Media Social dan Desain", desc: "Merupakan suatu acara untuk meningkatkan kemampuan mahasiswa dalam mendesain atau dalam editor video." },
        { title: "Komunikasi dan Relasi", desc: "Komunikasi dan Relasi merupakan kegiatan mengelola komunikasi mencakup komunikasi internal dan eksternal, pengembangan relasi dan pendelegasian HMF FPMIPA UPI." },
        { title: "Content Creator", desc: "Merupakan tim youtube dan Tiktok HMF FPMIPA UPI yang bertugas untuk membuat konten khusus di youtube dan Tiktok HMF FPMIPA UPI." }
    ],
    "bidang-penelitian-dan-pengembangan": [
        { title: "Studi Banding", desc: "a. Studi Banding Internal: Kegiatan saling bertukar ide serta pengalaman dari para pimpinan bidang periode sebelumnya. b. Studi Banding Eksternal: Kunjungan antar himpunan dari dalam maupun luar UPI untuk menggali insight baru serta menjalin silaturahmi." },
        { title: "Pendekatan PH (PPH)", desc: "Pendekatan pengurus harian adalah kegiatan yang biasanya diisi dengan sharing antar pengurus harian dan fun games. PPH bertujuan untuk menjalin silaturahmi antar pengurus harian, meningkatkan komunikasi dan keakraban, serta meningkatkan kinerja pengurus harian dalam berorganisasi." },
        { title: "Monitoring dan Evaluasi (MONEV)", desc: "Kegiatan pengumpulan informasi dan analisis kinerja seluruh pengurus HMF secara dua arah melalui format penilaian. Terdiri dari MONEV pimpinan-staff (bulanan), staff-pimpinan (per 3 bulan), antar staff (2 kali seperiode), dan antar pimpinan (2 kali seperiode)." },
        { title: "Apresiasi Kinerja PH", desc: "Tindak lanjut dari hasil MONEV Pimpinan-Staff setiap bulannya. Daftar nama staff dan pimpinan bidang/lembaga terbaik di-upload di Instagram HMF sebagai tanda apresiasi kinerja pengerus selama satu bulan." },
        { title: "Upgrading", desc: "Upgrading merupakan kegiatan awal sebagai acuan administrasi dan birokrasi pengurus pada saat melakukan proker untuk satu periode ke depan." },
        { title: "Angket Aspirasi", desc: "Kegiatan yang bertujuan untuk mengetahui aspirasi dari pengurus himpunan. Dilaksanakan sebanyak tiga kali selama kepengurusan (ketika Raker) dan disediakan angket curhat online yang dapat diakses setiap saat." }
    ],
    "bidang-pengembangan-minat-dan-bakat": [
        { title: "Pengontrolan Klub dan Inisiasi", desc: "Program yang berupaya mengawasi keadaan yang ada di dalam klub dan inisiasi baik dari teknis pelaksanaan, anggota, inventaris, dan keuangan dari masing masing klub dan inisiasi yang ada di HMF FPMIPA UPI." },
        { title: "Informasi, Delegasi, dan Apresiasi", desc: "Program yang berfungsi untuk menginformasikan perlombaan di bidang olahraga, seni serta multimedia dan komputer, mendelegasikan mahasiswa Pendidikan Fisika UPI ke ajang perlombaan tersebut, dan mengapresiasi mahasiswa yang berprestasi." },
        { title: "Pekan Olahraga dan Seni Fisika Bumi Siliwangi (Polarisasi)", desc: "Polarisasi adalah suatu program dalam bentuk kompetisi seni dan olahraga untuk warga mahasiswa pendidikan fisika dan fisika UPI." },
        { title: "Pagelaran Sasefi", desc: "Pagelaran SASEFI adalah program kerja berbentuk penampilan atau pementasan berbagai karya karya seni sebagai wujud kreativitas anggota klub SASEFI (Sanggar Seni Fisika) HMF FPMIPA UPI." }
    ],
    "bidang-sosial-dan-politik": [
        { title: "Advokesma (Advokasi Kesma)", desc: "Program bidang sospol untuk menjalankan fungsinya dalam membantu mahasiswa khususnya dalam masalah Akademik dan Keuangan serta pelayanan Informasi Beasiswa." },
        { title: "Fisika Mengabdi", desc: "Fisika Mengabdi merupakan kegiatan pemberdayaan masyarakat di daerah tertentu. Agenda acara yang dilaksanakan pada kegiatan ini sangat beragam sesuai dengan kebutuhan daerah tersebut. Dilaksanakan dengan kurun waktu yang ditentukan." },
        { title: "HMF Darling", desc: "HMF Darling merupakan bentuk kontribusi dan kepekaan mahasiswa departemen pendidikan fisika UPI dalam ranah lingkungan. Programnya berupa Bank Sampah, Konten Dalang Sampah, HMF Darling Challenge, dan Peringatan Hari Lingkungan." },
        { title: "HMF Peduli", desc: "HMF Peduli merupakan program kerja penghimpun dan pendayagunaan dana sosial yang berasal dari warga fisika untuk agenda-agenda sosial seperti bencana alam, bantuan, permohonan peminjaman dana, dan lain-lain." },
        { title: "Kajian", desc: "Kajian merupakan forum diskusi antar mahasiswa yang membahas isu-isu yang sedang berkembang dimasyarakat seputar sosial dan politik. Kajian sospol ini terdiri dari Kajian Akbar dan Kajian Strategis (berupa paper kajian, press release, dan propaganda)." },
        { title: "Pelepasan Wi-Fi (Pelepasan Wisuda Fisika)", desc: "Wisuda Fisika adalah sikap apresiasi atas kelulusan wisudawan fisika dan bentuk silaturahmi antara masyarakat Departemen Pendidikan Fisika dengan orang tua wisudawan. Wisuda Fisika terdiri dari tiga gelombang. Pelepasan wisuda terdiri dari penjemputan/pra-event dan syukuran wisuda departemen." }
    ]
};
