import React, { Component } from 'react';
import backtotop from '../assets/svg-icons/back-to-top.svg';
export default function(){
    return (
        <a className="back-to-top" href="#">
            <img src={backtotop} alt="arrow" className="back-icon" />
        </a>
    );
}