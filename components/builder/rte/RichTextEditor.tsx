import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRecoilState } from 'recoil';
import { FullCourse } from '../../../types';
import { courseBuildAtom } from '../../../recoil/atoms/courseBuildAtom';
import produce from 'immer';

export default function RichTextEditor() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [courseInfo, setCourseInfo] = useRecoilState<FullCourse>(courseBuildAtom);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    setIsLoaded(true);
    setDescription(courseInfo.description);
  }, []);

  const saveContent = (e) => {
    console.log(e.target.getContent());
    const content = produce(courseInfo, (draft) => {
      draft.description = e.target.getContent();
    });
    setCourseInfo(content);
  };
  return (
    <>
      {
        isLoaded && (
          <Editor
            apiKey="ip6dc97ffdbrdlancnrcpu7hzhgmeebt7dm0lw188snb6ds9"
            initialValue={description}
            onChange={saveContent}
            init={{
              height: 500,
              menubar: false,
              inline: true,
              plugins: ['lists'],
              toolbar: 'bold italic | bullist numlist',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:12px }',
            }}
          />
        )
        /* <button onClick={log}>Log editor content</button> */
      }
    </>
  );
}
