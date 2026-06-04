import { usePhotos } from '../../hooks/usePhotos';
import { useLike } from '../../hooks/useLike';
import { QueryKey } from '../../config/consts';
import PhotoFeed from './PhotoFeed';

export default function HomeFeed() {
  const queryResult = usePhotos();
  const likeResult = useLike([QueryKey.PHOTOS], [[QueryKey.LIKED]]);
  return <PhotoFeed queryResult={queryResult} likeResult={likeResult} />;
}
