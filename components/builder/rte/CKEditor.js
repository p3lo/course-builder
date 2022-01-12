import { useEffect, useRef, useState } from 'react';

function CKEditor({ onChange, editorLoaded, name, value, toolbar }) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [config, setConfig] = useState([]);

  useEffect(() => {
    if (toolbar === 'profile') {
      setConfig({
        toolbar: ['bold', 'italic'],
      });
    } else {
      setConfig({
        toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList'],
      });
    }
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
  }, []);

  // const config = {
  //   toolbar: ['bold', 'italic'],
  // };

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          config={config}
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            // console.log({ event, editor, data })
            onChange(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default CKEditor;
