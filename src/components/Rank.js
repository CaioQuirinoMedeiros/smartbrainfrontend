import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <section className="rank">
      <h2 className="rank_text">Wellcome, {name}</h2>
      <h3 className="rank_num">Images detected: {entries}</h3>
    </section>
  );
};

export default Rank;
