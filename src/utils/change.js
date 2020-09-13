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

/** 创建一个 dom 元素
 * @param tag
 * @param style
 * @param value
 * @returns HTMLDocument
 */
const createElement = ({tag, style, value}) => {
    const dom = document.createElement(tag)
    dom.innerText = value
    dom.style = style
    return dom
}

/** 创建 dom 树
 * @param dataList
 * @returns {[]}
 */
const recursionNode = (dataList) => {
    if (!dataList) return []
    let nodeList = [] // 节点列表
    for (const {tag, style, value, childList} of dataList) {
        const dom = createElement({tag, style, value})// 当前主节点的 n子节点
        const domList = recursionNode(childList)
        // 吧子节点添加到主节点中
        while (domList.length) {
            dom.append(domList.pop())
        }
        // 主节点添加到列表
        nodeList.push(dom)
    }
    return nodeList
}

const recursionNodeJson = (dataList) => {
    if (!dataList) return []
    let nodeList = [] // 节点列表
    for (const value of dataList) {
        // 暂不支持 文件节点，元素节点，文件节点， 这样的组合
        // 内容严重出错
        if (value.nodeType === 1) {
            const {tagName, style: {cssText}, innerText, childNodes} = value
            nodeList.push({tag: tagName, style: cssText, value: innerText, childList: recursionNodeJson(childNodes)})
        }
    }
    return nodeList
}

/** html（dom）转换成 json
 * @param tagName
 * @param cssText
 * @param innerText
 * @param childNodes
 * @returns {{style: *, childList: [], tag: *, value: *}}
 */
export const changeJson = ({tagName, style: {cssText}, innerText, childNodes}) => {
    return {tag: tagName, style: cssText, value: innerText, childList: recursionNodeJson(childNodes)}
}

/** json 转换成 html（dom）
 * @param tag
 * @param style
 * @param value
 * @param childList
 * @returns {HTMLDocument}
 */
export const changeHtml = ({tag, style, value, childList}) => {
    const dom = createElement({tag, style, value}); // 主节点
    const nodeList = recursionNode(childList)
    while (nodeList.length) {
        dom.append(nodeList.pop())
    }
    return dom
}
