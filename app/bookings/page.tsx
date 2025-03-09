import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BookingsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Mis citas</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Tabs defaultValue="upcoming" className="mb-6">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="upcoming">Próximas</TabsTrigger>
              <TabsTrigger value="past">Pasadas</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-4">
                <AppointmentCard
                  status="confirmed"
                  business="Gimnasio Fitness Plus"
                  service="Entrenamiento personal"
                  date="15 de Marzo, 2025"
                  time="10:00 AM"
                  location="Av. Principal 123, Ciudad"
                />
                <AppointmentCard
                  status="pending"
                  business="Clínica Dental Sonrisa"
                  service="Limpieza dental"
                  date="22 de Marzo, 2025"
                  time="15:30 PM"
                  location="Calle Secundaria 456, Ciudad"
                />
              </div>
            </TabsContent>
            <TabsContent value="past" className="mt-6">
              <div className="space-y-4">
                <AppointmentCard
                  status="completed"
                  business="Salón de Belleza Glamour"
                  service="Corte de cabello"
                  date="1 de Marzo, 2025"
                  time="14:00 PM"
                  location="Plaza Central 789, Ciudad"
                />
                <AppointmentCard
                  status="cancelled"
                  business="Spa Relax"
                  service="Masaje relajante"
                  date="20 de Febrero, 2025"
                  time="11:00 AM"
                  location="Av. del Parque 321, Ciudad"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background py-2 md:hidden">
        <div className="container grid grid-cols-4 gap-1">
          <Link href="/">
            <Button variant="ghost" className="w-full flex flex-col h-auto py-2 px-0">
              <span className="text-xs">Inicio</span>
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="ghost" className="w-full flex flex-col h-auto py-2 px-0">
              <span className="text-xs">Explorar</span>
            </Button>
          </Link>
          <Link href="/bookings">
            <Button variant="ghost" className="w-full flex flex-col h-auto py-2 px-0 text-primary">
              <span className="text-xs">Citas</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" className="w-full flex flex-col h-auto py-2 px-0">
              <span className="text-xs">Perfil</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

interface AppointmentCardProps {
  status: "confirmed" | "pending" | "completed" | "cancelled"
  business: string
  service: string
  date: string
  time: string
  location: string
}

function AppointmentCard({ status, business, service, date, time, location }: AppointmentCardProps) {
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const statusLabels = {
    confirmed: "Confirmada",
    pending: "Pendiente",
    completed: "Completada",
    cancelled: "Cancelada",
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{business}</h3>
            <p className="text-muted-foreground">{service}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusLabels[status]}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 border-t flex gap-2">
        {(status === "confirmed" || status === "pending") && (
          <>
            <Button variant="outline" className="flex-1" asChild>
              <Link href={`/booking/reschedule/1`}>Reprogramar</Link>
            </Button>
            <Button variant="outline" className="flex-1 text-red-500 hover:text-red-500 hover:bg-red-50" asChild>
              <Link href={`/booking/cancel/1`}>Cancelar</Link>
            </Button>
          </>
        )}
        {status === "completed" && (
          <Button className="flex-1" asChild>
            <Link href={`/booking/review/1`}>Dejar reseña</Link>
          </Button>
        )}
        {status === "cancelled" && (
          <Button className="flex-1" asChild>
            <Link href={`/booking/1`}>Reservar de nuevo</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

