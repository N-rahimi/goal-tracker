import React from "react";
import { Chip } from "@mui/material";
import { useLanguage } from "../../contexts/LanguageContext";
import { CATEGORIES } from "../../utils/constants";

const CategoryBadge = ({ categoryId }) => {
  const { lang } = useLanguage();
  const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[3];

  return (
    <Chip
      label={category.label[lang]}
      size="small"
      sx={{
        bgcolor: `${category.color}20`,
        color: category.color,
        fontWeight: "bold",
      }}
    />
  );
};

export default CategoryBadge;
