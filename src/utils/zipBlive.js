import JsZip from 'jszip/dist/jszip.js'

const zip = new JsZip()
console.log(zip)



// 打包
export const pack = (name, data) => {
    console.log(name, data)
}
// 解包
export const unPack = (data) => {
    console.log(data)
}
