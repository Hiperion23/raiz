import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] sm:w-[90%] lg:w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Politicas de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/properties"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Propiedades
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Mi cuenta
                </Link>
              </li>
              <li>
                <Link
                  href="/property-dashboard"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Dashboard Propiedad
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com/channel"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
              Información de Contacto
            </h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              LLama al: 941714069
            </p>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Dirección: Plaza de Armas
            </p>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Correo Electronico : infogrupo@raiz.com
            </p>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">
          Copyrigth 2024 Raiz | Todos los derechos reservados
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
