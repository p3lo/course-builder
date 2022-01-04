import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      {
        isLoaded && (
          <Editor
            apiKey="ip6dc97ffdbrdlancnrcpu7hzhgmeebt7dm0lw188snb6ds9"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p></p>"
            init={{
              height: 500,
              menubar: false,
              inline: true,
              plugins: [
                'lists',
                // 'advlist autolink lists link image charmap print preview anchor',
                // 'searchreplace visualblocks code fullscreen',
                // 'insertdatetime media table paste code help wordcount',
              ],
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
