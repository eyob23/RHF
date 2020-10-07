import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const Editor = ({ editorState, onChange }) => {
  const onTextUpdate = (data) => {
    onChange(data);
  };
  return (
    <CKEditor
      editor={ClassicEditor}
      id="someID"
      data={editorState}
      onInit={(editor) => {
        //onTextUpdate(editor.getData());
      }}
      //disabled
      onChange={(event, editor) => {
        //console.log({ event, editor, data });
        //test = editor;
        onTextUpdate(editor.getData());
      }}
      onBlur={(event, editor) => {
        //console.log("Blur.", editor);
        //onTextUpdate(editor.getData())
      }}
      onFocus={(event, editor) => {
        //console.log("Focus.", editor);
        //onTextUpdate(editor.getData())
      }}
    />
  );
};

export default Editor;
