import {
  Box,
  Button,
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
import React, { useRef } from 'react';

import { useQuizDatabase } from '@/hooks/providers/QuizDatabaseProvider';

interface SelectedQuizDetailsProps {
  quizId: string;
  title: string;
  description: string;
  thumbnail: string;
  quizItems: QuizItemData[];
}

const SelectedQuizDetails: React.FC<SelectedQuizDetailsProps> = ({
  quizId,
  title,
  description,
  thumbnail,
  quizItems,
}) => {
  const COLUMN_NAMES = [
    '제목(정답)',
    '힌트',
    '시작(초)',
    '하이라이트(초)',
    '종료(초)',
  ];
  const { updateQuiz, isLoading } = useQuizDatabase();
  const quizItemsRef = useRef<QuizItemData[]>([...quizItems]);
  const [isChanged, setIsChanged] = React.useState<boolean>(false);

  const onBlurHandler = (e: React.FocusEvent<HTMLTableCellElement>) => {
    if (!quizItemsRef.current) return;

    const target = e.currentTarget;
    const targetId = target.id;
    const targetIndex = parseInt(targetId.split('-')[1]!, 10);
    const targetItemType = target.getAttribute('itemType');
    const targetValue =
      targetItemType === 'number'
        ? parseInt(target.textContent!, 10)
        : target.textContent;
    const targetKey: keyof QuizItemData = targetId.split(
      '-'
    )[0]! as keyof QuizItemData;

    if (!quizItemsRef.current[targetIndex]) return;

    // 변경된 데이터를 quizItemsRef에 반영
    quizItemsRef.current[targetIndex] = {
      ...quizItemsRef.current[targetIndex]!,
      [targetKey]: targetValue,
    };

    setIsChanged(
      quizItemsRef.current[targetIndex]![targetKey] !==
        quizItems[targetIndex]![targetKey]
    );
  };

  const handleSave = () => {
    // 업데이트된 데이터를 감지하여 quizItemsRef를 통해 얻음
    const updatedQuizItems = quizItemsRef.current;

    // updateQuiz 함수를 통해 데이터베이스 업데이트
    updateQuiz({
      id: quizId,
      name: title,
      description,
      thumbnail,
      quizItems: updatedQuizItems,
    });
  };

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
            <Typography variant="h6" gutterBottom fontWeight={700}>
              {title}
              <Typography variant="caption" color="textSecondary" ml={1}>
                총 {quizItems.length}개의 문제
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              color={description.length > 0 ? 'textPrimary' : 'textSecondary'}
            >
              {description}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              marginLeft: 'auto',
              marginRight: '1rem',
              marginBottom: '1rem',
              width: '6rem',
            }}
          >
            <Button
              sx={{
                margin: 'auto',
              }}
              variant="outlined"
              disabled={!isChanged || isLoading}
              onClick={handleSave}
            >
              <Typography
                variant="body1"
                fontWeight={800}
                {...(isChanged && { color: 'primary' })}
              >
                저장하기
              </Typography>
            </Button>
          </Box>
        </Card>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {COLUMN_NAMES.map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      textAlign: 'center',
                      fontWeight: 700,
                    }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {quizItems.map((quizItem, index) => (
                <TableRow key={quizItem.id}>
                  <TableCell
                    id={`answer-${index}`}
                    size="small"
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={onBlurHandler}
                  >
                    {quizItem.answer}
                  </TableCell>
                  <TableCell
                    size="small"
                    id={`hint-${index}`}
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={onBlurHandler}
                  >
                    {quizItem.hint || ''}
                  </TableCell>
                  <TableCell
                    size="small"
                    id={`startTime-${index}`}
                    itemType="number"
                    contentEditable
                    suppressContentEditableWarning
                    sx={{
                      textAlign: 'center',
                    }}
                    onBlur={onBlurHandler}
                  >
                    {quizItem.startTime}
                  </TableCell>
                  <TableCell
                    size="small"
                    id={`highlightTime-${index}`}
                    itemType="number"
                    contentEditable
                    suppressContentEditableWarning
                    sx={{
                      textAlign: 'center',
                    }}
                    onBlur={onBlurHandler}
                  >
                    {quizItem.highlightTime}
                  </TableCell>
                  <TableCell
                    size="small"
                    id={`endTime-${index}`}
                    itemType="number"
                    contentEditable
                    suppressContentEditableWarning
                    sx={{
                      textAlign: 'center',
                    }}
                    onBlur={onBlurHandler}
                  >
                    {quizItem.endTime || null}
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
