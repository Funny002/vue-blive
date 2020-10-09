/** 判断 value 是否存在于数组中 includes -> indexOf -> find -> for
 * @param array
 * @param value
 */
export function arrayHas(array: string[], value: string): boolean {
    if (array.includes) {
        return array.includes(value);
    } else if (array.indexOf) {
        return array.indexOf(value) >= 0;
    } else if (array.find) {
        return !!array.find(item => {
            if (item === value) {
                return true
            }
        })
    } else {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) {
                return true
            }
        }
        return false
    }
}

/** 判断 key 是否存在当 hasOwnProperty 无法解决时转成 Array 处理
 * @param json
 * @param value
 */
export function jsonHas(json: object, value: string): boolean {
    if (Object.hasOwnProperty) {
        return Object.hasOwnProperty.call(json, value)
    } else {
        return arrayHas(Object.keys(json), value)
    }
}

/** 判断 key 是否存在 object 类型中
 * @param object
 * @param value
 */
export function objectHas(object: object, value: string): boolean {
    if (Array.isArray(object)) {
        return arrayHas(object, value)
    } else {
        try {
            return value in object
        } catch (e) {
            return jsonHas(object, value)
        }
    }
}
