import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from './components/FarmStakingCard'
import LotteryCard from './components/LotteryCard'
import Timer from './components/Timer'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'


const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  // padding-top: 116px;
  text-align: center;
  position: relative;
  z-index:2;
  border-radius: 30px;

  &:before {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.1;
    // background-image: url('/images/egg/3.png');
    background-repeat: no-repeat;
    background-position: top center;
    border-radius: 30px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {

    padding-top: 0;
    position: relative;
    z-index: 2;
    height: 165px;

    &:before {
      content: ' ';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 1;
      // background-image: url('/images/egg/3b.jpg');
    background-position: left center, right center;
    background-repeat: no-repeat;
    }
  }
`
const Heroa = styled.div`
.parent {
  display: flex;
  flex-wrap: wrap;
}
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
  .child {
    flex: 1 0 32%; /* explanation below */
    margin: 5px;
    height: 100px;
  }
  }
 

.childaa{
  height:  88px;
  margin-top:-7px;
}
.childabc{
  height:  70px;
  margin-top:-7px;
}
.childab{
  height:  120px;
  margin-top:-25px;
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

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <div className="backbg">
    <Page>
      {/* <Heading as="h1" size="xl" mb="24px" color="secondary" >
          {TranslateString(579, 'Yield Farming has begun.')}
        </Heading> */}
        {/* <Timer /> */}
      <Hero 
      className="bgbackground" style={{borderRadius: "0px"}}>
        {/* <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'PolyDino Finance')}
        </Heading>
        <Text>{TranslateString(578, 'Last generation yield farming based on polygon')}</Text> */}
      </Hero>

      <div>
      <Heroa>
      <div className="parent">
        <div className="child">
          <a href="https://titan.finance/" target="_blank" rel="noreferrer">
        <img className="childaa rugimagea" src="https://rugdoc.io/assets/2021/06/rugdoc-review-badge-with-glow.png" alt="rugdoc badge" /></a>
        
        </div>
        <div className="child childaaa" style={{marginTop: "7px"}}>
          <a href="https://titan.finance/" target="_blank" rel="noreferrer">
        <img className="childabc rugimageab" height={70} src="https://farmersonly.farm/images/egg/RugDoc-LiqLock-Badge.png" alt="rugdoc badge" /></a>
        
        </div>
        <div className="child childaaa"  style={{marginTop: "7px"}}>
          <a href="https://titan.finance/" target="_blank" rel="noreferrer">
        <img className="childabc rugimagea" src="https://farmersonly.farm/images/egg/kyc.png" alt="rugdoc badge" /></a>
        
        </div>
        {/* <div className="child">
        <a href="https://rugdoc.io/project/maximum-farm/" target="_blank" rel="noreferrer">
        <img className="rugimageab" src="https://farmersonly.farm/images/egg/RugDoc-LiqLock-Badge.png" alt="rugdoc liq locked" /></a>
        </div> */}
        {/* <div className="child">
        <a href="https://rugdoc.io/project/maximum-farm/" target="_blank" rel="noreferrer">
        <img className="rugimageab" src="https://farmersonly.farm/images/egg/kyc.png" alt="rugdoc kyc" /></a>
        </div> */}
        <div className="child">
          <a href="https://titan.finance/" target="_blank" rel="noreferrer">
        <img width={180} className="childaa" src="https://www.farmersonly.farm/images/egg/pala-badge.png" alt="jago badge" /></a>
        </div>
        <div className="child">
        <a href="https://titan.finance/" target="_blank" rel="noreferrer">
        <img width={160} className="childab" src="https://jagosafer.io/flags/kycflag.svg" alt="jago flag" /></a>
        </div>
      </div>
      </Heroa>
        <Cards>
          <FarmStakingCard />
          <TwitterCard/>
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
      
    </Page>
    </div>
  )
}

export default Home
