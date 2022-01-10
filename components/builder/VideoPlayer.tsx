import produce from 'immer';
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import { useEffect, useState } from 'react';

const VideoPlayer: React.FC<{ videoUrl: string; videoTitle: string }> = ({ videoUrl, videoTitle }) => {
  const [videoParams, setVideoParams] = useState<Plyr.SourceInfo>({
    type: 'video',
    title: videoTitle,
    sources: [
      {
        src: videoUrl,
      },
    ],
    // poster,
  });
  useEffect(() => {
    if (videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com')) {
      const provider = produce(videoParams, (draft) => {
        draft.sources[0].provider = 'youtube';
      });
      setVideoParams(provider);
    } else if (videoUrl.includes('vimeo.com')) {
      const provider = produce(videoParams, (draft) => {
        draft.sources[0].provider = 'vimeo';
      });
      setVideoParams(provider);
    }
  }, []);
  return (
    <>
      <Plyr
        source={videoParams}
        options={{
          controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        }}
      />
    </>
  );
};

export default VideoPlayer;
