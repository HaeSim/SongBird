import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import { Fab, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import MetaInfo from '@/components/atoms/MetaInfo';
import PlaylistItemContent from '@/components/molecules/PlaylistItemContent';
import PlaylistSidebar from '@/components/molecules/PlaylistSideBar';
import Default from '@/components/templates/Layout/Default';
import useClientStore from '@/store/client';
import {
  useGetPlaylistItemQuery,
  useGetPlaylistQuery,
} from '@/store/server/features/youtube/queries';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';
import { saveQuizToDB } from '@/utils/indexDB';

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
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    backdropVisible,
    openBackdrop,
    closeBackdrop,
    openMessageModal,
    closeModal,
  } = useClientStore((state) => state);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');

  const { data: playlistItems, isFetching: isPlaylistItemsFetching } =
    useGetPlaylistItemQuery(selectedPlaylist);
  const { data: myPlaylist, isFetching: isMyPlaylistFetching } =
    useGetPlaylistQuery();

  const handlePlaylistClick = async (playlistId: string) => {
    setSelectedPlaylist(playlistId);
  };
  const makeQuiz = async () => {
    if (!playlistItems?.items) {
      return;
    }

    openBackdrop({
      message: '퀴즈 생성 중...',
    });

    const quizItems: QuizItem[] = playlistItems.items.map((item) => ({
      id: item.snippet.resourceId.videoId,
      snippet: item.snippet,
      startTime: 0,
      answerTime: 40,
    }));

    const quiz: Quiz = {
      id: selectedPlaylist,
      title:
        myPlaylist?.items.find((playlist) => playlist.id === selectedPlaylist)
          ?.snippet.title || '',
      description:
        myPlaylist?.items.find((playlist) => playlist.id === selectedPlaylist)
          ?.snippet.description || '',
      thumbnail:
        myPlaylist?.items.find((playlist) => playlist.id === selectedPlaylist)
          ?.snippet.thumbnails.default.url || '',
      publishedAt:
        myPlaylist?.items.find((playlist) => playlist.id === selectedPlaylist)
          ?.snippet.publishedAt || '',
      quizItems,
    };

    await saveQuizToDB(quiz).then(() => {
      setTimeout(() => {
        closeBackdrop();
        toast.success('퀴즈 생성 완료!');
      }, 1000);
    });
  };

  const handleMakeQuiz = () => {
    openMessageModal({
      title: '퀴즈 생성',
      message: [
        `${
          myPlaylist?.items.find((playlist) => playlist.id === selectedPlaylist)
            ?.snippet.title
        } 재생목록을 가지고`,
        '퀴즈를 생성하시겠습니까?',
      ],
      options: [
        { label: '취소', callback: closeModal, variant: 'outlined' },
        {
          label: '퀴즈 생성',
          callback: () => {
            closeModal();
            makeQuiz();
          },
          variant: 'contained',
          color: 'error',
        },
      ],
    });
  };

  useEffect(() => {
    if (myPlaylist?.items?.length) {
      setSelectedPlaylist(myPlaylist?.items[0]?.id ?? '');
    }
  }, [myPlaylist]);

  useEffect(() => {
    if (!router.isReady) return;
    if (status === 'loading') return;

    if (session?.provider !== 'google') {
      toast('구글 계정으로 로그인 해주세요.', {
        icon: '🔑',
      });
    }
  }, [router.isReady, session]);

  if (session?.provider !== 'google') {
    return (
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        Please sign in with Google <br />
        You are signed in as {session?.provider}
      </Typography>
    );
  }

  return (
    <>
      <MetaInfo
        title="대시보드"
        description="유투브 재생목록을 선택하고, 퀴즈를 생성해보세요!"
        noSelection
      />
      <Grid container spacing={2}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          fontWeight={700}
          marginLeft={3}
        >
          재생 목록
          <Tooltip
            title={`
              공개 상태가 '비공개'인 재생목록은 퀴즈 생성이 불가능합니다.
              '비공개'인 재생목록은 '공개'로 변경해주세요.
            `}
            placement="top"
            arrow
          >
            <IconButton>
              <HelpIcon
                sx={{
                  marginLeft: 1,
                  verticalAlign: 'middle',
                  color: '#ffffff',
                }}
                fontSize="small"
                titleAccess="youtube 재생목록을 선택하고, 퀴즈를 생성해보세요!"
              />
            </IconButton>
          </Tooltip>
        </Typography>
        <PlaylistSidebar
          myPlaylist={myPlaylist?.items ?? []}
          selectedPlaylist={selectedPlaylist}
          handlePlaylistClick={handlePlaylistClick}
          isLoading={isMyPlaylistFetching}
        />
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          fontWeight={700}
          marginTop={2}
          marginLeft={3}
        >
          노래 목록
        </Typography>
        <PlaylistItemContent
          playlistItems={playlistItems?.items ?? []}
          isLoading={isPlaylistItemsFetching}
        />
      </Grid>

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
        }}
        onClick={handleMakeQuiz}
        disabled={backdropVisible || !selectedPlaylist}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

Dashboard.getLayout = generateGetLayout(Default);

export default Dashboard;
