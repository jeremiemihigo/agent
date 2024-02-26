/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@mui/material'

function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props

  return (
    <Dialog open={confirmDialog.isOpen} style={style.dialog}>
      <DialogTitle></DialogTitle>
      <DialogContent style={style.contentDialog}>
        <Typography variant="h7">{confirmDialog.title}</Typography>
       
        <Typography variant="h7" component="p">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions style={style.contentButton}>
        <Button
          color='warning' variant='contained'
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        <Button color="primary" variant="contained" onClick={confirmDialog.onConfirm}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
const style = {
  dialog: {
    padding: '10px',
    position: 'absolute',
    top: '5px',
  },
  contentDialog: {
    textAlign: 'center',
  },
  contentButton: {
    justifyContent: 'center',
  },
}

export default ConfirmDialog
