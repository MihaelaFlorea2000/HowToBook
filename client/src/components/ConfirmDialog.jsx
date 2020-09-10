import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteButton from '../components/DeleteButton';

export default function ConfirmDialog(props) {

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  };

  function  handleCloseYes() {
    setOpen(false);
    props.onDelete(props.id);
  };

  function  handleCloseNo() {
    setOpen(false);
  };

  return (
    <div>
      <DeleteButton onOpen={handleClickOpen} text={props.text}/>
      <Dialog
        open={open}
        onClose={handleCloseNo}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete this book from your library?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseYes} color="primary">
            Yes
          </Button>
          <Button onClick={handleCloseNo} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
