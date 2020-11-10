/* -- Default function of _app.js --

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp

*/

import React from 'react';
import AuthState from '../context/auth/authState';
import AppState from '../context/app/appState';

const MyApp = ({ Component, pageProps }) => {
    return(
        <AuthState>
            <AppState>
                <Component {...pageProps}/>
            </AppState>
        </AuthState>
    )
}

export default MyApp;
