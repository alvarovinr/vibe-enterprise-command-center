
import React, { useState } from 'react';
import { Upload, Search, File, Folder, Download, Trash2, Eye, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Department } from '@/pages/Index';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modifiedAt: string;
  modifiedBy: string;
  fileType?: 'pdf' | 'doc' | 'img' | 'xls' | 'other';
  tags: string[];
}

interface FilesSectionProps {
  department: Department;
}

const FilesSection: React.FC<FilesSectionProps> = ({ department }) => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Presentación Q2 Marketing',
      type: 'file',
      size: '2.4 MB',
      modifiedAt: '2024-06-12',
      modifiedBy: 'María García',
      fileType: 'pdf',
      tags: ['Presentación', 'Q2']
    },
    {
      id: '2',
      name: 'Campaña Verano',
      type: 'folder',
      modifiedAt: '2024-06-10',
      modifiedBy: 'Ana Martín',
      tags: ['Campaña', 'Creativo']
    },
    {
      id: '3',
      name: 'Logos y Brand Assets',
      type: 'folder',
      modifiedAt: '2024-06-08',
      modifiedBy: 'Carlos López',
      tags: ['Brand', 'Recursos']
    },
    {
      id: '4',
      name: 'Análisis de Competencia.xlsx',
      type: 'file',
      size: '890 KB',
      modifiedAt: '2024-06-11',
      modifiedBy: 'María García',
      fileType: 'xls',
      tags: ['Análisis', 'Competencia']
    },
    {
      id: '5',
      name: 'Guía de Estilo 2024.pdf',
      type: 'file',
      size: '5.2 MB',
      modifiedAt: '2024-06-09',
      modifiedBy: 'Ana Martín',
      fileType: 'pdf',
      tags: ['Guía', 'Estilo', 'Brand']
    },
    {
      id: '6',
      name: 'Fotos Producto Nuevo',
      type: 'folder',
      modifiedAt: '2024-06-07',
      modifiedBy: 'Carlos López',
      tags: ['Fotos', 'Producto']
    },
    {
      id: '7',
      name: 'Propuesta Influencers.docx',
      type: 'file',
      size: '1.1 MB',
      modifiedAt: '2024-06-06',
      modifiedBy: 'Ana Martín',
      fileType: 'doc',
      tags: ['Propuesta', 'Influencers']
    },
    {
      id: '8',
      name: 'Banner_Principal.png',
      type: 'file',
      size: '2.8 MB',
      modifiedAt: '2024-06-05',
      modifiedBy: 'Carlos López',
      fileType: 'img',
      tags: ['Banner', 'Web']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPath, setCurrentPath] = useState(['Archivos']);

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') return Folder;
    
    switch (item.fileType) {
      case 'pdf':
        return () => <div className="w-5 h-5 bg-red-500 rounded text-white flex items-center justify-center text-xs font-bold">PDF</div>;
      case 'doc':
        return () => <div className="w-5 h-5 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-bold">DOC</div>;
      case 'xls':
        return () => <div className="w-5 h-5 bg-green-500 rounded text-white flex items-center justify-center text-xs font-bold">XLS</div>;
      case 'img':
        return () => <div className="w-5 h-5 bg-purple-500 rounded text-white flex items-center justify-center text-xs font-bold">IMG</div>;
      default:
        return File;
    }
  };

  const getFileTypeColor = (fileType?: string) => {
    switch (fileType) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'doc':
        return 'bg-blue-100 text-blue-800';
      case 'xls':
        return 'bg-green-100 text-green-800';
      case 'img':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const folders = filteredFiles.filter(item => item.type === 'folder');
  const regularFiles = filteredFiles.filter(item => item.type === 'file');

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      setCurrentPath([...currentPath, item.name]);
    }
  };

  const handlePathClick = (index: number) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Archivos y Documentos</h2>
          <p className="text-gray-600">Gestiona todos los archivos del departamento</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Upload className="w-4 h-4 mr-2" />
          Subir Archivos
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {currentPath.map((path, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => handlePathClick(index)}
              className="hover:text-purple-600 transition-colors"
            >
              {path}
            </button>
            {index < currentPath.length - 1 && <span>/</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar archivos y carpetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm"
          />
        </div>
        <Button variant="outline">
          <Folder className="w-4 h-4 mr-2" />
          Nueva Carpeta
        </Button>
      </div>

      {/* File Grid */}
      <div className="space-y-6">
        {/* Folders */}
        {folders.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Carpetas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {folders.map((folder) => {
                const IconComponent = getFileIcon(folder);
                return (
                  <Card
                    key={folder.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 shadow-md"
                    onClick={() => handleItemClick(folder)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{folder.name}</h4>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Abrir
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Descargar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="text-xs text-gray-500 mb-2">
                        <div>Modificado por {folder.modifiedBy}</div>
                        <div>{new Date(folder.modifiedAt).toLocaleDateString()}</div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {folder.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {folder.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{folder.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Files */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Archivos ({regularFiles.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {regularFiles.map((file) => {
              const IconComponent = getFileIcon(file);
              return (
                <Card
                  key={file.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                          <IconComponent />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">{file.name}</h4>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Descargar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="text-xs text-gray-500 mb-2">
                      <div>Por {file.modifiedBy}</div>
                      <div>{new Date(file.modifiedAt).toLocaleDateString()}</div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {file.fileType && (
                        <Badge className={getFileTypeColor(file.fileType)}>
                          {file.fileType.toUpperCase()}
                        </Badge>
                      )}
                      {file.tags.slice(0, 1).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {file.tags.length > 1 && (
                        <Badge variant="outline" className="text-xs">
                          +{file.tags.length - 1}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesSection;
