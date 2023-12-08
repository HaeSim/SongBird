import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';

import useClientStore from '@/store/client';

import MusicPlayer from '../MusicPlayer';

interface IMainContentProps {
  playlistItems: YoutubePlaylistItem[];
  isLoading: boolean;
}

const PlaylistItemContent: React.FC<IMainContentProps> = ({
  playlistItems,
  isLoading,
}) => {
  const COLUMN_NAMES = ['No', 'Title', 'Channel', 'Published Date', 'Play'];

  const { openComponentModal } = useClientStore((state) => state);

  const handlePlayClick = (newVideoId: string) => {
    openComponentModal(
      <MusicPlayer
        title={
          playlistItems.find(
            (item) => item.snippet.resourceId.videoId === newVideoId
          )?.snippet.title ?? ''
        }
        videoId={newVideoId}
      />
    );
  };

  return (
    <Grid item xs={3} sx={{ minWidth: '100%', marginBottom: '64px' }}>
      <Paper
        style={{
          minHeight: '100%',
          overflowY: 'auto',
          backgroundColor: '#3a4d68',
        }}
      >
        {playlistItems && (
          <TableContainer>
            {/*  */}
            <Table>
              <TableHead>
                <TableRow>
                  {COLUMN_NAMES.map((column) => (
                    <TableCell
                      key={column}
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  playlistItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>{item.snippet.title}</TableCell>
                      <TableCell
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {item.snippet.videoOwnerChannelTitle}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {new Date(
                          item.snippet.publishedAt
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            handlePlayClick(item.snippet.resourceId.videoId)
                          }
                        >
                          <PlayArrowIcon
                            sx={{
                              color: '#fff',
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Grid>
  );
};

export default PlaylistItemContent;
