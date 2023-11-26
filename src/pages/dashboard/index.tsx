import { Grid, Toolbar, Typography } from '@mui/material';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import PlaylistItemContent from '@/components/molecules/PlaylistItemContent';
import PlaylistSidebar from '@/components/molecules/PlaylistSideBar';
import Default from '@/components/templates/Layout/Default';
import {
  useGetPlaylistItemQuery,
  useGetPlaylistQuery,
} from '@/store/server/features/youtube/queries';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

import { authOptions } from '../api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/',
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
  const { data: session } = useSession();
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');

  const { data: playlistItems } = useGetPlaylistItemQuery(selectedPlaylist);
  const { data: myPlaylist } = useGetPlaylistQuery();

  const handlePlaylistClick = async (playlistId: string) => {
    setSelectedPlaylist(playlistId);
  };

  useEffect(() => {
    if (myPlaylist?.items?.length) {
      setSelectedPlaylist(myPlaylist?.items[0]?.id ?? '');
    }
  }, [myPlaylist]);

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
    </>
  );
};

Dashboard.getLayout = generateGetLayout(Default);

export default Dashboard;

/*
how to get playlist item
const {data}:{data:YoutubePlaylistItemListResponse}: = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`
    );
*/
