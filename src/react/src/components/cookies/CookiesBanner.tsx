import App from "../../App";
import CookieConsent from "react-cookie-consent";
import React from "react";
import { useTranslation } from 'react-i18next';

function CookiesBanner(){
    const { t, i18n } = useTranslation();
    return(<>
        <CookieConsent
            debug={true}
            buttonText={t('cookies_agree')}>
            {t('cookies_text')}</CookieConsent>
        </>)
}

export default CookiesBanner;