"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

// Importar contexto y utilidades
import { useBookings } from "../context/BookingContext"
import { dateUtils } from "../utils/dateUtils"
import { BOOKING_STATUS } from "../config/constants"

export default function BookingsScreen({ navigation }) {
  const { upcomingBookings, pastBookings, isLoading, error, cancelBooking, refreshBookings } = useBookings()

  const [activeTab, setActiveTab] = useState("upcoming")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Manejar refresco de datos
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshBookings()
    setIsRefreshing(false)
  }

  // Manejar cancelación de reserva
  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId)
      // La lista se actualizará automáticamente a través del contexto
    } catch (err) {
      console.error("Error cancelling booking:", err)
      // Aquí podrías mostrar un mensaje de error
    }
  }

  // Obtener el color según el estado de la reserva
  const getStatusColor = (status) => {
    switch (status) {
      case BOOKING_STATUS.CONFIRMED:
        return "#10b981" // green
      case BOOKING_STATUS.PENDING:
        return "#f59e0b" // yellow
      case BOOKING_STATUS.COMPLETED:
        return "#3b82f6" // blue
      case BOOKING_STATUS.CANCELLED:
        return "#ef4444" // red
      default:
        return "#6b7280" // gray
    }
  }

  // Obtener la etiqueta según el estado de la reserva
  const getStatusLabel = (status) => {
    switch (status) {
      case BOOKING_STATUS.CONFIRMED:
        return "Confirmada"
      case BOOKING_STATUS.PENDING:
        return "Pendiente"
      case BOOKING_STATUS.COMPLETED:
        return "Completada"
      case BOOKING_STATUS.CANCELLED:
        return "Cancelada"
      default:
        return "Desconocido"
    }
  }

  // Renderizar item de reserva
  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View>
          <Text style={styles.businessName}>{item.business}</Text>
          <Text style={styles.serviceName}>{item.service}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(item.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{dateUtils.formatDate(item.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{dateUtils.formatTime(item.time)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
      </View>

      <View style={styles.bookingFooter}>
        {(item.status === BOOKING_STATUS.CONFIRMED || item.status === BOOKING_STATUS.PENDING) && (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                navigation.navigate("BookingDetail", {
                  serviceId: item.serviceId,
                  bookingId: item.id,
                  isRescheduling: true,
                })
              }
            >
              <Text style={styles.actionButtonText}>Reprogramar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleCancelBooking(item.id)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
        {item.status === BOOKING_STATUS.COMPLETED && (
          <TouchableOpacity
            style={styles.primaryButton}
            // Aquí podrías navegar a una pantalla de reseñas
            onPress={() => {}}
          >
            <Text style={styles.primaryButtonText}>Dejar reseña</Text>
          </TouchableOpacity>
        )}
        {item.status === BOOKING_STATUS.CANCELLED && (
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate("BookingDetail", {
                serviceId: item.serviceId,
              })
            }
          >
            <Text style={styles.primaryButtonText}>Reservar de nuevo</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
        >
          <Text style={[styles.tabText, activeTab === "upcoming" && styles.activeTabText]}>Próximas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text style={[styles.tabText, activeTab === "past" && styles.activeTabText]}>Pasadas</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="#6366f1" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={refreshBookings}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={activeTab === "upcoming" ? upcomingBookings : pastBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar" size={50} color="#ccc" />
              <Text style={styles.emptyText}>No tienes citas {activeTab === "upcoming" ? "próximas" : "pasadas"}</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
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
  listContainer: {
    padding: 15,
  },
  bookingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceName: {
    fontSize: 14,
    color: "#666666",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  bookingDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666666",
  },
  bookingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 15,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: "#374151",
    fontWeight: "500",
  },
  cancelButton: {
    borderColor: "#fee2e2",
    backgroundColor: "#fee2e2",
  },
  cancelButtonText: {
    color: "#ef4444",
    fontWeight: "500",
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#6366f1",
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  loader: {
    marginTop: 20,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
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
})

