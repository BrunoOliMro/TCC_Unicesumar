import type { AxiosResponse } from "axios"
import type { BaseResponse } from "../types/global.types"
import toast from "svelte-french-toast"

type ToastInfo = {
    promise: Promise<AxiosResponse<BaseResponse<unknown>>>,
    loadingMessage: string
}

enum Colors {
    GREEN = 'var(--cl-axon-green-400)',
    RED = 'var(--cl-red-500);',
    YELLOW = 'var(--cl-yellow-500);'
}

export default class ToasterHandler {

    private static readonly _mainStyles = 'display: flex;justify-content:center;text-align:center;align-items:center;padding: 1rem; min-width: 300px; font-size: 1rem;'

    private static _getStyles(color: Colors) {
        const additionalStyles = this._mainStyles + `
        border-inline: 8px solid ${color};
        `

        return additionalStyles;
    }

    static createPromiseToast(toastInfo: ToastInfo) {

        const loadingToastId = toast.loading(toastInfo.loadingMessage);

        return toastInfo.promise.then((res) => {

            if (res.status >= 200 && res.status < 300) {
                toast.success(res.data.message, { id: loadingToastId })
            } else {
                toast.error(res.data.message, { id: loadingToastId })
            }

        }).catch((err) => {
            console.log(err);
            toast.error(err.response.data.message, { id: loadingToastId })
        })

    }

    public static createErrorToast(message: string) {

        toast.error(message, {
            style: this._getStyles(Colors.RED),
        })

    }

    public static createSuccessToast(message: string) {

        toast.success(message, {
            style: this._getStyles(Colors.GREEN),
        })

    }

}