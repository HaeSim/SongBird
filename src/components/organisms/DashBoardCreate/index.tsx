import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import { Fab, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import PlaylistItemContent from '@/components/molecules/PlaylistItemContent';
import PlaylistSidebar from '@/components/molecules/PlaylistSideBar';
import { useQuizDatabase } from '@/hooks/providers/QuizDatabaseProvider';
import ChannelService from '@/lib/channeltalk';
import useClientStore from '@/store/client';
import {
  useGetPlaylistItemQuery,
  useGetPlaylistQuery,
} from '@/store/server/features/youtube/queries';

interface IDashBoardCreateProps {}

const DashBoardCreate: React.FC<IDashBoardCreateProps> = () => {
  const { data: session } = useSession();
  const { saveQuiz } = useQuizDatabase();
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

    const quizItems: QuizItemData[] = playlistItems.items.map((item) => ({
      id: item.snippet.resourceId.videoId,
      answer: item.snippet.title,
      hint: '',
      image: {
        url: item.snippet.thumbnails.high?.url ?? '',
        width: item.snippet.thumbnails.high?.width ?? 0,
        height: item.snippet.thumbnails.high?.height ?? 0,
      },
      startTime: 0,
      highlightTime: 40,
      endTime: null,
    }));

    const quiz: QuizData = {
      id: selectedPlaylist,
      name:
        myPlaylist?.items.find((playlist) => playlist.id === selectedPlaylist)
          ?.snippet.title || '',
      description:
        myPlaylist?.items.find((playlist) => playlist.id === selectedPlaylist)
          ?.snippet.description || '',
      thumbnail:
        myPlaylist?.items.find((playlist) => playlist.id === selectedPlaylist)
          ?.snippet.thumbnails.high.url || '',
      quizItems,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await (async () => {
      saveQuiz(quiz);
      setTimeout(() => {
        closeBackdrop();
        toast.success('퀴즈 생성 완료!');
      }, 200);
    })();
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

  // 플로팅버튼과 중복되므로, 채널톡 버튼은 사용하지 않습니다.
  useEffect(() => {
    ChannelService.hideChannelButton();

    return () => {
      // 페이지 이탈시, 채널톡 버튼을 다시 보여줍니다.
      ChannelService.showChannelButton();
    };
  }, []);

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

export default DashBoardCreate;
