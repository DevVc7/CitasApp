"use client"

import { createContext, useState, useContext, useEffect } from "react"
import serviceService from "../services/serviceService"

// Crear el contexto
const ServiceContext = createContext()

/**
 * Proveedor de contexto para servicios
 * Implementa el patrón Provider para compartir estado global
 */
export const ServiceProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [featuredServices, setFeaturedServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar datos iniciales
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)

        // Cargar categorías y servicios destacados en paralelo
        const [categoriesData, featuredData] = await Promise.all([
          serviceService.getCategories(),
          serviceService.getFeaturedServices(),
        ])

        setCategories(categoriesData)
        setFeaturedServices(featuredData)
        setError(null)
      } catch (err) {
        setError(err.message || "Error al cargar los datos")
        console.error("Error loading service data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [])

  // Métodos para interactuar con los servicios
  const searchServices = async (query) => {
    try {
      setIsLoading(true)
      const results = await serviceService.searchServices(query)
      return results
    } catch (err) {
      setError(err.message || "Error al buscar servicios")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const getServicesByCategory = async (categoryId) => {
    try {
      setIsLoading(true)
      const results = await serviceService.getServicesByCategory(categoryId)
      return results
    } catch (err) {
      setError(err.message || "Error al obtener servicios por categoría")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const getServiceDetails = async (serviceId) => {
    try {
      setIsLoading(true)
      const service = await serviceService.getServiceById(serviceId)
      return service
    } catch (err) {
      setError(err.message || "Error al obtener detalles del servicio")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Valor del contexto
  const value = {
    categories,
    featuredServices,
    isLoading,
    error,
    searchServices,
    getServicesByCategory,
    getServiceDetails,
  }

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
}

// Hook personalizado para usar el contexto
export const useServices = () => {
  const context = useContext(ServiceContext)
  if (!context) {
    throw new Error("useServices debe ser usado dentro de un ServiceProvider")
  }
  return context
}

