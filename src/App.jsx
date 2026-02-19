import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mountain, Flower, Droplet, Coffee } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const images = {
    hero: "/images/portada.jpg",       
    filosofia: "/images/filosofia.jpg", 
    marinaCover: "/images/marina.jpg",  
    productDefault: "/images/default.png" // Cambiado a .png por seguridad
  };

  // --- NUEVA BASE DE DATOS DESDE EXCEL ---
  const coffeeData = [
    // MARINA RIVASPLATA
    { id: 1, name: "Obata", category: "marina", profile: "Cacao suave, azúcar rubia, chocolate con leche.", score: 82, price: 14, altitude: "2200", process: "Semi Lavado", acidity: "Media", body: "Medio", detail: "Un varietal robusto y confiable. Notas dulces muy limpias.", imageName: "obata" },
    { id: 2, name: "Geisha L12", category: "marina", profile: "Miel clara, jazmín suave, cacao muy fino.", score: 85, price: 18, altitude: "2200", process: "Lavado", acidity: "Media", body: "Sedoso", detail: "Perfil elegante. La nota de jazmín es inconfundible, genetica de costa rica", imageName: "geisha l12" },
    { id: 3, name: "Red Bourbon", category: "marina", profile: "Frutal y jugoso, durazno, mandarina", score: 86, price: 18, altitude: "2200", process: "Semi Lavado", acidity: "Jugosa", body: "Medio", detail: "Un bourbon rojo de altura, ideal para filtrados o tolvas especiales", imageName: "bourbon" },
    { id: 4, name: "Geisha L25", category: "marina", profile: "Frutal maduras, manzana, ciruelas", score: 87, price: 18, altitude: "2200", process: "Semi Lavado", acidity: "Jugosa", body: "Medio", detail: "Geisha con genetica de costa rica, muy frutal y dulce", imageName: "geisha l25" },
    { id: 5, name: "Geisha L42", category: "marina", profile: "Una combinacion unica de notas florales y frutales", score: 89, price: 20, altitude: "2200", process: "Semi Lavado", acidity: "Brillante", body: "Medio", detail: "Geisha exotico, donde combina notas florales y frutales.", imageName: "geisha l42" },
    { id: 6, name: "Geisha L13", category: "marina", profile: "Flores muy marcadas, earl grey, delicado", score: 87, price: 18, altitude: "2200", process: "Lavado", acidity: "Brillante", body: "Sedoso", detail: "Elegancia en su maximo explendor", imageName: "geisha l13" },
    
    // FINCA CHURUPAMPA
    { id: 7, name: "Regional Caracolillo", category: "churupampa", profile: "Chocolate con leche, almendras", score: 83, price: 14, altitude: "1400", process: "Lavado", acidity: "Media", body: "Alto", detail: "Seleccionado a mano por mujeres", imageName: "caracolillo" },
    { id: 8, name: "Erlan Peralta", category: "churupampa", profile: "Frutas rojas, manzana", score: 85, price: 18, altitude: "1850", process: "Natural", acidity: "Jugosa", body: "Alto", detail: "Nano lote de reconocido productor", imageName: "erlan" },
    { id: 9, name: "Funky", category: "churupampa", profile: "Fragancia de frutilla muy marcada, en boca chocolate con leche", score: 85, price: 15, altitude: "1800", process: "Natural", acidity: "Media", body: "Alto", detail: "Resultado de un lote experimental", imageName: "funky" },
    { id: 10, name: "Graciela Espinoza", category: "churupampa", profile: "Muy frutal, mermelada de membrillo", score: 86, price: 17.5, altitude: "1720", process: "Natural", acidity: "Media", body: "Alto", detail: "Un nano lote de una caficultora reconocida por sus procesos naturales", imageName: "Graciela espinoza" },
    { id: 11, name: "Regional Honey", category: "churupampa", profile: "Melaza, naranja, chocolate con leche", score: 83, price: 14, altitude: "1350", process: "Honey", acidity: "Media", body: "Alto", detail: "Honey de batalla, buen precio y calidad", imageName: "Honey" },
    { id: 12, name: "Maragogipe", category: "churupampa", profile: "Notas especiadas, chocolate y elegante", score: 87, price: 19, altitude: "1950", process: "Lavado", acidity: "Brillante", body: "Alto", detail: "Café de concurso. El maragogipe, tambien llamado grano elefante por su gran tamaño", imageName: "maragogipe" },
    { id: 13, name: "Mario Jesus MJ RB39", category: "churupampa", profile: "Datiles, naranja, citrico", score: 86, price: 17, altitude: "1950", process: "Lavado", acidity: "Brillante", body: "Alto", detail: "Café de proceso lavado muy limpio y refrescante.", imageName: "mario jesus mj rb39" },
    { id: 14, name: "Mario Jesus Pariamarca", category: "churupampa", profile: "Mandarina, chocolate con leche", score: 86, price: 17, altitude: "1850/1950", process: "Lavado", acidity: "Brillante", body: "Medio", detail: "Mario jesus selecciono café de su comunidad para beneficiarlo el mismo", imageName: "mario jesus pariamarca" },
    { id: 15, name: "Mario Jesus", category: "churupampa", profile: "Flor de azhar, especiado, citrico", score: 88, price: 19, altitude: "2100", process: "Lavado", acidity: "Jugosa", body: "Alto", detail: "Joya de la cosecha 2025 de mario jesus, nano lote", imageName: "mario jesus" },
    { id: 16, name: "Regional Selva", category: "churupampa", profile: "Chocolate, nuez, caramelo.", score: 82, price: 12.5, altitude: "1400/1800", process: "Lavado", acidity: "Media", body: "Medio", detail: "Caballo de batalla, un suave lavado personalizado especialmente para Argentina", imageName: "selva" },
    
    // SELECCIÓN PRODUCTOR
    { id: 17, name: "Campos Sebastian", category: "productor", profile: "Frutos secos, vainilla leve, galleta.", score: 83.5, price: 13.5, altitude: "1650", process: "Lavado", acidity: "Media", body: "Medio", detail: "Lote de la finca de Campos sebastian, procesado por finca churupampa", imageName: "campos sebastian" },
    { id: 18, name: "Garcia Ojeda Nolvir", category: "productor", profile: "Chocolate, caramelo, suave", score: 82.75, price: 13.5, altitude: "1720", process: "Lavado", acidity: "Media", body: "Medio", detail: "Lote de la finca de garcia ojeda, procesado por finca churupampa", imageName: "garcia ojeda nolvir" },
    { id: 19, name: "Juan Florentino", category: "productor", profile: "Nuez, vainilla, chocolate oscuro.", score: 82.5, price: 13.5, altitude: "1450", process: "Lavado", acidity: "Media", body: "Medio", detail: "Lote de la finca de juan florentino, procesado por finca churupampa", imageName: "juan florentino" },
    { id: 20, name: "Luz Maritsa", category: "productor", profile: "Cítrico, lima, azúcar morena.", score: 83, price: 13.5, altitude: "1685", process: "Lavado", acidity: "Media", body: "Medio", detail: "Lote de la finca de luz maritsa, procesado por finca churupampa", imageName: "luz maritsa" },
    { id: 21, name: "Bobadilla Vidarte Maria Teresa", category: "productor", profile: "Caramelo, mantequilla, suave.", score: 82.5, price: 13.5, altitude: "1550", process: "Lavado", acidity: "Media", body: "Medio", detail: "Lote de la finca de maria teresa, procesado por finca churupampa", imageName: "maria teresa" },
    { id: 22, name: "Rufasto Elias", category: "productor", profile: "Toffee, nuez moscada, cacao.", score: 82.25, price: 13.5, altitude: "1490", process: "Lavado", acidity: "Media", body: "Medio", detail: "Lote de la finca de rufasto elias, procesado por finca churupampa", imageName: "rufasto elias" },
    { id: 23, name: "Ruiz De Garcia Julia", category: "productor", profile: "Cereal dulce, malta, vainilla.", score: 83, price: 13.5, altitude: "1630", process: "Lavado", acidity: "Media", body: "Medio", detail: "Lote de la finca de ruiz de garcia julia, procesado por finca churupampa", imageName: "ruiz de garcia julia" },
    { id: 24, name: "Silva Cubas", category: "productor", profile: "Cacao amargo, chocolate, almendra.", score: 82.5, price: 13.5, altitude: "1580", process: "Lavado", acidity: "Media", body: "Medio", detail: "Lote de la finca de silva cubas, procesado por finca churupampa", imageName: "silva cubas" }
  ];

  // --- FUNCIÓN DE IMÁGENES (.PNG DINÁMICO) ---
  const getCardImage = (imageName) => {
    return `/images/${imageName}.png`;
  };

  const handleImageError = (e) => {
    if (!e.target.src.includes('default.png')) {
        e.target.src = "/images/default.png";
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = activeTab === 'all' 
    ? coffeeData 
    : coffeeData.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1A1A] font-sans selection:bg-[#E5DACE] overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className={`fixed w-full z-[100] transition-all duration-700 px-6 md:px-12 py-6 ${
        scrolled ? 'bg-white/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 z-50">
            <span className="text-xl md:text-2xl font-serif tracking-[0.15em] uppercase italic font-bold">Andino Sur</span>
          </a>
          
          <div className="hidden lg:flex space-x-12 text-[11px] uppercase tracking-[0.25em] font-medium text-stone-600">
            <a href="#filosofia" className="hover:text-black transition-colors">Filosofía</a>
            <a href="#marina" className="hover:
