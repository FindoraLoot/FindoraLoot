import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

import Routes from '_src/routes';
import rootStore from '_src/stores';
import i18n from '_utils/i18n';
// import { ThemeProvider } from '_components/SwitchThemes';
import { WebLayout } from '_src/Layout';

// antd 组件库 多语言
import antdEnUS from 'antd/lib/locale/en_US';
import antdZhCN from 'antd/lib/locale/zh_CN';

// import '_assets/themes/light.css';
// import '_assets/themes/dark.css';
import '_assets/less/index.less';
// import 'swiper/swiper-bundle.css';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 5000;
  return library;
}

const Root = () => {
  return (
    <Provider {...rootStore}>
      {/* <ThemeProvider> */}
      <ConfigProvider locale={i18n.language === 'zhCN' ? antdZhCN : antdEnUS}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Web3ReactProvider>
      </ConfigProvider>
      {/* </ThemeProvider> */}
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
