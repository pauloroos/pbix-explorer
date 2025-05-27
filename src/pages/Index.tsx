
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import FileUpload from '@/components/FileUpload';
import FeatureCard from '@/components/FeatureCard';
import AnalysisResults from '@/components/AnalysisResults';
import { Zap, FileSpreadsheet, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const IndexContent: React.FC = () => {
  const { t } = useLanguage();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResults, setAnalysisResults] = useState({
    tables: 0,
    measures: 0,
    columns: 0,
    relationships: 0
  });

  const handleFileSelect = async (file: File) => {
    console.log('File selected:', file.name, file.size);
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisComplete(false);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      // Here you would make the actual API call to your Python backend
      // For demonstration, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate analysis results
      const mockResults = {
        tables: Math.floor(Math.random() * 20) + 5,
        measures: Math.floor(Math.random() * 50) + 10,
        columns: Math.floor(Math.random() * 200) + 50,
        relationships: Math.floor(Math.random() * 15) + 3
      };

      setAnalysisProgress(100);
      setAnalysisResults(mockResults);
      setAnalysisComplete(true);
      
      toast.success(t('analysisComplete'));
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Erro durante a análise do arquivo');
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    console.log('Exporting to Excel...');
    toast.success('Exportação iniciada! O download começará em breve.');
    
    // Here you would trigger the actual Excel export from your backend
    // For demonstration, we'll simulate a download
    setTimeout(() => {
      toast.success('Arquivo Excel gerado com sucesso!');
    }, 2000);
  };

  const features = [
    {
      icon: Zap,
      title: t('feature1'),
      description: t('feature1Desc'),
      delay: 0
    },
    {
      icon: FileSpreadsheet,
      title: t('feature2'),
      description: t('feature2Desc'),
      delay: 200
    },
    {
      icon: Shield,
      title: t('feature3'),
      description: t('feature3Desc'),
      delay: 400
    }
  ];

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-pulse-neon">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Sistema online e seguro</span>
            <ArrowRight className="w-4 h-4" />
            <span>Processamento em tempo real</span>
            <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="mb-16">
          {!analysisComplete ? (
            <FileUpload 
              onFileSelect={handleFileSelect}
              isAnalyzing={isAnalyzing}
              progress={analysisProgress}
            />
          ) : (
            <AnalysisResults 
              results={analysisResults}
              onExport={handleExport}
            />
          )}
        </div>

        {/* Features Section */}
        {!analysisComplete && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 neon-text">
                {t('features')}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Nossa plataforma oferece análise avançada e segura de arquivos Power BI com tecnologia de ponta
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={feature.delay}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <IndexContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
