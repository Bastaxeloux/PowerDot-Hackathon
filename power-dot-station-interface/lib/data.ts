import type { ChargingStation } from "./types"

// Données de démonstration pour le hackathon
const stations: ChargingStation[] = [
  {
    id: "station-001",
    name: "37A80B4D",
    location: "",
    connectors: [
      {
        id: "conn-001-1",
        type: "Connecteur 1",
        prediction: {
          probability: 0.80,
          timestamp: "15/05/2024 14:32",
        },
        serialNumber: "CCS-2023-45678",
        installDate: "15/03/2023",
      },
      {
        id: "conn-001-2",
        type: "Connecteur 2",
        prediction: {
          probability: 0.78,
          timestamp: "15/05/2024 14:32",
        },
        serialNumber: "CHD-2023-12345",
        installDate: "15/03/2023",
      },
    ],
    connectivity: "4G + Ethernet",
    model: "Terra HP 350",
    lastUpdated: 5,
  },
]

export function getAllStations(): ChargingStation[] {
  return stations
}

export function getStationById(id: string): ChargingStation | undefined {
  return stations.find((station) => station.id === id)
}

