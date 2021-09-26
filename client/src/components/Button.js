import React from 'react';
import Button from '@mui/material/Button';

export default function MuiButton({ callback, label }) {
  return (
    <Button onClick={callback} variant="outlined">
      { label }
    </Button>
  );
}
