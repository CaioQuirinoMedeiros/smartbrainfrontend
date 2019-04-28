import React from "react";

const ImageLinkForm = ({ onBtnClear, onInputChange, onBtnSubmit }) => {
  return (
    <section className="input_box">
      <p>Esse cérebro mágico vai detectar rostos nas suas fotos!</p>
      <div className="input_wrapper">
        <button className="input_button" onClick={onBtnClear}>
          Limpar
        </button>
        <input className="input_text" type="text" onChange={onInputChange} />
        <button className="input_button" onClick={onBtnSubmit}>
          Detect!
        </button>
      </div>
    </section>
  );
};

export default ImageLinkForm;
