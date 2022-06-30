import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            "Welcome to React": "Welcome to React and react-i18next",
            "signUp": "Sign Up",
            "login": "Log in",
            'home': 'Home',
            'news': 'News',
            'contact': 'Contact',
            'logout': 'Log out',
            'phimDangChieu': 'Film is playing',
            'phimSapChieu': 'Coming soon movie',
        }
    },
    fr: {
        translation: {
            "Welcome to React": "Bienvenue à React et react-i18next",
            "signUp": "abc",
            "login": "xyz",
            'home': 'Domicile',
            'news': 'nouvelles',
            'contact': 'Contactez',
            'logout': 'Se déconnecter',
            'phimDangChieu': 'jouer un film',
            'phimSapChieu': 'film à venir bientôt',
        }
    },
    vie: {
        translation: {
            "Welcome to React": "Chào mừng đến React và react-i18next",
            "signUp": "Đăng ký",
            "login": "Đăng nhập",
            'home': 'Trang chủ',
            'news': 'Tin tức',
            'contact': 'Liên hệ',
            'logout': 'Đăng xuất',
            'phimDangChieu': 'Phim đang chiếu',
            'phimSapChieu': 'Phim sắp chiếu',
        }
    },
    chi: {
        translation: {
            "signUp": "报名",
            "login": "登录",
            'home': '家',
            'news': '消息',
            'contact': '接触',
            'logout':'登出',
            'phimDangChieu': '电影正在播放',
            'phimSapChieu': '即将上映的电影',
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;