// components/organisms/QuizList.jsx
import { Grid } from '@mui/material';
import React from 'react';

import QuizThumbnail from '@/components/molecules/QuizThumbnail';

interface IQuizListProps {
  quizzes: QuizList[];
  onQuizSelect: (quiz: QuizList) => void;
}

const QuizList = ({ quizzes, onQuizSelect }: IQuizListProps) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {quizzes.map((quiz) => (
        <Grid item key={quiz.id} xs={12} sm={6} md={4} lg={3}>
          <QuizThumbnail quiz={quiz} onClick={() => onQuizSelect(quiz)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default QuizList;
