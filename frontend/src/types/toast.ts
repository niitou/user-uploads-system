export interface ToastState{
    message : string
    type : 'success' | 'error' | 'warning',
    visible : boolean
}