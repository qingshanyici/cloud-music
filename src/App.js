//根目录

import React from 'react';
import { Provider } from 'react-redux'
import { GlobalStyle } from  './style';
import { IconStyle } from './assets/iconfont/iconfont';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import routes from './routes/index.js';
import { HashRouter } from 'react-router-dom';
import store from './store/index'

function App () {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        { renderRoutes (routes) }
      </HashRouter>
    </Provider> 
  )
}

export default App;
