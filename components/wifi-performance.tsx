"use client"

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WifiPerformance() {
  // 更新的CPE测量数据，楼层改为楼层落差
  const cpeData = [
    { floorDiff: 1, rssi: -74, downloadClosed: 50, uploadClosed: 34, downloadOpen: 39, uploadOpen: 37 },
    { floorDiff: 2, rssi: -80, downloadClosed: 24, uploadClosed: 8, downloadOpen: 36, uploadOpen: 17 },
    { floorDiff: 3, rssi: -82, downloadClosed: 14, uploadClosed: 3, downloadOpen: 0, uploadOpen: 0 },
    { floorDiff: 4, rssi: -81, downloadClosed: 8, uploadClosed: 0.5, downloadOpen: 1, uploadOpen: 0.4 },
    { floorDiff: 5, rssi: -79, downloadClosed: 7, uploadClosed: 1.9, downloadOpen: 0, uploadOpen: 0 },
    { floorDiff: 6, rssi: -75, downloadClosed: 8, uploadClosed: 0.5, downloadOpen: 0.5, uploadOpen: 0 },
  ]

  // 更新的RN数据，楼层改为楼层落差
  const rnData = [
    { floorDiff: 1, rssi: -87, downloadOpen: 100, uploadOpen: 50 },
  ]

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>WiFi性能分析</CardTitle>
          <CardDescription>比较CPE方案不同楼层落差的WiFi速率</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="speeds" className="space-y-4">
            <TabsList>
              <TabsTrigger value="speeds">速率比较</TabsTrigger>
              <TabsTrigger value="rssi">RSSI值</TabsTrigger>
            </TabsList>
            
            <TabsContent value="speeds">
              <ChartContainer
                config={{
                  downloadClosed: {
                    label: "下行速率 (关窗)",
                    color: "hsl(var(--chart-1))",
                  },
                  uploadClosed: {
                    label: "上行速率 (关窗)",
                    color: "hsl(var(--chart-2))",
                  },
                  downloadOpen: {
                    label: "下行速率 (开窗)",
                    color: "hsl(var(--chart-3))",
                  },
                  uploadOpen: {
                    label: "上行速率 (开窗)",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[450px]"
              >
                <LineChart data={cpeData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="floorDiff" 
                    label={{ value: '楼层落差', position: 'bottom' }} 
                    tickFormatter={(value) => `${value}`}
                  />
                  <YAxis label={{ value: '速率 (Mbps)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent title="速率" />} />
                  <Legend verticalAlign="top" height={36} />
                  <Line type="monotone" dataKey="downloadClosed" stroke="var(--color-downloadClosed)" name="下行速率 (关窗)" dot={true} />
                  <Line type="monotone" dataKey="uploadClosed" stroke="var(--color-uploadClosed)" name="上行速率 (关窗)" dot={true} />
                  <Line type="monotone" dataKey="downloadOpen" stroke="var(--color-downloadOpen)" name="下行速率 (开窗)" strokeDasharray="5 5" dot={true} />
                  <Line type="monotone" dataKey="uploadOpen" stroke="var(--color-uploadOpen)" name="上行速率 (开窗)" strokeDasharray="5 5" dot={true} />
                </LineChart>
              </ChartContainer>
            </TabsContent>

            <TabsContent value="rssi">
              <ChartContainer
                config={{
                  cpeRssi: {
                    label: "CPE RSSI",
                    color: "hsl(var(--chart-1))",
                  },
                  rnRssi: {
                    label: "RN RSSI",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[450px]"
              >
                <LineChart data={[...cpeData, ...rnData]} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="floorDiff" 
                    label={{ value: '楼层落差', position: 'bottom' }} 
                    tickFormatter={(value) => `${value}`}
                  />
                  <YAxis label={{ value: 'RSSI (dBm)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent title="RSSI" />} />
                  <Legend verticalAlign="top" height={36} />
                  <Line 
                    type="monotone" 
                    dataKey="rssi" 
                    stroke="var(--color-cpeRssi)" 
                    name="RSSI" 
                    dot={{ fill: "var(--color-cpeRssi)" }} 
                  />
                </LineChart>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
