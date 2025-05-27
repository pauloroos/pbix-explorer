
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, FileSpreadsheet, CheckCircle, Database, Table, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AnalysisResultsProps {
  results: {
    tables: number;
    measures: number;
    columns: number;
    relationships: number;
  };
  onExport: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results, onExport }) => {
  const { t } = useLanguage();

  const stats = [
    { icon: Table, label: 'Tabelas', value: results.tables, color: 'text-blue-500' },
    { icon: Database, label: 'Medidas', value: results.measures, color: 'text-green-500' },
    { icon: Users, label: 'Colunas', value: results.columns, color: 'text-purple-500' },
    { icon: CheckCircle, label: 'Relacionamentos', value: results.relationships, color: 'text-orange-500' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className="w-8 h-8 text-green-500 animate-pulse-neon" />
          <h2 className="text-2xl font-bold text-green-500">
            {t('analysisComplete')}
          </h2>
        </div>
        <p className="text-muted-foreground">
          {t('analysisResults')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/40 hover:border-neon-blue/50 transition-all duration-300">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center space-y-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/40">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-green-500" />
            <span>Exportar Dados</span>
          </CardTitle>
          <CardDescription>
            Baixe os dados extraídos em formato Excel para análise detalhada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Tabelas</Badge>
              <Badge variant="secondary">Relacionamentos</Badge>
              <Badge variant="secondary">Medidas</Badge>
              <Badge variant="secondary">Colunas</Badge>
            </div>
            <Button 
              onClick={onExport}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2"
            >
              <Download className="w-4 h-4 mr-2" />
              {t('exportExcel')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
