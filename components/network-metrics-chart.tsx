"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const networkData = [
  { floor: 1, downlink: 18.28, uplink: 1.75, rssi: -76 },
  { floor: 2, downlink: 27.84, uplink: 3.27, rssi: -76 },
  { floor: 3, downlink: 3.58, uplink: 0.66, rssi: -81 },
  { floor: 4, downlink: 3.13, uplink: 0.92, rssi: -86 },
  { floor: 5, downlink: 2.85, uplink: 0.58, rssi: -94 },
]

export function NetworkMetricsChart() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>无线网络性能指标</CardTitle>
          <CardDescription>不同楼层落差下的网络性能变化</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              downlink: {
                label: "下行速率 (Mbps)",
                color: "hsl(var(--chart-1))",
              },
              uplink: {
                label: "上行速率 (Mbps)", 
                color: "hsl(var(--chart-2))",
              },
              rssi: {
                label: "信号强度 (dBm)",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px]"
          >
            <LineChart
              data={networkData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="floor" 
                label={{ value: '楼层落差', position: 'bottom', offset: 0 }}
              />
              <YAxis 
                yAxisId="left" 
                domain={[0, 40]}
                label={{ value: '速率 (Mbps)', angle: -90, position: 'insideLeft', offset: 10 }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                domain={[-100, -70]}
                label={{ value: '信号强度 (dBm)', angle: 90, position: 'insideRight', offset: 10 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="downlink"
                stroke="var(--color-downlink)"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
                name="下行速率"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="uplink"
                stroke="var(--color-uplink)"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
                name="上行速率"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rssi"
                stroke="var(--color-rssi)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ strokeWidth: 2 }}
                name="信号强度"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}