let runningTotal=0;
let buffer ="0";
let previousOperator=null;


const screen =document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        //thish is not a number
        handleSyonbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText=buffer;
}

function handleSyonbol(value){
    switch (value){
        case 'c':
            buffer="0";
            runningTotal=0;
            break;
        case '+':
        case '-':
        case 'x':
        case '/':
            handleMath(value);
            break;
        case '<-':
            if(buffer.length===1){
                buffer='0';
            }else{
                buffer=buffer.toString(0,buffer.length-1);
            }
            break;
        case '=':
            if(previousOperator===null){
                //need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator=null;
            buffer=runningTotal;
            runningTotal=0;
            break;
    }
}

function handleMath(value){
    if(buffer==="0"){
        //do nothing
        return;
    }
    const intBuffer=parseInt(buffer);

    if(runningTotal===0){
        runningTotal=intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator=value;
    buffer='0';
}

function flushOperation(intBuffer){
    if(previousOperator==='+'){
        runningTotal+=intBuffer;
    }else if(previousOperator==='-'){
        runningTotal-=intBuffer;
    }else if(previousOperator==='x'){
        runningTotal*=intBuffer;
    }else if(previousOperator==='/'){
        runningTotal/=intBuffer;
    }

}

function handleNumber(value){
    if(buffer==="0"){
        buffer=value;
    }else{
        buffer+=value;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click',function(event){
        buttonClick(event.target.innerText);
    })
}
init();