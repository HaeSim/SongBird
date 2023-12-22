import { Box, Button, Toolbar, Typography, useMediaQuery } from '@mui/material';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-console
    console.log(
      "%c🚀 Join us at Haesim's Labs 🚀",
      'font-weight: bold; font-size: 28px; color: #2ecc71; text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5)'
    );
    // eslint-disable-next-line no-console
    console.log(
      "%c🌐 We're expanding our team! Front-End Engineers wanted. Apply at ChannelTalk(FAB) 🚀",
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
          href="/dashboard"
          sx={{
            marginTop: '1rem',
          }}
        >
          Create Quiz
        </Button>
      </Box>
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
