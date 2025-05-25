
import React, { useState } from 'react';
import { MoreVertical, Edit, Trash2, Users, Target, CheckCircle, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Department } from '@/pages/Index';
import EditDepartmentModal from './EditDepartmentModal';

interface DepartmentCardProps {
  department: Department;
  onSelect: () => void;
  onDelete: () => void;
  onEdit: (department: Department) => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  onSelect,
  onDelete,
  onEdit
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const completionRate = department.stats.totalTasks > 0 
    ? Math.round((department.stats.completedTasks / department.stats.totalTasks) * 100)
    : 0;

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Target,
      Users,
      Calendar,
      CheckCircle
    };
    const IconComponent = icons[iconName] || Target;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 overflow-hidden cursor-pointer">
        <div className={`h-2 ${department.color}`} />
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 ${department.color} rounded-xl flex items-center justify-center shadow-lg`}>
                {getIconComponent(department.icon)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                  {department.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {department.description}
                </p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
                <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-red-600">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Progreso General</span>
              <span className="text-sm font-semibold text-gray-900">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{department.stats.activeGoals}</div>
              <div className="text-xs text-gray-600">Objetivos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{department.stats.completedTasks}</div>
              <div className="text-xs text-gray-600">Completadas</div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {department.stats.teamMembers} miembros
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {department.stats.totalTasks} tareas
            </Badge>
          </div>

          {/* Action Button */}
          <Button 
            onClick={onSelect}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            Abrir Workspace
          </Button>
        </CardContent>
      </Card>

      <EditDepartmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={onEdit}
        department={department}
      />
    </>
  );
};

export default DepartmentCard;
