import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaProvider } from "react-native-safe-area-context"

// Importar pantallas
import HomeScreen from "./screens/HomeScreen"
import ServicesScreen from "./screens/ServicesScreen"
import BookingsScreen from "./screens/BookingsScreen"
import ProfileScreen from "./screens/ProfileScreen"
import BookingDetailScreen from "./screens/BookingDetailScreen"
import BookingConfirmScreen from "./screens/BookingConfirmScreen"
import BookingSuccessScreen from "./screens/BookingSuccessScreen"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Navegación principal con tabs en la parte inferior
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Inicio") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Servicios") {
            iconName = focused ? "search" : "search-outline"
          } else if (route.name === "Mis Citas") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "Perfil") {
            iconName = focused ? "person" : "person-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#6366f1",
        tabBarInactiveTintColor: "gray",
        headerShown: true,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Servicios" component={ServicesScreen} />
      <Tab.Screen name="Mis Citas" component={BookingsScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen name="BookingDetail" component={BookingDetailScreen} options={{ title: "Reservar Cita" }} />
          <Stack.Screen
            name="BookingConfirm"
            component={BookingConfirmScreen}
            options={{ title: "Confirmar Reserva" }}
          />
          <Stack.Screen
            name="BookingSuccess"
            component={BookingSuccessScreen}
            options={{
              title: "Reserva Exitosa",
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

