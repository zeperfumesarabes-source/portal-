import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Send, CheckCircle2, User, FileText, Mail, Coins, ShieldCheck, AlertCircle } from 'lucide-react';
import { getWhatsAppLink, getConfig, logWhatsAppClick, getCustomerProfile, saveCustomerProfile } from '../data';

export default function ContactSection() {
  const [selectedSubject, setSelectedSubject] = useState<string>('viagem');
  const [customDestination, setCustomDestination] = useState<string>('');
  
  // Synced Customer Profile States
  const [userName, setUserName] = useState<string>('');
  const [userCpf, setUserCpf] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPix, setUserPix] = useState<string>('');

  const [registerStatus, setRegisterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const loadProfile = () => {
      const profile = getCustomerProfile();
      setUserName(profile.name);
      setUserCpf(profile.cpf);
      setUserEmail(profile.email);
      setUserPix(profile.pix);
    };

    loadProfile();

    window.addEventListener('customer_profile_updated', loadProfile);
    return () => {
      window.removeEventListener('customer_profile_updated', loadProfile);
    };
  }, []);

  const handleProfileChange = (key: 'name' | 'cpf' | 'email' | 'pix', value: string) => {
    if (key === 'name') setUserName(value);
    if (key === 'cpf') setUserCpf(value);
    if (key === 'email') setUserEmail(value);
    if (key === 'pix') setUserPix(value);
  };

  const handleRegisterCustomer = () => {
    const cleanName = userName.trim();
    const cleanCpf = userCpf.trim();
    const cleanEmail = userEmail.trim();
    const cleanPix = userPix.trim();

    if (!cleanName) {
      setRegisterStatus('error');
      setErrorMessage('Por favor, informe seu Nome Completo.');
      return;
    }
    if (!cleanCpf) {
      setRegisterStatus('error');
      setErrorMessage('Por favor, informe seu CPF.');
      return;
    }
    if (!cleanEmail) {
      setRegisterStatus('error');
      setErrorMessage('Por favor, informe seu E-mail Livelo.');
      return;
    }

    saveCustomerProfile({
      name: cleanName,
      cpf: cleanCpf,
      email: cleanEmail,
      pix: cleanPix
    });

    setRegisterStatus('success');
    setErrorMessage('');

    setTimeout(() => {
      setRegisterStatus('idle');
    }, 5000);
  };

  const config = getConfig();

  const subjects = [
    { id: 'viagem', label: 'Planejar Viagem', msg: 'Olá! Tenho pontos Livelo e gostaria de planejar minha próxima viagem de férias.' },
    { id: 'passagem', label: 'Cotar Passagem Aérea', msg: 'Olá! Preciso cotar uma passagem aérea nacional ou internacional usando meus pontos.' },
    { id: 'vencendo', label: 'Pontos Expirando', msg: 'Olá! Tenho pontos Livelo que estão prestes a vencer e preciso de ajuda urgente para resgatá-los.' },
    { id: 'outros', label: 'Tirar Dúvidas Gerais', msg: 'Olá! Sou cliente Livelo e gostaria de saber como funciona o suporte de resgate de pontos.' },
  ];

  const handleContactClick = () => {
    const cleanName = userName.trim();
    const cleanCpf = userCpf.trim();
    const cleanEmail = userEmail.trim();
    const cleanPix = userPix.trim();

    // Auto-save registration backup if any details are typed in
    if (cleanName || cleanCpf || cleanEmail) {
      saveCustomerProfile({
        name: cleanName,
        cpf: cleanCpf,
        email: cleanEmail,
        pix: cleanPix
      });
    }

    let baseMessage = '';
    const found = subjects.find(s => s.id === selectedSubject);
    
    if (selectedSubject === 'viagem' && customDestination.trim() !== '') {
      baseMessage = `Olá! Tenho pontos Livelo e gostaria de planejar uma viagem para *${customDestination.trim()}*.`;
    } else {
      baseMessage = found ? found.msg : 'Olá! Gostaria de falar com o especialista em pontos Livelo.';
    }

    // Build the cadastral details to append to the WhatsApp message
    const details: string[] = [];
    if (cleanName) details.push(`*Nome:* ${cleanName}`);
    if (cleanCpf) details.push(`*CPF:* ${cleanCpf}`);
    if (cleanEmail) details.push(`*E-mail Livelo:* ${cleanEmail}`);
    if (cleanPix) details.push(`*Chave PIX:* ${cleanPix}`);

    let finalMessage = baseMessage;
    if (details.length > 0) {
      finalMessage += `\n\n*Meus Dados de Contato:*\n${details.join('\n')}`;
    }

    logWhatsAppClick(`Formulário (${found ? found.label : 'Geral'})`, finalMessage);
    window.open(getWhatsAppLink(finalMessage), '_blank');
  };

  return (
    <section id="contato" className="py-20 bg-[#070B19] relative overflow-hidden">
      
      {/* Visual background divider circles */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E6007E]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main WhatsApp callout card mimicking the flyer */}
        <div className="bg-[#0D1636] border-2 border-[#1A285A] rounded-[36px] p-8 sm:p-14 shadow-2xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Info & Form Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 bg-pink-500/10 text-[#E6007E] border border-pink-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping mr-1"></span> Atendimento On-line Agora
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight uppercase tracking-tight">
                Fale com um Especialista <br />
                <span className="text-[#E6007E]">Pelo WhatsApp</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base font-light">
                Atendimento personalizado para você aproveitar o melhor dos seus pontos. Preencha seus dados cadastrais abaixo para um resgate 3x mais ágil!
              </p>

              {/* Fast selector options */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                  Selecione o seu objetivo principal:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {subjects.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setSelectedSubject(sub.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedSubject === sub.id
                          ? 'bg-[#E6007E]/10 border-[#E6007E] text-[#E6007E]'
                          : 'bg-[#070B19]/50 border-[#1A285A]/60 text-slate-300 hover:bg-[#1A285A]/40'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditionally show destination input for travel subject */}
              {selectedSubject === 'viagem' && (
                <div className="pt-2 animate-fade-in">
                  <input
                    type="text"
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    placeholder="Digite seu destino dos sonhos (ex: Orlando, Gramado, Paris...)"
                    className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-gray-500 focus:outline-none focus:border-[#E6007E] transition-all"
                  />
                </div>
              )}

              {/* ────────────────── CUSTOMER DATA FORM ────────────────── */}
              <div className="bg-[#070B19]/50 border border-[#1A285A]/60 rounded-2xl p-5 space-y-4">
                <p className="text-xs font-bold text-[#E6007E] uppercase tracking-widest flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1.5" /> Dados para Agilizar seu Atendimento:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Nome Completo</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        placeholder="Nome do Cliente"
                        className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-gray-600 focus:outline-none focus:border-[#E6007E] transition-all"
                      />
                    </div>
                  </div>

                  {/* CPF Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">CPF do Titular</label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={userCpf}
                        onChange={(e) => handleProfileChange('cpf', e.target.value)}
                        placeholder="000.000.000-00"
                        className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-gray-600 focus:outline-none focus:border-[#E6007E] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Livelo Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">E-mail Cadastrado na Livelo</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        placeholder="seu-email@exemplo.com"
                        className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-gray-600 focus:outline-none focus:border-[#E6007E] transition-all"
                      />
                    </div>
                  </div>

                  {/* PIX Input */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Chave PIX (Opcional)</label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={userPix}
                        onChange={(e) => handleProfileChange('pix', e.target.value)}
                        placeholder="Celular, CPF ou E-mail para recebimento"
                        className="w-full bg-[#070B19] border border-[#1A285A] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-gray-600 focus:outline-none focus:border-[#E6007E] transition-all"
                      />
                    </div>
                  </div>
                </div>

                {registerStatus === 'success' && (
                  <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] py-2 px-3 rounded-lg flex items-center gap-2 animate-fadeIn font-medium mt-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Cadastro salvo no Painel! Clique ao lado para falar com o especialista.</span>
                  </div>
                )}

                {registerStatus === 'error' && (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] py-2 px-3 rounded-lg flex items-center gap-2 animate-fadeIn font-medium mt-2">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleRegisterCustomer}
                  className="w-full inline-flex items-center justify-center space-x-1.5 bg-gradient-to-r from-[#E6007E] to-[#C5006B] hover:from-[#C5006B] hover:to-[#A30054] text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer mt-2"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Cadastrar Dados</span>
                </button>

                <p className="text-[10px] text-gray-500 leading-tight">
                  🔒 Seus dados cadastrais são armazenados localmente e vinculados ao Painel Administrativo para agilizar o processamento e resgate de seus pontos de forma segura.
                </p>
              </div>

            </div>

            {/* Right Form & Large CTA button column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center space-y-6 lg:border-l lg:border-[#1A285A]/60 lg:pl-10 self-center">
              
              {/* WhatsApp Icon wrapper with pulse ripple */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#E6007E] rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="w-20 h-20 bg-[#E6007E] rounded-full flex items-center justify-center text-white shadow-xl shadow-[#E6007E]/20 relative">
                  <MessageSquare className="w-10 h-10 fill-current animate-bounce" />
                </div>
              </div>

              {/* The black capsule-badge shape with white numbers exactly like the flyer */}
              <div className="space-y-2 w-full">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Telefone de Contato Direto</span>
                <div className="bg-[#070B19] border border-[#E6007E]/40 py-4 px-6 rounded-2xl flex items-center justify-center space-x-3 shadow-inner glow-pink">
                  <Phone className="w-5 h-5 text-[#E6007E]" />
                  <span className="text-xl sm:text-2xl font-black text-slate-100 font-mono tracking-wider">
                    {config.whatsappFormatted}
                  </span>
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleContactClick}
                id="contact-whatsapp-send-btn"
                className="w-full inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all hover:scale-[1.03] active:scale-95 cursor-pointer text-sm uppercase tracking-widest glow-green"
              >
                <span>Chamar no WhatsApp</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-[11px] text-gray-400 font-light justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Atendimento humanizado, rápido e gratuito.</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

