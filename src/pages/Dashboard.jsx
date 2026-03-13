import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import GoalCard from '../Components/Common/GoalCard';
import { calculateStreak, calculateXP } from '../utils/helpers';
import ConfirmDialog from '../Components/Common/ConfirmDialog';

const Dashboard = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();
  
  const [goals, setGoals] = useLocalStorage('goals', []);
  const [deleteId, setDeleteId] = useState(null);

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  
  const allLogs = goals.flatMap(g => g.logs || []);
  const totalXP = calculateXP(allLogs);
  const maxStreak = Math.max(...activeGoals.map(g => calculateStreak(g.logs)), 0);

  const handleLogProgress = (id) => {
    const updatedGoals = goals.map(g => {
      if (g.id === id) {
        const newProgress = g.progress + 1;
        const newLogs = [...(g.logs || []), { date: new Date().toISOString(), amount: 1 }];
        return { 
          ...g, 
          progress: newProgress, 
          logs: newLogs,
          status: newProgress >= g.target ? 'completed' : 'active'
        };
      }
      return g;
    });
    setGoals(updatedGoals);
  };

  const handleDelete = () => {
    setGoals(goals.filter(g => g.id !== deleteId));
    setDeleteId(null);
  };

  const handlePause = (id) => {
    const updatedGoals = goals.map(g => {
      if(g.id === id) return { ...g, status: g.status === 'paused' ? 'active' : 'paused' };
      return g;
    });
    setGoals(updatedGoals);
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>{t.welcome}</Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}>
            <Typography variant="h3">{totalXP}</Typography>
            <Typography variant="body1">{t.xp}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: 'secondary.main', color: 'white', textAlign: 'center' }}>
            <Typography variant="h3">{maxStreak}</Typography>
            <Typography variant="body1">{t.streak}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: 'info.main', color: 'white', textAlign: 'center' }}>
            <Typography variant="h3">{completedGoals.length}</Typography>
            <Typography variant="body1">{t.completed}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">{t.activeGoals}</Typography>
        <Button variant="contained" onClick={() => navigate('/goals')}>{t.goals}</Button>
      </Box>

      {activeGoals.length === 0 ? (
        <Typography color="text.secondary">{t.noGoals}</Typography>
      ) : (
        <Grid container spacing={3}>
          {activeGoals.map(goal => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>
              <GoalCard 
                goal={goal} 
                onEdit={(g) => navigate(`/goals/${g.id}`)} 
                onDelete={setDeleteId}
                onLog={handleLogProgress}
                onPause={handlePause}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <ConfirmDialog 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
      />
    </Box>
  );
};

export default Dashboard;