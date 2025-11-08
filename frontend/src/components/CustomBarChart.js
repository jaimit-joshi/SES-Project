"use client"

import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import styled from "styled-components"
import { useEffect, useState } from "react"

const CustomTooltip = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #eaeaea;
  
  @media (max-width: 428px) {
    padding: 8px;
    border-radius: 6px;
  }
`

const TooltipText = styled.p`
  margin: 0;
  font-weight: 500;
  color: #333;
  font-size: 14px;
  line-height: 1.5;
  
  @media (max-width: 428px) {
    font-size: 12px;
    line-height: 1.4;
  }
`

const TooltipMain = styled.h3`
  margin: 0 0 8px 0;
  font-weight: 600;
  color: #000;
  font-size: 16px;
  
  @media (max-width: 428px) {
    font-size: 14px;
    margin: 0 0 4px 0;
  }
`

const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
  margin: 30px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    height: 400px;
    margin: 20px auto;
    padding: 15px;
  }
  
  @media (max-width: 428px) {
    height: 350px;
    margin: 15px auto;
    padding: 10px;
    border-radius: 8px;
  }
`

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-weight: 600;
  
  @media (max-width: 428px) {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`

const TooltipContent = ({ active, payload, dataKey }) => {
  if (active && payload && payload.length) {
    const { subject, attendancePercentage, totalClasses, attendedClasses, marksObtained, subName } = payload[0].payload

    return (
      <CustomTooltip>
        {dataKey === "attendancePercentage" ? (
          <>
            <TooltipMain>{subject}</TooltipMain>
            <TooltipText>
              Attended: {attendedClasses}/{totalClasses}
            </TooltipText>
            <TooltipText>{attendancePercentage}%</TooltipText>
          </>
        ) : (
          <>
            <TooltipMain>{subName?.subName || "Subject"}</TooltipMain>
            <TooltipText>Marks: {marksObtained}</TooltipText>
          </>
        )}
      </CustomTooltip>
    )
  }

  return null
}

const CustomBarChart = ({ chartData, dataKey }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setIsMobile(window.innerWidth <= 428)
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Check on initial render

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const distinctColors = generateDistinctColors(chartData?.length || 0)
  const title = dataKey === "attendancePercentage" ? "Attendance by Subject" : "Marks by Subject"
  const yAxisDomain = dataKey === "attendancePercentage" ? [0, 100] : [0, 100]

  // Adjust chart options based on screen size
  const xAxisProps = {
    dataKey: dataKey === "marksObtained" ? "subName.subName" : "subject",
    tick: { fill: "#333", fontSize: isMobile ? 10 : 12 },
    tickLine: { stroke: "#333" },
    axisLine: { stroke: "#333" },
    angle: isMobile ? -60 : -45,
    textAnchor: "end",
    height: isMobile ? 90 : 70,
    interval: 0,
  }

  const yAxisProps = {
    domain: yAxisDomain,
    tick: { fill: "#333", fontSize: isMobile ? 10 : 12 },
    tickLine: { stroke: "#333" },
    axisLine: { stroke: "#333" },
  }

  const legendProps = {
    verticalAlign: "top",
    height: 36,
    formatter: (value) => (
      <span
        style={{
          color: "#333",
          fontSize: isMobile ? "12px" : "14px",
          fontWeight: 500,
        }}
      >
        {value}
      </span>
    ),
    wrapperStyle: isMobile ? { fontSize: "12px" } : {},
  }

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={chartData}
          margin={isMobile ? { top: 20, right: 10, left: 0, bottom: 90 } : { top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <Tooltip content={<TooltipContent dataKey={dataKey} />} />
          <Legend {...legendProps} />
          <Bar
            dataKey={dataKey}
            name={dataKey === "attendancePercentage" ? "Attendance %" : "Marks"}
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
            animationBegin={300}
            barSize={isMobile ? 15 : 30}
          >
            {chartData?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={distinctColors[index % distinctColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

// Helper function to generate distinct colors
const generateDistinctColors = (count) => {
  const colors = []
  const goldenRatioConjugate = 0.618033988749895

  for (let i = 0; i < count; i++) {
    const hue = (i * goldenRatioConjugate) % 1
    const color = hslToRgb(hue, 0.7, 0.55)
    colors.push(`rgb(${color[0]}, ${color[1]}, ${color[2]})`)
  }

  return colors
}

// Helper function to convert HSL to RGB
const hslToRgb = (h, s, l) => {
  let r, g, b

  if (s === 0) {
    r = g = b = l // Achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

export default CustomBarChart
