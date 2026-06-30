import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  MessageSquare, 
  Save, 
  RotateCcw, 
  Settings, 
  Lock, 
  Smartphone, 
  ExternalLink,
  Users,
  Award,
  Calendar,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  Search,
  Trash2,
  Download,
  Database
} from 'lucide-react';
import { getConfig, saveConfig, getWhatsAppClicks, LeadClick, getCustomersList, CustomerRegistration } from '../data';

interface AdminPanelProps {
  onBack: () => void;
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Config States
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [whatsappFormatted, setWhatsappFormatted] = useState<string>('');
  const [leads, setLeads] = useState<LeadClick[]>([]);
  const [customers, setCustomers] = useState<CustomerRegistration[]>([]);
  const [successMsg, setSuccessMsg] = useState<string>('');
  
  // Tab and searching states
  const [activeTab, setActiveTab] = useState<'customers' | 'leads'>('customers');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const config = getConfig();
    setWhatsappNumber(config.whatsappNumber);
    setWhatsappFormatted(config.whatsappFormatted);
    setLeads(getWhatsAppClicks());
    setCustomers(getCustomersList());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: admin123 (or empty for super easy access)
    if (password === 'admin123' || password === 'admin' || password === '') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta! Use "admin" ou deixe em branco.');
    }
  };

  const handleSaveConfig = () => {
    if (!whatsappNumber.trim()) {
      setError('O número de WhatsApp não pode estar vazio.');
      return;
    }
    
    saveConfig({
      whatsappNumber: whatsappNumber.trim(),
      whatsappFormatted: whatsappFormatted.trim() || whatsappNumber.trim()
    });

    setSuccessMsg('Configurações salvas com sucesso! As alterações já estão aplicadas no site.');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleResetLeads = () => {
    if (window.confirm('Deseja realmente limpar o histórico de cliques acumulados?')) {
      localStorage.removeItem('livelo_leads');
      setLeads([]);
    }
  };

  const handleResetCustomers = () => {
    if (window.confirm('Deseja realmente limpar todos os dados de clientes cadastrados do painel?')) {
      localStorage.removeItem('livelo_customers_list');
      setCustomers([]);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const exportToCSV = () => {
    if (customers.length === 0) return;
    const headers = ['ID', 'Nome', 'CPF', 'Email', 'Chave PIX', 'Data de Cadastro'];
    const rows = customers.map(c => [
      c.id,
      c.name,
      c.cpf,
      c.email,
      c.pix,
      new Date(c.timestamp).toLocaleString('pt-BR')
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `clientes_livelo_especialista_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCustomers = customers.filter(c => {
    const query = searchTerm.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.cpf.includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.pix.toLowerCase().includes(query)
    );
  });

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#070B19]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d1636_1px,transparent_1px),linear-gradient(to_bottom,#0d1636_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#0D1636] border-2 border-[#1A285A] p-8 rounded-3xl shadow-2xl relative z-10">
          
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#E6007E]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#E6007E]/30">
              <Lock className="w-8 h-8 text-[#E6007E]" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">Painel Administrativo</h2>
            <p className="text-slate-400 text-xs mt-1">Configure o WhatsApp do site de forma simples e rápida.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                placeholder="Insira 'admin' ou deixe em branco"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl px-4 py-3.5 text-slate-100 placeholder-gray-500 focus:outline-none focus:border-[#E6007E] font-mono transition-all text-sm"
              />
              {error && (
                <p className="text-[#E6007E] text-xs font-semibold mt-2 flex items-center">
                  <ShieldAlert className="w-3.5 h-3.5 mr-1" /> {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-[#E6007E] to-[#C5006B] hover:from-[#C5006B] hover:to-[#A30055] text-white font-bold py-3.5 px-6 rounded-xl text-sm uppercase tracking-widest transition-all shadow-lg hover:scale-[1.02] cursor-pointer"
            >
              <span>Acessar Painel</span>
            </button>
            
            <button
              type="button"
              onClick={onBack}
              className="w-full inline-flex items-center justify-center text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
            >
              Voltar ao Site
            </button>
          </form>

        </div>
      </div>
    );
  }

  // Admin Dashboard Screen
  return (
    <div className="min-h-screen bg-[#070B19] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#1A285A]/50 pb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2.5 bg-[#0D1636] border border-[#1A285A]/60 rounded-xl hover:border-[#E6007E] transition-colors cursor-pointer text-[#E6007E]"
              title="Voltar ao Site"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[#E6007E] text-xs font-black uppercase tracking-widest font-mono">
                LIVELO ESPECIALISTA
              </span>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center">
                Painel do Administrador
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-xs bg-[#0D1636] px-4 py-2 rounded-xl border border-[#1A285A]/60">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-slate-300">Conectado Localmente</span>
          </div>
        </div>

        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm flex items-center font-medium animate-fade-in">
            <Award className="w-5 h-5 mr-2" />
            {successMsg}
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Settings */}
          <div className="lg:col-span-5 bg-[#0D1636] border border-[#1A285A] rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center border-b border-[#1A285A]/50 pb-3">
              <Settings className="w-5 h-5 text-[#E6007E] mr-2" />
              Configuração do WhatsApp
            </h2>

            <div className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block mb-2">
                  Número de WhatsApp (Com DDD e DDI)
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3.5 top-3.5 w-5 h-5 text-[#E6007E]" />
                  <input
                    type="text"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="Ex: 5573998630223"
                    className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl pl-11 pr-4 py-3 text-slate-100 placeholder-gray-500 focus:outline-none focus:border-[#E6007E] transition-all text-sm font-mono"
                  />
                </div>
                <span className="text-[10px] text-gray-500 block leading-normal mt-1.5">
                  Insira apenas números. Deve conter o código do país (55 para Brasil), o DDD e o número completo. Ex: <strong className="text-gray-400 font-mono">5573998630223</strong>
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-widest block mb-2">
                  Texto de Exibição Formatado
                </label>
                <input
                  type="text"
                  value={whatsappFormatted}
                  onChange={(e) => setWhatsappFormatted(e.target.value)}
                  placeholder="Ex: (73) 99863-0223"
                  className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl px-4 py-3 text-slate-100 placeholder-gray-500 focus:outline-none focus:border-[#E6007E] transition-all text-sm font-mono"
                />
                <span className="text-[10px] text-gray-500 block leading-normal mt-1.5">
                  Como o número de telefone aparece visivelmente para o cliente nas páginas e menus. Ex: <strong className="text-gray-400 font-mono">(73) 99863-0223</strong>
                </span>
              </div>

            </div>

            <div className="pt-4 border-t border-[#1A285A]/50 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSaveConfig}
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-[1.01] cursor-pointer glow-green"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Alterações</span>
              </button>
            </div>

          </div>

          {/* Right Column: Lead Tracking Metrics and Customers Database */}
          <div className="lg:col-span-7 bg-[#0D1636] border border-[#1A285A] rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1A285A]/50 pb-4 gap-4">
              <div className="flex bg-[#070B19] p-1 rounded-xl border border-[#1A285A]/50 self-start">
                <button
                  type="button"
                  onClick={() => setActiveTab('customers')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center cursor-pointer ${
                    activeTab === 'customers'
                      ? 'bg-[#E6007E] text-white shadow-lg shadow-[#E6007E]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Database className="w-3.5 h-3.5 mr-1.5" />
                  Clientes ({customers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-[#E6007E] text-white shadow-lg shadow-[#E6007E]/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                  Cliques ({leads.length})
                </button>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-auto">
                {activeTab === 'customers' && customers.length > 0 && (
                  <>
                    <button
                      type="button"
                      onClick={exportToCSV}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center text-xs font-bold uppercase tracking-wider cursor-pointer"
                      title="Exportar clientes para arquivo de Excel"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Exportar
                    </button>
                    <button
                      type="button"
                      onClick={handleResetCustomers}
                      className="text-gray-500 hover:text-[#E6007E] transition-colors flex items-center text-xs font-bold uppercase tracking-wider cursor-pointer"
                      title="Limpar banco de clientes"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" />
                      Limpar
                    </button>
                  </>
                )}

                {activeTab === 'leads' && leads.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetLeads}
                    className="text-gray-500 hover:text-[#E6007E] transition-colors flex items-center text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Limpar Logs
                  </button>
                )}
              </div>
            </div>

            {/* Quick Metrics Header based on Tab */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#070B19]/60 border border-[#1A285A]/60 p-4 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1 font-mono">
                  {activeTab === 'customers' ? 'Clientes Cadastrados' : 'Cliques Registrados'}
                </span>
                <span className="text-3xl font-black text-white font-mono block">
                  {activeTab === 'customers' ? customers.length : leads.length}
                </span>
                <span className="text-[10px] text-gray-500 block leading-normal mt-1">
                  {activeTab === 'customers' 
                    ? 'Total de clientes que simularam ou preencheram dados.'
                    : 'Cliques iniciados no botão Falar com Especialista.'
                  }
                </span>
              </div>

              <div className="bg-[#070B19]/60 border border-[#1A285A]/60 p-4 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E6007E] block mb-1 font-mono">
                  Última Atividade
                </span>
                <span className="text-sm font-bold text-slate-100 font-mono block truncate py-2">
                  {activeTab === 'customers' 
                    ? (customers.length > 0 ? new Date(customers[0].timestamp).toLocaleTimeString('pt-BR') : 'Nenhum cadastro')
                    : (leads.length > 0 ? new Date(leads[0].timestamp).toLocaleTimeString('pt-BR') : 'Nenhum clique')
                  }
                </span>
                <span className="text-[10px] text-gray-500 block leading-normal">
                  Data e hora do registro mais recente.
                </span>
              </div>
            </div>

            {/* Active Content: Customers Tab */}
            {activeTab === 'customers' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar cliente por nome, CPF, e-mail ou PIX..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-gray-600 focus:outline-none focus:border-[#E6007E] transition-all"
                  />
                </div>

                {filteredCustomers.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {filteredCustomers.map((customer) => (
                      <div 
                        key={customer.id} 
                        className="bg-[#070B19] border border-[#1A285A]/40 p-4 rounded-xl text-xs space-y-3 hover:border-[#E6007E]/30 transition-all"
                      >
                        <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold font-mono border-b border-[#1A285A]/30 pb-2">
                          <span className="text-[#E6007E] uppercase font-bold">{customer.id}</span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(customer.timestamp).toLocaleString('pt-BR')}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                          <div>
                            <span className="text-[10px] text-gray-500 block font-bold uppercase tracking-wider mb-0.5">Nome Completo</span>
                            <span className="text-xs font-semibold text-white">{customer.name || 'Não preenchido'}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-gray-500 block font-bold uppercase tracking-wider mb-0.5">CPF do Titular</span>
                            <span className="font-mono text-xs flex items-center gap-1.5 text-slate-200">
                              {customer.cpf || 'Não preenchido'}
                              {customer.cpf && (
                                <button 
                                  onClick={() => copyToClipboard(customer.cpf, `${customer.id}-cpf`)}
                                  className="p-1 hover:bg-[#0D1636] rounded text-[#E6007E] transition-colors cursor-pointer"
                                  title="Copiar CPF"
                                >
                                  {copiedId === `${customer.id}-cpf` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              )}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-gray-500 block font-bold uppercase tracking-wider mb-0.5">E-mail Cadastrado</span>
                            <span className="font-mono text-xs text-slate-200 truncate block flex items-center gap-1.5">
                              {customer.email || 'Não preenchido'}
                              {customer.email && (
                                <button 
                                  onClick={() => copyToClipboard(customer.email, `${customer.id}-email`)}
                                  className="p-1 hover:bg-[#0D1636] rounded text-[#E6007E] transition-colors cursor-pointer"
                                  title="Copiar E-mail"
                                >
                                  {copiedId === `${customer.id}-email` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              )}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-gray-500 block font-bold uppercase tracking-wider mb-0.5">Chave PIX para Resgate</span>
                            <span className="font-mono text-xs text-slate-200 flex items-center gap-1.5">
                              {customer.pix || 'Não preenchido'}
                              {customer.pix && (
                                <button 
                                  onClick={() => copyToClipboard(customer.pix, `${customer.id}-pix`)}
                                  className="p-1 hover:bg-[#0D1636] rounded text-[#E6007E] transition-colors cursor-pointer"
                                  title="Copiar Chave PIX"
                                >
                                  {copiedId === `${customer.id}-pix` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#070B19]/50 border border-[#1A285A]/40 rounded-2xl py-12 text-center text-slate-500 text-xs sm:text-sm">
                    <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                    <p>Nenhum cliente cadastrado ainda.</p>
                    <p className="text-[10px] text-gray-600 mt-1 max-w-xs mx-auto">
                      Os dados digitados pelos clientes no simulador ou formulário de contato aparecerão organizados aqui automaticamente.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Active Content: Leads Tab */}
            {activeTab === 'leads' && (
              <div className="space-y-3">
                {leads.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {leads.map((lead) => (
                      <div 
                        key={lead.id} 
                        className="bg-[#070B19] border border-[#1A285A]/40 p-3.5 rounded-xl text-xs space-y-1.5 hover:border-[#E6007E]/30 transition-all"
                      >
                        <div className="flex items-center justify-between text-[10px] text-gray-500 font-bold font-mono">
                          <span className="text-[#E6007E] uppercase">{lead.category}</span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(lead.timestamp).toLocaleString('pt-BR')}
                          </span>
                        </div>
                        <p className="text-slate-300 font-light italic bg-[#0D1636] p-2 rounded-lg border border-[#1A285A]/20">
                          "{lead.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#070B19]/50 border border-[#1A285A]/40 rounded-2xl py-12 text-center text-slate-500 text-xs sm:text-sm">
                    <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                    <p>Ainda não há histórico de cliques de conversão.</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Tips Callout */}
        <div className="bg-gradient-to-r from-[#1A285A]/40 to-[#0D1636]/40 border border-[#E6007E]/10 p-6 sm:p-8 rounded-3xl space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center">
            <Sparkles className="w-4 h-4 text-[#E6007E] mr-1.5" /> Dicas de Publicação e Compartilhamento
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Seu site de conversão direta de Pontos Livelo está pronto! Para divulgá-lo para seus clientes, utilize os links gerados automaticamente pelo <strong>AI Studio</strong> no menu superior ou na seção de compartilhamento.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-gray-400">
            <div>
              <strong className="text-slate-300">Link de Compartilhamento do App:</strong>
              <div className="flex items-center space-x-2 mt-1 bg-[#070B19] px-3 py-2 rounded-lg border border-[#1A285A]">
                <span className="text-emerald-400">https://ais-pre-kkijlkwp2gm7ikosk7fikv-436172505242.us-east1.run.app</span>
                <a 
                  href="https://ais-pre-kkijlkwp2gm7ikosk7fikv-436172505242.us-east1.run.app" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#E6007E] hover:text-white"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
