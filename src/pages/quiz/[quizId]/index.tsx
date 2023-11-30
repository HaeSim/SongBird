// pages/quiz/[quizId].jsx
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import QuizController from '@/components/molecules/QuizController';
import QuizDetail from '@/components/organisms/QuizDetail';
import Default from '@/components/templates/Layout/Default';
import { generateGetLayout } from '@/utils/common';
import { getQuizFromDB } from '@/utils/indexDB';

const QuizDetailPage = () => {
  const router = useRouter();
  const { quizId } = router.query;

  // 내부 상태로 선택된 퀴즈를 관리
  const [quiz, setQuiz] = useState<Quiz>();
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answerMode, setAnswerMode] = useState<boolean>(false);

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
  }, [quizId, quiz?.quizItems.length]);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h2" paragraph fontWeight={700}>
        {answerMode
          ? quiz?.quizItems[currentQuizIndex]?.snippet.title
          : quiz?.title}
      </Typography>

      <QuizDetail
        totalQuizCount={quiz?.quizItems.length ?? 0}
        currentQuizIndex={currentQuizIndex}
        ImageUrl={
          quiz?.quizItems[currentQuizIndex]?.snippet.thumbnails.high.url ?? ''
        }
        answerMode={answerMode}
      />

      <QuizController
        quiz={quiz}
        answerMode={answerMode}
        setAnswerMode={setAnswerMode}
        currentQuizIndex={currentQuizIndex}
        setCurrentQuizIndex={setCurrentQuizIndex}
      />
    </Box>
  );
};

QuizDetailPage.getLayout = generateGetLayout(Default);

export default QuizDetailPage;
