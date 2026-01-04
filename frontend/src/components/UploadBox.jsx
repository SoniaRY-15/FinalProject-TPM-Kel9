import { useRef } from "react";
export default function UploadBox({
  title,
  description,
  onFileSelect,
  selectedFile,
  icon
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  const handleChange = (e) => {
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="upload-section">
      <p style={{marginBottom: "8px", fontSize: "20px"}}>{title}</p>

      <div className="upload-wrapper" onClick={handleClick}>
        <input
          ref={inputRef}
          type="file"
          className="hidden-input"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleChange}
          required
        />

        <div className="upload-content">
          <img src={icon} alt="upload icon" className="upload-icon" />

          <p>{description}</p>

          {selectedFile && (
            <span className="file-name">
              Selected: {selectedFile.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}