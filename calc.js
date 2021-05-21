//클릭한 클래스 넘버의 입력값을 콘솔에 나타내보자.
//쿼리셀렉터는 불가함 ?
// for 문 이용해서 모든 number 를 선택한다.
// 그 선택된 number들 각각 onclick 이벤트를 추가한다.
// onclick 이벤트를 작동하면 number 의 value 값을 콘솔에 나타내본다.

const btnClass = document.querySelectorAll('.number,.decimal,.operator,.clear,.calculate,.ttl') //노드리스트 반환.
const display = document.querySelector('.result')
let firstNum = '';
let secondNum = '';
let operatorBtn = '';
let storeClass = '';
let calculate = '';

// 계산식 함수로 만들어서 버튼함수에 리턴해보기.
// toFixed()메소드 사용해서 소수점 둘째자리까지 구하도록 하기.
function calculateResult(number1,operate,number2){
  let result = 0;
  let num1 = Number(number1);
  let num2 = Number(number2);
  if(operate === '+'){
    result = num1 + num2;
  }else if(operate === '-'){
    result = num1 - num2
  }else if(operate === '×'){
    result = num1 * num2
  }else{
    result = num1 / num2
  }
  return result;
}

//calculate 부분 함수로 만들어보기.
function calculateOfTop(num1,calc){
  let result2 = 0;
  if(calc === '%'){
    result2 = num1 / 100
  }else if(calc === '+/-'){
    if(num1 == num1){
      result2 = '-'+num1
      console.log(result2 + 'is 음수.')
    }else{
      //result2 = '+'+num1
      console.log(result2 + 'is 정수.')
    }
  }
  return result2;
}

for(let i = 0; i <btnClass.length;i++){
  btnClass[i].addEventListener('click',function(){
    const eTarget = event.target;
    const btnTarget = eTarget.textContent;

    //숫자 연속으로 나타내보기. .조건  : 숫자일때만.
    if(eTarget.classList[0] == 'number' ){

      if(display.textContent === '0' || storeClass === 'operator' || storeClass === 'ttl'){
        display.textContent = btnTarget
      }else{
        display.textContent += btnTarget
      }
      storeClass = 'number'
    }

    //operator : operator 버튼을 누르는 순간 display에 보여지는 숫자는 저장되고 새로 시작된다.
    if(eTarget.classList[0] == 'operator' ){
      if (firstNum && operatorBtn && storeClass !== 'operator' 
      && storeClass !== 'ttl') {
        display.textContent = calculateResult(firstNum, operatorBtn, display.textContent);
      }

      firstNum = display.textContent;
      console.log('this is the firstNum so far : ' + btnTarget)
      operatorBtn = btnTarget;
      storeClass = 'operator';
    }

    if(eTarget.classList[0] == 'calculate'){
      calculate = btnTarget;
      display.textContent = calculateOfTop(display.textContent,calculate)
    }

    //decimal ! .은 반드시 한개여야만 한다.
    if(eTarget.classList[0] == 'decimal' ){
      //display.textContent += '.'
      if(!display.textContent.includes('.') && storeClass !== 'operator' ){
        display.textContent += '.'
      }else if(storeClass == 'operator'){
        display.textContent = '0.';
      }
    }

    //clear : 만약 입력값이 AC 인것을 누르면 ? 
    if(eTarget.classList[0] == 'clear' ){
      firstNum = undefined;
      secondNum = undefined;
      storeClass = 'clear'
      display.textContent = '0'
    }

    //enter (결과값)
    if(eTarget.classList[0] == 'ttl' ){
      //display.textContent = calculateResult(firstNum,operatorBtn,secondNum);
      if(firstNum){
        if(storeClass === 'ttl'){
          display.textContent = calculateResult(display.textContent,operatorBtn,secondNum);
        }else{
          secondNum = display.textContent;
          display.textContent = calculateResult(firstNum,operatorBtn,display.textContent);
        }
      }
      storeClass = 'ttl'
    }
  }) 
}