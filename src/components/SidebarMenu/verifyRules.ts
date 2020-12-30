// sort icon type title name
export interface MenuItem {
    name?: string; // 对应 MenuModulesList.name
    sort?: number; // 排序值
    icon?: string; // 图标
    type?: "line"; // 是否线如果存在其他属性失效
    title?: string; // 标题名称
}

// name modules
export interface MenuList {
    name: string;
    modules: any;
}