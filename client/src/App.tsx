import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "./pages/signup";
import Events from "./pages/events";
import Bookings from "./pages/bookings";
import Navbar from "./components/Navbar";
import "./App.css"
import Login from "./pages/login";
import AuthProvider from "./context/AuthProvider";
import About from "./pages/About";
import MyEvents from "./pages/myEvents";


const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache(),
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <AuthProvider>
                    <Navbar/>
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Events/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                            <Route path="/myevents" element={<MyEvents/>}/>
                            <Route path="/bookings" element={<Bookings/>}/>
                        </Routes>
                    </main>
                </AuthProvider>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App
