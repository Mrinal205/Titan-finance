import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Image, Card, CardBody, Heading, Text, BaseLayout, Button, useModal } from '@pancakeswap-libs/uikit'
import styled from 'styled-components';
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd} from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

export interface FarmsProps{
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.MaxPerBlock || 1).times(new BigNumber(farm.poolWeight)).div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear);

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

        // if (farm.quoteTokenSymbol === QuoteToken.WMATIC) {
        //   totalValue = totalValue.times(bnbPrice);
        // }

        if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          totalValue = totalValue.times(cakePrice);
        }

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [account, cakePrice, ethereum, bnbPrice],
  )

  return (
    <div className="backbg">
    <Page>
      <div>
          <Heading as="h1" size="xxl" mb="16px" style={{fontSize: "40px"}}>
             POOLS
          </Heading>
          {/* <ul>
                          <li>Stake FARM to revieve dividend payouts.</li>
                          <li>You can unstake at any time.</li>
                          <li>Dividends are distributed linearly over the week.</li>
                      </ul> */}
        </div>
        <Divider />
      {/* <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/> */}
      <div>
        {/* <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout> */}
        {/* <h1>sdsdds</h1> */}
      </div>
      <div>
        <Cards className="stylecode">
        <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>MNSTR</h2>
              {/* <img src="images/egg/BTCB.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>MNSTR</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">30x</span><span className="but1abc" style={{color: "#fff"}}>No fees</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>0%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>2 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>


          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>MAX</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>WBNB</h2> */}
                <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">30x</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p><br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>0%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Unlock</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>FTM</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>CAKE</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">4X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>BOO</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>WETH</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">4X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>USDC</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>BUSD</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">4X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
       
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>ETH</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>ADA</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">3X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>BTC</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>ADA</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">3X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>TOMB</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>ADA</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">3X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>USDT</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>ADA</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">3X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>ICE</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>ADA</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">2X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>DAI </h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>ADA</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">2X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
          <StyledCakeStats style={{background: "rgb(50, 139, 109, 0.7)",borderRadius: "5px"}}>
            <CardBody className="twitterback">
            <h2 style={{textAlign: "left",fontSize:"25px",marginBottom:"30px"}}>BNB</h2>
              {/* <img src="images/egg/DAI.png" alt="img" height="15%" width="15%"/> */}
              {/* <h2 style={{textAlign: "right",fontSize:"25px"}}>ADA</h2> */}
              <p style={{marginTop: "5px",marginBottom: "5px"}}><span className="but1a">2X</span><span className="but1abc" style={{color: "#fff"}}>3%</span></p>
              <br/><br/>
              <Row>
                <Text fontSize="14px">APR:</Text>
                <Text bold>23323232%</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Earn:</Text>
                <Text bold>MNSTR</Text>
              </Row>
              <Row>
                <Text fontSize="14px">Deposit Fee:</Text>
                <Text bold style={{color: "#fff"}}>3%</Text>
              </Row>
              {/* <Row>
                <Text fontSize="14px">Harvest Lockup: </Text>
                <Text bold>8 Hours</Text>
              </Row> */}
              <Divider />
              <Actions>
              <Button  fullWidth > Purchase</Button> 
              </Actions>
            </CardBody>
          </StyledCakeStats>
        




        
        </Cards>
      </div>
    </Page>
    </div>
  )
}

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
  grid-column: span 4 !important;
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
export default Farms
