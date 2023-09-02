import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'
import { usePriceCakeBusd } from '../../../state/hooks'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getCakeAddress } from '../../../utils/addressHelpers'
import useAllEarnings from '../../../hooks/useAllEarnings'
import { getBalanceNumber } from '../../../utils/formatBalance'
// const StyledCakeStats = styled(Card)`
//   margin-left: auto;
//   margin-right: auto;
//   background: rgb(50, 139, 109, 0.7);
// `

const StyledFarmStakingCard = styled(Card)`
position: relative;
overflow: hidden;
z-index: 2;
background: rgb(50, 139, 109, 0.6);

// &:before {
//   content: ' ';
//     display: block;
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     z-index: -1;
//     opacity: 0.2;
//   background-repeat: no-repeat;
//   background-position: top right;
//   min-height: 376px;
//   }
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard style={{border: "2px solid #fff"}}>
      <CardBody>
        <Heading size="xl" mb="24px" style={{color: "#e3ba3f"}}>
          {TranslateString(542, 'Farms & Staking')}
          {/* <img src="/images/web-img/Yellow_logo.png" alt="logo" style={{paddingLeft:"20px"}}/> */}
        </Heading>
        <CardImage src="/images/egg/2.png" alt="cake logo" width={40} height={40} />
        <Block>
          <Label>{TranslateString(544, 'EGG to Harvest')}</Label>
          <CakeHarvestBalance earningsSum={earningsSum}/>
          <Label style={{color: "rgb(227, 185, 63)"}}>~${(eggPrice * earningsSum).toFixed(2)}</Label>
        </Block>
        <Block>
          <Label style={{color: "rgb(227, 185, 63)"}}>{TranslateString(546, 'EGG in Wallet')}</Label>
          <CakeWalletBalance cakeBalance={cakeBalance} />
          <Label style={{color: "rgb(227, 185, 63)"}}>~${(eggPrice * cakeBalance).toFixed(2)}</Label>
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              fullWidth
            >
              {pendingTx
                ? TranslateString(548, 'Collecting EGG')
                : TranslateString(999, `Harvest all (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
