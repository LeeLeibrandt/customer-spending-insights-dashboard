import { Skeleton } from '@mui/material';
import type { RequestContentProps } from '../../types/components';
import { componentStyles } from '../../styles/componentStyles';
import { RequestError } from './RequestError';

const DEFAULT_SKELETON_HEIGHT = 320;

export function RequestContent<T>({
  result,
  errorMessage,
  skeletonHeight = DEFAULT_SKELETON_HEIGHT,
  loadingFallback,
  children,
}: RequestContentProps<T>) {
  if (result.error) {
    return <RequestError message={errorMessage} onRetry={result.retry} />;
  }

  if (!result.data) {
    return (
      loadingFallback ?? (
        <Skeleton
          variant="rectangular"
          height={skeletonHeight}
          sx={componentStyles.skeleton}
          aria-busy="true"
        />
      )
    );
  }

  return children(result.data);
}
