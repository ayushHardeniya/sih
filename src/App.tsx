import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AdmissionsPage from './modules/admissions/AdmissionsPage';
import FeesPage from './modules/fees/FeesPage';
import HostelPage from './modules/hostel/HostelPage';
import ExaminationPage from './modules/examination/ExaminationPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/fees" element={<FeesPage />} />
          <Route path="/hostel" element={<HostelPage />} />
          <Route path="/examination" element={<ExaminationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;