import { cn } from "@/lib/utils"

type StatusType = "online" | "offline" | "warning" | "maintenance"

interface StatusIndicatorProps {
  status: StatusType
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  className?: string
}

export function StatusIndicator({ status, size = "md", showLabel = true, className }: StatusIndicatorProps) {
  const statusConfig = {
    online: {
      color: "bg-green-500",
      label: "En ligne",
    },
    offline: {
      color: "bg-red-500",
      label: "Hors ligne",
    },
    warning: {
      color: "bg-yellow-500",
      label: "Attention",
    },
    maintenance: {
      color: "bg-blue-500",
      label: "Maintenance",
    },
  }

  const sizeConfig = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  }

  return (
    <div className={cn("flex items-center", className)}>
      <span className={cn("rounded-full", sizeConfig[size], statusConfig[status].color)} />
      {showLabel && <span className="ml-2 text-sm font-medium text-gray-700">{statusConfig[status].label}</span>}
    </div>
  )
}

