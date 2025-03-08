# Instalar Capacitor
npm install @capacitor/core @capacitor/cli

# Inicializar Capacitor en tu proyecto
npx cap init CitaApp io.citaapp.app --web-dir=out

# Instalar plataforma Android
npm install @capacitor/android
npx cap add android

# Instalar plugins útiles
npm install @capacitor/app @capacitor/status-bar @capacitor/splash-screen @capacitor/preferences

# Construir tu aplicación Next.js
npm run build
next export

# Sincronizar los archivos con el proyecto Android
npx cap sync android

# Abrir el proyecto en Android Studio
npx cap open android

