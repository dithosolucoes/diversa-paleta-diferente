
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Terminal, Zap, Shield, Target, Palette, Globe, Code, Download, Upload, Scan, AlertTriangle } from "lucide-react";

const Index = () => {
  const [urls, setUrls] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = async () => {
    if (!urls.trim()) {
      toast.error("Cole pelo menos uma URL para análise");
      return;
    }

    const urlList = urls.split('\n').filter(url => url.trim());
    if (urlList.length > 100) {
      toast.error("Máximo de 100 URLs por análise");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulação de progresso
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResults(true);
          generateMockResults(urlList);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    toast.success(`Iniciando análise de ${urlList.length} sites...`);
  };

  const generateMockResults = (urlList: string[]) => {
    const mockResults = urlList.map((url, index) => ({
      id: index + 1,
      url: url.trim(),
      performance: Math.floor(Math.random() * 40) + 60,
      seo: Math.floor(Math.random() * 40) + 60,
      copywriting: Math.floor(Math.random() * 40) + 60,
      conversion: Math.floor(Math.random() * 40) + 60,
      branding: Math.floor(Math.random() * 40) + 60,
      structure: Math.floor(Math.random() * 40) + 60,
      techStack: ['React', 'WordPress', 'Shopify', 'Next.js'][Math.floor(Math.random() * 4)],
      overallScore: Math.floor(Math.random() * 30) + 70,
      recommendations: [
        "Otimizar imagens para melhor performance",
        "Adicionar meta descriptions em páginas chave",
        "Melhorar CTAs na homepage",
        "Implementar schema markup"
      ]
    }));
    setResults(mockResults);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return "bg-green-400/20";
    if (score >= 70) return "bg-yellow-400/20";
    return "bg-red-400/20";
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header Terminal */}
      <div className="border-b border-green-400/30 bg-black/90 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Terminal className="h-8 w-8 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold">SITE_ANALYZER.exe</h1>
              <p className="text-green-400/70 text-sm">v2.1.0 | Análise Inteligente de Concorrentes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!showResults ? (
          // Input Section
          <div className="space-y-8">
            <Card className="bg-gray-900/50 border-green-400/30 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  INPUT_URLS.txt
                </CardTitle>
                <p className="text-green-400/70 text-sm font-mono">
                  &gt; Cole até 100 URLs (uma por linha) para análise completa
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="https://exemplo1.com&#10;https://exemplo2.com&#10;https://exemplo3.com"
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  className="min-h-[200px] bg-black border-green-400/30 text-green-400 font-mono resize-none focus:border-green-400"
                  disabled={isAnalyzing}
                />
                
                {urls && (
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="border-green-400/30 text-green-400">
                      {urls.split('\n').filter(url => url.trim()).length} URLs detectadas
                    </Badge>
                  </div>
                )}

                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !urls.trim()}
                  className="w-full bg-green-400/20 hover:bg-green-400/30 text-green-400 border border-green-400/30 font-mono"
                >
                  {isAnalyzing ? (
                    <>
                      <Scan className="h-4 w-4 mr-2 animate-spin" />
                      PROCESSANDO...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      INICIAR_ANÁLISE()
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {isAnalyzing && (
              <Card className="bg-gray-900/50 border-green-400/30 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-400">&gt; Status: ANALISANDO...</span>
                      <span className="text-green-400">{analysisProgress}%</span>
                    </div>
                    <Progress 
                      value={analysisProgress} 
                      className="h-2 bg-gray-800 [&>div]:bg-green-400"
                    />
                    <div className="text-xs text-green-400/70 space-y-1">
                      <p>&gt; Extraindo dados de performance...</p>
                      <p>&gt; Analisando SEO e estrutura...</p>
                      <p>&gt; Processando copywriting...</p>
                      <p>&gt; Gerando insights com IA...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          // Results Section
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-green-400">RELATÓRIO_ANÁLISE.json</h2>
                <p className="text-green-400/70 text-sm">
                  {results.length} sites analisados | Gerado em {new Date().toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-green-400/30 text-green-400 hover:bg-green-400/10"
                  onClick={() => setShowResults(false)}
                >
                  Nova Análise
                </Button>
                <Button className="bg-green-400/20 hover:bg-green-400/30 text-green-400 border border-green-400/30">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-gray-900/50 border border-green-400/30">
                <TabsTrigger value="overview" className="data-[state=active]:bg-green-400/20 data-[state=active]:text-green-400">
                  OVERVIEW
                </TabsTrigger>
                <TabsTrigger value="detailed" className="data-[state=active]:bg-green-400/20 data-[state=active]:text-green-400">
                  DETALHADO
                </TabsTrigger>
                <TabsTrigger value="insights" className="data-[state=active]:bg-green-400/20 data-[state=active]:text-green-400">
                  INSIGHTS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card className="bg-gray-900/50 border-green-400/30 backdrop-blur">
                  <CardContent className="pt-6">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-green-400/30">
                          <TableHead className="text-green-400">URL</TableHead>
                          <TableHead className="text-green-400">Score Geral</TableHead>
                          <TableHead className="text-green-400">Performance</TableHead>
                          <TableHead className="text-green-400">SEO</TableHead>
                          <TableHead className="text-green-400">Conversão</TableHead>
                          <TableHead className="text-green-400">Tech Stack</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.map((result) => (
                          <TableRow key={result.id} className="border-green-400/30">
                            <TableCell className="text-green-400 font-mono text-xs max-w-[200px] truncate">
                              {result.url}
                            </TableCell>
                            <TableCell>
                              <Badge className={`${getScoreBg(result.overallScore)} ${getScoreColor(result.overallScore)} border-0`}>
                                {result.overallScore}/100
                              </Badge>
                            </TableCell>
                            <TableCell className={getScoreColor(result.performance)}>
                              {result.performance}
                            </TableCell>
                            <TableCell className={getScoreColor(result.seo)}>
                              {result.seo}
                            </TableCell>
                            <TableCell className={getScoreColor(result.conversion)}>
                              {result.conversion}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-green-400/30 text-green-400/70 text-xs">
                                {result.techStack}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="detailed" className="mt-6">
                <div className="grid gap-6">
                  {results.slice(0, 3).map((result) => (
                    <Card key={result.id} className="bg-gray-900/50 border-green-400/30 backdrop-blur">
                      <CardHeader>
                        <CardTitle className="text-green-400 text-lg font-mono">
                          {result.url}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Zap className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm">Performance</span>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(result.performance)}`}>
                              {result.performance}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-blue-400" />
                              <span className="text-sm">SEO</span>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(result.seo)}`}>
                              {result.seo}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Target className="h-4 w-4 text-red-400" />
                              <span className="text-sm">Conversão</span>
                            </div>
                            <div className={`text-2xl font-bold ${getScoreColor(result.conversion)}`}>
                              {result.conversion}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="text-green-400 font-semibold flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Recomendações Prioritárias:
                          </h4>
                          <ul className="space-y-2">
                            {result.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="text-green-400/80 text-sm flex items-start gap-2">
                                <span className="text-green-400 mt-1">›</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="insights" className="mt-6">
                <div className="grid gap-6">
                  <Card className="bg-gray-900/50 border-green-400/30 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Análise Consolidada - IA
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-black/50 p-4 rounded border border-green-400/20">
                        <h4 className="text-green-400 font-semibold mb-2">Principais Padrões Identificados:</h4>
                        <ul className="space-y-2 text-sm text-green-400/80">
                          <li>• 73% dos sites analisados têm performance abaixo de 80</li>
                          <li>• Falta de otimização para mobile em 60% dos casos</li>
                          <li>• CTAs pouco claros na maioria dos concorrentes</li>
                          <li>• Oportunidade de SEO local subutilizada</li>
                        </ul>
                      </div>
                      
                      <div className="bg-black/50 p-4 rounded border border-green-400/20">
                        <h4 className="text-green-400 font-semibold mb-2">Recomendações Estratégicas:</h4>
                        <ul className="space-y-2 text-sm text-green-400/80">
                          <li>• Foque em performance - diferencial competitivo claro</li>
                          <li>• Implemente schema markup para se destacar no SEO</li>
                          <li>• Otimize funil de conversão com testes A/B</li>
                          <li>• Aproveite gaps de conteúdo identificados</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
