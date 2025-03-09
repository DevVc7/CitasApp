import Link from "next/link"
import { Bell, CreditCard, HelpCircle, LogOut, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <h1 className="text-lg font-semibold">Mi perfil</h1>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-4 md:py-6">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle>Juan Pérez</CardTitle>
                  <CardDescription>juan.perez@ejemplo.com</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/profile/edit">Editar perfil</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">Cuenta</h2>
            <Card>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link href="/profile/payment-methods" className="flex items-center gap-3 p-4 hover:bg-accent">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <span>Métodos de pago</span>
                  </Link>
                  <Separator />
                  <Link href="/profile/notifications" className="flex items-center gap-3 p-4 hover:bg-accent">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span>Notificaciones</span>
                  </Link>
                  <Separator />
                  <Link href="/profile/settings" className="flex items-center gap-3 p-4 hover:bg-accent">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                    <span>Configuración</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>

            <h2 className="text-lg font-medium mt-6">Soporte</h2>
            <Card>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Link href="/help" className="flex items-center gap-3 p-4 hover:bg-accent">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    <span>Centro de ayuda</span>
                  </Link>
                  <Separator />
                  <Link href="/contact" className="flex items-center gap-3 p-4 hover:bg-accent">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                    <span>Contactar soporte</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Button variant="outline" className="w-full text-red-500 hover:text-red-500 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar sesión
              </Button>
            </div>
          </div>
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
            <Button variant="ghost" className="w-full flex flex-col h-auto py-2 px-0">
              <span className="text-xs">Citas</span>
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" className="w-full flex flex-col h-auto py-2 px-0 text-primary">
              <span className="text-xs">Perfil</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

