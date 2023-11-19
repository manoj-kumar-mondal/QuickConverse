import { ChangeEvent, FocusEvent } from "react";
import { twMerge } from "tailwind-merge";

interface InputFieldProps {
    name: string;
    placeholder: string;
    value: string;
    changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    focusHandler?: (event: FocusEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, placeholder, changeHandler, value, focusHandler, readOnly, className }) => {
    return (
        <div className="w-full my-3 md:my-6">
            <input
                type='text'
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={changeHandler}
                readOnly={readOnly}
                onFocus={focusHandler}
                autoComplete='off'
                className={twMerge(`w-full px-4 md:px-6 py-2 rounded-lg md:py-3 bg-headerBg text-sm md:text-base`, className)}
            />
        </div>
    )
}

export default InputField;