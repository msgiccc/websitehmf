import React from 'react';
import { Card } from '@/components/ui/card';

export const metadata = {
    title: 'Program Kerja | HMF FPMIPA UPI',
    description: 'Daftar keseluruhan program kerja Himpunan Mahasiswa Fisika FPMIPA UPI dari berbagai bidang dan lembaga.',
};

const PROGRAM_DATA = [
    {
        category: "Lembaga Kesekretariatan",
        programs: [
            { title: "Pembaruan Basis Data Mahasiswa Aktif", desc: "Sebuah data individu 4 angkatan aktif yang berisi identitas lengkap Mahasiswa Departemen Pendidikan Fisika. Data tersebut menjadi milik HMF dan dijamin keamanannya oleh HMF FPMIPA UPI. Kegiatan ini berguna untuk mempermudah apabila ada kepentingan yang memerlukan data tersebut." },
            { title: "Pembuatan Basis Data Pengurus Harian", desc: "Sekumpulan data yang berisi identitas umum pengurus harian HMF FPMIPA UPI. Data tersebut akan menjadi milik HMF dan dijamin keamanannya oleh HMF FPMIPA UPI. Kegiatan ini berguna untuk mempermudah apabila ada kepentingan yang membutuhkan data tersebut." },
            { title: "Pembuatan Kalender dan Timeline Program Kerja", desc: "Kegiatan pengumpulan tanggal pelaksanaan program kerja tiap bidang, lembaga, UKK, dan DPM. Kalender dipublikasikan setiap bulannya dengan tujuan sebagai acuan pelaksanaan program kerja setiap bulannya." },
            { title: "Pembuatan Struktur Kepengurusan", desc: "Kegiatan pembuatan struktur/susunan tiap bagian yang ada di HMF FPMIPA UPI. Struktur tersebut berisi identitas pengurus dengan tujuan mengetahui susunan dan hubungan tiap bagian secara posisi untuk mencapai tujuan operasional." },
            { title: "Pengelolaan Inventaris", desc: "Kegiatan pendataan, peminjaman, pengembalian, dan pendaftaran seluruh inventaris milik HMF FPMIPA UPI." },
            { title: "Pemeliharaan Kesekretariatan", desc: "Kegiatan yang dilakukan oleh perwakilan tiap bidang/lembaga untuk melaksanakan piket di sekretariat HMF setiap bulan secara bergiliran." },
            { title: "Manajemen Sirkulasi Administrasi", desc: "Kegiatan pengarsipan dan pendataan seluruh administrasi HMF FPMIPA UPI baik administrasi umum, bidang, lembaga maupun kegiatan." },
            { title: "Manajemen Notula Rapat", desc: "Kegiatan merekap, mengarsipkan, dan mengatur standarisasi format notula rapat serta mempublikasikan notula rapat kepada peserta rapat sesuai kebutuhan." },
            { title: "Pembuatan Sertifikat Pengurus Harian", desc: "Kegiatan untuk mengapresiasi pengurus harian yang telah berkontribusi aktif dalam kegiatan HMF FPMIPA UPI. Sertifikat berisi Nama dan posisi (jabatan) dalam kepengurusan HMF FPMIPA UPI." }
        ]
    },
    {
        category: "Lembaga Keuangan",
        programs: [
            { title: "Perancangan Anggaran HMF", desc: "Pembuatan Rancangan Anggaran Pendapatan dan Belanja Organisasi (RAPBO) setiap progam kerja oleh setiap bidang/lembaga, UKK dan DPM." },
            { title: "Laporan Kondisi Keuangan", desc: "Pembukuan serta pelaporan kondisi keuangan HMF FPMIPA UPI kepada ketua himpunan, DPM, pengurus harian serta warga fisika FPMIPA UPI dengan tujuan memberikan transparansi kondisi keuangan HMF FPMIPA UPI." },
            { title: "Kontrol Anggaran Dana Proker", desc: "Kontrol anggaran dana secara rutin oleh bendahara kabinet kepada bendahara proker serta pengumpulan Laporan Keuangan setiap program kerja dengan tujuan memantau dana untuk setiap program kerja." }
        ]
    },
    {
        category: "Bidang Akademik",
        programs: [
            { title: "Phyfest (Physics Festival)", desc: "Physics festival yaitu program kerja yang menjadi wadah sekaligus fasilitas bagi mahasiswa departemen Pendidikan Fisika FPMIPA UPI dan khalayak umum yang dihimpun dalam satu ruang untuk mengembangkan potensi dan kecakapannya dalam keilmuan di bidang fisika melalui perlombaan, webinar, dan informasi keilmuan fisika." },
            { title: "PK (Perencanaan Karir)", desc: "Program kerja yang memfasilitasi mahasiswa fisika untuk mengetahui bidang kajian apa yang akan di ambil dan memfasilitasi mahasiswa pendidikan fisika dan mahasiswa fisika untuk dapat menambah wawasan serta informasi mengenai dunia industri dan profesi. Terdapat kegiatan Kunjungan Industri serta Kelompok Bidang Kajian." },
            { title: "BEARR (Bank soal, E-book, Aplikasi, Responsi, Referensi belajar)", desc: "Program kerja yang memfasilitasi mahasiswa untuk memperoleh ilmu dan memperluas wawasan dalam bidang perkuliahan sehingga dapat membantu mahasiswa dalam mempersiapkan diri menghadapi ujian – ujian yang akan datang lewat bank soal, e-book, responsi, kumpulan PPT dosen dan kumpulan catatan mahasiswa. Selain itu, tersedia juga aplikasi – aplikasi yang mendukung jalannya perkuliahan." },
            { title: "Rangers Talk", desc: "Program kerja yang berfokus dalam pengembangan serta penyebaran informasi kepada mahasiswa terkait akademik, lowongan pekerjaan, MAPRES, dan ONMIPA serta pengembangan kemampuan prestasi akademik melalui klub PKM, klub English, klub komputasi, dan klub olimpiade." }
        ]
    },
    {
        category: "Bidang Ekonomi dan Bisnis",
        programs: [
            { title: "Dana Usaha", desc: "Dana usaha merupakan salah satu sumber pemasukan dana non-IUK yang bertujuan untuk memperoleh keuntungan yang akan digunakan dalam kegiatan himpunan. Dana usaha terbagi menjadi 3 bagian yaitu danus harian, danus bulanan, dan impuls (instagram, e-commerce, dan pulsa)." },
            { title: "Kerja Sama", desc: "Kerja sama ini bertujuan untuk memperoleh banyak relasi dengan berbagai pihak, serta memperoleh dana tambahan (Non-IUK) himpunan. Kerja sama ini terdiri dari 2 jenis, yaitu Kerja Sama Internal dan Kerja Sama Eksternal." },
            { title: "Pelatihan Kewirausahaan (KWU)", desc: "Pelatihan Kewirausahaan (KWU) merupakan salah satu program kerja eventual Himpunan Mahasiswa Fisika kolaborasi antara Bidang ekobis dan juga kominfo berupa pelatihan yang dilakukan secara bertahap. Pelatihan kewirausahaan ini diselenggarakan dengan tujuan untuk memfasilitasi mahasiswa UPI dalam mengembangkan jiwa kewirausahaan di era digital sekaligus sebagai pemenuhan salah satu persyaratan sidang, yaitu memiliki sertifikat pelatihan kewirausahaan." }
        ]
    },
    {
        category: "Bidang Kaderisasi",
        programs: [
            { title: "Restitusi (Registrasi untuk Silaturrahmi)", desc: "Restitusi merupakan kegiatan yang bertujuan untuk melakukan silaturahmi antara mahasiswa baru dengan panitia rangkaian kaderisasi dan antar sesama mahasiswa baru, serta untuk mengumpulkan data mahasiswa baru Pendidikan Fisika dan Fisika." },
            { title: "Spectrum (Study Program Orientation Call for Young Member)", desc: "Spectrum merupakan suatu kegiatan pengenalan Program Studi Pendidikan Fisika dan Fisika secara umum yang diselenggarakan pada MOKA-KU." },
            { title: "MABIM (Masa Bimbingan)", desc: "Mabim adalah kegiatan bimbingan dan pematerian yang diikuti oleh anggota muda yang diberikan oleh mentor dan pemateri. Terdapat dua rangkaian kegiatan yaitu Mabim Terpusat dan Mabim Harian. Pada Mabim Terpusat, anggota muda mengikuti kegiatan pematerian. Lalu, Mabim Harian atau disebut juga mentoring, yang dimana anggota muda dibagi menjadi beberapa kelompok dan dibimbing oleh satu orang mentor ditiap kelompoknya." },
            { title: "Phylament (Physics Leadership and Training Management)", desc: "Phylament merupakan bagian dari rangkaian kaderisasi dengan tujuan memberikan pemahaman mengenai organisasi, kepemimpinan, dan kemampuan manajemen isu." },
            { title: "IMAFIS (Inaugurasi Mahasiswa Fisika)", desc: "Imafis merupakan kegiatan puncak yang dilaksanakan pada rangkaian kaderisasi dengan tujuan melaksanakan pengevaluasian dan pelantikan anggota muda menjadi anggota biasa." },
            { title: "PASOSORE", desc: "Pakumpul Sosonoan jeung Social Project Rame-rame merupakan rangkaian kaderisasi pada tahap aplikasi. Kegiatan ini bertujuan untuk meningkatkan tali silaturahmi antara mahasiswa baru dengan warga fisika dan meningkatkan kesadaran akan masalah sosial di lingkungan sekitar." }
        ]
    },
    {
        category: "Bidang Kerohanian",
        programs: [
            { title: "AQUR (Amalan Qur'an)", desc: "Program kerja yang kegiatannya membaca, memahami, dan mengamalkan Al-Qur’an secara bersama-sama, khususnya untuk Pengurus Harian HMF dan umumnya untuk mahasiswa pendidikan fisika dan fisika FPMIPA UPI. Terdiri dari BucinQu (Rabu Cinta Qur’an) & Jumat Berkah (Jumat bersama Al-Kahfi)." },
            { title: "SUQRAN (Sedekah Qurban)", desc: "Program kerja yang dilaksanakan untuk merayakan puncak dari ibadah haji yaitu Hari Raya Idul Adha dalam bentuk sedekah hewan qurban yang nantinya disedekahkan kepada orang yang berhak menerimanya." },
            { title: "MATFIS (Majlis Ta'lim Fisika)", desc: "Program kerja yang berupa kegiatan ta’lim atau training motivasi, khususnya untuk mahasiswa pendidikan fisika dan fisika dan pengurus harian HMF FPMIPA UPI, serta umumnya." },
            { title: "GIGITARAN (Bagi-bagi Takjil Ramadhan)", desc: "Program kerja yang dilaksanakan khusus di bulan Ramadhan, dalam rangka berbagi kebaikan berupa takjil serta sebagai ajang silaturahmi warga fisika UPI." },
            { title: "RADIASI (Lingkar Diskusi Akhwat Fisika)", desc: "Program kerja yang berupa kegiatan diskusi ataupun berbentuk kajian kemuslimahan, sebagai wujud dalam memfasilitasi kebutuhan rohani Mahasiswi." },
            { title: "SYIAR", desc: "(Amalan Yaumi, Amalan Ramadhan, Konten IG). Program kerja dakwah atau ajakan melaksanakan kebaikan di akun sosial media juga sebagai ladang ibadah." }
        ]
    },
    {
        category: "Bidang Komunikasi dan Media Informasi",
        programs: [
            { title: "Media Desain", desc: "Media desain bertujuan untuk mengolah segala informasi ke dalam bentuk multimedia agar informasi yang disampaikan lebih mudah diterima dan menarik bagi khalayak umum dan khususnya warga fisika FPMIPA UPI." },
            { title: "Media Publik", desc: "Media Publik bertugas untuk menyebarluaskan informasi yang telah diolah menjadi infografis sehingga dapat diterima oleh khalayak." },
            { title: "Pelatihan Management Media Social dan Desain", desc: "Merupakan suatu acara untuk meningkatkan kemampuan mahasiswa dalam mendesain atau dalam editor video." },
            { title: "Komunikasi dan Relasi", desc: "Komunikasi dan Relasi merupakan kegiatan mengelola komunikasi mencakup komunikasi internal dan eksternal, pengembangan relasi dan pendelegasian HMF FPMIPA UPI." },
            { title: "Content Creator", desc: "Merupakan tim youtube dan Tiktok HMF FPMIPA UPI yang bertugas untuk membuat konten khusus di youtube dan Tiktok HMF FPMIPA UPI." }
        ]
    },
    {
        category: "Bidang Penelitian dan Pengembangan",
        programs: [
            { title: "Studi Banding (Internal & Eksternal)", desc: "Kegiatan pertukaran ide serta pengalaman, baik dari pimpinan bidang periode sebelumnya maupun kunjungan antar himpunan dari dalam UPI atau universitas lain guna memperoleh insight baru." },
            { title: "Pendekatan PH (PPH)", desc: "Kegiatan yang biasanya diisi dengan sharing antar pengurus harian dan fun games untuk menjalin silaturahmi, meningkatkan keakraban, serta kolaborasi kinerja pengurus harian." },
            { title: "Monitoring dan Evaluasi (MONEV)", desc: "Kegiatan pengumpulan informasi dan analisis terkait kinerja seluruh pengurus HMF secara dua arah melalui format penilaian dari Litbang untuk melihat keaktifan dan kinerja." },
            { title: "Apresiasi Kinerja PH", desc: "Tindak lanjut MONEV tiap bulan. Staf dan pimpinan terbaik tiap bidang diunggah di Instagram HMF sebagai tanda apresiasi kinerja selama satu bulan." },
            { title: "Upgrading", desc: "Kegiatan awal kepengurusan sebagai acuan administrasi dan birokrasi pengurus pada saat melaksanakan program kerja untuk satu periode ke depan." },
            { title: "Angket Aspirasi", desc: "Kegiatan untuk mengetahui aspirasi dari pengurus himpunan yang dilaksanakan 3 kali selama kepengurusan (saat Raker). Juga tersedia angket curhat online." }
        ]
    },
    {
        category: "Bidang Minat dan Bakat",
        programs: [
            { title: "Pengontrolan Klub dan Inisiasi", desc: "Program yang berupaya mengawasi keadaan yang ada di dalam klub dan inisiasi baik dari teknis pelaksanaan, anggota, inventaris, dan keuangan." },
            { title: "Informasi, Delegasi, dan Apresiasi", desc: "Fungsi informasi perlombaan olahraga/seni/multimedia, pendelegasian perwakilan Departemen, serta apresiasi terhadap mahasiswa yang berprestasi." },
            { title: "Polarisasi (Pekan Olahraga dan Seni)", desc: "Polarisasi adalah suatu program dalam bentuk kompetisi seni dan olahraga untuk warga mahasiswa pendidikan fisika dan fisika UPI." },
            { title: "Pagelaran Sasefi", desc: "Pagelaran SASEFI adalah program kerja berbentuk penampilan atau pementasan berbagai karya karya seni sebagai wujud kreativitas anggota klub SASEFI." }
        ]
    },
    {
        category: "Bidang Sosial dan Politik",
        programs: [
            { title: "Advokesma", desc: "Advokasi Kesejahteraan Mahasiswa dijalankan untuk membantu mahasiswa khususnya dalam masalah Akademik, Keuangan, serta pelayanan Informasi Beasiswa." },
            { title: "Fisika Mengabdi", desc: "Fisika Mengabdi merupakan kegiatan pemberdayaan masyarakat di daerah tertentu dengan agenda acara yang disesuaikan pada kebutuhan daerah tersebut." },
            { title: "HMF Darling", desc: "HMF Darling merupakan bentuk kontribusi dan kepekaan mahasiswa dalam ranah lingkungan. Programnya berupa Bank Sampah, Konten Dalang Sampah, dan Challenge Lingkungan." },
            { title: "HMF Peduli", desc: "Penghimpun dan pendayagunaan dana sosial dari warga fisika untuk agenda-agenda sosial seperti bencana alam, bantuan, atau permohonan dana." },
            { title: "Kajian", desc: "Forum diskusi antar mahasiswa membahas isu-isu yang berkembang di masyarakat seputar sosial dan politik. Terdapat Kajian Akbar dan Kajian Strategis." },
            { title: "Pelepasan Wi-Fi", desc: "Wisuda Fisika (Wi-Fi) adalah sikap apresiasi kelulusan dan bentuk silaturahmi. Terdiri dari penjemputan pra-event dan syukuran wisuda departemen." }
        ]
    }
];

export default function ProgramKerjaPage() {
    return (
        <div className="min-h-screen bg-[#F4F1EC] flex flex-col pt-24 pb-24">
            {/* Header Section */}
            <section className="container px-4 md:px-8 mx-auto text-center mb-16 relative">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#E63946]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#2c1469]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0B1F3A] leading-tight tracking-tight mb-4 relative z-10">
                    Katalog Ruang Gerak<br />
                    <span className="text-[#E63946]">Program Kerja</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed relative z-10">
                    Menelusuri rangkaian inovasi dan pergerakan nyata dari setiap bidang dan lembaga Keluarga Mahasiswa Fisika FPMIPA UPI. Ciptakan sinergi, wujudkan visi.
                </p>
            </section>

            {/* Program Catalog */}
            <section className="container px-4 md:px-8 mx-auto">
                <div className="flex flex-col gap-16">
                    {PROGRAM_DATA.map((section, idx) => (
                        <div key={idx} className="flex flex-col">
                            {/* Section Title */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-[2px] w-8 lg:w-16 bg-[#2c1469] rounded-full"></div>
                                <h2 className="text-2xl lg:text-3xl font-bold text-[#0B1F3A] uppercase tracking-wider">
                                    {section.category}
                                </h2>
                                <div className="h-[2px] flex-grow bg-gray-200 rounded-full"></div>
                            </div>

                            {/* Bento Grid layout for cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {section.programs.map((prog, pIdx) => (
                                    <div
                                        key={pIdx}
                                        className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 h-[280px]"
                                    >
                                        {/* Card Ambient Background */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-red-50/20 z-0 transition-transform duration-700 group-hover:scale-105" />

                                        {/* Corner Decorative Accent */}
                                        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#2c1469]/5 rounded-full blur-2xl group-hover:bg-[#E63946]/10 transition-colors duration-500"></div>

                                        {/* Initial State Content (Title centered) */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center z-10 transition-all duration-500 group-hover:-translate-y-8 group-hover:opacity-0 bg-white/40 backdrop-blur-[2px]">
                                            <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 text-[#2c1469] group-hover:scale-110 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                            </div>
                                            <h3 className="text-xl font-bold text-[#0B1F3A] leading-snug">
                                                {prog.title}
                                            </h3>
                                        </div>

                                        {/* Hover Reveal Content (Dark Purple Overlay) */}
                                        <div className="absolute inset-0 bg-[#1c0c45] text-white p-6 md:p-8 flex flex-col shadow-inner transition-all duration-500 transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 z-20">
                                            {/* Scrollable content wrapper */}
                                            <div className="h-full overflow-y-auto custom-scrollbar pr-2">
                                                <h3 className="text-lg font-bold text-[#E63946] mb-3 pb-3 border-b border-white/10 uppercase tracking-wide">
                                                    {prog.title}
                                                </h3>
                                                <p className="text-sm md:text-base leading-relaxed text-gray-300 font-medium">
                                                    {prog.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
