import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from './styles/MuiTheme';
import IenaiBankContract from './contracts/IenaiBank.json';
import TokenContract from './contracts/Token.json';
import Home from './views/Home';
import './App.css';

export default function App() {
  const [context, setContext] = useState();

  useEffect(() => {
    const getContext = async () => {
      try {
        if (!window.ethereum) throw new Error('Please install metamask');

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = IenaiBankContract.networks[networkId];
        const bankInstance = new web3.eth.Contract(
          IenaiBankContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        const tokenInstance = new web3.eth.Contract(
          TokenContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        const bankAddress = bankInstance._address;
        setContext({
          web3,
          bankInstance,
          tokenInstance,
          bankAddress,
          account: accounts[0]
        })
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    getContext();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppBar 
          position="static" 
          sx={{ 
            backgroundColor: 'black', 
            borderBottom: ' 1px solid rgba(255, 255, 255, 0.09)' 
          }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6">
              ienai Bank
            </Typography>
            <Typography>
              Account: { context && context.account }
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
        { context && <Home context={context} /> }
        </div>
      </ThemeProvider>
    </div>
  );
}
