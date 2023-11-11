import { atom } from 'recoil';
import { IAuthState, RecoilKey } from '../constraints';

const initialState: IAuthState = {
    loading: false
};

export const atomUIState = atom({
    key: RecoilKey.AUTH_STATE,
    default: initialState
});