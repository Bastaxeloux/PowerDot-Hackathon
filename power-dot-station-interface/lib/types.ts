export interface PredictionResult {
  probability: number // 0 à 1, où 1 est parfait et 0 est défaillant
  timestamp: string
}

export interface Connector {
  id: string
  type: string
  prediction: PredictionResult
  // Autres informations du backend à afficher plus tard
  serialNumber?: string
  installDate?: string
}

export interface ChargingStation {
  id: string
  name: string
  location: string
  connectors: Connector[]
  // Autres informations du backend à afficher plus tard
  connectivity?: string
  model?: string
  lastUpdated?: number
}

