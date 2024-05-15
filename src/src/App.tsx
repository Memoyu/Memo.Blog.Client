import { useState, useEffect } from 'react';
import { LocaleProvider } from '@douyinfe/semi-ui';
import { BrowserRouter } from 'react-router-dom';
import RenderRouter from './router';
import Layout from '@components/layout';

import './App.scss';

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {loading && (
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            )}

            <LocaleProvider>
                <BrowserRouter>
                    <Layout>
                        <RenderRouter />
                    </Layout>
                </BrowserRouter>
            </LocaleProvider>
        </>
    );
}

export default App;
