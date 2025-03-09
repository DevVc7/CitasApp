/**
 * Utilidades para manejo de fechas
 * Centraliza la lógica de formateo y manipulación de fechas
 */
export const dateUtils = {
  /**
   * Formatea una fecha para mostrar
   * @param {string} dateString - Fecha en formato ISO o YYYY-MM-DD
   * @returns {string} Fecha formateada para mostrar
   */
  formatDate(dateString) {
    if (!dateString) return ""

    const date = new Date(dateString)

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return ""

    // Formatear según el locale español
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  },

  /**
   * Formatea una hora para mostrar
   * @param {string} timeString - Hora en formato HH:MM
   * @returns {string} Hora formateada
   */
  formatTime(timeString) {
    if (!timeString) return ""

    // Verificar formato HH:MM
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!timeRegex.test(timeString)) return timeString

    const [hours, minutes] = timeString.split(":")
    const date = new Date()
    date.setHours(Number.parseInt(hours, 10))
    date.setMinutes(Number.parseInt(minutes, 10))

    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  },

  /**
   * Obtiene la fecha actual en formato YYYY-MM-DD
   * @returns {string} Fecha actual
   */
  getCurrentDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  },

  /**
   * Verifica si una fecha es hoy
   * @param {string} dateString - Fecha en formato ISO o YYYY-MM-DD
   * @returns {boolean} True si es hoy
   */
  isToday(dateString) {
    const today = this.getCurrentDate()
    return dateString === today
  },

  /**
   * Verifica si una fecha es en el futuro
   * @param {string} dateString - Fecha en formato ISO o YYYY-MM-DD
   * @returns {boolean} True si es en el futuro
   */
  isFutureDate(dateString) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const date = new Date(dateString)
    date.setHours(0, 0, 0, 0)

    return date > today
  },

  /**
   * Verifica si una fecha es en el pasado
   * @param {string} dateString - Fecha en formato ISO o YYYY-MM-DD
   * @returns {boolean} True si es en el pasado
   */
  isPastDate(dateString) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const date = new Date(dateString)
    date.setHours(0, 0, 0, 0)

    return date < today
  },

  /**
   * Agrega días a una fecha
   * @param {string} dateString - Fecha en formato ISO o YYYY-MM-DD
   * @param {number} days - Número de días a agregar
   * @returns {string} Nueva fecha en formato YYYY-MM-DD
   */
  addDays(dateString, days) {
    const date = new Date(dateString)
    date.setDate(date.getDate() + days)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  },
}

