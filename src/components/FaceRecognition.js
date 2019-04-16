import React from 'react';


const FaceRecognition = ({ imageUrl, boxes }) => {
    const faceBoxes = boxes.map(box => {
        return (
            <div 
                className="bounding-box"
                key={`${box.top}${box.left}`}
                style={{top: box.top, right: box.right, bottom: box.bottom, left: box.left}}
            ></div>
        )
    });

    return (
        <section className="face-recognition">
            <div className="face_box">
                <img id="input-img" src={imageUrl} alt="face-recognition"/>;
                {faceBoxes}
            </div>
        </section>
    );
};

export default FaceRecognition;