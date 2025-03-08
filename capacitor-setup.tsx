"use client"

import { useEffect } from "react"
import { App } from "@capacitor/app"
import { StatusBar } from "@capacitor/status-bar"
import { SplashScreen } from "@capacitor/splash-screen"

// Este componente se usaría en tu layout principal
export function CapacitorSetup() {
  useEffect(() => {
    // Inicializar plugins de Capacitor
    if (typeof window !== "undefined" && window.Capacitor) {
      StatusBar.setBackgroundColor({ color: "#ffffff" })
      SplashScreen.hide()

      // Manejar el botón de retroceso en Android
      App.addListener("backButton", ({ canGoBack }) => {
        if (canGoBack) {
          window.history.back()
        } else {
          App.exitApp()
        }
      })
    }

    return () => {
      // Limpiar listeners cuando el componente se desmonte
      if (typeof window !== "undefined" && window.Capacitor) {
        App.removeAllListeners()
      }
    }
  }, [])

  return null
}

