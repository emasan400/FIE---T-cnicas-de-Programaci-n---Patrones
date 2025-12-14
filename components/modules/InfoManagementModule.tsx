import React, { useState, useEffect, useRef } from 'react';
import { PatternCard } from '../PatternCard';
import { Student } from '../../types';
import { generateMockStudents } from '../../services/geminiService';
import { Search, Printer, Filter, Download, ArrowUp, ArrowDown, FileSpreadsheet, FileText, FileJson, ChevronDown } from 'lucide-react';

const INITIAL_DATA: Student[] = [
  { id: '1001', name: 'Ana Garcia', major: 'Ingeniería', gpa: 3.8, status: 'Active' },
  { id: '1002', name: 'Carlos Ruiz', major: 'Medicina', gpa: 3.5, status: 'Active' },
  { id: '1003', name: 'Ana Rodriguez', major: 'Artes', gpa: 3.9, status: 'Graduated' },
  { id: '1004', name: 'David Chen', major: 'Ingeniería', gpa: 3.2, status: 'On Leave' },
  { id: '1005', name: 'Elena Diaz', major: 'Derecho', gpa: 3.7, status: 'Active' },
  { id: '1006', name: 'Ana Martinez', major: 'Arquitectura', gpa: 3.6, status: 'Active' },
  { id: '1007', name: 'Luis Navarro', major: 'Economía', gpa: 3.1, status: 'Active' },
];

type SortKey = 'name' | 'gpa';
type SortDirection = 'asc' | 'desc';

export const InfoManagementModule: React.FC = () => {
  const [data, setData] = useState<Student[]>(INITIAL_DATA);
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Sorting State
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Close export menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Logic
  const filteredData = data.filter(student => {
    const matchesText = student.name.toLowerCase().includes(filterText.toLowerCase()) || 
                        student.major.toLowerCase().includes(filterText.toLowerCase());
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesText && matchesStatus;
  });

  // Sort Logic
  const sortedData = React.useMemo(() => {
    if (!sortKey) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
      if (sortKey === key) {
          setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
      } else {
          setSortKey(key);
          setSortDirection('asc');
      }
  };

  // Autocomplete Logic - Now predicts Names instead of Majors
  useEffect(() => {
    if (filterText.length > 0) {
      // Filter names that contain the input text
      const nameSuggestions = data
        .map(s => s.name)
        .filter(name => name.toLowerCase().includes(filterText.toLowerCase()))
        .slice(0, 5); // Limit to top 5 matches
        
      setAutocompleteSuggestions(nameSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [filterText, data]);

  const handleGenerateData = async () => {
    setLoading(true);
    const newStudents = await generateMockStudents(5);
    if (newStudents.length > 0) {
      setData(prev => [...prev, ...newStudents]);
    }
    setLoading(false);
  };

  const handleExport = (type: 'pdf' | 'excel' | 'csv') => {
    setShowExportMenu(false);
    if (type === 'pdf') {
       window.print();
    } else if (type === 'csv') {
       const headers = ['ID,Nombre,Carrera,Promedio,Estado'];
       const rows = sortedData.map(s => `${s.id},${s.name},${s.major},${s.gpa},${s.status}`);
       const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
       const encodedUri = encodeURI(csvContent);
       const link = document.createElement("a");
       link.setAttribute("href", encodedUri);
       link.setAttribute("download", "estudiantes.csv");
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
    } else {
       // Mock Excel export
       alert("Exportando a Excel (.xlsx)... \n(Simulación: En producción esto descargaría el archivo binario)");
    }
  };

  const SortIcon = ({ colKey }: { colKey: SortKey }) => {
      if (sortKey !== colKey) return <div className="w-4 h-4 ml-1 opacity-20"><ArrowUp size={14}/></div>;
      return sortDirection === 'asc' 
        ? <ArrowUp size={14} className="ml-1 text-indigo-600" /> 
        : <ArrowDown size={14} className="ml-1 text-indigo-600" />;
  };

  return (
    <div className="space-y-6 pb-20">
      
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-center no-print">
         <div className="flex gap-4 w-full md:w-auto relative">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
              <input 
                type="text"
                placeholder="Buscar (ej: Ana)..."
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-slate-900 font-medium placeholder-slate-400"
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onFocus={() => filterText && setShowSuggestions(true)}
              />
              {/* Autocomplete Dropdown - Predictor */}
              {showSuggestions && autocompleteSuggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-1 z-20 overflow-hidden">
                   <div className="bg-slate-50 px-3 py-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                     Sugerencias
                   </div>
                   {autocompleteSuggestions.map((s, idx) => (
                     <div 
                        key={idx} 
                        className="px-4 py-2 hover:bg-indigo-50 hover:text-indigo-700 cursor-pointer text-sm text-slate-700 flex justify-between items-center group"
                        onMouseDown={() => setFilterText(s)} // Use onMouseDown to prevent blur before click
                     >
                       <span>{s}</span>
                       <span className="text-slate-300 group-hover:text-indigo-300 text-xs">Reg.</span>
                     </div>
                   ))}
                </div>
              )}
            </div>

            <div className="relative">
              <select 
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg appearance-none bg-white text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
              >
                <option value="All">Todos los estados</option>
                <option value="Active">Activo</option>
                <option value="Graduated">Graduado</option>
                <option value="On Leave">En Pausa</option>
              </select>
              <Filter className="absolute left-3 top-2.5 text-slate-500" size={18} />
            </div>
         </div>

         <div className="flex gap-2 relative" ref={exportMenuRef}>
            <button 
              onClick={handleGenerateData}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 disabled:opacity-50 transition-colors text-sm font-medium border border-indigo-100"
            >
               <Download size={18} />
               {loading ? '...' : 'AI Data'}
            </button>
            
            <div className="relative">
                <button 
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors text-sm font-medium shadow-sm"
                >
                   <Printer size={18} />
                   <span>Exportar</span>
                   <ChevronDown size={14} className={`transition-transform duration-200 ${showExportMenu ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Export Options Dropdown */}
                {showExportMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 z-30 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-1">
                          <button onClick={() => handleExport('pdf')} className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded flex items-center gap-2 transition-colors">
                              <FileText size={16} className="text-red-500" /> PDF (Imprimir)
                          </button>
                          <button onClick={() => handleExport('excel')} className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded flex items-center gap-2 transition-colors">
                              <FileSpreadsheet size={16} className="text-green-600" /> Excel (.xlsx)
                          </button>
                          <button onClick={() => handleExport('csv')} className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded flex items-center gap-2 transition-colors">
                              <FileJson size={16} className="text-blue-500" /> CSV
                          </button>
                      </div>
                  </div>
                )}
            </div>
         </div>
      </div>

      {/* Table Pattern */}
      <PatternCard title="Tabla Interactiva (Filtrado, Ordenamiento & Reporte)">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
             <thead className="bg-slate-50 text-slate-900 uppercase font-bold text-xs">
               <tr>
                 <th className="px-6 py-3 rounded-tl-lg">ID</th>
                 <th 
                    className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors group select-none"
                    onClick={() => handleSort('name')}
                 >
                    <div className="flex items-center">
                        Estudiante <SortIcon colKey="name" />
                    </div>
                 </th>
                 <th className="px-6 py-3">Carrera</th>
                 <th 
                    className="px-6 py-3 cursor-pointer hover:bg-slate-100 transition-colors group select-none"
                    onClick={() => handleSort('gpa')}
                 >
                    <div className="flex items-center">
                        Promedio <SortIcon colKey="gpa" />
                    </div>
                 </th>
                 <th className="px-6 py-3 rounded-tr-lg">Estado</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {sortedData.length > 0 ? sortedData.map((student) => (
                 <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4 font-mono text-slate-500">{student.id}</td>
                   <td className="px-6 py-4 font-medium text-slate-800">{student.name}</td>
                   <td className="px-6 py-4">
                     <span className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                        {student.major}
                     </span>
                   </td>
                   <td className="px-6 py-4 font-mono font-medium">{student.gpa.toFixed(1)}</td>
                   <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${student.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                        ${student.status === 'Graduated' ? 'bg-purple-100 text-purple-800' : ''}
                        ${student.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : ''}
                      `}>
                         <span className={`w-1.5 h-1.5 rounded-full 
                            ${student.status === 'Active' ? 'bg-green-500' : ''}
                            ${student.status === 'Graduated' ? 'bg-purple-500' : ''}
                            ${student.status === 'On Leave' ? 'bg-yellow-500' : ''}
                         `}></span>
                         {student.status === 'Active' ? 'Activo' : student.status === 'Graduated' ? 'Graduado' : 'En Pausa'}
                      </span>
                   </td>
                 </tr>
               )) : (
                 <tr>
                    <td colSpan={5} className="text-center py-8 text-slate-400 italic">
                       No se encontraron resultados
                    </td>
                 </tr>
               )}
             </tbody>
          </table>
        </div>
        <div className="mt-4 text-xs text-slate-400 text-right print-only">
           Generado por AcademiaUI - {new Date().toLocaleDateString()}
        </div>
      </PatternCard>

    </div>
  );
};