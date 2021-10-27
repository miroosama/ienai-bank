import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import Button from './Button';

export default function Input({ web3, bankInstance, account }) {
  const withdraw = async (e) => {
    e.preventDefault();
    try {
      await bankInstance.methods.withdraw().send({
        from: account
      });
    } catch(e) {
      console.log('error', e);
    }
  };

  return (
    <Grid container rowSpacing={4} alignItems="space-between">
      <Grid item xs={12}>
        <Typography>
          Withdraw funds and receive token reward
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button label="Withdraw" callback={withdraw} />
      </Grid>
    </Grid>
  );
}
