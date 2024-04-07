import { create } from "zustand";
import { toast } from "sonner";

export enum AuthTab {
    Closed = 'closed',
    Login = 'login',
    Signup = 'signup',
    Info = 'info'
}

export enum AuthStatus {
    Authenticating = 'authenticating',
    Authenticated = 'authenticated',
    Failed = 'failed',
}

export interface User {
    username: string
    email: string
    first_name: string
    last_name: string
    avatar: string | null
}

interface AuthStore {
    route: string
    setRoute: (navigate: string) => void
    authTab: AuthTab
    setAuthTab: (tab: AuthTab) => void
    isAuthenticated: string
    setIsAuthenticated: (authenticated: AuthStatus) => void
    user: User
    setUser: (data: User) => void
    autoLogin: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    route: "",
    setRoute: (navigate: string) => set({ route: navigate }),
    authTab: AuthTab.Closed,
    setAuthTab: (tab: AuthTab) => set({ authTab: tab }),
    isAuthenticated: AuthStatus.Authenticating,
    setIsAuthenticated: (authenticated: AuthStatus) => set({ isAuthenticated: authenticated }),
    user: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: null
    },
    setUser: (data: User) => set({ user: data }),
    autoLogin: () => {
        const token = localStorage.getItem('token');

        if (!token) {
            if (location.pathname !== '/auth') set({ route: location.pathname });
            set({ isAuthenticated: AuthStatus.Failed });
        }
        else {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${token}`);

            fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/auto-login`, {
                method: 'GET',
                headers: headers,
            })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        toast.success(response.message);
                        set({ user: response.data.user, isAuthenticated: AuthStatus.Authenticated, authTab: AuthTab.Closed });
                    }
                    else {
                        toast.success('Session logged out.');
                        set({ isAuthenticated: AuthStatus.Failed });
                        localStorage.removeItem('token');
                    }
                })
                .catch(() => {
                    toast.success('Session logged out.');
                    set({ isAuthenticated: AuthStatus.Failed });
                    localStorage.removeItem('token');
                });
        }
    }
}));

interface TempStore {
    tempUser: User
    setTempUser: (data: User) => void
    clearTempUser: () => void
}

export const useTempStore = create<TempStore>((set) => ({
    tempUser: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: null
    },
    setTempUser: (data: User) => set({ tempUser: data }),
    clearTempUser: () => set({
        tempUser: {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            avatar: null
        }
    })
}));