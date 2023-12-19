// pages/quiz/[quizId].jsx
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import QuizController from '@/components/molecules/QuizController';
import QuizDetail from '@/components/organisms/QuizDetail';
import QuizPlayerProvider from '@/components/organisms/QuizPlayer/QuizPlayerProvider';
import Default from '@/components/templates/Layout/Default';
import { generateGetLayout } from '@/utils/common';

const QuizDetailPage = () => {
  const router = useRouter();
  const { quizId } = router.query;

  return (
    <>
      <MetaInfo
        title={`퀴즈 - ${quizId}`}
        description={`퀴즈 - ${quizId}의 상세 페이지입니다.`}
        noSelection
      />
      <QuizPlayerProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <QuizDetail />

          <QuizController />
        </Box>
      </QuizPlayerProvider>
    </>
  );
};

QuizDetailPage.getLayout = generateGetLayout(Default);

export default QuizDetailPage;
