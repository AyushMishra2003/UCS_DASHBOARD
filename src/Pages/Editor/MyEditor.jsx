import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function MyEditor() {
  return (
    <div className="p-4 border rounded-lg">
      <SunEditor
        setOptions={{
          buttonList: [
            ["undo", "redo"], // Undo/Redo
            ["bold", "underline", "italic", "strike"], // Text Formatting
            ["font", "fontSize", "formatBlock"], // ✅ Font Customization
            ["fontColor", "hiliteColor"], // ✅ Text Color & Background Color
            ["align", "list", "lineHeight"], // Text Alignment & Spacing
            ["table"], // ✅ Insert & Edit Table
            ["link"], // ✅ Hyperlink Support (Internal & External Links)
            ["image", "video"], // ✅ Media Support
            ["codeView"], // View HTML Code
          ],
          linkProtocol: "", // ✅ Disable default "http://"
          attributesWhitelist: {
            a: "href target title class", // ✅ Allow custom attributes
          },
          defaultTag: "div",
        }}
      />
    </div>
  );
}

export default MyEditor;
