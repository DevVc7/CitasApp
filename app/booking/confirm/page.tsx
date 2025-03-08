import Link from "next/link"
import { ArrowLeft, Calendar, Clock, CreditCard, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function ConfirmBookingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/booking/1" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Volver</span>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Confirmar reserva</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card className="mb-6">
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
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información de contacto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" placeholder="+1 234 567 890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Textarea id="notes" placeholder="Cualquier información adicional que quieras compartir" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Método de pago</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="card" className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Tarjeta de crédito/débito
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Pagar en el local</Label>
                </div>
              </RadioGroup>
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

          <div className="mt-8">
            <Button className="w-full" size="lg" asChild>
              <Link href="/booking/success">Confirmar y pagar</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

