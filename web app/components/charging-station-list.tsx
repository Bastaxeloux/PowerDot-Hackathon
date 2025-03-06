"use client"

import { useState } from "react"
import { ChargingStationCard } from "./charging-station-card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllStations } from "@/lib/data"
import { Search, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ChargingStationList() {
  const stations = getAllStations()
  const [searchQuery, setSearchQuery] = useState("")
  const [reliabilityFilter, setReliabilityFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("reliability-desc")

  const filteredStations = stations.filter((station) => {
    const matchesSearch =
      station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      station.location.toLowerCase().includes(searchQuery.toLowerCase())

    const avgProbability =
      station.connectors.reduce((sum, connector) => sum + connector.prediction.probability, 0) /
      station.connectors.length

    let matchesReliability = true
    if (reliabilityFilter === "high") {
      matchesReliability = avgProbability >= 0.8
    } else if (reliabilityFilter === "medium") {
      matchesReliability = avgProbability >= 0.4 && avgProbability < 0.8
    } else if (reliabilityFilter === "low") {
      matchesReliability = avgProbability < 0.4
    }

    return matchesSearch && matchesReliability
  })

  // Trier les stations
  const sortedStations = [...filteredStations].sort((a, b) => {
    const avgProbA =
      a.connectors.reduce((sum, connector) => sum + connector.prediction.probability, 0) / a.connectors.length

    const avgProbB =
      b.connectors.reduce((sum, connector) => sum + connector.prediction.probability, 0) / b.connectors.length

    if (sortOrder === "reliability-desc") {
      return avgProbB - avgProbA
    } else if (sortOrder === "reliability-asc") {
      return avgProbA - avgProbB
    } else if (sortOrder === "name-asc") {
      return a.name.localeCompare(b.name)
    } else if (sortOrder === "name-desc") {
      return b.name.localeCompare(a.name)
    }
    return 0
  })

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une borne..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-lg"
            />
          </div>

          <div className="flex gap-2">
            <Select value={reliabilityFilter} onValueChange={setReliabilityFilter}>
              <SelectTrigger className="w-[180px] rounded-lg">
                <SelectValue placeholder="Fiabilité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les fiabilités</SelectItem>
                <SelectItem value="high">Haute fiabilité &gt;80%</SelectItem>
                <SelectItem value="medium">Fiabilité moyenne (40-80%)</SelectItem>
                <SelectItem value="low">Faible fiabilité &lt;40%</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-lg">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Trier
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Trier par</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortOrder} onValueChange={setSortOrder}>
                  <DropdownMenuRadioItem value="reliability-desc">Fiabilité (décroissante)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="reliability-asc">Fiabilité (croissante)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-asc">Nom (A-Z)</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-desc">Nom (Z-A)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {sortedStations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <p className="text-gray-600">Aucune borne ne correspond à votre recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedStations.map((station) => (
            <ChargingStationCard key={station.id} station={station} />
          ))}
        </div>
      )}
    </div>
  )
}

