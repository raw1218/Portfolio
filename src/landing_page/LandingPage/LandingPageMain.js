import React, { useState, useEffect } from 'react'

function LandingPageMain() {


    const words = ["Software Engineer", "Problem Solver", "Lifelong Learner",]

    const [cursorVisible, setCursorVisible] = useState(true);
    const [currentWord, setCurrentWord] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

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
    }, [currentWord, wordIndex, isDeleting]);

    
    



    var word = currentWord + (cursorVisible ? "_" : "");
    if(word === "")word = "_"


  return (
    <div className="landing-page-main-text-overlay">
    <div className="landing-page-main-text-overlay-upper">
      <p id="HelloWorld" className="computer-text">Hello World!</p>
      <p id="MyNameIs" className="main-text-small">My name is</p>
      <h1 id="Name" className="main-text-big">Ronald Wood</h1>
    </div>

    <div className="landing-page-main-text-overlay-lower">
      <p id="IAmA" className="main-text-small">I am a</p>
      <h1 id="Title" className="main-text-big computer-text">{word}</h1>
    </div>
  </div>
  )
}

export default LandingPageMain