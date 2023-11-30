import { Box, Typography } from '@mui/material';
import React from 'react';

interface IQuizDetailProps {
  selectedQuiz: Quiz | null;
  currentQuizIndex: number;
  answerMode: boolean;
}

const QuizDetail = ({
  selectedQuiz,
  currentQuizIndex,
  answerMode,
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
        {selectedQuiz?.quizItems.length} 개 중 {currentQuizIndex + 1}
      </Typography>
      <Box
        sx={{
          width: '600px',
          height: '400px',
          background: 'black',
        }}
      >
        {answerMode ? (
          <img
            src={
              selectedQuiz?.quizItems[currentQuizIndex]?.snippet.thumbnails.high
                .url
            }
            alt={selectedQuiz?.quizItems[currentQuizIndex]?.snippet.title}
            style={{ width: '100%', height: '100%' }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default QuizDetail;
