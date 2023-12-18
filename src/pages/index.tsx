import { Box, Toolbar, Typography } from '@mui/material';
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
        <Typography variant="h6" paragraph lineHeight={1.4} textAlign="center">
          Make your own music quiz
          <br />
          with YouTube playlist
        </Typography>
      </Box>
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
