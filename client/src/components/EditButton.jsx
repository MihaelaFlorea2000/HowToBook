import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

export default function EditButton(props) {

  return (
    <div className="add-btn">
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        size="large"
        classes={{root: 'button'}}
        startIcon={<EditIcon />}
      >
        {props.text}
      </Button>
    </div>
  );
}