const Utils: { [key: string]: any } = {}
const requireComponent = require.context('/', true, /^\.\/[\w]+\.ts$/);
const getFileName = (path: string) => path.replace('./', '').replace('.ts', '')
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