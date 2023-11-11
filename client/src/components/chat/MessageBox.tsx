import { IoMdSend } from 'react-icons/io';
import { HiPlus } from 'react-icons/hi';
import { MdAttachFile } from 'react-icons/md';

const MessageBox: React.FC = () => {
    return (
        <div className="flex items-center justify-between">
            <div className='hidden md:block'>
                <button>
                    <HiPlus className="text-3xl text-iconLight" />
                </button>
            </div>
            <div className="flex flex-1 mx-2 md:mx-4">
                <input
                    className="w-full py-2 md:py-3 px-4 md:px-6 bg-[#2a3942] rounded-l-full md:rounded-lg"
                    type="text"
                    placeholder="Type a message"
                />
                <button className='realtive md:hidden bg-[#2a3942] rounded-r-full px-4'>
                    <MdAttachFile className="text-lg text-iconLight" />
                </button>
            </div>
            <div>
                <button className='customBtn md:customBtn-counter'>
                    <IoMdSend className="text-lg md:text-3xl text-white md:text-iconLight" />
                </button>
            </div>
        </div>
    );
}

export default MessageBox;