import React from "react";

const ImageLinkForm = ({ onBtnClear, onInputChange, onBtnSubmit }) => {
  return (
    <section className="input_box">
      <p>Paste an image address to detect faces in it!</p>
      <form onSubmit={onBtnSubmit} className="input_wrapper">
        <div className="input_button" onClick={onBtnClear}>
          Clear
        </div>
        <input
          className="input_text"
          type="text"
          placeholder="URL"
          onChange={onInputChange}
        />
        <input className="input_button" type="submit" value="Detect" />
      </form>
    </section>
  );
};

export default ImageLinkForm;
