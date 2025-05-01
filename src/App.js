import React from 'react';
import LoginPage from './pages/Authentication/Login'; // Import the LoginPage component
import AccessPopup from './components/PopUp'; // Import the AccessPopups component
import TeacherHome from './pages/Teacher/welcome_page'; // Import the StudentHome component
import CheckboxQuestion from './components/Student/mcq'; // Import the CheckboxQuestion component
import QuizMetadataForm from './components/Student/quiz_metadata'; // Import the QuizMetadataForm component
import RadioButtonQuestion from './components/Student/radio_button'; // Import the RadioButtonQuestion component
import './index.css';

function App() {
  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    //   <QuizCreator />
    // </div>
    // <AccessPopup/>
    // <TeacherHome/>
    <>
    <CheckboxQuestion/>
    <RadioButtonQuestion/>
    <QuizMetadataForm/>
    </>
  );
}

export default App;
