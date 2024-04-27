import { LocaleProvider } from '@douyinfe/semi-ui';
import { BrowserRouter } from 'react-router-dom';
import RenderRouter from './router';
import Layout from '@components/layout';

import './App.scss';

function App() {
    return (
        <LocaleProvider>
            <BrowserRouter>
                <Layout>
                    <RenderRouter />
                </Layout>
            </BrowserRouter>
        </LocaleProvider>
    );
}

export default App;
