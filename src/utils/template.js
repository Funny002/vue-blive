import history from "@/utils/history";
import {unPack} from "@/utils/zipBlive";

const uuidTemplate = 'xxxxx-xxxx-xxxx-xxxxx';
const createUuid = () => {
    return uuidTemplate.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
}

const addTemplate = (value) => {
    let uuid = createUuid()
    while (history.hasHistory(uuid)) {
        uuid = createUuid()
    }
    // {} 代表空文件
    return history.addHistory(uuid, value) ? uuid : false
}
// 创建空白模板
export const newTemplate = async (this_) => {
    let value = false
    const keys = Object.keys(history.listHistory())
    if (keys.length >= 1) {
        if (keys.length >= 20) {
            this_.$message({
                message: '模板已达到最大上限',
                type: 'error'
            });
            return value
        }
        await this_.$alert('检测到缓存中存在复数的模板文件。确定还要创建吗?', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: "取消",
            showCancelButton: true,
            type: 'warning',
        }).then(() => {
            value = addTemplate({})
        }).catch(() => {
            this_.$message({
                type: 'info',
                message: '取消了，创建模板'
            });
        })
    } else if (keys.length <= 20) {
        return addTemplate({})
    }
    return value
}

// 通过URL创建模板
export const urlTemplate = (fileData) => {
    fileTemplate(fileData)
}

// 提供Blive文件创建模板
export const fileTemplate = (file) => {
    let uuid = createUuid()
    while (history.hasHistory(uuid)) {
        uuid = createUuid()
    }
    history.addHistory(uuid, unPack(file))
}
