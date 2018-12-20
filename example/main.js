// 是项目的JS打包入口文件
import React from 'react'
import ReactDOM from 'react-dom'

// 导入项目的根组件
import { PageContainer, Pages } from '../src/index.js' 
ReactDOM.render(
  <PageContainer onChange={(nowIdx, newIdx) => {
    console.log(nowIdx);
    console.log(newIdx);
  }} onChangeEnd={(nowIdx) => {
    console.log(nowIdx);
  }}>
    <Pages style={{
      backgroundColor: '#51eabe',
    }}>
      <div><span>aaaa</span></div>
    </Pages>
    <Pages style={{
      backgroundColor: '#f4ea2a',
    }}></Pages>
    <Pages style={{
      backgroundColor: '#1afa29',
    }}></Pages>
    <Pages style={{
      backgroundColor: '#1296db',
    }}></Pages>
  </PageContainer>, document.getElementById('app'));