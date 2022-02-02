import produce from 'immer';
import Plyr, { APITypes } from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { courseBuildAtom } from '../../recoil/atoms/courseBuildAtom';
import { FullCourse } from '../../types';

const GetVideoTime: React.FC<{ videoUrl: string; uppyId: string }> = ({ videoUrl, uppyId }) => {
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);
  const [videoParams, setVideoParams] = useState<Plyr.SourceInfo>({
    type: 'video',
    title: 'videoTitle',
    sources: [
      {
        src: videoUrl,
      },
    ],
  });
  const [time, setTime] = useState<number>(0);
  const player = useCallback((node) => {
    if (node !== null) {
      const types: APITypes = node as APITypes;
      // DOM node referenced by ref has been unmounted

      if (types.plyr.source === null) return;

      const plyr: Plyr = types.plyr as Plyr;

      plyr.on('ready', () => {
        const indexes = uppyId.split('-');
        const updateTime = produce(courseInfo, (draft) => {
          draft.content[+indexes[0]].lessons[+indexes[1]].video_duration = plyr.duration;
        });
        setCourseInfo(updateTime);
      });
    }
  }, []);

  useEffect(() => {
    if (videoUrl.includes('youtu.be') || videoUrl.includes('youtube.com')) {
      const provider = produce(videoParams, (draft) => {
        draft.sources[0].provider = 'youtube';
        draft.sources[0].src = videoUrl;
      });
      setVideoParams(provider);
    } else if (videoUrl.includes('vimeo.com')) {
      const provider = produce(videoParams, (draft) => {
        draft.sources[0].provider = 'vimeo';
        draft.sources[0].src = videoUrl;
      });
      setVideoParams(provider);
    } else {
      const provider = produce(videoParams, (draft) => {
        draft.sources[0].src = videoUrl;
      });
      setVideoParams(provider);
    }
  }, [videoUrl, videoParams]);

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

export default GetVideoTime;
