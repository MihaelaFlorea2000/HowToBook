import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DeleteButton(props) {

  function handleClick() {
    props.onOpen();
  }

  return (
    <div className="add-btn">
      {props.text === 'icon' ? 
        <Button
          variant="contained"
          color="primary"
          size="large"
          id="button"
          onClick={handleClick}
        >
          <DeleteIcon />
        </Button> :
        <Button
          variant="contained"
          color="primary"
          size="large"
          id="button"
          onClick={handleClick}
          startIcon={<DeleteIcon />}
        >
          {props.text}
        </Button>
      }
      
    </div>
  );
}