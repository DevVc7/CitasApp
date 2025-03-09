/**
 * Utilidades para validación de datos
 * Centraliza la lógica de validación
 */
export const validationUtils = {
  /**
   * Valida un email
   * @param {string} email - Email a validar
   * @returns {boolean} True si es válido
   */
  isValidEmail(email) {
    if (!email) return false

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  /**
   * Valida un número de teléfono
   * @param {string} phone - Teléfono a validar
   * @returns {boolean} True si es válido
   */
  isValidPhone(phone) {
    if (!phone) return false

    const phoneRegex = /^\+?[0-9]{10,15}$/
    return phoneRegex.test(phone)
  },

  /**
   * Valida un nombre
   * @param {string} name - Nombre a validar
   * @returns {boolean} True si es válido
   */
  isValidName(name) {
    if (!name) return false

    return name.trim().length >= 2
  },

  /**
   * Valida una contraseña
   * @param {string} password - Contraseña a validar
   * @returns {boolean} True si es válida
   */
  isValidPassword(password) {
    if (!password) return false

    // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return passwordRegex.test(password)
  },

  /**
   * Valida una fecha
   * @param {string} date - Fecha a validar en formato YYYY-MM-DD
   * @returns {boolean} True si es válida
   */
  isValidDate(date) {
    if (!date) return false

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(date)) return false

    const parsedDate = new Date(date)
    return !isNaN(parsedDate.getTime())
  },

  /**
   * Valida una hora
   * @param {string} time - Hora a validar en formato HH:MM
   * @returns {boolean} True si es válida
   */
  isValidTime(time) {
    if (!time) return false

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    return timeRegex.test(time)
  },

  /**
   * Valida un número de tarjeta de crédito
   * @param {string} cardNumber - Número de tarjeta a validar
   * @returns {boolean} True si es válido
   */
  isValidCreditCard(cardNumber) {
    if (!cardNumber) return false

    // Eliminar espacios y guiones
    const cleanedNumber = cardNumber.replace(/[\s-]/g, "")

    // Verificar que solo contiene dígitos y tiene entre 13 y 19 caracteres
    if (!/^\d{13,19}$/.test(cleanedNumber)) return false

    // Algoritmo de Luhn (módulo 10)
    let sum = 0
    let shouldDouble = false

    // Recorrer de derecha a izquierda
    for (let i = cleanedNumber.length - 1; i >= 0; i--) {
      let digit = Number.parseInt(cleanedNumber.charAt(i))

      if (shouldDouble) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      shouldDouble = !shouldDouble
    }

    return sum % 10 === 0
  },
}

