"use client"

import { useEffect, useRef } from "react"

interface ReliabilityGaugeProps {
  percentage: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

export function ReliabilityGauge({ percentage, size = "md", showValue = true, className = "" }: ReliabilityGaugeProps) {
  const gaugeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (gaugeRef.current) {
      gaugeRef.current.style.setProperty("--percentage", percentage.toString())
    }
  }, [percentage])

  const sizeConfig = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  const fontSizeConfig = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  }

  return (
    <div className={`${sizeConfig[size]} ${className}`}>
      <div className="reliability-gauge" ref={gaugeRef}>
        <div className="gauge-bg"></div>
        <div className="gauge-center">
          {showValue && <span className={`font-bold ${fontSizeConfig[size]}`}>{Math.round(percentage)}%</span>}
        </div>
        <div className="gauge-indicator"></div>
      </div>
    </div>
  )
}

