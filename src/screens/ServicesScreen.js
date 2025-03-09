"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

// Importar contexto y servicios
import { useServices } from "../context/ServiceContext"
import serviceService from "../services/serviceService"

export default function ServicesScreen({ navigation, route }) {
  const { categories, isLoading: isLoadingCategories } = useServices()

  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Cargar servicios cuando cambia la categoría o al iniciar
  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true)
        setError(null)

        let result
        if (activeCategory === "all") {
          result = await serviceService.getAllServices()
        } else {
          result = await serviceService.getServicesByCategory(activeCategory)
        }

        setServices(result)
      } catch (err) {
        setError("Error al cargar los servicios")
        console.error("Error loading services:", err)
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [activeCategory])

  // Manejar la búsqueda de servicios
  useEffect(() => {
    const searchServices = async () => {
      if (!searchQuery.trim()) return

      try {
        setIsLoading(true)
        setError(null)

        const result = await serviceService.searchServices(searchQuery)
        setServices(result)
      } catch (err) {
        setError("Error al buscar servicios")
        console.error("Error searching services:", err)
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce para evitar muchas búsquedas mientras se escribe
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim()) {
        searchServices()
      }
    }, 500)

    return () => clearTimeout(debounceTimeout)
  }, [searchQuery])

  // Verificar si hay una categoría en los parámetros de navegación
  useEffect(() => {
    if (route.params?.categoryId) {
      setActiveCategory(route.params.categoryId)
    }
  }, [route.params])

  // Renderizar item de categoría
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryButton, activeCategory === item.id && styles.activeCategoryButton]}
      onPress={() => setActiveCategory(item.id)}
    >
      <Text style={[styles.categoryButtonText, activeCategory === item.id && styles.activeCategoryButtonText]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  )

  // Renderizar item de servicio
  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate("BookingDetail", { serviceId: item.id })}
    >
      <Image source={item.image} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceCategory}>
          {item.category} • {item.location}
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFCC00" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews} reseñas)</Text>
        </View>
      </View>
      <View style={styles.serviceFooter}>
        <Text style={styles.servicePrice}>Desde ${item.price}</Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate("BookingDetail", { serviceId: item.id })}
        >
          <Text style={styles.bookButtonText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar servicios..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      {isLoadingCategories ? (
        <ActivityIndicator style={styles.loader} color="#6366f1" />
      ) : (
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
          />
        </View>
      )}

      {/* Services List */}
      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="#6366f1" />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => setActiveCategory(activeCategory)} // Recargar
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderServiceItem}
          contentContainerStyle={styles.servicesList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={50} color="#ccc" />
              <Text style={styles.emptyText}>No se encontraron servicios</Text>
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
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    margin: 15,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
  },
  activeCategoryButton: {
    backgroundColor: "#6366f1",
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  activeCategoryButtonText: {
    color: "#FFFFFF",
  },
  servicesList: {
    padding: 15,
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  serviceImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  serviceInfo: {
    padding: 15,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  serviceCategory: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  serviceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 5,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bookButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
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

