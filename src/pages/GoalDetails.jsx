import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, List, ListItem, ListItemText, Divider, Chip, Grid } from '@mui/material';
import { Edit, ArrowBack, CheckCircle, Pause, PlayArrow } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS, CATEGORIES } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';
import ProgressBar from '../Components/Common/ProgressBar';
import ConfirmDialog from '../Components/Common/ConfirmDialog';

const GoalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [goals, setGoals] = useLocalStorage('goals', []);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const goal = goals.find(g => g.id === id);
  const category = CATEGORIES.find(c => c.id === goal?.category) || CATEGORIES[3];

  if (!goal) return <Typography>Goal not found</Typography>;

  const handleLogProgress = () => {
    const updatedGoals = goals.map(g => {
      if (g.id === id) {
        const newProgress = g.progress + 1;
        return {
          ...g,
          progress: newProgress,
          logs: [...(g.logs || []), { date: new Date().toISOString(), amount: 1 }],
          status: newProgress >= g.target ? 'completed' : 'active'
        };
      }
      return g;
    });
    setGoals(updatedGoals);
  };

  const handleStatusToggle = () => {
    const updatedGoals = goals.map(g => 
      g.id === id ? { ...g, status: g.status === 'paused' ? 'active' : 'paused' } : g
    );
    setGoals(updatedGoals);
  };

  const handleDelete = () => {
    setGoals(goals.filter(g => g.id !== id));
    setDeleteOpen(false);
    navigate('/goals');
  };

  const sortedLogs = [...(goal.logs || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        {t.back}
      </Button>

      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2, flexWrap: 'wrap' }}>
          <Box>
            <Chip 
              label={category.label[lang]} 
              sx={{ bgcolor: `${category.color}20`, color: category.color, mb: 1 }} 
            />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              {goal.title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<Edit />} onClick={() => navigate(`/goals/${id}/edit`)}>
              {t.edit}
            </Button>
            <Button variant="outlined" color="error" startIcon={<CheckCircle />} onClick={() => setDeleteOpen(true)}>
              {t.delete}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>{t.status}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip 
                  label={goal.status.toUpperCase()} 
                  color={goal.status === 'completed' ? 'success' : goal.status === 'paused' ? 'warning' : 'primary'} 
                />
                <Button size="small" onClick={handleStatusToggle} disabled={goal.status === 'completed'}>
                  {goal.status === 'paused' ? <PlayArrow /> : <Pause />}
                  {goal.status === 'paused' ? t.continue : t.pause}
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle1" gutterBottom>{t.overallProgress}</Typography>
              <ProgressBar current={goal.progress} target={goal.target} />
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mt: 2 }} 
                onClick={handleLogProgress}
                disabled={goal.status === 'completed' || goal.status === 'paused'}
              >
                {t.addProgress} (+1)
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>{t.activityHistory}</Typography>
        {sortedLogs.length === 0 ? (
          <Typography color="text.secondary">{t.noActivity}</Typography>
        ) : (
          <List>
            {sortedLogs.slice(0, 10).map((log, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText 
                    primary={`+${log.amount} ${t.unit}`} 
                    secondary={new Date(log.date).toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')} 
                  />
                </ListItem>
                {index < sortedLogs.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>

      <ConfirmDialog 
        open={deleteOpen} 
        onClose={() => setDeleteOpen(false)} 
        onConfirm={handleDelete} 
      />
    </Container>
  );
};

export default GoalDetails;