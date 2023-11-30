// components/molecules/QuizController.jsx
import { Button } from '@mui/material';
import React from 'react';

import { useYoutube } from '@/components/organisms/YoutubePlayer/YoutubeProvider';

interface IQuizControllerProps {
  answerMode: boolean;
  onPrev: () => void;
  onToggleMode: () => void;
  onNext: () => void;
}

const QuizController = ({
  answerMode,
  onPrev,
  onToggleMode,
  onNext,
}: IQuizControllerProps) => {
  const { play, pause, seekTo } = useYoutube();

  /**
   * 퀴즈 재생 기능 구현
   * 1. 1초 재생
   * 2. 3초 재생
   * 3. 5초 재생
   * 4. 10초 재생
   * 5. 정답 모드 : 40초 구간 재생
   */
  // 1. N초 재생
  const handlePlayWithSeconds = (seconds: number) => {
    setTimeout(() => {
      play();
    }, 0);
    setTimeout(() => {
      pause();
    }, seconds * 1000);
  };

  const handleToggleMode = () => {
    onToggleMode();
    if (answerMode) {
      seekTo(40);
      play();
      return;
    }
    pause();
  };

  return (
    <div>
      <Button onClick={onPrev}>이전</Button>
      <Button onClick={handleToggleMode}>
        {answerMode ? '퀴즈 모드' : '정답 모드'}
      </Button>
      <Button onClick={onNext}>다음</Button>
      <Button onClick={() => handlePlayWithSeconds(1)}>1초</Button>
      <Button onClick={() => handlePlayWithSeconds(3)}>3초</Button>
      <Button onClick={() => handlePlayWithSeconds(5)}>5초</Button>
      <Button onClick={() => handlePlayWithSeconds(10)}>10초</Button>
    </div>
  );
};

export default QuizController;
