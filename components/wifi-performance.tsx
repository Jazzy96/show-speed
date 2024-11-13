"use client"

import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WifiPerformance() {
  // CPE测量数据
  const cpeData = [
    { floor: 9, rssi: -74, downloadClosed: 50, uploadClosed: 34, downloadOpen: 39, uploadOpen: 37 },
    { floor: 8, rssi: -80, downloadClosed: 24, uploadClosed: 8, downloadOpen: 36, uploadOpen: 17 },
    { floor: 7, rssi: -82, downloadClosed: 14, uploadClosed: 3, downloadOpen: 0, uploadOpen: 0 },
    { floor: 6, rssi: -81, downloadClosed: 8, uploadClosed: 0.5, downloadOpen: 1, uploadOpen: 0.4 },
    { floor: 5, rssi: -79, downloadClosed: 7, uploadClosed: 1.9, downloadOpen: 0, uploadOpen: 0 },
    { floor: 4, rssi: -75, downloadClosed: 8, uploadClosed: 0.5, downloadOpen: 0.5, uploadOpen: 0 },
  ]

  // RN数据
  const rnData = [
    { floor: 9, rssi: -87, downloadOpen: 100, uploadOpen: 50 },
  ]

  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>WiFi性能分析</CardTitle>
          <CardDescription>比较不同楼层的CPE和RN配置</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="speeds" className="space-y-4">
            <TabsList>
              <TabsTrigger value="speeds">速度比较</TabsTrigger>
              <TabsTrigger value="rssi">RSSI值</TabsTrigger>
            </TabsList>
            
            <TabsContent value="speeds">
              <ChartContainer
                config={{
                  downloadClosed: {
                    label: "下载速度 (关窗)",
                    color: "hsl(var(--chart-1))",
                  },
                  uploadClosed: {
                    label: "上传速度 (关窗)",
                    color: "hsl(var(--chart-2))",
                  },
                  downloadOpen: {
                    label: "下载速度 (开窗)",
                    color: "hsl(var(--chart-3))",
                  },
                  uploadOpen: {
                    label: "上传速度 (开窗)",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[450px]"
              >
                <BarChart data={cpeData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="floor" label={{ value: '楼层', position: 'bottom' }} />
                  <YAxis label={{ value: '速度 (Mbps)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="downloadClosed" fill="var(--color-downloadClosed)" name="下载速度 (关窗)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="uploadClosed" fill="var(--color-uploadClosed)" name="上传速度 (关窗)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="downloadOpen" fill="var(--color-downloadOpen)" name="下载速度 (开窗)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="uploadOpen" fill="var(--color-uploadOpen)" name="上传速度 (开窗)" radius={[4, 4, 0, 0]} />
                </BarChart>
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
                  <XAxis dataKey="floor" label={{ value: '楼层', position: 'bottom' }} />
                  <YAxis label={{ value: 'RSSI (dBm)', angle: -90, position: 'insideLeft' }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
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