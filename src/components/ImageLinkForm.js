import React from "react";

const ImageLinkForm = ({ onBtnClear, onInputChange, onBtnSubmit, value }) => {
  return (
    <section className="input_box">
      <p>Digite o endereço de uma imagem para encontrar os rostos!</p>
      <form onSubmit={onBtnSubmit} className="input_wrapper">
        <div className="input_button" onClick={onBtnClear}>
          Limpar
        </div>
        <input
          value={value}
          className="input_text"
          type="text"
          placeholder="URL"
          onChange={onInputChange}
        />
        <input className="input_button" type="submit" value="Enviar" />
      </form>
    </section>
  );
};

export default ImageLinkForm;
