import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { Brightness4, Brightness7, Language } from '@mui/icons-material';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../../utils/constants';

const Navbar = ({ toggleSidebar }) => {
  const { mode, toggleTheme } = useTheme();
  const { lang, toggleLanguage } = useLanguage();
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={toggleSidebar} sx={{ mr: 2, display: { sm: 'none' } }}>
          {/* Menu Icon for mobile */}
          <span style={{ fontSize: '24px' }}>☰</span>
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          GoalTracker
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/goals/new')}>{t.newGoal}</Button>
          <IconButton color="inherit" onClick={toggleLanguage}>
            <Language />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;