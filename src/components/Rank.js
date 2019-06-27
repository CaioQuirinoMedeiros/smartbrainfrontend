import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <section className="rank">
      <h2 className="rank_text">Bem-vindo, {name}</h2>
      <h3 className="rank_num">Imagens processadas: {entries}</h3>
    </section>
  );
};

export default Rank;
