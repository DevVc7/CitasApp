"use client"

import { createContext, useState, useContext, useEffect } from "react"
import bookingService from "../services/bookingService"

// Crear el contexto
const BookingContext = createContext()

/**
 * Proveedor de contexto para reservas
 * Implementa el patrón Provider para compartir estado global
 */
export const BookingProvider = ({ children }) => {
  const [upcomingBookings, setUpcomingBookings] = useState([])
  const [pastBookings, setPastBookings] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar reservas del usuario
  const loadUserBookings = async () => {
    try {
      setIsLoading(true)

      // Cargar reservas próximas y pasadas en paralelo
      const [upcoming, past] = await Promise.all([
        bookingService.getUpcomingBookings(),
        bookingService.getPastBookings(),
      ])

      setUpcomingBookings(upcoming)
      setPastBookings(past)
      setError(null)
    } catch (err) {
      setError(err.message || "Error al cargar las reservas")
      console.error("Error loading bookings:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Cargar reservas al montar el componente
  useEffect(() => {
    loadUserBookings()
  }, [])

  // Crear una nueva reserva
  const createBooking = async (bookingData) => {
    try {
      setIsLoading(true)
      const result = await bookingService.createBooking(bookingData)

      // Actualizar la lista de reservas después de crear una nueva
      await loadUserBookings()

      return result
    } catch (err) {
      setError(err.message || "Error al crear la reserva")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Cancelar una reserva
  const cancelBooking = async (bookingId) => {
    try {
      setIsLoading(true)
      await bookingService.cancelBooking(bookingId)

      // Actualizar la lista de reservas después de cancelar
      await loadUserBookings()

      return { success: true }
    } catch (err) {
      setError(err.message || "Error al cancelar la reserva")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Reprogramar una reserva
  const rescheduleBooking = async (bookingId, newSchedule) => {
    try {
      setIsLoading(true)
      const result = await bookingService.rescheduleBooking(bookingId, newSchedule)

      // Actualizar la lista de reservas después de reprogramar
      await loadUserBookings()

      return result
    } catch (err) {
      setError(err.message || "Error al reprogramar la reserva")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  // Obtener horarios disponibles
  const getAvailableTimeSlots = async (serviceId, date) => {
    try {
      return await bookingService.getAvailableTimeSlots(serviceId, date)
    } catch (err) {
      setError(err.message || "Error al obtener horarios disponibles")
      throw err
    }
  }

  // Valor del contexto
  const value = {
    upcomingBookings,
    pastBookings,
    isLoading,
    error,
    createBooking,
    cancelBooking,
    rescheduleBooking,
    getAvailableTimeSlots,
    refreshBookings: loadUserBookings,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

// Hook personalizado para usar el contexto
export const useBookings = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBookings debe ser usado dentro de un BookingProvider")
  }
  return context
}

