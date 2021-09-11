import { NativeModules, Platform } from 'react-native';
var IosNaverLogin = NativeModules.IosNaverLogin, RNNaverLogin = NativeModules.RNNaverLogin; // 여기 이름은 달라야 함.
var NaverLoginIos = {
    login: function (param, callback) {
        IosNaverLogin.login(param, callback);
    },
    logout: function () {
        IosNaverLogin.logout();
    },
};
var RNNaverLoginAndr = {
    login: function (param, callback) {
        RNNaverLogin.login(param, callback);
    },
    logout: function () {
        RNNaverLogin.logout();
    },
};
export var getProfile = function (token) {
    return fetch('https://openapi.naver.com/v1/nid/me', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token,
        },
    })
        .then(function (response) { return response.json(); })
        .then(function (responseJson) {
        return responseJson;
    })
        .catch(function (err) {
        console.log('getProfile err');
        console.log(err);
    });
};
export var NaverLogin = Platform.OS === 'ios' ? NaverLoginIos : RNNaverLoginAndr;
