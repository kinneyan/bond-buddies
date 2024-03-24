import React, { useState } from 'react';
import UserHeader from '../components/UserHeader';
import Footer from '../components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/QuestionsPage.css';

const PersonalityPage = () => {
    const questions = [
        "1. It’s easy for you to make friends.",
        "2. You enjoy exploring the unknown.",
        "3. Seeing other people cry makes you want to cry as well.",
        "4. You always have multiple plans prepared in the event that one fails.",
        "5. You trust your instincts and gut feelings when making decisions.",
        "6. You wait for others to approach you first at public events.",
        "7. You find pleasure in setting reachable goals for yourself.",
        "8. You value helping others achieve their goals.",
        "9. You like to use organizing tools to manage your schedule.",
        "10. You enjoy learning through hands-on experiences and experimentation.",
        "11. You enjoy approaching others first and striking up conversation.",
        "12. You prefer not to have invested conversations about abstract ideas.",
        "13. You view decision-making based on emotion as inefficient.",
        "14. You prefer to go through your days without a schedule.",
        "15. You enjoy participating in team-based activities.",
        "16. Your dreams tend to be vivid and creative.",
        "17. In a group, you prefer to listen than participate in the discussion.",
        "18. You often notice small changes in your environment that others might overlook.",
        "19. You believe it’s more important to rely on rationality than emotions.",
        "20. I'm open to new experiences and opportunities, even if they disrupt my existing plans.",
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
                <p className="questionText">{question}</p>
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
                <h2 className="testTitleName">Personality Type</h2>
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
