import React, { useState } from 'react';
import { Container, Grid, Typography, Tabs, Tab, Box } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import GoalCard from '../Components/Common/GoalCard';
import ConfirmDialog from '../Components/Common/ConfirmDialog';
import { useNavigate } from 'react-router-dom';

const GoalsList = () => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const navigate = useNavigate();
  const [goals, setGoals] = useLocalStorage('goals', []);
  const [filter, setFilter] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const filteredGoals = goals.filter(g => {
    if (filter === 'all') return true;
    return g.status === filter;
  });

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
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>{t.goals}</Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={filter} onChange={(e, v) => setFilter(v)}>
          <Tab label="All" value="all" />
          <Tab label="Active" value="active" />
          <Tab label="Completed" value="completed" />
          <Tab label="Paused" value="paused" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredGoals.map(goal => (
          <Grid item xs={12} sm={6} md={4} key={goal.id}>
            <GoalCard 
              goal={goal} 
              onEdit={(g) => navigate(`/goals/${g.id}`)} 
              onDelete={setDeleteId}
              onLog={() => {}}
              onPause={handlePause}
            />
          </Grid>
        ))}
      </Grid>
      
      <ConfirmDialog 
        open={!!deleteId} 
        onClose={() => setDeleteId(null)} 
        onConfirm={handleDelete} 
      />
    </Container>
  );
};

export default GoalsList;