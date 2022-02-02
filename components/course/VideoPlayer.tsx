import produce from 'immer';
import Plyr, { APITypes } from 'plyr-react';
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
  });
  const player = useCallback((node) => {
    if (node !== null) {
      const types: APITypes = node as APITypes;
      // DOM node referenced by ref has been unmounted

      if (types.plyr.source === null) return;

      const plyr: Plyr = types.plyr as Plyr;
      // Access the internal plyr instance
      plyr.once('ended', () => {
        console.log('skoncil ten kokot');
      });
      plyr.on('ready', () => {
        console.log(plyr.duration);
      });
    }
  }, []);

  useEffect(() => {
    if (videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com')) {
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
        ref={player}
        source={videoParams}
        options={{
          controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
        }}
      />
    </>
  );
};

export default VideoPlayer;
