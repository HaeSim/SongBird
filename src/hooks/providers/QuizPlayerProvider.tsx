// components/organisms/QuizPlayer/QuizPlayerProvider.tsx
import React, { createContext, useContext, useMemo, useState } from 'react';
import type { YouTubePlayer } from 'react-youtube';

import { fireworks, schoolPride } from '@/utils/confetti';

export enum PlayerStates {
  READY = 4,
  BUFFERING = 3,
  ENDED = 0,
  PAUSED = 2,
  PLAYING = 1,
  UNSTARTED = -1,
  VIDEO_CUED = 5,
}

interface IQuizPlayerContext {
  // 퀴즈 상태
  currentQuizIndex: number;
  answerMode: boolean;
  // 퀴즈 상태를 관리하는 메소드
  setQuizData: (quiz: QuizData) => void;
  handlePrevQuiz: () => void;
  handleNextQuiz: () => void;

  handlePlayWithSeconds: (seconds: number) => void;
  handleAnswerMode: () => void;
  // 비디오 플레이어
  playerState?: PlayerStates;
  handleStateChange: (event: any) => void;
  handleReady: (event: any) => void;
}

const QuizPlayerContext = createContext<IQuizPlayerContext | undefined>(
  undefined
);

export const useQuizPlayer = () => {
  const context = useContext(QuizPlayerContext);
  if (!context) {
    throw new Error('useQuizPlayer must be used within a QuizPlayerProvider');
  }
  return context;
};

interface IQuizPlayerProviderProps {
  children: React.ReactNode;
}

const QuizPlayerProvider: React.FC<IQuizPlayerProviderProps> = ({
  children,
}) => {
  const [quiz, setQuiz] = useState<QuizData>();
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answerMode, setAnswerMode] = useState<boolean>(false);

  const [player, setPlayer] = useState<YouTubePlayer | undefined>(undefined);
  const [playerState, setPlayerState] = useState<PlayerStates | undefined>(
    undefined
  );

  const quizItem = quiz?.quizItems[currentQuizIndex];

  // 퀴즈 리스트를 받아옴
  const setQuizData = async (_quiz: QuizData) => {
    setQuiz(_quiz);
    setCurrentQuizIndex(0);
    setAnswerMode(false);
  };

  // 이전 문제
  const handlePrevQuiz = async () => {
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
  const handleNextQuiz = async () => {
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
      videoId: quizItem?.id ?? '',
      startSeconds: quizItem?.startTime ?? 0,
      endSeconds: (quizItem?.startTime ?? 0) + seconds,
      suggestedQuality: 'small',
    });
  };

  const handleAnswerMode = async () => {
    if (!player) return;
    // 정답 재생
    if (!answerMode) {
      await player.loadVideoById({
        videoId: quizItem?.id ?? '',
        startSeconds: quizItem?.highlightTime ?? 40,
        // 끝까지
        suggestedQuality: 'small',
      });
      fireworks({ duration: 5000 });
      schoolPride({ duration: 5000 });
    } else {
      await player.pauseVideo();
    }

    setAnswerMode((prev) => !prev);
  };

  const handleReady = (event: any) => {
    setPlayer(event.target);
    setPlayerState(PlayerStates.READY);
  };

  const handleStateChange = (event: any) => {
    const newPlayerState = event.data;
    switch (newPlayerState) {
      case PlayerStates?.PLAYING:
        setPlayerState(PlayerStates.PLAYING);
        break;
      case PlayerStates?.PAUSED:
        setPlayerState(PlayerStates.PAUSED);
        break;
      case PlayerStates?.ENDED:
        setPlayerState(PlayerStates.ENDED);
        break;
      case PlayerStates?.BUFFERING:
        setPlayerState(PlayerStates.BUFFERING);
        break;
      case PlayerStates?.UNSTARTED:
        setPlayerState(PlayerStates.UNSTARTED);
        break;
      case PlayerStates?.VIDEO_CUED:
        setPlayerState(PlayerStates.VIDEO_CUED);
        break;
      default:
        break;
    }
  };

  const contextValue: IQuizPlayerContext = useMemo(() => {
    return {
      // 퀴즈 상태
      currentQuizIndex,
      answerMode,
      // 퀴즈 상태를 관리하는 메소드
      setQuizData,
      handlePrevQuiz,
      handleNextQuiz,
      handlePlayWithSeconds,
      handleAnswerMode,
      // 비디오 플레이어
      playerState,
      handleStateChange,
      handleReady,
    };
  }, [
    currentQuizIndex,
    answerMode,
    setQuizData,
    handlePrevQuiz,
    handleNextQuiz,
    handlePlayWithSeconds,
    handleAnswerMode,
    playerState,
    handleStateChange,
    handleReady,
  ]);

  return (
    <QuizPlayerContext.Provider value={contextValue}>
      {children}
    </QuizPlayerContext.Provider>
  );
};

export default QuizPlayerProvider;
