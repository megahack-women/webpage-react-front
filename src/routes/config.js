import ChatPage from '../pages/ChatPage'
import AnalysisPage from '../pages/AnalysisPage/AnalysisPage';
import AnalysisGroup from '../pages/AnalysisGroup/AnalysisGroup';

export const ROUTES_CONFIG = [
  { privated: false, path: '/', component: ChatPage },
  { privated: false, path: '/analysis-page', component: AnalysisPage },
  { privated: false, path: '/group-analysis', component: AnalysisGroup },
  { privated: false, path: '*', component: ChatPage },
];
