const thread = {
    state: 0, // 状态 0 / 1
    count: 0, // 当前运行数
    clock: 10, // 运行时钟
    maxCount: 10, // 最大并行运行数
} as { [key: string]: number }

/** 关闭 */
const close = () => (thread.state = 0)

/** 开始
 * @param func
 * @param close
 */
const start = (func: ((ags0?: { [key: string]: number }) => boolean), close?: ((ags0?: { [key: string]: number }) => void)) => {
    if (typeof func !== 'function') return console.error('value not Function')
    //
    thread.state = 1;
    while (thread.state && (thread.count < thread.maxCount)) {
        thread.count += 1;
        if (func(thread)) {
            thread.count -= 1;
            close && !thread.count && !thread.state && close()
        }
    }
}

/** 设置
 * @param key
 * @param value
 */
const setConfig = (key: string, value: number) => {
    if (['maxCount', 'clock'].includes(key)) {
        thread[key] = value
        return true
    }
    return false
}
/** 获取配置 */
const getConfig = () => thread

export default {start, close, getConfig, setConfig}