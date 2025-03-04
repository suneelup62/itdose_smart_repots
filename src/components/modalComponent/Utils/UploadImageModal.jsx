import React, { } from "react";
import Modal from "../Modal";
import WebcamCapture from "../../commonComponents/WebcamCapture";

const UploadImageModal = ({
  isuploadOpen,
  closeCameraStream,
  setIsuploadOpen,
  handleImageChange,
  startCamera,
  cameraStream,
  handleAPI,
  setModalData,
  modalData,
  takePhoto
}) => {
  //
  const isMobile = window.innerWidth <= 768;
  return (
    <Modal
      visible={isuploadOpen}
      handleAPI={handleAPI}
      setModalData={setModalData}
      modalData={modalData}
      setVisible={() => {
        closeCameraStream("close"); // Close camera stream before closing modal
        setIsuploadOpen(false);
      }}
      modalWidth={`500px`}
      buttonName="Add"
      Header="Upload Image"
      buttons={
        <>
          <input
            type="file"
            id="fileInput"
            onChange={handleImageChange}
            style={{ display: "none" }}
            accept="image/png, image/gif, image/jpeg"
          />
          <button className="btn btn-sm">
            <label htmlFor="fileInput" className="text-white file-type-browse">
              Browse
            </label>
          </button>
          {!isMobile && <button className="text-white" onClick={startCamera}>
            Webcam
          </button>}

        </>
      }
    >
    
      <div className={`d-flex upload-image-model text-center justify-content-center`}>
        {modalData?.preview && !cameraStream?.active ? (
          <div style={{ height: "150px" }}>
            <img src={modalData?.preview} alt="Preview" width="200" height="150" />
          </div>
        ) : (
          <WebcamCapture height={"150"} width={'200'} takePhoto={takePhoto} />
        )}
      </div>
    </Modal>
  );
};

export default UploadImageModal;
