// components/molecules/PlaylistSidebar.tsx
import { Grid, List, ListItemButton, Paper } from '@mui/material';
import React from 'react';

import PlaylistCard from '@/components/atoms/PlaylistCard';

interface PlaylistSidebarProps {
  myPlaylist: YoutubePlaylistResponse;
  selectedPlaylist: string;
  handlePlaylistClick(playlistId: string): void;
}

const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  myPlaylist,
  selectedPlaylist,
  handlePlaylistClick,
}) => {
  return (
    <Grid item xs={3}>
      <Paper style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <List>
          {myPlaylist.items.map((playlist) => (
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
      </Paper>
    </Grid>
  );
};

export default PlaylistSidebar;
