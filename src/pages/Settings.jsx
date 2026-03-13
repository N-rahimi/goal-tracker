import React from 'react';
import { Container, Paper, Typography, Switch, FormControlLabel, Box } from '@mui/material';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../utils/constants';

const Settings = () => {
  const { mode, toggleTheme } = useTheme();
  const { lang, toggleLanguage } = useLanguage();
  const { lang: currentLang } = useLanguage();
  const t = TRANSLATIONS[currentLang];

  return (
    <Container sx={{ mt: 5, maxWidth: 'sm' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>{t.settings}</Typography>
        
        <Box sx={{ mt: 3 }}>
          <FormControlLabel
            control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
            label="Dark Mode"
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={<Switch checked={lang === 'fa'} onChange={toggleLanguage} />}
            label={lang === 'en' ? "Switch to Persian (RTL)" : "Switch to English (LTR)"}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
           <button 
             onClick={() => { localStorage.clear(); window.location.reload(); }}
             style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
           >
             Reset All Data
           </button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;