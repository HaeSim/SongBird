// components/molecules/QuizController.jsx
import { Box, Button, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import type { YouTubePlayer } from 'react-youtube';
import YouTube from 'react-youtube';

import { PlayerStates } from '@/components/organisms/YoutubePlayer/YoutubeProvider';
import theme from '@/styles/theme';
import { fireworks, schoolPride } from '@/utils/confetti';

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

  // 제어함수
  // 이전 문제
  const handlePrev = async () => {
    if (!player) return;
    await player.pauseVideo();
    setAnswerMode(false);
    setCurrentQuizIndex((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  };

  // 다음 문제
  const handleNext = async () => {
    if (!player) return;
    await player.pauseVideo();
    setAnswerMode(false);
    setCurrentQuizIndex((prev) => {
      if (prev === (quiz?.quizItems.length ?? 0) - 1) {
        return prev;
      }
      return prev + 1;
    });
  };

  // 1. N초 재생
  const handlePlayWithSeconds = async (seconds: number) => {
    if (!player) return;
    await player.loadVideoById({
      videoId: quiz?.quizItems[currentQuizIndex]?.id ?? '',
      startSeconds: 0,
      endSeconds: seconds,
    });
  };

  const handleToggleMode = async () => {
    if (!player) return;
    // 정답 재생
    if (!answerMode) {
      await player.loadVideoById({
        videoId: quiz?.quizItems[currentQuizIndex]?.id ?? '',
        startSeconds: quiz?.quizItems[currentQuizIndex]?.answerTime ?? 40,
        endSeconds: 40 + 30, // 30초 재생
      });
      fireworks({ duration: 5000 });
      schoolPride({ duration: 5000 });
    } else {
      await player.pauseVideo();
    }

    setAnswerMode((prev) => !prev);
  };
  const handleStateChange = (event: any) => {
    const newPlayerState = event.data;
    switch (newPlayerState) {
      case PlayerStates?.PLAYING:
        console.log('PLAYING');
        break;
      case PlayerStates?.PAUSED:
        console.log('PAUSED');
        break;
      case PlayerStates?.ENDED:
        console.log('ENDED');
        break;
      case PlayerStates?.BUFFERING:
        console.log('BUFFERING');
        break;
      case PlayerStates?.UNSTARTED:
        console.log('UNSTARTED');
        break;
      case PlayerStates?.VIDEO_CUED:
        console.log('VIDEO_CUED');
        break;
      default:
        break;
    }
  };

  return (
    <>
      <YouTube
        style={{
          display: 'none',
          width: useMediaQuery(theme.breakpoints.down('sm')) ? '60px' : '0%',
          height: useMediaQuery(theme.breakpoints.down('sm')) ? '60px' : '0%',
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
          },
        }}
        onStateChange={handleStateChange}
        onReady={(event) => setPlayer(event.target)}
      />
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          onClick={handlePrev}
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
          onClick={handleNext}
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
      <Box>
        <Button
          onClick={() => handlePlayWithSeconds(1)}
          disabled={player === undefined}
        >
          1초
        </Button>
        <Button
          onClick={() => handlePlayWithSeconds(3)}
          disabled={player === undefined}
        >
          3초
        </Button>
        <Button onClick={handleToggleMode}>
          {answerMode ? '퀴즈 모드' : '정답 모드'}
        </Button>
        <Button
          onClick={() => player?.pauseVideo()}
          disabled={player === undefined}
        >
          일시정지
        </Button>
        <Button
          onClick={() => handlePlayWithSeconds(5)}
          disabled={player === undefined}
        >
          5초
        </Button>
        <Button
          onClick={() => handlePlayWithSeconds(10)}
          disabled={player === undefined}
        >
          10초
        </Button>
      </Box>
    </>
  );
};

export default QuizController;
