import react from 'react';
import Nav from './components/nav';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Footer from './components/Footer';

import { Switch as SwitchMat, createMuiTheme, CssBaseline, Paper } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    const [darkMode, setDarkMode] = react.useState(false);
    const theme = createMuiTheme({
        palette: {
            type: darkMode ? 'dark' : 'light',
        },
    });
    return (
        <Router>
            <CssBaseline />
            <MuiThemeProvider theme={theme}>
                <Paper style={{ height: '100vh' }}>
                    <Nav theme={theme} />
                    <SwitchMat checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    <Switch>
                        <Route path='/' component={Home} exact />
                        <Route path='/login' component={Login} />
                        <Route path='/contact' component={Contact} />
                        <Route path='/blog' component={Blog} exact />
                        <Route path='/blog/:slug' component={BlogPost} />
                    </Switch>
                    <Footer />
                </Paper>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;
