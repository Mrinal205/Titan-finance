import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd } from '../../../state/hooks'

declare let window;

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  background: rgb(50, 139, 109, 0.7);
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Rowa = styled.div`
  align-items: right;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();
  const eggPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = eggPrice.times(circSupply);

  let MaxPerBlock = 1;
  if(farms && farms[0] && farms[0].MaxPerBlock){
    MaxPerBlock = new BigNumber(farms[0].MaxPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }
  console.log("window", window);

  const addBarnsToken = () => {
    const tokenAddress = '0xd45194A6c6F7930FC686d9C8f76fE9b45d981B58';
    const tokenSymbol = 'Max';
    const tokenDecimals = 18;
    const tokenImage = 'https://maximum.farm/images/web-img/Yellow_logo.png';

   
    try {
      if(window.ethereum){
        const wasAdded = window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
              type: 'ERC20', // Initially only supports ERC20, but eventually more!
              options: {
                  address: tokenAddress, // The address that the token is at.
                  symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                  decimals: tokenDecimals, // The number of decimals in the token
                  image: tokenImage, // A string url of the token logo
              },
          },
      });
      }
      
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
       
    } catch (error) {
        // console.log(error);
    }
}

  return (
    <StyledCakeStats style={{border: "2px solid #fff"}}>
      <CardBody>
        <Heading size="xl" mb="24px" style={{color:"#e3ba3f"}}>
        MNSTR Stats
        
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New EGG/block')}</Text>
          <Text bold fontSize="14px">{MaxPerBlock}</Text>
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(5400, 'MNSTR Supply')}</Text>
          <Text bold fontSize="14px">50,000</Text>
        </Row>
        {/* <Rowa >
          <button onClick={addBarnsToken} type="submit"  className="btn1" style={{color: "#000"}}>Add MNSTR to Metamask</button>
        </Rowa> */}
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
