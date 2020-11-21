import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/appRouter";
import ErrorBoundary from "./resuableComponents/errorBoundary/ErrorBoundary";

const App = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary history={history}>
                <AppRouter />    
            </ErrorBoundary>
        </BrowserRouter>
    )
}

export default App;