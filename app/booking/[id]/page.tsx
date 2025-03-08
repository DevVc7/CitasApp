"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookingPage({ params }: { params: { id: string } }) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const availableTimes = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  const services = [
    { id: "1", name: "Servicio Básico", price: 20, duration: "30 min" },
    { id: "2", name: "Servicio Premium", price: 35, duration: "45 min" },
    { id: "3", name: "Servicio Completo", price: 50, duration: "60 min" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/services" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Reservar cita</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=300&width=600"
                    alt="Servicio"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">Nombre del Negocio</h2>
                <div className="flex items-center gap-1 text-sm mb-4">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-medium">4.8</span>
                  <span className="text-muted-foreground">(120 reseñas)</span>
                </div>
                <div className="flex items-start gap-2 text-sm mb-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span>Av. Principal 123, Ciudad</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <span>Lun - Vie: 9:00 - 19:00, Sáb: 10:00 - 14:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="service" className="mb-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="service">Servicio</TabsTrigger>
              <TabsTrigger value="date">Fecha</TabsTrigger>
              <TabsTrigger value="time">Hora</TabsTrigger>
            </TabsList>
            <TabsContent value="service" className="mt-6">
              <h3 className="text-lg font-medium mb-4">Selecciona un servicio</h3>
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedService === service.id ? "border-primary bg-primary/5" : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">{service.duration}</p>
                      </div>
                      <div className="font-semibold">${service.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="date" className="mt-6">
              <h3 className="text-lg font-medium mb-4">Selecciona una fecha</h3>
              <div className="flex justify-center">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={{ before: new Date() }}
                />
              </div>
            </TabsContent>
            <TabsContent value="time" className="mt-6">
              <h3 className="text-lg font-medium mb-4">Selecciona una hora</h3>
              <div className="grid grid-cols-3 gap-3">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="h-12"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Button className="w-full" size="lg" asChild>
              <Link href="/booking/confirm">Continuar</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

