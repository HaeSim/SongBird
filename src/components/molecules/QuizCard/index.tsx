import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import { formatDatetime } from '@/utils/common';

interface QuizCardProps {
  quiz: QuizData;
  cardActions: React.ReactNode;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, cardActions }) => {
  return (
    <Card
      sx={{
        width: 275,
        marginBottom: '8px',
      }}
    >
      <CardMedia
        component="img"
        height="168"
        alt={quiz.name}
        image={quiz.thumbnail}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {quiz.name}
          <Typography variant="caption" color="textSecondary">
            {' '}
            ({quiz.quizItems.length})
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {quiz.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDatetime(quiz.createdAt)}
        </Typography>
      </CardContent>

      {cardActions && <CardActions>{cardActions}</CardActions>}
    </Card>
  );
};

export default QuizCard;
