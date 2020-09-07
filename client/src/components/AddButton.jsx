import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

export default function AddButton(props) {

  return (
    <div className="add-btn">
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        id="button"
        startIcon={<AddIcon />}
      >
        {props.text}
      </Button>
    </div>
  );
}