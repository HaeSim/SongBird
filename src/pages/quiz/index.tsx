import { Box, Typography } from '@mui/material';
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
      <MetaInfo
        title="Quiz | 🎵 SongBird 🎵"
        description="This is the Quiz page of the 🎵 SongBird 🎵 app."
      />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h3" paragraph fontWeight={700}>
          퀴즈 목록
        </Typography>

        {/* Organism - QuizList */}
        <QuizList
          quizzes={quizzes}
          onQuizSelect={(quiz) => {
            router.push(`/quiz/${quiz.id}`);
          }}
        />
      </Box>
    </>
  );
};

Quiz.getLayout = generateGetLayout(Default);

export default Quiz;
