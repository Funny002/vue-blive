/** 加载缓存
 * @returns {{}}
 * @constructor
 */

const History = () => {
    let valueList = {};
    const template = JSON.parse(localStorage.getItem('template'));
    for (const key in template) {
        valueList[key] = ((value) => {
            let list = []
            for (const {val, time} of value) {
                list[time] = val
            }
            return list
        })(template[key])
    }
    return valueList
}

/** 更新缓存
 * @param template
 * @returns {boolean}
 */
const setHistory = template => {
    try {
        localStorage.setItem('template', JSON.stringify(template))
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

/**
 * @returns {{getHistory: getHistory, delHistory: (function(*): void), addHistory: (function(*, *): void), listHistory: (function(): {})}}
 */
export default (function () {
    let template = History()

    /** 获取全部 template
     * @returns {{}}
     */
    const listHistory = () => template;

    /** 判断缓存 uuid 是否存在
     * @param uuid
     * @returns {boolean}
     */
    const hasHistory = (uuid) => {
        return !!template[uuid]
    }

    /** 获取指定 template
     * @param uuid
     * @returns {boolean|*}
     */
    const getHistory = (uuid) => {
        if (template[uuid]) {
            // 返回最新的
            return template[uuid][template[uuid].length]
        }
        return false
    }

    /** 添加到缓存
     * @param uuid
     * @param value
     */
    const addHistory = (uuid, value) => {
        if (!template[uuid]) {
            template[uuid] = [{time: new Date().getTime(), value}]
        } else {
            template[uuid].push({time: new Date().getTime(), value})
        }
        return setHistory(template)
    }

    /** 删除缓存
     * @param uuid
     */
    const delHistory = (uuid) => {
        // 直接删除包括之前的缓存
        delete template[uuid]
        return setHistory(template)
    }
    return {getHistory, listHistory, delHistory, addHistory, hasHistory}
})()
