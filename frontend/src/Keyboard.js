import React, { useState, useEffect, useRef } from 'react';
import './Keyboard.css';

const paragraphs = [
  "Their politician was, in this moment, a notour paperback. The first armless grouse is, in its own way, a gear. The coat is a wash. However, a cake is the llama of a caravan. Snakelike armies show us how playgrounds can be viscoses. Framed in a different way, they were lost without the fatal dogsled that composed their waitress. Far from the truth, the cockney freezer reveals itself as a wiggly tornado to those who look. The first hawklike sack.",
  "Authors often misinterpret the lettuce as a folklore rabbi, when in actuality it feels more like an uncursed bacon. Pursued distances show us how mother-in-laws can be charleses. Authors often misinterpret the lion as a cormous science, when in actuality it feels more like a leprous lasagna. Recent controversy aside, their band was, in this moment, a racemed suit. The clutch of a joke becomes a togaed chair. The first pickled chess is.",
  "In modern times the first scrawny kitten is, in its own way, an input. An ostrich is the beginner of a roast. An appressed exhaust is a gun of the mind. A recorder is a grade from the right perspective. A hygienic is the cowbell of a skin. Few can name a dun brazil that isn't a highbrow playroom. The unwished beast comes from a thorny oxygen. An insured advantage's respect comes with it the thought that the lucid specialist is a fix.",
  "What we don't know for sure is whether or not a pig of the coast is assumed to be a hardback pilot. The literature would have us believe that a dusky clave is not but an objective. Few can name a limbate leo that isn't a sunlit silver. The bow is a mitten. However, the drawer is a bay. If this was somewhat unclear, few can name a paunchy blue that isn't a conoid bow. The undrunk railway reveals itself as a downstage bamboo to those who look.",
  "An aunt is a bassoon from the right perspective. As far as we can estimate, some posit the melic myanmar to be less than kutcha. One cannot separate foods from blowzy bows. The scampish closet reveals itself as a sclerous llama to those who look. A hip is the skirt of a peak. Some hempy laundries are thought of simply as orchids. A gum is a trumpet from the right perspective. A freebie flight is a wrench of the mind. Some posit the croupy.",
  "A baby is a shingle from the right perspective. Before defenses, collars were only operations. Bails are gleesome relatives. An alloy is a streetcar's debt. A fighter of the scarecrow is assumed to be a leisured laundry. A stamp can hardly be considered a peddling payment without also being a crocodile. A skill is a meteorology's fan. Their scent was, in this moment, a hidden feeling. The competitor of a bacon becomes a boxlike cougar.",
  "A broadband jam is a network of the mind. One cannot separate chickens from glowing periods. A production is a faucet from the right perspective. The lines could be said to resemble zincoid females. A deborah is a tractor's whale. Cod are elite japans. Some posit the wiglike norwegian to be less than plashy. A pennoned windchime's burst comes with it the thought that the printed trombone is a supply. Relations are restless tests.",
  "In recent years, some teeming herons are thought of simply as numbers. Nowhere is it disputed that an unlaid fur is a marble of the mind. Far from the truth, few can name a glossy lier that isn't an ingrate bone. The chicken is a giraffe. They were lost without the abscessed leek that composed their fowl. An interviewer is a tussal bomb. Vanward maracas show us how scarfs can be doubts. Few can name an unguled punch that isn't pig.",
  "A cough is a talk from the right perspective. A designed tractor's tray comes with it the thought that the snuffly flax is a rainbow. Their health was, in this moment, an earthy passbook. This could be, or perhaps the swordfishes could be said to resemble healthy sessions. A capricorn is a helium from the right perspective. However, a sled is a mailman's tennis. The competitor of an alarm becomes a toeless raincoat. Their twist was, in this moment.",
  "Authors often misinterpret the flag as a wayless trigonometry, when in actuality it feels more like a bousy gold. Few can name a jasp oven that isn't a stutter grape. They were lost without the huffy religion that composed their booklet. Those waves are nothing more than pedestrians. Few can name a quartered semicolon that isn't a rounding scooter. Though we assume the latter, the literature would have us believe.",
  "This could be, or perhaps few can name a pasteboard quiver that isn't a brittle alligator. A swordfish is a death's numeric. Authors often misinterpret the mist as a swelling asphalt, when in actuality it feels more like a crosswise closet. Some posit the tonal brother-in-law to be less than newborn. We know that the sizes could be said to resemble sleepwalk cycles. Before seasons, supplies were only fighters. Their stew was, in this moment.",
  "The vision of an attempt becomes a lawny output. Dibbles are mis womens. The olden penalty reveals itself as a bustled field to those who look. Few can name a chalky force that isn't a primate literature. However, they were lost without the gamy screen that composed their beret. Nowhere is it disputed that a step-uncle is a plastic neck. The damfool grandparent reveals itself as a stirless robin to those who look. In ancient times."
];

const Keyboard = () => {
    const [paragraph, setParagraph] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [isTyping, setIsTyping] = useState(false);
    const timerRef = useRef(null);

    const inputRef = useRef(null);

    useEffect(() => {
        loadParagraph();
    }, []);

    useEffect(() => {
        if (isTyping && timeLeft > 0) {
            timerRef.current = setInterval(initTimer, 1000);
        } else if (timeLeft === 0) {
            clearInterval(timerRef.current);
            saveScore();
            setIsTyping(false);  // Stop typing when time is up
        }
        return () => clearInterval(timerRef.current);
    }, [isTyping, timeLeft]);

    const loadParagraph = () => {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        setParagraph(paragraphs[randomIndex]);
        setCharIndex(0);
        setMistakes(0);
        setInputValue('');
        setTimeLeft(60);
        setIsTyping(false);
        inputRef.current.focus();
    };

    const initTyping = (e) => {
        const typedChar = e.target.value.split('')[charIndex];
        const characters = paragraph.split('');

        if (charIndex < characters.length && timeLeft > 0) {
            setIsTyping(true);

            if (typedChar == null) {
                if (charIndex > 0) {
                    setCharIndex((prev) => prev - 1);
                    if (characters[charIndex - 1] !== inputValue.charAt(charIndex - 1)) {
                        setMistakes((prev) => prev - 1);
                    }
                }
            } else {
                if (characters[charIndex] === typedChar) {
                    setCharIndex((prev) => prev + 1);
                } else {
                    setMistakes((prev) => prev + 1);
                    setCharIndex((prev) => prev + 1);
                }
            }
        } else {
            clearInterval(timerRef.current);
            saveScore();
        }
        setInputValue(e.target.value);
    };

    const initTimer = () => {
        if (timeLeft > 0) {
            setTimeLeft((prev) => prev - 1);
        } else {
            clearInterval(timerRef.current);
            saveScore();
            setIsTyping(false);  // Stop typing when time is up
        }
    };

    const saveScore = async () => {
        const totalTyped = charIndex;
        const speed = Math.round((totalTyped / 60) * 60); // Characters per minute
        const accuracy = Math.round(((totalTyped - mistakes) / totalTyped) * 100); // Accuracy percentage

        try {
            const response = await fetch('http://localhost:5000/api/scores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ speed, accuracy })
            });
            const data = await response.json();
            console.log('Score saved:', data);
        } catch (err) {
            console.error('Error saving score:', err);
        }
    };

    const resetGame = () => {
        loadParagraph();
        clearInterval(timerRef.current);
        setTimeLeft(60);
        setCharIndex(0);
        setMistakes(0);
        setIsTyping(false);
        setInputValue('');
        inputRef.current.focus();
    };  

    const totalTyped = charIndex;
    const speed = Math.round((totalTyped / 60) * 60);
    const accuracy = Math.round(((totalTyped - mistakes) / totalTyped) * 100);

    return (
        <div class="content-container">
        <div className="game-container">
       
            <h1>Typing Speed Game</h1>
            <div className="typing-text">
                <p>
                    {paragraph.split('').map((char, index) => (
                        <span
                            key={index}
                            className={
                                index < charIndex
                                    ? paragraph[index] === inputValue[index]
                                        ? 'correct'
                                        : 'incorrect'
                                    : ''
                            }
                        >
                            {char}
                        </span>
                    ))}
                </p>
            </div>
            <div className="wrapper">
                <input
                    type="text"
                    className="input-field"
                    value={inputValue}
                    onChange={initTyping}
                    ref={inputRef}
                    autoFocus
                    disabled={timeLeft === 0}  // Disable input when time is up
                />
            </div>
            <div className="content">
                <button onClick={resetGame}>Try Again</button>
                <div className="time">Time left: <span><b>{timeLeft}</b></span>s</div>
                <div className="mistake">Mistakes: <span>{mistakes}</span></div>
                <div className="speed">Speed: <span>{isNaN(speed) || !isFinite(speed) ? 0 : speed}</span> CPM</div>
                <div className="accuracy">Accuracy: <span>{isNaN(accuracy) || !isFinite(accuracy) ? 0 : accuracy}</span>%</div>
            </div>
        </div>
        </div>
    );
};

export default Keyboard;
