import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { hideToast } from '../reducers/toastReducer'


const ToastComponent = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { message, type, visible } = useSelector((state: RootState) => state.toast)

    if (!visible) return null

    setTimeout(() => {
        dispatch(hideToast())
    }, 50000)

    return (
        <div className='toast toast-end'>
            <div className={`alert ${type === "error" ? "alert-error" : type === "info" ? "alert-info" : type === "success" ? "alert-success" : "alert-warning"} font-bold text-lg`}>
                {message}
            </div>
        </div>
    )
}

export default ToastComponent