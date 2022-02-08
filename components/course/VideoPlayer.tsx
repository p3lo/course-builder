import produce from 'immer';
import Plyr, { APITypes } from 'plyr-react';
import 'plyr-react/dist/plyr.css';
import { useCallback, useEffect, useState } from 'react';
import { selector, useRecoilState, useSetRecoilState } from 'recoil';
import { courseDetailsAtom } from '../../recoil/atoms/courseDetailsAtom';
import { enrolledCourseDetailsAtom } from '../../recoil/atoms/enrolledCourseDetailsAtom';
import { CourseDetails, EnrolledCourse, Section } from '../../types';

const VideoPlayer: React.FC<{ videoUrl: string; videoTitle: string; course_content: Section[] }> = ({
  videoUrl,
  videoTitle,
  course_content,
}) => {
  const [videoParams, setVideoParams] = useState<Plyr.SourceInfo>({
    type: 'video',
    title: videoTitle,
    sources: [
      {
        src: videoUrl,
      },
    ],
  });

  const [video, setVideo] = useRecoilState<CourseDetails>(courseDetailsAtom);
  const player = useCallback(
    (node) => {
      if (node !== null) {
        const types: APITypes = node as APITypes;
        // DOM node referenced by ref has been unmounted

        if (types.plyr.source === null) return;

        const plyr: Plyr = types.plyr as Plyr;
        // Access the internal plyr instance
        plyr.once('ended', () => {
          setNextVideo();
        });
        plyr.on('ready', () => {
          plyr.play();
        });
      }
    },
    [video]
  );
  const setNextVideo = () => {
    const getSectionIndex = course_content.findIndex((item) => item.id === video.sectionId);
    // console.log(getSectionIndex, video, course_content);
    const getLessonIndex = course_content[getSectionIndex].lessons.findIndex((item) => item.id === video.lessonId);
    if (course_content[getSectionIndex].lessons.length > getLessonIndex + 1) {
      const vid = produce(video, (draft) => {
        draft.url = course_content[getSectionIndex].lessons[getLessonIndex + 1].content_url;
        draft.title = course_content[getSectionIndex].lessons[getLessonIndex + 1].title;
        draft.lessonId = course_content[getSectionIndex].lessons[getLessonIndex + 1].id;
        draft.sectionId = course_content[getSectionIndex].id;
        draft.completed_lesson = `${video.sectionId}-${video.lessonId}`;
      });
      setVideo(vid);
    } else {
      if (course_content.length > getSectionIndex + 1) {
        const vid = produce(video, (draft) => {
          draft.url = course_content[getSectionIndex + 1].lessons[0].content_url;
          draft.title = course_content[getSectionIndex + 1].lessons[0].title;
          draft.lessonId = course_content[getSectionIndex + 1].lessons[0].id;
          draft.sectionId = course_content[getSectionIndex + 1].id;
          draft.completed_lesson = `${video.sectionId}-${video.lessonId}`;
        });
        setVideo(vid);
      } else {
        // go from beginning
        const vid = produce(video, (draft) => {
          draft.url = course_content[0].lessons[0].content_url;
          draft.title = course_content[0].lessons[0].title;
          draft.lessonId = course_content[0].lessons[0].id;
          draft.sectionId = course_content[0].id;
          draft.completed_lesson = `${video.sectionId}-${video.lessonId}`;
        });
        setVideo(vid);
      }
    }
  };

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
