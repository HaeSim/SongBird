// components/molecules/QuizThumbnail.jsx
import { List, ListItemButton, Typography } from '@mui/material';
import React from 'react';

interface IQuizThumbnailProps {
  quiz: Quiz;
  onClick?: () => void;
}

const QuizThumbnail = ({ quiz, onClick }: IQuizThumbnailProps) => {
  return (
    <List>
      <ListItemButton
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '240px',
          height: '180px',
          ':hover': {
            transform: 'scale(1.1)',
            transition: 'all 0.5s ease-in-out',
          },
          ':not(:hover)': {
            transform: 'scale(1)',
            transition: 'all 0.5s ease-in-out',
          },
        }}
        onClick={onClick}
      >
        <img
          src={quiz.thumbnail}
          alt={quiz.title}
          style={{ width: '100%', height: 'auto' }}
        />
        <Typography variant="caption" align="center" fontWeight="bold">
          {quiz.title} ({quiz.quizItems.length})
        </Typography>
      </ListItemButton>
    </List>
  );
};

export default QuizThumbnail;
