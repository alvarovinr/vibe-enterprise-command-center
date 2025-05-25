
import React from 'react';
import { TrendingUp, TrendingDown, Target, AlertCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Department } from '@/pages/Index';

interface KPISectionProps {
  department: Department;
}

const KPIsSection: React.FC<KPISectionProps> = ({ department }) => {
  const kpis = [
    {
      id: '1',
      name: 'Tasa de Conversión Web',
      currentValue: 3.2,
      targetValue: 4.0,
      unit: '%',
      trend: 'up',
      trendValue: 12,
      status: 'on-track',
      description: 'Porcentaje de visitantes que completan una compra',
      lastUpdated: '2024-06-12'
    },
    {
      id: '2',
      name: 'Costo por Adquisición (CAC)',
      currentValue: 45,
      targetValue: 40,
      unit: '€',
      trend: 'down',
      trendValue: -8,
      status: 'warning',
      description: 'Costo promedio para adquirir un nuevo cliente',
      lastUpdated: '2024-06-12'
    },
    {
      id: '3',
      name: 'Engagement Rate (Redes Sociales)',
      currentValue: 6.8,
      targetValue: 8.0,
      unit: '%',
      trend: 'up',
      trendValue: 15,
      status: 'on-track',
      description: 'Tasa de interacción en publicaciones de redes sociales',
      lastUpdated: '2024-06-11'
    },
    {
      id: '4',
      name: 'Retorno de Inversión Publicitaria',
      currentValue: 280,
      targetValue: 300,
      unit: '%',
      trend: 'up',
      trendValue: 5,
      status: 'at-risk',
      description: 'ROAS de todas las campañas publicitarias',
      lastUpdated: '2024-06-10'
    },
    {
      id: '5',
      name: 'Tráfico Web Orgánico',
      currentValue: 15420,
      targetValue: 18000,
      unit: 'visitas',
      trend: 'up',
      trendValue: 22,
      status: 'on-track',
      description: 'Número de visitas mensuales desde búsqueda orgánica',
      lastUpdated: '2024-06-12'
    },
    {
      id: '6',
      name: 'Tiempo Medio en Sitio',
      currentValue: 2.4,
      targetValue: 3.0,
      unit: 'min',
      trend: 'down',
      trendValue: -5,
      status: 'warning',
      description: 'Tiempo promedio que los usuarios pasan en el sitio web',
      lastUpdated: '2024-06-12'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'at-risk':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-track':
        return 'En camino';
      case 'warning':
        return 'Atención';
      case 'at-risk':
        return 'En riesgo';
      default:
        return 'Sin datos';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">KPIs y Métricas</h2>
          <p className="text-gray-600">Monitorea el rendimiento clave del departamento</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-100">KPIs en Camino</p>
                <p className="text-3xl font-bold">
                  {kpis.filter(kpi => kpi.status === 'on-track').length}
                </p>
              </div>
              <Target className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-yellow-100">Requieren Atención</p>
                <p className="text-3xl font-bold">
                  {kpis.filter(kpi => kpi.status === 'warning').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-red-100">En Riesgo</p>
                <p className="text-3xl font-bold">
                  {kpis.filter(kpi => kpi.status === 'at-risk').length}
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {kpis.map((kpi) => {
          const TrendIcon = getTrendIcon(kpi.trend);
          const progress = calculateProgress(kpi.currentValue, kpi.targetValue);
          
          return (
            <Card key={kpi.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{kpi.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{kpi.description}</p>
                  </div>
                  <Badge className={getStatusColor(kpi.status)}>
                    {getStatusLabel(kpi.status)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                {/* Current vs Target */}
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {kpi.currentValue}{kpi.unit}
                    </div>
                    <div className="text-sm text-gray-600">
                      Objetivo: {kpi.targetValue}{kpi.unit}
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-1 ${getTrendColor(kpi.trend)}`}>
                    <TrendIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {Math.abs(kpi.trendValue)}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progreso hacia objetivo</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={`h-2 ${
                      kpi.status === 'on-track' ? 'bg-green-100' :
                      kpi.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}
                  />
                </div>

                {/* Last Updated */}
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Actualizado: {new Date(kpi.lastUpdated).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Insights Section */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Insights y Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-green-800">Fortalezas</h4>
              <p className="text-sm text-gray-600">
                El engagement en redes sociales y el tráfico orgánico muestran tendencias muy positivas.
              </p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium text-yellow-800">Áreas de Mejora</h4>
              <p className="text-sm text-gray-600">
                El CAC y el tiempo medio en sitio requieren atención para optimizar la eficiencia.
              </p>
            </div>
            
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-medium text-red-800">Acciones Requeridas</h4>
              <p className="text-sm text-gray-600">
                El ROAS está por debajo del objetivo. Revisar segmentación y creatividades publicitarias.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KPIsSection;
