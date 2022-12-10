// https://eckertalex.dev/blog/typescript-fetch-wrapper
async function http<T>(path: string, config: RequestInit): Promise<T> {
    const request = new Request(path, config)
    const response = await fetch(request)

    if (!response.ok) {
        let errorMsg: Error = new Error();
        errorMsg.name = response.status.toString();
        errorMsg.message = response.statusText
        throw errorMsg;
    }

    // may error if there is no `body`, return empty array
    return response.json().catch(() => ({}))
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
    const init = {method: 'get', ...config}
    return await http<T>(path, init)
}

export const jsonBodyDataConfig = {
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
}
export async function post<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
    const defaultConfig = {...config, ... jsonBodyDataConfig};
    const init: any = {method: 'post', body: JSON.stringify(body), ...defaultConfig}
    return await http<U>(path, init)
}

export async function put<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
    const defaultConfig = {...config, ... jsonBodyDataConfig};
    const init: any = {method: 'put', body: JSON.stringify(body), ...defaultConfig}
    return await http<U>(path, init)
}
export async function remove<U>(path: string, config?: RequestInit): Promise<U> {
    const init: any = {method: 'delete',...config}
    return await http<U>(path, init)
}