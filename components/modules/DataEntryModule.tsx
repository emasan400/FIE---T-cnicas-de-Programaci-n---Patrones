import React, { useState, useEffect } from 'react';
import { PatternCard } from '../PatternCard';
import { WizardData, DragItem } from '../../types';
import { Save, RotateCcw, RotateCw, GripVertical, Check, HardDrive, Monitor, User } from 'lucide-react';

export const DataEntryModule: React.FC = () => {
  // --- Wizard Logic ---
  const [wizardData, setWizardData] = useState<WizardData>({ step: 1, name: '', email: '', preferences: '' });
  
  // --- Autosave & Shortcuts Logic ---
  const [textValue, setTextValue] = useState("El diseño de interfaces es crucial para el aprendizaje...");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // --- Undo/Redo Logic ---
  const [history, setHistory] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // --- Drag and Drop Logic ---
  const [dragItems, setDragItems] = useState<DragItem[]>([
    { id: '1', content: 'Revisar Literatura', listId: 'todo' },
    { id: '2', content: 'Redactar Abstract', listId: 'todo' },
    { id: '3', content: 'Diseñar Metodología', listId: 'done' },
  ]);

  // Autosave Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (textValue !== history[historyIndex]) {
        handleSave();
      }
    }, 2000);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textValue]);

  // Shortcuts Effect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyIndex, history]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
    }, 800);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setTextValue(newVal);
    
    // Add to history if paused typing or distinct enough (simplified for demo)
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newVal);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setTextValue(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setTextValue(history[historyIndex + 1]);
    }
  };

  // Drag Handlers
  const onDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("id", id);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent, targetList: 'todo' | 'done') => {
    const id = e.dataTransfer.getData("id");
    setDragItems(items => items.map(item => 
      item.id === id ? { ...item, listId: targetList } : item
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
      
      {/* Wizard Pattern - Windows Installer Style */}
      <PatternCard title="Wizard (Estilo Instalador)" className="h-full">
        <div className="flex justify-center items-center h-full bg-slate-100 p-2 md:p-4 rounded-lg border border-slate-300">
            {/* Installer Window Frame */}
            <div className="w-full max-w-md bg-slate-50 shadow-2xl border border-slate-400 rounded-sm overflow-hidden flex flex-col min-h-[450px] md:h-[400px]">
                {/* Title Bar */}
                <div className="bg-slate-200 px-3 py-1 border-b border-slate-300 flex items-center justify-between select-none">
                    <span className="text-xs font-bold text-slate-700 truncate mr-2">Instalación de Perfil Académico</span>
                    <div className="flex gap-1 shrink-0">
                        <div className="w-3 h-3 bg-slate-400 rounded-sm"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-sm"></div>
                    </div>
                </div>

                {/* Content Area - Responsive Switch: Vertical on Tablet (md), Horizontal on Desktop (lg) */}
                <div className="flex flex-col lg:flex-row flex-1">
                    {/* Sidebar Image */}
                    <div className="w-full lg:w-1/3 bg-indigo-900 p-4 flex flex-row lg:flex-col items-center lg:justify-start justify-between lg:pt-8 text-indigo-100 border-b lg:border-b-0 lg:border-r border-indigo-800">
                         <div className="flex lg:flex-col items-center gap-4 lg:gap-0">
                           {wizardData.step === 1 && <User size={32} className="lg:w-12 lg:h-12" strokeWidth={1.5} />}
                           {wizardData.step === 2 && <Monitor size={32} className="lg:w-12 lg:h-12" strokeWidth={1.5} />}
                           {wizardData.step === 3 && <HardDrive size={32} className="lg:w-12 lg:h-12" strokeWidth={1.5} />}
                           <span className="lg:hidden font-bold text-sm">Paso {wizardData.step} de 3</span>
                         </div>
                         
                         <div className="mt-0 lg:mt-8 flex lg:flex-col gap-1 lg:space-y-2 text-[10px] hidden lg:flex w-full">
                            <div className={`p-1 rounded ${wizardData.step === 1 ? 'bg-indigo-700 font-bold' : 'opacity-50'}`}>1. Identidad</div>
                            <div className={`p-1 rounded ${wizardData.step === 2 ? 'bg-indigo-700 font-bold' : 'opacity-50'}`}>2. Contacto</div>
                            <div className={`p-1 rounded ${wizardData.step === 3 ? 'bg-indigo-700 font-bold' : 'opacity-50'}`}>3. Finalizar</div>
                         </div>
                    </div>

                    {/* Main Form */}
                    <div className="w-full lg:w-2/3 bg-white p-6 flex flex-col">
                        <div className="mb-4 border-b pb-2">
                             <h4 className="font-bold text-slate-800">
                                {wizardData.step === 1 && "Información del Estudiante"}
                                {wizardData.step === 2 && "Configuración de Contacto"}
                                {wizardData.step === 3 && "Instalación Completada"}
                             </h4>
                             <p className="text-xs text-slate-500 mt-1">
                                {wizardData.step === 1 && "Por favor ingrese su nombre para continuar con la configuración."}
                                {wizardData.step === 2 && "Establezca su dirección de correo institucional."}
                                {wizardData.step === 3 && "El sistema ha guardado sus preferencias correctamente."}
                             </p>
                        </div>

                        <div className="flex-1">
                            {wizardData.step === 1 && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700">Nombre Completo:</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-slate-400 p-1.5 text-sm rounded-sm focus:outline-none focus:border-indigo-600 focus:shadow-inner bg-white text-black"
                                        value={wizardData.name}
                                        onChange={e => setWizardData({...wizardData, name: e.target.value})}
                                        autoFocus
                                    />
                                </div>
                            )}
                             {wizardData.step === 2 && (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-700">Correo Electrónico:</label>
                                    <input 
                                        type="email" 
                                        className="w-full border border-slate-400 p-1.5 text-sm rounded-sm focus:outline-none focus:border-indigo-600 focus:shadow-inner bg-white text-black"
                                        value={wizardData.email}
                                        onChange={e => setWizardData({...wizardData, email: e.target.value})}
                                        autoFocus
                                    />
                                </div>
                            )}
                             {wizardData.step === 3 && (
                                <div className="flex flex-col items-center justify-center h-full space-y-2 py-4">
                                    <Check className="text-green-600" size={32} />
                                    <p className="text-sm font-bold text-slate-800">Operación Exitosa</p>
                                    <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded border w-full text-center">
                                        Nombre: {wizardData.name}<br/>
                                        Email: {wizardData.email}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="bg-slate-100 p-3 border-t border-slate-300 flex justify-end gap-2 shrink-0">
                    <button 
                        onClick={() => setWizardData(prev => ({...prev, step: Math.max(1, prev.step - 1)}))}
                        disabled={wizardData.step === 1}
                        className="px-4 py-1 text-xs min-w-[80px] border border-slate-400 rounded-sm bg-slate-200 hover:bg-slate-300 text-black disabled:opacity-50 disabled:cursor-not-allowed">
                        &lt; Atrás
                    </button>
                    {wizardData.step < 3 ? (
                        <button 
                            onClick={() => setWizardData(prev => ({...prev, step: Math.min(3, prev.step + 1)}))}
                            className="px-4 py-1 text-xs min-w-[80px] border border-slate-500 rounded-sm bg-slate-200 hover:bg-slate-300 text-black shadow-sm font-medium focus:ring-1 ring-black">
                            Siguiente &gt;
                        </button>
                    ) : (
                        <button 
                            onClick={() => setWizardData({ step: 1, name: '', email: '', preferences: '' })}
                            className="px-4 py-1 text-xs min-w-[80px] border border-slate-500 rounded-sm bg-slate-200 hover:bg-slate-300 text-black shadow-sm">
                            Finalizar
                        </button>
                    )}
                </div>
            </div>
        </div>
      </PatternCard>

      {/* Editor Patterns (Autosave, WYSIWYG Lite, Undo/Redo, Shortcuts) */}
      <PatternCard title="Editor Inteligente (Alta Legibilidad)" className="h-full">
         <div className="flex flex-col gap-2 mb-2 h-full">
            <div className="flex justify-between items-center bg-slate-200 p-2 rounded-t-lg border-b border-slate-300">
               <div className="flex gap-1 bg-white rounded border border-slate-300 p-0.5">
                 <button 
                   onClick={handleUndo} 
                   disabled={historyIndex === 0}
                   className="p-1.5 hover:bg-slate-100 rounded disabled:opacity-30 text-slate-700" title="Undo (Ctrl+Z)">
                   <RotateCcw size={16} />
                 </button>
                 <div className="w-px bg-slate-300 my-1"></div>
                 <button 
                   onClick={handleRedo}
                   disabled={historyIndex === history.length - 1}
                   className="p-1.5 hover:bg-slate-100 rounded disabled:opacity-30 text-slate-700" title="Redo (Ctrl+Shift+Z)">
                   <RotateCw size={16} />
                 </button>
               </div>
               <div className="text-xs font-semibold text-slate-600 flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-slate-300">
                 {isSaving ? <span className="text-blue-600 animate-pulse">Guardando...</span> : 
                  lastSaved ? <span>Guardado: {lastSaved.toLocaleTimeString()}</span> : <span>Listo</span>}
                 <Save size={14} />
               </div>
            </div>
            
            {/* High Contrast Text Area */}
            <textarea
              className="w-full flex-1 min-h-[160px] p-4 border-2 border-slate-300 rounded-b-lg focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none font-sans text-base text-slate-900 bg-white placeholder-slate-400 leading-relaxed shadow-inner"
              value={textValue}
              onChange={handleTextChange}
              placeholder="Escribe aquí tu contenido académico..."
            />
            
            <div className="text-xs text-slate-500 mt-2 flex justify-between">
               <span>Caracteres: {textValue.length}</span>
               <span className="font-mono bg-slate-100 px-2 rounded border border-slate-200 hidden sm:inline-block">Ctrl+Z / Ctrl+S</span>
            </div>
         </div>
      </PatternCard>

      {/* Drag and Drop */}
      <PatternCard title="Gestión de Tareas (Drag & Drop)" className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
           {(['todo', 'done'] as const).map(listId => (
             <div 
               key={listId}
               onDragOver={onDragOver}
               onDrop={(e) => onDrop(e, listId)}
               className={`p-4 rounded-lg border-2 border-dashed min-h-[150px] transition-colors
                 ${listId === 'todo' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'}`}
             >
               <h4 className="font-bold text-slate-600 mb-3 uppercase text-xs tracking-wider">
                 {listId === 'todo' ? 'Pendiente' : 'Completado'}
               </h4>
               <div className="space-y-2">
                 {dragItems.filter(item => item.listId === listId).map(item => (
                   <div 
                     key={item.id}
                     draggable
                     onDragStart={(e) => onDragStart(e, item.id)}
                     className="bg-white p-3 rounded shadow-sm border border-slate-200 cursor-move flex items-center gap-2 hover:shadow-md transition-shadow group active:cursor-grabbing"
                   >
                     <GripVertical size={16} className="text-slate-400 group-hover:text-slate-600" />
                     <span className="text-sm font-medium text-slate-800">{item.content}</span>
                   </div>
                 ))}
                 {dragItems.filter(item => item.listId === listId).length === 0 && (
                   <p className="text-center text-slate-400 text-sm italic py-4">Arrastra ítems aquí</p>
                 )}
               </div>
             </div>
           ))}
        </div>
      </PatternCard>

    </div>
  );
};