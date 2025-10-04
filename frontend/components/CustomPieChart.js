import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import styled from "styled-components"

const COLORS = ["#4caf50", "#f44336"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  // Don't show labels on small screens
  if (window.innerWidth <= 428) {
    return null
  }

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontWeight="bold"
      fontSize="14px"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const ChartContainer = styled(ResponsiveContainer)`
    margin: 20px auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    padding: 20px;
    
    @media (max-width: 428px) {
      margin: 10px auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 10px;
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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
          fontSize: window.innerWidth <= 428 ? "12px" : "14px",
        }}
      >
        <p
          style={{ fontWeight: "bold", margin: "0 0 5px 0", fontSize: window.innerWidth <= 428 ? "12px" : "14px" }}
        >{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    )
  }
  return null
}

const CustomPieChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: window.innerWidth <= 428 ? 300 : 400, marginTop: 30, marginBottom: 30 }}>
      <ChartTitle>Attendance Overview</ChartTitle>
      <ChartContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={window.innerWidth <= 428 ? 90 : 130}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1500}
            animationBegin={300}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconSize={window.innerWidth <= 428 ? 8 : 12}
            formatter={(value) => (
              <span style={{ color: "#333", fontSize: window.innerWidth <= 428 ? "12px" : "14px", fontWeight: 500 }}>
                {value}
              </span>
            )}
          />
        </PieChart>
      </ChartContainer>
    </div>
  )
}

export default CustomPieChart
