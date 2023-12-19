import {
  Box,
  Button,
  Dialog,
  SwipeableDrawer,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

import Puller from '@/components/atoms/Puller';
import useClientStore from '@/store/client';
import { SlideUpFadeIn } from '@/styles/animation';

const MessageModal = () => {
  const { modal, modalVisible, closeModal } = useClientStore((state) => state);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    // Mobile View
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={modalVisible && modal?.type === 'message'}
        onOpen={() => undefined}
        onClose={closeModal}
        PaperProps={{
          sx: {
            margin: '0 auto',
            maxWidth: theme.breakpoints.values.sm,
            minHeight: '140px',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
            padding: '30px 20px 0 20px',
            paddingBottom: 'env(safe-area-inset-bottom)',
          },
        }}
        transitionDuration={300}
        disableDiscovery={false}
        disableSwipeToOpen={false}
        SwipeAreaProps={{
          sx: {
            display: 'none',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {modal?.type === 'message' && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              height: '100%',
            }}
          >
            <Puller />
            {/* message modal header */}
            <Typography
              variant="h2"
              sx={{
                width: '100%',
                textAlign: 'left',
                marginBottom: '1rem',
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {modal?.title}
            </Typography>
            {/* message modal body */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
                marginBottom: '1rem',
              }}
            >
              {modal.message?.map((message, _) => (
                <Typography
                  key={message}
                  variant="body1"
                  sx={{
                    width: '100%',
                    fontSize: '1rem',
                  }}
                >
                  {message}
                </Typography>
              ))}
            </Box>
            {/* message modal footer */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              {modal?.options.map((option, _) => (
                <Button
                  key={option.label}
                  variant={option.variant || 'contained'}
                  sx={{
                    width: '100%',
                    height: '3rem',

                    borderRadius: '10px',
                    fontSize: '1rem',
                  }}
                  onClick={option.callback}
                >
                  {option.label}
                </Button>
              ))}
            </Box>
          </Box>
        )}
      </SwipeableDrawer>
    );
  }
  // Desktop View
  return (
    <Dialog
      open={modalVisible && modal?.type === 'message'}
      onClose={closeModal}
      PaperProps={{
        sx: {
          width: '560px',
          borderRadius: '8px',
          padding: '20px',
          animation: `${SlideUpFadeIn} 500ms ease-in-out`,
        },
      }}
    >
      {modal?.type === 'message' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              width: '100%',
              textAlign: 'left',
              marginBottom: '1rem',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            {modal?.title}
          </Typography>
          {/* message modal body */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            {modal.message?.map((message, _) => (
              <Typography
                key={message}
                variant="body1"
                sx={{
                  width: '100%',
                  fontSize: '1rem',
                }}
              >
                {message}
              </Typography>
            ))}
          </Box>
          {/* message modal footer */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}
          >
            {modal?.options.map((option, _) => (
              <Button
                key={option.label}
                variant={option.variant || 'contained'}
                sx={{
                  width: '100%',
                  height: '3rem',

                  borderRadius: '10px',
                  fontSize: '1rem',
                }}
                onClick={option.callback}
              >
                {option.label}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Dialog>
  );
};

export default MessageModal;
