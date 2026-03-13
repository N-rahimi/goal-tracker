import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { CATEGORIES, TRANSLATIONS } from "../../utils/constants";
import { Box, Typography, Paper } from "@mui/material";

const CategoryChart = ({ goals }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  // Prepare data for chart
  const data = CATEGORIES.map((cat) => {
    const catGoals = goals.filter((g) => g.category === cat.id);
    const completed = catGoals.filter((g) => g.status === "completed").length;
    const active = catGoals.filter((g) => g.status === "active").length;
    const paused = catGoals.filter((g) => g.status === "paused").length;

    return {
      name: cat.label[lang],
      active: active,
      completed: completed,
      paused: paused,
      total: catGoals.length,
      color: cat.color,
    };
  });

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper
          sx={{ p: 2, bgcolor: "background.paper", border: "1px solid #ccc" }}
        >
          <Typography variant="subtitle1" gutterBottom>
            {label}
          </Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" sx={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: "100%", height: 400, mt: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
        {t.goalDistribution || "Goals Distribution by Category"}
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: lang === "fa" ? 30 : 20,
            bottom: 5,
          }}
          direction={lang === "fa" ? "rtl" : "ltr"}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            interval={0}
            height={60}
            angle={lang === "fa" ? -15 : 0}
            textAnchor={lang === "fa" ? "end" : "middle"}
          />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              paddingTop: "20px",
              direction: lang === "fa" ? "rtl" : "ltr",
            }}
          />
          <Bar
            dataKey="active"
            name={lang === "fa" ? "فعال" : "Active"}
            fill="#4f46e5"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
          <Bar
            dataKey="completed"
            name={lang === "fa" ? "انجام شده" : "Completed"}
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
          <Bar
            dataKey="paused"
            name={lang === "fa" ? "متوقف شده" : "Paused"}
            fill="#f59e0b"
            radius={[4, 4, 0, 0]}
            maxBarSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoryChart;
