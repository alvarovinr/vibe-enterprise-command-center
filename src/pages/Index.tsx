
import React, { useState } from 'react';
import { Plus, Settings, BarChart3, Calendar, Users, Target, FileText, Brain } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DepartmentCard from '@/components/DepartmentCard';
import CreateDepartmentModal from '@/components/CreateDepartmentModal';
import WorkspaceView from '@/components/WorkspaceView';

export interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  stats: {
    activeGoals: number;
    completedTasks: number;
    totalTasks: number;
    teamMembers: number;
  };
}

const Index = () => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: '1',
      name: 'Marketing',
      description: 'Estrategias de marketing y comunicación',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      icon: 'BarChart3',
      stats: { activeGoals: 3, completedTasks: 12, totalTasks: 18, teamMembers: 5 }
    },
    {
      id: '2',
      name: 'Desarrollo',
      description: 'Desarrollo de productos y tecnología',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      icon: 'Brain',
      stats: { activeGoals: 2, completedTasks: 8, totalTasks: 15, teamMembers: 4 }
    },
    {
      id: '3',
      name: 'Recursos Humanos',
      description: 'Gestión del talento y desarrollo organizacional',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      icon: 'Users',
      stats: { activeGoals: 4, completedTasks: 6, totalTasks: 10, teamMembers: 3 }
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleCreateDepartment = (newDepartment: Omit<Department, 'id' | 'stats'>) => {
    const department: Department = {
      ...newDepartment,
      id: Date.now().toString(),
      stats: { activeGoals: 0, completedTasks: 0, totalTasks: 0, teamMembers: 1 }
    };
    setDepartments(prev => [...prev, department]);
  };

  const handleDeleteDepartment = (departmentId: string) => {
    setDepartments(prev => prev.filter(dept => dept.id !== departmentId));
  };

  const handleEditDepartment = (updatedDepartment: Department) => {
    setDepartments(prev => 
      prev.map(dept => dept.id === updatedDepartment.id ? updatedDepartment : dept)
    );
  };

  if (selectedDepartment) {
    return (
      <WorkspaceView 
        department={selectedDepartment}
        onBack={() => setSelectedDepartment(null)}
        onUpdateDepartment={handleEditDepartment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Vibe Management
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Departamento
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido al Dashboard
          </h2>
          <p className="text-gray-600 text-lg">
            Gestiona todos tus departamentos desde un solo lugar
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Departamentos</p>
                  <p className="text-3xl font-bold text-gray-900">{departments.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Objetivos Activos</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {departments.reduce((sum, dept) => sum + dept.stats.activeGoals, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tareas Completadas</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {departments.reduce((sum, dept) => sum + dept.stats.completedTasks, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Miembros del Equipo</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {departments.reduce((sum, dept) => sum + dept.stats.teamMembers, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Departamentos</h3>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(true)}
              className="hidden sm:flex"
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Departamento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((department) => (
              <DepartmentCard
                key={department.id}
                department={department}
                onSelect={() => setSelectedDepartment(department)}
                onDelete={() => handleDeleteDepartment(department.id)}
                onEdit={handleEditDepartment}
              />
            ))}
          </div>
        </div>
      </main>

      <CreateDepartmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateDepartment}
      />
    </div>
  );
};

export default Index;
