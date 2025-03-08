import Link from "next/link"
import { Calendar, CheckCircle, Clock, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function BookingSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 container py-8 md:py-12 flex flex-col items-center">
        <div className="max-w-md w-full mx-auto text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">¡Reserva confirmada!</h1>
          <p className="text-muted-foreground">
            Tu cita ha sido reservada exitosamente. Hemos enviado los detalles a tu correo electrónico.
          </p>
        </div>

        <Card className="max-w-md w-full mb-6">
          <CardHeader>
            <CardTitle>Detalles de la reserva</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Nombre del Negocio</h3>
                  <p className="text-sm text-muted-foreground">Av. Principal 123, Ciudad</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Fecha</h3>
                  <p className="text-sm text-muted-foreground">Lunes, 15 de Marzo de 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="font-medium">Hora</h3>
                  <p className="text-sm text-muted-foreground">10:00 AM</p>
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Servicio seleccionado</h3>
                <div className="flex justify-between">
                  <span>Servicio Premium (45 min)</span>
                  <span className="font-semibold">$35.00</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start border-t px-6 py-4">
            <div className="flex justify-between w-full mb-2">
              <span>Subtotal</span>
              <span>$35.00</span>
            </div>
            <div className="flex justify-between w-full font-medium text-lg">
              <span>Total</span>
              <span>$35.00</span>
            </div>
          </CardFooter>
        </Card>

        <div className="flex flex-col gap-4 max-w-md w-full">
          <Button asChild>
            <Link href="/bookings">Ver mis citas</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

