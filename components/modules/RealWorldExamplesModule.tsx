import React from 'react';
import { PatternCard } from '../PatternCard';
import { PlayCircle, Grid, Music, Layout, MessageCircle, ShoppingBag, Briefcase, Video } from 'lucide-react';

interface AppExample {
  name: string;
  category: string;
  icon: any;
  patterns: string[];
  image: string;
  description: string;
}

const EXAMPLES: AppExample[] = [
  {
    name: 'Netflix',
    category: 'Entretenimiento',
    icon: PlayCircle,
    patterns: ['Carrusel Infinito', 'Lazy Loading', 'Reproducción Automática', 'Hero Banner'],
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1000&auto=format&fit=crop',
    description: 'Usa carruseles horizontales para navegar grandes catálogos sin abrumar al usuario.'
  },
  {
    name: 'Microsoft Excel',
    category: 'Productividad',
    icon: Grid,
    patterns: ['Data Grid', 'Ribbon Menu', 'Formula Bar', 'Pestañas (Tabs)'],
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1000&auto=format&fit=crop',
    description: 'El estándar de oro para la manipulación de datos densos mediante celdas y fórmulas.'
  },
  {
    name: 'Spotify',
    category: 'Música / Streaming',
    icon: Music,
    patterns: ['Barra Lateral Fija', 'Reproductor Persistente', 'Listas Infinitas', 'Drag & Drop (Playlists)'],
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1000&auto=format&fit=crop',
    description: 'Mantiene la navegación principal a la izquierda y el control de medios siempre visible abajo.'
  },
  {
    name: 'YouTube',
    category: 'Video Social',
    icon: Video,
    patterns: ['Grid Layout', 'Infinite Scroll', 'Comments Section', 'Modo Teatro'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    description: 'Utiliza desplazamiento infinito para mantener al usuario consumiendo contenido continuamente.'
  },
  {
    name: 'Jira / Trello',
    category: 'Gestión de Proyectos',
    icon: Briefcase,
    patterns: ['Kanban Board', 'Drag & Drop', 'Modal de Detalles', 'Filtros Avanzados'],
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
    description: 'Permite mover tareas visualmente entre estados mediante arrastrar y soltar.'
  },
  {
    name: 'WhatsApp / Telegram',
    category: 'Mensajería',
    icon: MessageCircle,
    patterns: ['Lista de Chats', 'Burbujas de Mensaje', 'Indicadores de Estado', 'Adjuntar Archivos'],
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1000&auto=format&fit=crop',
    description: 'Interfaz optimizada para la lectura rápida y la entrada de texto en tiempo real.'
  }
];

export const RealWorldExamplesModule: React.FC = () => {
  return (
    <div className="space-y-6 pb-20">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl text-white shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">Aplicaciones del Mundo Real</h2>
        <p className="opacity-90">
          Los patrones de interfaz que estudiamos no son teóricos; son la base de las aplicaciones más exitosas del mundo.
          Analiza cómo estas empresas implementan los conceptos de Navegación, Ingreso y Gestión.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXAMPLES.map((app, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full">
            {/* Image Container */}
            <div className="h-40 overflow-hidden relative bg-slate-100">
               <img 
                 src={app.image} 
                 alt={app.name} 
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="text-white flex items-center gap-2">
                     <app.icon size={20} className="text-indigo-300" />
                     <h3 className="font-bold text-lg">{app.name}</h3>
                  </div>
               </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
               <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded uppercase tracking-wide">
                    {app.category}
                  </span>
               </div>
               
               <p className="text-sm text-slate-600 mb-4 flex-1">
                 {app.description}
               </p>

               <div className="border-t border-slate-100 pt-3">
                 <span className="text-xs font-semibold text-slate-400 block mb-2">Patrones Identificados:</span>
                 <div className="flex flex-wrap gap-2">
                    {app.patterns.map(pattern => (
                      <span key={pattern} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200">
                        {pattern}
                      </span>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <PatternCard title="Análisis Comparativo">
         <div className="p-2">
            <p className="text-slate-700 mb-4 text-sm">
                Al observar estas aplicaciones, notamos que la consistencia es clave. 
                Los usuarios no necesitan "aprender" a usar Netflix o Spotify porque reutilizan patrones de navegación estándar 
                (listas horizontales, barras laterales).
            </p>
            <div className="flex flex-col md:flex-row gap-4 text-sm">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex-1">
                    <h4 className="font-bold text-green-800 mb-1">Tendencias Modernas</h4>
                    <ul className="list-disc list-inside text-green-700 space-y-1">
                        <li>Minimalismo visual (menos bordes, más espacio).</li>
                        <li>Modo Oscuro nativo.</li>
                        <li>Micro-interacciones para feedback inmediato.</li>
                    </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 flex-1">
                    <h4 className="font-bold text-orange-800 mb-1">Errores Comunes</h4>
                    <ul className="list-disc list-inside text-orange-700 space-y-1">
                        <li>Sobrecarga de información en dashboards.</li>
                        <li>Navegación oculta (Menú hamburguesa en escritorio).</li>
                        <li>Falta de feedback en acciones de carga.</li>
                    </ul>
                </div>
            </div>
         </div>
      </PatternCard>
    </div>
  );
};
