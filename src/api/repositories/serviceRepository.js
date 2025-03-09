import apiClient from "../apiClient"
import { mockServices, mockCategories } from "../../data/mockData"
import { USE_MOCK_DATA } from "../../config/constants"

/**
 * Repositorio para gestionar los servicios
 * Sigue el patrón Repository para abstraer la fuente de datos
 */
class ServiceRepository {
  /**
   * Obtiene todas las categorías de servicios
   * @returns {Promise<Array>} Lista de categorías
   */
  async getCategories() {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockCategories)
    }

    try {
      return await apiClient.get("/api/categories")
    } catch (error) {
      console.error("Error fetching categories:", error)
      throw error
    }
  }

  /**
   * Obtiene todos los servicios
   * @returns {Promise<Array>} Lista de servicios
   */
  async getAllServices() {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockServices)
    }

    try {
      return await apiClient.get("/api/services")
    } catch (error) {
      console.error("Error fetching services:", error)
      throw error
    }
  }

  /**
   * Obtiene servicios filtrados por categoría
   * @param {string} categoryId - ID de la categoría
   * @returns {Promise<Array>} Lista de servicios filtrados
   */
  async getServicesByCategory(categoryId) {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockServices.filter((service) => service.category === categoryId))
    }

    try {
      return await apiClient.get(`/api/services`, { categoryId })
    } catch (error) {
      console.error("Error fetching services by category:", error)
      throw error
    }
  }

  /**
   * Obtiene un servicio por su ID
   * @param {string} serviceId - ID del servicio
   * @returns {Promise<Object>} Detalles del servicio
   */
  async getServiceById(serviceId) {
    if (USE_MOCK_DATA) {
      const service = mockServices.find((s) => s.id.toString() === serviceId.toString())
      return Promise.resolve(service || null)
    }

    try {
      return await apiClient.get(`/api/services/${serviceId}`)
    } catch (error) {
      console.error(`Error fetching service ${serviceId}:`, error)
      throw error
    }
  }

  /**
   * Busca servicios por texto
   * @param {string} query - Texto de búsqueda
   * @returns {Promise<Array>} Lista de servicios que coinciden
   */
  async searchServices(query) {
    if (USE_MOCK_DATA) {
      const lowercaseQuery = query.toLowerCase()
      return Promise.resolve(
        mockServices.filter(
          (service) =>
            service.name.toLowerCase().includes(lowercaseQuery) ||
            service.category.toLowerCase().includes(lowercaseQuery) ||
            service.location.toLowerCase().includes(lowercaseQuery),
        ),
      )
    }

    try {
      return await apiClient.get("/api/services/search", { query })
    } catch (error) {
      console.error("Error searching services:", error)
      throw error
    }
  }
}

export default new ServiceRepository()

