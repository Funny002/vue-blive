/** 缓存
 * @Returns { uuid: { time: template } }
 */
import {objectHas} from "@/utils/assist";

// 最大缓存
const historyMax = 10


/** 获取缓存
 * @return object | null
 */
function getCache(): object | null {
    try {
        return JSON.parse(localStorage.getItem('historyCache') || '{}');
    } catch (e) {
        console.error(e);
        return null
    }
}

// 缓存
const historyCache: object | null | any = getCache()

/**
 * 保存缓存
 * @Returns Boolean
 */
function saveCache(): boolean {
    try {
        localStorage.setItem('historyCache', historyCache ? JSON.stringify(historyCache) : '{}')
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

export function getHistoryList() {
    return historyCache
}

/** 获取缓存 (0:最新的缓存，1:全部缓存，number:指定缓存)
 * @param uuid
 * @param isAll
 */
export function getHistory(uuid: string, isAll: number | string = 0): object | boolean {
    if (objectHas(historyCache, uuid)) {
        // 浅拷贝对象
        const template = Object.assign({}, historyCache[uuid])
        if (template) {
            if (isAll === 0) {
                // Object.keys(template).pop() 可能存在 undefined 无法过 Eslint 验证
                return template[Object.keys(template).pop() || 0]
            } else if (isAll !== 1) {
                return template[isAll]
            } else {
                return template
            }
        }
    }
    return false
}

/** 删除缓存 (0:全部的，number:指定的缓存)
 * @param uuid
 * @param isAll
 */
export function delHistory(uuid: string, isAll: number | string = 1): boolean {
    if (objectHas(historyCache, uuid)) {
        if (isAll === 1) {
            delete historyCache[uuid]
        } else {
            try {
                delete historyCache[uuid][isAll]
            } catch (e) {
                console.error('uuid: %s ，缓存时间为: %s 的模板不存在', uuid, isAll)
                return false
            }
        }
        return saveCache()
    }
    return false
}

/** 添加缓存，当达到最大时删除较早的
 * @param uuid
 * @param template
 */
export function addHistory(uuid: string, template: object): boolean {
    const time = new Date().getTime() + '';
    if (objectHas(historyCache, uuid)) {
        const keys = Object.keys(historyCache[uuid])
        keys.length >= historyMax && delHistory(uuid, keys[0])
        historyCache[uuid][time] = template
    } else {
        historyCache[uuid] = {[time]: template}
    }
    return saveCache()
}
