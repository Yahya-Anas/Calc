const isAc= (cv) => cv === "ac";
const isDel= (cv) => cv === "del";
const isEqual = (cv) => cv === "=";
const isEmpty= (dv) => dv.innerText === "";
const isOperation = (cv) => operation.hasOwnProperty(cv);
const getLastChar = (dv) => dv.innerText[dv.innerText.length - 1];
const removeLastChar = (dv) => dv.innerText.substring( 0, dv.innerText.length - 1);
const getOperation = (fValue, opr, secValue) =>{
     if(opr === "+"){
         return (+fValue + +secValue) + "";
     } if(opr === "*"){
          return (+fValue * +secValue) + "";
     } if(opr === "/"){
          return  (+fValue / +secValue) + "";
     } if(opr === "-"){
          return  (+fValue - +secValue) + "";
     }
} 

let isEqualClicked = false;

const operation = {
  "*": "*",
  "/": "/",
  "+": "+",
  "-": "-",
};

const buttons = document.querySelectorAll(".sub-container button");
const dValue = document.getElementById("d-value");
const dResult = document.getElementById("d-result");



buttons.forEach((itemBtn) => {
  itemBtn.addEventListener("click", clickBtn);
});

function clickBtn(e) {
     const clickedValue = e.target.dataset.value;
    
     if (isEqualClicked && !isEqual(clickedValue) ) {
          dValue.innerText = dResult.innerText;
          dResult.innerText = "";
          isEqualClicked= false;

     }  

     if (isAc(clickedValue) ) {
          dValue.innerText = "";
          dResult.innerText = "";
          isEqualClicked= false;

     } else if (isDel(clickedValue)) {
          dValue.innerText = removeLastChar(dValue);

     } else if (isEqual(clickedValue)) {
          if(isEmpty(dValue) || operation.hasOwnProperty(getLastChar(dValue))){
               return;
          }
          let firstInput = "";
          let currentResult = "";
          let currentOperation = "";

          const txt = dValue.innerText;
          for(let i = 0; i < txt.length; i++){
               if(operation.hasOwnProperty(txt[i])){
                    if(currentResult === ""){
                         currentResult = firstInput;
                    }else{
                         currentResult =  getOperation(currentResult, currentOperation, firstInput)
                    }

                    currentOperation = txt[i];
                    firstInput= "";
               }else {
                    firstInput += txt[i];
               }
          }

          if(firstInput !== "" && currentResult !== ""){
               currentResult =   getOperation(currentResult, currentOperation, firstInput)
          }
          
          if(currentResult !== ""){
               dResult.innerText = currentResult;
          }
          isEqualClicked=true
     } else if (isOperation(clickedValue) || clickedValue === ".") {
          if (dValue.innerText === "") {
               return;

          } 
          const lastChar = getLastChar(dValue);
           if ( isOperation(lastChar)  || clickedValue === lastChar) {
               dValue.innerText = removeLastChar(dValue) + clickedValue;
          }else{
               dValue.innerText += clickedValue;
          }
     } else {
          dValue.innerText += clickedValue;
     }
}


