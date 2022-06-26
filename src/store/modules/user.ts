import { UserInfo } from "@/types/user";
import { defineStore } from "pinia";
import { store } from "@/store";

interface UserState {
  userInfo: UserInfo | null;
  token?: string;
}

export const useUserStore = defineStore({
  id: "app-user",
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
  }),
  getters: {
    getUserInfo(): UserInfo | null | string {
      return this.userInfo || JSON.parse(localStorage.getItem("user") || "");
    },
    getToken(): string {
      return this.token || localStorage.getItem("token") || "";
    },
  },
  actions: {
    setToken(info: string | undefined | null): void {
      this.token = info ? info : "";
      localStorage.setItem("token", "1212121212");
    },
    setUserInfo(info: UserInfo | null): void {
      this.userInfo = info;
      if (info) {
        localStorage.setItem("user", JSON.stringify(info));
      }
    },
    logOut() {
      this.userInfo = null;
      localStorage.clear();
    },
  },
});
export function useUserStoreWithOut() {
  return useUserStore(store);
}
