import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default function DeleteButton(props) {

  function handleClick() {
    props.onOpen();
  }

  return (
    <div className={props.text=== 'icon' ? 'delete-btn' : 'btn'}>
      {props.text === 'icon' ? 
        <Button
          className="delete-btn"
          size="small"
          onClick={handleClick}
        >
          <DeleteIcon fontSize={props.fontSize}/>
        </Button> :
        <Button
          variant="contained"
          color="primary"
          size="large"
          classes={{ root: 'button' }}
          onClick={handleClick}
          startIcon={<DeleteIcon />}
        >
          {props.text}
        </Button>
      }
      
    </div>
  );
}