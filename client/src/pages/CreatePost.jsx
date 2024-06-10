import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { TextInput, Button, Select, Alert } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  // editor 实例
  const [editor, setEditor] = useState(null); // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState(null);
  const toolbarConfig = {};
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const editorConfig = {
    // JS 语法
    placeholder: "请输入内容...",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api1/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, content: html }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            value={formData.title || ""}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          ></TextInput>
          <Select
            value={formData.category || "uncategorized"}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
          >
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
              onChange={(editor) => {
                // setFormData({ ...formData, content: html });
                setHtml(editor.getHtml());
              }}
              mode="default"
              style={{ height: "300px", overflowY: "hidden" }}
            />
          </div>
        </>
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && (
          <Alert className="mt-5 " color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
