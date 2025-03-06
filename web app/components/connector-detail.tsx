import { Card } from "@/components/ui/card"
import { Clock, Plug, Zap } from "lucide-react"
import type { Connector } from "@/lib/types"
import { ReliabilityGauge } from "./reliability-gauge"
import { Badge } from "@/components/ui/badge"

interface ConnectorDetailProps {
  connector: Connector
}

export function ConnectorDetail({ connector }: ConnectorDetailProps) {
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
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-3">
              <Plug className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold">{connector.type}</h3>
              <p className="text-sm text-gray-500">Connecteur #{connector.id}</p>
            </div>
          </div>
          <Badge variant={getBadgeVariant(connector.prediction.probability) as any}>
            {getBadgeText(connector.prediction.probability)}
          </Badge>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Zap className="h-4 w-4 text-gray-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Puissance</p>
                <p className="font-medium">{connector.power} kW</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <div>
                <p className="text-xs text-gray-500">Prédiction à</p>
                <p className="font-medium">{connector.prediction.timestamp}</p>
              </div>
            </div>
          </div>
          <ReliabilityGauge percentage={connector.prediction.probability * 100} />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Fiabilité prédite</span>
            <span className="text-sm font-medium">{Math.round(connector.prediction.probability * 100)}%</span>
          </div>
          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `${connector.prediction.probability * 100}%`,
                background: `linear-gradient(90deg, 
                  ${connector.prediction.probability < 0.4 ? "#f87171" : "#facc15"}, 
                  ${connector.prediction.probability >= 0.8 ? "#4ade80" : "#facc15"})`,
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Défaillant</span>
            <span className="text-xs text-gray-500">Parfait</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

