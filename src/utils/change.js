// nodeName 标签
// nodeValue 文本
// nextSibling 同级的后面一个节点
// firstChild 当前节点的第一个子节点
// lastChild 当前节点的最后一个子节点
// childNodes 子节点合集
// hasChildNodes() 判断是否存在子节点
// appendChild() 在最后插入一个节点
// removeChild() 删除节点
// insertBefore() 指定位置插入节点
// replaceChild() 节点替换
// normalize() 清楚内部空文本节点
// HTMLCollection 获取 dom 属性
// children 只读获取子节点合集
// append() 当前 dom 节点的最后一个子节点
// ChildNode


// function DOMComb(parent, callback) {
//     if (parent.hasChildNodes()) {
//         for (var node = parent.firstChild; node; node = node.nextSibling) {
//             DOMComb(node, callback);
//         }
//     }
//     callback(parent);
// }


// html(dom) 转换成 json
export const changeJson = (html) => {
    console.log('changeHtml', html)
    return html
}

// json 转换成 html(dom)
export const changeHtml = (json) => {
    console.log('changeHtml', json)
    return json
}
