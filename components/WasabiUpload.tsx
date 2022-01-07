import axios from 'axios';
import AwsS3 from '@uppy/aws-s3';
import { StatusBar, FileInput } from '@uppy/react';
import Uppy from '@uppy/core';
import '@uppy/core/dist/style.min.css';
import '@uppy/file-input/dist/style.min.css';
import '@uppy/status-bar/dist/style.min.css';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { FullCourse } from '../types';
import { courseBuildAtom } from '../recoil/atoms/courseBuildAtom';
import produce from 'immer';

const WasabiUpload: React.FC<{ type: string[]; uppyId: string; path: string }> = ({ type, uppyId, path }) => {
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);
  const [uppyInfo, setUppyInfo] = useState<string>(() => {
    if (uppyId === 'details_image') {
      return '3';
    } else if (uppyId === 'details_video') {
      return '30';
    } else {
      return '300';
    }
  });
  const [uploadComplete, setUploadComplete] = useState<string>(() => {
    if (uppyId === 'details_image') {
      return courseInfo.image;
    } else if (uppyId === 'details_video') {
      return courseInfo.preview;
    }
  });
  const [url, setUrl] = useState<string>(courseInfo.image);

  useEffect(() => {
    let updateUrl: FullCourse;
    if (uppyId === 'details_image') {
      updateUrl = produce(courseInfo, (draft) => {
        draft.image = url;
      });
    } else if (uppyId === 'details_video') {
      updateUrl = produce(courseInfo, (draft) => {
        draft.preview = url;
      });
    }
    setCourseInfo(updateUrl);
  }, [url]);

  const uppy = new Uppy({
    id: uppyId,
    autoProceed: true,
    restrictions: {
      maxFileSize: +uppyInfo * 1024 * 1024,
      maxNumberOfFiles: 1,
      minNumberOfFiles: null,
      allowedFileTypes: type,
    },
  })
    .use(AwsS3, {
      //@ts-ignore
      async getUploadParameters(file) {
        return axios
          .post(`/api/builder/wasabi-presigned-url?file=${file.name}`, {
            path,
          })
          .then((response) => {
            return {
              method: 'PUT',
              url: response.data.url,
              fields: [],
            };
          });
      },
    })
    .on('complete', (result) => {
      if (result.successful) {
        // updateMedia('upload', result.successful[0].uploadURL);
        setUrl(result.successful[0].uploadURL);
        setUploadComplete(`Upload complete! File: ${result.successful[0].name}`);
      } else {
        setUploadComplete(`Upload error: ${result.failed}`);
      }
      uppy.close();
    });
  return (
    <div className="flex flex-col items-center justify-center my-5 space-y-2">
      <p>Upload file max ({uppyInfo} MB)</p>
      {uploadComplete && (
        <div className="flex flex-col items-center">
          <p className="font-bold"> Filename: </p>
          <p className="text-center">{uploadComplete}</p>
        </div>
      )}

      <FileInput uppy={uppy} pretty />
      <div className="w-full">
        <StatusBar uppy={uppy} hideUploadButton showProgressDetails />
      </div>
    </div>
  );
};

export default WasabiUpload;
