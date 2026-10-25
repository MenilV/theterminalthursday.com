import React from 'react';

// Long UPPER_SNAKE_CASE names have no natural break points, so on phones the browser
// splits them mid-word ("PREVIOUS_SERIA" / "LS"). Allow a line break after each
// underscore instead. <wbr> doesn't change the text, so copying and search still work.
const BreakAtUnderscores = ({ children }) =>
  children.split('_').map((part, i, parts) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 && <>_<wbr /></>}
    </React.Fragment>
  ));

export default BreakAtUnderscores;
