import { Box, Button, Toolbar, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import SignInModal from '@/components/molecules/SignInModal';
import Default from '@/components/templates/Layout/Default';
import useClientStore from '@/store/client';
import { SlideUpFadeIn } from '@/styles/animation';
import theme from '@/styles/theme';
import { AppConfig } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';
import { snow } from '@/utils/confetti';

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();
  const { openComponentModal } = useClientStore((state) => state);

  const handleLoginClick = () => {
    if (sessionStatus === 'authenticated') return router.push('/dashboard');
    return openComponentModal(<SignInModal />);
  };

  useEffect(() => {
    snow({
      duration: 10000,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-console
    console.log(
      '%c🚀 Join us at SongBird Labs 🚀',
      'font-weight: bold; font-size: 28px; color: #2ecc71; text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5)'
    );
    // eslint-disable-next-line no-console
    console.log(
      '%c🌐 함께할 팀원을 모집하고 있습니다. 프론트엔드, 백엔드 엔지니어 혹은 디자이너분들은 우측 하단 채널톡 버튼에서 지원 연락주세요! 🚀',
      'border: 2px solid #2ecc71; background: #1e1e1e; padding: 15px; font-weight: bold; font-size: 18px; color: #fff; text-shadow: 1px 1px 0 #000;'
    );
  }, []);
  return (
    <>
      <MetaInfo title="홈" description={AppConfig.description} noSelection />
      <Toolbar />
      <Box
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '50vh',
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
            fontSize={useMediaQuery(theme.breakpoints.down('sm')) ? 80 : 120}
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
          variant={useMediaQuery(theme.breakpoints.down('sm')) ? 'h6' : 'h5'}
          paragraph
          lineHeight={1.4}
          textAlign="center"
        >
          Make your own music quiz
          <br />
          with YouTube playlist
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          // href="/dashboard"
          sx={{
            marginTop: '1rem',
          }}
          onClick={handleLoginClick}
        >
          {sessionStatus === 'authenticated'
            ? 'Go to dashboard'
            : 'Get Started'}
        </Button>
      </Box>
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
