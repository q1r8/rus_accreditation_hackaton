/* eslint-disable react/prop-types */
import { Snackbar } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  useState, forwardRef, useImperativeHandle, memo
} from 'react';
import { Alert } from '@mui/material';

const ErrorSnackbar = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({

    handleOpenSnackbar() {
      setOpen(true);
    }

  }));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Для получения результатов вычислений необходимо заполнить поле."
        action={(
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        )}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }} variant="filled">
          Для получения результатов вычислений необходимо заполнить поле.
        </Alert>
      </Snackbar>
    </div>
  );
});

export default memo(ErrorSnackbar);
