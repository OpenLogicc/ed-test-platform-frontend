import './App.css';
import './global.css';
import { Routes, Route, Link } from 'react-router-dom';
import { AdminPage } from './pages/adminPage';
import { Home } from './pages/Home';
import { TestPage } from './components/testSeries/TestPage';
import { CreateTest } from './components/admin-createTest/CreateTest';
import MyTests from './components/my-tests/MyTests';
import { TestSeries } from './components/testSeries/TestSeries';
import Login from './components/login/Login';
// import { TestSeries } from './components/testSeries/testSeries';

function App() {
    return (
        <div className="min-h-screen bg-white text-slate-900">
          
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin/create-test" element={<CreateTest />} />
                <Route path="/test/:id" element={<MyTests />} />
                {/* <Route path="/test/:id" element={<TestPage />} /> */}
            </Routes>

        </div>
    );
}

export default App;
