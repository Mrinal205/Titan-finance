import React, { useContext } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import { Menu as UikitMenu } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import config from './config'

const RDBadge = styled.a`
position: fixed;
right: 0px;
bottom: 0px;
`

const RDLiq = styled.a`
position: fixed;
right: 15px;
bottom: 90px;
`

const KYC = styled.a`
position: fixed;
right: 15px;
bottom: 165px;
`

const JSBadge = styled.a`
position: fixed;
right: 20px;
bottom: 232px;
`


const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()

  return (
    <>
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      links={config}
      priceLink="https://info.spookyswap.finance/token/"
      {...props}
    />
     
      {/* <KYC target="_blank" rel="noreferrer" href="#"><img width={218} src="https://farmersonly.farm/images/egg/kyc.png" alt="rugdoc kyc" /></KYC>
      <RDLiq target="_blank" rel="noreferrer" href="#"><img width={218} src="https://farmersonly.farm/images/egg/RugDoc-LiqLock-Badge.png" alt="rugdoc liq locked" /></RDLiq>
      <RDBadge target="_blank" rel="noreferrer" href="#"><img width={250} src="https://rugdoc.io/assets/2021/06/rugdoc-review-badge-with-glow.png" alt="rugdoc badge" /></RDBadge>
      <JSBadge target="_blank" rel="noreferrer" href="#" style={{marginRight: "-5px"}}><img width={225} src="https://www.farmersonly.farm/images/egg/pala-badge.png" alt="jago badge" /></JSBadge> */}
 </>
 )
}

export default Menu
