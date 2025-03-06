import { Card, CardContent } from "@/components/ui/card"
import { ConnectorDetail } from "./connector-detail"
import { Bolt, MapPin, Zap, Clock } from "lucide-react"
import type { ChargingStation } from "@/lib/types"
import { ReliabilityGauge } from "./reliability-gauge"
import { Badge } from "@/components/ui/badge"

interface ChargingStationDetailProps {
  station: ChargingStation
}

export function ChargingStationDetail({ station }: ChargingStationDetailProps) {
  // Calculer la probabilité moyenne de tous les connecteurs
  const avgProbability =
    station.connectors.reduce((sum, connector) => sum + connector.prediction.probability, 0) / station.connectors.length

  // Fonction pour déterminer la classe de badge en fonction de la probabilité
  const getBadgeVariant = (prob: number) => {
    if (prob >= 0.8) return "success"
    if (prob >= 0.4) return "warning"
    return "destructive"
  }

  // Fonction pour déterminer le texte du badge en fonction de la probabilité
  const getBadgeText = (prob: number) => {
    if (prob >= 0.8) return "Fiable"
    if (prob >= 0.4) return "Attention"
    return "À risque"
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{station.name}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{station.location}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-center">
            <ReliabilityGauge percentage={avgProbability * 100} size="lg" />
            <Badge variant={getBadgeVariant(avgProbability) as any} className="mt-2">
              {getBadgeText(avgProbability)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Bolt className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Puissance maximale</p>
                  <p className="text-xl font-bold">{station.maxPower} kW</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Connecteurs</p>
                  <p className="text-xl font-bold">{station.connectors.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="bg-amber-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prédiction réalisée le</p>
                  <p className="text-lg font-medium">{station.connectors[0]?.prediction.timestamp || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-3">Distribution des fiabilités</h2>
          <div className="flex items-center justify-between">
            <div className="flex-1 h-6 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full"></div>
            {station.connectors.map((connector, index) => (
              <div
                key={index}
                className="h-8 w-1 bg-gray-800 rounded-full absolute"
                style={{
                  left: `calc(${connector.prediction.probability * 100}% + ${index * 2}px)`,
                  transform: "translateX(-50%)",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Prédictions par connecteur</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {station.connectors.map((connector) => (
            <ConnectorDetail key={connector.id} connector={connector} />
          ))}
        </div>
      </div>
    </div>
  )
}

