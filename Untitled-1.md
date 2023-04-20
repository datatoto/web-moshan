# 分块
- `Aside` 鸟瞰、地图和罗盘按键和侧边栏目
- `DesFour` 测试章节
- `Scene` 三维场景 里面不能直接加上html标签，需要先加上html标签再在里面添加
- `ProgressSteps` 最下面的进度条
- `Dome` 全景
- `Test`填空题
- `index.js` 在stores目录下，是一个状态管理器
# point
- 每个模型由glb生成几何体由库自动生成，模型的自身逻辑代码放置于**模型名.jsx**中
```javascript
import { Edges, Html, TransformControls, useGLTF } from "@react-three/drei";
useGLTF.preload("/building.glb");
```
- `访问顺序`
>index.html到
>main.jsx到
>App.jsx(路由)
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
- 南望山
x: -1838.5581538401154, y: 59.00115107733737, z: 2766.717220007931
- 瑜珈山
x: 283.41265307833675, y: 62.362494317857, z: 3271.180927358178