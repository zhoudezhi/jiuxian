/**
 * Created by zhoudezhi on 2017/8/6.
 */
//main.js
import React from 'react';
import ReactDom from 'react-dom';
import Component1 from './components/Component1.jsx';

ReactDom.render(
    <Component1 name="zhoudezhi" />,
    document.querySelector('.content')
);
