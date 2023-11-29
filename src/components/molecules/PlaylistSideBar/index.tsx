// components/molecules/PlaylistSidebar.tsx
import { Grid, ListItemButton, Paper, Typography } from '@mui/material';
import React from 'react';

import PlaylistCard from '@/components/atoms/PlaylistCard';

interface PlaylistSidebarProps {
  myPlaylist: YoutubePlaylistItem[];
  selectedPlaylist: string;
  handlePlaylistClick(playlistId: string): void;
}

const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  myPlaylist,
  selectedPlaylist,
  handlePlaylistClick,
}) => {
  return (
    <Grid item xs={3} sx={{ minWidth: '100%' }}>
      <Paper style={{ width: '100%' }}>
        {myPlaylist?.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '90%',
            }}
          >
            No playlist found
          </Typography>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
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
                        ? '2px solid #007bff'
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
