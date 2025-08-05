import { useEffect, useRef } from "react";

const UploadWidget = ({ setImageUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dyklc0yaa",
        uploadPreset: "WikaTokoOnline",
      },
      function (error, result) {
        console.log(result);
        if (!error && result && result.event === "success") {
          console.log("Upload successful:", result.info.secure_url);
          setImageUrl(result.info.secure_url);
        }
        // Handle the result or error here
      }
    );
  }, []);
  return (
    <div>
      <button
        className="btn button-primary bg-blue-500"
        onClick={(e) => {
          e.preventDefault();
          widgetRef.current.open();
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadWidget;
