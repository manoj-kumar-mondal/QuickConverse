export enum RecoilKey {
    UI_STATE = 'ui-state',
    CONTACT_STATE = 'contact-state',
    AUTH_STATE = 'auth-state'
}

export interface IUiState {
    stateName: RecoilKey.UI_STATE;
    mobileScreenMode: boolean;
    activeContactId: string;
}

export interface IAuthState {
    loading: boolean;

}

export interface IContactInfo {
    user: string;
    uid: string;
    lastMessage: string;
    profilePic?: string;
};

export interface IContactState {
    contactList: IContactInfo[];
    activeUser: IContactInfo | null;
};