import {Func} from "mocha";

export const isNull = (value: any) => (typeof value === 'number' ? false : !value && value !== '')

export const isNumber = (value: string) => /^[\d]+$/.test(value)

export const isObject = (obj: any) => (typeof obj === 'object')

export const isArray = (obj: any) => (isObject(obj) && Array.isArray(obj))

export const isJson = (obj: any) => (isObject(obj) && !isArray(obj))

export const isEmail = (email: string) => {
    // xxxx.xxx.@xxx.com
    return email.match(/^([\w]+).([\w]+.)@([\w]+).([\w]+)$/)
}

export const isHttpUrl = (htmlUrl: string) => {
    // https://www.xxxxx.com:5435743/asdas/asd/as/asd.html?asdaasd=asdas&asd=asda
    return htmlUrl.match(/^(http(s)?):\/\/(([\w]+.)?[\w]+.[\w])(:[\d])?([/\w]+)(.[\w]+)?[\w]+/)
}

export const arrayHasName = (array: any[], value: string) => {
    if (array.includes) {
        return array.includes(value);
    } else if (array.indexOf) {
        return array.indexOf(value) >= 0;
    } else if (array.find) {
        return !!array.find(item => {
            if (item === value) return true
        })
    } else {
        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) return true
        }
        return false
    }
}

export const objectHasKeys = (obj: { [key: string]: any }, value: string) => {
    if (obj.keys) {
        return arrayHasName(obj.keys, value)
    } else {
        for (const keys in obj) {
            if (value === keys) return true
        }
        return false
    }
}

// 双向差异器
export const diffArray = (array0: any[], array1: any[], state = false) => {
    return array1.filter(item => {
        const is = arrayHasName(array0, item)
        return state ? is : !is
    })
}

function arraySort(array: string[] | number[], state = false) {
    if (!isArray(array) && isJson(array)) {
        array = Object.keys(array)
    }
    if (array.length === 1) {
        return array
    } else {
        return array.sort((a: any, b: any) => {
            if (isNaN(a) || isNaN(b)) {
                return new Error('a or b is NaN')
            } else {
                const [p0, p1] = state ? [a, b] : [b, a];
                return parseInt(p0) - parseInt(p1)
            }
        })
    }
}

// 数字类型字符串或数字
export const getArrayMin = (array: string[] | number[]) => arraySort(array, true).pop()

// 数字类型字符串或数字
export const getArrayMax = (array: string[] | number[]) => arraySort(array, false).pop()

