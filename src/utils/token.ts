const tokenName = 'Token';

/** 获取token */
export const getToken = () => localStorage.getItem(tokenName)

/** 设置 token
 * @param Token
 */
export const setToken = (Token: string) => localStorage.setItem(tokenName, Token)