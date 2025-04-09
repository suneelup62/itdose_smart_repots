import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";
import { useEffect } from "react";

const FullTextEditor = ({ value, setValue, EditTable, setEditTable }) => {
  console.log(value);
  const [editor, setEditor] = useState(null);
  
  useEffect(() => {
    if (editor && editor?.status === "ready" && EditTable) {
      editor.setData(value || "");
    }
  }, [value, EditTable, editor]);
  const onInstanceReady = (evt) => {
    const readyEditor = evt.editor;
    setEditor(readyEditor);
    if (EditTable && value) {
      readyEditor.setData(value);
    }
  };

  const onChange = (evt) => {
    setEditTable(false);
    var newContent = evt?.editor?.getData();
    setValue(newContent);
  };
  return (
    <CKEditor
      initData={value || ""}
      onChange={onChange}
      onInstanceReady={onInstanceReady}
      config={editorConfig}
    />
  );
};

export default FullTextEditor;