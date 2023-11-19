import { ChangeEvent, FocusEvent, FormEvent, useState, useEffect } from "react";
import InputField from "./InputField";
import { useAppDispatch, useAppSelector } from "@/state-manager";
import { newRegistrationAction } from "@/state-manager/actions";

interface IFormData {
    errorMessage: string;
    userName: string;
    email: string;
}
const initialFormData: IFormData = { errorMessage: '', userName: '', email: '' };

const isEmail = (email: string): boolean => {
    if (!email.includes('.') || !email.includes('@')) {
        return false;
    }
    if (email.lastIndexOf('@') > email.lastIndexOf('.')) {
        return false;
    }
    return true;
}

const NewRegistration = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const selector = useAppSelector(state => state.auth);


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.email && !isEmail(formData.email)) {
            setFormData({
                ...formData,
                errorMessage: 'please select a valid email'
            });
        }
        dispatch(newRegistrationAction(formData.userName, formData.email));
    }

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            errorMessage: ''
        });
    }

    useEffect(() => {
        if (selector.errorMessage) {
            setFormData({
                ...formData,
                errorMessage: selector.errorMessage
            })
        }
    }, [selector.errorMessage]);

    useEffect(() => {
        let instance: any;

        if (formData.errorMessage) {
            instance = setTimeout(() => {
                setFormData({
                    ...formData,
                    errorMessage: '',
                });
            }, 1000 * 10);
        }

        return () => {
            clearTimeout(instance);
        }
    }, [formData.errorMessage]);

    return (
        <form className="w-full" onSubmit={handleSubmit}>
            <p className="font-light text-red-600 text-sm md:text-base mt-2">{formData.errorMessage}</p>
            <InputField
                name="userName"
                placeholder="Choose a user name"
                value={formData.userName}
                changeHandler={handleChange}
            />
            <InputField
                name="email"
                placeholder="Set an email (optional)"
                value={formData.email}
                changeHandler={handleChange}
                focusHandler={handleFocus}
            />
            <button className={`font-semibold w-full mt-6 px-5 py-1.5 md:py-2.5 bg-green-700 rounded-lg hover:bg-green-800`}>
                Submit
            </button>

        </form>
    );
}

export default NewRegistration;