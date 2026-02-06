import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Instagram, Mail, FileText, ChevronRight, Award, MapPin, Coffee, Droplet, Mountain, Flower } from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // --- CONFIGURACIÓN DE IMÁGENES LOCALES ---
  // IMPORTANTE: Debes crear una carpeta llamada "images" dentro de la carpeta "public"
  // y guardar tus fotos con estos nombres exactos (en formato .jpg):
  
  const images = {
    hero: "/images/portada.jpg",       // Tu imagen principal grande
    filosofia: "/images/filosofia.jpg", // Foto del productor/origen
    marinaCover: "/images/marina.jpg",  // Foto textura o círculo de Marina
    productDefault: "/images/default.jpg" // Imagen por defecto si falta alguna
  };

  // --- DATOS COMPLETOS (26 LOTES) ---
  const coffeeData = [
    // MARINA (1-4)
    { id: 1, name: "Obata Semi Lavado", category: "marina", profile: "Cacao suave, azúcar rubia, chocolate con leche.", score: 81.5, price: 13, stock: "368 kg", acidity: "Media, redonda", body: "Medio", detail: "Un varietal robusto y confiable. Notas dulces muy limpias." },
    { id: 2, name: "Marina Geisha L39", category: "marina", profile: "Azúcar rubia, cacao fino, cereal dulce.", score: 83.25, price: 14, stock: "366 Kg.", acidity: "Media-alta, limpia", body: "Medio", detail: "Lavado clásico. Un Geisha accesible con estructura ordenada." },
    { id: 3, name: "Marina Geisha L12", category: "marina", profile: "Miel clara, jazmín suave, cacao muy fino.", score: 84.5, price: 16, stock: "115 Kg.", acidity: "Brillante", body: "Medio-sedoso", detail: "Perfil elegante. La nota de jazmín es inconfundible." },
    { id: 4, name: "Marina Geisha L25", category: "marina", profile: "Maracuyá maduro, flor tropical, miel.", score: 87.75, price: 19, stock: "359 Kg.", acidity: "Alta, jugosa", body: "Sedoso", detail: "La joya de la corona. Explosión tropical vibrante." },
    
    // TRATO DIRECTO (Simulados basados en perfil Cajamarca 5-17 para completar 26)
    { id: 5, name: "Finca El Cedro - Lote 1", category: "directo", profile: "Nuez, vainilla, chocolate oscuro.", score: 82.5, price: 13.5, stock: "600 kg", acidity: "Media", body: "Cremoso", detail: "Clásico perfil de Jaén, muy consistente para espresso." },
    { id: 6, name: "Finca El Mirador", category: "directo", profile: "Fruta roja, caramelo, cítrico suave.", score: 83, price: 13.75, stock: "450 kg", acidity: "Media-Alta", body: "Medio", detail: "Cosecha de altura con notas a ciruela madura." },
    { id: 7, name: "Lote Las Nubes", category: "directo", profile: "Manzana verde, panela, té negro.", score: 82, price: 13.25, stock: "580 kg", acidity: "Brillante", body: "Ligero", detail: "Café de proceso lavado muy limpio y refrescante." },
    { id: 8, name: "Coop. Valle Sagrado", category: "directo", profile: "Almendra tostada, cacao, especias.", score: 81.75, price: 13, stock: "700 kg", acidity: "Baja", body: "Alto", detail: "Ideal para quienes buscan cuerpo e intensidad." },
    { id: 9, name: "Finca La Palma", category: "directo", profile: "Floral, miel de abeja, durazno.", score: 84, price: 14.5, stock: "300 kg", acidity: "Media", body: "Sedoso", detail: "Microlote seleccionado por su elegancia floral." },
    { id: 10, name: "Lote San Ignacio", category: "directo", profile: "Chocolate con leche, avellana.", score: 82, price: 13.5, stock: "620 kg", acidity: "Media", body: "Redondo", detail: "Balance perfecto, dulzor alto." },
    { id: 11, name: "Finca Los Pinos", category: "directo", profile: "Cítrico, lima, azúcar morena.", score: 83.5, price: 14, stock: "400 kg", acidity: "Alta", body: "Medio", detail: "Acidez vibrante característica de la zona alta." },
    { id: 12, name: "Lote Amazonas", category: "directo", profile: "Frutos secos, madera noble, cacao.", score: 81.5, price: 13, stock: "650 kg", acidity: "Baja", body: "Medio", detail: "Perfil maderoso y especiado, muy exótico." },
    { id: 13, name: "Finca Santa Rosa", category: "directo", profile: "Caramelo, mantequilla, suave.", score: 82.25, price: 13.5, stock: "550 kg", acidity: "Media", body: "Cremoso", detail: "Notas lácticas muy agradables al paladar." },
    { id: 14, name: "Lote El Huabo", category: "directo", profile: "Uva pasa, vino suave, chocolate.", score: 83, price: 13.75, stock: "480 kg", acidity: "Vínica", body: "Medio", detail: "Proceso con fermentación prolongada controlada." },
    { id: 15, name: "Finca La Esperanza", category: "directo", profile: "Cereal dulce, malta, vainilla.", score: 81.75, price: 13.25, stock: "600 kg", acidity: "Baja", body: "Medio", detail: "Muy dulce y reconfortante, baja acidez." },
    { id: 16, name: "Lote Colasay", category: "directo", profile: "Hierba luisa, limón, té verde.", score: 83.5, price: 14, stock: "350 kg", acidity: "Media-Alta", body: "Ligero", detail: "Perfil herbal y cítrico muy refrescante." },
    { id: 17, name: "Finca El Porvenir", category: "directo", profile: "Toffee, nuez moscada, cacao.", score: 82.5, price: 13.5, stock: "500 kg", acidity: "Media", body: "Redondo", detail: "Especiado y dulce, final prolongado." },

    // TRATO DIRECTO (Datos reales del snippet 18-23 + simulados finales)
    { id: 18, name: "María Elena Vásquez", category: "directo", profile: "Panela, nuez, cereal tostado.", score: 82, price: 13.5, stock: "620 kg", acidity: "Media, redonda", body: "Medio", detail: "Final balanceado, sin asperezas." },
    { id: 19, name: "José Luis Ramírez", category: "directo", profile: "Cacao amargo, chocolate, almendra.", score: 83, price: 13.75, stock: "680 kg", acidity: "Media baja", body: "Medio-alto", detail: "Final persistente y seco." },
    { id: 20, name: "Rosa Milagros Castillo", category: "directo", profile: "Azúcar rubia, cacao, dulce de leche.", score: 82.75, price: 13.75, stock: "650 kg", acidity: "Media", body: "Medio", detail: "Final redondo y estable." },
    { id: 21, name: "Pedro Antonio Cruz", category: "directo", profile: "Frutos secos, vainilla leve, galleta.", score: 82, price: 13.5, stock: "630 kg", acidity: "Media baja", body: "Medio", detail: "Final limpio y dulce." },
    { id: 22, name: "Ana Lucía Pérez", category: "directo", profile: "Cacao, cereal, chocolate leche.", score: 82.25, price: 13.75, stock: "660 kg", acidity: "Media", body: "Medio", detail: "Clásico, fácil de beber." },
    { id: 23, name: "Miguel Ángel Flores", category: "directo", profile: "Panela ligera, azúcar tostada.", score: 83, price: 13.5, stock: "640 kg", acidity: "Media baja", body: "Medio", detail: "Final suave y corto." },
    { id: 24, name: "Juana Martínez", category: "directo", profile: "Floral blanco, lima, caña.", score: 84.25, price: 14.5, stock: "200 kg", acidity: "Brillante", body: "Delicado", detail: "Microlote de alta complejidad." },
    { id: 25, name: "Carlos Quispe", category: "directo", profile: "Fruta negra, mora, cacao.", score: 83.5, price: 14, stock: "320 kg", acidity: "Jugosa", body: "Medio", detail: "Notas a frutos del bosque muy marcadas." },
    { id: 26, name: "Lote Final Cajamarca", category: "directo", profile: "Chocolate, nuez, caramelo.", score: 82, price: 13, stock: "800 kg", acidity: "Media", body: "Medio", detail: "El perfil clásico de la región, muy versátil." },
  ];

  // --- FUNCIÓN DE IMÁGENES POR TARJETA (Ruta Local) ---
  const getCardImage = (id) => {
    // El código buscará automáticamente la imagen "lote-1.jpg", "lote-2.jpg", etc.
    // en la carpeta public/images/
    return `/images/lote-${id}.jpg`;
  };

  // Manejador de error por si no has subido la foto todavía
  const handleImageError = (e) => {
    e.target.src = "/images/default.jpg"; // Carga una por defecto si falla
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
            <a href="#marina" className="hover:text-black transition-colors font-bold text-[#C5A059]">Proyecto Marina</a>
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
            Conectamos los terruños más remotos de Perú con los tostadores más exigentes. Trazabilidad absoluta, 26 microlotes únicos.
          </p>
          <div className="animate-in fade-in duration-1000 delay-700">
            <a href="#catalogo" className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] border border-white/40 bg-white/10 backdrop-blur-sm px-10 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-500">
              Explorar los 26 Lotes <ArrowRight size={14} />
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
              <p>
                Cada imagen en nuestro catálogo representa la biodiversidad de la finca de donde proviene tu café: desde la fauna local hasta la niebla de la mañana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROYECTO MARINA --- */}
      <section id="marina" className="bg-[#111111] text-[#FAF9F6] py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1A1A1A] hidden lg:block"></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-3 border border-[#C5A059] text-[#C5A059] px-4 py-2 rounded-full mb-10">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Oportunidad Estratégica</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-serif italic mb-8 leading-none">
              Cosecha Completa:<br />
              <span className="opacity-50">Finca Marina</span>
            </h2>
            
            <p className="text-lg md:text-xl text-stone-400 leading-relaxed mb-10 font-light max-w-lg">
              Hemos adquirido la producción total de Finca Marina. Al consolidar toda la cosecha, ofrecemos varietales Geisha a precios competitivos.
            </p>

            <button 
              onClick={() => {
                setActiveTab('marina');
                document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
              }}
              className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#C5A059] transition-colors"
            >
              Ver Lotes Marina <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="lg:w-1/2 w-full">
             <div className="aspect-square rounded-full overflow-hidden border-[1px] border-white/10 p-4">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                   <img 
                    src={images.marinaCover} 
                    className="w-full h-full object-cover grayscale-[50%] hover:grayscale-0 transition-all duration-1000" 
                    alt="Marina Harvest" 
                    onError={handleImageError}
                   />
                </div>
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
                26 Lotes únicos. Cada tarjeta es una ventana a la finca de origen.
              </p>
            </div>
            
            {/* Filtros */}
            <div className="flex flex-wrap gap-8">
              <button onClick={() => setActiveTab('all')} className={`text-[10px] uppercase tracking-[0.25em] pb-3 transition-all relative ${activeTab === 'all' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'}`}>
                Todos
                {activeTab === 'all' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"></span>}
              </button>
              <button onClick={() => setActiveTab('marina')} className={`text-[10px] uppercase tracking-[0.25em] pb-3 transition-all relative ${activeTab === 'marina' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'}`}>
                Finca Marina
                {activeTab === 'marina' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"></span>}
              </button>
              <button onClick={() => setActiveTab('directo')} className={`text-[10px] uppercase tracking-[0.25em] pb-3 transition-all relative ${activeTab === 'directo' ? 'text-stone-900 font-bold' : 'text-stone-400 hover:text-stone-600'}`}>
                Trato Directo
                {activeTab === 'directo' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"></span>}
              </button>
            </div>
          </div>

          {/* Grid de Productos (26 Items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredItems.map((coffee) => (
              <div 
                key={coffee.id}
                className="group cursor-pointer flex flex-col"
                onClick={() => setSelectedProduct(coffee)}
              >
                {/* Imagen Producto con ID único */}
                <div className="relative aspect-[4/5] bg-[#EFECE8] rounded-xl overflow-hidden mb-6 shadow-sm">
                  <img 
                    src={getCardImage(coffee.id)} 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.5s]" 
                    alt={coffee.name}
                    loading="lazy"
                    onError={handleImageError}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur text-[9px] uppercase tracking-widest px-3 py-1 rounded-sm font-bold shadow-sm">
                      SCA {coffee.score}
                    </span>
                    {coffee.category === 'marina' && coffee.name.includes('Geisha') && (
                      <span className="bg-[#C5A059] text-white text-[9px] uppercase tracking-widest px-3 py-1 rounded-sm font-bold shadow-sm">
                        Geisha
                      </span>
                    )}
                  </div>

                  {/* Icono temático basado en el ID para variedad visual */}
                  <div className="absolute bottom-4 right-4 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {coffee.id % 3 === 0 ? <Mountain size={20} /> : coffee.id % 2 === 0 ? <Flower size={20} /> : <Coffee size={20} />}
                  </div>

                  {/* Hover Action */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Ver Ficha
                    </span>
                  </div>
                </div>

                {/* Info Producto */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-lg font-serif leading-none group-hover:italic transition-all duration-300">
                      {coffee.name}
                    </h3>
                    <span className="font-serif italic text-base">U$D {coffee.price}</span>
                  </div>
                  <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-2">
                    {coffee.category === 'marina' ? 'Proyecto Marina' : 'Microlote Autor'}
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
                <li>+54 11 0000 0000</li>
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
                src={getCardImage(selectedProduct.id)} 
                className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" 
                alt={selectedProduct.name}
                onError={handleImageError}
              />
              <div className="absolute bottom-8 left-8 text-white drop-shadow-md">
                <p className="text-[10px] uppercase tracking-[0.4em] mb-2 opacity-80">Lote ID</p>
                <p className="text-4xl font-serif italic">{String(selectedProduct.id).padStart(3, '0')}</p>
              </div>
            </div>

            {/* Info Modal */}
            <div className="md:w-7/12 p-10 md:p-16 flex flex-col justify-center">
              <span className={`text-[9px] uppercase tracking-[0.3em] font-bold mb-6 inline-block w-fit px-3 py-1 rounded-full ${
                selectedProduct.category === 'marina' ? 'bg-[#111] text-white' : 'bg-[#E5E2DD] text-stone-600'
              }`}>
                {selectedProduct.category === 'marina' ? 'Cosecha Completa Marina' : 'Microlote Trato Directo'}
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
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                      <Droplet size={12} /> Acidez
                    </span>
                    <p className="text-sm text-stone-700">{selectedProduct.acidity}</p>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                      <Coffee size={12} /> Cuerpo
                    </span>
                    <p className="text-sm text-stone-700">{selectedProduct.body}</p>
                  </div>
                </div>

                <div>
                   <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Detalles del Lote</h4>
                   <p className="text-sm text-stone-500 leading-relaxed font-light">{selectedProduct.detail}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-black text-white text-[10px] uppercase tracking-[0.3em] py-4 rounded-full hover:bg-[#333] transition-all shadow-xl font-bold">
                  Reservar Lote
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