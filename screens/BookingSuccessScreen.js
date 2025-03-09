import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

export default function BookingSuccessScreen({ route, navigation }) {
  const { service, selectedService, selectedDate, selectedTime } = route.params

  // Formatear la fecha para mostrarla
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.successContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#6366f1" />
          </View>
          <Text style={styles.successTitle}>¡Reserva confirmada!</Text>
          <Text style={styles.successMessage}>
            Tu cita ha sido reservada exitosamente. Hemos enviado los detalles a tu correo electrónico.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalles de la reserva</Text>
          <View style={styles.detailRow}>
            <Ionicons name="business-outline" size={20} color="#666" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>{service.name}</Text>
              <Text style={styles.detailSubtitle}>{service.location}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>Fecha</Text>
              <Text style={styles.detailSubtitle}>{formatDate(selectedDate)}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailTitle}>Hora</Text>
              <Text style={styles.detailSubtitle}>{selectedTime}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.serviceRow}>
            <Text style={styles.serviceName}>
              {selectedService.name} ({selectedService.duration})
            </Text>
            <Text style={styles.servicePrice}>${selectedService.price}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Subtotal</Text>
            <Text style={styles.priceValue}>${selectedService.price.toFixed(2)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${selectedService.price.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Mis Citas")}>
            <Text style={styles.primaryButtonText}>Ver mis citas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate("Inicio")}>
            <Text style={styles.secondaryButtonText}>Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContent: {
    padding: 20,
  },
  successContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  detailTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  detailSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 15,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceName: {
    fontSize: 16,
    fontWeight: "500",
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 14,
    color: "#666666",
  },
  priceValue: {
    fontSize: 14,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },
})

