
import React, { useState } from 'react';
import { Plus, Search, FileText, Edit3, Trash2, Calendar, Pin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Department } from '@/pages/Index';

interface Note {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'meeting' | 'idea' | 'template';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  author: string;
}

interface NotesSectionProps {
  department: Department;
}

const NotesSection: React.FC<NotesSectionProps> = ({ department }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Reunión de planificación Q2',
      content: `# Reunión de Planificación Q2 - Marketing

## Asistentes
- María García (Marketing Manager)
- Carlos López (Content Specialist)
- Ana Martín (Social Media Manager)

## Agenda
1. Revisión de objetivos Q1
2. Estrategia Q2
3. Presupuesto asignado
4. Calendario de campañas

## Decisiones tomadas
- Aumentar inversión en redes sociales 30%
- Lanzar campaña de influencers en julio
- Implementar nuevo sistema de analytics

## Próximos pasos
- [ ] Preparar propuesta de presupuesto (María - 15/06)
- [ ] Contactar agencias de influencers (Carlos - 20/06)
- [ ] Configurar herramientas de tracking (Ana - 18/06)`,
      type: 'meeting',
      tags: ['Q2', 'Planificación', 'Estrategia'],
      createdAt: '2024-06-10',
      updatedAt: '2024-06-10',
      isPinned: true,
      author: 'María García'
    },
    {
      id: '2',
      title: 'Ideas para campaña de verano',
      content: `# Ideas para Campaña de Verano 2024

## Conceptos creativos
- "Verano sin límites" - enfoque en libertad y aventura
- Colaboración con influencers de viajes
- User-generated content con hashtag #VeranoSinLimites

## Canales propuestos
- Instagram Stories e IGTV
- TikTok con challenges
- YouTube con mini documentales

## Presupuesto estimado
- Producción de contenido: €15,000
- Pauta publicitaria: €25,000
- Influencers: €10,000

## Timeline
- Junio: Preproducción
- Julio-Agosto: Lanzamiento y ejecución
- Septiembre: Análisis de resultados`,
      type: 'idea',
      tags: ['Verano', 'Campaña', 'Social Media'],
      createdAt: '2024-06-08',
      updatedAt: '2024-06-09',
      isPinned: false,
      author: 'Ana Martín'
    },
    {
      id: '3',
      title: 'Template - Acta de reunión',
      content: `# Acta de Reunión - [TÍTULO]

**Fecha:** [DD/MM/YYYY]
**Hora:** [HH:MM - HH:MM]
**Lugar:** [Ubicación/Plataforma]

## Asistentes
- [Nombre] - [Cargo]
- [Nombre] - [Cargo]

## Agenda
1. [Punto 1]
2. [Punto 2]
3. [Punto 3]

## Temas tratados
### [Tema 1]
- Descripción del tema
- Puntos clave discutidos
- Decisiones tomadas

### [Tema 2]
- Descripción del tema
- Puntos clave discutidos
- Decisiones tomadas

## Acuerdos y decisiones
- [ ] [Acuerdo 1] - Responsable: [Nombre] - Fecha: [DD/MM]
- [ ] [Acuerdo 2] - Responsable: [Nombre] - Fecha: [DD/MM]

## Próxima reunión
**Fecha:** [DD/MM/YYYY]
**Agenda preliminar:** [Temas a tratar]`,
      type: 'template',
      tags: ['Template', 'Reunión', 'Acta'],
      createdAt: '2024-06-05',
      updatedAt: '2024-06-05',
      isPinned: false,
      author: 'Sistema'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');

  const noteTypes = [
    { id: 'general', label: 'General', color: 'bg-gray-100 text-gray-800' },
    { id: 'meeting', label: 'Reunión', color: 'bg-blue-100 text-blue-800' },
    { id: 'idea', label: 'Idea', color: 'bg-purple-100 text-purple-800' },
    { id: 'template', label: 'Template', color: 'bg-green-100 text-green-800' },
  ];

  const getTypeColor = (type: string) => {
    const noteType = noteTypes.find(t => t.id === type);
    return noteType?.color || 'bg-gray-100 text-gray-800';
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pinnedNotes = filteredNotes.filter(note => note.isPinned);
  const regularNotes = filteredNotes.filter(note => !note.isPinned);

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setEditContent(note.content);
    setIsEditing(true);
  };

  const handleSaveNote = () => {
    if (selectedNote) {
      setNotes(prev => prev.map(note =>
        note.id === selectedNote.id
          ? { ...note, content: editContent, updatedAt: new Date().toISOString().split('T')[0] }
          : note
      ));
      setIsEditing(false);
      setSelectedNote({ ...selectedNote, content: editContent });
    }
  };

  const togglePin = (noteId: string) => {
    setNotes(prev => prev.map(note =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mb-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold mb-2">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-md font-medium mb-1">$1</h3>')
      .replace(/^\- (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/^\* (.*$)/gm, '<li class="ml-4">• $1</li>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  };

  if (selectedNote) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => {setSelectedNote(null); setIsEditing(false);}}>
              ← Volver
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedNote.title}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Por {selectedNote.author}</span>
                <span>•</span>
                <span>Actualizado: {new Date(selectedNote.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => togglePin(selectedNote.id)}
            >
              <Pin className={`w-4 h-4 mr-2 ${selectedNote.isPinned ? 'fill-current' : ''}`} />
              {selectedNote.isPinned ? 'Desanclar' : 'Anclar'}
            </Button>
            {!isEditing ? (
              <Button onClick={() => handleEditNote(selectedNote)}>
                <Edit3 className="w-4 h-4 mr-2" />
                Editar
              </Button>
            ) : (
              <div className="space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveNote}>
                  Guardar
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6">
            {isEditing ? (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
                placeholder="Escribe tu nota aquí... Puedes usar Markdown básico"
              />
            ) : (
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: formatContent(selectedNote.content) }}
              />
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge className={getTypeColor(selectedNote.type)}>
            {noteTypes.find(t => t.id === selectedNote.type)?.label}
          </Badge>
          {selectedNote.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notas y Documentos</h2>
          <p className="text-gray-600">Gestiona la documentación del departamento</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Nota
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Buscar notas, tags o contenido..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white/80 backdrop-blur-sm"
        />
      </div>

      {/* Pinned Notes */}
      {pinnedNotes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Pin className="w-4 h-4 mr-2" />
            Notas Ancladas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {pinnedNotes.map((note) => (
              <Card 
                key={note.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 shadow-md"
                onClick={() => setSelectedNote(note)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base line-clamp-2">{note.title}</CardTitle>
                    <Pin className="w-4 h-4 text-yellow-600 fill-current flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {note.content.substring(0, 120)}...
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{note.author}</span>
                    <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge className={getTypeColor(note.type)}>
                      {noteTypes.find(t => t.id === note.type)?.label}
                    </Badge>
                    {note.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {note.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{note.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Notes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Todas las Notas ({regularNotes.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {regularNotes.map((note) => (
            <Card 
              key={note.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 shadow-md"
              onClick={() => setSelectedNote(note)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-base line-clamp-2">{note.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                  {note.content.substring(0, 120)}...
                </p>
                
                <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                  <span>{note.author}</span>
                  <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  <Badge className={getTypeColor(note.type)}>
                    {noteTypes.find(t => t.id === note.type)?.label}
                  </Badge>
                  {note.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {note.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{note.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesSection;
