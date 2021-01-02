import {getArrayMax, getArrayMin, isNull, objectHasKeys} from "@/utils/validation";
// 最大缓存数
const historyMax = 10

function getCache() {
    try {
        return JSON.parse(localStorage.getItem('historyCache') || '{}');
    } catch (e) {
        console.error('getCache :>> Error:', e);
    }
}

// 缓存
let History: { [key: string]: any } = getCache()

function setCache() {
    localStorage.setItem('historyCache', JSON.stringify(History))
    History = getCache()
}

// 获取时间戳字符串
const getTime = () => (new Date().getTime().toString())

// 验证缓存是否存在
function historyHas(uuid: string) {
    return !isNull(uuid) && objectHasKeys(History, uuid)
}

// 获取缓存
export const getHistory = (uuid: string, time?: string) => (historyHas(uuid) && (() => {
    const history = Object.assign({}, History[uuid])
    return history[time || getArrayMax(history)]
})())

// 验证缓存是否存在
export const hasHistory = (uuid: string, time?: string) => {
    if (!time) {
        return historyHas(uuid)
    } else {
        const history = getHistory(uuid)
        return history && objectHasKeys(history, time)
    }
}

// 删除
export const deleteHistory = (uuid: string, time?: string) => (hasHistory(uuid, time) && (() => {
    if (!time) {
        delete History[uuid]
    } else {
        delete History[uuid][time]
    }
    // 更新缓存
    setCache()
})())

// 填充
export const setHistory = (uuid: string, value: string, time?: string) => {
    if (time && hasHistory(uuid)) {
        if (Object.keys(History[uuid]).length > historyMax) {
            deleteHistory(uuid, getArrayMin(History[uuid]).pop())
        }
        History[uuid][getTime()] = value
    }
    History[uuid] = {[getTime()]: value}
    // 更新缓存
    setCache()
}