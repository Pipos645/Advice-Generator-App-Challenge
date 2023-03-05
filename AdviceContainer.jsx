import React, {useState, useEffect} from 'react';
import patternDividerDesktop from "../assets/pattern-divider-desktop.svg";
import patternDividerMobile from "../assets/pattern-divider-mobile.svg";
import dice from "../assets/icon-dice.svg";
import Axios from "axios";

export const AdviceContainer = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [advice, setAdvice] = useState("");
    const [adviceNb, setAdviceNb] = useState(0);

    const getAdvice = async () => {
        await Axios.get("https://api.adviceslip.com/advice").then((response) => {
            setAdvice(response.data.slip.advice);
            setAdviceNb(response.data.slip.id);
        });
    };

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleWindowResize);
        console.log(windowWidth);
        return () => {
            window.addEventListener("resize", handleWindowResize);
        }; 
    });
    
    getAdvice();

  return (
    <div className="relative flex flex-col h-auto lg:w-[32rem] w-full mx-4 bg-[hsl(217,_19%,_24%)] rounded-3xl items-center font-manrope shadow-3xl">
        <p className="lg:py-10 pt-10 pb-5 text-[12px] tracking-[0.25rem] text-[hsl(150,_100%,_66%)]">ADVICE #{adviceNb}</p>
        <h1 className="text-[28px] text-[hsl(193,_38%,_86%)] text-center px-8 pb-10">"{advice}"</h1>
        {windowWidth <= 375 ? <img className="mb-16" src={patternDividerMobile} alt="pattern divider" /> : <img className="mb-16" src={patternDividerDesktop} alt="pattern divider" />}
        <button onClick={getAdvice} className="absolute bottom-[-30px] bg-cover bg-center rounded-full overflow-hidden hover:shadow-xl hover:shadow-[hsl(150,_100%,_66%)] hover:transition-all hover:ease-in-out hover:duration-300"><img className="p-[18px] bg-[hsl(150,_100%,_66%)]" src={dice} alt="dice" /></button>
    </div>
  )
}