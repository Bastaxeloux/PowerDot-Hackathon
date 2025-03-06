import { Card } from "@/components/ui/card"
import { MapPin, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { ChargingStation } from "@/lib/types"
import { ReliabilityGauge } from "./reliability-gauge"
import { Badge } from "@/components/ui/badge"

interface ChargingStationCardProps {
  station: ChargingStation
}

export function ChargingStationCard({ station }: ChargingStationCardProps) {
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
    <Card className="station-card overflow-hidden card-hover-effect">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold text-lg">{station.name}</h3>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{station.location}</span>
            </div>
          </div>
          <Badge variant={getBadgeVariant(avgProbability) as any}>{getBadgeText(avgProbability)}</Badge>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-primary mr-2" />
            <div>
              <p className="text-sm text-gray-500">Puissance</p>
              <p className="font-medium">{station.maxPower} kW</p>
            </div>
          </div>
          <ReliabilityGauge percentage={avgProbability * 100} />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Connecteurs:</p>
          {station.connectors.map((connector) => (
            <div key={connector.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{
                    backgroundColor:
                      connector.prediction.probability >= 0.8
                        ? "#4ade80"
                        : connector.prediction.probability >= 0.4
                          ? "#facc15"
                          : "#f87171",
                  }}
                ></div>
                <span className="text-sm">{connector.type}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">{Math.round(connector.prediction.probability * 100)}%</span>
                <div className="relative w-20 h-1">
                  <div className="connector-status-bar w-full"></div>
                  <div
                    className="connector-status-indicator"
                    style={{ left: `${connector.prediction.probability * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t bg-gray-50">
        <Button asChild variant="outline" className="w-full rounded-lg">
          <Link href={`/stations/${station.id}`}>Voir détails</Link>
        </Button>
      </div>
    </Card>
  )
}

