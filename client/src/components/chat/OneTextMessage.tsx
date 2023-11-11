import { BsCheckAll } from 'react-icons/bs';

interface OneTextMessageProps {
    flag?: boolean;
    seen?: boolean;

}

const OneTextMessage: React.FC<OneTextMessageProps> = ({ flag, seen }) => {
    return (
        <div className={`my-4 flex items-center justify-${flag ? 'end' : 'start'}`}>
            <div className={`py-2 px-4 max-w-[80%] space-y-1 rounded-md ${flag ? 'bg-msgPrimary' : 'bg-msgSecondary'}`}>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus illum nostrum repudiandae commodi eveniet culpa, animi fuga est laborum eum amet ducimus quis quod nemo nobis quibusdam assumenda sapiente voluptate.</p>
                <div className="flex w-full justify-end items-center space-x-1">
                    <p className="text-sm font-light text-secondary">11:23 AM</p>
                    {flag &&
                        <span>
                            <BsCheckAll className={`text-xl ${seen ? 'text-blue-500' : 'text-secondary'}`} />
                        </span>
                    }
                </div>
            </div>
            {/* <p>This is sample message</p> */}
        </div>
    );
}

export default OneTextMessage;