/* Desenvolva sua lógica aqui */

function addValues(values) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const span = document.createElement("span");
  const p = document.createElement("p");
  const divBES = document.createElement("div");

  p.innerText = convertToBRL(values.value);
  div.append(span, p);
  divBES.classList.add("divBES");

  if (values.categoryID == 0) {
    span.classList.add("span-entrada");
    span.textContent = "Entrada";
  } else if (values.categoryID == 1) {
    span.classList.add("span-saida");
    span.textContent = "Saída";
  }

  const button = document.createElement("button");
  button.innerHTML =
    '<i class="remove" aria-hidden="true"><img src="./src/assets/trash.png"></i>';
  button.classList.add('remove-border');

  removeListButton(values, button);
  divBES.append(span, button);
  li.append(div, divBES);
  return li;
}

function convertToBRL(value){
    return Number(value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
}

function insertValue(value) {
  const boxValue = Number(document.querySelector(".boxValue").value);
  const type = Number(document.querySelector(".type").value);

  const obj = {
    id: value.length + 1,
    value: boxValue,
    categoryID: type,
  };

  console.log(boxValue);
  console.log(type);

  insertedValues.push(obj);
  checkClicked();
}

function checkClicked(){
    const button = document.querySelector('.clicked');
    if(button.classList.contains('all')){
        sumAll();
    } else if(button.classList.contains('entry')){
        sumEntry();
    } else {
        sumOut();
    }
}

function sumAll() {
  let sum = 0;
  insertedValues.forEach((obj) => {
    sum += obj.value;
  });
  modifyButton(0);
  renderScreen(insertedValues, sum);
}

function sumEntry() {
  let sum = 0;
  const result = insertedValues.filter(
    (insertedValues) => insertedValues.categoryID === 0
  );

  insertedValues.forEach((obj) => {
    if (obj.categoryID === 0) {
      sum += obj.value;
    }
  });

  modifyButton(1);
  renderScreen(result, sum);
}

function sumOut() {
    let sum = 0;
    const result = insertedValues.filter(
      (insertedValues) => insertedValues.categoryID === 1
    );
  
    insertedValues.forEach((obj) => {
      if (obj.categoryID === 1) {
        sum += obj.value;
      }
    });
  
    modifyButton(2);
    renderScreen(result, sum);
}

function modifyButton(value){
    const buttonAll = document.getElementById('buttonAll');
    const buttonEntry = document.getElementById('buttonEntry');
    const buttonOut = document.getElementById('buttonOut');

    buttonAll.classList.remove('clicked');
    buttonEntry.classList.remove('clicked');
    buttonOut.classList.remove('clicked');
    
    switch(value){
        case 0:
            buttonAll.classList.add('clicked');
            break;
        case 1:
            buttonEntry.classList.add('clicked');
            break;
        case 2:
            buttonOut.classList.add('clicked');
            break;
        default: break;
    }
}

function addListButton(value) {
  const buttonAdd = document.querySelector(".addValueModal");
  const boxValue = document.querySelector(".boxValue");
  const buttonValue = document.querySelectorAll('.buttonValue');
  let valueButton = 0;
  
  buttonValue.forEach(button => {
    button.addEventListener("click", () => {
      valueButton = Number(button.value);
    })
  });
  
  buttonAdd.addEventListener("click", (e) => {
    let obj = {
      id: value.length + 1,
      value: Number(boxValue.value),
      categoryID: valueButton,
    };
    e.preventDefault();
    insertedValues.push(obj);
    checkClicked();
  });
}
addListButton(insertedValues);

function removeListButton(values, buttonRem) {
  buttonRem.addEventListener("click", function () {
    const positionLi = insertedValues.indexOf(values);
    insertedValues.splice(positionLi, 1);
    checkClicked();
  });
}

function renderScreen(values, sum) {
  const htmlList = document.querySelector(".list");
  const sumValues = document.querySelector(".sumValues");
  htmlList.innerHTML = "";
  sumValues.textContent = convertToBRL(sum);

  for (i = 0; i < values.length; i++) {
    const list = addValues(values[i]);
    htmlList.append(list);
  }
}

window.onload = () => {
    const button = document.getElementById('buttonAll');
    button.click();
    button.classList.add('clicked');
}