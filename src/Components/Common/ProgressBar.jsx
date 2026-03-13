import React from 'react';
import { LinearProgress, Box, Typography } from '@mui/material';

const ProgressBar = ({ current, target, color = 'primary' }) => {
  const percentage = Math.min(100, Math.round((current / target) * 100));

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">{current} / {target}</Typography>
        <Typography variant="caption" color="text.secondary">{percentage}%</Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={percentage} 
        color={color}
        sx={{ borderRadius: 5, height: 8 }} 
      />
    </Box>
  );
};

export default ProgressBar;