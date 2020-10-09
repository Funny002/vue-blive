import Axios from '@/plugin/axios';
import {AxiosResponse} from "axios";

export function fileTemplate(file: File, callback: (data: AxiosResponse<any>) => void) {
    const url = ''
    const method = 'get'
    Axios({url, method, data: file}).then((data: AxiosResponse<any>) => callback(data))
}
