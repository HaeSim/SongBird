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
  useMediaQuery,
} from '@mui/material';
import React from 'react';

import useClientStore from '@/store/client';
import theme from '@/styles/theme';

import MusicPlayer from '../MusicPlayer';

interface IMainContentProps {
  playlistItems: YoutubePlaylistItem[];
  isLoading: boolean;
}

const PlaylistItemContent: React.FC<IMainContentProps> = ({
  playlistItems,
  isLoading,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const COLUMN_NAMES = ['No', 'Title', 'Channel', 'Published Date', 'Play'];

  const { openComponentModal } = useClientStore((state) => state);

  const handlePlayClick = (newVideoId: string) => {
    openComponentModal(<MusicPlayer videoId={newVideoId} />);
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
                  {COLUMN_NAMES.map((column) =>
                    // isMobile 이 true 일때, channel, published date 는 안보이게 처리
                    // isMobile 이 false 일때, 모든 column 을 보이게 처리
                    (isMobile &&
                      column !== 'Channel' &&
                      column !== 'Published Date') ||
                    !isMobile ? (
                      <TableCell
                        key={column}
                        sx={{
                          textAlign: 'center',
                          fontWeight: 700,
                        }}
                      >
                        {column}
                      </TableCell>
                    ) : null
                  )}
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
                    // isMobile 이 true 일때, channel, published date 는 안보이게 처리
                    // isMobile 이 false 일때, 모든 column 을 보이게 처리
                    <TableRow key={item.id}>
                      <TableCell
                        size="small"
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell size="small">{item.snippet.title}</TableCell>
                      {isMobile ? null : (
                        <>
                          <TableCell
                            size="small"
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            {item.snippet.videoOwnerChannelTitle}
                          </TableCell>

                          <TableCell
                            size="small"
                            sx={{
                              textAlign: 'center',
                            }}
                          >
                            {new Date(
                              item.snippet.publishedAt
                            ).toLocaleDateString()}
                          </TableCell>
                        </>
                      )}
                      <TableCell
                        size="small"
                        sx={{
                          textAlign: 'center',
                        }}
                      >
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
