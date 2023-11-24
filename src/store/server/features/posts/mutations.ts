import { useMutation } from 'react-query';

import type { ParamsAddPost } from '../../../../types/interfaces/post';
import { addPost } from './services';

export const useAddPostMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (e: any) => void;
}) => {
  return useMutation((params: ParamsAddPost) => addPost(params), {
    onSuccess,
    onError,
  });
};
