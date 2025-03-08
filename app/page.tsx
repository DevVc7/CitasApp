import Link from "next/link"
import { Calendar, Clock, MapPin, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">CitaApp</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Link href="/auth">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Reserva tus citas fácilmente
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Gimnasios, clínicas, salones de belleza y más. Todo en un solo lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Link href="/services">
                  <Button size="lg">Reservar ahora</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Saber más
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Categorías populares</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/services/gym">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img src="/placeholder.svg?height=200&width=200" alt="Gimnasio" className="object-cover" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Gimnasios</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/services/clinic">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img src="/placeholder.svg?height=200&width=200" alt="Clínica" className="object-cover" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Clínicas</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/services/beauty">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          src="/placeholder.svg?height=200&width=200"
                          alt="Salón de belleza"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Belleza</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/services/more">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img src="/placeholder.svg?height=200&width=200" alt="Más servicios" className="object-cover" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">Más</h3>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-8">Cómo funciona</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Encuentra</h3>
                <p className="text-muted-foreground">Busca el servicio que necesitas cerca de ti</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Selecciona</h3>
                <p className="text-muted-foreground">Elige la fecha y hora que mejor te convenga</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Reserva</h3>
                <p className="text-muted-foreground">Confirma tu cita y recibe recordatorios</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-14">
          <p className="text-sm text-muted-foreground">© 2025 CitaApp. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Términos
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacidad
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

