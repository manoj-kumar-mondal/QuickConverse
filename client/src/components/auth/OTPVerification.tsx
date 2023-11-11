import { useAppDispatch, useAppSelector } from '@/state-manager';
import { getOTPAction, verifyOTPAction } from '@/state-manager/actions';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

interface IFormData {
    mobileNumber: string;
    otp: string;
    type: 'mobile' | 'otp';
    errorMessage: string;
};

const initialFormData: IFormData = { mobileNumber: '', otp: '', type: 'mobile', errorMessage: '' };

const OTPVerification = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(state => state.auth);

    const [formData, setFormData] = useState<IFormData>(initialFormData);
    const [receivedOtp, setReceivedOtp] = useState<string>('');


    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.type === 'mobile') {
            if (formData.mobileNumber.length !== 10) {
                setFormData({
                    ...formData,
                    errorMessage: 'please enter a valid mobile number'
                });
            } else {
                dispatch(getOTPAction(formData.mobileNumber, setReceivedOtp));
                setFormData({
                    ...formData,
                    type: 'otp'
                });
            }
        } else if (formData.type === 'otp') {
            dispatch(verifyOTPAction(formData.otp));
            setFormData(initialFormData);
        }

    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        if (receivedOtp.length === 4) {
            alert(`OTP must send to mobile number, but testing purpose showing as alert.\nTo verify otp please use OTP: ${receivedOtp}`);
        }
    }, [receivedOtp]);

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
                    mobileNumber: ''
                });
            }, 1000 * 10);
        }

        return () => {
            clearTimeout(instance);
        }
    }, [formData.errorMessage]);

    return (
        <div className='w-full'>
            <form className="w-full" onSubmit={handleFormSubmit}>
                <p className="font-semibold text-red-600 text-sm md:text-lg mt-2">{formData.errorMessage}</p>
                <input
                    name="mobileNumber"
                    className={`w-full my-3 md:my-4 px-4 md:px-6 py-2 rounded-lg md:py-3 
                                bg-headerBg ${formData.type === 'otp' && 'text-slate-500'} text-sm md:text-base`}
                    type="text"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    readOnly={formData.type === 'otp'}
                    onFocus={() => {
                        setFormData({ ...formData, errorMessage: '' });
                    }}
                    autoComplete='off'
                />
                <input
                    name="otp"
                    className="w-full my-3 md:my-4 px-4 md:px-6 py-2 rounded-lg md:py-3 bg-headerBg text-sm md:text-base"
                    type="text"
                    placeholder="OTP"
                    value={formData.otp}
                    onChange={handleInputChange}
                    autoComplete='off'
                />
                <button className={`font-semibold w-full mt-6 px-5 py-1.5 md:py-2.5 bg-green-700 rounded-lg hover:bg-green-800 ${selector.loading && 'hover:cursor-not-allowed'}`} disabled={selector.loading}>
                    {
                        selector.loading ? <span>loading...</span> :
                            <span>
                                {formData.type === 'mobile' ? 'Get OTP' : 'Verify OTP'}
                            </span>
                    }
                </button>
            </form>
        </div>
    )
}

export default OTPVerification;