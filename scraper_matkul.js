const cheerio = require('cheerio');
const fs = require('fs');

async function scrapeKurikulum() {
    try {
        // URL 1: Pendidikan Fisika
        const url1 = 'https://kurikulum.upi.edu/struktur/prodi/D025';
        // URL 2: Fisika
        const url2 = 'https://kurikulum.upi.edu/struktur/prodi/D515';

        let allMatkuls = [];
        const mapKode = new Map();

        // FUNGSI EXTRAKSI
        async function fetchTable(url, prodiString) {
            console.log(`Mengunduh dari ${url}...`);
            const response = await fetch(url);
            const html = await response.text();
            const $ = cheerio.load(html);

            // Pada web kurikulum UPI biasanya terdapat <table>
            $('table tbody tr').each((index, element) => {
                const tds = $(element).find('td');
                if (tds.length >= 5) {
                    const kode = $(tds[1]).text().trim();
                    const nama = $(tds[2]).text().trim();
                    const sksText = $(tds[3]).text().trim();
                    const semText = $(tds[4]).text().trim();
                    const kategori = tds.length >= 6 ? $(tds[5]).text().trim() : 'Wajib';

                    // Validasi baris data (bukan header)
                    if (kode && nama && !isNaN(parseInt(sksText)) && kode.length > 2) {
                        const mk = {
                            kode,
                            nama,
                            sks: parseInt(sksText),
                            semester: parseInt(semText) || 1,
                            prodi: prodiString, // D025 atau D515
                            kategori
                        };

                        if (mapKode.has(mk.kode)) {
                            let existing = mapKode.get(mk.kode);
                            if (!existing.prodiArray.includes(mk.prodi)) {
                                existing.prodiArray.push(mk.prodi);
                            }
                        } else {
                            mk.prodiArray = [mk.prodi];
                            mapKode.set(mk.kode, mk);
                        }
                    }
                }
            });
        }

        await fetchTable(url1, 'PendFisika');
        await fetchTable(url2, 'Fisika');

        const finalMatkuls = [];
        mapKode.forEach((val) => {
            finalMatkuls.push(val);
        });

        fs.writeFileSync('matkuls_scraped.json', JSON.stringify(finalMatkuls, null, 2));
        console.log(`\n\n=== SCRAPING SELESAI ===\nBerhasil mengekstrak ${finalMatkuls.length} mata kuliah unik! Disimpan ke matkuls_scraped.json`);

    } catch (err) {
        console.error("Gagal Scraping:", err);
    }
}

scrapeKurikulum();
