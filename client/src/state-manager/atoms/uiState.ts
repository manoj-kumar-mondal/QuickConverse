import { atom } from 'recoil';
import { IUiState, RecoilKey } from '../constraints';

const initialState: IUiState = {
    stateName: RecoilKey.UI_STATE,
    mobileScreenMode: false,
    activeContactId: ''
};

export const atomUIState = atom({
    key: RecoilKey.UI_STATE,
    default: initialState
});