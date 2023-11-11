import Menu from "@/components/menu/Menu";
import ChatWindow from "@/components/chat/ChatWindow";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import { atomUIState } from "@/state-manager/atoms";
import AuthComponent from "../auth/Main";

const QuickConverse: React.FC = () => {
    const [uiState, setUiState] = useRecoilState(atomUIState);
    const isAuth = false;

    useEffect(() => {
        if (uiState.activeContactId) {
            setUiState({ ...uiState, mobileScreenMode: true });
        }
    }, [uiState.activeContactId]);

    return (
        <>
            {
                !isAuth ? <AuthComponent /> :
                    <div className="absolute top-0 left-0 w-full h-full">
                        <section
                            className="md:flex md:w-[80%]
                            mx-auto md:mt-8 h-full md:h-[93%]"
                        >
                            <div className={`${uiState.mobileScreenMode && 'hidden'} md:block w-full md:w-1/3 h-full`}>
                                <Menu />
                            </div>
                            <div className={`${!uiState.mobileScreenMode && 'hidden'} h-full md:block md:w-2/3`}>
                                <ChatWindow personName="" logo="" />
                            </div>
                        </section>
                    </div>
            }

        </>
    )
}

export default QuickConverse;