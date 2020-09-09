import React, { useState } from 'react';

export default function ReadMore({children, maxCharacterCount = 100}) {
  const text = children;

  const [isTruncated, setIsTruncated] = useState(true);

  const resultString = isTruncated ? `${text.slice(0, maxCharacterCount)}... ` : text;

  function toggleTruncate() {
    setIsTruncated(!isTruncated);
  }

  return(
    <>
      {text.length > maxCharacterCount ? 
        <p>
          {resultString}
          <span
            onClick={toggleTruncate}
            className="read-more"
          >
            {isTruncated ? "Read More" : "Read Less"}
          </span>
        </p> : 
        <p>
          {text}
        </p>
      }
    </>
    
  );

}