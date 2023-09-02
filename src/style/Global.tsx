import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .but1a {
    -webkit-box-align: center;
    align-items: center;
    background-color: rgb(118, 69, 217);
    border: 2px solid rgb(118, 69, 217);
    border-radius: 16px;
    color: #fff;
    display: inline-flex;
    font-size: 14px;
    font-weight: 400;
    height: 28px;
    line-height: 1.5;
    padding: 0px 8px;
    white-space: nowrap;
    float: right;
}
.but1abc {
  -webkit-box-align: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid rgb(225, 225, 225);
  border-radius: 16px;
  color: rgb(48, 168, 134);
  display: inline-flex;
  font-size: 14px;
  font-weight: 400;
  height: 28px;
  line-height: 1.5;
  padding: 0px 8px;
  white-space: nowrap;
  float: right;
  margin-right: 10px;
}
.backbg{
  background-image: url('/images/web-img/Main_Background.png');
  background-size: cover;
  background-repeat: norepeat;
}
@media only screen  and (min-width : 1224px) and (max-width : 2000px) {
  .bgbackground{
    width: 990px;
    margin-left: -20px !important;
  }
  }
.bgbackground{
  background-image: url('/images/egg/3b.png');
  background-size: cover;
  background-repeat: norepeat;
}
.btn1{
  align-items: center;
  background-color: #e3ba3f;
  border: 0;
  border-radius: 16px;
  box-shadow: inset 0px -1px 0px rgba(14,14,44,0.4);
  color: #FFFFFF;
  cursor: pointer;
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  font-family: inherit;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  height: 48px;
  line-height: 1;
  -webkit-letter-spacing: 0.03em;
  -moz-letter-spacing: 0.03em;
  -ms-letter-spacing: 0.03em;
  letter-spacing: 0.03em;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: background-color 0.2s;
  transition: background-color 0.2s;
  opacity: 1;
  border: 2px solid #fff;
}
}


::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #000 !important;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #000 !important;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #000 !important;
}

  @media only screen  and (min-width : 1224px) and (min-width : 1824px) {
    .rugimagea{
       width: 250px;
    }
    .rugimageab{
      width: 180px;
      height:70px;
    }
  }

  @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    .rugimageab{
      height: 70px;
    }
    .childaaa{
      margin-top: 12px !important;
    }
    }
    @media only screen  and (min-width : 1224px) and (min-width : 1824px) {
      .child {
        flex: 1 0 18% !important; /* explanation below */
        margin: 5px !important;
        height: 100px !important;
      }
      .childaaa{
        margin-top: 12px !important;
      }
    }
    .backimagea{
      background-color: "#fff";
    }
`

export default GlobalStyle
