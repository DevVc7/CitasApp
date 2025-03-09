"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

export default function BookingConfirmScreen({ route, navigation }) {
  const { service, selectedService, selectedDate, selectedTime } = route.params

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Formatear la fecha para mostrarla
  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  const handleConfirm = () => {
    // En una app real, aquí enviarías los datos a tu API
    navigation.navigate("BookingSuccess", {
      service,
      selectedService,
      selectedDate,
      selectedTime,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Booking Details */}
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
        </View>

        {/* Contact Information */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Información de contacto</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre completo</Text>
            <TextInput style={styles.input} placeholder="Tu nombre" value={name} onChangeText={setName} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="tu@email.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 234 567 890"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Notas adicionales (opcional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Cualquier información adicional que quieras compartir"
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
            />
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Método de pago</Text>
          <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentMethod("card")}>
            <View style={styles.radioContainer}>
              <View style={[styles.radioOuter, paymentMethod === "card" && styles.radioOuterSelected]}>
                {paymentMethod === "card" && <View style={styles.radioInner} />}
              </View>
            </View>
            <View style={styles.paymentOptionContent}>
              <Ionicons name="card-outline" size={20} color="#666" />
              <Text style={styles.paymentOptionText}>Tarjeta de crédito/débito</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption} onPress={() => setPaymentMethod("cash")}>
            <View style={styles.radioContainer}>
              <View style={[styles.radioOuter, paymentMethod === "cash" && styles.radioOuterSelected]}>
                {paymentMethod === "cash" && <View style={styles.radioInner} />}
              </View>
            </View>
            <View style={styles.paymentOptionContent}>
              <Ionicons name="cash-outline" size={20} color="#666" />
              <Text style={styles.paymentOptionText}>Pagar en el local</Text>
            </View>
          </TouchableOpacity>
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

        {/* Confirm Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar y pagar</Text>
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
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
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  radioContainer: {
    marginRight: 10,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#6366f1",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#6366f1",
  },
  paymentOptionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentOptionText: {
    marginLeft: 10,
    fontSize: 16,
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
    padding: 20,
    paddingBottom: 30,
  },
  confirmButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

