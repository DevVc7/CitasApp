import apiClient from "../apiClient"
import { mockBookings } from "../../data/mockData"
import { USE_MOCK_DATA } from "../../config/constants"

/**
 * Repositorio para gestionar las reservas
 * Sigue el patrón Repository para abstraer la fuente de datos
 */
class BookingRepository {
  /**
   * Obtiene las reservas del usuario actual
   * @returns {Promise<Array>} Lista de reservas
   */
  async getUserBookings() {
    if (USE_MOCK_DATA) {
      return Promise.resolve(mockBookings)
    }

    try {
      return await apiClient.get("/api/bookings")
    } catch (error) {
      console.error("Error fetching user bookings:", error)
      throw error
    }
  }

  /**
   * Crea una nueva reserva
   * @param {Object} bookingData - Datos de la reserva
   * @returns {Promise<Object>} Reserva creada
   */
  async createBooking(bookingData) {
    if (USE_MOCK_DATA) {
      // Simular creación de reserva
      const newBooking = {
        id: Date.now(),
        status: "confirmed",
        ...bookingData,
      }
      return Promise.resolve(newBooking)
    }

    try {
      return await apiClient.post("/api/bookings", bookingData)
    } catch (error) {
      console.error("Error creating booking:", error)
      throw error
    }
  }

  /**
   * Cancela una reserva
   * @param {string} bookingId - ID de la reserva
   * @returns {Promise<Object>} Resultado de la operación
   */
  async cancelBooking(bookingId) {
    if (USE_MOCK_DATA) {
      // Simular cancelación
      return Promise.resolve({ success: true, message: "Reserva cancelada con éxito" })
    }

    try {
      return await apiClient.put(`/api/bookings/${bookingId}/cancel`)
    } catch (error) {
      console.error(`Error cancelling booking ${bookingId}:`, error)
      throw error
    }
  }

  /**
   * Reprograma una reserva
   * @param {string} bookingId - ID de la reserva
   * @param {Object} newSchedule - Nuevos datos de fecha y hora
   * @returns {Promise<Object>} Reserva actualizada
   */
  async rescheduleBooking(bookingId, newSchedule) {
    if (USE_MOCK_DATA) {
      // Simular reprogramación
      return Promise.resolve({
        id: bookingId,
        ...newSchedule,
        status: "confirmed",
        message: "Reserva reprogramada con éxito",
      })
    }

    try {
      return await apiClient.put(`/api/bookings/${bookingId}/reschedule`, newSchedule)
    } catch (error) {
      console.error(`Error rescheduling booking ${bookingId}:`, error)
      throw error
    }
  }

  /**
   * Obtiene los horarios disponibles para un servicio en una fecha
   * @param {string} serviceId - ID del servicio
   * @param {string} date - Fecha en formato ISO
   * @returns {Promise<Array>} Lista de horarios disponibles
   */
  async getAvailableTimeSlots(serviceId, date) {
    if (USE_MOCK_DATA) {
      // Simular horarios disponibles
      return Promise.resolve(["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"])
    }

    try {
      return await apiClient.get(`/api/services/${serviceId}/availability`, { date })
    } catch (error) {
      console.error("Error fetching available time slots:", error)
      throw error
    }
  }
}

export default new BookingRepository()

