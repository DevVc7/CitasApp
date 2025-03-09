/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Desactivar optimización de imágenes para compatibilidad con exportación estática
  images: {
    unoptimized: true,
  },
  // Asegurarse de que las rutas dinámicas se generen correctamente
  trailingSlash: true,
}

export default nextConfig

