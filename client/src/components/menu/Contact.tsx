import ContactImage from "../common/ContactImage";
import { useRecoilState } from "recoil";
import { atomUIState } from "@/state-manager/atoms";

interface ConatctProps {
    currentId: string;
    name: string;
    logo: string;
    lastMessage: string;
    date: string;
    id: number;
};

const Contact: React.FC<ConatctProps> = ({ currentId, id, lastMessage, date, logo, name }) => {
    const [uiState, setUIState] = useRecoilState(atomUIState);

    const handleDivClick = () => {
        // setCurrentId(String(id));
        setUIState({ ...uiState, activeContactId: String(id) });
    }

    return (
        <div onClick={handleDivClick} className={`flex px-2 md:px-4 items-center cursor-pointer ${currentId == String(id) ? 'md:bg-contactActiveBg' : 'md:bg-none'} hover:bg-contactHoverBg`}>
            <div className="h-full pr-4 py-3">
                <ContactImage className="w-10 h-10" logo={logo} />
            </div>
            <div className="h-full pt-3 pb-4 px-3 flex-1 flex flex-col space-y-1 border-b border-slate-700">
                <div className="flex justify-between">
                    <h2 className="font-semibold">{name}</h2>
                    <p className="text-xs font-thin">{date}</p>
                </div>
                <p className="text-sm text-gray-500 font-light">{lastMessage}</p>
            </div>
        </div>
    );
}

export default Contact;