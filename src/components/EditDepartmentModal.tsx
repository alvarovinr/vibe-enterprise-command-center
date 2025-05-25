
import React, { useState, useEffect } from 'react';
import { Target, Users, Calendar, BarChart3, Brain, FileText, Settings, Heart, Zap } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Department } from '@/pages/Index';

interface EditDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (department: Department) => void;
  department: Department;
}

const colorOptions = [
  'bg-gradient-to-br from-purple-500 to-pink-500',
  'bg-gradient-to-br from-blue-500 to-cyan-500',
  'bg-gradient-to-br from-green-500 to-emerald-500',
  'bg-gradient-to-br from-orange-500 to-red-500',
  'bg-gradient-to-br from-indigo-500 to-purple-500',
  'bg-gradient-to-br from-teal-500 to-blue-500',
  'bg-gradient-to-br from-rose-500 to-pink-500',
  'bg-gradient-to-br from-amber-500 to-orange-500',
];

const iconOptions = [
  { name: 'Target', component: Target },
  { name: 'Users', component: Users },
  { name: 'Calendar', component: Calendar },
  { name: 'BarChart3', component: BarChart3 },
  { name: 'Brain', component: Brain },
  { name: 'FileText', component: FileText },
  { name: 'Settings', component: Settings },
  { name: 'Heart', component: Heart },
  { name: 'Zap', component: Zap },
];

const EditDepartmentModal: React.FC<EditDepartmentModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  department
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: colorOptions[0],
    icon: 'Target'
  });

  useEffect(() => {
    if (department) {
      setFormData({
        name: department.name,
        description: department.description,
        color: department.color,
        icon: department.icon
      });
    }
  }, [department]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onUpdate({
        ...department,
        ...formData
      });
      onClose();
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconObj = iconOptions.find(icon => icon.name === iconName);
    const IconComponent = iconObj?.component || Target;
    return <IconComponent className="w-5 h-5 text-white" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Editar Departamento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Departamento</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="ej. Marketing, Desarrollo, Ventas..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe las funciones y objetivos de este departamento..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Color del Departamento</Label>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-12 h-12 ${color} rounded-lg border-2 ${
                    formData.color === color ? 'border-gray-900' : 'border-transparent'
                  } transition-all duration-200 hover:scale-110`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Icono del Departamento</Label>
            <div className="grid grid-cols-5 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon.name}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon: icon.name }))}
                  className={`w-12 h-12 ${formData.color} rounded-lg flex items-center justify-center border-2 ${
                    formData.icon === icon.name ? 'border-gray-900' : 'border-transparent'
                  } transition-all duration-200 hover:scale-110`}
                >
                  <icon.component className="w-5 h-5 text-white" />
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <Label className="text-sm text-gray-600 mb-2 block">Vista Previa:</Label>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${formData.color} rounded-lg flex items-center justify-center`}>
                {getIconComponent(formData.icon)}
              </div>
              <div>
                <div className="font-semibold text-gray-900">
                  {formData.name || 'Nombre del Departamento'}
                </div>
                <div className="text-sm text-gray-600">
                  {formData.description || 'Descripción del departamento'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              Actualizar Departamento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDepartmentModal;
