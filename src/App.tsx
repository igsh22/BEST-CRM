import { useState, useMemo } from 'react';
import { 
  Home as HomeIcon, 
  Briefcase, 
  Users, 
  BarChart3, 
  User as UserIcon,
  Bell,
  Search,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  MoreVertical,
  Filter,
  MapPin,
  Wallet,
  CreditCard,
  PiggyBank,
  Plus,
  Zap,
  ArrowUpCircle,
  ArrowDownCircle,
  FileText,
  Globe,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from './lib/utils';
import { 
  getMockData,
} from './mockData';
import { Role, Client, AITask, Interaction, Language, Opportunity, Case } from './types';
import { translations } from './translations';

// --- Components ---

const Navbar = ({ activePage, setActivePage, role, setRole, language, setLanguage, t, data }: { 
  activePage: string, 
  setActivePage: (page: string) => void,
  role: Role,
  setRole: (role: Role) => void,
  language: Language,
  setLanguage: (lang: Language) => void,
  t: any,
  data: any
}) => {
  const { currentUser, managerUser, regionalManagerUser } = data;
  const navItems = [
    { id: 'home', label: t.nav.home, icon: HomeIcon },
    { id: 'portfolio', label: t.nav.portfolio, icon: Briefcase },
    { id: 'customer', label: t.nav.customer, icon: Users },
    { id: 'reports', label: t.nav.reports, icon: BarChart3 },
    { id: 'user', label: t.nav.user, icon: UserIcon },
  ];

  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="font-bold text-slate-800 text-xl tracking-tight">{t.appName}</span>
        </div>
        
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 font-medium text-sm",
                activePage === item.id 
                  ? "bg-red-50 text-red-600" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4">
          <button 
            onClick={() => setLanguage('BG')}
            className={cn(
              "text-xs font-bold px-2 py-1 rounded transition-colors",
              language === 'BG' ? "bg-red-600 text-white" : "text-slate-400 hover:bg-slate-100"
            )}
          >
            BG
          </button>
          <button 
            onClick={() => setLanguage('EN')}
            className={cn(
              "text-xs font-bold px-2 py-1 rounded transition-colors",
              language === 'EN' ? "bg-red-600 text-white" : "text-slate-400 hover:bg-slate-100"
            )}
          >
            EN
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder={t.common.search} 
            className="pl-10 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-red-300 focus:ring-4 focus:ring-red-100 rounded-full text-sm w-64 transition-all"
          />
        </div>
        
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800">
              {role === 'Relationship Manager' ? currentUser.name : 
               role === 'Manager' ? managerUser.name : regionalManagerUser.name}
            </p>
            <p className="text-xs text-slate-500">
              {role === 'Regional Manager' ? t.common.regionalManager : 
               role === 'Branch Manager' ? t.common.branchManager : 
               role === 'Manager' ? t.common.manager : t.common.relationshipManager}
            </p>
          </div>
          <button 
            onClick={() => {
              if (role === 'Relationship Manager') setRole('Branch Manager');
              else if (role === 'Branch Manager') setRole('Regional Manager');
              else setRole('Relationship Manager');
            }}
            className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden hover:ring-2 hover:ring-red-400 transition-all"
          >
            <img src={`https://picsum.photos/seed/${role}/100/100`} alt="Avatar" referrerPolicy="no-referrer" />
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Pages ---

const HomePage = ({ t, role, data }: { t: any, role: Role, data: any }) => {
  const { currentUser, managerUser, regionalManagerUser, interactions, aiTasks, leadSources } = data;
  const userName = role === 'Relationship Manager' ? currentUser.name.split(' ')[0] : 
                   role === 'Manager' ? managerUser.name.split(' ')[0] : regionalManagerUser.name.split(' ')[0];

  return (
    <div className="p-8 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto">
      {/* Left Column: Activity & Sales */}
      <div className="col-span-4 space-y-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock size={18} className="text-red-600" />
              {t.home.recentActivity}
            </h3>
            <button className="text-xs text-red-600 font-medium hover:underline">{t.home.viewAll}</button>
          </div>
          <div className="p-5 space-y-6">
            {interactions.map((item, idx) => (
              <div key={item.id} className="flex gap-4 relative">
                {idx !== interactions.length - 1 && (
                  <div className="absolute left-[11px] top-6 bottom-[-24px] w-[2px] bg-slate-100"></div>
                )}
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10",
                  item.type === 'Call' ? "bg-blue-100 text-blue-600" :
                  item.type === 'Email' ? "bg-purple-100 text-purple-600" :
                  "bg-orange-100 text-orange-600"
                )}>
                  {item.type === 'Call' ? <Phone size={12} /> :
                   item.type === 'Email' ? <Mail size={12} /> :
                   <Calendar size={12} />}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800">{item.clientName}</p>
                    <span className="text-[10px] text-slate-400 font-medium">{item.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales Dashboard */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-600" />
              {t.home.leadPipeline}
            </h3>
          </div>
          <div className="p-5 space-y-6">
            {leadSources.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">{source.source}</span>
                  <span className="text-xs font-bold text-slate-800">{source.count} Leads</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full flex overflow-hidden">
                  <div 
                    className="bg-red-500 h-full" 
                    style={{ width: `${(source.stages.new / source.count) * 100}%` }}
                    title={`New: ${source.stages.new}`}
                  ></div>
                  <div 
                    className="bg-red-300 h-full" 
                    style={{ width: `${(source.stages.inProgress / source.count) * 100}%` }}
                    title={`In Progress: ${source.stages.inProgress}`}
                  ></div>
                  <div 
                    className="bg-slate-300 h-full" 
                    style={{ width: `${(source.stages.closed / source.count) * 100}%` }}
                    title={`Closed: ${source.stages.closed}`}
                  ></div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center gap-4 pt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-[10px] text-slate-500 font-medium">{t.home.new}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-300"></div>
                <span className="text-[10px] text-slate-500 font-medium">{t.home.progress}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                <span className="text-[10px] text-slate-500 font-medium">{t.home.closed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: AI Tasks */}
      <div className="col-span-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{t.home.welcome} {userName}</h2>
            <p className="text-slate-500">{t.home.aiActions}</p>
          </div>
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-100">
            <AlertCircle size={18} />
            <span className="text-sm font-bold">6 {t.home.criticalInsights}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Customers Section */}
          <div className="col-span-2 mt-4 mb-2 flex items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.home.criticalInsights}</span>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>
          {aiTasks.filter(t => !t.isProspect).map((task) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                  task.priority === 'High' ? "bg-red-50 text-red-600" :
                  task.priority === 'Medium' ? "bg-orange-50 text-orange-600" :
                  "bg-blue-50 text-blue-600"
                )}>
                  {task.priority === 'High' ? t.common.high : task.priority === 'Medium' ? t.common.medium : t.common.low} {t.home.priority}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {task.category}
                </div>
              </div>
              
              <h4 className="font-bold text-slate-800 group-hover:text-red-600 transition-colors">{task.clientName}</h4>
              <p className="text-sm text-slate-600 mt-1 mb-3 leading-relaxed">{task.description}</p>
              
              {(task.phone || task.email) && (
                <div className="flex items-center gap-3 mb-4 pt-3 border-t border-slate-50">
                  {task.phone && (
                    <>
                      <a 
                        href={`tel:${task.phone}`} 
                        className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-[10px] font-bold"
                        title="Call"
                      >
                        <Phone size={12} />
                        {task.phone}
                      </a>
                      <a 
                        href={`viber://chat?number=${task.phone.replace(/\D/g, '')}`} 
                        className="flex items-center gap-1.5 px-2 py-1 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100 transition-colors text-[10px] font-bold"
                        title="Viber"
                      >
                        <MessageCircle size={12} />
                        Viber
                      </a>
                    </>
                  )}
                  {task.email && (
                    <a 
                      href={`mailto:${task.email}`} 
                      className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 text-slate-600 rounded-md hover:bg-slate-100 transition-colors text-[10px] font-bold"
                      title="Email"
                    >
                      <Mail size={12} />
                      Email
                    </a>
                  )}
                </div>
              )}
              
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-red-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{task.suggestedAction}</span>
                </div>
                <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Prospects Section */}
          <div className="col-span-2 mt-8 mb-2 flex items-center gap-2">
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">{t.home.prospectInsights}</span>
            <div className="h-[1px] flex-1 bg-purple-100"></div>
          </div>
          {aiTasks.filter(t => t.isProspect).map((task) => (
            <motion.div 
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                  task.priority === 'High' ? "bg-red-50 text-red-600" :
                  task.priority === 'Medium' ? "bg-orange-50 text-orange-600" :
                  "bg-blue-50 text-blue-600"
                )}>
                  {task.priority === 'High' ? t.common.high : task.priority === 'Medium' ? t.common.medium : t.common.low} {t.home.priority}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold bg-purple-100 text-purple-600 px-1 rounded uppercase tracking-tighter">
                    {t.home.isProspect}
                  </span>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {task.category}
                  </div>
                </div>
              </div>
              
              <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">{task.clientName}</h4>
              <p className="text-sm text-slate-600 mt-1 mb-3 leading-relaxed">{task.description}</p>
              
              <div className="pt-4 border-t border-purple-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{task.suggestedAction}</span>
                </div>
                <button className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CustomerPage = ({ t, data }: { t: any, data: any }) => {
  const [selectedClientId, setSelectedClientId] = useState<string>(data.clients[0]?.id);
  const selectedClient = data.clients.find((c: Client) => c.id === selectedClientId) || data.clients[0];

  const StatItem = ({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) => (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-4">
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", color)}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-lg font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );

  const ProductCard = ({ product }: { product: any }) => (
    <div className="p-3 bg-white border border-slate-100 rounded-lg hover:shadow-sm transition-all">
      <div className="flex justify-between items-start mb-1">
        <span className="text-xs font-bold text-slate-800">{product.name}</span>
        <span className="text-xs font-bold text-red-600">
          {product.profit !== undefined ? `+${product.profit}€` : 
           product.revolvingLimit !== undefined ? `${product.balance} / ${product.revolvingLimit}€` :
           `${product.balance}€`}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        {product.details && <span className="text-[10px] text-slate-400 font-medium">{product.details}</span>}
        {product.investedAmount !== undefined && <span className="text-[10px] text-slate-400 font-medium">{t.customer.fields.invested}: {product.investedAmount}€</span>}
        {product.accumulatedAmount !== undefined && <span className="text-[10px] text-slate-400 font-medium">{t.customer.fields.accumulated}: {product.accumulatedAmount}€</span>}
        {product.outstandingBalance !== undefined && <span className="text-[10px] text-slate-400 font-medium">{t.customer.fields.outstanding}: {product.outstandingBalance}€</span>}
        {product.revolvingLimit !== undefined && <span className="text-[10px] text-slate-400 font-medium">{t.customer.fields.limit}: {product.revolvingLimit}€</span>}
      </div>
    </div>
  );

  return (
    <div className="flex gap-6 h-full min-h-0">
      {/* Left Column: Client List */}
      <div className="w-80 flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">{t.portfolio.clientList}</h3>
          <button 
            className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100 hover:bg-purple-100 transition-colors"
            onClick={() => alert('New Prospect workflow triggered')}
          >
            + {t.home.isProspect}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {data.clients.map((client: Client) => (
            <button
              key={client.id}
              onClick={() => setSelectedClientId(client.id)}
              className={cn(
                "w-full text-left p-3 rounded-xl transition-all flex items-center gap-3",
                selectedClientId === client.id ? "bg-red-50 border border-red-100 shadow-sm" : "hover:bg-slate-50 border border-transparent"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white flex-shrink-0">
                <img src={`https://picsum.photos/seed/${client.id}/100/100`} alt="" referrerPolicy="no-referrer" />
              </div>
              <div className="min-w-0">
                <p className={cn("font-bold text-sm truncate", selectedClientId === client.id ? "text-red-700" : "text-slate-700")}>{client.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] text-slate-400 font-medium truncate">{client.id}</p>
                  {client.status === 'Prospect' && (
                    <span className="text-[8px] font-bold bg-purple-100 text-purple-600 px-1 rounded uppercase">
                      {t.home.isProspect}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Client Details */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">
        {/* Profile Header */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden border-4 border-slate-50 shadow-inner">
                <img src={`https://picsum.photos/seed/${selectedClient.id}/200/200`} alt="" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-slate-800">{selectedClient.name}</h2>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-bold",
                    selectedClient.status === 'Prospect' ? "bg-purple-100 text-purple-700 border border-purple-200" : "bg-blue-100 text-blue-700 border border-blue-200"
                  )}>
                    {selectedClient.status === 'Prospect' ? t.home.isProspect : t.home.isCustomer}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-500 font-medium text-sm">
                  <div className="flex items-center gap-1.5"><Mail size={14} />{selectedClient.email}</div>
                  <div className="flex items-center gap-1.5"><Phone size={14} />{selectedClient.phone}</div>
                  <div className="flex items-center gap-1.5"><MapPin size={14} />{selectedClient.address}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg shadow-lg shadow-slate-200 hover:bg-slate-700 transition-all font-bold text-sm">
                <Plus size={18} /> {t.customer.newOpportunity}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-all font-bold text-sm">
                <FileText size={18} /> {t.customer.logCase}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <StatItem label={t.customer.lifetimeValue} value={`$${(selectedClient.lifetimeValue / 1000).toFixed(0)}k`} icon={TrendingUp} color="bg-emerald-50 text-emerald-600" />
          <StatItem label={t.customer.engagement} value={`${selectedClient.engagementScore}/100`} icon={Zap} color="bg-orange-50 text-orange-600" />
          <StatItem label={t.customer.totalAssets} value={`$${(selectedClient.totalAssets / 1000).toFixed(0)}k`} icon={ArrowUpCircle} color="bg-blue-50 text-blue-600" />
          <StatItem label={t.customer.totalLiabilities} value={`$${(selectedClient.totalLiabilities / 1000).toFixed(0)}k`} icon={ArrowDownCircle} color="bg-red-50 text-red-600" />
        </div>

        <div className="grid grid-cols-12 gap-6 pb-8">
          <div className="col-span-8 space-y-6">
            {/* Existing Products Pane */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden pb-4">
              <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Wallet size={18} className="text-red-600" />
                  {t.customer.existingProducts}
                </h3>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                {/* Accounts */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <PiggyBank size={14} className="text-blue-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.customer.productTabs.accounts}</span>
                  </div>
                  <div className="space-y-2">
                    {selectedClient.products?.accounts.map((p: any, i: number) => <div key={`acc-${i}`}><ProductCard product={p} /></div>)}
                    {(!selectedClient.products || selectedClient.products.accounts.length === 0) && <p className="text-[10px] text-slate-400 italic px-1">{t.customer.noOpps}</p>}
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <CreditCard size={14} className="text-red-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.customer.productTabs.cards}</span>
                  </div>
                  <div className="space-y-2">
                    {selectedClient.products?.cards.map((p: any, i: number) => <div key={`card-${i}`}><ProductCard product={p} /></div>)}
                    {(!selectedClient.products || selectedClient.products.cards.length === 0) && <p className="text-[10px] text-slate-400 italic px-1">{t.customer.noOpps}</p>}
                  </div>
                </div>

                {/* Investments */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <TrendingUp size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.customer.productTabs.investments}</span>
                  </div>
                  <div className="space-y-2">
                    {selectedClient.products?.investments.map((p: any, i: number) => <div key={`inv-${i}`}><ProductCard product={p} /></div>)}
                    {(!selectedClient.products || selectedClient.products.investments.length === 0) && <p className="text-[10px] text-slate-400 italic px-1">{t.customer.noOpps}</p>}
                  </div>
                </div>

                {/* Loans */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <FileText size={14} className="text-orange-500" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.customer.productTabs.loans}</span>
                  </div>
                  <div className="space-y-2">
                    {selectedClient.products?.loans.map((p: any, i: number) => <div key={`loan-${i}`}><ProductCard product={p} /></div>)}
                    {(!selectedClient.products || selectedClient.products.loans.length === 0) && <p className="text-[10px] text-slate-400 italic px-1">{t.customer.noOpps}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            {/* Opportunities */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">{t.customer.opportunities}</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {selectedClient.opportunities.map((opp: Opportunity) => (
                  <div key={opp.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                        <ArrowUpCircle size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{opp.product}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{opp.status}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">${opp.value.toLocaleString()}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{t.customer.estValue}</p>
                    </div>
                  </div>
                ))}
                {selectedClient.opportunities.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-sm">{t.customer.noOpps}</div>
                )}
              </div>
            </div>

            {/* Interaction Log */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">{t.customer.activityFeed}</h3>
              </div>
              <div className="p-6">
                <div className="relative space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {selectedClient.interactions.map((interaction: Interaction) => (
                    <div key={interaction.id} className="relative pl-8">
                      <div className="absolute left-[-2px] w-2 h-2 rounded-full bg-red-600 shadow-[0_0_0_4px_white]"></div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{interaction.timestamp}</p>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-slate-800">{interaction.type}</p>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{interaction.description}</p>
                    </div>
                  ))}
                  {selectedClient.interactions.length === 0 && (
                    <p className="text-center text-slate-400 text-xs py-4">{t.customer.noInteractions}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioPage = ({ t, data }: { t: any, data: any }) => {
  const { clients, productPenetration } = data;
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t.portfolio.title}</h2>
          <p className="text-slate-500">{t.portfolio.managing.replace('{count}', clients.length.toString())}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Filter size={16} />
            {t.portfolio.filter}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg text-sm font-bold text-white hover:bg-red-700 transition-all shadow-lg shadow-red-200">
            {t.portfolio.export}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: t.portfolio.stats.totalAssets, value: '$2.7M', change: '+12%', up: true },
          { label: t.portfolio.stats.totalLiabilities, value: '$940k', change: '-5%', up: false },
          { label: t.portfolio.stats.avgEngagement, value: '85%', change: '+2%', up: true },
          { label: t.portfolio.stats.activeOpportunities, value: '14', change: '+3', up: true },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded",
                stat.up ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              )}>
                {stat.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Client Table */}
        <div className="col-span-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">{t.portfolio.clientList}</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-4">{t.portfolio.clientName}</th>
                <th className="px-6 py-4">{t.portfolio.clientId}</th>
                <th className="px-6 py-4 text-right">{t.portfolio.assets}</th>
                <th className="px-6 py-4 text-right">{t.portfolio.liabilities}</th>
                <th className="px-6 py-4">{t.portfolio.lastContact}</th>
                <th className="px-6 py-4">{t.portfolio.criticalInsight}</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                        <img src={`https://picsum.photos/seed/${client.id}/100/100`} alt="" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">{client.name}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded w-fit",
                          client.status === 'Prospect' ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"
                        )}>
                          {client.status === 'Prospect' ? t.home.isProspect : t.home.isCustomer}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500 font-mono">{client.id}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-slate-800">${(client.totalAssets / 1000).toFixed(0)}k</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-slate-800">${(client.totalLiabilities / 1000).toFixed(0)}k</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-500">{client.lastContactDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-red-600 italic">{client.criticalInsight || '-'}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Product Penetration */}
        <div className="col-span-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">{t.portfolio.productPenetration}</h3>
            <p className="text-xs text-slate-500 mt-1">{t.portfolio.vsAverage}</p>
          </div>
          <div className="p-6 flex-1">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={productPenetration} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="product" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }}
                  width={100}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="portfolio" fill="#dc2626" radius={[0, 4, 4, 0]} barSize={12} name="Portfolio" />
                <Bar dataKey="bankAverage" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={12} name="Bank Avg" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-600"></div>
                <span className="text-xs font-bold text-slate-600">{t.reports.portfolio}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-300"></div>
                <span className="text-xs font-bold text-slate-600">{t.portfolio.bankAverage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportsPage = ({ role, t, data }: { role: Role, t: any, data: any }) => {
  const { topRevenueClients, topVolumeClients, clients } = data;
  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">{t.reports.title}</h2>
          <p className="text-slate-500">{t.reports.analyticsFor.replace('{scope}', role === 'Manager' || role === 'Regional Manager' ? t.reports.team : t.reports.portfolio)}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600">{t.reports.last30Days}</button>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600">{t.reports.downloadPdf}</button>
        </div>
      </div>

      {(role === 'Manager' || role === 'Regional Manager') && (
        <div className="bg-red-600 rounded-2xl p-8 text-white shadow-xl shadow-red-200 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-3 gap-12">
            <div>
              <p className="text-red-100 text-sm font-medium mb-2">{t.reports.teamRevenue}</p>
              <h3 className="text-4xl font-bold">$12.4M</h3>
              <p className="text-red-200 text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={14} /> {t.reports.growthFromLastMonth.replace('{value}', '+18.5%')}
              </p>
            </div>
            <div>
              <p className="text-red-100 text-sm font-medium mb-2">{t.reports.conversionRate}</p>
              <h3 className="text-4xl font-bold">42.8%</h3>
              <p className="text-red-200 text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={14} /> {t.reports.growthFromLastMonth.replace('{value}', '+4.2%')}
              </p>
            </div>
            <div>
              <p className="text-red-100 text-sm font-medium mb-2">{t.reports.activeOpps}</p>
              <h3 className="text-4xl font-bold">156</h3>
              <p className="text-red-200 text-xs mt-2 flex items-center gap-1">
                <TrendingUp size={14} /> {t.reports.newThisWeek.replace('{count}', '12')}
              </p>
            </div>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-red-500 rounded-full opacity-20"></div>
          <div className="absolute bottom-[-20px] left-[20%] w-32 h-32 bg-red-400 rounded-full opacity-10"></div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Top Clients by Revenue */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">{t.reports.topClients}</h3>
          </div>
          <div className="p-0">
            {topRevenueClients.map((client, idx) => (
              <div key={client.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-300 w-4">{idx + 1}</span>
                  <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${client.id}/100/100`} alt="" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{client.name}</p>
                    <p className="text-xs text-slate-500">{client.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">${client.lifetimeValue.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">{t.reports.highValue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Asset/Liability Trends */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">{t.reports.dynamics}</h3>
          </div>
          <div className="p-6">
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.reports.assetIncrease}</h4>
                <div className="space-y-4">
                  {clients.slice(0, 3).map(c => (
                    <div key={c.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-slate-700">{c.name}</span>
                      </div>
                      <span className="text-sm font-bold text-green-600">+$45,000</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.reports.liabilityIncrease}</h4>
                <div className="space-y-4">
                  {clients.slice(1, 4).map(c => (
                    <div key={c.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span className="text-sm font-medium text-slate-700">{c.name}</span>
                      </div>
                      <span className="text-sm font-bold text-red-600">+$12,500</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserPage = ({ role, t, data }: { role: Role, t: any, data: any }) => {
  const { currentUser, managerUser, regionalManagerUser } = data;
  const profile = role === 'Relationship Manager' ? currentUser : 
                  role === 'Manager' ? managerUser : regionalManagerUser;

  return (
    <div className="p-8 max-w-[1000px] mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-red-600 to-red-800"></div>
        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-8">
            <div className="w-32 h-32 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-lg">
              <img src={`https://picsum.photos/seed/${role}/300/300`} alt="Profile" referrerPolicy="no-referrer" />
            </div>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-sm hover:bg-red-700 transition-all">
              {t.user.editProfile}
            </button>
          </div>

          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-4 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>
                <p className="text-slate-500 font-medium">
                  {profile.role === 'Regional Manager' ? t.common.regionalManager : 
                   profile.role === 'Branch Manager' ? t.common.branchManager :
                   profile.role === 'Manager' ? t.common.manager : t.common.relationshipManager}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Briefcase size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">{t.user.portfolio}: {profile.portfolioCode}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">{profile.name.toLowerCase().replace(' ', '.')}@bulbank.bg</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Globe size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">{t.user.region}: {t.common.regions[profile.region]}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Phone size={18} className="text-slate-400" />
                  <span className="text-sm font-medium">+359 2 911 11</span>
                </div>
              </div>
            </div>

            <div className="col-span-8 space-y-8">
              {(role === 'Manager' || role === 'Regional Manager' || role === 'Branch Manager') && profile.team && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.user.teamMembers}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {profile.team.map((member) => (
                      <div key={member} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                          <img src={`https://picsum.photos/seed/${member}/100/100`} alt="" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{member}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{t.common.relationshipManager}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {role === 'Relationship Manager' && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{t.user.achievements}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{t.user.topPerformer}</p>
                        <p className="text-xs text-slate-500">{t.user.growthTarget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{t.user.satisfactionChampion}</p>
                        <p className="text-xs text-slate-500">{t.user.positiveFeedback}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [role, setRole] = useState<Role>('Relationship Manager');
  const [language, setLanguage] = useState<Language>('BG');

  const t = useMemo(() => translations[language], [language]);
  const data = useMemo(() => getMockData(language), [language]);

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage t={t} role={role} data={data} />;
      case 'portfolio': return <PortfolioPage t={t} data={data} />;
      case 'customer': return <CustomerPage t={t} data={data} />;
      case 'reports': return <ReportsPage role={role} t={t} data={data} />;
      case 'user': return <UserPage role={role} t={t} data={data} />;
      default: return <HomePage t={t} role={role} data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-red-100 selection:text-red-900">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        role={role} 
        setRole={setRole} 
        language={language}
        setLanguage={setLanguage}
        t={t}
        data={data}
      />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating AI Assistant Toggle */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl shadow-red-400 flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-50">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Bell size={24} />
        </motion.div>
        <div className="absolute right-full mr-4 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          <p className="text-xs font-bold text-slate-800">{t.home.aiAssistantReady}</p>
          <p className="text-[10px] text-slate-500">{t.home.newInsights.replace('{count}', '3')}</p>
        </div>
      </button>
    </div>
  );
}
