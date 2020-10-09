import {arrayHas} from "@/utils/assist";
import {createUUID} from "@/utils/uuid";
import {addHistory, getHistoryList} from "@/utils/history";

export const emptyTemplate = {nodeName: "DIV", nodeType: 1, attributes: {class: "Blive", style: "width: 100%; height:230px;"}, childList: []}

/** 生成一个 uuid
 * @Param format
 * @Returns string
 */
const getUUID = (format: string): string => {
    let uuid = '';
    const templateList = Object.keys(getHistoryList());
    while (!uuid) {
        const uuidVal = createUUID(format);
        if (!arrayHas(templateList, uuid)) {
            uuid = uuidVal
        }
    }
    return uuid
}

/** 创建空白模板
 * @Param callback
 */
export function newTemplate(callback: (uuid: string, status: boolean) => void) {
    const uuid = getUUID('xxxxx-xxxx-xxx-xxxx-xx');
    callback(uuid, addHistory(uuid, emptyTemplate))
}

// 获取请求
export function urlTemplate() {
    console.log('urlTemplate')
}

// 发送文件到后端解压
export function fileTemplate() {
    console.log('fileTemplate')
}

// const keys = Object.keys(listHistory())
// if (keys.length >= 20) {
//     this_.$message({
//         message: '模板已达到最大上限',
//         type: 'error'
//     });
//     return false
// }
// if (keys.length >= 1) {
//     let is = false;
//     await this_.$alert('检测到缓存中存在复数的模板文件。确定还要创建吗?', '系统提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: "取消",
//         showCancelButton: true,
//         type: 'warning',
//     }).catch(() => {
//         this_.$message({
//             type: 'info',
//             message: '取消了，创建模板'
//         });
//         is = true
//     })
//     if (is) {
//         return false
//     }
// }
// // 创建div[dom] -> dom 转 json -> 添加缓存
// const html = document.createElement('div')
// html.style.width = '100%';
// html.style.height = '100%';
// return addTemplate(changeJson(html))
