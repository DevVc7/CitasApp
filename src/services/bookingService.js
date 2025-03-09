import bookingRepository from "../api/repositories/bookingRepository"
import serviceRepository from "../api/repositories/serviceRepository"

/**
 * Servicio para la lógica de negocio relacionada con reservas
 * Implementa el principio de responsabilidad única
 */
class BookingService {
  /**
   * Obtiene las reservas del usuario
   */
  async getUserBookings() {
    return await bookingRepository.getUserBookings()
  }

  /**
   * Obtiene las reservas próximas del usuario
   */
  async getUpcomingBookings() {
    const bookings = await this.getUserBookings()
    const now = new Date()

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date)
      return bookingDate >= now && (booking.status === "confirmed" || booking.status === "pending")
    })
  }

  /**
   * Obtiene las reservas pasadas del usuario
   */
  async getPastBookings() {
    const bookings = await this.getUserBookings()
    const now = new Date()

    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.date)
      return bookingDate < now || booking.status === "completed" || booking.status === "cancelled"
    })
  }

  /**
   * Crea una nueva reserva
   */
  async createBooking(bookingData) {
    // Validar datos antes de crear la reserva
    this._validateBookingData(bookingData)

    return await bookingRepository.createBooking(bookingData)
  }

  /**
   * Cancela una reserva
   */
  async cancelBooking(bookingId) {
    return await bookingRepository.cancelBooking(bookingId)
  }

  /**
   * Reprograma una reserva
   */
  async rescheduleBooking(bookingId, newSchedule) {
    // Validar disponibilidad antes de reprogramar
    const isAvailable = await this.checkAvailability(newSchedule.serviceId, newSchedule.date, newSchedule.time)

    if (!isAvailable) {
      throw new Error("El horario seleccionado no está disponible")
    }

    return await bookingRepository.rescheduleBooking(bookingId, newSchedule)
  }

  /**
   * Obtiene los horarios disponibles para un servicio en una fecha
   */
  async getAvailableTimeSlots(serviceId, date) {
    return await bookingRepository.getAvailableTimeSlots(serviceId, date)
  }

  /**
   * Verifica si un horario está disponible
   */
  async checkAvailability(serviceId, date, time) {
    const availableSlots = await this.getAvailableTimeSlots(serviceId, date)
    return availableSlots.includes(time)
  }

  /**
   * Calcula el precio total de una reserva
   */
  async calculateTotalPrice(serviceId, options = {}) {
    const service = await serviceRepository.getServiceById(serviceId)

    if (!service) {
      throw new Error("Servicio no encontrado")
    }

    let total = service.price

    // Aplicar descuentos si existen
    if (options.discount) {
      total = total * (1 - options.discount)
    }

    // Aplicar impuestos
    if (options.includeTax) {
      total = total * 1.16 // 16% de IVA
    }

    return Number.parseFloat(total.toFixed(2))
  }

  /**
   * Valida los datos de una reserva
   * @private
   */
  _validateBookingData(bookingData) {
    const requiredFields = ["serviceId", "date", "time", "contactInfo"]

    for (const field of requiredFields) {
      if (!bookingData[field]) {
        throw new Error(`El campo ${field} es requerido`)
      }
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(bookingData.date)) {
      throw new Error("Formato de fecha inválido. Use YYYY-MM-DD")
    }

    // Validar formato de hora
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!timeRegex.test(bookingData.time)) {
      throw new Error("Formato de hora inválido. Use HH:MM")
    }

    // Validar información de contacto
    if (!bookingData.contactInfo.name || !bookingData.contactInfo.email) {
      throw new Error("La información de contacto debe incluir nombre y email")
    }
  }
}

export default new BookingService()

