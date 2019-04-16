import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <section className="rank">
            <div className="rank_text">
                {`${name}, seu ranking atual é... `}<span className="rank_num">{entries}</span>
            </div>
        </section>
    );
};

export default Rank;