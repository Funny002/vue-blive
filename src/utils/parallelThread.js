export default function () {
    'use strict'
    const data = {
        max: 3, // 最大线程
        count: 0, // 当前线程
        clock: 10, // 线程时钟
        serve: false, // 是否开启
        isError: true, // 是否开启报错
        isClose: true, // 如报错自动关闭
    }

    const serve = function (func) {
        data.serve = true; // 开启
        while (data.serve && data.count >= 0 && data.count <= data.max) {
            try {
                setTimeout(() => {
                    func()
                    data.count -= 1; // 并行减一
                }, data.clock)
                data.count += 1; // 并行加一
            } catch (e) {
                data.isError && console.log(e)
                data.isClose && close();
            }
        }
    }

    const close = function () {
        // 直接关闭
        data.serve = false;
    }

    const set = function (nameKey, nameVal) {
        const nameSet = ['max', 'clock', 'isClose', 'isError']
        if (nameSet.includes(nameKey)) {
            data[nameKey] = nameVal
            return true
        }
        return false
    }

    const get = function (nameKey) {
        const nameSet = ['max', 'clock', 'serve', 'count', 'isClose', 'isError']
        if (nameSet.includes(nameKey)) {
            return data[nameKey]
        }
        return false
    }

    return {set, get, serve, close}
}
