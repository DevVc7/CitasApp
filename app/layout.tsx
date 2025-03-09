import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CitaApp - Reserva de citas",
  description: "Aplicación para reservar citas en gimnasios, clínicas y salones de belleza",
  manifest: "/manifest.json",
  themeColor: "#6366f1",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CitaApp",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head />
      <body>
        {children}
        <RegisterSW />
      </body>
    </html>
  )
}

// Componente para registrar el Service Worker
function RegisterSW() {
  return (
    <script
      id="register-sw"
      dangerouslySetInnerHTML={{
        __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/service-worker.js').then(
                function(registration) {
                  console.log('Service Worker registration successful with scope: ', registration.scope);
                },
                function(err) {
                  console.log('Service Worker registration failed: ', err);
                }
              );
            });
          }
        `,
      }}
    />
  )
}



import './globals.css'