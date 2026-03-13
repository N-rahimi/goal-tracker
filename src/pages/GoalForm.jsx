import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, MenuItem, Box, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { TRANSLATIONS, CATEGORIES } from '../utils/constants';
import { useLocalStorage } from '../hooks/useLocalStorage';

const GoalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  const [goals, setGoals] = useLocalStorage('goals', []);
  
  const isEdit = !!id;
  const existingGoal = isEdit ? goals.find(g => g.id === id) : null;

  const [formData, setFormData] = useState({
    title: '',
    category: 'personal',
    type: 'count',
    target: 10,
    status: 'active'
  });

  useEffect(() => {
    if (existingGoal) {
      setFormData({
        title: existingGoal.title,
        category: existingGoal.category,
        type: existingGoal.type,
        target: existingGoal.target,
        status: existingGoal.status
      });
    }
  }, [existingGoal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    if (isEdit) {
      setGoals(goals.map(g => g.id === id ? { ...g, ...formData } : g));
    } else {
      const newGoal = {
        id: Date.now().toString(),
        ...formData,
        progress: 0,
        logs: [],
        createdAt: new Date().toISOString()
      };
      setGoals([...goals, newGoal]);
    }
    navigate(isEdit ? `/goals/${id}` : '/goals');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>{isEdit ? t.edit : t.newGoal}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth label={t.title} margin="normal" required
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
          <TextField
            select fullWidth label={t.category} margin="normal" required
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          >
            {CATEGORIES.map(cat => (
              <MenuItem key={cat.id} value={cat.id}>{cat.label[lang]}</MenuItem>
            ))}
          </TextField>
          <TextField
            type="number" fullWidth label={t.target} margin="normal" required
            value={formData.target}
            onChange={e => setFormData({...formData, target: Number(e.target.value)})}
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" fullWidth>{t.save}</Button>
            <Button variant="outlined" fullWidth onClick={() => navigate(isEdit ? `/goals/${id}` : '/goals')}>{t.cancel}</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default GoalForm;