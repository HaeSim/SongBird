import { Box, Typography } from '@mui/material';
import React from 'react';

interface IQuizDetailProps {
  totalQuizCount: number;
  currentQuizIndex: number;
  answerMode: boolean;
  ImageUrl: string;
}

const QuizDetail = ({
  totalQuizCount,
  currentQuizIndex,
  answerMode,
  ImageUrl,
}: IQuizDetailProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h6" align="center" color="primary">
        {totalQuizCount}개 중 {currentQuizIndex + 1}번째 문제
      </Typography>
      <Box
        sx={{
          width: '40vw',
          height: '50vh',
          background: 'black',
        }}
      >
        {answerMode ? (
          <img
            src={ImageUrl}
            alt="quiz album"
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default QuizDetail;
