import { Box, Slide, Tab, Tabs, useMediaQuery } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import DashBoardCreate from '@/components/organisms/DashBoardCreate';
import DashBoardManage from '@/components/organisms/DashBoardManage';
import Default from '@/components/templates/Layout/Default';
import theme from '@/styles/theme';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    const queryStringForToast = encodeURIComponent(
      JSON.stringify({
        message: '로그인이 필요합니다.',
        type: 'error',
      })
    );

    return {
      props: {},
      redirect: {
        destination: `/?toast=${queryStringForToast}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

interface IDashboardProps {}

const Dashboard: NextPageWithLayout<IDashboardProps> = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setSelectedTab(newValue);
  };

  return (
    <>
      <MetaInfo
        title="대시보드"
        description="유투브 재생목록을 선택하고, 퀴즈를 생성해보세요!"
        noSelection
      />
      <Box
        component="header"
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: useMediaQuery(theme.breakpoints.down('sm'))
            ? 'column'
            : 'row',
          justifyContent: useMediaQuery(theme.breakpoints.down('sm'))
            ? 'center'
            : 'flex-start',
          width: '100%',
          mb: 4,
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="primary"
          TabIndicatorProps={{
            style: {
              borderRadius: '5px',
            },
          }}
          variant={
            useMediaQuery(theme.breakpoints.down('sm'))
              ? 'fullWidth'
              : 'standard'
          }
        >
          <Tab label="퀴즈 관리" />
          <Tab label="퀴즈 만들기" />
        </Tabs>
      </Box>

      <Slide
        appear={false}
        direction={selectedTab === 0 ? 'right' : 'left'}
        in={selectedTab === 0}
        mountOnEnter
        unmountOnExit
      >
        <Box hidden={selectedTab !== 0} width="100%">
          <DashBoardManage />
        </Box>
      </Slide>

      <Slide
        appear={false}
        direction="left"
        in={selectedTab === 1}
        mountOnEnter
        // unmountOnExit
      >
        <Box hidden={selectedTab !== 1} width="100%">
          <DashBoardCreate />
        </Box>
      </Slide>
    </>
  );
};

Dashboard.getLayout = generateGetLayout(Default);

export default Dashboard;
