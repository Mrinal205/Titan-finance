import React, { useEffect, useCallback, useState } from 'react';
import { useWeb3React, Web3ReactProvider} from '@web3-react/core';
import { Modal, Text, LinkExternal, Flex, Button, Input } from '@pancakeswap-libs/uikit';
import styled from 'styled-components'
import Web3 from 'web3';
import PFarmTokenAbi from 'config/abi/PFarmToken.json';
import contracts from 'config/constants/contracts';
import { useWallet } from '@binance-chain/bsc-use-wallet';
import usdcAbi from '../../config/abi/erc20.json';
import xyz from '../../test';

const web3 = xyz.web3(); // new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));

const myPFarmTokenAbi:any = PFarmTokenAbi;

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

const USDCTokenAbi: any = usdcAbi;
const USDCInstance = new web3.eth.Contract(USDCTokenAbi, contracts.usdc[chainId]);

const preFarmInstance = new web3.eth.Contract(myPFarmTokenAbi,contracts.preFarm[chainId]);

interface PurchaseModalProps { 
  onDismiss?: () => void
  account : any
  maticPreVal:any
  purchaseCallbackData ?: (data) => void
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 12px;
`

const GridItem = styled.div``

const GridHeaderItem = styled.div`
  max-width: 180px;
`

const BulletList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    margin: 0;
    padding: 0;
  }

  li::before {
    content: '•';
    margin-right: 4px;
  }

  li::marker {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`
const ControlStretch = styled(Flex)`
  > div {
    flex: 1;
  }
`

const PurchaseModal: React.FC<PurchaseModalProps> = ({ onDismiss, purchaseCallbackData, maticPreVal }) => {

  console.log('maticPreVal.....',maticPreVal);
  // const { account, connector, activate, library } = useWeb3React();
  const { account }: { account: string; } = useWallet();
  const [ purchaseInput, setPurcahseInput ] = useState('');
  const [ finalAmount, setFinalAmount ] = useState(0);
  const [maticBal, setMaticBal] = useState(0);
  const [ isDoingTran, setIsDoingTran ] = useState(false);
  // const { getBalance } = useWeb3Provider();

  const getMyBalance = useCallback(async() => {
    if (account) {
        const maticBalance = await USDCInstance.methods.balanceOf(account).call();
        const decimal = await USDCInstance.methods.decimals().call();
        const maticEtherValue = Number(maticBalance) / (10 ** Number(decimal));
        console.log("maticEtherValue",maticEtherValue);
        setMaticBal(maticEtherValue); 
    }
    },[account]);

  useEffect(() => {
    getMyBalance();
    console.log('maticPreVal:',maticPreVal);
  }, [getMyBalance, maticPreVal]);

  const confirmNow = async() => {
    if (purchaseInput) {
      try {
        const sendAmount = Number(web3.utils.toWei(purchaseInput,'ether')) / (10 ** 12);
        console.log('sendAmount:',sendAmount);
        setIsDoingTran(true);
        const res = await preFarmInstance.methods.buypreMax(sendAmount).send({from : account});
        console.log('confirmNow res:',res);
        purchaseCallbackData(res.status);
        onDismiss();
        setIsDoingTran(false); 
      } catch (error) {
          console.log('confirmNow error:',error)
        setIsDoingTran(false); 
      }
    }
  } 
  
    return (
        <Modal title='Buy PreMNSTR with USDC' onDismiss={ isDoingTran ? null : onDismiss } >
        <Grid>
          <GridItem>
            <h4 style={{ color: "white", marginBottom:15 }} >Purcahse</h4>
          <ControlStretch style={{ marginRight:20 }} >
                <Input value={purchaseInput} onChange={(e)=>{ setPurcahseInput(e.target.value); const amount = (Number(e.target.value) / Number(maticPreVal)).toFixed(4); setFinalAmount(Number(amount)) }} placeholder="0" style={{color: "#000"}}/>
              </ControlStretch>
          </GridItem>
          <GridItem>
          <h4 style={{ color: "#fff", marginBottom:15,  }} >Balance: {maticBal}</h4>
          <Button disabled={isDoingTran} onClick={()=>{ setPurcahseInput(maticBal.toString()); const amount = (Number(maticBal) / Number(maticPreVal)).toFixed(4); setFinalAmount(Number(amount)) }} >MNSTR</Button>
          </GridItem>
          <GridItem>
            <h2 style={{ color: "#fff" }} className="matClass">USDC</h2>
          </GridItem>
          {/* 7 day row */}
          <GridItem>
            <Text style={{ marginTop:10, marginBottom:10 }} >&nbsp;&nbsp;You will get <strong>{finalAmount}</strong> PreMNSTR</Text>
          </GridItem>
          <GridItem>&nbsp;</GridItem>
          <GridItem>&nbsp;</GridItem>
          <GridItem className="button-can">
          <Button disabled={isDoingTran} onClick={onDismiss} >Cancel</Button>
          </GridItem>
          <GridItem className="button-can">
            <div>&nbsp;</div>
          </GridItem>
          <GridItem className="button-can">
          <Button disabled={isDoingTran} onClick={confirmNow} className="cardback" >
            Confirm
          </Button>
          </GridItem>
         
        </Grid>

      </Modal>
    )
}



export default PurchaseModal;
