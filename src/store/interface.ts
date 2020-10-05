export interface IndexState {
    isBeta: boolean, // 是否 Beta 版
    version: string, // 版本
    author: string, // 作者
    email: string, // 邮箱
}

export interface workbenchDialogState {
    path: string,
    title: string,
    list: { path: string, title: string }[]
}
