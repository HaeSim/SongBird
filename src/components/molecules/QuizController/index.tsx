// components/molecules/QuizController.jsx
import { Box, Button } from '@mui/material';
import React from 'react';

import { useQuizPlayer } from '@/components/organisms/QuizPlayer/QuizPlayerProvider';

const QuizController = () => {
  const {
    answerMode,
    handlePrevQuiz,
    handleNextQuiz,
    handlePlayWithSeconds,
    handleAnswerMode,
    playerState,
  } = useQuizPlayer();

  return (
    <Box>
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={handlePrevQuiz}
          style={{
            width: '48%',
            marginRight: '2%',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          이전
        </Button>
        <Button
          onClick={handleNextQuiz}
          style={{
            width: '48%',
            marginLeft: '2%',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          다음
        </Button>
      </Box>
      <Button
        onClick={() => handlePlayWithSeconds(1)}
        disabled={playerState === undefined}
      >
        1초
      </Button>
      <Button
        onClick={() => handlePlayWithSeconds(3)}
        disabled={playerState === undefined}
      >
        3초
      </Button>
      <Button onClick={handleAnswerMode}>
        {answerMode ? '퀴즈 모드' : '정답 모드'}
      </Button>
      <Button
        onClick={() => handlePlayWithSeconds(5)}
        disabled={playerState === undefined}
      >
        5초
      </Button>
      <Button
        onClick={() => handlePlayWithSeconds(10)}
        disabled={playerState === undefined}
      >
        10초
      </Button>
    </Box>
  );
};

export default QuizController;
