import LinearProgress from '@mui/material/LinearProgress';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { linearProgressClasses } from '@mui/material/LinearProgress';

interface ProgressBarProps {
  value: number
}
interface ProgressBarComponentProps {
  percentage: ProgressBarProps;
}
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));



export const ProgressBar: React.FC<ProgressBarComponentProps> = ({ percentage }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <BorderLinearProgress variant="determinate" value={percentage.value} />
    </Box>
  );
};







