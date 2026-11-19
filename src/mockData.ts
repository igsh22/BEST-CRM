import { Client, Interaction, LeadSource, AITask, ProductPenetration, UserProfile, Language } from './types';

const BG_DATA = {
  currentUser: {
    name: 'Иван Иванов',
    role: 'Relationship Manager',
    portfolioCode: 'RM-7721-SOF',
    region: 'Center',
  } as UserProfile,
  managerUser: {
    name: 'Мария Петрова',
    role: 'Branch Manager',
    portfolioCode: 'MGR-001-SOF',
    region: 'Center',
    team: ['Иван Иванов', 'Георги Георгиев', 'Елена Димитрова'],
  } as UserProfile,
  regionalManagerUser: {
    name: 'Димитър Димитров',
    role: 'Regional Manager',
    portfolioCode: 'REG-MGR-WEST',
    region: 'West',
    team: ['Николай Колев', 'Петър Стоянов', 'Стефан Ангелов', 'Васил Левски', 'Христо Ботев', 'Любен Каравелов'],
  } as UserProfile,
  interactions: [
    { id: '1', type: 'Call', clientName: 'Техно Груп ЕООД', timestamp: '2026-03-27 09:15', description: 'Обсъждане на разширяване на кредитната линия за Q2.' },
    { id: '2', type: 'Email', clientName: 'Емилия Рикардова', timestamp: '2026-03-27 10:30', description: 'Изпратени документи за подновяване на KYC.' },
    { id: '3', type: 'Meeting', clientName: 'Даниел Милев', timestamp: '2026-03-26 14:00', description: 'Преглед на портфолиото и инвестиционна стратегия.' },
    { id: '4', type: 'Call', clientName: 'София Ченева', timestamp: '2026-03-26 11:45', description: 'Последващ разговор за ипотечно заявление.' },
  ] as Interaction[],
  aiTasks: [
    { id: 't1', clientName: 'Марк Аврелий', description: 'Задържана банкоматна карта вчера в централен клон', priority: 'High', suggestedAction: 'Обаждане на клиента за потвърждаване на самоличността и издаване на нова карта', category: 'Behavioral', phone: '+359 88 111 2222', email: 'mark.aurelius@bulbank.bg' },
    { id: 't2', clientName: 'Елена Гилбърт', description: 'Висок неактивен баланс (250 хил. лв.) в текуща сметка', priority: 'High', suggestedAction: 'Предлагане на срочен депозит или инвестиционен план', category: 'Behavioral', phone: '+359 88 333 4444', email: 'elena.gilbert@bulbank.bg' },
    { id: 't3', clientName: 'Иван Смилов', description: 'Предстои преглед на KYC след 3 дни', priority: 'Medium', suggestedAction: 'Изискване на актуализирани документи чрез защитения портал', category: 'Lifecycle', phone: '+359 88 555 6666', email: 'ivan.smilov@bulbank.bg' },
    { id: 't4', clientName: 'Сара Конорова', description: 'Рожден ден на клиента утре', priority: 'Low', suggestedAction: 'Изпращане на персонализиран поздрав и лоялна оферта', category: 'Lifecycle', phone: '+359 88 777 8888', email: 'sarah.connor@bulbank.bg' },
    { id: 't5', clientName: 'Борис Вазов', description: 'Тенденция на намаляващ баланс през последните 3 месеца', priority: 'Medium', suggestedAction: 'Насрочване на разговор за проверка на състоянието', category: 'Behavioral', phone: '+359 88 999 0000', email: 'boris.vazov@bulbank.bg' },
    { id: 't6', clientName: 'Диана Принцова', description: 'Кредитната карта изтича следващия месец', priority: 'Medium', suggestedAction: 'Потвърждаване на адреса за доставка на новата карта', category: 'Lifecycle', phone: '+359 88 222 1111', email: 'diana.prince@bulbank.bg' },
  ] as AITask[],
  clients: [
    { 
      id: 'C-001', 
      name: 'Емилия Рикардова', 
      email: 'emilia.r@bulbank.bg', 
      phone: '+359 88 123 4567', 
      address: 'ул. „Иван Вазов“ 12, София', 
      lifetimeValue: 125000, 
      engagementScore: 88, 
      totalAssets: 450000, 
      totalLiabilities: 120000, 
      lastContactDate: '2026-03-27', 
      status: 'Customer',
      criticalInsight: 'Висок потенциал за инвестиционен план',
      products: {
        accounts: [
          { name: 'Разплащателна сметка', balance: 232.71, details: 'EUR' },
          { name: 'Депозит', balance: 3000, details: 'EUR' },
        ],
        cards: [
          { name: 'Дебитна стандартна карта', balance: 100, details: 'EUR' },
          { name: 'Кредитна карта Premium', balance: 2032, revolvingLimit: 2000 },
        ],
        investments: [
          { name: 'Direct investment One Market J.P.Morgan US equity fund', balance: 5656, investedAmount: 5000, profit: 656 },
          { name: 'Инвестиционен план', balance: 406, investedAmount: 400, profit: 6 },
          { name: 'Пенсионен фонд Allianz', balance: 15050, accumulatedAmount: 15050 },
        ],
        loans: [
          { name: 'Потребителски кредит', balance: 3000, outstandingBalance: 3000 },
          { name: 'Ипотечен кредит', balance: 65000, outstandingBalance: 65000 },
        ]
      },
      opportunities: [{ id: 'o1', product: 'Premium Credit Card', status: 'In Progress', value: 500 }, { id: 'o2', product: 'Private Banking Upgrade', status: 'New', value: 2500 }], 
      cases: [{ id: 'c1', type: 'Service request', status: 'In Progress', description: 'Верификация на промяна на адрес' }], 
      interactions: [] 
    },
    { id: 'C-002', name: 'Даниел Милев', email: 'd.milev@bulbank.bg', phone: '+359 88 987 6543', address: 'бул. „Витоша“ 88, София', lifetimeValue: 850000, engagementScore: 95, totalAssets: 2100000, totalLiabilities: 500000, lastContactDate: '2026-03-26', status: 'Customer', criticalInsight: 'Ключов корпоративен контакт', opportunities: [{ id: 'o3', product: 'Commercial Loan', status: 'Closed', value: 50000 }], cases: [], interactions: [] },
    { id: 'C-003', name: 'София Ченева', email: 'sophia.cheneva@bulbank.bg', phone: '+359 88 555 0199', address: 'ул. „Граф Игнатиев“ 45, София', lifetimeValue: 45000, engagementScore: 72, totalAssets: 150000, totalLiabilities: 320000, lastContactDate: '2026-03-26', status: 'Customer', criticalInsight: 'Възможност за рефинансиране', opportunities: [{ id: 'o4', product: 'Mortgage Refinance', status: 'In Progress', value: 1200 }], cases: [{ id: 'c2', type: 'Blocked card', status: 'Closed', description: 'Фалшива тревога за измама' }], interactions: [] },
    { id: 'P-001', name: 'Виктор Траянов', email: 'v.traianov@prospect.bg', phone: '+359 88 111 2233', address: 'ул. „Московска“ 5, София', lifetimeValue: 0, engagementScore: 45, totalAssets: 0, totalLiabilities: 0, lastContactDate: '2026-04-20', status: 'Prospect', criticalInsight: 'Ново запитване за ипотека', opportunities: [], cases: [], interactions: [] },
    { id: 'P-002', name: 'Ирена Костова', email: 'i.kostova@prospect.bg', phone: '+359 88 444 5566', address: 'ж.к. Младост 1, София', lifetimeValue: 0, engagementScore: 30, totalAssets: 0, totalLiabilities: 0, lastContactDate: '2026-04-18', status: 'Prospect', criticalInsight: 'Интерес към спестовни продукти', opportunities: [], cases: [], interactions: [] },
    { id: 'C-004', name: 'Георги Петров', email: 'g.petrov@bulbank.bg', phone: '+359 88 222 3333', address: 'ул. „Оборище“ 10, София', lifetimeValue: 320000, engagementScore: 90, totalAssets: 1200000, totalLiabilities: 150000, lastContactDate: '2026-03-25', status: 'Customer', criticalInsight: 'Висока лоялност', opportunities: [], cases: [], interactions: [] },
    { id: 'C-005', name: 'Мария Стоянова', email: 'm.stoyanova@bulbank.bg', phone: '+359 88 444 5555', address: 'бул. „България“ 55, Пловдив', lifetimeValue: 150000, engagementScore: 85, totalAssets: 600000, totalLiabilities: 50000, lastContactDate: '2026-03-24', opportunities: [], cases: [], interactions: [] },
    { id: 'C-006', name: 'Николай Колев', email: 'n.kolev@bulbank.bg', phone: '+359 88 666 7777', address: 'ул. „Цар Симеон“ 22, Варна', lifetimeValue: 500000, engagementScore: 92, totalAssets: 1800000, totalLiabilities: 200000, lastContactDate: '2026-03-23', opportunities: [], cases: [], interactions: [] },
    { id: 'C-007', name: 'Елена Димитрова', email: 'e.dimitrova@bulbank.bg', phone: '+359 88 888 9999', address: 'ул. „Търговска“ 5, Бургас', lifetimeValue: 280000, engagementScore: 80, totalAssets: 950000, totalLiabilities: 100000, lastContactDate: '2026-03-22', opportunities: [], cases: [], interactions: [] },
    { id: 'C-008', name: 'Стефан Ангелов', email: 's.angelov@bulbank.bg', phone: '+359 88 111 2222', address: 'ул. „Славянска“ 15, Русе', lifetimeValue: 180000, engagementScore: 75, totalAssets: 550000, totalLiabilities: 80000, lastContactDate: '2026-03-21', opportunities: [], cases: [], interactions: [] },
    { id: 'C-009', name: 'Петър Тодоров', email: 'p.todorov@bulbank.bg', phone: '+359 88 333 4444', address: 'ул. „Гурко“ 33, Стара Загора', lifetimeValue: 420000, engagementScore: 88, totalAssets: 1400000, totalLiabilities: 180000, lastContactDate: '2026-03-20', opportunities: [], cases: [], interactions: [] },
    { id: 'C-010', name: 'Радослав Борисов', email: 'r.borisov@bulbank.bg', phone: '+359 88 555 6666', address: 'ул. „Дунав“ 10, Плевен', lifetimeValue: 220000, engagementScore: 82, totalAssets: 750000, totalLiabilities: 120000, lastContactDate: '2026-03-19', opportunities: [], cases: [], interactions: [] },
  ] as Client[],
};

const EN_DATA = {
  currentUser: {
    name: 'Ivan Ivanov',
    role: 'Relationship Manager',
    portfolioCode: 'RM-7721-SOF',
    region: 'Center',
  } as UserProfile,
  managerUser: {
    name: 'Maria Petrova',
    role: 'Branch Manager',
    portfolioCode: 'MGR-001-SOF',
    region: 'Center',
    team: ['Ivan Ivanov', 'Georgi Georgiev', 'Elena Dimitrova'],
  } as UserProfile,
  regionalManagerUser: {
    name: 'Dimitar Dimitrov',
    role: 'Regional Manager',
    portfolioCode: 'REG-MGR-WEST',
    region: 'West',
    team: ['Nikolay Kolev', 'Petar Stoyanov', 'Stefan Angelov', 'Vasil Levski', 'Hristo Botev', 'Lyuben Karavelov'],
  } as UserProfile,
  interactions: [
    { id: '1', type: 'Call', clientName: 'Techno Group Ltd.', timestamp: '2026-03-27 09:15', description: 'Discussion on expanding the credit line for Q2.' },
    { id: '2', type: 'Email', clientName: 'Emilia Rikardova', timestamp: '2026-03-27 10:30', description: 'Sent documents for KYC renewal.' },
    { id: '3', type: 'Meeting', clientName: 'Daniel Milev', timestamp: '2026-03-26 14:00', description: 'Portfolio review and investment strategy.' },
    { id: '4', type: 'Call', clientName: 'Sofia Cheneva', timestamp: '2026-03-26 11:45', description: 'Follow-up call regarding mortgage application.' },
  ] as Interaction[],
  aiTasks: [
    { id: 't1', clientName: 'Marcus Aurelius', description: 'ATM card retained yesterday in Central branch', priority: 'High', suggestedAction: 'Call the customer to confirm identity and issue a new card', category: 'Behavioral', phone: '+359 88 111 2222', email: 'mark.aurelius@bulbank.bg' },
    { id: 't2', clientName: 'Elena Gilbert', description: 'High inactive balance (250k BGN) in current account', priority: 'High', suggestedAction: 'Offer a term deposit or investment plan', category: 'Behavioral', phone: '+359 88 333 4444', email: 'elena.gilbert@bulbank.bg' },
    { id: 't7', clientName: 'Victor Traianov', description: 'New inquiry for a mortgage loan', priority: 'High', suggestedAction: 'Call to discuss mortgage options', category: 'Campaign', phone: '+359 88 111 2233', email: 'v.traianov@prospect.bg', isProspect: true },
    { id: 't8', clientName: 'Irena Kostova', description: 'Interest in investment plan shown on digital portal', priority: 'Medium', suggestedAction: 'Send information packet on One Market funds', category: 'Campaign', phone: '+359 88 444 5566', email: 'i.kostova@prospect.bg', isProspect: true },
    { id: 't3', clientName: 'Ivan Smilov', description: 'KYC review due in 3 days', priority: 'Medium', suggestedAction: 'Request updated documents via the secure portal', category: 'Lifecycle', phone: '+359 88 555 6666', email: 'ivan.smilov@bulbank.bg' },
    { id: 't4', clientName: 'Sarah Connor', description: "Customer's birthday tomorrow", priority: 'Low', suggestedAction: 'Send a personalized greeting and loyalty offer', category: 'Lifecycle', phone: '+359 88 777 8888', email: 'sarah.connor@bulbank.bg' },
    { id: 't5', clientName: 'Boris Vazov', description: 'Trend of decreasing balance over the last 3 months', priority: 'Medium', suggestedAction: 'Schedule a call to check status', category: 'Behavioral', phone: '+359 88 999 0000', email: 'boris.vazov@bulbank.bg' },
    { id: 't6', clientName: 'Diana Prince', description: 'Credit card expires next month', priority: 'Medium', suggestedAction: 'Confirm delivery address for the new card', category: 'Lifecycle', phone: '+359 88 222 1111', email: 'diana.prince@bulbank.bg' },
  ] as AITask[],
  clients: [
    { 
      id: 'C-001', 
      name: 'Emilia Rikardova', 
      email: 'emilia.r@bulbank.bg', 
      phone: '+359 88 123 4567', 
      address: '12 Ivan Vazov St, Sofia', 
      lifetimeValue: 125000, 
      engagementScore: 88, 
      totalAssets: 450000, 
      totalLiabilities: 120000, 
      lastContactDate: '2026-03-27', 
      status: 'Customer',
      criticalInsight: 'High potential for investment plan',
      products: {
        accounts: [
          { name: 'Current account', balance: 232.71, details: 'EUR' },
          { name: 'Deposit', balance: 3000, details: 'EUR' },
        ],
        cards: [
          { name: 'Debit standard card', balance: 100, details: 'EUR' },
          { name: 'Credit card Premium', balance: 2032, revolvingLimit: 2000 },
        ],
        investments: [
          { name: 'Direct investment One Market J.P.Morgan US equity fund', balance: 5656, investedAmount: 5000, profit: 656 },
          { name: 'Investment Plan', balance: 406, investedAmount: 400, profit: 6 },
          { name: 'Pension fund Allianz', balance: 15050, accumulatedAmount: 15050 },
        ],
        loans: [
          { name: 'Consumer loan', balance: 3000, outstandingBalance: 3000 },
          { name: 'Mortgage loan', balance: 65000, outstandingBalance: 65000 },
        ]
      },
      opportunities: [{ id: 'o1', product: 'Premium Credit Card', status: 'In Progress', value: 500 }, { id: 'o2', product: 'Private Banking Upgrade', status: 'New', value: 2500 }], 
      cases: [{ id: 'c1', type: 'Service request', status: 'In Progress', description: 'Address change verification' }], 
      interactions: [] 
    },
    { id: 'C-002', name: 'Daniel Milev', email: 'd.milev@bulbank.bg', phone: '+359 88 987 6543', address: '88 Vitosha Blvd, Sofia', lifetimeValue: 850000, engagementScore: 95, totalAssets: 2100000, totalLiabilities: 500000, lastContactDate: '2026-03-26', status: 'Customer', criticalInsight: 'Key corporate contact', opportunities: [{ id: 'o3', product: 'Commercial Loan', status: 'Closed', value: 50000 }], cases: [], interactions: [] },
    { id: 'C-003', name: 'Sofia Cheneva', email: 'sophia.cheneva@bulbank.bg', phone: '+359 88 555 0199', address: '45 Graf Ignatiev St, Sofia', lifetimeValue: 45000, engagementScore: 72, totalAssets: 150000, totalLiabilities: 320000, lastContactDate: '2026-03-26', status: 'Customer', criticalInsight: 'Refinancing opportunity', opportunities: [{ id: 'o4', product: 'Mortgage Refinance', status: 'In Progress', value: 1200 }], cases: [{ id: 'c2', type: 'Blocked card', status: 'Closed', description: 'False fraud alert' }], interactions: [] },
    { id: 'P-001', name: 'Victor Traianov', email: 'v.traianov@prospect.bg', phone: '+359 88 111 2233', address: '5 Moskovska St, Sofia', lifetimeValue: 0, engagementScore: 45, totalAssets: 0, totalLiabilities: 0, lastContactDate: '2026-04-20', status: 'Prospect', criticalInsight: 'New mortgage inquiry', opportunities: [], cases: [], interactions: [] },
    { id: 'P-002', name: 'Irena Kostova', email: 'i.kostova@prospect.bg', phone: '+359 88 444 5566', address: 'Mladost 1, Sofia', lifetimeValue: 0, engagementScore: 30, totalAssets: 0, totalLiabilities: 0, lastContactDate: '2026-04-18', status: 'Prospect', criticalInsight: 'Investment products interest', opportunities: [], cases: [], interactions: [] },
    { id: 'C-004', name: 'Georgi Petrov', email: 'g.petrov@bulbank.bg', phone: '+359 88 222 3333', address: '10 Oborishte St, Sofia', lifetimeValue: 320000, engagementScore: 90, totalAssets: 1200000, totalLiabilities: 150000, lastContactDate: '2026-03-25', status: 'Customer', criticalInsight: 'High loyalty', opportunities: [], cases: [], interactions: [] },
    { id: 'C-005', name: 'Maria Stoyanova', email: 'm.stoyanova@bulbank.bg', phone: '+359 88 444 5555', address: '55 Bulgaria Blvd, Plovdiv', lifetimeValue: 150000, engagementScore: 85, totalAssets: 600000, totalLiabilities: 50000, lastContactDate: '2026-03-24', opportunities: [], cases: [], interactions: [] },
    { id: 'C-006', name: 'Nikolay Kolev', email: 'n.kolev@bulbank.bg', phone: '+359 88 666 7777', address: '22 Tsar Simeon St, Varna', lifetimeValue: 500000, engagementScore: 92, totalAssets: 1800000, totalLiabilities: 200000, lastContactDate: '2026-03-23', opportunities: [], cases: [], interactions: [] },
    { id: 'C-007', name: 'Elena Dimitrova', email: 'e.dimitrova@bulbank.bg', phone: '+359 88 888 9999', address: '5 Targovska St, Burgas', lifetimeValue: 280000, engagementScore: 80, totalAssets: 950000, totalLiabilities: 100000, lastContactDate: '2026-03-22', opportunities: [], cases: [], interactions: [] },
    { id: 'C-008', name: 'Stefan Angelov', email: 's.angelov@bulbank.bg', phone: '+359 88 111 2222', address: '15 Slavyanska St, Ruse', lifetimeValue: 180000, engagementScore: 75, totalAssets: 550000, totalLiabilities: 80000, lastContactDate: '2026-03-21', opportunities: [], cases: [], interactions: [] },
    { id: 'C-009', name: 'Petar Todorov', email: 'p.todorov@bulbank.bg', phone: '+359 88 333 4444', address: '33 Gurko St, Stara Zagora', lifetimeValue: 420000, engagementScore: 88, totalAssets: 1400000, totalLiabilities: 180000, lastContactDate: '2026-03-20', opportunities: [], cases: [], interactions: [] },
    { id: 'C-010', name: 'Radoslav Borisov', email: 'r.borisov@bulbank.bg', phone: '+359 88 555 6666', address: '10 Dunav St, Pleven', lifetimeValue: 220000, engagementScore: 82, totalAssets: 750000, totalLiabilities: 120000, lastContactDate: '2026-03-19', opportunities: [], cases: [], interactions: [] },
  ] as Client[],
};

export const leadSources: LeadSource[] = [
  { source: 'External referral', count: 12, stages: { new: 5, inProgress: 4, closed: 3 } },
  { source: 'Employee referral', count: 8, stages: { new: 2, inProgress: 4, closed: 2 } },
  { source: 'Client referral', count: 15, stages: { new: 6, inProgress: 5, closed: 4 } },
  { source: 'Digital channel', count: 24, stages: { new: 10, inProgress: 8, closed: 6 } },
];

export const productPenetration: ProductPenetration[] = [
  { product: 'Current Accounts', portfolio: 92, bankAverage: 95 },
  { product: 'Deposit Accounts', portfolio: 65, bankAverage: 58 },
  { product: 'Overdraft', portfolio: 40, bankAverage: 45 },
  { product: 'Credit Cards', portfolio: 78, bankAverage: 72 },
  { product: 'Consumer Loans', portfolio: 35, bankAverage: 30 },
  { product: 'Investment Plans', portfolio: 22, bankAverage: 18 },
];

export const getMockData = (lang: Language) => {
  const baseData = lang === 'BG' ? BG_DATA : EN_DATA;
  
  // Link interactions back to clients
  const clientsWithInteractions = baseData.clients.map(client => ({
    ...client,
    interactions: baseData.interactions.filter(i => i.clientName === client.name)
  }));

  const topRevenueClients = [...clientsWithInteractions].sort((a, b) => b.lifetimeValue - a.lifetimeValue);
  const topVolumeClients = [...clientsWithInteractions].sort((a, b) => (b.totalAssets + b.totalLiabilities) - (a.totalAssets + a.totalLiabilities));

  return {
    ...baseData,
    clients: clientsWithInteractions,
    topRevenueClients,
    topVolumeClients,
    leadSources,
    productPenetration
  };
};

// Keep exports for backward compatibility if needed, but they will be static (defaulting to BG or EN)
export const currentUser = EN_DATA.currentUser;
export const managerUser = EN_DATA.managerUser;
export const regionalManagerUser = EN_DATA.regionalManagerUser;
export const interactions = EN_DATA.interactions;
export const aiTasks = EN_DATA.aiTasks;
export const clients = EN_DATA.clients;
export const topRevenueClients = [...EN_DATA.clients].sort((a, b) => b.lifetimeValue - a.lifetimeValue);
export const topVolumeClients = [...EN_DATA.clients].sort((a, b) => (b.totalAssets + b.totalLiabilities) - (a.totalAssets + a.totalLiabilities));
