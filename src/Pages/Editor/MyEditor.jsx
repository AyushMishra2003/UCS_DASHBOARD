import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import HomeLayout from "../../Layouts/HomeLayouts";

function MyEditor() {
  return (
    <HomeLayout>
    <SunEditor
      setOptions={{
        buttonList: [
          ["undo", "redo"],
          ["bold", "underline", "italic", "strike"],
          ["table", "image", "video", "link"], // Table & Image support
          ["align", "list", "formatBlock", "fontSize", "codeView"],
        ],
      }}
    />
    </HomeLayout>
    
  );
}

export default MyEditor;
