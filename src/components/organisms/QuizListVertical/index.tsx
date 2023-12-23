import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Grid,
  IconButton,
  ListItemButton,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';

import QuizCard from '@/components/molecules/QuizCard';
import useClientStore from '@/store/client';
import theme from '@/styles/theme';

interface IQuizListVerticalProps {
  quizzes: QuizData[];
  onQuizSelect?: (quiz: QuizData) => void;
  isLoading?: boolean;
  deleteHandler?: (quizId: string) => void;
}

const QuizListVertical: React.FC<IQuizListVerticalProps> = ({
  quizzes,
  onQuizSelect,
  isLoading = false,
  deleteHandler,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
          minHeight: 'calc(100vh - 180px)',
          height: '100%',
          padding: '8px',
          backgroundColor: '#3a4d68',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            overflowX: 'auto',
            height: '100%',
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
                          onClick={(e) => {
                            // 버블링 방지
                            e.preventDefault();
                            // 캡처링 방지
                            e.stopPropagation();
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

export default QuizListVertical;
