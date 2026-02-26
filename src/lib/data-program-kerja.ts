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
        { title: "Pembaruan Basis Data Mahasiswa Aktif", desc: "Pendataan individu 4 angkatan aktif Mahasiswa Pendidikan Fisika. Dijamin keamanannya untuk mempermudah operasional berbagai kebutuhan." },
        { title: "Pembuatan Basis Data Pengurus Harian", desc: "Sekumpulan data identitas umum pengurus harian HMF FPMIPA UPI. Dijamin aman dan menjadi basis kontak internal." },
        { title: "Pembuatan Kalender dan Timeline Program Kerja", desc: "Pengumpulan tanggal pelaksanaan program kerja seluruh elemen himpunan dan dipublikasikan setiap bulan sebagai acuan agenda." },
        { title: "Pembuatan Struktur Kepengurusan", desc: "Penyusunan alur dan posisi tiap bagian di HMF FPMIPA UPI untuk memperjelas rantai komando dan koordinasi operasional." },
        { title: "Pengelolaan Inventaris", desc: "Pendataan berkala, peminjaman, serta pendaftaran seluruh barang inventaris milik HMF FPMIPA UPI." },
        { title: "Pemeliharaan Kesekretariatan", desc: "Kegiatan piket kebersihan dan kerapian sekretariat HMF oleh perwakilan setiap bidang/lembaga secara bergiliran." },
        { title: "Manajemen Sirkulasi Administrasi", desc: "Pengarsipan serta pendataan seluruh surat menyurat dan dokumen administrasi baik umum, lembaga, maupun kepanitiaan." },
        { title: "Manajemen Notula Rapat", desc: "Merekap, mengarsipkan, dan standardisasi format notula rapat untuk mempermudah review hasil keputusan penting." },
        { title: "Pembuatan Sertifikat Pengurus Harian", desc: "Bentuk apresiasi kepada pengurus harian di akhir periode yang berisi keterangan jabatan/posisi kepengurusan." }
    ],
    "lembaga-keuangan": [
        { title: "Perancangan Anggaran HMF", desc: "Pembuatan Rancangan Anggaran Pendapatan dan Belanja Organisasi (RAPBO) yang melibatkan setiap bidang/lembaga, UKK, dan DPM." },
        { title: "Laporan Kondisi Keuangan", desc: "Pembukuan dan pelaporan rutin kondisi finansial kepada berbagai stakeholder untuk menjaga transparansi keuangan himpunan." },
        { title: "Kontrol Anggaran Dana Proker", desc: "Supervisi aliran dana secara berkala oleh Bendahara Umum kepada Bendahara Pelaksana (Kepanitiaan) demi memantau efisiensi anggaran." }
    ],
    "bidang-akademik": [
        { title: "Phyfest (Physics Festival)", desc: "Ajang bergengsi bagi mahasiswa dan pelajar umum untuk berlomba, berdiskusi dalam webinar, dan mengeksplorasi ilmu Fisika." },
        { title: "PK (Perencanaan Karir)", desc: "Fasilitasi wawasan dunia industri dan riset (Kunjungan Industri & Kelompok Bidang Kajian) untuk persiapan prospek karir mahasiswa." },
        { title: "BEARR", desc: "Bank soal, E-book, Aplikasi, Responsi, Referensi belajar. Pusat bantuan akademis untuk membantu mahasiswa menghadapi ujian semester." },
        { title: "Rangers Talk", desc: "Berfokus pada pengembangan prestasi lewat klub Olimpiade, PKM, Komputasi, dan English club, serta penyebaran info lomba & beasiswa." }
    ],
    "bidang-ekonomi-dan-bisnis": [
        { title: "Dana Usaha", desc: "Sumber pemasukan tambahan di luar iuran wajib. Terbagi menjadi danus harian, bulanan, dan impuls (penjualan pulsa/e-commerce)." },
        { title: "Kerja Sama", desc: "Menjalin kemitraan menguntungkan dengan berbagai entitas luar untuk memperluas koneksi dan mencari pendanaan sponsor." },
        { title: "Pelatihan Kewirausahaan (KWU)", desc: "Program unggulan pelatihan skill bisnis di era digital agar mahasiswa fisika memiliki bekal wirausaha yang tersertifikasi." }
    ],
    "bidang-kaderisasi": [
        { title: "Restitusi (Registrasi untuk Silaturrahmi)", desc: "Tahapan awal kaderisasi untuk menyambut, meregistrasi, dan mempertemukan maba Pendidikan Fisika & Fisika secara komunal." },
        { title: "Spectrum", desc: "Study Program Orientation Call for Young Member. Ajang pengenalan dasar prodi pada momentum MOKA-KU universitas." },
        { title: "MABIM (Masa Bimbingan)", desc: "Fase inti pematerian dan bimbingan terpusat maupun kelompok kecil (mentoring) untuk menanamkan esensi kemahasiswaan." },
        { title: "Phylament", desc: "Physics Leadership and Training Management. Pelatihan manajerial, kepemimpinan organisasi, dan critical problem solving isu terkini." },
        { title: "IMAFIS (Inaugurasi Mahasiswa Fisika)", desc: "Malam puncak yang sakral: evaluasi komprehensif dan pelantikan resmi Anggota Muda menjadi Anggota Biasa HMF FPMIPA UPI." },
        { title: "PASOSORE", desc: "Pakumpul Sosonoan jeung Social Project Rame-rame. Aplikasi nilai empati melalui pengabdian masyarakat di lingkungan sekitar." }
    ],
    "bidang-kerohanian": [
        { title: "AQUR (Amalan Qur'an)", desc: "Gerakan kultural membaca dan tadabbur Al-Qur'an (Rabu Cinta Qur'an & Jumat bersama Al-Kahfi)." },
        { title: "SUQRAN (Sedekah Qurban)", desc: "Fasilitator warga himpunan untuk menyisihkan rezeki bersama demi bisa berqurban dan mendistribusikan daging ke yang berhak." },
        { title: "MATFIS (Majlis Ta'lim Fisika)", desc: "Kajian akbar / training motivasi spiritual pengingat pondasi iman para organisatoris dan masyarakat mahasiswa." },
        { title: "GIGITARAN (Bagi-bagi Takjil Ramadhan)", desc: "Program berbagi takjil gratis menjelang berbuka di bulan suci sekaligus ajang kumpul ngabuburit warga Fisika." },
        { title: "RADIASI (Lingkar Diskusi Akhwat Fisika)", desc: "Kajian interaktif tematik khusus kemuslimahan untuk memfasilitasi kebutuhan diskusi para mahasiswi." },
        { title: "SYIAR", desc: "Dakwah visual di sosial media dan ajakan berbuat kebaikan melalui Amalan Yaumi & target ibadah bulan Ramadhan." }
    ],
    "bidang-komunikasi-dan-media-informasi": [
        { title: "Media Desain", desc: "Dapur kreatif yang memproses informasi mentah menjadi grafis multimedia epik, aesthetic, dan mudah dicerna penikmat maya." },
        { title: "Media Publik", desc: "Garda terdepan yang mendistribusikan dan mengelola flow publikasi infografis di seluruh saluran resmi HMF." },
        { title: "Pelatihan Management Media Social dan Desain", desc: "Workshop skill masa kini (editing video & desain grafis) untuk mencetak SDM kreatif di lingkungan departemen." },
        { title: "Komunikasi dan Relasi", desc: "Diplomat himpunan. Menjalin hubungan baik internal UPI maupun menjaga PR (*Public Relations*) ke eksternal." },
        { title: "Content Creator", desc: "Tim produksi hiburan dan edukasi yang fokus pada konten video kreatif kekinian seperti platform YouTube dan Tiktok." }
    ],
    "bidang-penelitian-dan-pengembangan": [
        { title: "Studi Banding", desc: "Pertukaran wawasan organisasional antar generasi (Internal) dan antar himpunan kampus lain (Eksternal)." },
        { title: "Pendekatan PH (PPH)", desc: "Agenda bonding dan upgrading *soft-skill* kepanitiaan melalui *fun games* bagi internal pengurus himpunan." },
        { title: "Monitoring dan Evaluasi (MONEV)", desc: "Mata pengawas internal. Menilai kinerja, keaktifan, dan mendiagnosa kemandekan program di setiap departemen secara berkala 360 derajat." },
        { title: "Apresiasi Kinerja PH", desc: "Nominasi dan eksposur 'Staff of The Month' & 'Leader of The Month' di Instagram HMF berdasarkan output nilai MONEV bulanan." },
        { title: "Upgrading", desc: "Pembekalan masif diawal kepengurusan (birokrasi sekretariat, SOP keuangan) sebagai standar operasi satu periode." },
        { title: "Angket Aspirasi", desc: "Instrumen jajak pendapat dan kotak saran online bagi anggota yang ingin mengkritisi maupun memberi usulan." }
    ],
    "bidang-pengembangan-minat-dan-bakat": [
        { title: "Pengontrolan Klub", desc: "Asistensi manajerial bagi eksistensi klub-klub hobi / inisiasi minat bakat warga fisika, dari keuangan hingga teknis eksekusi." },
        { title: "Informasi, Delegasi, dan Apresiasi", desc: "Menjembatani info lomba, memfasilitasi delegasi peserta, dan memberikan panggung apresiasi bagi yang juara." },
        { title: "Polarisasi", desc: "Pekan Olahraga dan Seni Fisika Bumi Siliwangi. Euforia kompetisi sehat dan pentas sportivitas akbar se-Departemen." },
        { title: "Pagelaran Sasefi", desc: "Malam seni pertunjukan eksklusif tempat Sanggar Seni Fisika (SASEFI) memamerkan teater, tari, dan musikualitas mereka." }
    ],
    "bidang-sosial-dan-politik": [
        { title: "Advokesma (Advokasi Kesma)", desc: "Pahlawan birokrasi yang terjun langsung membantu warga fisika yang kesulitan uang kuliah (UKT) maupun problem akademik spesifik." },
        { title: "Fisika Mengabdi", desc: "Ekspedisi sosial multi-hari ke desa binaan untuk memberikan dampak edukasi dan pemberdayaan nyata oleh kaum intelektual fisika." },
        { title: "HMF Darling", desc: "HMF Sadar Lingkungan. Menginisiasi *Bank Sampah*, tantangan *green life*, dan kampanye edukasi selamatkan bumi." },
        { title: "HMF Peduli", desc: "Aksi gerak cepat menggalang dana (*fund-raising*) taktis saat terjadi bencana alam atau musibah warga." },
        { title: "Kajian", desc: "Mengawal nalar kritis mahasiswa melalui pembedahan isu-isu polemik sosial-politik yang berujung pada *Press Release* sikap himpunan." },
        { title: "Pelepasan Wi-Fi", desc: "Wisuda Fisika. Rangkaian selebrasi yang mengawal arak-arakan kelulusan kating dengan penuh kehormatan dan pesta perpisahan." }
    ]
};
