import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Chip, Box } from '@mui/material';
import { Edit, Delete, PlayArrow, Pause, CheckCircle } from '@mui/icons-material';
import { useLanguage } from '../../context/LanguageContext';
import { TRANSLATIONS, CATEGORIES } from '../../utils/constants';
import ProgressBar from './ProgressBar';

const GoalCard = ({ goal, onEdit, onDelete, onLog, onPause }) => {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  
  const category = CATEGORIES.find(c => c.id === goal.category) || CATEGORIES[3];
  const isCompleted = goal.status === 'completed';
  const isPaused = goal.status === 'paused';

  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      borderRadius: 3,
      boxShadow: 3,
      borderLeft: isCompleted ? `5px solid ${category.color}` : 'none',
      opacity: isPaused ? 0.7 : 1
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
          <Chip 
            label={category.label[lang]} 
            size="small" 
            sx={{ bgcolor: `${category.color}20`, color: category.color, fontWeight: 'bold' }} 
          />
          {isCompleted && <CheckCircle color="success" />}
        </Box>
        
        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
          {goal.title}
        </Typography>
        
        <ProgressBar current={goal.progress} target={goal.target} />
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
           {goal.type === 'daily' ? 'Daily Habit' : 'Target Goal'}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
        {!isCompleted && !isPaused && (
          <Button size="small" startIcon={<CheckCircle />} onClick={() => onLog(goal.id)} color="success">
            {t.addProgress}
          </Button>
        )}
        
        {!isCompleted && (
          <Button size="small" color="warning" onClick={() => onPause(goal.id)}>
            {isPaused ? <PlayArrow /> : <Pause />}
          </Button>
        )}

        <Box>
          <Button size="small" onClick={() => onEdit(goal)}><Edit /></Button>
          <Button size="small" color="error" onClick={() => onDelete(goal.id)}><Delete /></Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default GoalCard;