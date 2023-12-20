// components/molecules/PlaylistSidebar.tsx
import {
  Box,
  CircularProgress,
  Grid,
  ListItemButton,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

import PlaylistCard from '@/components/atoms/PlaylistCard';
import TooltipWithClick from '@/components/atoms/TooltipWithClick';
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
      <Paper
        style={{
          width: '100%',
          minHeight: '334px',
          padding: '8px',
          backgroundColor: '#3a4d68',
        }}
      >
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
              alignItems: 'center',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              height: '334px',
            }}
          >
            {myPlaylist?.length === 0 && (
              <Typography
                variant="h6"
                align="center"
                sx={{
                  color: '#ffffff',
                  fontWeight: 700,
                  margin: 'auto',
                }}
              >
                재생목록이 없습니다.
              </Typography>
            )}
            {myPlaylist?.map((playlist) => (
              <div
                key={playlist.id}
                style={{
                  marginRight: '16px', // Adjust margin as needed
                }}
              >
                {playlist.status.privacyStatus !== 'public' ? (
                  <TooltipWithClick
                    title="비공개 재생목록 입니다. 공개 수준을 변경해주세요."
                    placement="top"
                    arrow
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
                      disabled
                    >
                      <PlaylistCard
                        image={playlist.snippet.thumbnails.medium.url}
                        title={playlist.snippet.title}
                        itemCount={playlist.contentDetails.itemCount}
                        channelTitle={playlist.snippet.channelTitle}
                        publishedAt={playlist.snippet.publishedAt}
                      />
                    </ListItemButton>
                  </TooltipWithClick>
                ) : (
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
                      itemCount={playlist.contentDetails.itemCount}
                      channelTitle={playlist.snippet.channelTitle}
                      publishedAt={playlist.snippet.publishedAt}
                    />
                  </ListItemButton>
                )}
              </div>
            ))}
          </div>
        )}
      </Paper>
    </Grid>
  );
};

export default PlaylistSidebar;
