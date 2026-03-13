export const calculateStreak = (logs) => {
  if (!logs || logs.length === 0) return 0;
  
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date) - new Date(a.date));
  const today = new Date().setHours(0,0,0,0);
  const yesterday = today - 86400000;
  
  let streak = 0;
  let currentDate = today;

  const lastLogDate = new Date(sortedLogs[0].date).setHours(0,0,0,0);
  if (lastLogDate !== today && lastLogDate !== yesterday) return 0;

  if (lastLogDate === yesterday) currentDate = yesterday;

  for (let log of sortedLogs) {
    const logDate = new Date(log.date).setHours(0,0,0,0);
    if (logDate === currentDate) {
      streak++;
      currentDate -= 86400000;
    } else if (logDate < currentDate) {
      break;
    }
  }
  return streak;
};

export const calculateXP = (logs) => {
  return logs.length * 20;
};