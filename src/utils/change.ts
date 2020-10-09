/** 元素解析
 * @Param attributes
 * @Returns { [key: string]: any }
 */
export function getAttributes(attributes: NamedNodeMap): { [key: string]: any } {
    const attributesList: { [key: string]: any } = {}
    for (const {nodeName, nodeValue} of attributes) {
        attributesList[nodeName] = nodeValue;
    }
    return attributesList;
}

/** 解析 dom 元素
 * @Param childNodesList
 * @Returns Object[]
 */
export function recursionNodeJson(childNodesList: any): object[] {
    const nodeList = []
    // if (!childNodesList.length) return []
    for (const {nodeName, nodeType, nodeValue, attributes, childNodes} of childNodesList) {
        if (nodeType === 1) { // 元素
            nodeList.push({nodeName, nodeType, attributes: getAttributes(attributes), childNodes: recursionNodeJson(childNodes)})
        } else { // 文本，注释，空格，等... 多用途方法
            nodeList.push({nodeName, nodeType, nodeValue})
        }
    }
    return nodeList
}

/** dom 转 json
 * @Param htmlElement
 * @Returns Object
 * @Constructor
 */
export function HtmlOrJson(htmlElement: Element) {
    return recursionNodeJson([htmlElement])[0]
}

//
// export const setAttributes = (HTMLElement: Element, attributes: any) => {
//     for (const ObjKey in attributes) {
//         HTMLElement[ObjKey] = attributes[ObjKey]
//     }
//     return HTMLElement
// }
//
// export function createElement({nodeName, attributes}: any) {
//     const dom = document.createElement(nodeName)
//     return setAttributes(dom, attributes)
// }
//
// export const recursionNodeHtml = (dataList: any) => {
//     if (!dataList) return []
//     let nodeList = [] // 节点列表
//     for (const {nodeName, nodeType, nodeValue, attributes, childNodes} of dataList) {
//         let dom = null;
//         if (nodeType === 1) {
//             dom = createElement({nodeName, attributes})
//             const domList = recursionNodeHtml(childNodes)
//             while (domList.length) {
//                 dom.append(domList.pop())
//             }
//         } else if (nodeType === 8) {
//             dom = document.createComment(nodeValue)
//         } else {
//             dom = document.createTextNode(nodeValue)
//         }
//         nodeList.push(dom)
//     }
//     return nodeList
// }
//
// export function JsonOrHtml({nodeName, attributes, childNodes}: Element) {
//     const dom = createElement({nodeName, attributes})
//     const nodeList = recursionNodeHtml(childNodes)
//     while (nodeList.length) {
//         dom.append(nodeList.pop())
//     }
//     return dom
// }
