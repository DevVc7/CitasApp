"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { Calendar } from "react-native-calendars"

// Importar servicios y utilidades
import serviceService from "../services/serviceService"
import bookingService from "../services/bookingService"
import { dateUtils } from "../utils/dateUtils"

export default function BookingDetailScreen({ route, navigation }) {
  const { serviceId, bookingId, isRescheduling } = route.params || {}

  const [service, setService] = useState(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedServiceOption, setSelectedServiceOption] = useState(null)
  const [activeTab, setActiveTab] = useState("service")
  const [availableTimes, setAvailableTimes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar datos del servicio
  useEffect(() => {
    const loadServiceDetails = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const serviceDetails = await serviceService.getServiceById(serviceId)
        if (!serviceDetails) {
          throw new Error("Servicio no encontrado")
        }

        setService(serviceDetails)

        // Si estamos reprogramando, cargar los datos de la reserva
        if (isRescheduling && bookingId) {
          // Aquí podrías cargar los datos de la reserva existente
          // Por ahora, solo establecemos la fecha actual
          setSelectedDate(dateUtils.getCurrentDate())
        }
      } catch (err) {
        setError("Error al cargar los detalles del servicio")
        console.error("Error loading service details:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadServiceDetails()
  }, [serviceId, bookingId, isRescheduling])

  // Cargar horarios disponibles cuando cambia la fecha
  useEffect(() => {
    const loadAvailableTimes = async () => {
      if (!selectedDate || !service) return

      try {
        setIsLoading(true)
        const times = await bookingService.getAvailableTimeSlots(serviceId, selectedDate)
        setAvailableTimes(times)
      } catch (err) {
        console.error("Error loading available times:", err)
        // No establecemos error global para no interrumpir la experiencia
      } finally {
        setIsLoading(false)
      }
    }

    loadAvailableTimes()
  }, [selectedDate, service, serviceId])

  // Marcar la fecha seleccionada en el calendario
  const markedDates = {}
  if (selectedDate) {
    markedDates[selectedDate] = { selected: true, selectedColor: "#6366f1" }
  }

  // Manejar la continuación del proceso de reserva
  const handleContinue = () => {
    if (!selectedServiceOption || !selectedDate || !selectedTime) {
      Alert.alert("Información incompleta", "Por favor selecciona un servicio, fecha y hora para continuar")
      return
    }

    navigation.navigate("BookingConfirm", {
      service,
      selectedService: selectedServiceOption,
      selectedDate,
      selectedTime,
      isRescheduling,
      bookingId,
    })
  }

  if (isLoading && !service) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    )
  }

  if (error && !service) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Service Image */}
        <Image source={service?.image} style={styles.serviceImage} />

        {/* Service Info */}
        <View style={styles.serviceInfoContainer}>
          <Text style={styles.serviceName}>{service?.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFCC00" />
            <Text style={styles.ratingText}>{service?.rating}</Text>
            <Text style={styles.reviewsText}>({service?.reviews} reseñas)</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{service?.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{service?.hours}</Text>
          </View>
        </View>

        {/* Booking Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "service" && styles.activeTab]}
            onPress={() => setActiveTab("service")}
          >
            <Text style={[styles.tabText, activeTab === "service" && styles.activeTabText]}>Servicio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "date" && styles.activeTab]}
            onPress={() => setActiveTab("date")}
          >
            <Text style={[styles.tabText, activeTab === "date" && styles.activeTabText]}>Fecha</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "time" && styles.activeTab]}
            onPress={() => setActiveTab("time")}
          >
            <Text style={[styles.tabText, activeTab === "time" && styles.activeTabText]}>Hora</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={styles.tabContent}>
          {activeTab === "service" && (
            <View>
              <Text style={styles.sectionTitle}>Selecciona un servicio</Text>
              {service?.services.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.serviceOption, selectedServiceOption?.id === item.id && styles.selectedServiceOption]}
                  onPress={() => setSelectedServiceOption(item)}
                >
                  <View>
                    <Text style={styles.serviceOptionName}>{item.name}</Text>
                    <Text style={styles.serviceOptionDuration}>{item.duration}</Text>
                  </View>
                  <Text style={styles.serviceOptionPrice}>${item.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {activeTab === "date" && (
            <View>
              <Text style={styles.sectionTitle}>Selecciona una fecha</Text>
              <Calendar
                minDate={dateUtils.getCurrentDate()}
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={markedDates}
                theme={{
                  todayTextColor: "#6366f1",
                  selectedDayBackgroundColor: "#6366f1",
                  arrowColor: "#6366f1",
                }}
              />
            </View>
          )}

          {activeTab === "time" && (
            <View>
              <Text style={styles.sectionTitle}>Selecciona una hora</Text>
              {isLoading ? (
                <ActivityIndicator style={styles.loader} color="#6366f1" />
              ) : availableTimes.length === 0 ? (
                <Text style={styles.noTimesText}>No hay horarios disponibles para la fecha seleccionada</Text>
              ) : (
                <View style={styles.timeGrid}>
                  {availableTimes.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[styles.timeOption, selectedTime === time && styles.selectedTimeOption]}
                      onPress={() => setSelectedTime(time)}
                    >
                      <Text style={[styles.timeOptionText, selectedTime === time && styles.selectedTimeOptionText]}>
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>{isRescheduling ? "Reprogramar cita" : "Continuar"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ef4444",
    marginBottom: 15,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  serviceImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  serviceInfoContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  serviceName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 14,
  },
  reviewsText: {
    marginLeft: 5,
    color: "#666666",
    fontSize: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666666",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#6366f1",
  },
  tabText: {
    fontSize: 16,
    color: "#666666",
  },
  activeTabText: {
    color: "#6366f1",
    fontWeight: "600",
  },
  tabContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  serviceOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedServiceOption: {
    borderColor: "#6366f1",
    backgroundColor: "rgba(99, 102, 241, 0.05)",
  },
  serviceOptionName: {
    fontSize: 16,
    fontWeight: "600",
  },
  serviceOptionDuration: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  serviceOptionPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  timeOption: {
    width: "30%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedTimeOption: {
    borderColor: "#6366f1",
    backgroundColor: "#6366f1",
  },
  timeOptionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedTimeOptionText: {
    color: "#FFFFFF",
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  continueButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loader: {
    marginVertical: 20,
  },
  noTimesText: {
    textAlign: "center",
    color: "#666666",
    marginVertical: 20,
  },
})

