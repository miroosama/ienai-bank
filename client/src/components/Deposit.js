import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import Button from './Button';

export default function Input({ web3, bankInstance, account }) {
  const [value, setValue] = useState('');

  const deposit = async () => {
    try {
      await bankInstance.methods.deposit().send({
        value: web3.utils.toWei(value, 'ether'),
        from: account
      });
      setValue('');
    } catch(e) {
      console.log('error', e);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Enter eth amount you would like to deposit and hit deposit
      </Grid>
      <Grid item xs={12}>
        <TextField
          onChange={(e) => setValue(e.target.value)}
          placeholder="0"
          value={value}
          className="TextField"
          id="standard-number"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
      </Grid>
      <Grid item xs={12}>
        <Button label="Deposit" callback={deposit} />
      </Grid>
    </Grid>
  );
}
