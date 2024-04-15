import React, { useState, useEffect } from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/QuestionsPage.css';

const PersonalityPage = () => {

    const questions = [
        "I tend to dominate conversations and discussions when spending time with my friends.",
        "When making plans with friends, I prefer to take the lead and suggest activities.",
        "I am comfortable with asserting my opinions and ideas even in challenging situations.",
        "I enjoy challenges and strive to overcome obstacles in order to achieve my goals.",
        "I am comfortable making tough decisions, even if they may not be popular among others.",
        "I enjoy being the life of the party and often find myself in the center of social interactions.",
        "I find pleasure in building relationships with others.",
        "I enjoy bringing people together and often initiate group outings or gatherings.",
        "I am persuasive and can effectively communicate my ideas.", 
        "I enjoy entertaining others and making them laugh.",
        "I value stability and prefer a predictable routine in my daily life.",
        "I am known for my calm demeanor and ability to remain composed under stressful conditions.",
        "I am patient and tolerant of others' mistakes or shortcomings.",
        "I am a loyal and dependable friend, always there to offer support and stability in times of need.",
        "I prioritize building strong, long-lasting friendships with others.",
        "I tend to carefully consider the consequences of my actions and strive to make responsible decisions.",
        "I enjoy analyzing problems and finding innovative solutions.",
        "I enjoy analyzing problems and finding innovative solutions.",
        "I pay attention to the needs and preferences of my friends, striving to be considerate and thoughtful in my interactions.",
        "I am proactive in resolving conflicts or misunderstandings that may arise in my friendships.",
    ];


    const [questionStates, setQuestionStates] = useState(Array.from({ length: questions.length }, () => null));
    const [currentSection, setCurrentSection] = useState(0);

    /*
    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await fetch('tests/disc.json');

                if (!response.ok) {
                    throw new Error('Network failed');
                }

                const data = await response.json();
                setQuestions(data.questions);
                setQuestionStates(Array.from({ length: data.questions.length }, () => null));

            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, []);
    */
    
    const allQuestionsAnswered = questionStates.every(state => state !== null);

    const handleChange = (questionIndex, value) => {
        const newQuestionStates = [...questionStates];
        newQuestionStates[questionIndex] = value;
        setQuestionStates(newQuestionStates);
    };

    const handleNextSection = () => {
        setCurrentSection(currentSection + 1);
    };

    const handlePreviousSection = () => {
        setCurrentSection(currentSection - 1);
    };

    const handleSubmit = () => {
        console.log("here: ", questionStates); 
    };

    const renderQuestionsInSection = (startIndex, endIndex) => {
        return questions.slice(startIndex, endIndex).map((question, index) => (
            <div key={`question-${startIndex + index}`} className="question">
                <p className="questionText">{`${startIndex + index + 1}. ${question}`}</p>
                <label className="questionLabel">
                    {[...Array(5)].map((_, optionIndex) => (
                        <span className="questionSpan" key={`radio-span-${startIndex + index}-${optionIndex}`}>
                            <input
                                className="questionInput"
                                type="radio"
                                id={`radio-${startIndex + index}-${optionIndex}`}
                                name={`q${startIndex + index + 1}`}
                                value={optionIndex - 2}
                                checked={questionStates[startIndex + index] === (optionIndex - 2)}
                                onChange={() => handleChange(startIndex + index, optionIndex - 2)}
                            />
                            <label htmlFor={`radio-${startIndex + index}-${optionIndex}`}>
                                {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'][optionIndex]}
                            </label>
                        </span>
                    ))}
                </label>
            </div>
        ));
    };

    return (
        <>
            <UserHeader />

            <div className="questionset">
                <h2 className="testTitleName">DISC</h2>
                {renderQuestionsInSection(currentSection * 5, (currentSection + 1) * 5)}
                <div className="QPnav-buttons">
                    {currentSection > 0 && (
                        <button id="prevButton" className="btn btn-dark" onClick={handlePreviousSection}>Previous</button>
                    )}
                    {(currentSection < Math.ceil(questions.length / 5) - 1) && (
                        <button id="nextButton" className="btn btn-dark" onClick={handleNextSection}>Next</button>
                    )}
                    {currentSection === Math.ceil(questions.length / 5) - 1 && (
                        <button id="submitButton" className="btn btn-dark" onClick={handleSubmit} disabled={!allQuestionsAnswered}>Submit</button>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default PersonalityPage;
