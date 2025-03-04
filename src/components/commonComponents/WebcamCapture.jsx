import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = ({height,width,takePhoto}) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoConstraints = {
    width: width,
    height: height,
    facingMode: "user"
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    takePhoto(imageSrc)
  };

  return (
    <div className='d-flex '>
      <Webcam
        audio={false}
        height={height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={width}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture} className="btn btn-primary">Capture Photo</button>
      {capturedImage && (
        <div>
          <img src={capturedImage} alt="Captured" height={height} width={width}/>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
