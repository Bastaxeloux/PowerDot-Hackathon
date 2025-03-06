import { ChargingStationList } from "@/components/charging-station-list"
import { Header } from "@/components/header"
import { BatteryCharging, Zap, AlertTriangle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">
            <span className="gradient-text">Prédiction d'État des Connecteurs</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Visualisation des résultats de notre modèle de prédiction de fiabilité des connecteurs sur les bornes de
            recharge Power Dot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <BatteryCharging className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Bornes analysées</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Connecteurs prédits</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Connecteurs à risque</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>

        <ChargingStationList />
      </main>
    </div>
  )
}

