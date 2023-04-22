# 分块
- `Aside` 鸟瞰、地图和罗盘按键和侧边栏目
- `DesFour` 测试章节
- `Scene` 三维场景 里面不能直接加上html标签，需要先加上html标签再在里面添加
- `ProgressSteps` 最下面的进度条
- `Dome` 全景
- `Test`最后的测验题
- `index.js` 在stores目录下，是一个状态管理器
# point
- jsx中不能写js，需要加上一个{}
- classname要用**驼峰命名法**即className
- isMap表示是不是地图视角，isEagle表示鸟瞰，isDome表示是不是全景
- 每个模型由glb生成几何体由库自动生成，模型的自身逻辑代码放置于**模型名.jsx**中
```javascript
import { Edges, Html, TransformControls, useGLTF } from "@react-three/drei";
useGLTF.preload("/building.glb");
```
- ref 用于应用它自身，需要用的时候需要使用useref()
- `访问顺序`
>index.html到
>main.jsx到
>App.jsx(路由)
- `提交顺序`
>点击暂存更改——>点击提交并备注
# 运行命令说明
- 代码上推到云效
```
git push
```
- 安装库，库名可以在npm官网招
```
npm i 库名
```
- 启动开发环境
```
npm run dev
```
# 属性
- 南望山
x: -1838.5581538401154, y: 59.00115107733737, z: 2766.717220007931
- 瑜珈山
x: 283.41265307833675, y: 62.362494317857, z: 3271.180927358178