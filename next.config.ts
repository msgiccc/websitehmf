import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Paket-paket ini butuh dijalankan di Node.js runtime (bukan di-bundle Webpack/Turbopack)
  // bcryptjs butuh ini agar bisa compare password di server
  // @supabase/supabase-js agar bisa query database di server
  serverExternalPackages: ['bcryptjs', '@supabase/supabase-js'],
};

export default nextConfig;
