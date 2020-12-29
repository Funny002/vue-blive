const isNull = (value: string | number) => typeof value === 'number' ? false : (!value || value === '')
const onNull = (rules: { [key: string]: any }, value: string, Callback: Function, func: Function) => {
    if (rules.required && isNull(value)) return Callback(new Error('不能为空'))
    value ? func(rules, value, Callback) : Callback()
}
const MinOrMax = (rules: { [key: string]: any }, value: string, Callback: Function) => {
    const [{eq, max, min}, len] = [rules, (value).toString().length]
    if (eq && len !== eq) return Callback(new Error(`长度不等于${eq}`))
    if (max && len > max) return Callback(new Error(`长度不能大于${max}`))
    if (min && len < min) return Callback(new Error(`长度不能小于${min}`))
    Callback()
}
export const verifyMaxOrMin = (rules: { [key: string]: any }, value: string, Callback: Function) => onNull(rules, value, Callback, MinOrMax)