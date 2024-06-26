import { Box, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import YouTube from 'react-youtube';

import { useQuizDatabase } from '@/hooks/providers/QuizDatabaseProvider';
import theme from '@/styles/theme';

import {
  PlayerStates,
  useQuizPlayer,
} from '../../../hooks/providers/QuizPlayerProvider';

const QuizDetail = () => {
  const router = useRouter();
  const { data: quizzes } = useQuizDatabase();
  const {
    setQuizData,
    currentQuizIndex,
    answerMode,
    playerState,
    handleStateChange,
    handleReady,
  } = useQuizPlayer();

  const quiz = quizzes?.find((_quiz) => _quiz.id === router.query.quizId);

  const totalQuizCount = quiz?.quizItems.length ?? 0;

  useEffect(() => {
    if (!quiz) return;
    setQuizData(quiz);
  }, [quiz]);

  return (
    <>
      <Typography
        variant="h2"
        paragraph
        fontWeight={700}
        sx={
          useMediaQuery(theme.breakpoints.down('sm'))
            ? { fontSize: '2rem' }
            : {}
        }
      >
        {answerMode ? quiz?.quizItems[currentQuizIndex]?.answer : quiz?.name}
      </Typography>
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
          {totalQuizCount}개 중 &nbsp;
          <Typography variant="h6" component="span" color="secondary">
            {currentQuizIndex + 1}번째
          </Typography>
          &nbsp; 문제
        </Typography>
        <Box
          sx={{
            position: 'relative',
            width: useMediaQuery(theme.breakpoints.down('sm'))
              ? '80vw'
              : '60vw',
            height: useMediaQuery(theme.breakpoints.down('sm'))
              ? '34vh'
              : '54vh',
            background: 'black',
          }}
        >
          <YouTube
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: answerMode ? 1 : 0,
              zIndex: 3,
            }}
            videoId={quiz?.quizItems[currentQuizIndex]?.id ?? ''}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                disablekb: 1,
                controls: 0,
                rel: 0,
                modestbranding: 1,
                origin: process.env.NEXT_PUBLIC_BASE_URL,
              },
            }}
            onStateChange={handleStateChange}
            onReady={handleReady}
          />
          {!answerMode && (
            <Box
              sx={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h5"
                color="primary"
                fontWeight={700}
                sx={{
                  color: '#fff',
                  fontSize: '3rem',
                  textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                }}
              >
                {/* PlayerState를 가지고, PlayerStates의 값과 일치하는 키의 이름을 가져옴 */}
                {Object.keys(PlayerStates).find(
                  (key) =>
                    PlayerStates[key as keyof typeof PlayerStates] ===
                    playerState
                ) ?? ''}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default QuizDetail;
