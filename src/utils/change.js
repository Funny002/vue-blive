/** 获取元素属性
 * @param attributes Array
 * @param attributesList Json
 * @returns {{}} Json
 */
export const getAttributes = (attributes, attributesList = {}) => {
    for (const {nodeName, nodeValue} of attributes) {
        attributesList[nodeName] = nodeValue;
    }
    return attributesList;
}

/** 递归取节点
 * @param dataList Array
 * @returns {[]|*[]} Array
 */
export const recursionNodeJson = (dataList) => {
    if (!dataList) return []
    let nodeList = [] // 节点列表
    // 标签 ，标签类型 ， 标签内容 ，标签属性 ，标签子级
    for (const {nodeName, nodeType, nodeValue, attributes, childNodes} of dataList) {
        if (nodeType === 1) { // 元素
            nodeList.push({nodeName, nodeType, attributes: getAttributes(attributes), childNodes: recursionNodeJson(childNodes)})
        } else { // 文本，注释，空格，等... 多用途方法
            nodeList.push({nodeName, nodeType, nodeValue})
        }
    }
    return nodeList
}

/** html（dom）转换成 json
 * @param nodeName
 * @param nodeType
 * @param attributes
 * @param childNodes
 * @returns {{nodeName: *, attributes: {}, childList: [], nodeType: *}} Json
 */
export const changeJson = ({nodeName, nodeType, attributes, childNodes}) => {
    return {nodeName, nodeType, attributes: getAttributes(attributes), childList: recursionNodeJson(childNodes)}
}

// /** 赋值元素属性

export const setAttributes = (HTMLElement, attributes) => {
    for (const ObjKey in attributes) {
        HTMLElement[ObjKey] = attributes[ObjKey]
    }
    return HTMLElement
}

/** 创建 dom 节点
 * @param nodeName
 * @param attributes
 * @returns {*}
 */
export const createElement = ({nodeName, attributes}) => {
    const dom = document.createElement(nodeName)
    return setAttributes(dom, attributes)
}

/**  创建 dom 树
 * @param dataList
 * @returns {[]|*[]}
 */
export const recursionNodeHtml = (dataList) => {
    if (!dataList) return []
    let nodeList = [] // 节点列表
    for (const {nodeName, nodeType, nodeValue, attributes, childNodes} of dataList) {
        let dom = null;
        if (nodeType === 1) {
            dom = createElement({nodeName, attributes})
            const domList = recursionNodeHtml(childNodes)
            while (domList.length) {
                dom.append(domList.pop())
            }
        } else if (nodeType === 8) {
            dom = document.createComment(nodeValue)
        } else {
            dom = document.createTextNode(nodeValue)
        }
        nodeList.push(dom)
    }
    return nodeList
}

/** json 转换成 html（dom）
 * @param nodeName
 * @param attributes
 * @param childList
 * @returns {*}
 */
export const changeHtml = ({nodeName, attributes, childList}) => {
    const dom = createElement({nodeName, attributes})
    const nodeList = recursionNodeHtml(childList)
    while (nodeList.length) {
        dom.append(nodeList.pop())
    }
    return dom
}
