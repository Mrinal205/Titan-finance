import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { Timeline } from 'react-twitter-widgets'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms } from '../../../state/hooks'
import useTheme from '../../../hooks/useTheme'


const StyledTwitterCard = styled(Card)`
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

const TwitterCard = () => {
  const TranslateString = useI18n()

  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <StyledTwitterCard style={{border: "2px solid #fff"}}>
      <CardBody>
        <Heading size="xl" mb="24px" style={{color:"#e3ba3f"}}>
          {TranslateString(10003, 'Announcements')}
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'MaximumFarm'
          }}
          options={{
            height: '300',
            chrome: "noheader, nofooter",
            width: "400",
            theme: isDark ? 'dark' : 'light'
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
