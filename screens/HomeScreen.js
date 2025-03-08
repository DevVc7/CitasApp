import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

export default function HomeScreen({ navigation }) {
  const categories = [
    { id: 1, name: "Gimnasios", icon: "barbell-outline" },
    { id: 2, name: "Clínicas", icon: "medical-outline" },
    { id: 3, name: "Belleza", icon: "cut-outline" },
    { id: 4, name: "Más", icon: "grid-outline" },
  ]

  const featuredServices = [
    {
      id: 1,
      name: "Gimnasio Fitness Plus",
      category: "Gimnasio",
      rating: 4.8,
      reviews: 120,
      image: require("../assets/gym.jpg"),
    },
    {
      id: 2,
      name: "Clínica Dental Sonrisa",
      category: "Salud",
      rating: 4.7,
      reviews: 85,
      image: require("../assets/dental.jpg"),
    },
    {
      id: 3,
      name: "Salón de Belleza Glamour",
      category: "Belleza",
      rating: 4.9,
      reviews: 210,
      image: require("../assets/beauty.jpg"),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Reserva tus citas fácilmente</Text>
          <Text style={styles.heroSubtitle}>Gimnasios, clínicas, salones de belleza y más. Todo en un solo lugar.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate("Servicios")}>
              <Text style={styles.primaryButtonText}>Reservar ahora</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Saber más</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categorías populares</Text>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => navigation.navigate("Servicios")}
              >
                <View style={styles.categoryIconContainer}>
                  <Ionicons name={category.icon} size={28} color="#6366f1" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Services */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Servicios destacados</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Servicios")}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {featuredServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate("BookingDetail", { serviceId: service.id })}
            >
              <Image source={service.image} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceCategory}>{service.category}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFCC00" />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                  <Text style={styles.reviewsText}>({service.reviews} reseñas)</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* How It Works */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Cómo funciona</Text>
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={styles.stepIconContainer}>
                <Ionicons name="search-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.stepTitle}>Encuentra</Text>
              <Text style={styles.stepDescription}>Busca el servicio que necesitas cerca de ti</Text>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepIconContainer}>
                <Ionicons name="calendar-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.stepTitle}>Selecciona</Text>
              <Text style={styles.stepDescription}>Elige la fecha y hora que mejor te convenga</Text>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepIconContainer}>
                <Ionicons name="checkmark-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.stepTitle}>Reserva</Text>
              <Text style={styles.stepDescription}>Confirma tu cita y recibe recordatorios</Text>
            </View>
          </View>
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
  heroSection: {
    padding: 20,
    alignItems: "center",
    marginTop: 10,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666666",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },
  primaryButton: {
    backgroundColor: "#6366f1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  secondaryButtonText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 16,
  },
  sectionContainer: {
    padding: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  seeAllText: {
    color: "#6366f1",
    fontWeight: "600",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: (width - 50) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryName: {
    fontWeight: "600",
    fontSize: 16,
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
  stepsContainer: {
    flexDirection: "column",
    gap: 20,
  },
  stepItem: {
    alignItems: "center",
  },
  stepIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  stepDescription: {
    textAlign: "center",
    color: "#666666",
    fontSize: 14,
  },
})

