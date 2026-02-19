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
            <a href="#marina" className="hover:text-black transition-colors font-bold text-[#C5A059]">Marina Rivasplata</a>
            <a href="#catalogo" className="hover:text-black transition-colors">Catálogo</a>
            <a href="#contacto" className="hover:text-black transition-colors">Contacto</a>
          </div>

          <button className="lg:hidden z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen min-h-[700px] flex flex-col justify-center items-center px-6 overflow-hidden bg-[#E5E2DD]">
        <img 
          src={images.hero} 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.85] opacity-90 scale-105 animate-in fade-in duration-1000" 
          alt="Andes Peruanos" 
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
        
        <div className="relative z-10 text-center max-w-4xl text-white">
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.5em] mb-8 font-medium animate-in slide-in-from-bottom-4 duration-700 delay-100">
            Importadores de Café Verde — Argentina
          </h2>
          <h1 className="text-7xl md:text-[10rem] font-serif italic leading-[0.9] mb-10 tracking-tighter animate-in slide-in-from-bottom-8 duration-700 delay-300">
            Pureza Andina
          </h1>
          <p className="text-sm md:text-lg max-w-xl mx-auto leading-relaxed font-light mb-12 tracking-wide opacity-90 animate-in slide-in-from-bottom-8 duration-700 delay-500">
            Conectamos los terruños más remotos de Perú con los tostadores más exigentes. Trazabilidad absoluta, microlotes únicos.
          </p>
          <div className="animate-in fade-in duration-1000 delay-700">
            <a href="#catalogo" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] border border-white/40 bg-white/10 backdrop-blur-sm px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500">
              Explorar Catálogo <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* --- FILOSOFÍA --- */}
      <section id="filosofia" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="aspect-[3/4] overflow-hidden rounded-[2rem] shadow-xl">
               <img 
                src={images.filosofia} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                alt="Productor" 
                onError={handleImageError}
               />
            </div>
            <div className="absolute -bottom-10 -right-4 md:-right-10 bg-[#FAF9F6] p-8 md:p-10 rounded-tl-[2rem] rounded-br-[2rem] max-w-xs shadow-2xl border border-stone-100">
              <p className="font-serif italic text-xl md:text-2xl mb-4 leading-tight text-stone-800">
                "Nuestra relación es con las personas, no solo con el grano."
              </p>
              <div className="h-[1px] w-12 bg-[#C5A059] mb-2"></div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500">Productores de Cajamarca</span>
            </div>
          </div>
          
          <div className="md:pl-10">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">Nuestra Tierra</span>
              <div className="h-[1px] w-20 bg-stone-200"></div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-[1.1] text-stone-900">
              Custodios del origen desde los 1,800 msnm.
            </h2>
            
            <div className="space-y-6 text-stone-600 font-light text-lg leading-relaxed">
              <p>
                Viajamos a Cajamarca, Amazonas y Cusco para seleccionar lotes que no solo puntúan alto en cata, sino que cuentan una historia de esfuerzo y tradición. 
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATÁLOGO --- */}
      <section id="catalogo" className="py-32 px-6 md:px-12 bg-[#FAF9F6]">
        <div className="max-w-[1440px] mx-auto">
          {/* Header del Catálogo */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-stone-200 pb-8 gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif italic text-stone-900 mb-4">La Colección</h2>
              <p className="text-stone-500 text-sm tracking-wide max-w-md">
                Microlotes seleccionados. Cada tarjeta es una ventana a la finca de origen.
              </p>
            </div>
            
            {/* Filtros Actualizados */}
            <div className="flex flex-wrap gap-8">
              <button onClick={() => setActiveTab('all')} className={`text-[10px] uppercase tracking-[0.25em] pb-3 transition-all relative ${activeTab === 'all' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'}`}>
                Todos
                {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"></span>}
              </button>
              <button onClick={() => setActiveTab('marina')} className={`text-[10px] uppercase tracking-[0.25em] pb-3 transition-all relative ${activeTab === 'marina' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'}`}>
                Marina Rivasplata
                {activeTab === 'marina' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"></span>}
              </button>
              <button onClick={() => setActiveTab('churupampa')} className={`text-[10px] uppercase tracking-[0.25em] pb-3 transition-all relative ${activeTab === 'churupampa' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'}`}>
                Finca Churupampa
                {activeTab === 'churupampa' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"></span>}
              </button>
              <button onClick={() => setActiveTab('productor')} className={`text-[10px] uppercase tracking-[0.25em] pb-3 transition-all relative ${activeTab === 'productor' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'}`}>
                Selección Productor
                {activeTab === 'productor' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"></span>}
              </button>
            </div>
          </div>

          {/* Grid de Productos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredItems.map((coffee) => (
              <div 
                key={coffee.id}
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedProduct(coffee)}
              >
                <div className="relative aspect-[4/5] bg-[#EFECE8] rounded-xl overflow-hidden mb-6 shadow-sm">
                  <img 
                    src={getCardImage(coffee.imageName)} 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s]" 
                    alt={coffee.name}
                    loading="lazy"
                    onError={handleImageError}
                  />
                  
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur text-[9px] uppercase tracking-widest px-3 py-1 rounded-sm font-bold shadow-sm">
                      SCA {coffee.score}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Ver Ficha
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-serif leading-none group-hover:italic transition-all duration-300">
                      {coffee.name}
                    </h3>
                    <span className="font-serif italic text-base">U$D {coffee.price}</span>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-2">
                    {coffee.category === 'marina' ? 'Marina Rivasplata' : coffee.category === 'churupampa' ? 'Finca Churupampa' : 'Selección Productor'}
                  </p>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-light">
                    {coffee.profile}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contacto" className="bg-white border-t border-stone-100 pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-3xl font-serif italic mb-6">Andino Sur</h2>
              <p className="text-stone-500 text-sm font-light max-w-sm leading-relaxed mb-8">
                Especialistas en café verde peruano. Un puente transparente entre la riqueza de los Andes y la cultura cafetera argentina.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-8 text-stone-900">Contacto</h4>
              <ul className="space-y-4 text-sm text-stone-600 font-light">
                <li>Buenos Aires, Argentina</li>
                <li className="font-medium text-black">ventas@andinosur.coffee</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-100 pt-8 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.2em] text-stone-400">
            <p>© 2024 Andino Sur. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* --- PRODUCT MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-[#FAF9F6]/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          ></div>
          
          <div className="relative bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 max-h-[90vh] md:max-h-auto overflow-y-auto">
            <button 
              className="absolute top-6 right-6 z-20 p-2 hover:bg-stone-100 rounded-full transition-colors"
              onClick={() => setSelectedProduct(null)}
            >
              <X size={24} />
            </button>

            {/* Imagen Modal */}
            <div className="md:w-5/12 bg-[#F2F0ED] relative min-h-[300px]">
              <img 
                src={getCardImage(selectedProduct.imageName)} 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" 
                alt={selectedProduct.name}
                onError={handleImageError}
              />
            </div>

            {/* Info Modal */}
            <div className="md:w-7/12 p-10 md:p-16 flex flex-col justify-center">
              <span className={`text-[9px] uppercase tracking-[0.3em] font-bold mb-6 inline-block w-fit px-3 py-1 rounded-full ${
                selectedProduct.category === 'marina' ? 'bg-[#111] text-white' : 'bg-[#E5E2DD] text-stone-600'
              }`}>
                {selectedProduct.category === 'marina' ? 'Marina Rivasplata' : selectedProduct.category === 'churupampa' ? 'Finca Churupampa' : 'Selección Productor'}
              </span>

              <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-none text-stone-900">
                {selectedProduct.name}
              </h2>

              <div className="grid grid-cols-2 gap-8 mb-8 border-b border-stone-100 pb-8">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-2">Puntaje SCA</p>
                  <p className="text-3xl font-serif text-stone-900">{selectedProduct.score}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 mb-2">Precio / Kg</p>
                  <p className="text-3xl font-serif text-stone-900 italic">U$D {selectedProduct.price}</p>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 mb-2">Perfil de Taza</h4>
                  <p className="text-stone-600 italic leading-relaxed text-lg">"{selectedProduct.profile}"</p>
                </div>
                
                {/* Nueva Cuadrícula de 4 items (Altura y Proceso agregados) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                      <Droplet size={12} /> Acidez
                    </span>
                    <p className="text-sm text-stone-700 capitalize">{selectedProduct.acidity}</p>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                      <Coffee size={12} /> Cuerpo
                    </span>
                    <p className="text-sm text-stone-700 capitalize">{selectedProduct.body}</p>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                      <Mountain size={12} /> Altura
                    </span>
                    <p className="text-sm text-stone-700">{selectedProduct.altitude}m</p>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                      <Flower size={12} /> Proceso
                    </span>
                    <p className="text-sm text-stone-700 capitalize">{selectedProduct.process}</p>
                  </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Detalles del Lote</h4>
                   <p className="text-sm text-stone-500 leading-relaxed font-light">{selectedProduct.detail}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-black text-white text-[10px] uppercase tracking-[0.3em] py-4 rounded-full hover:bg-[#333] transition-all shadow-xl font-bold">
                  Contactar por este lote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
