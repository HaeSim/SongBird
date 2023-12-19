import {
  Dialog,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

import Puller from '@/components/atoms/Puller';
import useClientStore from '@/store/client';
import { SlideUpFadeIn } from '@/styles/animation';

const ComponentModal: React.FC = () => {
  const { modal, modalVisible, closeModal } = useClientStore((state) => state);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    // Mobile View
    return (
      <SwipeableDrawer
        className="component-modal"
        anchor="bottom"
        open={modalVisible && modal?.type === 'component'}
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
        <Puller />
        {modal?.type === 'component' && modal?.component}
      </SwipeableDrawer>
    );
  }
  // Desktop View
  return (
    <Dialog
      open={modalVisible && modal?.type === 'component'}
      onClose={closeModal}
      PaperProps={{
        sx: {
          maxWidth: 'lg',
          borderRadius: '8px',
          padding: '30px',
          animation: `${SlideUpFadeIn} 500ms ease-in-out`,
        },
      }}
    >
      {modal?.type === 'component' && modal?.component}
    </Dialog>
  );
};

export default ComponentModal;
