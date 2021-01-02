// sort icon type title name
export interface SiteMenuItem {
    name?: string; // 对应 MenuModulesList.name
    sort?: number; // 排序值
    icon?: string; // 图标
    label?: string; // 标题名称
    type?: "button";
}