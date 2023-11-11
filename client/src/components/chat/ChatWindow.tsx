'use client';

import { BsThreeDotsVertical, BsSearch } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import Header from "../common/Header";
import MessageBox from "./MessageBox";
import ContactImage from '../common/ContactImage';
import OneTextMessage from './OneTextMessage';
import { useRecoilState } from 'recoil';
import { atomUIState } from "@/state-manager/atoms";

interface ChatWindowProps {
    personName: string;
    logo: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ personName, logo }) => {
    const [uiState, setUiState] = useRecoilState(atomUIState);

    const handleBackButton = () => {
        setUiState({ ...uiState, mobileScreenMode: false });
    };

    return (
        <div className="flex flex-col justify-between w-full h-full bg-chatWindowBg">
            <Header>
                <div className="flex items-center justify-between w-full">
                    <div className='flex items-center'>
                        <button className='mr-1 md:hidden' onClick={handleBackButton}>
                            <BiArrowBack className="text-xl font-bold" />
                        </button>
                        <div className='flex items-center space-x-2'>
                            <ContactImage logo={logo} />
                            <h2>{personName}</h2>
                        </div>
                    </div>
                    <div className="space-x-4 md:space-x-6">
                        <button>
                            <BsThreeDotsVertical className="text-lg" />
                        </button>
                        <button>
                            <BsSearch className="text-lg" />
                        </button>
                    </div>
                </div>
            </Header>
            <div className="custom-scrollbar flex-1 overflow-y-scroll px-5 md:px-7">
                <OneTextMessage />
                <OneTextMessage />
                <OneTextMessage flag />
                <OneTextMessage />
            </div>
            <div className="px-2 md:px-5 py-3 md:bg-[#202c33]">
                <MessageBox />
            </div>
        </div>
    );
}

export default ChatWindow;