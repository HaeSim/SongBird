import { Grid, Toolbar, Typography } from '@mui/material';
import type { AxiosError } from 'axios';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import PlaylistItemContent from '@/components/molecules/PlaylistItemContent';
import PlaylistSidebar from '@/components/molecules/PlaylistSideBar';
import Default from '@/components/templates/Layout/Default';
import { useGetPlaylistItemQuery } from '@/store/server/features/youtube/queries';
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
  try {
    const response = await axios.get(
      'https://youtube.googleapis.com/youtube/v3/playlists',
      {
        params: {
          part: 'snippet,contentDetails',
          maxResults: 25,
          mine: true,
          key: process.env.YOUTUBE_API_KEY,
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: 'application/json',
        },
      }
    );
    return {
      props: {
        myPlaylist: response.data,
      },
    };
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const error: AxiosError = e;
      // eslint-disable-next-line no-console
      console.error(error.response?.data);
    } else {
      // eslint-disable-next-line no-console
      console.error(e);
    }
    return {
      props: {},
    };
  }
};

interface IDashboardProps {
  myPlaylist: YoutubePlaylistResponse;
}

const Dashboard: NextPageWithLayout<IDashboardProps> = ({
  myPlaylist,
}: IDashboardProps) => {
  const { data: session } = useSession();
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>('');
  const { data: playlistItems } = useGetPlaylistItemQuery(selectedPlaylist);

  const handlePlaylistClick = async (playlistId: string) => {
    setSelectedPlaylist(playlistId);
  };

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
        title="대시보드 | 🎵 Music Quiz 🎵"
        description="This is the Quiz page of the 🎵 Music Quiz 🎵 app."
      />
      <div style={{ display: 'flex' }}>
        <main style={{ flexGrow: 1 }}>
          <Toolbar />
          <Typography paragraph>대시보드</Typography>

          <Grid container spacing={2}>
            <PlaylistSidebar
              myPlaylist={myPlaylist?.items ?? []}
              selectedPlaylist={selectedPlaylist}
              handlePlaylistClick={handlePlaylistClick}
            />
            <PlaylistItemContent playlistItems={playlistItems?.items ?? []} />
          </Grid>
        </main>
      </div>
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
