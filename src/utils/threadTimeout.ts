let threadClock = 300
let threadTimeout: number | undefined

/** 设置时钟
 * @param value
 */
const setClock = (value: number) => (threadClock = value)

/** 获取时钟
 */
const getClock = () => threadClock

/** 方法
 * @param func
 * @constructor
 */
const ThreadTimer = (func: Function) => {
    if (threadTimeout) clearTimeout(threadTimeout)
    threadTimeout = setTimeout(() => {
        threadTimeout = undefined
        //
        func()
    }, threadClock)
}

export default {ThreadTimer, setClock, getClock}