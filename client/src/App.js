import Navigation from "./components/Navigation";
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Gadget from "./pages/Gadget";
import About from "./pages/About";
import Contact from "./pages/Contact";

import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});






function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />,
        <Route path="/login" element={<Login />} />,
        <Route path="/signup" element={<Signup />} />,
        <Route path="/gadget" element={<Gadget />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </BrowserRouter>
      </ApolloProvider>
  );
}

export default App;
