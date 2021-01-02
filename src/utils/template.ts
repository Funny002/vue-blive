// 创建模板
import {createUUID} from "@/utils/uuid";
import {setHistory} from "@/utils/history";

export const createTemplate = () => {
    const uuid = createUUID('xxxx-xxxx-xxx-xxxx-xxxx')
    setHistory(uuid, '<p>我是一个空文本模块</p>')
    return uuid
}