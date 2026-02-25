export const uploadImage = async (file: File): Promise<string> => {
    // TODO: Integrasikan Cloudinary di Phase 5 jika diperlukan.
    // Untuk saat ini kita gunakan object URL sementara sebagai placeholder, 
    // atau user bisa menggunakan string URL gambar langsung.

    return new Promise((resolve, reject) => {
        try {
            if (!file) {
                resolve('');
                return;
            }
            // Placeholder untuk storage lokal di public/uploads
            // Idealnya ini dikirim ke object storage
            console.warn("Image upload is currently mocked. Using object URL.");
            const mockUrl = URL.createObjectURL(file);
            resolve(mockUrl);
        } catch (e) {
            reject(e);
        }
    });
};
