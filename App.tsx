import React, { useState, useEffect } from 'react';
import { ModuleType } from './types';
import { DataEntryModule } from './components/modules/DataEntryModule';
import { NavigationModule } from './components/modules/NavigationModule';
import { InfoManagementModule } from './components/modules/InfoManagementModule';
import { RealWorldExamplesModule } from './components/modules/RealWorldExamplesModule';
import { Layout, PenTool, Database, GraduationCap, Settings, Menu, Moon, Sun, X, Globe, User, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DATA_ENTRY);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Role State (Student vs Admin)
  const [userRole, setUserRole] = useState<'Student' | 'Admin'>('Student');

  // Responsive Initialization: Close/Collapse sidebar by default on mobile AND TABLET (< 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state
    if (window.innerWidth < 1024) setSidebarOpen(false);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleRole = () => {
      setUserRole(prev => prev === 'Student' ? 'Admin' : 'Student');
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DATA_ENTRY: return <DataEntryModule />;
      case ModuleType.NAVIGATION: return <NavigationModule />;
      case ModuleType.INFO_MGMT: return <InfoManagementModule userRole={userRole} />;
      case ModuleType.REAL_WORLD: return <RealWorldExamplesModule />;
      default: return <DataEntryModule />;
    }
  };

  const NavItem = ({ module, label, icon: Icon }: { module: ModuleType, label: string, icon: any }) => (
    <button
      onClick={() => {
        setActiveModule(module);
        if (window.innerWidth < 768) setSidebarOpen(false); // Auto-close on mobile only, keep rail on tablet
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
        ${activeModule === module 
          ? 'bg-academic-600 text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
    >
      <Icon size={20} className={activeModule === module ? 'animate-pulse' : ''} />
      <span className={`font-medium ${!sidebarOpen && 'md:hidden'}`}>{label}</span>
      {activeModule === module && sidebarOpen && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white hidden md:block"></div>
      )}
    </button>
  );

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex h-full w-full bg-slate-100 dark:bg-slate-900 transition-colors duration-300 relative">
      
        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Responsive Behavior: Drawer on Mobile, Collapsible Rail on Tablet/Desktop */}
        <aside className={`
            fixed inset-y-0 left-0 z-40 h-full bg-slate-900 text-white transition-all duration-300 shadow-2xl flex flex-col
            ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64 md:translate-x-0 md:w-20'}
        `}>
          <div className="p-6 flex items-center justify-between h-20">
            {(sidebarOpen || window.innerWidth < 768) && (
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white whitespace-nowrap overflow-hidden">
                <GraduationCap className="text-academic-500 shrink-0" />
                <span className={!sidebarOpen ? 'md:hidden' : ''}>Patrones - FIE</span>
              </div>
            )}
            
            {/* Desktop Toggle Button */}
            <button 
                onClick={() => setSidebarOpen(!sidebarOpen)} 
                className="hidden md:block p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors ml-auto"
            >
              {sidebarOpen ? <Menu size={20} /> : <Menu size={20} className="mx-auto" />}
            </button>

            {/* Mobile Close Button */}
            <button 
                onClick={() => setSidebarOpen(false)} 
                className="md:hidden p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
            <NavItem module={ModuleType.DATA_ENTRY} label="Ingreso de Datos" icon={PenTool} />
            <NavItem module={ModuleType.NAVIGATION} label="Navegación" icon={Layout} />
            <NavItem module={ModuleType.INFO_MGMT} label="Información" icon={Database} />
            <NavItem module={ModuleType.REAL_WORLD} label="Ejemplos Reales" icon={Globe} />
          </nav>

          <div className="p-4 border-t border-slate-800 space-y-2">
             {/* Role Toggle Switch */}
             <button
                onClick={toggleRole}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm border
                    ${userRole === 'Admin' 
                        ? 'bg-red-900/30 text-red-200 border-red-900 hover:bg-red-900/50' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'}
                    ${!sidebarOpen && 'md:justify-center px-2'}
                `}
                title="Cambiar Rol (Simulación)"
             >
                {userRole === 'Admin' ? <Shield size={18} /> : <User size={18} />}
                {sidebarOpen && (
                    <div className="flex flex-col items-start text-xs hidden md:flex">
                        <span className="opacity-70">Rol Actual:</span>
                        <span className="font-bold">{userRole}</span>
                    </div>
                )}
             </button>

             <button 
               onClick={toggleTheme}
               className={`w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm ${!sidebarOpen && 'md:justify-center'}`}
             >
               {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
               {(sidebarOpen) && <span className="hidden md:inline">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>}
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className={`flex-1 flex flex-col h-full overflow-hidden relative transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <header className="h-16 shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 md:px-8 shadow-sm no-print transition-colors duration-300 z-20">
             <div className="flex items-center gap-3">
               {/* Mobile Menu Trigger */}
               <button 
                 onClick={() => setSidebarOpen(true)}
                 className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
               >
                 <Menu size={24} />
               </button>

               <div>
                 <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate max-w-[200px] md:max-w-none">
                   {activeModule === ModuleType.DATA_ENTRY && "Patrones de Ingreso"}
                   {activeModule === ModuleType.NAVIGATION && "Patrones de Navegación"}
                   {activeModule === ModuleType.INFO_MGMT && "Manejo de Información"}
                   {activeModule === ModuleType.REAL_WORLD && "Ejemplos del Mundo Real"}
                 </h1>
                 <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Módulo Académico Interactivo</p>
               </div>
             </div>

             <div className="flex items-center gap-3 md:gap-4">
               {/* Role Badge in Header */}
               <div className={`px-3 py-1 rounded-full text-xs font-bold border hidden sm:flex items-center gap-1
                   ${userRole === 'Admin' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-blue-100 text-blue-700 border-blue-200'}
               `}>
                   {userRole === 'Admin' ? <Shield size={12} /> : <User size={12} />}
                   {userRole}
               </div>

               <div className="text-right hidden sm:block">
                 <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Emanuel Andres Sanchez</p>
                 <p className="text-xs text-slate-400 dark:text-slate-500">Facultad de Ingenieria del Ejercito</p>
               </div>
               <div className="w-8 h-8 md:w-10 md:h-10 bg-academic-100 dark:bg-academic-900 text-academic-600 dark:text-academic-100 rounded-full flex items-center justify-center font-bold border border-academic-200 dark:border-academic-700 text-sm md:text-base">
                 ES
               </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
             <div className="max-w-6xl mx-auto w-full">
                {renderModule()}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;