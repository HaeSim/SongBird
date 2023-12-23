import { Box, Card, CardMedia } from '@mui/material';

interface QuizCardProps {
  quiz: QuizData;
  cardActions: React.ReactNode;
}

const DashBoardQuizCard: React.FC<QuizCardProps> = ({ quiz, cardActions }) => {
  return (
    <Card
      sx={{
        width: 275,
        marginBottom: '8px',
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        height="275"
        alt={quiz.name}
        image={quiz.thumbnail}
      />

      {cardActions && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
        >
          {cardActions}
        </Box>
      )}
    </Card>
  );
};

export default DashBoardQuizCard;
