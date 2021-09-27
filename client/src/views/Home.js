import React from 'react';
import Grid from '@mui/material/Grid';

import Deposit from '../components/Deposit';
import Button from '../components/Button';

export default function Home({ context }) {
  const { web3, bankInstance, account } = context;

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
          <Deposit web3={web3} bankInstance={bankInstance} account={account} />
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
