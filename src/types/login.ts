export interface LoginFormData {
    userName:string,
    password:string
}
export class initData {
    loginForm:LoginFormData = {
        userName: '',
        password: ''
    }
    loginFormRef:any = null
}