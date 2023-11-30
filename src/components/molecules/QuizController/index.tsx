// components/molecules/QuizController.jsx
import { Box, Button, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { YouTubePlayer } from 'react-youtube';
import YouTube from 'react-youtube';

import theme from '@/styles/theme';
import { schoolPride } from '@/utils/confetti';

interface IQuizControllerProps {
  quiz: Quiz | undefined;
  answerMode: boolean;
  setAnswerMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentQuizIndex: number;
  setCurrentQuizIndex: React.Dispatch<React.SetStateAction<number>>;
}

const QuizController = ({
  quiz,
  answerMode,
  setAnswerMode,
  currentQuizIndex,
  setCurrentQuizIndex,
}: IQuizControllerProps) => {
  const [player, setPlayer] = useState<YouTubePlayer | undefined>(undefined);
  // const { setVideo, play, pause, seekTo, videoId } = useYoutube();

  // 제어함수
  // 이전 문제
  const handlePrev = () => {
    setCurrentQuizIndex((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  };

  // 다음 문제
  const handleNext = () => {
    setCurrentQuizIndex((prev) => {
      if (prev === (quiz?.quizItems.length ?? 0) - 1) {
        return prev;
      }
      return prev + 1;
    });
  };

  // 1. N초 재생
  const handlePlayWithSeconds = (seconds: number) => {
    player?.seekTo(0, true);
    player?.playVideo();
    setTimeout(() => {
      player?.pauseVideo();
    }, seconds * 1000);
  };

  const handleToggleMode = () => {
    setAnswerMode((prev) => !prev);
  };

  // 2. 정답 재생
  useEffect(() => {
    if (!player) return;

    async function playAnswer() {
      player?.seekTo(quiz?.quizItems[currentQuizIndex]?.answerTime ?? 40, true);
      player?.playVideo();
    }

    if (answerMode) {
      playAnswer();
      // fireworks();
      schoolPride();
      return;
    }
    player.pauseVideo();
  }, [answerMode]);

  // 3. 현재문제 바꼈을 때 setVideo
  useEffect(() => {
    if (!quiz) return;
    if (!player) return;

    player.loadVideoById(quiz?.quizItems[currentQuizIndex]?.id ?? '');
  }, [currentQuizIndex]);

  return (
    <>
      <Box>
        <Button onClick={handlePrev}>이전</Button>
        <Button onClick={handleToggleMode}>
          {answerMode ? '퀴즈 모드' : '정답 모드'}
        </Button>
        <Button onClick={handleNext}>다음</Button>
        <Button onClick={() => handlePlayWithSeconds(1)}>1초</Button>
        <Button onClick={() => handlePlayWithSeconds(3)}>3초</Button>
        <Button onClick={() => handlePlayWithSeconds(5)}>5초</Button>
        <Button onClick={() => handlePlayWithSeconds(10)}>10초</Button>
        <Button onClick={() => player?.playVideo()}>재생</Button>
        <Button onClick={() => player?.pauseVideo()}>일시정지</Button>
      </Box>
      <YouTube
        style={{
          display: useMediaQuery(theme.breakpoints.down('sm'))
            ? 'block'
            : 'none',
          width: useMediaQuery(theme.breakpoints.down('sm')) ? '60px' : '0%',
          height: useMediaQuery(theme.breakpoints.down('sm')) ? '60px' : '0%',
          zIndex: 3,
        }}
        videoId={quiz?.quizItems[currentQuizIndex]?.id}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            disablekb: 1,
            controls: 0,
            rel: 0,
          },
        }}
        onReady={(event) => setPlayer(event.target)}
      />
    </>
  );
};

export default QuizController;
