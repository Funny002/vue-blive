import axios from '@/plugin/axios'

interface Parameter {
    error: (() => void);
    success: (() => void);
    data: { [key: string]: any };
}

const request = (request: string, {data, success, error}: Parameter) => {
    axios({data, method: "post", url: '/api/sign/' + request}).then(success).catch(error)
}

export default ({
    login: (parameter: Parameter) => request('login', parameter),
    registered: (parameter: Parameter) => request('create', parameter),
})
