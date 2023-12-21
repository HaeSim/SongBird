import { Grid, Typography } from '@mui/material';

import { useQuizDatabase } from '@/hooks/providers/QuizDatabaseProvider';

import QuizList from '../QuizList';

interface IDashBoardManageProps {}

const DashBoardManage: React.FC<IDashBoardManageProps> = () => {
  const { data: quizzes, deleteQuiz } = useQuizDatabase();

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
      <QuizList quizzes={quizzes ?? []} deleteHandler={handleDelete} />
    </Grid>
  );
};

export default DashBoardManage;
