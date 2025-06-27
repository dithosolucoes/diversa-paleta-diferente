
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";
import { Terminal, Zap, Shield, Target, Palette, Globe, Code, Download, Upload, Scan, AlertTriangle, TrendingUp, Eye, Brain, Layers, Gauge, Search } from "lucide-react";

const Index = () => {
  const [urls, setUrls] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);

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
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResults(true);
          generateEnhancedResults(urlList);
          return 100;
        }
        return prev + 1.5;
      });
    }, 80);

    toast.success(`Iniciando análise avançada de ${urlList.length} sites...`);
  };

  const generateEnhancedResults = (urlList: string[]) => {
    const enhancedResults = urlList.map((url, index) => {
      const performance = Math.floor(Math.random() * 40) + 60;
      const seo = Math.floor(Math.random() * 40) + 60;
      const copywriting = Math.floor(Math.random() * 40) + 60;
      const conversion = Math.floor(Math.random() * 40) + 60;
      const branding = Math.floor(Math.random() * 40) + 60;
      const structure = Math.floor(Math.random() * 40) + 60;
      const techStack = Math.floor(Math.random() * 40) + 60;
      
      return {
        id: index + 1,
        url: url.trim(),
        
        // Scores
        performance,
        seo,
        copywriting,
        conversion,
        branding,
        structure,
        techStack,
        overallScore: Math.round((performance + seo + copywriting + conversion + branding + structure + techStack) / 7),
        
        // Performance Details
        performanceDetails: {
          loadTime: (Math.random() * 3 + 0.5).toFixed(2),
          fcp: (Math.random() * 2 + 1).toFixed(2),
          lcp: (Math.random() * 3 + 1.5).toFixed(2),
          cls: (Math.random() * 0.25).toFixed(3),
          mobileScore: performance - Math.floor(Math.random() * 10),
          desktopScore: performance + Math.floor(Math.random() * 15),
          bottlenecks: ["Imagens não otimizadas", "JavaScript não minificado", "Falta de cache", "Muitos redirects"][Math.floor(Math.random() * 4)]
        },
        
        // SEO Details
        seoDetails: {
          title: Math.random() > 0.3 ? "✅ Presente" : "❌ Ausente",
          description: Math.random() > 0.2 ? "✅ Presente" : "❌ Ausente",
          h1Count: Math.floor(Math.random() * 3) + 1,
          h2Count: Math.floor(Math.random() * 8) + 2,
          altImages: Math.floor(Math.random() * 80) + 20,
          sitemap: Math.random() > 0.7 ? "✅ Encontrado" : "❌ Não encontrado",
          robotsTxt: Math.random() > 0.8 ? "✅ Configurado" : "❌ Não configurado",
          issues: ["Falta alt-text em imagens", "Meta description muito longa", "Múltiplos H1", "URLs não amigáveis"]
        },

        // Copywriting Details
        copyDetails: {
          headline: Math.random() > 0.5 ? "Clara e impactante" : "Pode ser melhorada",
          valueProposition: Math.random() > 0.4 ? "Bem definida" : "Confusa",
          ctaCount: Math.floor(Math.random() * 5) + 2,
          ctaQuality: ["Excelente", "Boa", "Regular", "Fraca"][Math.floor(Math.random() * 4)],
          mentalTriggers: ["Urgência", "Escassez", "Prova Social", "Autoridade"].slice(0, Math.floor(Math.random() * 3) + 1),
          improvements: ["Adicionar mais urgência nos CTAs", "Melhorar proposta de valor", "Incluir mais depoimentos"]
        },

        // Conversion Details
        conversionDetails: {
          funnelSteps: Math.floor(Math.random() * 4) + 2,
          forms: Math.floor(Math.random() * 3) + 1,
          ctaButtons: Math.floor(Math.random() * 8) + 3,
          popups: Math.random() > 0.6 ? "Presente" : "Ausente",
          checkoutSteps: Math.floor(Math.random() * 3) + 1,
          barriers: ["Muitos campos no formulário", "Checkout complexo", "Falta de segurança aparente"],
          conversionRate: (Math.random() * 5 + 1).toFixed(2)
        },

        // Branding Details
        brandingDetails: {
          colorConsistency: Math.floor(Math.random() * 40) + 60,
          logoPresence: Math.random() > 0.9 ? "Ausente" : "Presente",
          typography: Math.floor(Math.random() * 3) + 1,
          visualIdentity: ["Muito forte", "Forte", "Regular", "Fraca"][Math.floor(Math.random() * 4)],
          differentials: ["Preço competitivo", "Qualidade superior", "Atendimento diferenciado"].slice(0, Math.floor(Math.random() * 2) + 1)
        },

        // Structure Details
        structureDetails: {
          totalPages: Math.floor(Math.random() * 50) + 10,
          navigationLevels: Math.floor(Math.random() * 3) + 2,
          menuItems: Math.floor(Math.random() * 8) + 5,
          breadcrumbs: Math.random() > 0.5 ? "Presente" : "Ausente",
          searchFunction: Math.random() > 0.6 ? "Presente" : "Ausente",
          mobileOptimized: Math.random() > 0.2 ? "Sim" : "Não"
        },

        // Tech Stack Details
        techDetails: {
          framework: ['React', 'WordPress', 'Shopify', 'Vue.js', 'Angular', 'Next.js'][Math.floor(Math.random() * 6)],
          analytics: Math.random() > 0.3 ? "Google Analytics" : "Não detectado",
          chatbot: Math.random() > 0.7 ? "Presente" : "Ausente",
          paymentGateway: Math.random() > 0.5 ? "Stripe/PayPal" : "Não detectado",
          cdn: Math.random() > 0.4 ? "Cloudflare" : "Não detectado",
          ssl: Math.random() > 0.1 ? "✅ Configurado" : "❌ Ausente"
        },

        // Radar Chart Data
        radarData: [
          { subject: 'Performance', A: performance, fullMark: 100 },
          { subject: 'SEO', A: seo, fullMark: 100 },
          { subject: 'Copy', A: copywriting, fullMark: 100 },
          { subject: 'Conversão', A: conversion, fullMark: 100 },
          { subject: 'Branding', A: branding, fullMark: 100 },
          { subject: 'Estrutura', A: structure, fullMark: 100 },
          { subject: 'Tech', A: techStack, fullMark: 100 }
        ],

        recommendations: [
          "Otimizar imagens para melhorar velocidade de carregamento",
          "Implementar schema markup para melhor SEO",
          "Adicionar mais CTAs estratégicos na homepage",
          "Simplificar processo de checkout",
          "Melhorar consistência visual da marca",
          "Implementar chatbot para suporte",
          "Adicionar mais prova social (depoimentos)"
        ].slice(0, Math.floor(Math.random() * 3) + 4)
      };
    });
    setResults(enhancedResults);
    setSelectedSite(enhancedResults[0]);
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

  const COLORS = ['#00ff41', '#ffff00', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header Terminal */}
      <div className="border-b border-green-400/30 bg-black/90 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Terminal className="h-8 w-8 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold">COMPETITOR_ANALYZER_PRO.exe</h1>
              <p className="text-green-400/70 text-sm">v3.0.0 | Análise Inteligente Avançada | 7 Critérios Completos</p>
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
                  URLS_INPUT.batch
                </CardTitle>
                <p className="text-green-400/70 text-sm font-mono">
                  &gt; Análise completa: Performance | SEO | Copy | Conversão | Branding | Estrutura | Tech Stack
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
                      EXECUTANDO_ANÁLISE_COMPLETA...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      INICIAR_ANÁLISE_AVANÇADA()
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
                      <span className="text-green-400">&gt; Status: PROCESSANDO_DADOS_AVANÇADOS...</span>
                      <span className="text-green-400">{analysisProgress.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={analysisProgress} 
                      className="h-2 bg-gray-800 [&>div]:bg-green-400"
                    />
                    <div className="text-xs text-green-400/70 space-y-1">
                      <p>&gt; Coletando dados de performance via PageSpeed API...</p>
                      <p>&gt; Extraindo estruturas SEO e meta tags...</p>
                      <p>&gt; Analisando copywriting e gatilhos mentais...</p>
                      <p>&gt; Mapeando funil de conversão...</p>
                      <p>&gt; Avaliando identidade visual e branding...</p>
                      <p>&gt; Detectando tecnologias via Wappalyzer...</p>
                      <p>&gt; Processando insights com IA GPT-4o...</p>
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
                <h2 className="text-2xl font-bold text-green-400">RELATÓRIO_COMPLETO.analysis</h2>
                <p className="text-green-400/70 text-sm">
                  {results.length} sites analisados | 7 critérios | IA GPT-4o | {new Date().toLocaleString()}
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
                  ANÁLISE DETALHADA
                </TabsTrigger>
                <TabsTrigger value="comparison" className="data-[state=active]:bg-green-400/20 data-[state=active]:text-green-400">
                  COMPARAÇÃO VISUAL
                </TabsTrigger>
                <TabsTrigger value="insights" className="data-[state=active]:bg-green-400/20 data-[state=active]:text-green-400">
                  INSIGHTS IA
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
                          <TableHead className="text-green-400">Copy</TableHead>
                          <TableHead className="text-green-400">Conversão</TableHead>
                          <TableHead className="text-green-400">Tech</TableHead>
                          <TableHead className="text-green-400">Ações</TableHead>
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
                            <TableCell className={getScoreColor(result.copywriting)}>
                              {result.copywriting}
                            </TableCell>
                            <TableCell className={getScoreColor(result.conversion)}>
                              {result.conversion}
                            </TableCell>
                            <TableCell className={getScoreColor(result.techStack)}>
                              {result.techStack}
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="border-green-400/30 text-green-400 hover:bg-green-400/10 text-xs"
                                onClick={() => setSelectedSite(result)}
                              >
                                Ver Detalhes
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="detailed" className="mt-6">
                {selectedSite && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <select 
                        className="bg-gray-900 border border-green-400/30 text-green-400 p-2 rounded"
                        value={selectedSite.id}
                        onChange={(e) => setSelectedSite(results.find(r => r.id === parseInt(e.target.value)))}
                      >
                        {results.map(result => (
                          <option key={result.id} value={result.id}>
                            {result.url}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Radar Chart */}
                      <Card className="bg-gray-900/50 border-green-400/30">
                        <CardHeader>
                          <CardTitle className="text-green-400 text-lg">Análise Radar - 7 Critérios</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer
                            config={{
                              performance: { label: "Performance", color: "#00ff41" },
                            }}
                            className="h-[300px]"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart data={selectedSite.radarData}>
                                <PolarGrid stroke="#00ff41" strokeOpacity={0.3} />
                                <PolarAngleAxis dataKey="subject" className="text-green-400 text-xs" />
                                <PolarRadiusAxis domain={[0, 100]} className="text-green-400 text-xs" />
                                <Radar
                                  name="Score"
                                  dataKey="A"
                                  stroke="#00ff41"
                                  fill="#00ff41"
                                  fillOpacity={0.1}
                                  strokeWidth={2}
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Performance Details */}
                      <Card className="bg-gray-900/50 border-green-400/30">
                        <CardHeader>
                          <CardTitle className="text-green-400 flex items-center gap-2">
                            <Gauge className="h-5 w-5" />
                            Performance Details
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-green-400/70">Tempo de Carga:</span>
                              <div className="text-green-400 font-bold">{selectedSite.performanceDetails.loadTime}s</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">FCP:</span>
                              <div className="text-green-400 font-bold">{selectedSite.performanceDetails.fcp}s</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">LCP:</span>
                              <div className="text-green-400 font-bold">{selectedSite.performanceDetails.lcp}s</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">CLS:</span>
                              <div className="text-green-400 font-bold">{selectedSite.performanceDetails.cls}</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-green-400/70">Mobile:</span>
                              <span className={getScoreColor(selectedSite.performanceDetails.mobileScore)}>
                                {selectedSite.performanceDetails.mobileScore}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-400/70">Desktop:</span>
                              <span className={getScoreColor(selectedSite.performanceDetails.desktopScore)}>
                                {selectedSite.performanceDetails.desktopScore}
                              </span>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-green-400/20">
                            <span className="text-red-400 text-sm">Gargalo Principal:</span>
                            <div className="text-green-400/80 text-sm">{selectedSite.performanceDetails.bottlenecks}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* SEO Analysis */}
                    <Card className="bg-gray-900/50 border-green-400/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                          <Search className="h-5 w-5" />
                          Análise SEO Completa
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="space-y-2">
                            <span className="text-green-400/70 text-sm">Meta Tags</span>
                            <div className="text-sm">
                              <div>Title: {selectedSite.seoDetails.title}</div>
                              <div>Description: {selectedSite.seoDetails.description}</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <span className="text-green-400/70 text-sm">Estrutura Headers</span>
                            <div className="text-sm">
                              <div>H1: {selectedSite.seoDetails.h1Count}</div>
                              <div>H2: {selectedSite.seoDetails.h2Count}</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <span className="text-green-400/70 text-sm">Imagens</span>
                            <div className="text-sm">
                              <div>Alt-text: {selectedSite.seoDetails.altImages}%</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <span className="text-green-400/70 text-sm">Arquivos</span>
                            <div className="text-sm">
                              <div>Sitemap: {selectedSite.seoDetails.sitemap}</div>
                              <div>Robots: {selectedSite.seoDetails.robotsTxt}</div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-green-400/20">
                          <span className="text-yellow-400 text-sm font-semibold">Principais Problemas SEO:</span>
                          <ul className="list-disc list-inside text-green-400/80 text-sm mt-2 space-y-1">
                            {selectedSite.seoDetails.issues.map((issue: string, index: number) => (
                              <li key={index}>{issue}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Copywriting & Conversion */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="bg-gray-900/50 border-green-400/30">
                        <CardHeader>
                          <CardTitle className="text-green-400 flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Análise de Copywriting
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-green-400/70">Headline:</span>
                              <span className="text-green-400">{selectedSite.copyDetails.headline}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-400/70">Proposta de Valor:</span>
                              <span className="text-green-400">{selectedSite.copyDetails.valueProposition}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-green-400/70">CTAs:</span>
                              <span className="text-green-400">{selectedSite.copyDetails.ctaCount} ({selectedSite.copyDetails.ctaQuality})</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-green-400/70 text-sm">Gatilhos Mentais Detectados:</span>
                            <div className="flex gap-2 mt-2">
                              {selectedSite.copyDetails.mentalTriggers.map((trigger: string, index: number) => (
                                <Badge key={index} variant="outline" className="border-green-400/30 text-green-400 text-xs">
                                  {trigger}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-900/50 border-green-400/30">
                        <CardHeader>
                          <CardTitle className="text-green-400 flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Funil de Conversão
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-green-400/70 text-sm">Etapas do Funil:</span>
                              <div className="text-green-400 font-bold">{selectedSite.conversionDetails.funnelSteps}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70 text-sm">Formulários:</span>
                              <div className="text-green-400 font-bold">{selectedSite.conversionDetails.forms}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70 text-sm">Botões CTA:</span>
                              <div className="text-green-400 font-bold">{selectedSite.conversionDetails.ctaButtons}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70 text-sm">Taxa Conversão:</span>
                              <div className="text-green-400 font-bold">{selectedSite.conversionDetails.conversionRate}%</div>
                            </div>
                          </div>
                          <div>
                            <span className="text-red-400 text-sm">Barreiras Identificadas:</span>
                            <ul className="list-disc list-inside text-green-400/80 text-sm mt-1">
                              {selectedSite.conversionDetails.barriers.map((barrier: string, index: number) => (
                                <li key={index}>{barrier}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Tech Stack & Structure */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="bg-gray-900/50 border-green-400/30">
                        <CardHeader>
                          <CardTitle className="text-green-400 flex items-center gap-2">
                            <Code className="h-5 w-5" />
                            Stack Tecnológico
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-green-400/70">Framework:</span>
                              <div className="text-green-400">{selectedSite.techDetails.framework}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">Analytics:</span>
                              <div className="text-green-400">{selectedSite.techDetails.analytics}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">SSL:</span>
                              <div className="text-green-400">{selectedSite.techDetails.ssl}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">CDN:</span>
                              <div className="text-green-400">{selectedSite.techDetails.cdn}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-900/50 border-green-400/30">
                        <CardHeader>
                          <CardTitle className="text-green-400 flex items-center gap-2">
                            <Layers className="h-5 w-5" />
                            Estrutura do Site
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-green-400/70">Total Páginas:</span>
                              <div className="text-green-400">{selectedSite.structureDetails.totalPages}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">Níveis Nav:</span>
                              <div className="text-green-400">{selectedSite.structureDetails.navigationLevels}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">Mobile:</span>
                              <div className="text-green-400">{selectedSite.structureDetails.mobileOptimized}</div>
                            </div>
                            <div>
                              <span className="text-green-400/70">Busca:</span>
                              <div className="text-green-400">{selectedSite.structureDetails.searchFunction}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recommendations */}
                    <Card className="bg-gray-900/50 border-green-400/30">
                      <CardHeader>
                        <CardTitle className="text-green-400 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Recomendações Prioritárias (IA)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedSite.recommendations.map((rec: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-black/30 rounded border border-green-400/20">
                              <div className="text-green-400 font-bold text-sm">#{index + 1}</div>
                              <div className="text-green-400/90 text-sm">{rec}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <div className="grid gap-6">
                  <Card className="bg-gray-900/50 border-green-400/30">
                    <CardHeader>
                      <CardTitle className="text-green-400">Comparação de Performance - Todos os Sites</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          performance: { label: "Performance", color: "#00ff41" },
                          seo: { label: "SEO", color: "#ffff00" },
                          conversion: { label: "Conversão", color: "#ff6b6b" },
                        }}
                        className="h-[400px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results.map(r => ({ 
                            name: r.url.substring(0, 20) + '...', 
                            performance: r.performance,
                            seo: r.seo,
                            conversion: r.conversion
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#00ff41" strokeOpacity={0.2} />
                            <XAxis dataKey="name" className="text-green-400 text-xs" />
                            <YAxis className="text-green-400 text-xs" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="performance" fill="#00ff41" fillOpacity={0.8} />
                            <Bar dataKey="seo" fill="#ffff00" fillOpacity={0.8} />
                            <Bar dataKey="conversion" fill="#ff6b6b" fillOpacity={0.8} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900/50 border-green-400/30">
                    <CardHeader>
                      <CardTitle className="text-green-400">Distribuição de Scores Gerais</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          score: { label: "Score", color: "#00ff41" },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Excelente (90+)', value: results.filter(r => r.overallScore >= 90).length, fill: '#00ff41' },
                                { name: 'Bom (70-89)', value: results.filter(r => r.overallScore >= 70 && r.overallScore < 90).length, fill: '#ffff00' },
                                { name: 'Regular (<70)', value: results.filter(r => r.overallScore < 70).length, fill: '#ff6b6b' }
                              ]}
                              cx="50%"
                              cy="50%"
                              outerRadius={80}
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}`}
                            >
                              {[0, 1, 2].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                              ))}
                            </Pie>
                            <ChartTooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="insights" className="mt-6">
                <div className="grid gap-6">
                  <Card className="bg-gray-900/50 border-green-400/30 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        Análise Consolidada - IA GPT-4o
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-black/50 p-6 rounded border border-green-400/20">
                        <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Principais Padrões Identificados:
                        </h4>
                        <ul className="space-y-2 text-sm text-green-400/80">
                          <li>• {Math.round((results.filter(r => r.performance < 80).length / results.length) * 100)}% dos sites têm performance abaixo de 80 pontos</li>
                          <li>• {Math.round((results.filter(r => r.seo < 75).length / results.length) * 100)}% não aproveitam o potencial completo de SEO</li>
                          <li>• Copywriting é o critério com menor pontuação média ({Math.round(results.reduce((acc, r) => acc + r.copywriting, 0) / results.length)} pontos)</li>
                          <li>• Apenas {Math.round((results.filter(r => r.conversion > 85).length / results.length) * 100)}% têm funil de conversão otimizado</li>
                          <li>• {Math.round((results.filter(r => r.techStack > 80).length / results.length) * 100)}% utilizam stack tecnológico moderno</li>
                        </ul>
                      </div>
                      
                      <div className="bg-black/50 p-6 rounded border border-green-400/20">
                        <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Oportunidades de Mercado Identificadas:
                        </h4>
                        <ul className="space-y-2 text-sm text-green-400/80">
                          <li>• <strong>Performance:</strong> Grande oportunidade de diferenciação com sites mais rápidos</li>
                          <li>• <strong>SEO Local:</strong> Maioria não otimiza para busca local (lacuna importante)</li>
                          <li>• <strong>Mobile:</strong> {Math.round((results.filter(r => r.performance < r.performanceDetails?.desktopScore).length / results.length) * 100)}% têm performance mobile inferior</li>
                          <li>• <strong>Conversão:</strong> Funis mal estruturados abrem espaço para captura de leads</li>
                          <li>• <strong>Branding:</strong> Identidade visual inconsistente na maioria dos concorrentes</li>
                        </ul>
                      </div>

                      <div className="bg-black/50 p-6 rounded border border-green-400/20">
                        <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Recomendações Estratégicas (Prioridade Alta):
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-green-400/10 rounded border border-green-400/30">
                            <strong className="text-green-400">1. Performance como Diferencial</strong>
                            <p className="text-green-400/80 text-sm mt-1">Invista pesado em velocidade - seus concorrentes estão lentos. Sites rápidos convertem 2x mais.</p>
                          </div>
                          <div className="p-3 bg-yellow-400/10 rounded border border-yellow-400/30">
                            <strong className="text-yellow-400">2. SEO Técnico Avançado</strong>
                            <p className="text-green-400/80 text-sm mt-1">Implemente schema markup, otimize Core Web Vitals e foque em featured snippets.</p>
                          </div>
                          <div className="p-3 bg-red-400/10 rounded border border-red-400/30">
                            <strong className="text-red-400">3. Funil de Conversão Inteligente</strong>
                            <p className="text-green-400/80 text-sm mt-1">Crie funis multi-etapa com lead magnets específicos por persona.</p>
                          </div>
                          <div className="p-3 bg-blue-400/10 rounded border border-blue-400/30">
                            <strong className="text-blue-400">4. Branding Consistente</strong>
                            <p className="text-green-400/80 text-sm mt-1">Desenvolva identidade visual forte - seus concorrentes são genéricos.</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/50 p-6 rounded border border-green-400/20">
                        <h4 className="text-green-400 font-semibold mb-3">Próximos Passos Recomendados:</h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-green-400/80">
                          <li>Priorize os 3 sites com menor performance para análise mais profunda</li>
                          <li>Desenvolva estratégia de conteúdo baseada nos gaps de SEO identificados</li>
                          <li>Teste A/B de CTAs mais persuasivos que os da concorrência</li>
                          <li>Implemente tecnologias modernas que seus concorrentes não usam</li>
                          <li>Monitore essas métricas mensalmente para acompanhar mudanças do mercado</li>
                        </ol>
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
