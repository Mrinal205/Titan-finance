import React, { useState, useEffect, useCallback } from 'react';
import Page from 'components/layout/Page';
import styled from 'styled-components';
import useI18n from 'hooks/useI18n';
import { Card, CardBody, Heading, Text, BaseLayout, Button, useModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import contracts from 'config/constants/contracts';
import Web3 from 'web3';
import UnlockButton from 'components/UnlockButton';
import { ethers } from 'ethers';
import usdcAbi from '../../config/abi/erc20.json';
import PFarmTokenAbi from '../../config/abi/PFarmToken.json';
import xyz from '../../test';
import Divider from './components/Divider';
import PurchaseModal from './PurchaseModal';
import SwapModal from './SwapModal';
 
const web3 = xyz.web3();

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

const myPFarmTokenAbi: any = PFarmTokenAbi;

const USDCTokenAbi: any = usdcAbi;
const USDCInstance = new web3.eth.Contract(USDCTokenAbi, contracts.usdc[chainId]);

const preFarmInstance = new web3.eth.Contract(myPFarmTokenAbi, contracts.preFarm[chainId]);

const Presale = () => {

  const TranslateString = useI18n();
  const { account }: { account: string; } = useWallet()
  const [preLithBal, setPreLithBal] = useState(0);
  const [userPreLithBal, setUserPreLithBal] = useState(0);
  const [maticPreVal, setMaticPreVal] = useState('0');
  const [preLitRemBal, setPreLitRemBal] = useState(0);
  const [maticBal, setMaticBal] = useState(0);
  const [allowanceVal, setAllowanceVal] =  useState('0');
  const [usdcAllowanceVal, setUsdcAllowanceVal] = useState('0');

  const purchaseData = useCallback(async () => {
    try {
      if (account) {
        const maticPreLithium = await preFarmInstance.methods.salePrice().call();
        console.log('maticPreLithium', maticPreLithium);
        // const ethValue = Number(Web3.utils.fromWei(maticPreLithium, 'ether'));
        // const ethValue2 = (Number(Web3.utils.fromWei(ethValue.toString(), 'ether')) * 10).toFixed(4);
        setMaticPreVal(maticPreLithium);

        const preLithiumBalance = await preFarmInstance.methods.premaxRemaining().call();
        console.log('preLithiumBalance:',preLithiumBalance);
        const preLithiumBalanceEthValue = Number(Web3.utils.fromWei(preLithiumBalance, 'ether'));
        setPreLithBal(preLithiumBalanceEthValue);

        const userPreLithiumBalance = await preFarmInstance.methods.balanceOf(account).call();
        const userPreLithiumBalanceEthValue = Number(Web3.utils.fromWei(userPreLithiumBalance, 'ether'));
        setUserPreLithBal(userPreLithiumBalanceEthValue);

        const maticBalance = await USDCInstance.methods.balanceOf(account).call();
        const decimal = await USDCInstance.methods.decimals().call();
        const maticEtherValue = Number(maticBalance) / (10 ** Number(decimal));
        setMaticBal(maticEtherValue);

        const preLithiumRemaingBal = preLithiumBalance;
        const preLithiumRemaingBalethValue = Number(Web3.utils.fromWei(preLithiumRemaingBal, 'ether'));

        setPreLitRemBal(preLithiumRemaingBalethValue);
      }

    } catch (error) { 
      console.log(error);
    }
  }, [account]);

  const getAllownes = useCallback(async() => {
    if(account) {
      const allowanceRes =  await preFarmInstance.methods.allowance(account, contracts.preFarmReedem[chainId]).call();
      setAllowanceVal(allowanceRes);
    }
  },[account]);

  const getUSDCAllownes = useCallback(async()=>{
    if(account) {
        const allowanceRes =  await USDCInstance.methods.allowance(account, contracts.preFarm[chainId]).call();
        setUsdcAllowanceVal(allowanceRes);
      }
  },[account]);


  useEffect(() => {
    purchaseData();
    getAllownes();
    getUSDCAllownes();
    // getChainId();
  }, [purchaseData, getAllownes, getUSDCAllownes]);

  const approveFun = async() => {
    const res = await preFarmInstance.methods.approve(contracts.preFarmReedem[chainId], ethers.constants.MaxUint256).send({ from : account });
    getAllownes();
  }

  const BUSDApproval = async() => {
    const res = await USDCInstance.methods.approve(contracts.preFarm[chainId], ethers.constants.MaxUint256).send({ from : account });
    getUSDCAllownes();
  }
 
  const purchaseCallbackData = (data) => {
    console.log('purchaseCallbackData data:',data);
    if(data) {
      purchaseData();
    }
  }

  const swapCallbackData = (data) => {
    console.log('swapCallbackData data:',data);
    if(data) {
      purchaseData();
    } 
  }

  const [ onPresentPurchaseModal ] = useModal(
    <PurchaseModal purchaseCallbackData={purchaseCallbackData} account={account} maticPreVal={maticPreVal} /> ,
  )

  const [ onPresentSwapModal ] = useModal(
    <SwapModal swapCallbackData={swapCallbackData} account={account} /> ,
  )

  const checkAllowance = () => {
    if(allowanceVal === '0') { return <Button fullWidth onClick={approveFun} >Approve</Button> }
    return <Button fullWidth onClick={onPresentSwapModal} >Swap</Button>
  }

  const checkPresaleContract = () =>{
    if(usdcAllowanceVal === '0') { return <Button fullWidth onClick={BUSDApproval} >Approve</Button> }
    return <Button onClick={onPresentPurchaseModal} fullWidth >Purchase</Button>
  }
 
  return (
    <div className="backbg">
      <Page>
      <div>
          <Heading as="h1" size="xxl" mb="16px" style={{fontSize: "40px"}}>
             PRESALE
          </Heading>
          {/* <ul>
                          <li>Stake FARM to revieve dividend payouts.</li>
                          <li>You can unstake at any time.</li>
                          <li>Dividends are distributed linearly over the week.</li>
                      </ul> */}
        </div>
        <Divider />

        <div>
          <Cards>
            <StyledCakeStats>
              <CardBody>
                <Heading size="xl" mb="24px">
                  PRETITAN PRESALE CONTRACT {/* {TranslateString(534, 'Egg Stats')} */}
                </Heading>
                <Row>
                  <Text fontSize="14px">PRETITAN Remaining:</Text>
                  <Text bold>{preLitRemBal}</Text>
                </Row>
                <Row>
                  <Text fontSize="14px">PRETITAN/USDC:</Text>
                  <Text bold>{maticPreVal}</Text>
                </Row>
                <Row>
                  <Text fontSize="14px">Your PRETITAN balance:</Text>
                  <Text bold>{userPreLithBal}</Text>
                </Row>
                <Row>
                  <Text fontSize="14px">Your USDC balance: </Text>
                  <Text bold>{maticBal}</Text>
                </Row>
                <Divider />
                <Actions>
                  { !account ? <UnlockButton fullWidth /> : checkPresaleContract() }
                {/* <Button onClick={onPresentPurchaseModal} fullWidth > Purchase</Button> } */}
                </Actions>
              </CardBody>
            </StyledCakeStats>


            <StyledCakeStats>
              <CardBody>
                <Heading size="xl" mb="24px">
                PRETITAN REDEEM CONTRACT{/* {TranslateString(534, 'Egg Stats')} */}
                </Heading>
                <Row>
                  <Text fontSize="14px">Your PRETITAN Balance:</Text>
                  <Text bold>{userPreLithBal}</Text>
                </Row>
                <Row>
                  <Text fontSize="14px">You can swap for up to:</Text>
                  <Text bold>{userPreLithBal}</Text>
                </Row>
                <Row>
                  <Text fontSize="14px">Rate:</Text>
                  <Text bold>1 : 1 Swap</Text>
                </Row>
                <Row>
                  <Text fontSize="14px">Your USDC balance</Text>
                  <Text bold>{maticBal}</Text>
                </Row>
                <Divider />
                <Actions>
                  { !account ? <UnlockButton fullWidth /> : checkAllowance() }
                </Actions>
              </CardBody>
            </StyledCakeStats>
          </Cards>
        </div>
      </Page>
    </div>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`
const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const StyledCakeStats = styled(Card)`
  margin-left: 100;
  margin-right: 100;
  background: rgb(50, 139, 109, 0.9) !important;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Actions = styled.div`
  margin-top: 24px;
`

export default Presale;
