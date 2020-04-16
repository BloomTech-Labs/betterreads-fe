//Import React
import React from 'react';
//Styling
import ResultCount from "./styles/ShelfNoteStyle";

const ShelfNote = (props) => {
  return (
    <ResultCount>
      <div className='innerWrapper fs-16 lh-40 openSans'>{props.note}</div>
    </ResultCount>
  );
};

export default ShelfNote;
