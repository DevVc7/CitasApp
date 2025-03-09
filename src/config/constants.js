// Configuración de la API
export const API_BASE_URL = "https://tu-backend-net.azurewebsites.net"

// Flag para usar datos de prueba (cambiar a false cuando el backend esté listo)
export const USE_MOCK_DATA = true

// Constantes de la aplicación
export const APP_NAME = "CitaApp"
export const APP_VERSION = "1.0.0"

// Configuración de paginación
export const ITEMS_PER_PAGE = 10

// Formatos de fecha y hora
export const DATE_FORMAT = "YYYY-MM-DD"
export const TIME_FORMAT = "HH:mm"
export const DISPLAY_DATE_FORMAT = "D [de] MMMM, YYYY"

// Colores de la aplicación
export const COLORS = {
  primary: "#6366f1",
  secondary: "#f3f4f6",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  background: "#ffffff",
  text: "#374151",
  textLight: "#6b7280",
}

// Estados de reservas
export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
}

// Tipos de servicios
export const SERVICE_TYPES = {
  GYM: "Gimnasios",
  CLINIC: "Clínicas",
  BEAUTY: "Belleza",
  SPA: "Spa",
  HAIR: "Peluquerías",
  OTHER: "Otros",
}

