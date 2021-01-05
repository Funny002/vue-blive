const Utils: { [key: string]: { [key: string]: (() => void) } } = {}; //暴露方法
// 规定取文件 ~ 正则 .\{[\w]+}.ts
const requireComponent = require.context('/', true, /^\.\/[\w]+\.ts$/);
// 从路径中提取文件名
const getFileName = (path: string) => path.replace('./', '').replace('.ts', '')
// 开始挂载文件
requireComponent.keys().forEach((path: string) => {
    if (path !== './index.ts') {
        // 获取名字
        const name = getFileName(path)
        // 获取文件
        const context = requireComponent(path);
        // 填充数据
        Utils[name] = context.default || context
    }
});
export default Utils