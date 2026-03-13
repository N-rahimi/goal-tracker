import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

import Navbar from './Components/Layout/Navbar';
import Sidebar from './Components/Layout/Sidebar';

import Dashboard from './pages/Dashboard';
import GoalsList from './pages/GoalsList';
import GoalForm from './pages/GoalForm';
import GoalDetails from './pages/GoalDetails';
import Categories from './pages/Categories';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#4f46e5' },
      secondary: { main: '#10b981' },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeProvider>
        <LanguageProvider>
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <Sidebar open={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} />
          
          <main style={{ paddingTop: '64px', minHeight: '100vh' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/goals" element={<GoalsList />} />
              <Route path="/goals/new" element={<GoalForm />} />
              <Route path="/goals/:id" element={<GoalDetails />} />
              <Route path="/goals/:id/edit" element={<GoalForm />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </LanguageProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;