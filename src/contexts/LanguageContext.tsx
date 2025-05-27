
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'es';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
  };
}

const translations: Translations = {
  title: {
    pt: 'Analisador PBIX',
    en: 'PBIX Analyzer',
    es: 'Analizador PBIX'
  },
  subtitle: {
    pt: 'Extraia e analise dados de arquivos Power BI',
    en: 'Extract and analyze data from Power BI files',
    es: 'Extraer y analizar datos de archivos Power BI'
  },
  uploadArea: {
    pt: 'Arraste e solte seu arquivo .PBIX aqui ou clique para selecionar',
    en: 'Drag and drop your .PBIX file here or click to select',
    es: 'Arrastra y suelta tu archivo .PBIX aquí o haz clic para seleccionar'
  },
  maxSize: {
    pt: 'Tamanho máximo: 200MB',
    en: 'Maximum size: 200MB',
    es: 'Tamaño máximo: 200MB'
  },
  supportedFormat: {
    pt: 'Formato suportado: .PBIX',
    en: 'Supported format: .PBIX',
    es: 'Formato soportado: .PBIX'
  },
  analyze: {
    pt: 'Analisar Arquivo',
    en: 'Analyze File',
    es: 'Analizar Archivo'
  },
  analyzing: {
    pt: 'Analisando...',
    en: 'Analyzing...',
    es: 'Analizando...'
  },
  exportExcel: {
    pt: 'Exportar para Excel',
    en: 'Export to Excel',
    es: 'Exportar a Excel'
  },
  features: {
    pt: 'Recursos',
    en: 'Features',
    es: 'Características'
  },
  feature1: {
    pt: 'Análise Rápida',
    en: 'Fast Analysis',
    es: 'Análisis Rápido'
  },
  feature1Desc: {
    pt: 'Processamento eficiente de arquivos PBIX',
    en: 'Efficient processing of PBIX files',
    es: 'Procesamiento eficiente de archivos PBIX'
  },
  feature2: {
    pt: 'Exportação Excel',
    en: 'Excel Export',
    es: 'Exportación Excel'
  },
  feature2Desc: {
    pt: 'Exporte dados extraídos diretamente para Excel',
    en: 'Export extracted data directly to Excel',
    es: 'Exportar datos extraídos directamente a Excel'
  },
  feature3: {
    pt: 'Processamento Seguro',
    en: 'Secure Processing',
    es: 'Procesamiento Seguro'
  },
  feature3Desc: {
    pt: 'Seus arquivos são processados com segurança',
    en: 'Your files are processed securely',
    es: 'Tus archivos se procesan de forma segura'
  },
  fileSelected: {
    pt: 'Arquivo selecionado',
    en: 'File selected',
    es: 'Archivo seleccionado'
  },
  analysisComplete: {
    pt: 'Análise concluída com sucesso!',
    en: 'Analysis completed successfully!',
    es: '¡Análisis completado exitosamente!'
  },
  analysisResults: {
    pt: 'Resultados da Análise',
    en: 'Analysis Results',
    es: 'Resultados del Análisis'
  },
  processing: {
    pt: 'Processando arquivo...',
    en: 'Processing file...',
    es: 'Procesando archivo...'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
