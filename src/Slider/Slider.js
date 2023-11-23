import React, { useState } from 'react';
import "./Slider.css";

function Slider(props) {
    const maxRange = props.defaultMaxPrice;
    const minDistance = 200;

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(maxRange);
    const [minPriceValue, setMinPriceValue] = useState(0);
    const [maxPriceValue, setMaxPriceValue] = useState(maxRange);

    const handleMinChange = (event) => {
        const newMinPrice = parseInt(event.target.value, 10);

        setMinPrice(newMinPrice);
        setMinPriceValue(newMinPrice);

        if (newMinPrice < maxPrice - minDistance) {
            setMinPrice(newMinPrice);
            setMinPriceValue(newMinPrice);
        } else {
            setMinPrice(maxPrice - minDistance);
            setMinPriceValue(maxPrice - minDistance);
        }
    }

    const handleMaxChange = (event) => {
        const newMaxPrice = parseInt(event.target.value, 10);

        setMaxPrice(newMaxPrice);
        setMaxPriceValue(newMaxPrice);

        if (newMaxPrice > minPrice + minDistance) {
            setMaxPrice(newMaxPrice);
            setMaxPriceValue(newMaxPrice);
        } else {
            setMaxPrice(minPrice + minDistance);
            setMaxPriceValue(minPrice + minDistance);
        }
    };

    const handleMinPriceChange = (event) => {
        const newMinPrice = Math.max(0, Math.min(event.target.value, maxPrice - minDistance));
        setMinPrice(newMinPrice);
        setMinPriceValue(event.target.value);
    }

    const handleMinPriceBlur = () => {
        setMinPriceValue(minPrice);
    }

    const handleMaxPriceChange = (event) => {
        const newMaxPrice = Math.max(minPrice + minDistance, Math.min(event.target.value, maxRange));
        setMaxPrice(newMaxPrice);
        setMaxPriceValue(event.target.value);
    }

    const handleMaxPriceBlur = () => {
        setMaxPriceValue(maxPrice);
    }

    const getBarStyles = () => {
        return {
            left: `${(minPrice / maxRange) * 100}%`,
            width: `${(maxPrice - minPrice) / 15}%`
        }
    }

    return (
        <div className="slider">
            <div className="slider__inputs">
                <div className='slider__input-wrapper'>
                    <input
                        className='slider__input'
                        value={minPriceValue}
                        onBlur={handleMinPriceBlur}
                        onChange={handleMinPriceChange} />
                    <span className='slider__currency'>₽</span>
                </div>
                <div className='slider__input-wrapper'>
                    <input
                        className='slider__input'
                        value={maxPriceValue}
                        onBlur={handleMaxPriceBlur}
                        onChange={handleMaxPriceChange} />
                    <span className='slider__currency'>₽</span>
                </div>
            </div>
            <div className='slider__bar-wrapper'>
                <div className="slider__bar" style={getBarStyles()}></div>
            </div>
            <div className='range__inputs'>
                <input
                    className='range__input range__min'
                    type='range'
                    max={maxRange}
                    value={minPrice}
                    onChange={handleMinChange} />
                <input
                    className='range__input range__max'
                    type='range'
                    max={maxRange}
                    value={maxPrice}
                    onChange={handleMaxChange} />
            </div>
        </div>
    )
}

export default Slider;
