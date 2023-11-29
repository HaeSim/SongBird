import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
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

interface IDashboardProps {}

const Dashboard: NextPageWithLayout<IDashboardProps> = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { backdropVisible, openBackdrop, closeBackdrop } = useClientStore(
    (state) => state
  );
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');

  const { data: playlistItems } = useGetPlaylistItemQuery(selectedPlaylist);
  const { data: myPlaylist } = useGetPlaylistQuery();

  const handlePlaylistClick = async (playlistId: string) => {
    setSelectedPlaylist(playlistId);
  };
  const handleMakeQuiz = async () => {
    if (!playlistItems?.items) {
      return;
    }

    openBackdrop({
      message: '퀴즈 생성 중...',
    });

    const quizItems: QuizItem[] = playlistItems.items.map((item) => ({
      id: item.snippet.resourceId.videoId,
      snippet: item.snippet,
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

  useEffect(() => {
    if (myPlaylist?.items?.length) {
      setSelectedPlaylist(myPlaylist?.items[0]?.id ?? '');
    }
  }, [myPlaylist]);

  useEffect(() => {
    if (!router.isReady) return;
    if (status === 'loading') return;

    if (!session) {
      toast.error('로그인이 필요합니다.');
      router.push('/');
      return;
    }

    if (session?.provider !== 'google') {
      toast('구글 계정으로 로그인 해주세요.', {
        icon: '🔑',
      });
    }
  }, [session]);

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
        title="대시보드 | 🎵 SongBird 🎵"
        description="This is the Quiz page of the 🎵 SongBird 🎵 app."
      />
      <Toolbar />
      <Grid container spacing={2}>
        <PlaylistSidebar
          myPlaylist={myPlaylist?.items ?? []}
          selectedPlaylist={selectedPlaylist}
          handlePlaylistClick={handlePlaylistClick}
        />
        <PlaylistItemContent playlistItems={playlistItems?.items ?? []} />
      </Grid>

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
        }}
        onClick={handleMakeQuiz}
        disabled={backdropVisible}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

Dashboard.getLayout = generateGetLayout(Default);

export default Dashboard;
