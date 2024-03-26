import "./auth-modal.css";
import { useAuthStore, AuthTab } from "../../store/useAuthStore";
import LoginTab from "./login-tab";
import SignupTab from "./signup-tab";
import BriefInfo from "./brief-info";
import { IoClose } from "react-icons/io5";

const AuthModal = () => {
    const { authTab, setAuthTab } = useAuthStore();

    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setAuthTab(AuthTab.Closed);
        }
    };

    return (
        <div id='auth-modal' onClick={handleBackgroundClick}>
            <div className='auth__container'>
                <div className='left__container'>
                    WelcomeTab
                </div>
                <div className='right__container'>
                    {authTab === AuthTab.Login ? (
                        <LoginTab />
                    ) : authTab === AuthTab.Signup ? (
                        <SignupTab />
                    ) : authTab === AuthTab.Info && (
                        <BriefInfo />
                    )}
                </div>
                <button
                    className='close__btn'
                    onClick={() => setAuthTab(AuthTab.Closed)}
                >
                    <IoClose size={25} />
                </button>
            </div>
        </div>
    )
}

export default AuthModal