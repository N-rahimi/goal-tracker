import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Dashboard,
  Flag,
  Category,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { TRANSLATIONS } from "../../utils/constants";

const Sidebar = ({ open, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  const menuItems = [
    { text: t.dashboard, icon: <Dashboard />, path: "/" },
    { text: t.goals, icon: <Flag />, path: "/goals" },
    { text: t.categories, icon: <Category />, path: "/categories" },
    { text: t.settings, icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={toggleSidebar}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
      }}
    >
      <Box sx={{ height: 64 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              toggleSidebar();
            }}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
