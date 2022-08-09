import { useUserStoreWithOut } from "@/store/modules/user";

export function useUser(){
    const userStore = useUserStoreWithOut();
    const userInfo = userStore.userInfo;
    const setUserInfo = userStore.setUserInfo;
    const logOut = userStore.logOut;
    const setToken = userStore.setToken;
    return {userInfo, setUserInfo, logOut, setToken}
}