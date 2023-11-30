// components/molecules/PlaylistSidebar.tsx
import {
  Box,
  CircularProgress,
  Grid,
  ListItemButton,
  Paper,
} from '@mui/material';
import React from 'react';

import PlaylistCard from '@/components/atoms/PlaylistCard';
import theme from '@/styles/theme';

interface PlaylistSidebarProps {
  myPlaylist: YoutubePlaylistItem[];
  selectedPlaylist: string;
  handlePlaylistClick(playlistId: string): void;
  isLoading: boolean;
}

const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  myPlaylist,
  selectedPlaylist,
  handlePlaylistClick,
  isLoading,
}) => {
  return (
    <Grid item xs={3} sx={{ minWidth: '100%' }}>
      <Paper style={{ width: '100%', padding: '8px' }}>
        {isLoading ? (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 275,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              overflowX: 'auto',
            }}
          >
            {myPlaylist?.map((playlist) => (
              <div
                key={playlist.id}
                style={{
                  marginRight: '16px', // Adjust margin as needed
                }}
              >
                <ListItemButton
                  style={{
                    cursor: 'pointer',
                    marginBottom: '8px',
                    padding: '8px',
                    border:
                      playlist.id === selectedPlaylist
                        ? `2px solid ${theme.palette.primary.main}`
                        : 'none', // Add border for selected playlist
                  }}
                  onClick={() => handlePlaylistClick(playlist.id)}
                  selected={playlist.id === selectedPlaylist}
                >
                  <PlaylistCard
                    image={playlist.snippet.thumbnails.medium.url}
                    title={playlist.snippet.title}
                    channelTitle={playlist.snippet.channelTitle}
                    publishedAt={playlist.snippet.publishedAt}
                  />
                </ListItemButton>
              </div>
            ))}
          </div>
        )}
      </Paper>
    </Grid>
  );
};

export default PlaylistSidebar;
