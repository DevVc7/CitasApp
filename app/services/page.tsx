import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ServicesPage() {
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
          <h1 className="text-lg font-semibold">Servicios</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar servicios..."
              className="w-full bg-background pl-8 md:w-2/3 lg:w-1/2"
            />
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList className="w-full md:w-auto overflow-auto">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="gym">Gimnasios</TabsTrigger>
              <TabsTrigger value="clinic">Clínicas</TabsTrigger>
              <TabsTrigger value="beauty">Belleza</TabsTrigger>
              <TabsTrigger value="more">Más</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <ServiceCard key={i} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="gym" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <ServiceCard key={i} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="clinic" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2].map((i) => (
                  <ServiceCard key={i} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="beauty" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1].map((i) => (
                  <ServiceCard key={i} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="more" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <ServiceCard key={i} />
                ))}
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
            <Button variant="ghost" className="w-full flex flex-col h-auto py-2 px-0 text-primary">
              <span className="text-xs">Explorar</span>
            </Button>
          </Link>
          <Link href="/bookings">
            <Button variant="ghost" className="w-full flex flex-col h-auto py-2 px-0">
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

function ServiceCard() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-video bg-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <img src="/placeholder.svg?height=200&width=400" alt="Servicio" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">Nombre del Servicio</h3>
          <p className="text-sm text-muted-foreground mb-2">Categoría • Ubicación</p>
          <div className="flex items-center text-sm">
            <span className="font-medium">4.8</span>
            <span className="text-muted-foreground ml-1">(120 reseñas)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div>
          <span className="font-semibold">Desde $20</span>
        </div>
        <Link href="/booking/1">
          <Button>Reservar</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

