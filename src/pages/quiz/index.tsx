import {
  Box,
  Button,
  Grid,
  List,
  ListItemButton,
  Modal,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import { useYoutube } from '@/components/organisms/YoutubePlayer/YoutubeProvider';
import Default from '@/components/templates/Layout/Default';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';
import { getQuizFromDB } from '@/utils/indexDB';

const Quiz: NextPageWithLayout = () => {
  const { setVideo, player } = useYoutube();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [answerMode, setAnswerMode] = useState<boolean>(false);

  const handlePlay = () => {
    setVideo(selectedQuiz?.quizItems[currentQuizIndex]?.id);
    player?.playVideo();
  };

  const handlePause = () => {
    player?.pauseVideo();
  };

  useEffect(() => {
    async function fetchQuizzes() {
      const quizList = await getQuizFromDB();
      if (!quizList) {
        return;
      }

      if (Array.isArray(quizList)) {
        setQuizzes(quizList);
        // Set the first quiz as selected by default
      } else {
        setQuizzes([quizList]);
      }
    }

    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (!selectedQuiz) {
      return;
    }
    setCurrentQuizIndex(0);
  }, [selectedQuiz]);

  useEffect(() => {
    if (!selectedQuiz) {
      return;
    }
    setVideo(selectedQuiz.quizItems[currentQuizIndex]?.id);
  }, [currentQuizIndex]);

  return (
    <>
      <MetaInfo
        title="Quiz | 🎵 SongBird 🎵"
        description="This is the Quiz page of the 🎵 SongBird 🎵 app."
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Toolbar />
        <Typography variant="h5" paragraph>
          퀴즈 목록
        </Typography>

        {/* Horizontal list of quiz thumbnails */}
        <Grid container spacing={2} justifyContent="center">
          {quizzes.map((quiz) => (
            <Grid item key={quiz.id} onClick={() => setSelectedQuiz(quiz)}>
              {/* <QuizThumbnail thumbnail={quiz.thumbnail} title={quiz.title} /> */}
              <List>
                <ListItemButton
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '240px',
                    height: '160px',
                    ':hover': {
                      // scale: 1.1,
                      transform: 'scale(1.1)',
                      transition: 'all 0.5s ease-in-out',
                    },
                    ':not(:hover)': {
                      // scale: 1,
                      transform: 'scale(1)',
                      transition: 'all 0.5s ease-in-out',
                    },
                  }}
                >
                  <img
                    src={quiz.thumbnail}
                    alt={quiz.title}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <Typography
                    variant="caption"
                    align="center"
                    fontWeight="bold"
                  >
                    {quiz.title} ({quiz.quizItems.length})
                  </Typography>
                </ListItemButton>
              </List>
            </Grid>
          ))}
        </Grid>

        {/* Quiz detail */}
        <Modal
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          open={!!selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
        >
          <>
            {/* Quiz Controller  이전, 다음, 재생 */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography variant="h6" align="center" color="primary">
                {selectedQuiz?.quizItems.length} 개 중 {currentQuizIndex + 1}
              </Typography>
              <Box
                sx={{
                  // position: 'relative',
                  width: '300px',
                  height: '300px',
                  background: 'black',
                }}
              >
                {answerMode ? (
                  <>
                    <img
                      src={
                        selectedQuiz?.quizItems[currentQuizIndex]?.snippet
                          .thumbnails.high.url
                      }
                      alt={
                        selectedQuiz?.quizItems[currentQuizIndex]?.snippet.title
                      }
                      style={{ width: '100%', height: '100%' }}
                    />
                    <Typography
                      variant="h3"
                      align="center"
                      color="primary"
                      sx={{
                        position: 'absolute',
                        left: '50%',
                        top: '20%',
                        transform: 'translate(-50%, -50%)',
                      }}
                      fontWeight={800}
                    >
                      {selectedQuiz?.quizItems[currentQuizIndex]?.snippet.title}
                    </Typography>
                  </>
                ) : null}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {/* 이전, 1초, 3초, 5초, 재생, 다음 */}
                <Button
                  onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)}
                >
                  이전
                </Button>
                <Button onClick={() => setAnswerMode((prev) => !prev)}>
                  {answerMode ? '퀴즈 모드' : '정답 모드'}
                </Button>
                <Button
                  onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)}
                >
                  다음
                </Button>
                <Button onClick={handlePlay}>재생</Button>
                <Button onClick={handlePause}>정지</Button>
              </Box>
            </Box>
          </>
        </Modal>
      </div>
    </>
  );
};

Quiz.getLayout = generateGetLayout(Default);

export default Quiz;
