import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import TabPanel from '../components/TabPanel';
import Deposit from '../components/Deposit';
import Withdraw from '../components/Withdraw';

export default function Home({ context }) {
  const [tab, setTab] = useState(0);
  const { web3, bankInstance, account } = context;

  return (
    <div>
      <Grid container spacing={2} sx={{ padding: '5%' }}>
        <Grid item xs={8} align="left">
          <Tabs sx={{ marginBottom: '5%' }} value={tab} onChange={(_, newValue) => setTab(newValue)}>
           <Tab label="Deposit" />
           <Tab label="Withdraw" />
         </Tabs>
         <TabPanel value={tab} index={0}>
           <Deposit web3={web3} bankInstance={bankInstance} account={account} />
         </TabPanel>
         <TabPanel value={tab} index={1}>
            <Withdraw web3={web3} bankInstance={bankInstance} account={account} />
         </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
}
