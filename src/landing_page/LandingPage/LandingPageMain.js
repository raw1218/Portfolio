import React, { useState, useEffect, useCallback, useContext } from 'react'
import { currentPageContext } from '../../App';
import ProjectsPage from '../ProjectsPage/ProjectsPage';

function LandingPageMain({hyperdriveToggled, setHyperdriveToggled}) {



    const {currentPage, setCurrentPage} = useContext(currentPageContext);

    const words = ["Software Engineer", "Problem Solver", "Lifelong Learner",]

    const [cursorVisible, setCursorVisible] = useState(true);
    const [currentWord, setCurrentWord] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);


    const [helloWorld, setHelloWorld] = useState("Hello World!")
    const [myNameIs, setMyNameIs] = useState("My name is")
    const [myName, setMyName] = useState("Ronald Wood")
    const [IAmA, setIAmA] = useState("I am a")

    const [isDeletingWhole, setIsDeletingWhole] = useState(false);
    const [wholeDeleted, setWholeDeleted] = useState(false);



    const deleteNextLetter = ()=>{
        if(currentWord){
            setCurrentWord(prev => prev.slice(0, -1));
            return false;
        }

        if(IAmA){
            setIAmA(prev => prev.slice(0,-1));
            return false;
        }

        if(myName){
            setMyName(prev => prev.slice(0,-1));
            return false;
        }

        if(myNameIs){
            setMyNameIs(prev => prev.slice(0,-1));
            return false;
        }

        if(helloWorld){
            setHelloWorld(prev => prev.slice(0,-1));
            return false;
        }

        return true;


    }

    



    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setCursorVisible(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);



    const deleteTime = 40;
    const typeTime = 75;
    const displayTime = 2500;
    
    function getRandomTime(baseTime) {
        // Generate a random number between baseTime and 1.5 times baseTime
        return baseTime + Math.random() * baseTime * 0.5;
    }
    
    useEffect(() => {
        let typingTimeout;
    
        if(wholeDeleted)return;

        if(isDeletingWhole){
            typingTimeout = setTimeout(() => {
            const isAllDeleted = deleteNextLetter();
            if(isAllDeleted)setWholeDeleted(true);
            }, deleteTime / 3)}
      



        if (isDeleting) {
            typingTimeout = setTimeout(() => {
                setCurrentWord(prevWord => prevWord.slice(0, -1));
                if (currentWord.length === 1) {
                    setIsDeleting(false);
                    setWordIndex(prevIndex => (prevIndex + 1) % words.length);
                }
            }, deleteTime);
        } else if (currentWord.length === words[wordIndex].length) {
            typingTimeout = setTimeout(() => {
                setIsDeleting(true);
            }, displayTime);
        } else {
            typingTimeout = setTimeout(() => {
                setCurrentWord(prevWord => words[wordIndex].slice(0, prevWord.length + 1));
            }, getRandomTime(typeTime));
        }
    
        return () => clearTimeout(typingTimeout);
    }, [wholeDeleted, currentWord, wordIndex, isDeleting, isDeletingWhole, helloWorld, IAmA, myName, myNameIs]);

    
    



    var word = currentWord + (cursorVisible ? "_" : "");
    if(word === "")word = "_"
    
    if(isDeletingWhole)word = currentWord;








    const goToProjectsPage = ()=> {
        setIsDeletingWhole(true);
        setHyperdriveToggled(true);

        setTimeout(() => {
            setHyperdriveToggled(false); // Assuming you want to toggle it back off
        }, 2500); // 2000 milliseconds = 2 seconds

        setTimeout(() => {
            setCurrentPage('projects')// Assuming you want to toggle it back off
        }, 4000); // 2000 milliseconds = 2 seconds
        
    }

    const buttonClassName = 'projects-page-button' + (isDeletingWhole ? '-clicked' : '');
    


  return (
    <div className='landing-page-main-wrapper'>

    <div className='spacer large'></div>
    <div className="landing-page-main-text-overlay">
    <div className="landing-page-main-text-overlay-upper">
      <p id="HelloWorld" className="computer-text">{helloWorld}</p>
      <p id="MyNameIs" className="main-text-small">{myNameIs}</p>
      <h1 id="Name" className="main-text-big">{myName}</h1>
    </div>

    <div className="landing-page-main-text-overlay-lower">
      <p id="IAmA" className="main-text-small">{IAmA}</p>
      <h1 id="Title" className="main-text-big computer-text">{word}</h1>
    </div>
  </div>
    <div className='spacer small'></div>

    <button className={buttonClassName} onClick={goToProjectsPage}>View Projects</button>
    <div className='spacer small'></div>

  </div>
  )
}

export default LandingPageMain