// pages/quiz/[quizId].jsx
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import QuizController from '@/components/molecules/QuizController';
import QuizDetail from '@/components/organisms/QuizDetail';
import { useYoutube } from '@/components/organisms/YoutubePlayer/YoutubeProvider';
import Default from '@/components/templates/Layout/Default';
import { generateGetLayout } from '@/utils/common';
import { getQuizFromDB } from '@/utils/indexDB';

const QuizDetailPage = () => {
  const router = useRouter();
  const { setVideo } = useYoutube();
  const { quizId } = router.query;

  // 내부 상태로 선택된 퀴즈를 관리
  const [quiz, setQuiz] = useState<Quiz>();
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answerMode, setAnswerMode] = useState<boolean>(false);

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

  // Get the selected quiz from the DB
  useEffect(() => {
    if (!quizId) {
      return;
    }

    // Get the selected quiz from the DB
    async function fetchQuizzes() {
      const quizFromDB = await getQuizFromDB(quizId as string);
      if (!quizFromDB) {
        return;
      }
      if (Array.isArray(quizFromDB)) {
        setQuiz(quizFromDB[0]);
      } else {
        setQuiz(quizFromDB);
      }
    }

    fetchQuizzes();

    // Set the video to the first quiz item
    if ((quiz?.quizItems.length ?? 0) > 0) {
      setVideo(quiz?.quizItems[0]?.id);
    }
  }, [quizId]);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h2" paragraph fontWeight={700}>
        {quiz?.title}
      </Typography>

      <QuizDetail
        selectedQuiz={quiz ?? null}
        currentQuizIndex={currentQuizIndex}
        answerMode={answerMode}
      />

      <QuizController
        answerMode={answerMode}
        onPrev={handlePrev}
        onToggleMode={() => setAnswerMode((prev) => !prev)}
        onNext={handleNext}
      />
    </Box>
  );
};

QuizDetailPage.getLayout = generateGetLayout(Default);

export default QuizDetailPage;
