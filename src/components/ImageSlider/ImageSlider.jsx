import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

import "./ImageSlider.scss";
import slider1 from "../../services/images/death-star.jpg";
import slider2 from "../../services/images/jedi.jpg";
import slider3 from "../../services/images/stormer.jpg";

const ImageSlider = () => {

    const [current, setCurrent] = useState(0);
    const intervalSlider = useRef(0)

    const SliderData = [
        {
          image: slider1,
          title: 'WHATS THE GREATEST SHIP DESIGN IN STAR WARS?',
          text: 'Learn about the secrets of star wars ships.',
          theme: 'light',
          button: 'learn more',
          link: '/starships'
        },
        {
          image: slider2,
          title: 'STAR WARS INSIDE INTEL: THE PILOTS',
          text: 'Jump into the cockpit for a dogfight of words.',
          theme: 'dark',
          button: 'more details',
          link: '#!'
        },
        {
          image: slider3,
          title: 'HEROES OF STAR WARS',
          text: 'We are all the Republic. Meet the actors behind-the-scenes.',
          theme: 'dark',
          button: 'read now',
          link: '/characters'
        }
    ]

    const prevSlide = () => {
        setCurrent(current => current === 0 ? SliderData.length - 1 : current - 1)
        clearInterval(intervalSlider.current)
        intervalSlider.current = null
    }

    const nextSlide = () => {
        setCurrent(current => current === SliderData.length - 1 ? 0 : current + 1)
        clearInterval(intervalSlider.current)
        intervalSlider.current = null
    }

    useEffect(() => {
        intervalSlider.current = setInterval(() => {
            setCurrent(current => current === SliderData.length - 1 ? 0 : current + 1)
        }, 8000)
        return () => clearInterval(intervalSlider.current)
    }, [])

    useEffect(() => {
        const allImages = document.querySelectorAll(".slider__item")
        for (let img of allImages) {
            img.style.transform = `translateX(-${current}00%)`
        }
    }, [current])

    return (
        <section className="slider" id="slider">
            <button className="slider__button slider__button--left" onClick={prevSlide}><MdArrowBackIos/></button>
            <button className="slider__button slider__button--right" onClick={nextSlide}><MdArrowForwardIos/></button>
            <ul className="slider__container">
                {SliderData.map ((slide, index) => (
                    <li key={index} className={`slider__item`}>
                        <img src={slide.image} alt="star" className="slider__image" />
                        <div className={`slider__info slider__info--${slide.theme}`}>
                            <h2>{slide.title}</h2>
                            <p>{slide.text}</p>
                            <Link to={slide.link}>{slide.button}</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ImageSlider;