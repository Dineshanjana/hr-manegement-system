import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Analytics from './pages/Analytics';
import Dashboard from './pages/Dashboard';
import LeaveManagement from './pages/LeaveManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import { ToastContainer } from 'react-toastify';
import PersonnelForm from './components/PersonnelForm';
import PersonnelList from './components/PersonnelList';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import PersonnelDetails from './components/PersonnelDetails';
import AddColumnForm from './components/AddColumnForm';
import Notifications from './pages/notification';
import Logout from './pages/logout'; 
import PostingForm from './components/PostingFrom';
import PostingTable from './components/postingtable';
import LeaveForm from './components/LeaveForm';
import LeaveTable from './components/LeaveTable';
import AdditionalColumns from './components/AdditionalColumns';




const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leave-management" element={<LeaveManagement />} /> 
                <Route path="/attendance-management" element={<AttendanceManagement />} /> 
                <Route path="/add-personnel" element={<PersonnelForm />} />
                <Route path="/personnel-list" element={<PersonnelList />} /> 
                <Route path="/course-list" element={<CourseList />} />
                <Route path="/course-form" element={<CourseForm />} />
                <Route path="/add-field" element={<AddColumnForm />} />
                <Route path="/personnelDetails/:service_number" element={<PersonnelDetails />} />
                <Route path="/notification" element={<Notifications />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/postingform" element={<PostingForm />} />
                <Route path="/postings" element={<PostingTable />} />
                <Route path="/leaveform" element={<LeaveForm />} />
                <Route path="/leavetable" element={<LeaveTable />} />
                <Route path='/additionalcolumns' element={<AdditionalColumns/>} />
            </Routes>
            <Footer />
            <ToastContainer />
        </Router>
    );
};

export default App;
