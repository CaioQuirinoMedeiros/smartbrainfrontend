import React from "react";

const FaceRecognition = ({ imageUrl, boxes, error }) => {
  const faceBoxes = !!error ? (
    <h3 className="errorLogin apiError">{error}</h3>
  ) : (
    boxes.map(box => {
      return (
        <div
          className="bounding-box"
          key={`${box.top}${box.left}`}
          style={{
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            left: box.left
          }}
        />
      );
    })
  );

  return (
    <section className="face-recognition">
      <div className="face_box">
        {faceBoxes}
        <img id="input-img" src={imageUrl} alt="" />
      </div>
    </section>
  );
};

export default FaceRecognition;
