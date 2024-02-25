import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';

function FlipCard() {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  return (

    <div className="wrapper">
      <img
        src="https://img.hotimg.com/images-removebg-preview.png"
        alt="Image"
        className="image"
      />
      <img
        src="https://img.hotimg.com/images-removebg-preview.png"
        alt="Image"
        className="image2"
      />
      <div className="card-switch">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            onChange={handleToggle}
            checked={isSignUp}
          />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
            <div  className={`flip-card__front ${isSignUp ? 'hidden' : ''}`}>
              <div style={{ fontFamily : 'myfont'}} className="title">Log in</div>
              <form className="flip-card__form" action="">
                <input className="flip-card__input" name="email" placeholder="Email" type="email" />
                <input className="flip-card__input" name="password" placeholder="Password" type="password" />
                <Link to={'/'} className="flip-card__btn">Let`s go!</Link>
              </form>
            </div>
            <div className={`flip-card__back ${isSignUp ? '' : 'hidden'}`}>
              <div style={{ fontFamily : 'myfont'}} className="title">Sign up</div>
              <form className="flip-card__form" action="">
                <input className="flip-card__input" placeholder="Name" type="text" />
                <input className="flip-card__input" name="email" placeholder="Email" type="email" />
                <input className="flip-card__input" name="password" placeholder="Password" type="password" />
                <button className="flip-card__btn">Confirm!</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}

export default FlipCard;
