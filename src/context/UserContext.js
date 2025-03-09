"use client"

import { createContext, useState, useContext, useEffect } from "react"
import userService from "../services/userService"

// Crear el contexto
const UserContext = createContext()

/**
 * Proveedor de contexto para usuarios
 * Implementa el patrón Provider para compartir estado global
 */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar perfil del usuario
  const loadUserProfile = async () => {
    try {
      setIsLoading(true)
      const userData = await userService.getUserProfile()
      setUser(userData)
      setError(null)
    } catch (err) {
      setError(err.message || "Error al cargar el perfil")
      console.error("Error loading user profile:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar métodos de pago
  const loadPaymentMethods = async () => {
    try {
      setIsLoading(true)
      const methods = await userService.getPaymentMethods()
      setPaymentMethods(methods)
      setError(null)
    } catch (err) {
      setError(err.message || "Error al cargar métodos de pago")
      console.error("Error loading payment methods:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar datos al montar el componente
  useEffect(() => {
    loadUserProfile()
    loadPaymentMethods()
  }, [])

  // Actualizar perfil
  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true)
      const updatedUser = await userService.updateUserProfile(profileData)
      setUser(updatedUser)
      setError(null)
      return updatedUser
    } catch (err) {
      setError(err.message || "Error al actualizar el perfil")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Agregar método de pago
  const addPaymentMethod = async (paymentData) => {
    try {
      setIsLoading(true)
      const newMethod = await userService.addPaymentMethod(paymentData)
      setPaymentMethods([...paymentMethods, newMethod])
      setError(null)
      return newMethod
    } catch (err) {
      setError(err.message || "Error al agregar método de pago")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Valor del contexto
  const value = {
    user,
    paymentMethods,
    isLoading,
    error,
    updateProfile,
    addPaymentMethod,
    refreshUserData: loadUserProfile,
    refreshPaymentMethods: loadPaymentMethods,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider")
  }
  return context
}

