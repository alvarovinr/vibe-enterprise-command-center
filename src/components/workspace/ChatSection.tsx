
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, FileText, Target, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Department } from '@/pages/Index';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

interface ChatSectionProps {
  department: Department;
}

const ChatSection: React.FC<ChatSectionProps> = ({ department }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `¡Hola! Soy tu asistente de IA para el departamento de ${department.name}. Tengo acceso a toda la información del departamento y puedo ayudarte con:

• Análisis de objetivos y tareas
• Creación y gestión de contenido
• Seguimiento de KPIs y métricas
• Programación de eventos
• Organización de archivos
• Sugerencias estratégicas

¿En qué puedo ayudarte hoy?`,
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        '¿Cómo van nuestros objetivos este mes?',
        'Crea una tarea para la campaña de verano',
        'Analiza el rendimiento de nuestros KPIs',
        'Programa una reunión de equipo'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, department);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const generateAIResponse = (userInput: string, dept: Department): ChatMessage => {
    const lowercaseInput = userInput.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];

    if (lowercaseInput.includes('objetivo') || lowercaseInput.includes('meta')) {
      response = `Basándome en los datos del departamento de ${dept.name}, actualmente tienes ${dept.stats.activeGoals} objetivos activos. El progreso general está en un 65% aproximadamente. 

Los objetivos principales incluyen:
• Aumentar visibilidad de marca (65% completado)
• Optimizar conversión web (35% completado)

¿Te gustaría que analice algún objetivo específico o crear uno nuevo?`;
      
      suggestions = [
        'Crea un nuevo objetivo para Q3',
        'Analiza el objetivo de conversión web',
        'Muestra el progreso detallado',
        '¿Qué tareas están pendientes?'
      ];
    } else if (lowercaseInput.includes('tarea') || lowercaseInput.includes('task')) {
      response = `En el departamento de ${dept.name} hay ${dept.stats.totalTasks} tareas en total, de las cuales ${dept.stats.completedTasks} están completadas.

Tareas más urgentes:
• Análisis de UX actual - Vence el 25/06
• Colaboraciones con influencers - En progreso
• Configurar analytics - Pendiente

¿Quieres que cree una nueva tarea o analice alguna existente?`;
      
      suggestions = [
        'Crea una tarea para la campaña',
        'Muestra tareas pendientes',
        'Analiza el progreso de tareas',
        'Asigna una tarea a un miembro'
      ];
    } else if (lowercaseInput.includes('kpi') || lowercaseInput.includes('métrica') || lowercaseInput.includes('rendimiento')) {
      response = `Análisis de KPIs del departamento de ${dept.name}:

📈 **Rendimiento Actual:**
• Tasa de conversión: 3.2% (objetivo: 4.0%)
• Engagement en RRSS: 6.8% (objetivo: 8.0%)
• Tráfico orgánico: +22% vs mes anterior
• ROAS: 280% (objetivo: 300%)

🟢 **Fortalezas:** Engagement y tráfico orgánico
🟡 **Atención:** CAC y tiempo en sitio
🔴 **Riesgo:** ROAS por debajo del objetivo

¿Quieres que profundice en alguna métrica específica?`;
      
      suggestions = [
        'Analiza la tasa de conversión',
        'Mejoras para el ROAS',
        'Estrategia para engagement',
        'Reporte completo de métricas'
      ];
    } else if (lowercaseInput.includes('reunión') || lowercaseInput.includes('meeting') || lowercaseInput.includes('calendario')) {
      response = `Tu calendario del departamento de ${dept.name} tiene los siguientes eventos próximos:

📅 **Esta semana:**
• 15/06 - Reunión planificación Q3 (10:00-11:30)
• 18/06 - Deadline campaña verano
• 20/06 - Presentación a cliente (14:00-15:30)

¿Quieres que programe una nueva reunión o analice la carga de trabajo del equipo?`;
      
      suggestions = [
        'Programa reunión de equipo',
        'Crea un evento recurrente',
        'Analiza disponibilidad del equipo',
        'Ver todos los eventos del mes'
      ];
    } else if (lowercaseInput.includes('archivo') || lowercaseInput.includes('documento') || lowercaseInput.includes('file')) {
      response = `En la biblioteca de archivos del departamento de ${dept.name} hay varios documentos importantes:

📁 **Archivos recientes:**
• Presentación Q2 Marketing.pdf
• Análisis de Competencia.xlsx
• Guía de Estilo 2024.pdf
• Propuesta Influencers.docx

Total: 8 archivos organizados en 3 carpetas principales.

¿Necesitas ayuda para encontrar algo específico o organizar archivos?`;
      
      suggestions = [
        'Busca archivos de campaña',
        'Organiza archivos por fecha',
        'Crea nueva carpeta',
        'Muestra archivos más usados'
      ];
    } else if (lowercaseInput.includes('equipo') || lowercaseInput.includes('miembro') || lowercaseInput.includes('team')) {
      response = `El equipo del departamento de ${dept.name} está compuesto por ${dept.stats.teamMembers} miembros activos:

👥 **Miembros del equipo:**
• María García - Marketing Manager
• Carlos López - Content Specialist  
• Ana Martín - Social Media Manager

**Carga de trabajo actual:**
• María: 6 tareas activas
• Carlos: 4 tareas activas
• Ana: 5 tareas activas

¿Quieres analizar la distribución de trabajo o asignar nuevas tareas?`;
      
      suggestions = [
        'Redistribuir tareas del equipo',
        'Analizar productividad',
        'Asignar nueva tarea',
        'Ver agenda del equipo'
      ];
    } else {
      response = `Entiendo tu consulta sobre el departamento de ${dept.name}. Como tu asistente de IA, puedo ayudarte con múltiples aspectos de la gestión:

🎯 **Gestión de objetivos y tareas**
📊 **Análisis de KPIs y métricas**
📝 **Organización de documentos**
📅 **Programación de eventos**
👥 **Coordinación del equipo**

¿Podrías ser más específico sobre qué aspecto te gustaría que analice o en qué tarea puedo asistirte?`;
      
      suggestions = [
        'Resumen del departamento',
        'Crear plan de acción',
        'Analizar productividad',
        'Sugerir mejoras'
      ];
    }

    return {
      id: (Date.now() + 1).toString(),
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      suggestions
    };
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Asistente de IA</h2>
          <p className="text-gray-600">Chat inteligente con acceso a toda la información del departamento</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          <Sparkles className="w-4 h-4 mr-1" />
          IA Activa
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Asistente IA - {department.name}</CardTitle>
                  <p className="text-sm text-gray-600">Siempre disponible para ayudarte</p>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.sender === 'user' 
                          ? 'bg-gray-200' 
                          : 'bg-gradient-to-r from-purple-500 to-blue-500'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="w-4 h-4 text-gray-600" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      
                      <div className={`rounded-lg p-4 ${
                        message.sender === 'user'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                        <div className={`text-xs mt-2 ${
                          message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {formatTimestamp(message.timestamp)}
                        </div>
                      </div>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.sender === 'ai' && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-gray-600 ml-11">Sugerencias:</p>
                        <div className="ml-11 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-100 transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions Sidebar */}
        <div className="space-y-4">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                size="sm"
                onClick={() => handleSuggestionClick('Crea un resumen del departamento')}
              >
                <Target className="w-4 h-4 mr-2" />
                Resumen Departamento
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                size="sm"
                onClick={() => handleSuggestionClick('Analiza nuestros KPIs actuales')}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Análisis KPIs
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                size="sm"
                onClick={() => handleSuggestionClick('Crea una nueva tarea urgente')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Nueva Tarea
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Capacidades de IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Análisis de datos en tiempo real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Creación automática de tareas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Sugerencias estratégicas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Programación inteligente</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Reportes automáticos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
