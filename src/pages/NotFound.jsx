import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { TRANSLATIONS } from "../utils/constants";

const NotFound = () => {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6" gutterBottom>
        Page Not Found
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        {t.dashboard}
      </Button>
    </Box>
  );
};

export default NotFound;
