import "./index.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore, AuthTab, useTempStore } from "../../../store/useAuthStore";
import Lottie from "lottie-react";
import WavingHand from "../../../lottie/WavingHand.json";
import LoginTab from "./login-tab";
import SignupTab from "./signup-tab";
import BriefInfo from "./brief-info";
import { IoClose } from "react-icons/io5";

type RegisterData = {
    email: string;
    password: string;
    avatar: string | File;
    username: string;
    first_name: string;
    last_name: string;
};

const AuthModal = () => {
    const location = useLocation();
    const { authTab, setAuthTab } = useAuthStore();
    const { tempUser } = useTempStore();

    const [registerData, setRegisterData] = useState<RegisterData>(() => ({
        email: tempUser.email || "",
        password: "",
        avatar: tempUser.avatar || "",
        username: tempUser.username || "",
        first_name: tempUser.first_name || "",
        last_name: tempUser.last_name || ""
    }));

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (location.pathname !== '/auth' && event.target === event.currentTarget) {
            setAuthTab(AuthTab.Closed);
        }
    };

    return (
        <div id='auth-modal' onClick={handleBackgroundClick}>
            <div className='auth__container'>
                <div className='left__container'>
                    <Lottie
                        animationData={WavingHand}
                        className="lottie-anim"
                        loop={true}
                    />
                </div>
                <div className='right__container'>
                    {authTab === AuthTab.Login ? (
                        <LoginTab />
                    ) : authTab === AuthTab.Signup ? (
                        <SignupTab
                            registerData={registerData}
                            setRegisterData={setRegisterData}
                        />
                    ) : authTab === AuthTab.Info && (
                        <BriefInfo
                            registerData={registerData}
                            setRegisterData={setRegisterData}
                        />
                    )}
                </div>
                {location.pathname !== '/auth' && (
                    <button
                        className='close__btn'
                        onClick={() => setAuthTab(AuthTab.Closed)}
                    >
                        <IoClose size={30} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default AuthModal