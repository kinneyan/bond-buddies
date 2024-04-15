import React, { useState } from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/QuestionsPage.css';

const PersonalityPage = () => {

    const questions = [
        "I enjoy spending one on one uninterrupted time with friends.",
        "Positive and uplifting words have a lasting impact on my self-esteem and happiness.",
        "I enjoy giving gifts to friends that are close to me.",
        "I do acts of gestures for my friends even if they dont ask for them.",
        "I appreciate it when friends surprise me with thoughtful gifts.",
        "I feel appreciated and loved when friends go out of their way to do something kind for me.",
        "Hearing sincere compliments from friends boosts my confidence and makes my day.",
        "I often find myself going out of my way to plan surprises for my friends and loved ones.",
        "Constructive feedback, delivered with kindness, helps me grow and improve.",
        "I enjoy when my friends show active participation in my personal interests.", 
        "I believe that gifts are an accurate representation of love and thoughtfulness.",
        "I find joy in taking on tasks to make the lives of my friends easier.",
        "I often find myself expressing appreciation and admiration for the people I care about.",
        "I prefer to spend time with friends in person rather than interact with them virtually.",
        "I love receiving personalized gifts from friends.",
        "I enjoy it when my friends offer help during tough situations.",
        "Receiving an honest supportive response from a friend in a conversation makes me feel good.",
        "I enjoy working towards a common goal with my friends.",
        "I often like to give friends tokens of appreciation.",
        "I appreciate it when my friends initiate plans to spend time with me.",
    ];

    const [questionStates, setQuestionStates] = useState(Array.from({ length: questions.length }, () => null));
    const [currentSection, setCurrentSection] = useState(0);

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
                <h2 className="testTitleName">Friendship Language</h2>
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
