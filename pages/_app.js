/* -- Default function of _app.js --

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export default MyApp

*/

import React from 'react';
import AuthState from '../context/auth/authState';

const MyApp = ({ Component, pageProps }) => {
    return(
        <AuthState>
            <Component {...pageProps}/>
        </AuthState>
    )
}

export default MyApp;
