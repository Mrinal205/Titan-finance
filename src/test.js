import Web3 from 'web3';

export default {
    'web3' : web,
    'connect' : connect
  };
  
  function web(){
    console.log('web3 called');
    if (window.web3) {
      window.web3 = new Web3(window.ethereum);
     }
     return new Web3(window.web3);
  }
  
  function connect() {
    window.ethereum.enable();
  }
    