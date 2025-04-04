import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";
import { useEffect } from "react";

const FullTextEditor = ({ value, setValue, EditTable, setEditTable }) => {
  const [editor, setEditor] = useState(null);
  const [edit, setEdit] = useState(false);

  const onBeforeLoad = (e) => {
    if (e?.editor) {
      setEditor(e.editor);
    }
  };

  useEffect(() => {
    if (editor && edit) {
      editor.setData(value || "");
    }
  }, [value]);

  useEffect(() => {
    if (editor && EditTable) {
      editor.setData(value || "");
    }
  }, [value]);

  const onChange = (evt) => {
    setEdit(false);
    setEditTable(false);
    var newContent = evt?.editor?.getData();
    setValue(newContent);
  };

  const editorConfig = {
    // extraPlugins: "image,uploadimage,filebrowser",
    // filebrowserUploadUrl: "/upload/image", // Your backend API for file upload
    // filebrowserBrowseUrl: "/browse/images", // Optional: file manager
    // removePlugins: "image2",
    extraPlugins:
      "basicstyles, forms, image2, embed, autoembed, widget,clipboard, lineutils, dialog, dialogui, scayt, notification, toolbar, resize, justify, colorbutton, find, templates, colordialog, newpage, save, print, preview, pastefromword, pagebreak, font,stylescombo",
    toolbar: [
      {
        name: "document",
        items: ["Source", "Save", "NewPage", "Preview", "Print", "Templates"],
      },
      {
        name: "clipboard",
        items: [
          "Cut",
          "Copy",
          "Paste",
          "PasteText",
          "PasteFromWord",
          "Undo",
          "Redo",
        ],
      },
      { name: "editing", items: ["Find", "Replace", "SelectAll", "Scayt"] },
      "/",
      {
        name: "forms",
        items: [
          "Form",
          "Checkbox",
          "Radio",
          "TextField",
          "Textarea",
          "Select",
          "Button",
          "ImageButton",
          "HiddenField",
        ],
      },
      "/",
      {
        name: "basicstyles",
        items: ["Bold", "Italic", "Underline"],
      },
      {
        name: "paragraph",
        items: [
          "NumberedList",
          "BulletedList",
          "Outdent",
          "Indent",
          "Blockquote",
          "CreateDiv",
          "JustifyLeft",
          "JustifyCenter",
          "JustifyRight",
          "JustifyBlock",
          "BidiLtr",
          "BidiRtl",
          "Language",
        ],
      },
      { name: "links", items: ["Link", "Unlink", "Anchor"] },
      {
        name: "insert",
        items: [
          "Image",
          "Table",
          "HorizontalRule",
          "Smiley",
          "SpecialChar",
          "PageBreak",
          "Iframe",
          "Embed",
        ],
      },
      "/",
      { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
      { name: "colors", items: ["TextColor", "BGColor"] },
      { name: "tools", items: ["Maximize", "ShowBlocks"] },
      { name: "others", items: ["-"] },
    ],

    height: 180,
    enterMode: 2,
  };

  return (
    <CKEditor
      initData={value || ""}
      onChange={onChange}
      onLoaded={onBeforeLoad}
      config={editorConfig}
    />
  );
};

export default FullTextEditor;
