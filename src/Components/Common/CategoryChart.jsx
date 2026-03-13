import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { CATEGORIES } from '../../utils/constants';
import { Box, Typography } from '@mui/material';

const CategoryChart = ({ goals }) => {
  const { lang } = useLanguage();

  const data = CATEGORIES.map(cat => {
    const catGoals = goals.filter(g => g.category === cat.id);
    const completed = catGoals.filter(g => g.status === 'completed').length;
    const active = catGoals.filter(g => g.status === 'active').length;
    return {
      name: cat.label[lang],
      active: active,
      completed: completed,
      color: cat.color
    };
  });

  return (
    <Box sx={{ width: '100%', height: 300, mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        {TRANSLATIONS[lang].goalDistribution}
      </Typography>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              border: '1px solid #ccc',
              direction: lang === 'fa' ? 'rtl' : 'ltr'
            }} 
          />
          <Bar dataKey="active" name={lang === 'fa' ? 'فعال' : 'Active'} fill="#4f46e5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="completed" name={lang === 'fa' ? 'انجام شده' : 'Completed'} fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoryChart;