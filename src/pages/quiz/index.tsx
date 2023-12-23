import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import QuizListVertical from '@/components/organisms/QuizListVertical';
import Default from '@/components/templates/Layout/Default';
import { useQuizDatabase } from '@/hooks/providers/QuizDatabaseProvider';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

const Quiz: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: quizzes } = useQuizDatabase();

  return (
    <>
      <MetaInfo
        title="퀴즈"
        description="퀴즈를 선택하고, 풀어보세요!"
        noSelection
      />
      <Grid container spacing={2}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          fontWeight={700}
          marginLeft={3}
        >
          퀴즈 목록
        </Typography>
        <QuizListVertical
          quizzes={quizzes ?? []}
          onQuizSelect={(quiz) => {
            router.push(`/quiz/${quiz.id}`);
          }}
        />
      </Grid>
    </>
  );
};

Quiz.getLayout = generateGetLayout(Default);

export default Quiz;
