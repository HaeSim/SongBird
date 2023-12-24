import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import SelectedQuizDetails from '@/components/molecules/SelectedQuizDetails';
import { useQuizDatabase } from '@/hooks/providers/QuizDatabaseProvider';

interface IDashBoardManageProps {}

const DashBoardManage: React.FC<IDashBoardManageProps> = () => {
  const { data: quizzes } = useQuizDatabase();
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number>(0);

  // 퀴즈 삭제시 선택된 퀴즈가 삭제되면 선택된 퀴즈를 초기화
  // 마지막 퀴즈가 삭제되면 마지막 퀴즈를 선택
  useEffect(() => {
    if (!quizzes || quizzes.length === 0) return;

    if (selectedQuizIndex >= quizzes.length) {
      setSelectedQuizIndex(quizzes.length - 1);
    }
  }, [quizzes]);

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

      {(quizzes?.length ?? 0) > 0 &&
        quizzes?.map((quiz) => {
          return (
            <SelectedQuizDetails
              key={quiz.id}
              quizId={quiz.id}
              name={quiz.name}
              description={quiz.description}
              thumbnail={quiz.thumbnail}
              quizItems={quiz.quizItems}
            />
          );
        })}
    </Grid>
  );
};

export default DashBoardManage;
