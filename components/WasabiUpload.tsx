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
  const [uppyInfo, setUppyInfo] = useState<string>('Upload file (max 300MB)');
  const [url, setUrl] = useState<string>(courseInfo.image);

  useEffect(() => {
    const updateUrl = produce(courseInfo, (draft) => {
      draft.image = url;
    });
    setCourseInfo(updateUrl);
  }, [url]);

  const uppy = new Uppy({
    id: uppyId,
    autoProceed: true,
    restrictions: {
      maxFileSize: 314572800,
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
        setUppyInfo(`Upload complete! File: ${result.successful[0].name}`);
      } else {
        setUppyInfo(`Upload error: ${result.failed}`);
      }
      uppy.close();
    });
  return (
    <div className="flex flex-col items-center justify-center my-5">
      <p>{uppyInfo}</p>
      <FileInput uppy={uppy} pretty />
      <div className="w-full">
        <StatusBar uppy={uppy} hideUploadButton showProgressDetails />
      </div>
    </div>
  );
};

export default WasabiUpload;
