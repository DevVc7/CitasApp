import apiClient from "../apiClient"
import { mockUser } from "../../data/mockData"
import { USE_MOCK_DATA } from "../../config/constants"

/**
 * Repositorio para gestionar los datos del usuario
 * Sigue el patrón Repository para abstraer la fuente de datos
 */
class UserRepository {
  /**
   * Obtiene el perfil del usuario actual
   * @returns {Promise<Object>} Datos del perfil
   */
  async getUserProfile() {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockUser)
    }

    try {
      return await apiClient.get("/api/user/profile")
    } catch (error) {
      console.error("Error fetching user profile:", error)
      throw error
    }
  }

  /**
   * Actualiza el perfil del usuario
   * @param {Object} profileData - Nuevos datos del perfil
   * @returns {Promise<Object>} Perfil actualizado
   */
  async updateUserProfile(profileData) {
    if (USE_MOCK_DATA) {
      // Simular actualización
      return Promise.resolve({
        ...mockUser,
        ...profileData,
        updatedAt: new Date().toISOString(),
      })
    }

    try {
      return await apiClient.put("/api/user/profile", profileData)
    } catch (error) {
      console.error("Error updating user profile:", error)
      throw error
    }
  }

  /**
   * Obtiene los métodos de pago del usuario
   * @returns {Promise<Array>} Lista de métodos de pago
   */
  async getPaymentMethods() {
    if (USE_MOCK_DATA) {
      return Promise.resolve([
        { id: 1, type: "card", last4: "4242", brand: "Visa", isDefault: true },
        { id: 2, type: "card", last4: "1234", brand: "Mastercard", isDefault: false },
      ])
    }

    try {
      return await apiClient.get("/api/user/payment-methods")
    } catch (error) {
      console.error("Error fetching payment methods:", error)
      throw error
    }
  }

  /**
   * Agrega un nuevo método de pago
   * @param {Object} paymentData - Datos del método de pago
   * @returns {Promise<Object>} Método de pago creado
   */
  async addPaymentMethod(paymentData) {
    if (USE_MOCK_DATA) {
      // Simular creación
      return Promise.resolve({
        id: Date.now(),
        ...paymentData,
        isDefault: false,
      })
    }

    try {
      return await apiClient.post("/api/user/payment-methods", paymentData)
    } catch (error) {
      console.error("Error adding payment method:", error)
      throw error
    }
  }
}

export default new UserRepository()

