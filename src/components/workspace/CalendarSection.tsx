
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Department } from '@/pages/Index';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  type: 'meeting' | 'deadline' | 'task' | 'reminder';
  attendees: string[];
  color: string;
}

interface CalendarSectionProps {
  department: Department;
}

const CalendarSection: React.FC<CalendarSectionProps> = ({ department }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Reunión de planificación Q3',
      description: 'Revisión de objetivos y estrategias para el tercer trimestre',
      startDate: '2024-06-15',
      endDate: '2024-06-15',
      startTime: '10:00',
      endTime: '11:30',
      type: 'meeting',
      attendees: ['María García', 'Carlos López', 'Ana Martín'],
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Entrega campaña verano',
      description: 'Deadline para la entrega final de la campaña de verano',
      startDate: '2024-06-18',
      endDate: '2024-06-18',
      startTime: '17:00',
      endTime: '17:00',
      type: 'deadline',
      attendees: ['Ana Martín'],
      color: 'bg-red-500'
    },
    {
      id: '3',
      title: 'Presentación a cliente',
      description: 'Presentación de propuesta de marketing para nuevo cliente',
      startDate: '2024-06-20',
      endDate: '2024-06-20',
      startTime: '14:00',
      endTime: '15:30',
      type: 'meeting',
      attendees: ['María García', 'Carlos López'],
      color: 'bg-purple-500'
    },
    {
      id: '4',
      title: 'Análisis de métricas',
      description: 'Revisar KPIs y métricas del mes',
      startDate: '2024-06-22',
      endDate: '2024-06-22',
      startTime: '09:00',
      endTime: '10:00',
      type: 'task',
      attendees: ['María García'],
      color: 'bg-green-500'
    },
    {
      id: '5',
      title: 'Llamada con influencers',
      description: 'Reunión para coordinar colaboraciones',
      startDate: '2024-06-25',
      endDate: '2024-06-25',
      startTime: '16:00',
      endTime: '17:00',
      type: 'meeting',
      attendees: ['Ana Martín', 'Carlos López'],
      color: 'bg-orange-500'
    }
  ];

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    
    // Ajustar para que la semana empiece en lunes
    const dayOfWeek = (firstDay.getDay() + 6) % 7;
    startDate.setDate(firstDay.getDate() - dayOfWeek);

    const days = [];
    const currentDay = new Date(startDate);

    while (currentDay <= lastDay || days.length % 7 !== 0) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.startDate === dateString);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'Reunión';
      case 'deadline':
        return 'Entrega';
      case 'task':
        return 'Tarea';
      case 'reminder':
        return 'Recordatorio';
      default:
        return 'Evento';
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'task':
        return 'bg-green-100 text-green-800';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendario</h2>
          <p className="text-gray-600">Gestiona eventos, reuniones y deadlines</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Evento
        </Button>
      </div>

      {/* Calendar Navigation */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="text-xl font-semibold min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <Button variant="outline" size="sm" onClick={() => navigateMonth(1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          {['month', 'week', 'day'].map((viewType) => (
            <Button
              key={viewType}
              variant={view === viewType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView(viewType as 'month' | 'week' | 'day')}
            >
              {viewType === 'month' ? 'Mes' : viewType === 'week' ? 'Semana' : 'Día'}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              {/* Week Days Header */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDate(day);
                  const isCurrentMonthDay = isCurrentMonth(day);
                  const isTodayDay = isToday(day);

                  return (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-gray-200 rounded-lg ${
                        isCurrentMonthDay ? 'bg-white' : 'bg-gray-50'
                      } ${isTodayDay ? 'ring-2 ring-purple-500' : ''}`}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'
                      } ${isTodayDay ? 'text-purple-600' : ''}`}>
                        {day.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate cursor-pointer ${event.color}`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dayEvents.length - 2} más
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Próximos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events
                .filter(event => new Date(event.startDate) >= new Date())
                .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                .slice(0, 5)
                .map((event) => (
                  <div key={event.id} className="border-l-4 pl-4 py-2" style={{borderColor: event.color.replace('bg-', '').replace('-500', '')}}>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium text-sm text-gray-900">{event.title}</h4>
                      <Badge className={getEventTypeColor(event.type)}>
                        {getEventTypeLabel(event.type)}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center space-x-2">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{new Date(event.startDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Users className="w-3 h-3" />
                        <span>{event.attendees.length} participantes</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Reunión
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Añadir Deadline
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Evento Recurrente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
