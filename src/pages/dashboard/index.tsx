import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import type { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import { useGetPlaylistItemQuery } from '@/store/server/features/youtube/queries';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  try {
    // const response = await axios.get(
    //   `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=${process.env.YOUTUBE_API_KEY}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${session.accessToken}`,
    //       Accept: 'application/json',
    //     },
    //   }
    // );
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
            {/* Playlist Sidebar */}
            <Grid item xs={3}>
              <Paper>
                <List>
                  {myPlaylist.items.map((playlist) => (
                    <ListItemButton
                      key={playlist.id}
                      onClick={() => handlePlaylistClick(playlist.id)}
                    >
                      <ListItemText primary={playlist.snippet.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Main Content */}
            <Grid item xs={9}>
              <Paper>
                <Typography variant="h5" align="center" gutterBottom>
                  {selectedPlaylist
                    ? `Playlist ${selectedPlaylist}`
                    : 'Select a playlist'}
                </Typography>

                {playlistItems && (
                  <List>
                    {playlistItems.items.map((item) => (
                      <ListItem key={item.id}>
                        <ListItemText primary={item.snippet.title} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Paper>
            </Grid>
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
