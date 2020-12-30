const uuidName = 'App-uuid';

/** 获取 uuid */
export const getUUID = () => localStorage.getItem(uuidName)

/** 删除 uuid */
export const deleteUUID = () => localStorage.removeItem(uuidName)
/** 设置 uuid
 * @param uuid
 */
export const setUUID = (uuid: string) => localStorage.setItem(uuidName, uuid)

/** 创建 uuid
 * @param format
 */
export const createUUID = (format = 'xxxx-xxxx-xx-xxxxx') => format.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))