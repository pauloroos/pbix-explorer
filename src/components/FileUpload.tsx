
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, File, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing?: boolean;
  progress?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isAnalyzing = false, progress = 0 }) => {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    setError('');
    
    if (fileRejections.length > 0) {
      const rejection = fileRejections[0];
      if (rejection.errors.some((e: any) => e.code === 'file-too-large')) {
        setError('Arquivo muito grande. Tamanho máximo: 200MB');
        return;
      }
      if (rejection.errors.some((e: any) => e.code === 'file-invalid-type')) {
        setError('Tipo de arquivo inválido. Apenas arquivos .PBIX são aceitos');
        return;
      }
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.pbix']
    },
    maxSize: 200 * 1024 * 1024, // 200MB
    multiple: false
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-neon-blue bg-neon-blue/5 scale-105' 
            : 'border-border hover:border-neon-blue/50 hover:bg-muted/50'
          }
          ${selectedFile ? 'border-green-500 bg-green-500/5' : ''}
          ${isAnalyzing ? 'pointer-events-none opacity-75' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {selectedFile ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 animate-pulse-neon" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-green-500">
                  {t('fileSelected')}
                </p>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <File className="w-4 h-4" />
                  <span>{selectedFile.name}</span>
                  <span>({(selectedFile.size / (1024 * 1024)).toFixed(1)} MB)</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <Upload className={`w-16 h-16 ${isDragActive ? 'text-neon-blue animate-glow' : 'text-muted-foreground'}`} />
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {t('uploadArea')}
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>{t('maxSize')}</p>
                  <p>{t('supportedFormat')}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {isAnalyzing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neon-blue"></div>
            <p className="text-sm font-medium">{t('processing')}</p>
            {progress > 0 && (
              <div className="w-48">
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center mt-1">{progress}%</p>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <Alert className="mt-4 border-destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {selectedFile && !isAnalyzing && (
        <div className="mt-6 text-center">
          <Button 
            onClick={() => onFileSelect(selectedFile)}
            className="bg-gradient-to-r from-neon-blue to-neon-purple hover:from-neon-purple hover:to-neon-blue transition-all duration-300 text-white px-8 py-3 text-lg font-medium"
            size="lg"
          >
            {t('analyze')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
