# @lydxwj/react-fullpage

#### 安装

```
npm install @lydxwj/react-fullpage --save
```

#### 使用

```
import { PageContainer, Pages } from '@lydxwj/react-fullpage';
import '@lydxwj/react-fullpage/lib/css/styles.css';

<PageContainer onChange={(nowIdx, newIdx) => {
  console.log(nowIdx);
  console.log(newIdx);
}} onChangeEnd={(nowIdx) => {
  console.log(nowIdx);
}}>
  <Pages style={{
    backgroundColor: '#51eabe',
  }}></Pages>
  <Pages style={{
    backgroundColor: '#f4ea2a',
  }}></Pages>
  <Pages style={{
    backgroundColor: '#1afa29',
  }}></Pages>
  <Pages style={{
    backgroundColor: '#1296db',
  }}></Pages>
</PageContainer>
```

#### 组件介绍

```
import { PageContainer, Pages } from '@lydxwj/react-fullpage';
// PageContainer翻页组件盒子，Pages单个翻页组件

// 或者 import PageContainer from '@lydxwj/react-fullpage';
// PageContainer翻页组件盒子，PageContainer.Pages单个翻页组件
```

#### 组件配置

- PageContainer

| 配置项      | 介绍                 | 参数/默认值                                  |
| ----------- | -------------------- | -------------------------------------------- |
| onChange    | 页面翻转前回调       | nowIdx（当前页索引）, newIdx（翻转页页索引） |
| onChangeEnd | 页面翻转后回调       | nowIdx（当前页索引）                         |
| isArrow     | 是否显示下滑提示箭头 | true（默认值）                               |
| isNav       | 是否显示指示器       | true（默认值）                               |
| style       | 样式对象             | 建议不设置height、width                      |

```
// PageContainer里面嵌套Pages来使用
<PageContainer>
  <Pages></Pages>
</PageContainer>
```

- Pages

| 配置项   | 介绍     | 参数/默认值                                      |
| -------- | -------- | ------------------------------------------------ |
| againCof | 回看配置 | {  isShow: true,是否显示 text: '回看', 文案配置} |
| again    | 回看回调 | 无                                               |
| style    | 样式对象 | 建议不设置height、width                          |

```
// Pages可以嵌套自己想要的页面内容
<Pages>
  <div>页面内容</div>
</Pages>
```

说明: 仅支持移动端

### 如果有问题欢迎交流