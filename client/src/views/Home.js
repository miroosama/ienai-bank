import React, { useState } from 'react';
import Grid from '@mui/material/Grid';

import Input from '../components/Input';
import Button from '../components/Button';

export default function Home({ context }) {
  const [value, setValue] = useState();
  const { web3, bankInstance, account } = context;

  const deposit = async () => {
    try {
      await bankInstance.methods.deposit().send({
        value: web3.utils.toWei(value, 'ether'),
        from: account
      });
      setValue(null);
    } catch(e) {
      console.log('error', e);
    }
  };

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
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div>
            Enter eth amount you would like to deposit and hit deposit
          </div>
          <Input value={value} callback={(e) => setValue(e.target.value)} />
          <div>
            <Button label="Deposit" callback={deposit} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            Withdraw funds and receive token reward
          </div>
          <Button label="Withdraw" callback={withdraw} />
        </Grid>
      </Grid>
    </div>
  );
}
