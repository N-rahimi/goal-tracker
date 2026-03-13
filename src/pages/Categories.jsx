import React from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS, CATEGORIES } from "../utils/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import CategoryChart from "../components/Charts/CategoryChart";

const Categories = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [goals] = useLocalStorage("goals", []);

  const getCategoryStats = (catId) => {
    const catGoals = goals.filter((g) => g.category === catId);
    const active = catGoals.filter((g) => g.status === "active").length;
    const completed = catGoals.filter((g) => g.status === "completed").length;
    return { active, completed, total: catGoals.length };
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        {t.categories}
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <CategoryChart goals={goals} />
      </Paper>

      <Grid container spacing={3}>
        {CATEGORIES.map((cat) => {
          const stats = getCategoryStats(cat.id);
          return (
            <Grid item xs={12} sm={6} md={3} key={cat.id}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderLeft: `5px solid ${cat.color}`,
                  height: "100%",
                }}
              >
                <Typography variant="h6" sx={{ color: cat.color, mb: 2 }}>
                  {cat.label[lang]}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Box>
                    <Typography variant="h4">{stats.active}</Typography>
                    <Typography variant="caption">{t.active}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h4">{stats.completed}</Typography>
                    <Typography variant="caption">{t.done}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Categories;
