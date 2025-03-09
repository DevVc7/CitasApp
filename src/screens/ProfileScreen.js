"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

// Importar contexto
import { useUser } from "../context/UserContext"

export default function ProfileScreen({ navigation }) {
  const { user, isLoading, error, refreshUserData } = useUser()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Manejar refresco de datos
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshUserData()
    setIsRefreshing(false)
  }

  // Manejar cierre de sesión
  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: () => {
          // Aquí implementarías la lógica de cierre de sesión
          // Por ahora solo mostramos un mensaje
          Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente")
        },
      },
    ])
  }

  if (isLoading && !user) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    )
  }

  if (error && !user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refreshUserData}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshing={isRefreshing} onRefresh={handleRefresh}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#666" />
          </View>
          <View>
            <Text style={styles.userName}>{user?.name || "Usuario"}</Text>
            <Text style={styles.userEmail}>{user?.email || "usuario@ejemplo.com"}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate("EditProfile")}>
          <Text style={styles.editProfileButtonText}>Editar perfil</Text>
        </TouchableOpacity>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("PaymentMethods")}>
              <Ionicons name="card-outline" size={22} color="#666" />
              <Text style={styles.menuItemText}>Métodos de pago</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Notifications")}>
              <Ionicons name="notifications-outline" size={22} color="#666" />
              <Text style={styles.menuItemText}>Notificaciones</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Settings")}>
              <Ionicons name="settings-outline" size={22} color="#666" />
              <Text style={styles.menuItemText}>Configuración</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Soporte</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("HelpCenter")}>
              <Ionicons name="help-circle-outline" size={22} color="#666" />
              <Text style={styles.menuItemText}>Centro de ayuda</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("ContactSupport")}>
              <Ionicons name="chatbubble-outline" size={22} color="#666" />
              <Text style={styles.menuItemText}>Contactar soporte</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" style={styles.menuItemIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
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
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#666666",
    marginTop: 2,
  },
  editProfileButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    alignItems: "center",
  },
  editProfileButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  menuItemIcon: {
    marginLeft: "auto",
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginHorizontal: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#fee2e2",
    backgroundColor: "#fee2e2",
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ef4444",
    marginLeft: 8,
  },
})

