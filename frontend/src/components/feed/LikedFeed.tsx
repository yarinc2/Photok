import { useLikedPhotos } from '../../hooks/useLikedPhotos';
import { useLike } from '../../hooks/useLike';
import { QueryKey } from '../../config/consts';
import PhotoFeed from './PhotoFeed';

export default function LikedFeed() {
  const queryResult = useLikedPhotos();
  const likeResult = useLike([QueryKey.LIKED], [[QueryKey.PHOTOS]], { removeOnUnlike: true });
  return <PhotoFeed queryResult={queryResult} likeResult={likeResult} />;
}
