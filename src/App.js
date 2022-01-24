import './App.css';
import { Image } from 'antd';
import React from 'react';


function CardComponent(props){

  return(
    <Image
    width = {200}
    src = {require("./images/blank.png")}
    preview = {false} 
    />
  );
}


class BoardComponent extends React.Component{

  renderImage(i){
    return <CardComponent /> //need to add Value i based on Card Array index
  }

  render(){
    return (
      

      <div>
        <div className='board-row'>
          {[0,1,2,3].map((n) => this.renderImage(n))}
        </div>
        <div className='board-row'>
          {[4,5,6,7].map((n) => this.renderImage(n))}
        </div>
        <div className='board-row'>
          {[8,9,10,11].map((n) => this.renderImage(n))}
        </div>
      </div>
    );
  }

}

export default BoardComponent;