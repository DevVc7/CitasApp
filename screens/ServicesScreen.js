"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

export default function ServicesScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["Todos", "Gimnasios", "Clínicas", "Belleza", "Spa", "Peluquerías"]

  const services = [
    {
      id: 1,
      name: "Gimnasio Fitness Plus",
      category: "Gimnasios",
      rating: 4.8,
      reviews: 120,
      price: "Desde $20",
      location: "Centro, Ciudad",
      image: require("../assets/gym.jpg"),
    },
    {
      id: 2,
      name: "Clínica Dental Sonrisa",
      category: "Clínicas",
      rating: 4.7,
      reviews: 85,
      price: "Desde $50",
      location: "Norte, Ciudad",
      image: require("../assets/dental.jpg"),
    },
    {
      id: 3,
      name: "Salón de Belleza Glamour",
      category: "Belleza",
      rating: 4.9,
      reviews: 210,
      price: "Desde $30",
      location: "Sur, Ciudad",
      image: require("../assets/beauty.jpg"),
    },
    {
      id: 4,
      name: "Spa Relax",
      category: "Spa",
      rating: 4.6,
      reviews: 95,
      price: "Desde $45",
      location: "Este, Ciudad",
      image: require("../assets/spa.jpg"),
    },
    {
      id: 5,
      name: "Peluquería Estilo",
      category: "Peluquerías",
      rating: 4.5,
      reviews: 150,
      price: "Desde $15",
      location: "Oeste, Ciudad",
      image: require("../assets/hair.jpg"),
    },
    {
      id: 6,
      name: "Centro Médico Salud",
      category: "Clínicas",
      rating: 4.8,
      reviews: 180,
      price: "Desde $60",
      location: "Centro, Ciudad",
      image: require("../assets/medical.jpg"),
    },
  ]

  // Filtrar servicios por categoría y búsqueda
  const filteredServices = services.filter((service) => {
    const matchesCategory = activeCategory === "Todos" || service.category === activeCategory
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

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
        <Text style={styles.servicePrice}>{item.price}</Text>
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
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.categoryButton, activeCategory === item && styles.activeCategoryButton]}
              onPress={() => setActiveCategory(item)}
            >
              <Text style={[styles.categoryButtonText, activeCategory === item && styles.activeCategoryButtonText]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Services List */}
      <FlatList
        data={filteredServices}
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
})

