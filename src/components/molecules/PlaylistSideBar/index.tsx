// components/molecules/PlaylistSidebar.tsx
import { Grid, List, ListItemButton, Paper, Typography } from '@mui/material';
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
    <Grid item xs={3} sx={{ minWidth: '276px' }}>
      <Paper style={{ height: '80vh', overflowY: 'auto' }}>
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
          <List>
            {myPlaylist?.map((playlist) => (
              <ListItemButton
                key={playlist.id}
                selected={playlist.id === selectedPlaylist} // Add selected prop
                onClick={() => handlePlaylistClick(playlist.id)}
              >
                <PlaylistCard
                  image={playlist.snippet.thumbnails.medium.url}
                  title={playlist.snippet.title}
                  channelTitle={playlist.snippet.channelTitle}
                  publishedAt={playlist.snippet.publishedAt}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>
    </Grid>
  );
};

export default PlaylistSidebar;
