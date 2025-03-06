import { ChargingStationDetail } from "@/components/charging-station-detail"
import { Header } from "@/components/header"
import { getStationById } from "@/lib/data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StationDetailPage({ params }: { params: { id: string } }) {
  const station = getStationById(params.id)

  if (!station) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/" className="flex items-center text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Link>
          </Button>
          <div className="p-8 bg-white rounded-xl shadow-md text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Borne non trouvée</h1>
            <p className="text-gray-600">La borne que vous recherchez n'existe pas ou n'est plus disponible.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/" className="flex items-center text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Link>
        </Button>
        <ChargingStationDetail station={station} />
      </main>
    </div>
  )
}

