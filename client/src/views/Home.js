import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TabPanel from '../components/TabPanel';
import Deposit from '../components/Deposit';
import Button from '../components/Button';

export default function Home({ context }) {
  const [tab, setTab] = useState(0);
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
      <Grid container spacing={2} sx={{ padding: '5%' }}>
        <Grid item xs={8} align="left">
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
           <Tab label="Deposit" />
           <Tab label="Withdraw" />
         </Tabs>
         <TabPanel value={tab} index={0}>
           <Deposit web3={web3} bankInstance={bankInstance} account={account} />
         </TabPanel>
         <TabPanel value={tab} index={1}>
           <div>
             Withdraw funds and receive token reward
           </div>
           <Button label="Withdraw" callback={withdraw} />
         </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
