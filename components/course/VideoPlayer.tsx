import produce from 'immer';
import Plyr from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import { useCallback, useEffect, useState } from 'react';

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
  console.log(videoParams);
  useEffect(() => {
    if (videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com')) {
      console.log(videoTitle);
      const provider = produce(videoParams, (draft) => {
        draft.sources[0].provider = 'youtube';
        draft.sources[0].src = videoUrl;
        draft.title = videoTitle;
      });
      setVideoParams(provider);
    } else if (videoUrl.includes('vimeo.com')) {
      const provider = produce(videoParams, (draft) => {
        draft.sources[0].provider = 'vimeo';
        draft.sources[0].src = videoUrl;
        draft.title = videoTitle;
      });
      setVideoParams(provider);
    } else {
      const provider = produce(videoParams, (draft) => {
        draft.sources[0].src = videoUrl;
        draft.title = videoTitle;
      });
      setVideoParams(provider);
    }
  }, [videoUrl, videoTitle, videoParams]);

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
