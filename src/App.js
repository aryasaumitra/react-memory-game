import './App.css';
import { Image } from 'antd';
import React from 'react';

const cardArray= [
  {
      name:'fries',
      img: require('./images/fries.png')
  },
  {
      name:'cheeseburger',
      img: require('./images/cheeseburger.png')
  },
  {
      name: 'ice-cream',
      img: require('./images/ice-cream.png')
    },
    {
      name: 'pizza',
      img: require('./images/pizza.png')
    },
    {
      name: 'milkshake',
      img: require('./images/milkshake.png')
    },
    {
      name: 'hotdog',
      img: require('./images/hotdog.png')
    },
    {
      name: 'fries',
      img: require('./images/fries.png')
    },
    {
      name: 'cheeseburger',
      img: require('./images/cheeseburger.png')
    },
    {
      name: 'ice-cream',
      img: require('./images/ice-cream.png')
    },
    {
      name: 'pizza',
      img: require('./images/pizza.png')
    },
    {
      name: 'milkshake',
      img: require('./images/milkshake.png')
    },
    {
      name: 'hotdog',
      img: require('./images/hotdog.png')
    }
]

cardArray.sort(()=>0.5 - Math.random)


function CardComponent(props){

  return(
    <Image
    id = {props.id}
    width = {props.width}
    src = {props.src}
    preview = {props.preview}
    onClick={props.onClick} 
    />
  );
}


class BoardComponent extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      cardChosed: Array(0),
      cardChosedId: Array(0),
      cardsWon:Array(0),
      isWon: false,
      moves:0,
      currentImageArray: Array(cardArray.length).fill(require('./images/blank.png'))
    }
  }


  renderImage(i){
    
    return <CardComponent
      id = {i} 
      src = {this.props.currentImageArray[i]}
      preview = {false} 
      width = {200}
      onClick = {() => this.props.onClick(i)}
      
      /> //need to add Value i based on Card Array index
  }
 
  render(){

    
    return (
      <div >
      <div className='board'>
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
      </div>
    );
  }

}

class Game extends React.Component{

  constructor(props){
    super(props);
    this.state ={
      cardChosed: Array(0),
      cardChosedId: Array(0),
      cardsWon:Array(0),
      isWon: false,
      moves:0,
      currentImageArray: Array(cardArray.length).fill(require('./images/blank.png'))
    }
  }
  checkforMatch(){

    console.log("Inside Check for match")
    console.log(this.state);

    
    let cardId = this.state.cardChosedId;
    let victoryWon = this.state.cardsWon;
    let currentImageArray = this.state.currentImageArray;
    let isWon = this.state.isWon;
    let moves = this.state.moves;
    let selectedCard = this.state.cardChosed;

    moves = moves + 1;

    let optionOne = cardId[0];
    let optionTwo = cardId[1];

    if (selectedCard[0] === selectedCard[1]){
      alert('Wohoooo Match Found')
        currentImageArray[optionOne] = require('./images/white.png');
        currentImageArray[optionTwo] = require('./images/white.png');
        victoryWon.push(selectedCard[0])
    }
    else{
      currentImageArray[optionOne] = require('./images/blank.png');
      currentImageArray[optionTwo] = require('./images/blank.png');
      alert('So Sooory');
    }
    selectedCard = []
    cardId = []

    console.log(victoryWon);

    if(victoryWon.length === cardArray.length/2){
      isWon = true;

      alert(`You wooon!!!! within ${moves}`);
      
    }

    this.setState({
      isWon:isWon,
      moves:moves,
      cardsWon:victoryWon,
      cardChosed:selectedCard,
      cardChosedId:cardId,
      currentImageArray:currentImageArray
    })

  }

  flipCard(i){

    
    
    // let cardChosed = this.state.cardChosed;
    // let cardChosedId = this.state.cardChosedId;
    let currentImageArray = this.state.currentImageArray;
    let isWon = this.state.isWon;

    if(isWon){
      return;
    }

    let card = []
    let cardId = []

    console.log(`Cardschosed Tyepof: ${typeof(card)}`)
    console.log(`CardschosedID Tyepof: ${typeof(cardId)}`)
    
    
      cardId.push(i);
      card.push(cardArray[i].name)  
      currentImageArray[i] = cardArray[i].img

      console.log(card)
      console.log(cardId)


      // this.setState({
      //   cardChosed: cardChosed.concat(card),
      //   cardChosedId: cardChosedId.concat(cardId),
      //   currentImageArray: currentImageArray
      // });
      this.setState((state,props)=>({
        cardChosed: state.cardChosed.concat(card),
        cardChosedId: state.cardChosedId.concat(cardId),
        currentImageArray: currentImageArray
      }),()=>{
        console.log(this.state)
        if(this.state.cardChosed.length === 2){
          this.checkforMatch(); // Callback Function
      }
      });
      

      // // console.log(this.state);
      

      // if(this.state.cardChosed.length === 2){
      //     this.checkforMatch();
      // }
    

  }


  render(){
    let status;
    if (this.state.isWon){
      status = "You Won"
    }
    return(
      <div className='game-board'>

        <BoardComponent
        currentImageArray = {this.state.currentImageArray}
        onClick = {(i) => this.flipCard(i)}

        />
      <div>
        <p className='Result'> Number of Moves: <span>{this.state.moves}</span></p>
        {status}
      </div>

      </div>
    );
  }
}

export default Game;