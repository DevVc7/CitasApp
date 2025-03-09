import serviceRepository from "../api/repositories/serviceRepository"

/**
 * Servicio para la lógica de negocio relacionada con servicios
 * Implementa el principio de responsabilidad única
 */
class ServiceService {
  /**
   * Obtiene todas las categorías
   */
  async getCategories() {
    return await serviceRepository.getCategories()
  }

  /**
   * Obtiene todos los servicios
   */
  async getAllServices() {
    return await serviceRepository.getAllServices()
  }

  /**
   * Obtiene servicios por categoría
   */
  async getServicesByCategory(categoryId) {
    return await serviceRepository.getServicesByCategory(categoryId)
  }

  /**
   * Obtiene un servicio por ID
   */
  async getServiceById(serviceId) {
    return await serviceRepository.getServiceById(serviceId)
  }

  /**
   * Busca servicios por texto
   */
  async searchServices(query) {
    return await serviceRepository.searchServices(query)
  }

  /**
   * Obtiene servicios destacados
   * Lógica de negocio para determinar qué servicios mostrar como destacados
   */
  async getFeaturedServices() {
    const allServices = await this.getAllServices()

    // Lógica para determinar servicios destacados (por ejemplo, los mejor valorados)
    return allServices.sort((a, b) => b.rating - a.rating).slice(0, 3)
  }

  /**
   * Filtra servicios por múltiples criterios
   */
  async filterServices(filters) {
    const allServices = await this.getAllServices()

    return allServices.filter((service) => {
      let matches = true

      if (filters.category && filters.category !== "Todos") {
        matches = matches && service.category === filters.category
      }

      if (filters.minRating) {
        matches = matches && service.rating >= filters.minRating
      }

      if (filters.maxPrice) {
        matches = matches && service.price <= filters.maxPrice
      }

      if (filters.query) {
        const query = filters.query.toLowerCase()
        matches =
          matches && (service.name.toLowerCase().includes(query) || service.location.toLowerCase().includes(query))
      }

      return matches
    })
  }
}

export default new ServiceService()

