import userRepository from "../api/repositories/userRepository"

/**
 * Servicio para la lógica de negocio relacionada con usuarios
 * Implementa el principio de responsabilidad única
 */
class UserService {
  /**
   * Obtiene el perfil del usuario
   */
  async getUserProfile() {
    return await userRepository.getUserProfile()
  }

  /**
   * Actualiza el perfil del usuario
   */
  async updateUserProfile(profileData) {
    // Validar datos antes de actualizar
    this._validateProfileData(profileData)

    return await userRepository.updateUserProfile(profileData)
  }

  /**
   * Obtiene los métodos de pago del usuario
   */
  async getPaymentMethods() {
    return await userRepository.getPaymentMethods()
  }

  /**
   * Agrega un método de pago
   */
  async addPaymentMethod(paymentData) {
    // Validar datos del método de pago
    this._validatePaymentData(paymentData)

    return await userRepository.addPaymentMethod(paymentData)
  }

  /**
   * Valida los datos del perfil
   * @private
   */
  _validateProfileData(profileData) {
    if (profileData.email && !this._isValidEmail(profileData.email)) {
      throw new Error("Email inválido")
    }

    if (profileData.phone && !this._isValidPhone(profileData.phone)) {
      throw new Error("Número de teléfono inválido")
    }
  }

  /**
   * Valida los datos del método de pago
   * @private
   */
  _validatePaymentData(paymentData) {
    if (!paymentData.type) {
      throw new Error("Tipo de pago requerido")
    }

    if (paymentData.type === "card") {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv) {
        throw new Error("Información de tarjeta incompleta")
      }

      if (!this._isValidCreditCard(paymentData.cardNumber)) {
        throw new Error("Número de tarjeta inválido")
      }
    }
  }

  /**
   * Valida un email
   * @private
   */
  _isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Valida un número de teléfono
   * @private
   */
  _isValidPhone(phone) {
    const phoneRegex = /^\+?[0-9]{10,15}$/
    return phoneRegex.test(phone)
  }

  /**
   * Valida un número de tarjeta de crédito
   * @private
   */
  _isValidCreditCard(cardNumber) {
    // Implementar algoritmo de Luhn para validación de tarjetas
    // Simplificado para este ejemplo
    return cardNumber.replace(/\s/g, "").length >= 13
  }
}

export default new UserService()

