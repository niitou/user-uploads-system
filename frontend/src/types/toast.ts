export interface ToastState{
    message : string
    type : 'success' | 'error' | 'warning' | 'info',
    visible : boolean
}