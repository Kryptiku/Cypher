import React, {Component} from 'react';

import './Node.css'

export default class Node extends Component{
    render(){
        const {
            col, 
            row,
            isWall,
            isFinish,
            isStart,
            onMouseDown,
            onMouseUp, 
            onMouseEnter,
        } = this.props;
        const extraClassName = isFinish 
        ? 'node-finish' 
        : isStart 
        ? 'node-start' 
        : isWall 
        ? 'node-wall' 
        : '';  

        return (
            <div 
            id={`node-${row}-${col}`}
            onMouseDown = {() => onMouseDown(row, col)}
            onMouseUp = {() => onMouseUp()}
            onMouseEnter = {() => onMouseEnter(row, col)}
            className = {`node ${extraClassName}`}></div>
        );
    }
}