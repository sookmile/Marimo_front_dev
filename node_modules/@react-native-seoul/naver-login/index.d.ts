export interface ICallback<T> {
    (error: Error | undefined, result: T | undefined): void;
}
export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
    tokenType: string;
}
export interface GetProfileResponse {
    resultcode: string;
    message: string;
    response: {
        id: string;
        profile_image: string | null;
        email: string;
        name: string;
        birthday: string | null;
    };
}
export interface ConfigParam {
    kConsumerKey: string;
    kConsumerSecret: string;
    kServiceAppName: string;
    /** Only for iOS */
    kServiceAppUrlScheme?: string;
}
export declare const getProfile: (token: string) => Promise<GetProfileResponse>;
export declare const NaverLogin: {
    login(param: ConfigParam, callback: ICallback<TokenResponse>): void;
    logout(): void;
};
