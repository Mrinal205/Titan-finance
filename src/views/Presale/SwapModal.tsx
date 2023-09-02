import React, { useEffect, useCallback, useState } from 'react';
import { useWeb3React, Web3ReactProvider} from '@web3-react/core';
import { Modal, Text, LinkExternal, Flex, Button, Input } from '@pancakeswap-libs/uikit';
import styled from 'styled-components'
import Web3 from 'web3';
import FarmRedeemAbi from 'config/abi/FarmRedeem.json';
import PFarmTokenAbi from 'config/abi/PFarmToken.json';
import contracts from 'config/constants/contracts';
import { useWallet } from '@binance-chain/bsc-use-wallet'
import xyz from '../../test'; 

const web3 = xyz.web3(); // new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));

const myPFarmTokenAbi:any = FarmRedeemAbi;

const myPFarmTokenAbi2:any = PFarmTokenAbi;

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

const preFarmReedemInstance = new web3.eth.Contract(myPFarmTokenAbi,contracts.preFarmReedem[chainId]);

const preFarmInstance = new web3.eth.Contract(myPFarmTokenAbi2,contracts.preFarm[chainId]);

interface SwapModalProps { 
  onDismiss?: () => void
  account : any
  swapCallbackData ?: (data) => void
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

const SwapModal: React.FC<SwapModalProps> = ({ onDismiss, swapCallbackData }) => {

    const { account }: { account: string; } = useWallet()
  const [preLithBal, setPreLithBal] = useState(0);
  const [ purchaseInput, setPurcahseInput ] = useState('');
  const [ isDoingTran, setIsDoingTran ] = useState(false);

  // const { getBalance } = useWeb3Provider();

  const getMyBalance = useCallback(async() => {
    if (account) {
        const userPreLithiumBalance = await preFarmInstance.methods.balanceOf(account).call();
        const userPreLithiumBalanceEthValue = Number(Web3.utils.fromWei(userPreLithiumBalance, 'ether'));
        setPreLithBal(userPreLithiumBalanceEthValue);
    }
  },[account]);

  useEffect(() => {
    // console.log('preFarmReedemInstance:',preFarmReedemInstance);
    getMyBalance();
  }, [getMyBalance]);

  const confirmNow = async() => {
    if (purchaseInput) {
        try {
            const sendAmount = web3.utils.toWei(purchaseInput,'ether');
            setIsDoingTran(true);
            const res = await preFarmReedemInstance.methods.swappreMaxForMAX().send({from : account});
            // console.log('confirmNow res:',res);
            swapCallbackData(res.status);
            onDismiss();
            setIsDoingTran(false);   
        } catch (error) {
            console.log('confirmNow:',error);
            setIsDoingTran(false);    
        }
    }
  }
  
    return (
        <Modal title='SWAP MNSTR' onDismiss={ isDoingTran ? null : onDismiss } >
        <Grid>
          <GridItem>
            <h4 style={{ color: "white", marginBottom:15 }} >Purchase</h4>
          <ControlStretch style={{ marginRight:20 }} >
                <Input value={purchaseInput} onChange={(e)=>{ setPurcahseInput(e.target.value); }} placeholder="0" style={{color: "#000"}} />
              </ControlStretch>
          </GridItem>
          <GridItem>
          <h4 style={{ color: "white", marginBottom:15,  }} >Balance: {preLithBal}</h4>
          <Button disabled={isDoingTran} onClick={()=>{ setPurcahseInput(preLithBal.toString()) }} >MNSTR</Button>
          </GridItem>
          <GridItem>
            <h2 className="matClass" style={{color: "#fff"}}>PreMNSTR</h2>
          </GridItem>
          {/* 7 day row */}
          <GridItem className="button-can">
          <Button onClick={isDoingTran ? null : onDismiss} >Cancel</Button>
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

export default SwapModal;
 