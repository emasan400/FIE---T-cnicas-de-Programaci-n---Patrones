import React, { useState } from 'react';
import { PatternCard } from '../PatternCard';
import { 
  Info, AlertTriangle, CheckCircle, XCircle, FileText, 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  Copy, Scissors, Clipboard, Image, Table as TableIcon, 
  Square, Type, Palette, PaintBucket, BookOpen, Quote, 
  ZoomIn, Grid, Ruler, Eye, Monitor, FilePlus
} from 'lucide-react';
import { NotificationItem } from '../../types';

export const NavigationModule: React.FC = () => {
  // Notifications Logic
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Ribbon Logic
  const [activeTab, setActiveTab] = useState('Inicio');

  const addNotification = (type: NotificationItem['type']) => {
    const id = Math.random().toString(36).substr(2, 9);
    const messages = {
      info: 'Nueva actualización del sistema disponible.',
      success: 'Datos guardados exitosamente.',
      warning: 'Tu sesión está por expirar.',
      error: 'Error al conectar con el servidor.'
    };
    
    setNotifications(prev => [...prev, { id, type, message: messages[type] }]);

    // Auto dismiss
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const dummyContent = [
    "Introducción a la Inteligencia Artificial: Historia y Fundamentos",
    "Metodologías de Investigación Cualitativa en Ciencias Sociales",
    "Análisis de Datos Masivos: Big Data y sus aplicaciones",
    "Ética en la Computación: Privacidad y Seguridad Digital",
    "Desarrollo Web Moderno: React, Vue y Angular comparados",
    "Psicología Cognitiva: Memoria y Aprendizaje Humano",
    "Economía Global: Tendencias de Mercado post-pandemia",
    "Arquitectura de Software: Microservicios vs Monolitos",
    "Diseño Centrado en el Usuario: Principios de UX/UI",
    "Redes Neuronales Convolucionales para Visión por Computadora",
    "Gestión de Proyectos Ágiles con Scrum y Kanban",
    "Historia del Arte: Del Renacimiento al Modernismo",
    "Física Cuántica: Entrelazamiento y Superposición",
    "Biología Molecular: Edición Genética con CRISPR",
    "Literatura Contemporánea: Realismo Mágico Latinoamericano",
    "Cálculo Multivariable: Integrales y Derivadas Parciales",
    "Marketing Digital: SEO y Estrategias de Contenido"
  ];

  // Ribbon Toolbar Components
  const ToolbarButton = ({ icon: Icon, label, large = false }: { icon: any, label: string, large?: boolean }) => (
    <div className={`flex ${large ? 'flex-col items-center justify-center p-2' : 'flex-row items-center p-1'} hover:bg-slate-200 rounded cursor-pointer group transition-colors`}>
      <Icon size={large ? 20 : 16} className="text-slate-700 group-hover:text-black mb-1" />
      <span className={`${large ? 'text-[10px]' : 'text-[11px] ml-2'} text-slate-600 group-hover:text-black whitespace-nowrap`}>{label}</span>
    </div>
  );

  const ToolbarGroup = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="flex flex-col px-3 border-r border-slate-300 items-center justify-start h-full min-w-max">
      <div className="flex gap-1 flex-1 items-center justify-center w-full">
        {children}
      </div>
      <span className="text-[9px] text-slate-400 mt-1 mb-0.5 select-none">{title}</span>
    </div>
  );

  const renderRibbonToolbar = () => {
    switch(activeTab) {
      case 'Inicio':
        return (
          <>
             <ToolbarGroup title="Portapapeles">
                <div className="flex flex-col items-center justify-center p-1 hover:bg-slate-200 rounded cursor-pointer mr-1">
                    <Clipboard size={22} className="text-slate-700" />
                    <span className="text-[10px]">Pegar</span>
                </div>
                <div className="flex flex-col gap-1">
                   <div className="flex items-center p-0.5 hover:bg-slate-200 rounded cursor-pointer"><Scissors size={14} /><span className="text-[10px] ml-1">Cortar</span></div>
                   <div className="flex items-center p-0.5 hover:bg-slate-200 rounded cursor-pointer"><Copy size={14} /><span className="text-[10px] ml-1">Copiar</span></div>
                </div>
             </ToolbarGroup>
             <ToolbarGroup title="Fuente">
                 <div className="flex flex-col gap-1 items-start">
                     <div className="flex gap-1">
                         <div className="bg-white border border-slate-300 text-xs px-2 py-0.5 w-24 flex justify-between items-center cursor-pointer hover:border-indigo-400">Calibri</div>
                         <div className="bg-white border border-slate-300 text-xs px-2 py-0.5 w-10 flex justify-between items-center cursor-pointer hover:border-indigo-400">11</div>
                     </div>
                     <div className="flex gap-0.5">
                         <div className="p-1 hover:bg-slate-200 rounded cursor-pointer"><Bold size={14} /></div>
                         <div className="p-1 hover:bg-slate-200 rounded cursor-pointer"><Italic size={14} /></div>
                         <div className="p-1 hover:bg-slate-200 rounded cursor-pointer"><Underline size={14} /></div>
                         <div className="w-px h-4 bg-slate-300 mx-1"></div>
                         <div className="p-1 hover:bg-slate-200 rounded cursor-pointer"><Type size={14} className="text-red-500" /></div>
                     </div>
                 </div>
             </ToolbarGroup>
             <ToolbarGroup title="Párrafo">
                 <div className="flex flex-col gap-1">
                    <div className="flex gap-0.5">
                       <div className="p-1 hover:bg-slate-200 rounded cursor-pointer bg-slate-200"><AlignLeft size={14} /></div>
                       <div className="p-1 hover:bg-slate-200 rounded cursor-pointer"><AlignCenter size={14} /></div>
                       <div className="p-1 hover:bg-slate-200 rounded cursor-pointer"><AlignRight size={14} /></div>
                    </div>
                 </div>
             </ToolbarGroup>
          </>
        );
      case 'Insertar':
        return (
          <>
            <ToolbarGroup title="Páginas">
                <ToolbarButton icon={FilePlus} label="Portada" large />
                <ToolbarButton icon={FileText} label="En blanco" large />
            </ToolbarGroup>
            <ToolbarGroup title="Tablas">
                <ToolbarButton icon={TableIcon} label="Tabla" large />
            </ToolbarGroup>
            <ToolbarGroup title="Ilustraciones">
                <ToolbarButton icon={Image} label="Imágenes" large />
                <ToolbarButton icon={Square} label="Formas" large />
                <ToolbarButton icon={Monitor} label="Captura" large />
            </ToolbarGroup>
          </>
        );
      case 'Diseño':
        return (
           <>
             <ToolbarGroup title="Formato del documento">
                <div className="flex gap-1">
                   <ToolbarButton icon={Palette} label="Temas" large />
                   <div className="flex flex-col gap-1 justify-center px-2">
                      <div className="w-12 h-8 border bg-white shadow-sm hover:ring-2 ring-indigo-300 cursor-pointer">
                         <div className="h-2 bg-slate-800 w-full mb-1"></div>
                         <div className="h-1 bg-slate-300 w-3/4"></div>
                      </div>
                      <span className="text-[9px] text-center">Básico</span>
                   </div>
                   <div className="flex flex-col gap-1 justify-center px-2">
                      <div className="w-12 h-8 border bg-white shadow-sm hover:ring-2 ring-indigo-300 cursor-pointer">
                         <div className="h-2 bg-indigo-600 w-full mb-1"></div>
                         <div className="h-1 bg-slate-300 w-3/4"></div>
                      </div>
                      <span className="text-[9px] text-center">Elegante</span>
                   </div>
                </div>
             </ToolbarGroup>
             <ToolbarGroup title="Fondo de página">
                 <ToolbarButton icon={Type} label="Marca de agua" />
                 <ToolbarButton icon={PaintBucket} label="Color de página" />
             </ToolbarGroup>
           </>
        );
      case 'Referencias':
        return (
          <>
            <ToolbarGroup title="Tabla de contenido">
               <ToolbarButton icon={BookOpen} label="Tabla de contenido" large />
            </ToolbarGroup>
            <ToolbarGroup title="Citas y bibliografía">
               <ToolbarButton icon={Quote} label="Insertar cita" large />
               <ToolbarButton icon={BookOpen} label="Bibliografía" large />
            </ToolbarGroup>
          </>
        );
      case 'Vista':
        return (
          <>
             <ToolbarGroup title="Vistas">
                <ToolbarButton icon={BookOpen} label="Modo Lectura" large />
                <ToolbarButton icon={FileText} label="Diseño Impresión" large />
             </ToolbarGroup>
             <ToolbarGroup title="Mostrar">
                <div className="flex flex-col gap-1 items-start pl-2">
                   <label className="flex items-center gap-2 text-xs cursor-pointer"><input type="checkbox" defaultChecked /> Regla</label>
                   <label className="flex items-center gap-2 text-xs cursor-pointer"><input type="checkbox" /> Líneas de cuadrícula</label>
                   <label className="flex items-center gap-2 text-xs cursor-pointer"><input type="checkbox" /> Panel de navegación</label>
                </div>
             </ToolbarGroup>
             <ToolbarGroup title="Zoom">
                 <ToolbarButton icon={ZoomIn} label="Zoom" large />
                 <ToolbarButton icon={Eye} label="100%" large />
             </ToolbarGroup>
          </>
        );
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
      
      {/* Notifications Pattern */}
      <PatternCard title="Sistema de Notificaciones (Toasts)">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 mb-4">
            Genera alertas no intrusivas que flotan sobre el contenido.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => addNotification('info')} className="px-3 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium">Info</button>
            <button onClick={() => addNotification('success')} className="px-3 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm font-medium">Success</button>
            <button onClick={() => addNotification('warning')} className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 text-sm font-medium">Warning</button>
            <button onClick={() => addNotification('error')} className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium">Error</button>
          </div>
        </div>

        {/* Notification Container */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
          {notifications.map(n => (
            <div key={n.id} className={`pointer-events-auto p-4 rounded shadow-lg border-l-4 w-72 transform transition-all animate-bounce-in flex items-center gap-3
              ${n.type === 'info' ? 'bg-white border-blue-500' : ''}
              ${n.type === 'success' ? 'bg-white border-green-500' : ''}
              ${n.type === 'warning' ? 'bg-white border-yellow-500' : ''}
              ${n.type === 'error' ? 'bg-white border-red-500' : ''}
            `}>
                 {n.type === 'info' && <Info size={20} className="text-blue-500 shrink-0" />}
                 {n.type === 'success' && <CheckCircle size={20} className="text-green-500 shrink-0" />}
                 {n.type === 'warning' && <AlertTriangle size={20} className="text-yellow-500 shrink-0" />}
                 {n.type === 'error' && <XCircle size={20} className="text-red-500 shrink-0" />}
                 <p className="text-sm text-slate-800 font-medium leading-tight">{n.message}</p>
            </div>
          ))}
        </div>
      </PatternCard>

      {/* Scroll Bar Pattern - Expanded and Realistic */}
      <PatternCard title="Custom Scrollbar & Infinite List">
         <div className="h-96 overflow-y-auto custom-scrollbar border border-slate-200 rounded-lg bg-white relative">
            <div className="sticky top-0 bg-slate-50/95 backdrop-blur-sm p-3 border-b border-slate-200 z-10 shadow-sm">
                <h4 className="font-bold text-slate-800 text-sm">Biblioteca de Publicaciones</h4>
                <p className="text-xs text-slate-500">Mostrando {dummyContent.length} resultados recientes</p>
            </div>
            
            <div className="divide-y divide-slate-100">
              {dummyContent.map((title, i) => (
                <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex gap-3 group cursor-pointer">
                  <div className="w-10 h-12 bg-slate-200 rounded flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-colors shrink-0">
                      <FileText size={20} />
                  </div>
                  <div>
                      <h5 className="text-sm font-semibold text-slate-800 leading-tight mb-1">{title}</h5>
                      <div className="flex gap-2 text-[10px] text-slate-400 uppercase tracking-wide">
                          <span>Vol. {24 + i}</span>
                          <span>•</span>
                          <span>PDF</span>
                          <span>•</span>
                          <span>2024</span>
                      </div>
                  </div>
                </div>
              ))}
              {/* Loader at bottom to simulate infinite scroll */}
              <div className="p-4 flex justify-center">
                  <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
            </div>
         </div>
      </PatternCard>
      
       {/* Menu Bar Demo - Ribbon Style */}
      <PatternCard title="Barra de Menú (Estilo Ribbon Office)" className="md:col-span-2">
         <div className="border border-slate-300 rounded-lg overflow-hidden bg-white shadow-sm flex flex-col h-[500px]">
            
            {/* 1. Title Bar */}
            <div className="bg-academic-900 text-white px-4 py-1.5 flex justify-between items-center text-xs select-none">
               <div className="flex gap-4">
                  <span className="opacity-80 hover:opacity-100 cursor-pointer hidden sm:inline">Autoguardado <span className="font-bold">ON</span></span>
                  <span className="font-semibold text-center mx-auto truncate">Documento Académico - Word Processor</span>
               </div>
               <div className="flex gap-2 shrink-0">
                   <div className="w-3 h-3 border border-white rounded-full opacity-50"></div>
                   <div className="w-3 h-3 border border-white rounded-full opacity-50"></div>
                   <div className="w-3 h-3 bg-red-400 rounded-full opacity-80 hover:opacity-100 cursor-pointer"></div>
               </div>
            </div>

            {/* 2. Tab Bar */}
            <div className="bg-academic-800 text-white px-2 flex text-sm select-none pt-1 overflow-x-auto">
                {['Inicio', 'Insertar', 'Diseño', 'Referencias', 'Vista'].map(tab => (
                    <div 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 md:px-5 py-1.5 rounded-t-md cursor-pointer transition-colors whitespace-nowrap
                            ${activeTab === tab 
                                ? 'bg-slate-100 text-slate-900 font-medium shadow-sm z-10' 
                                : 'text-slate-100 hover:bg-academic-700/50 hover:text-white opacity-90'
                            }`}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* 3. Ribbon Toolbar (Dynamic Content) */}
            <div className="bg-slate-100 border-b border-slate-300 p-1 flex gap-1 shadow-inner h-28 overflow-x-auto select-none custom-scrollbar">
                {renderRibbonToolbar()}
            </div>

            {/* Document Body Area */}
            <div className="flex-1 bg-slate-200 p-4 md:p-8 overflow-y-auto flex justify-center custom-scrollbar">
               <div className="bg-white shadow-xl w-full max-w-3xl min-h-[600px] p-6 md:p-12">
                   <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-900">Análisis de Interfaces de Usuario</h1>
                   <p className="text-sm md:text-base text-slate-800 leading-relaxed mb-6 text-justify">
                       La evolución de las interfaces gráficas ha llevado a la estandarización de patrones como la 
                       <span className="font-bold"> Cinta de Opciones (Ribbon)</span>. Este patrón, popularizado por suites de oficina, 
                       organiza herramientas complejas en pestañas lógicas, mejorando la descubribilidad de las funciones.
                   </p>
                   <h2 className="text-lg md:text-xl font-semibold mb-3 text-slate-800">1. Principios de Diseño</h2>
                   <p className="text-sm md:text-base text-slate-800 leading-relaxed mb-4 text-justify">
                       Al diseñar sistemas de navegación complejos, es crucial agrupar elementos relacionados. 
                       Por ejemplo, las herramientas de formato de texto deben estar separadas de las herramientas de inserción de objetos.
                   </p>
                   <div className="p-4 bg-slate-50 border-l-4 border-academic-500 italic text-slate-600 mb-6 text-sm">
                       "El buen diseño es obvio. El gran diseño es transparente." — Joe Sparano
                   </div>
                   <p className="text-sm md:text-base text-slate-800 leading-relaxed text-justify">
                       Este editor simula dicha experiencia, permitiendo al usuario interactuar con las pestañas superiores 
                       para revelar diferentes conjuntos de herramientas contextuales.
                   </p>
               </div>
            </div>

         </div>
      </PatternCard>

    </div>
  );
};