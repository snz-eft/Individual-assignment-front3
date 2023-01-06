import "./App.css";
import "./css/styles.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PropertyList from "./pages/PropertyList";
import AddProperty from "./pages/AddProperty";
import ShowProperty from "./pages/ShowProperty";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/show-property/:id" element={<ShowProperty />} />
          <Route path="/about-us" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
