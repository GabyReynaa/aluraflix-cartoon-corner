import React from "react";
import { FaFacebookF, FaInstagram} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <p>Desarrollado por Gabriela Reyna</p>
      </div>
      <p className="footer__text">© {new Date().getFullYear()} Derechos reservados</p>
    </footer>
  );
};

export default Footer;
