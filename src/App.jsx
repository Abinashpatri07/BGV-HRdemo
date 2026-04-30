import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from './pages/DashBoard'
import Home from './pages/Home';
import MainLayout from './Layout/MainLayout';
import CreateCandidateForm from './components/CreateCandidateForm';
import CandidateDetails from './pages/CandidateDetails';
import EditCandidate from './pages/EditCandidate';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
           <Route path="/create-candidate" element={<CreateCandidateForm />} />
           
          <Route path="/candidate/:id" element={<CandidateDetails />} />
          <Route path="/candidate/edit/:id" element={<EditCandidate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
