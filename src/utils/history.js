/** 加载缓存
 * @returns {any}
 */

const loadCache = () => JSON.parse(localStorage.getItem('template'));

/** 更新缓存
 * @returns {boolean}
 */
const updateCache = () => {
    try {
        localStorage.setItem('template', JSON.stringify(template))
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

/** 模板缓存
 * @type {*}
 */
let template = loadCache() || {};

/** 缓存解耦
 * @param data
 * @returns {[]}
 */
const extract = (data) => {
    let valueList = [];
    for (const value of data) valueList.push(value);
    return valueList
}
/** 获取全缓存
 * @returns {*}
 */
export const listHistory = () => template

/** 获取缓存 (0:最新的缓存，1:全部缓存，number:指定缓存)
 * @param uuid
 * @param isAll
 * @returns {*}
 */
export const getHistory = (uuid, isAll = 0) => {
    try {
        let value = template[uuid]
        if (isAll === 0) {
            // 获取最新的缓存
            value = extract(value).pop().value
        } else if (!isNaN(isAll)) {
            // 获取指定缓存
            value = value[isAll]
        }
        return value
    } catch (e) {
        console.error(e)
        return false
    }
}

/** 判断缓存是否存在
 * @param uuid
 * @returns {boolean}
 */
export const hasHistory = (uuid) => {
    return !!template[uuid]
}

/** 添加缓存
 * @param uuid
 * @param value
 */
export const addHistory = (uuid, value) => {
    template[uuid] = [{time: new Date().getTime(), value}]
    // console.log('addHistory :>> %s -> data:', uuid, template)
    return updateCache() || uuid
}

/** 删除缓存 (0:全部的，number:指定的缓存)
 * @param uuid
 * @param isAll
 */
export const delHistory = (uuid, isAll = 0) => {
    if (template[uuid]) {
        if (isAll === 0) {
            delete template[uuid]
        } else if (!isNaN(isAll)) {
            delete template[uuid][isAll]
        }
        return updateCache()
    }
    return false
}
