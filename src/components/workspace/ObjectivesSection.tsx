
import React, { useState } from 'react';
import { Plus, Target, ChevronDown, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Department } from '@/pages/Index';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface Objective {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  tasks: Task[];
  dueDate: string;
}

interface ObjectivesSectionProps {
  department: Department;
}

const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({ department }) => {
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: '1',
      title: 'Aumentar visibilidad de marca',
      description: 'Incrementar el reconocimiento de marca en redes sociales y medios digitales',
      status: 'active',
      progress: 65,
      dueDate: '2024-06-30',
      tasks: [
        {
          id: '1',
          title: 'Crear campaña en redes sociales',
          description: 'Desarrollar contenido para Facebook, Instagram y LinkedIn',
          status: 'completed',
          assignee: 'María García',
          dueDate: '2024-06-15',
          priority: 'high'
        },
        {
          id: '2',
          title: 'Colaboraciones con influencers',
          description: 'Identificar y contactar influencers relevantes',
          status: 'in-progress',
          assignee: 'Carlos López',
          dueDate: '2024-06-20',
          priority: 'medium'
        }
      ]
    },
    {
      id: '2',
      title: 'Optimizar conversión web',
      description: 'Mejorar la tasa de conversión del sitio web principal',
      status: 'active',
      progress: 35,
      dueDate: '2024-07-15',
      tasks: [
        {
          id: '3',
          title: 'Análisis de UX actual',
          description: 'Evaluar flujos de usuario y puntos de fricción',
          status: 'pending',
          assignee: 'Ana Martín',
          dueDate: '2024-06-25',
          priority: 'high'
        }
      ]
    }
  ]);

  const [expandedObjectives, setExpandedObjectives] = useState<Set<string>>(new Set(['1']));

  const toggleObjective = (objectiveId: string) => {
    const newExpanded = new Set(expandedObjectives);
    if (newExpanded.has(objectiveId)) {
      newExpanded.delete(objectiveId);
    } else {
      newExpanded.add(objectiveId);
    }
    setExpandedObjectives(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Objetivos y Tareas</h2>
          <p className="text-gray-600">Gestiona los objetivos estratégicos del departamento</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Objetivo
        </Button>
      </div>

      {/* Objectives List */}
      <div className="space-y-4">
        {objectives.map((objective) => (
          <Card key={objective.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => toggleObjective(objective.id)}
                    className="mt-1 p-1 hover:bg-gray-100 rounded"
                  >
                    {expandedObjectives.has(objective.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg">{objective.title}</CardTitle>
                      <Badge className={getStatusColor(objective.status)}>
                        {objective.status === 'active' ? 'Activo' : 
                         objective.status === 'completed' ? 'Completado' : 'Pausado'}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{objective.description}</p>
                    
                    {/* Progress */}
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-medium">{objective.progress}%</span>
                      </div>
                      <Progress value={objective.progress} className="h-2" />
                    </div>
                    
                    {/* Meta info */}
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                      <span>Vencimiento: {new Date(objective.dueDate).toLocaleDateString()}</span>
                      <span>{objective.tasks.length} tareas</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Tasks - Expandible */}
            {expandedObjectives.has(objective.id) && (
              <CardContent className="pt-0">
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-900">Tareas</h4>
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Tarea
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {objective.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h5 className="font-medium text-gray-900">{task.title}</h5>
                              <Badge className={getStatusColor(task.status)}>
                                {task.status === 'completed' ? 'Completada' :
                                 task.status === 'in-progress' ? 'En Progreso' : 'Pendiente'}
                              </Badge>
                              <Badge className={getPriorityColor(task.priority)}>
                                {task.priority === 'high' ? 'Alta' :
                                 task.priority === 'medium' ? 'Media' : 'Baja'}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Asignado a: {task.assignee}</span>
                              <span>Vence: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ObjectivesSection;
