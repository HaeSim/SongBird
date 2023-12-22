import { Grid, Typography } from '@mui/material';
import { useState } from 'react';

import SelectedQuizDetails from '@/components/molecules/SelectedQuizDetails';
import { useQuizDatabase } from '@/hooks/providers/QuizDatabaseProvider';

import QuizList from '../QuizList';

interface IDashBoardManageProps {}

const DashBoardManage: React.FC<IDashBoardManageProps> = () => {
  const { data: quizzes, deleteQuiz } = useQuizDatabase();
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);

  const handleDelete = (quizId: string) => {
    deleteQuiz(quizId);
  };

  return (
    <Grid container spacing={2}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        fontWeight={700}
        marginLeft={3}
      >
        저장된 퀴즈
      </Typography>
      <QuizList
        quizzes={quizzes ?? []}
        deleteHandler={handleDelete}
        onQuizSelect={(quiz) => {
          quizzes?.find((_quiz, index) => {
            if (_quiz.id === quiz.id) {
              setSelectedQuizIndex(index);
              return true;
            }
            return false;
          });
        }}
      />

      <Typography
        variant="h5"
        align="center"
        gutterBottom
        fontWeight={700}
        marginTop={2}
        marginLeft={3}
      >
        퀴즈 상세 정보
      </Typography>
      {(quizzes?.length ?? 0) > 0 && (
        <SelectedQuizDetails
          quizId={quizzes?.[selectedQuizIndex]?.id ?? ''}
          title={quizzes?.[selectedQuizIndex]?.name ?? ''}
          description={quizzes?.[selectedQuizIndex]?.description ?? ''}
          thumbnail={quizzes?.[selectedQuizIndex]?.thumbnail ?? ''}
          quizItems={quizzes?.[selectedQuizIndex]?.quizItems ?? []}
        />
      )}
    </Grid>
  );
};

export default DashBoardManage;
