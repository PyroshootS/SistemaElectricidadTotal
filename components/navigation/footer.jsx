"use client";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export default function Footer() {

    const DateYear = new Date().getFullYear();
    return (
        <footer className="bg-main-color text-white py-10 mt-16">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between">

                {/* Información de Contacto */}
                <div className="mb-8 md:mb-0 flex flex-col">
                    <h2 className="text-3xl font-bold mb-4 border-b border-gray-600 pb-2">Contacto</h2>
                    <p className="flex items-center mb-3 text-lg">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-yellow-400 text-xl mr-3" />
                        Atenas ALajuela Costa Rica
                    </p>
                    <p className="flex items-center mb-3 text-lg">
                        <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-xl mr-3" />
                        contacto@example.com
                    </p>
                    <p className="flex items-center text-lg">
                        <FontAwesomeIcon icon={faPhone} className="text-green-400 text-xl mr-3" />
                        +506 8823 4213
                    </p>
                </div>


                <div className="mb-8 md:mb-0">
                    <h2 className="text-3xl font-bold mb-4 border-b border-gray-600 pb-2">Navegación</h2>
                    <ul className="space-y-2">
                        <li><Link href="/" className="hover:underline hover:text-yellow-400 transition">Home</Link></li>
                        <li><Link href="/portal-clientes" className="hover:underline hover:text-yellow-400 transition">Portal Clientes</Link></li>
                        <li><Link href="/citas" className="hover:underline hover:text-yellow-400 transition">Citas</Link></li>
                        <li><Link href="/contacto" className="hover:underline hover:text-yellow-400 transition">Contacto</Link></li>
                    </ul>
                </div>


                <div className="flex flex-col items-center md:items-end">
                    <h2 className="text-3xl font-bold mb-4 border-b border-gray-600 pb-2">Síguenos</h2>
                    <div className="flex space-x-4">
                        <Link href="#" className="text-blue-600 hover:text-blue-700 transition">
                            <FontAwesomeIcon icon={faFacebookF} className="text-3xl" />
                        </Link>
                        <Link href="#" className="text-blue-400 hover:text-blue-500 transition">
                            <FontAwesomeIcon icon={faTwitter} className="text-3xl" />
                        </Link>
                        <Link href="#" className="text-pink-500 hover:text-pink-600 transition">
                            <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 py-4 mt-8">
                <p className="text-center text-sm">© {DateYear} Todos los derechos reservados. Electricidad Total.</p>
            </div>
        </footer>
    );
}