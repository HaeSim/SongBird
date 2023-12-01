import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Typography } from '@mui/material';
import toast from 'react-hot-toast';

import MetaInfo from '@/components/atoms/MetaInfo';
import Default from '@/components/templates/Layout/Default';
import useClientStore from '@/store/client';
import type { NextPageWithLayout } from '@/utils/common';
import { generateGetLayout } from '@/utils/common';
import { deleteAllQuizzesFromDB } from '@/utils/indexDB';

const Settings: NextPageWithLayout = () => {
  const { openBackdrop, closeBackdrop, openMessageModal, closeModal } =
    useClientStore((state) => state);

  const handleDeleteAllQuizzesFromDB = async () => {
    openBackdrop({
      message: '퀴즈 삭제 중...',
    });

    // 1000ms sleep
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    try {
      await deleteAllQuizzesFromDB();
      toast.success('퀴즈를 모두 삭제했습니다.');
    } catch (error) {
      toast.error('퀴즈를 삭제하는데 실패했습니다.');
    } finally {
      closeBackdrop();
    }
  };

  const handleDeleteQuizOnClick = async () => {
    openMessageModal({
      title: '퀴즈 삭제',
      message: [
        '퀴즈를 삭제하시겠습니까?',
        '삭제된 퀴즈는 복구할 수 없습니다.',
      ],
      options: [
        { label: '취소', callback: closeModal, variant: 'outlined' },
        {
          label: '삭제',
          callback: async () => {
            closeModal();
            await handleDeleteAllQuizzesFromDB();
          },
          variant: 'contained',
          color: 'error',
        },
      ],
    });
  };

  return (
    <>
      <MetaInfo
        title="Settings | 🎵 SongBird 🎵"
        description="This is the Settings page of the 🎵 SongBird 🎵 app."
      />
      <Grid container spacing={2}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          fontWeight={700}
          marginLeft={2}
        >
          설정 목록
        </Typography>
        {/* 저장된 퀴즈 삭제 */}
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={500} marginLeft={2}>
            저장된 퀴즈 삭제
          </Typography>
          <DeleteIcon
            sx={{
              marginLeft: 2,
              cursor: 'pointer',
              ':hover': {
                color: '#f50057',
              },
            }}
            onClick={handleDeleteQuizOnClick}
          />
        </Grid>
      </Grid>
    </>
  );
};

Settings.getLayout = generateGetLayout(Default);

export default Settings;
