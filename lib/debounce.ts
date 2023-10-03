export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor = 700) => {
    let timeout: any

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise((resolve) => {
            if (timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(() => resolve(func(...args)), waitFor)
        })
}
