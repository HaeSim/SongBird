import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Grid,
  IconButton,
  ListItemButton,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import React from 'react';

import QuizCard from '@/components/molecules/QuizCard';
import useClientStore from '@/store/client';

interface IQuizListProps {
  quizzes: QuizData[];
  onQuizSelect?: (quiz: QuizData) => void;
  isLoading?: boolean;
  deleteHandler?: (quizId: string) => void;
}

const QuizList: React.FC<IQuizListProps> = ({
  quizzes,
  onQuizSelect,
  isLoading = false,
  deleteHandler,
}) => {
  const { openMessageModal, closeModal } = useClientStore((state) => state);

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Skeleton variant="rectangular" height={150} />
          <Skeleton variant="text" height={50} />
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid item xs={3} sx={{ minWidth: '100%' }}>
      <Paper
        style={{
          width: '100%',
          minHeight: '300px',
          padding: '8px',
          backgroundColor: '#3a4d68',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            minHeight: '300px',
          }}
        >
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div
                key={quiz.id}
                style={{
                  marginRight: '16px', // Adjust margin as needed
                }}
              >
                <ListItemButton
                  style={{
                    cursor: 'pointer',
                    padding: '8px',
                  }}
                  onClick={() => onQuizSelect?.(quiz)}
                >
                  <QuizCard
                    quiz={quiz}
                    cardActions={
                      deleteHandler && (
                        // 삭제하기 버튼
                        <IconButton
                          // 우측 정렬
                          style={{ marginLeft: 'auto' }}
                          aria-label="delete"
                          onClick={() => {
                            // deleteQuizFromDB(quiz.id)}
                            openMessageModal({
                              title: '퀴즈 삭제',
                              message: ['퀴즈를 삭제하시겠습니까?'],
                              options: [
                                {
                                  label: '취소',
                                  callback: closeModal,
                                  variant: 'outlined',
                                },
                                {
                                  label: '삭제',
                                  callback: () => {
                                    closeModal();
                                    deleteHandler(quiz.id);
                                  },
                                  variant: 'contained',
                                  color: 'error',
                                },
                              ],
                            });
                          }}
                          color="error"
                        >
                          <DeleteForeverIcon />
                        </IconButton>
                      )
                    }
                  />
                </ListItemButton>
              </div>
            ))
          ) : (
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                margin: 'auto',
              }}
            >
              저장된 퀴즈가 없습니다.
            </Typography>
          )}
        </div>
      </Paper>
    </Grid>
  );
};

export default QuizList;
