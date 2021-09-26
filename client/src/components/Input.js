import React from 'react';
import TextField from '@mui/material/TextField';

export default function Input({ value, callback }) {
  return (
    <TextField
      onChange={callback}
      placeholder="0"
      id="standard-number"
      label="Amount"
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      variant="standard"
    />
  );
}
