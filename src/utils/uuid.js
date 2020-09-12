/** 生成 uuid 格式 缓存模板用 5-4-3-5
 * @type {string}
 */
let uuid = 'xxxxx-xxxx-xxx-xxxxx'

/** 生成一个 uuid
 * @returns {string}
 */
export const createUuid = () => {
    return uuid.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
}

/** 获取 uuid 如果没有主动生成一个
 * @returns {boolean|string}
 */
export const getUuid = () => {
    const uuid = localStorage.getItem('UUID') || createUuid()
    return setUuid(uuid) && uuid
}

/** 设置 uuid 到缓存
 * @param uuid
 * @returns {boolean}
 */
export const setUuid = (uuid) => {
    try {
        localStorage.setItem('UUID', uuid)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}

/** 重新生成 uuid 到缓存
 * @returns {boolean|string}
 */
export const delUuid = () => {
    const uuidVal = createUuid()
    return setUuid(uuidVal) && uuidVal
}
