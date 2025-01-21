import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Banner from "./Components/Banner/Banner";
import Footer from "./Components/Footer/Footer";
import Galeria from "./Components/Galeria/Galeria";
import VideoPage from "./pages/VideoPage/VideoPage";
import VideoPlayer from "./pages/VideoPlayer/VideoPlayer";
import NuevoVideo from "./pages/NuevoVideo/NuevoVideo";

const App = () => {
  return (
    <Router>
      <div>
        {/* Componente Header y Banner visibles en todas las rutas */}
        <Header />
        <Banner />
        
        <Routes>
          {/* Ruta para la Galería */}
          <Route path="/" element={<Galeria />} />
          {/* Ruta para la página de Video, basada en la categoría */}
          <Route path="/videos/:category" element={<VideoPage />} />
          <Route path="/VideoPlayer/:id" element={<VideoPlayer />} />
          <Route path="/nuevo-video" element={<NuevoVideo />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    );
  
};

export default App;
