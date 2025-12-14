import React, { useState } from 'react';
import { ModuleType } from './types';
import { DataEntryModule } from './components/modules/DataEntryModule';
import { NavigationModule } from './components/modules/NavigationModule';
import { InfoManagementModule } from './components/modules/InfoManagementModule';
import { Layout, PenTool, Database, GraduationCap, Settings, Menu, Moon, Sun } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DATA_ENTRY);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DATA_ENTRY: return <DataEntryModule />;
      case ModuleType.NAVIGATION: return <NavigationModule />;
      case ModuleType.INFO_MGMT: return <InfoManagementModule />;
      default: return <DataEntryModule />;
    }
  };

  const NavItem = ({ module, label, icon: Icon }: { module: ModuleType, label: string, icon: any }) => (
    <button
      onClick={() => setActiveModule(module)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
        ${activeModule === module 
          ? 'bg-academic-600 text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
    >
      <Icon size={20} className={activeModule === module ? 'animate-pulse' : ''} />
      <span className={`font-medium ${!sidebarOpen && 'hidden md:hidden'}`}>{label}</span>
      {activeModule === module && sidebarOpen && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white"></div>
      )}
    </button>
  );

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-full w-full bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
      
        {/* Sidebar - Represents Navigation Pattern (Permanent & Collapsible) */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-2xl z-20 no-print`}>
          <div className="p-6 flex items-center justify-between">
            {sidebarOpen && (
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white whitespace-nowrap overflow-hidden">
                <GraduationCap className="text-academic-500 shrink-0" />
                <span>Patrones - FIE</span>
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
              <Menu size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4">
            <NavItem module={ModuleType.DATA_ENTRY} label="Ingreso de Datos" icon={PenTool} />
            <NavItem module={ModuleType.NAVIGATION} label="Navegación" icon={Layout} />
            <NavItem module={ModuleType.INFO_MGMT} label="Información" icon={Database} />
          </nav>

          <div className="p-4 border-t border-slate-800">
             <button 
               onClick={toggleTheme}
               className={`w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm ${!sidebarOpen && 'justify-center'}`}
             >
               {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
               {sidebarOpen && <span>{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
             </button>
             
             {sidebarOpen && (
                 <div className="mt-2 flex items-center gap-3 px-4 py-2 text-slate-500 text-sm cursor-not-allowed opacity-50">
                     <Settings size={18} />
                     <span>Más Ajustes</span>
                 </div>
             )}
          </div>
        </aside>

        {/* Main Content Area - Represents Single Page Application */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 shadow-sm no-print transition-colors duration-300">
             <div>
               <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                 {activeModule === ModuleType.DATA_ENTRY && "Patrones de Ingreso"}
                 {activeModule === ModuleType.NAVIGATION && "Patrones de Navegación"}
                 {activeModule === ModuleType.INFO_MGMT && "Manejo de Información"}
               </h1>
               <p className="text-xs text-slate-500 dark:text-slate-400">Módulo Académico Interactivo</p>
             </div>
             <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Emanuel Andres Sanchez</p>
                 <p className="text-xs text-slate-400 dark:text-slate-500">Facultad de Ingenieria del Ejercito</p>
               </div>
               <div className="w-10 h-10 bg-academic-100 dark:bg-academic-900 text-academic-600 dark:text-academic-100 rounded-full flex items-center justify-center font-bold border border-academic-200 dark:border-academic-700">
                 ES
               </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
             <div className="max-w-6xl mx-auto">
                {renderModule()}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;