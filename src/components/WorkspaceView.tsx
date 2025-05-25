
import React, { useState } from 'react';
import { ArrowLeft, Target, Kanban, FileText, BarChart3, FolderOpen, Calendar, MessageSquare, Settings } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Department } from '@/pages/Index';
import ObjectivesSection from './workspace/ObjectivesSection';
import KanbanSection from './workspace/KanbanSection';
import NotesSection from './workspace/NotesSection';
import KPIsSection from './workspace/KPIsSection';
import FilesSection from './workspace/FilesSection';
import CalendarSection from './workspace/CalendarSection';
import ChatSection from './workspace/ChatSection';

interface WorkspaceViewProps {
  department: Department;
  onBack: () => void;
  onUpdateDepartment: (department: Department) => void;
}

type WorkspaceTab = 'objectives' | 'kanban' | 'notes' | 'kpis' | 'files' | 'calendar' | 'chat';

const WorkspaceView: React.FC<WorkspaceViewProps> = ({
  department,
  onBack,
  onUpdateDepartment
}) => {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('objectives');

  const tabs = [
    { id: 'objectives' as WorkspaceTab, label: 'Objetivos', icon: Target },
    { id: 'kanban' as WorkspaceTab, label: 'Kanban', icon: Kanban },
    { id: 'notes' as WorkspaceTab, label: 'Notas', icon: FileText },
    { id: 'kpis' as WorkspaceTab, label: 'KPIs', icon: BarChart3 },
    { id: 'files' as WorkspaceTab, label: 'Archivos', icon: FolderOpen },
    { id: 'calendar' as WorkspaceTab, label: 'Calendario', icon: Calendar },
    { id: 'chat' as WorkspaceTab, label: 'Chat IA', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'objectives':
        return <ObjectivesSection department={department} />;
      case 'kanban':
        return <KanbanSection department={department} />;
      case 'notes':
        return <NotesSection department={department} />;
      case 'kpis':
        return <KPIsSection department={department} />;
      case 'files':
        return <FilesSection department={department} />;
      case 'calendar':
        return <CalendarSection department={department} />;
      case 'chat':
        return <ChatSection department={department} />;
      default:
        return <ObjectivesSection department={department} />;
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      Target,
      Users: Target,
      Calendar,
      BarChart3
    };
    const IconComponent = icons[iconName] || Target;
    return <IconComponent className="w-5 h-5 text-white" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver</span>
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${department.color} rounded-lg flex items-center justify-center`}>
                  {getIconComponent(department.icon)}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">{department.name}</h1>
                  <p className="text-sm text-gray-600">{department.description}</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default WorkspaceView;
