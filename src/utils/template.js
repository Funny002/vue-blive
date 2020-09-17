import {changeJson} from '@/utils/change.js';
import {zipUnPack} from "@/utils/zipBlive.js";
import {addHistory, hasHistory, listHistory} from "@/utils/history";

const uuidTemplate = 'xxxxx-xxxx-xxxx-xxxxx';

const createUuid = () => {
    return uuidTemplate.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
}

const addTemplate = (value) => {
    let uuid = createUuid()
    while (hasHistory(uuid)) {
        uuid = createUuid()
    }
    // {} 代表空文件
    return addHistory(uuid, value) ? uuid : false
}

// 创建空白模板
export const newTemplate = async (this_) => {
    const keys = Object.keys(listHistory())
    if (keys.length >= 20) {
        this_.$message({
            message: '模板已达到最大上限',
            type: 'error'
        });
        return false
    }
    if (keys.length >= 1) {
        let is = false;
        await this_.$alert('检测到缓存中存在复数的模板文件。确定还要创建吗?', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: "取消",
            showCancelButton: true,
            type: 'warning',
        }).catch(() => {
            this_.$message({
                type: 'info',
                message: '取消了，创建模板'
            });
            is = true
        })
        if (is) {
            return false
        }
    }
    // 创建div[dom] -> dom 转 json -> 添加缓存
    return addTemplate(changeJson(document.createElement('div')))
}

// 通过URL创建模板
export const urlTemplate = (fileData) => {
    fileTemplate(fileData)
}

// 提供Blive文件创建模板
export const fileTemplate = (file) => {
    let uuid = createUuid()
    while (hasHistory(uuid)) {
        uuid = createUuid()
    }
    addHistory(uuid, zipUnPack(file))
}
