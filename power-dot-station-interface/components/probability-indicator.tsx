import { cn } from "@/lib/utils"

interface ProbabilityIndicatorProps {
  probability: number // 0 à 1
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function ProbabilityIndicator({
  probability,
  size = "md",
  showValue = true,
  className,
}: ProbabilityIndicatorProps) {
  // Fonction pour déterminer la couleur en fonction de la probabilité
  const getColor = (prob: number) => {
    if (prob >= 0.8) return "bg-green-500"
    if (prob >= 0.6) return "bg-green-300"
    if (prob >= 0.4) return "bg-yellow-400"
    if (prob >= 0.2) return "bg-orange-500"
    return "bg-red-500"
  }

  // Fonction pour formater la probabilité en pourcentage
  const formatProbability = (prob: number) => {
    return `${Math.round(prob * 100)}%`
  }

  const sizeConfig = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  }

  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn("rounded-full", sizeConfig[size], getColor(probability))} />
      {showValue && <span className="ml-2 text-sm font-medium text-gray-700">{formatProbability(probability)}</span>}
    </div>
  )
}

