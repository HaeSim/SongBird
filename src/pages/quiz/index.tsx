import { Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import QuizList from '@/components/organisms/QuizList';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';
import { getQuizFromDB } from '@/utils/indexDB';

const Quiz: NextPageWithLayout = () => {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    async function fetchQuizzes() {
      const quizList = await getQuizFromDB();
      if (!quizList) {
        return;
      }

      if (Array.isArray(quizList)) {
        setQuizzes(quizList);
        // Set the first quiz as selected by default
      } else {
        setQuizzes([quizList]);
      }
    }

    fetchQuizzes();
  }, []);

  return (
    <>
      <MetaInfo title="퀴즈" description="퀴즈를 선택하고, 풀어보세요!" />
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

        {/* Organism - QuizList */}
        <QuizList
          quizzes={quizzes}
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
