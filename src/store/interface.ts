export interface IndexState {
    isBeta: boolean, // 是否 Beta 版
    version: string, // 版本
    author: string, // 作者
    email: string, // 邮箱
}

/* 窗口 */
export interface workbenchDialogState {
    path: string,
    title: string,
    list: { path: string, title: string }[]
}

export interface rulerMobile {
    top: number,
    left: number
}

export interface expandStatus {
    /* 标尺 */
    rulerStatus: boolean,
    rulerMobile: rulerMobile,
    /* 自动保存 */
    saveView: number,
    saveClock: number,
    saveNumber: number,
    saveStatus: number,
}
