
import React, { useState } from 'react';
import { Plus, MoreVertical, Calendar, User, Flag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Department } from '@/pages/Index';

interface KanbanTask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  labels: string[];
}

interface KanbanColumn {
  id: string;
  title: string;
  tasks: KanbanTask[];
  color: string;
}

interface KanbanSectionProps {
  department: Department;
}

const KanbanSection: React.FC<KanbanSectionProps> = ({ department }) => {
  const [columns, setColumns] = useState<KanbanColumn[]>([
    {
      id: 'pending',
      title: 'Pendientes',
      color: 'border-t-yellow-500',
      tasks: [
        {
          id: '1',
          title: 'Diseñar nueva landing page',
          description: 'Crear el diseño para la página de aterrizaje del nuevo producto',
          assignee: 'María García',
          dueDate: '2024-06-20',
          priority: 'high',
          labels: ['Diseño', 'Web']
        },
        {
          id: '2',
          title: 'Configurar analytics',
          description: 'Implementar Google Analytics 4 en todas las páginas',
          assignee: 'Carlos López',
          dueDate: '2024-06-25',
          priority: 'medium',
          labels: ['Analytics', 'Técnico']
        }
      ]
    },
    {
      id: 'in-progress',
      title: 'En Progreso',
      color: 'border-t-blue-500',
      tasks: [
        {
          id: '3',
          title: 'Campaña redes sociales',
          description: 'Crear contenido para la campaña de verano',
          assignee: 'Ana Martín',
          dueDate: '2024-06-18',
          priority: 'high',
          labels: ['Social Media', 'Contenido']
        }
      ]
    },
    {
      id: 'review',
      title: 'En Revisión',
      color: 'border-t-orange-500',
      tasks: [
        {
          id: '4',
          title: 'Email marketing campaign',
          description: 'Revisar plantillas de email para la campaña Q2',
          assignee: 'Luis Rodríguez',
          dueDate: '2024-06-15',
          priority: 'medium',
          labels: ['Email', 'Marketing']
        }
      ]
    },
    {
      id: 'completed',
      title: 'Completadas',
      color: 'border-t-green-500',
      tasks: [
        {
          id: '5',
          title: 'Análisis competencia',
          description: 'Investigación de mercado sobre competidores directos',
          assignee: 'María García',
          dueDate: '2024-06-10',
          priority: 'low',
          labels: ['Investigación', 'Mercado']
        }
      ]
    }
  ]);

  const [draggedTask, setDraggedTask] = useState<KanbanTask | null>(null);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(null);

  const handleDragStart = (task: KanbanTask, columnId: string) => {
    setDraggedTask(task);
    setDraggedFromColumn(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (draggedTask && draggedFromColumn && draggedFromColumn !== targetColumnId) {
      setColumns(prevColumns => {
        return prevColumns.map(column => {
          if (column.id === draggedFromColumn) {
            return {
              ...column,
              tasks: column.tasks.filter(task => task.id !== draggedTask.id)
            };
          } else if (column.id === targetColumnId) {
            return {
              ...column,
              tasks: [...column.tasks, draggedTask]
            };
          }
          return column;
        });
      });
    }
    
    setDraggedTask(null);
    setDraggedFromColumn(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Kanban Board</h2>
          <p className="text-gray-600">Gestiona las tareas con un flujo visual e interactivo</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 min-h-[600px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className={`p-4 border-b border-gray-200 ${column.color} border-t-4`}>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{column.title}</h3>
                  <p className="text-sm text-gray-600">{column.tasks.length} tareas</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Tasks */}
            <div className="p-4 space-y-3">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  className="cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 bg-white border-0 shadow-md"
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                >
                  <CardContent className="p-4">
                    {/* Task Header */}
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight">
                        {task.title}
                      </h4>
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Task Description */}
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {task.description}
                    </p>

                    {/* Labels */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.labels.map((label, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-purple-100 text-purple-700"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>

                    {/* Task Meta Info */}
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{task.assignee}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{getPriorityIcon(task.priority)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Priority Badge */}
                    <div className="mt-2">
                      <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                        {task.priority === 'high' ? 'Alta' :
                         task.priority === 'medium' ? 'Media' : 'Baja'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanSection;
