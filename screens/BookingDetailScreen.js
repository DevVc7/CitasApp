"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { Calendar } from "react-native-calendars"

export default function BookingDetailScreen({ route, navigation }) {
  const { serviceId } = route.params
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedService, setSelectedService] = useState(null)
  const [activeTab, setActiveTab] = useState("service")

  // Datos de ejemplo - en una app real, estos vendrían de una API
  const service = {
    id: serviceId,
    name: "Gimnasio Fitness Plus",
    category: "Gimnasios",
    rating: 4.8,
    reviews: 120,
    location: "Av. Principal 123, Ciudad",
    hours: "Lun - Vie: 9:00 - 19:00, Sáb: 10:00 - 14:00",
    image: require("../assets/gym.jpg"),
    services: [
      { id: 1, name: "Entrenamiento Básico", price: 20, duration: "30 min" },
      { id: 2, name: "Entrenamiento Premium", price: 35, duration: "45 min" },
      { id: 3, name: "Entrenamiento Completo", price: 50, duration: "60 min" },
    ],
    availableTimes: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  }

  // Obtener la fecha actual para el calendario
  const today = new Date()
  const formattedToday = today.toISOString().split("T")[0]

  // Marcar la fecha seleccionada en el calendario
  const markedDates = {}
  if (selectedDate) {
    markedDates[selectedDate] = { selected: true, selectedColor: "#6366f1" }
  }

  const handleContinue = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      // En una app real, mostrarías un mensaje de error
      alert("Por favor selecciona un servicio, fecha y hora")
      return
    }

    navigation.navigate("BookingConfirm", {
      service,
      selectedService,
      selectedDate,
      selectedTime,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Service Image */}
        <Image source={service.image} style={styles.serviceImage} />

        {/* Service Info */}
        <View style={styles.serviceInfoContainer}>
          <Text style={styles.serviceName}>{service.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFCC00" />
            <Text style={styles.ratingText}>{service.rating}</Text>
            <Text style={styles.reviewsText}>({service.reviews} reseñas)</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{service.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={18} color="#666" />
            <Text style={styles.infoText}>{service.hours}</Text>
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
              {service.services.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.serviceOption, selectedService?.id === item.id && styles.selectedServiceOption]}
                  onPress={() => setSelectedService(item)}
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
                minDate={formattedToday}
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
              <View style={styles.timeGrid}>
                {service.availableTimes.map((time) => (
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
            </View>
          )}
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continuar</Text>
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
})

