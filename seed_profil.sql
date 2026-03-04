-- =============================================
-- TABEL 8: Profil
-- =============================================
CREATE TABLE IF NOT EXISTS "public"."Profil" (
    "id"                 uuid DEFAULT gen_random_uuid() NOT NULL,
    "sejarah_p1"         text NOT NULL,
    "sejarah_p2"         text NOT NULL,
    "sejarah_card1"      text NOT NULL,
    "sejarah_card2"      text NOT NULL,
    "lambang_desc"       text NOT NULL,
    "lambang_tulisan"    text NOT NULL,
    "lambang_mahkota"    text NOT NULL,
    "lambang_lingkaran"  text NOT NULL,
    "lambang_sayap"      text NOT NULL,
    "lambang_elektron"   text NOT NULL,
    "lambang_segitiga"   text NOT NULL,
    "warna_biru"         text NOT NULL,
    "warna_merah"        text NOT NULL,
    "warna_putih"        text NOT NULL,
    "mars_ciptaan"       text NOT NULL,
    "mars_lirik"         text NOT NULL,
    "hymne_ciptaan"      text NOT NULL,
    "hymne_lirik"        text NOT NULL,
    "isAktif"            boolean DEFAULT true NOT NULL,
    PRIMARY KEY ("id")
);

-- Hapus dummy sebelumnya jika ada duplikat agar rapi (jika mau)
-- DELETE FROM "public"."Profil";

INSERT INTO "public"."Profil" (
    "sejarah_p1", "sejarah_p2", "sejarah_card1", "sejarah_card2",
    "lambang_desc", "lambang_tulisan", "lambang_mahkota", "lambang_lingkaran", "lambang_sayap", "lambang_elektron", "lambang_segitiga",
    "warna_biru", "warna_merah", "warna_putih",
    "mars_ciptaan", "mars_lirik", "hymne_ciptaan", "hymne_lirik"
) VALUES (
    'Himpunan Mahasiswa Fisika yang sekarang dikenal ternyata memiliki sejarah yang menarik dan patut kita ketahui. Tanggal pasti berdirinya masih dalam pembicaraan, namun dari beberapa sumber dan alumni maka sejarah singkat berdirinya HMF adalah sebagai berikut.',
    'Himpunan pertama kali lahir dilatar belakangi oleh sekumpulan mahasiswa fisika yang melaksanakan aktifitas positif selain aktifitas kuliah. Dari beberapa pemikiran, akhirnya dibentuklah sebuah wadah yang disebut Persatuan Mahasiswa Fisika yang disingkat PERMAF pada tanggal 30 Juni 1954. Organisasi ini memiliki tujuan yang mulia yaitu untuk mewadahi mahasiswa fisika dan membantu mahasiswa fisika baik dalam bidang akademik maupun sosial.',
    'Dari tahun-ketahun organisasi ini menunjukkan eksistensinya sebagai organisasi yang lahir dari penjelmaan aspirasi mahasiswa dan melaksanakan kegiatan untuk mahasiswa. Akhirnya dari PERMAF berubah nama menjadi *Himpunan Mahasiswa Fisika Jurusan Pendidikan Fisika* dan akhirnya berubah lagi menjadi *Himpunan Mahasiswa Fisika* yang disingkat menjadi *HMF*. HMF FPMIPA UPI menjadi salah satu himpunan yang eksis berjuang untuk mahasiswa dan itu dibuktikan sampai sekarang.',
    'Untuk mengetahui perkembangan HMF FPMIPA UPI masa kini, dapat dilihat melalui website dan akun media sosial aktifnya. Termasuk profil kabinet terbarukan dapat dilihat di menu navigasi bagian atas website ini.',
    'Lambang HMF FPMIPA UPI terdiri dari berbagai bagian yang mempunyai maksud sebagai berikut :',
    'Tulisan Himpunan Mahasiswa Fisika FPMIPA UPI dan singkatan HMF dalam lingkaran biru menunjukan nama organisasi.',
    'Mahkota segilima warna putih bertepikan biru pada bentuk luar melambangkan menjalankan kegiatan berdasarkan Pancasila, UUD 1945, serta Tridharma PT.',
    'Mempunyai arti bahwa kegiatan berlandaskan asas kekeluargaan, segala aspek pemecahan masalah diselesaikan secara musyawarah mufakat.',
    'Berwarna putih berarti memiliki bidang-bidang dengan tugasnya masing-masing akan tetapi saling membantu mencapai tujuan.',
    'Berarti HMF memiliki sifat dinamis dan aktif sesuai dengan peraturan dan hukum yang berlaku dan dapat dipertanggungjawabkan.',
    'Mengarah ke bawah berarti HMF memiliki dasar yang kuat dengan akar yang kokoh sehingga mantap walaupun mendapat tantangan.',
    'HMF dijiwai semangat pengabdian yang tinggi untuk mencapai tujuan mulia.',
    'Berarti HMF FPMIPA UPI memiliki energi yang sangat besar sebagai modal dalam beraktifitas.',
    'Memiliki keragaman potensi anggota yang berpadu untuk mencapai tujuan organisasi yang sama.',
    'Doni Nurdiansyah',
    'Kibarkan bakti di jiwa\nMembangun HMF tercinta\nSemangatkan tekad dihati\nUntuk fisika UPI\n\nAyo bergerak\nAyo membangun\nWujudkan cita cinta mu untuk fisika\nBulatkan hati tuk raih prestasi\nBersama di fisika UPI',
    'Doni Nurdiansyah',
    'Fisika bumi siliwangi\nTempat ku bernaung dan berdiri\nCerahkan negeri bakti ibu pertiwi\nFisika jayalah dihati\n\nFisika bumi siliwangi\nTempatku meraih prestasi\nKibarkan panji harumkan negeri\nFisika Jayalah di hati'
);
