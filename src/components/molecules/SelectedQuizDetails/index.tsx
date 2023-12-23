import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import { useQuizDatabase } from '@/hooks/providers/QuizDatabaseProvider';
import useClientStore from '@/store/client';

import MusicPlayer from '../MusicPlayer';

interface SelectedQuizDetailsProps {
  quizId: string;
  name: string;
  description: string;
  thumbnail: string;
  quizItems: QuizItemData[];
}

const SelectedQuizDetails: React.FC<SelectedQuizDetailsProps> = ({
  quizId,
  name,
  description,
  thumbnail,
  quizItems,
}) => {
  const COLUMNS_WITH_SUBHEADERS = [
    {
      name: '제목(정답)',
      subheaders: [],
    },
    {
      name: '시작',
      subheaders: ['초', '재생'],
    },
    {
      name: '하이라이트',
      subheaders: ['초', '재생'],
    },
  ];
  const { openComponentModal } = useClientStore((state) => state);
  const { updateQuiz, isLoading } = useQuizDatabase();
  const quizItemsRef = useRef<QuizItemData[]>([...quizItems]);
  const quizInfoRef = useRef<Pick<QuizData, 'name' | 'description'>>({
    name,
    description,
  });
  const [isChanged, setIsChanged] = React.useState<boolean>(false);

  const handlePlayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const targetId = target.id;
    const targetColumn = targetId.split('-')[0]!;
    const targetIndex = parseInt(targetId.split('-')[1]!, 10);

    let startTime: number;
    switch (targetColumn) {
      case 'startTimePreview':
        // get by id (startTime)
        startTime = quizItemsRef.current[targetIndex]?.startTime ?? 0;
        break;
      case 'highlightTimePreview':
        startTime = quizItemsRef.current[targetIndex]?.highlightTime ?? 0;
        break;
      default:
        startTime = 0;
    }

    const newVideoId = quizItems[targetIndex]?.id;
    if (!newVideoId)
      return toast.error('재생할 수 없습니다. 관리자에게 문의하세요');

    return openComponentModal(
      <MusicPlayer videoId={newVideoId} startTime={startTime} />
    );
  };

  const onBlurQuizInfoHandler = (
    e: React.FocusEvent<HTMLDivElement | HTMLImageElement>
  ) => {
    const target = e.currentTarget;
    const targetId = target.id;
    const targetValue = target.textContent;
    const targetKey: keyof Pick<QuizData, 'name' | 'description'> =
      targetId.split('-')[0]! as keyof Pick<QuizData, 'name' | 'description'>;

    // quizInfoRef에 변경된 데이터를 반영
    quizInfoRef.current = {
      ...quizInfoRef.current,
      [targetKey]: targetValue,
    };

    setIsChanged(
      (prev) =>
        prev ||
        quizInfoRef.current[targetKey] !==
          (targetKey === 'name' ? name : description)
    );
  };

  const onBlurTableBodyHandler = (
    e: React.FocusEvent<HTMLTableCellElement>
  ) => {
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

    setIsChanged((prev) => {
      return (
        prev ||
        quizItemsRef.current[targetIndex]![targetKey] !==
          quizItems[targetIndex]![targetKey]
      );
    });
  };

  const handleSave = async () => {
    // 업데이트된 데이터를 감지하여 quizItemsRef를 통해 얻음
    const updatedQuizInfo = quizInfoRef.current;
    const updatedQuizItems = quizItemsRef.current;

    // updateQuiz 함수를 통해 데이터베이스 업데이트
    await updateQuiz({
      id: quizId,
      name: updatedQuizInfo.name,
      description: updatedQuizInfo.description,
      thumbnail,
      quizItems: updatedQuizItems,
    });

    setIsChanged(false);
  };

  useEffect(() => {
    quizItemsRef.current = [...quizItems];
    quizInfoRef.current = {
      name,
      description,
    };
  }, [quizId, name, description, quizItems]);

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
            alt={name}
            height="140"
            image={thumbnail}
          />
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'nowrap',
                overflowX: 'auto',
              }}
            >
              <Typography
                id={`name-${quizId}`}
                variant="h6"
                gutterBottom
                fontWeight={700}
                contentEditable
                suppressContentEditableWarning
                onBlur={onBlurQuizInfoHandler}
              >
                {name}
              </Typography>
              <Typography variant="caption" color="textSecondary" ml={1}>
                총 {quizItems.length}개의 문제
              </Typography>
            </Box>
            <Typography
              id={`description-${quizId}`}
              variant="body1"
              color={description.length > 0 ? 'textPrimary' : 'textSecondary'}
              contentEditable
              suppressContentEditableWarning
              onBlur={onBlurQuizInfoHandler}
            >
              {description || ''}
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
                {COLUMNS_WITH_SUBHEADERS.map((column) => {
                  return (
                    <TableCell
                      key={column.name}
                      size="small"
                      rowSpan={column.name === '제목(정답)' ? 2 : 1}
                      colSpan={column.subheaders.length}
                      sx={{
                        textAlign: 'center',
                        fontWeight: 700,
                      }}
                    >
                      {column.name}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                {COLUMNS_WITH_SUBHEADERS.map((column) => {
                  return column.subheaders.map((subheader) => {
                    return (
                      <TableCell
                        size="small"
                        key={subheader}
                        sx={{
                          textAlign: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {subheader}
                      </TableCell>
                    );
                  });
                })}
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
                    onBlur={onBlurTableBodyHandler}
                  >
                    {quizItem.answer}
                  </TableCell>
                  <TableCell
                    size="small"
                    id={`startTime-${index}`}
                    itemType="number"
                    inputMode="numeric"
                    contentEditable
                    suppressContentEditableWarning
                    sx={{
                      textAlign: 'center',
                    }}
                    onBlur={onBlurTableBodyHandler}
                  >
                    {quizItem.startTime}
                  </TableCell>
                  <TableCell
                    size="small"
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    <IconButton
                      id={`startTimePreview-${index}`}
                      onClick={handlePlayClick}
                    >
                      <PlayArrowIcon
                        sx={{
                          color: '#fff',
                        }}
                      />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    size="small"
                    id={`highlightTime-${index}`}
                    itemType="number"
                    inputMode="numeric"
                    contentEditable
                    suppressContentEditableWarning
                    sx={{
                      textAlign: 'center',
                    }}
                    onBlur={onBlurTableBodyHandler}
                  >
                    {quizItem.highlightTime}
                  </TableCell>
                  <TableCell
                    size="small"
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    <IconButton
                      id={`highlightTimePreview-${index}`}
                      onClick={handlePlayClick}
                    >
                      <PlayArrowIcon
                        sx={{
                          color: '#fff',
                        }}
                      />
                    </IconButton>
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
