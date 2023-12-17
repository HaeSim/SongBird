import { Box, Button, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import FlipCard from '@/components/molecules/FlipCard';
import Default from '@/components/templates/Layout/Default';
import theme from '@/styles/theme';
import { AppConfig } from '@/utils/AppConfig';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';
import { snow } from '@/utils/confetti';

const Home: NextPageWithLayout = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  useEffect(() => {
    snow({
      duration: 10000,
    });
  }, []);
  return (
    <>
      <MetaInfo title="홈" description={AppConfig.description} />
      <Toolbar />
      <Button onClick={() => setIsFlipped(!isFlipped)}>Flip</Button>
      <FlipCard
        isFlipped={isFlipped}
        frontSide={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',

              width: 600,
              height: 300,
              backgroundImage:
                'linear-gradient(45deg, #2b394e 30%, #354459 60%, #3d4e5f 90%, #3d4e5f 100%)',
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
          </Box>
        }
        backSide={
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 600,
              height: 300,
              backgroundImage:
                'linear-gradient(135deg, #3d4e5f 30%, #354459 60%, #2b394e 90%, #2b394e 100%)',
            }}
          >
            <Typography variant="h2" color="white" fontWeight={700}>
              Let&apos;s play!
            </Typography>
          </Box>
        }
        width="600px"
        height="300px"
      />
    </>
  );
};

Home.getLayout = generateGetLayout(Default);

export default Home;
