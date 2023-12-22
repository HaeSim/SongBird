import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

interface SelectedQuizDetailsProps {
  title: string;
  description: string;
  thumbnail: string;
  quizItems: QuizItemData[];
}

const SelectedQuizDetails: React.FC<SelectedQuizDetailsProps> = ({
  title,
  description,
  thumbnail,
  quizItems,
}) => {
  return (
    <Grid item xs={3} sx={{ minWidth: '100%', marginBottom: '64px' }}>
      <Paper
        style={{
          minHeight: '100%',
          overflowY: 'auto',
          backgroundColor: '#3a4d68',
        }}
      >
        <Card>
          <CardMedia
            component="img"
            alt={title}
            height="140"
            image={thumbnail}
          />
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography
              variant="body1"
              color={description.length > 0 ? 'textPrimary' : 'textSecondary'}
            >
              {description}
            </Typography>
          </CardContent>
        </Card>

        {/* MUI Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Answer</TableCell>
                <TableCell>Hint</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Highlight Time</TableCell>
                <TableCell>End Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quizItems.map((quizItem) => (
                <TableRow key={quizItem.id}>
                  <TableCell contentEditable>{quizItem.answer}</TableCell>
                  <TableCell contentEditable>{quizItem.hint || '-'}</TableCell>
                  <TableCell contentEditable>{quizItem.startTime}</TableCell>
                  <TableCell contentEditable>
                    {quizItem.highlightTime}
                  </TableCell>
                  <TableCell contentEditable>
                    {quizItem.endTime || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Grid>
  );
};

export default SelectedQuizDetails;
