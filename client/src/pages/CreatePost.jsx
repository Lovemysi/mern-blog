import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { TextInput, Button, Select } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
// import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
export default function CreatePost() {
  // editor 实例
  const [editor, setEditor] = useState(null); // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState("<p>hello</p>");

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setTimeout(() => {
      setHtml("<p>hello world</p>");
    }, 1500);
  }, []);

  // 工具栏配置

  const toolbarConfig = {}; // JS 语法

  // 编辑器配置

  const editorConfig = {
    // JS 语法
    placeholder: "请输入内容...",
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          ></TextInput>
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>

        {/* wangeditor */}
        <>
          <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: "1px solid #ccc" }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={(editor) => setHtml(editor.getHtml())}
              mode="default"
              style={{ height: "300px", overflowY: "hidden" }}
            />
          </div>
        </>
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
}
