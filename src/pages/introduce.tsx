// pages/index.tsx
import {
  Box,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import { SlideUpFadeIn } from '@/styles/animation';
import theme from '@/styles/theme';
import { AppConfig } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';
import { snow } from '@/utils/confetti';

const Home: NextPageWithLayout = () => {
  useEffect(() => {
    snow({
      duration: 10000,
    });
  }, []);

  return (
    <>
      <MetaInfo title="홈" description={AppConfig.description} />
      <Toolbar />

      <Container>
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '80vh',
            animation: `${SlideUpFadeIn} 1s ease-in-out`,
          }}
        >
          {/* main logo */}
          <svg width="600" height="120" viewBox="0 0 600 120">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor={theme.palette.primary.main} />
              </linearGradient>
            </defs>
            <text
              x="50%"
              y="50%"
              fontSize="100"
              fontFamily="Arial"
              fill="url(#gradient)"
              textAnchor="middle"
              alignmentBaseline="middle"
              fontWeight="bold"
            >
              SongBird
            </text>
          </svg>

          {/* subtitle */}
          <Typography
            variant="h6"
            paragraph
            lineHeight={1.4}
            textAlign="center"
          >
            Make your own music quiz
            <br />
            with YouTube playlist
          </Typography>
        </Box>
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '70vh',
          }}
        >
          <Typography
            variant="body1"
            paragraph
            textAlign="center"
            fontSize={24}
            lineHeight={1.5}
            fontWeight={500}
          >
            SongBird에 오신 것을 환영합니다!
            <br />
            송버드(SongBird)는 당신의 YouTube 플레이리스트를 기반으로 한
            <br />
            독특하고 재미있는 노래 퀴즈를 즐길 수 있는 플랫폼입니다.
            <br />
            <br />
            송버드를 통해 당신의 YouTube 플레이리스트를 기반으로 한 노래 퀴즈를
            <br />
            만들고, 오프라인에서 친구들과 함께 즐길 수 있습니다.
          </Typography>
        </Box>

        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '70vh',
          }}
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {/** Feature 1 */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                sx={{ padding: '20px', textAlign: 'center' }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  fontWeight={500}
                >
                  주요 기능
                </Typography>
                <Typography variant="body1" paragraph textAlign="left">
                  1. <strong>간편한 퀴즈 생성</strong>: 유저가 생성한 YouTube
                  재생목록을 기반으로 쉽게 노래 퀴즈를 생성할 수 있습니다.
                </Typography>
                <Typography variant="body1" paragraph textAlign="left">
                  2. <strong>개인정보 보호</strong>: 사용자의 Google OAuth
                  로그인 정보 및 YouTube 재생목록과 같은 모든 개인정보는
                  안전하게 처리됩니다. 프로젝트는 이러한 정보를 저장하지 않고,
                  사용자 브라우저에만 전달됩니다.
                </Typography>
              </Paper>
            </Grid>

            {/** Feature 2 */}
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={3}
                sx={{ padding: '20px', textAlign: 'center' }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  fontWeight={500}
                >
                  개인정보 처리방침
                </Typography>
                <Typography variant="body1" paragraph textAlign="left">
                  [개인정보 처리방침
                  바로가기](https://songbird.hae-sim.com/privacy)
                </Typography>
                <Typography variant="body1" paragraph textAlign="left">
                  - <strong>정책 내용</strong>: 프로젝트는 사용자의 개인정보를
                  존중하며, Google OAuth 로그인 정보와 YouTube 재생목록 등은
                  어떠한 서버에도 저장되지 않습니다. 사용자 데이터는 브라우저
                  내부 저장소에만 저장되며, 퀴즈 생성 시에도 추가적인 서버
                  저장은 이루어지지 않습니다.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/** Notices */}
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '70vh',
            width: '100%',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            fontWeight={700}
            marginBottom={4}
          >
            안내사항
          </Typography>

          <Typography
            variant="body1"
            paragraph
            textAlign="left"
            sx={{
              width: '100%',
              maxWidth: '900px',
            }}
          >
            - <strong>앱 이용 방법</strong>: 유저는 단순히 자신의 YouTube
            재생목록을 만들고, 이를 이용하여 쉽게 노래 퀴즈를 즐길 수 있습니다.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            textAlign="left"
            sx={{
              width: '100%',
              maxWidth: '900px',
            }}
          >
            - <strong>문의 및 지원</strong>: 기존 사용자 또는 새로운 사용자의
            문의사항이나 지원 요청은{' '}
            <a href="mailto:support@music-quiz.com">support@music-quiz.com</a>
            으로 문의하실 수 있습니다.
          </Typography>
        </Box>

        {/** Conclusion */}
        <Box
          component="section"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" paragraph>
            송버드를 통해 즐거운 노래 퀴즈 체험을 즐겨보세요! 🎶
          </Typography>
        </Box>
      </Container>
    </>
  );
};

// Layout 설정
Home.getLayout = generateGetLayout(Default);

export default Home;
