let measure = document.getElementById('calculation-measure');

/***ПЕРЕМЕННЫЕ***/
let inputs = document.querySelectorAll('.important');
let importantSquare = document.querySelectorAll('.important-val-square');
let importantSide = document.querySelectorAll('.important-val-side');

/***Переменные для рассчета 1 калькулятора***/
let height = document.getElementById('height');
let width = document.getElementById('width');
let length = document.getElementById('length2');
let amount = document.getElementById('amount');

let selectOptionsCalcOne = document.getElementById('select-options-calc-1');

/***Переменные для рассчета 2 калькулятора***/
//Для помещения:
let widthRoomEl = document.getElementById('width-room');
let heightRoomEl = document.getElementById('height-room');
let lengthRoomEl = document.getElementById('length-room');

const humidity = 500; //влажность шпунта


let arrDeletedValueSide = []; // массив, в который передаем значения для калькулятора на одну сторону
let comparableArrDeletedValueSide = []; //// массив, в который передаем значения вычитаемой площади калькулятора на одну сторону

let arrDeletedValueSquare = []; // массив, в который передаем значения для калькулятора на одну сторону
let comparableArrDeletedValueSquare = []; //// массив, в который передаем значения вычитаемой площади калькулятора на одну сторону

// соберем массив данных о полезной площади и соответствующих размеров
let options_m2 = document.querySelectorAll('[data-m2]');
let options_m2_data = [];
options_m2.forEach( option => options_m2_data.push({ 'size' : option.value, 'm2_optima' : option.getAttribute('data-m2') }))

/***ФУНКЦИИ***/

/***Функция для анимированного появления результатов, используем при выводе значений***/
function animateResult(targetArr) {
    for (let i = 0; i < targetArr.length; i++) {
        changeClass([targetArr[i]], "remove", "d-n" ) // уберем display none, который изначально висит на полях результатов 
        targetArr[i].animate([{ opactiy: 0, color: "#a4ba9b" }, { opacity: 1, color: "#4c504a" }], 1500);
    }
}


/***Функция смены классов у элемента***/
function changeClass(targetArr, action, className) {
    targetArr.forEach(target => target.classList[action](className));
}


/***Функция на запуск функции рассчета при изменении в основных инпутах***/
function trackingInput(targetArr, functionName) {
    console.log(targetArr)
    for (let i = 0; i < targetArr.length; i++) {
        if (targetArr[i].tagName === 'INPUT') {
            targetArr[i].addEventListener('keyup', functionName);
        } else {
            targetArr[i].addEventListener('change', functionName);
        }
    }
}



/***Функция, заменяющая "," на "." в инпутах***/

function changeSymbol(targetArr, symbolOne, symbolTwo) {
    for (let i = 0; i < targetArr.length; i++) {
        targetArr[i].addEventListener('input', function (e) {
            e.target.value = e.target.value.split(symbolOne).join(symbolTwo);
        })
    }
}

changeSymbol( document.getElementsByClassName("calculator-value"), ',', '.'); //меняем "," на "."


/***Функция, обнуляющая значения***/
function zeroingValues(targetArr, attribute) {
    for (let i = 0; i < targetArr.length; i++) {
        targetArr[i][attribute] = '';
    }
}


/***Функция, проверяющая на пустое значение и на цифровой формат вводимых данных***/
function checkTypeValue(element) {
    return element !== '' && Number(element);
}


/***Функция для подсветки красным пустых и неправильно заполненных значений***/
function checkInputTypeValue(nodeList) {
    let array = Array.from(nodeList);
    array.forEach((el) => {
        if (!el.value || !Number(el.value)) el.classList.add('empty');
        else
            el.classList.remove('empty');
    })
}



//Функция на перенос значения из списка каталога в калькулятор
function valueTransfer(el, transferHeightValue, transferWidthValue , transferLengthValue, functionName) {
    el.addEventListener('change', function (event) {

        const splittedValue = event.target.value.split(',') // разобьем значение, которое мы получаем с запятыми на массив

        // Сохраним значение выбранного option, чтобы потом сравнить и обнулить выбор, если пользователь решит вводить руками
        selectedOptionValue = event.target.value;        

        if (splittedValue.length === 3) {
            transferHeightValue.value = splittedValue[0];
            transferWidthValue.value = splittedValue[1];
            transferLengthValue.value = splittedValue[2];
            functionName();
        } else {
            transferHeightValue.value = null,
            transferWidthValue.value = null,
            transferLengthValue.value = null
        }

    });
}

//передаем параметры для первого калькулятора
valueTransfer(
    selectOptionsCalcOne,
    document.getElementById('height'),
    document.getElementById('width'),
    document.getElementById('length2'),
    calculateOptions
); 
//параметры для второго калькулятора
valueTransfer(
    document.getElementById('select-options-help-material-side'),
    document.getElementById('height-material-side'),
    document.getElementById('width-material-side'),
    document.getElementById('length-material-side'),
    calculateAmountSide
); 


/***Функция добавления значений в список вычитаемой площади***/
function excludedSize(btnDeletePlus, textDeletedValue, deletedValueBlock, btnDeleteFalse, widthExcluded, heightExcluded, amountExcluded, listEl, ulDeletedValue, arrDeletedValue, comparableArrDeletedValue, notificationResult, functionCalcName,) {
    btnDeletePlus.addEventListener("click", () => {
        changeClass([textDeletedValue,], 'add', 'd-n');
        changeClass([deletedValueBlock,], 'remove', 'd-n');

        if (arrDeletedValue.length >= 2) {
            changeClass([btnDeleteFalse,], 'remove', 'd-n');
        }

        //значения
        let widthAperture = widthExcluded.value;
        let widthApertureValue = Number(widthAperture);

        let heightAperture = heightExcluded.value;
        let heightApertureValue = Number(heightAperture);

        let amountAperture = amountExcluded.value;
        let amountApertureValue = Number(amountAperture);


        //список, в который передаем введенные значения
        let deletedValueElUl = ulDeletedValue;

        checkInputTypeValue(listEl);

        let checkVarValue = [heightAperture, widthAperture, amountAperture,].every(checkTypeValue);//в переменную передаем true или false. Если false, то дальше не пускает
        if (checkVarValue == true) {
            let objDeletedValue = {
                heightAperture: heightApertureValue,
                widthAperture: widthApertureValue,
                amountAperture: amountApertureValue,
            }

            arrDeletedValue.push(objDeletedValue);// в массив передаем значения из объекта
            comparableArrDeletedValue.push(objDeletedValue);

            for (let j = 0; j < comparableArrDeletedValue.length; j++) {
                let arrDeletedValueFilter = arrDeletedValue.filter(i => i.heightAperture === comparableArrDeletedValue[j].heightAperture && i.widthAperture === comparableArrDeletedValue[j].widthAperture && i.amountAperture === comparableArrDeletedValue[j].amountAperture)
                if (arrDeletedValue.length >= 2) {
                    if (arrDeletedValueFilter.length >= 2) {
                        notificationResult.innerHTML = 'Обратите внимание, вы ввели несколько одинаковых значений в вычитаемой площади';
                    }
                }
            }


            if (arrDeletedValue.length !== 0) { // пересчитываем, если длина массива с размерами вычитаемой площади не равна 0.
                functionCalcName();
            }

            //создаем список
            let li = document.createElement('li');
            let divСancellation = document.createElement('div'); // крест у элемента списка
            li.innerHTML = objDeletedValue.widthAperture + '*' + objDeletedValue.heightAperture + '*' + objDeletedValue.amountAperture + ' шт.';
            animateResult([li, divСancellation]); //анимация

            deletedValueElUl.appendChild(li);
            li.appendChild(divСancellation);

            for (let i = 0; i < arrDeletedValue.length; i++) {
                let idLi = arrDeletedValue.indexOf(arrDeletedValue[i]);
                li.id = idLi;
            }


            divСancellation.addEventListener("click", e => { //отслеживаем клик по кресту

                let clickedElement = e.currentTarget.parentNode;
                let clickedElementId = clickedElement.id;

                divСancellation.parentElement.remove(); //удаляем ли элемент
                divСancellation.closest('li').remove();

                for (let i = 0; i < arrDeletedValue.length; i++) {
                    let itemArrDeletedValue = arrDeletedValue.indexOf(arrDeletedValue[i]);
                    let comparableItemArrDeletedValue = comparableArrDeletedValue.indexOf(comparableArrDeletedValue[i]);

                    // проверяем совпадает ли нажатый элемент с элементом массива, если да, то удаляем из массива значение
                    if (clickedElementId == itemArrDeletedValue) {
                        arrDeletedValue.splice(itemArrDeletedValue, 1);
                        comparableArrDeletedValue.splice(comparableItemArrDeletedValue, 1);

                        functionCalcName(); // запускаем функцию на пересчет, название которой мы передаем
                        zeroingValues([objDeletedValue.heightAperture, objDeletedValue.widthAperture, objDeletedValue.amountAperture,], 'value');

                        for (let j = 0; j < comparableArrDeletedValue.length; j++) {
                            let arrDeletedValueSome = arrDeletedValue.some(i => i.heightAperture === comparableArrDeletedValue[j].heightAperture && i.widthAperture === comparableArrDeletedValue[j].widthAperture && i.amountAperture === comparableArrDeletedValue[j].amountAperture)
                            let arrDeletedValueFilter = arrDeletedValue.filter(i => i.heightAperture === comparableArrDeletedValue[j].heightAperture && i.widthAperture === comparableArrDeletedValue[j].widthAperture && i.amountAperture === comparableArrDeletedValue[j].amountAperture)

                            if (arrDeletedValue.length >= 2) {
                                if (arrDeletedValueFilter.length >= 2 && arrDeletedValueSome == true) {
                                    notification.innerHTML = 'Обратите внимание, вы ввели несколько одинаковых значений в вычитаемой площади';
                                } else {
                                    zeroingValues([notificationResult,], 'innerHTML');
                                }
                            } else {
                                zeroingValues([notificationResult,], 'innerHTML');
                            }
                        }
                    }
                }

                if (!arrDeletedValue.length) {
                    changeClass([textDeletedValue,], 'remove', 'd-n');
                    changeClass([btnDeleteFalse,], 'add', 'd-n');

                    textDeletedValue.innerHTML = 'Добавьте размеры, которые нужно вычесть из площади';

                    animateResult([textDeletedValue,]); //анимация
                }
            })

        } else {
            changeClass([textDeletedValue,], 'remove', 'd-n');
            textDeletedValue.innerHTML = 'Добавьте размеры, которые нужно вычесть из площади';
        }
    });
}


/***Функция исчезания блока вычитаемой площади***/
function disappearExcludedSize(btnDeleteFalse, deletedValueBlock, textDeletedValue, notificationResult, ulDeletedValue, arrDeletedValue, functionCalcName, widthExcluded, heightExcluded, amountExcluded,) {
    btnDeleteFalse.addEventListener("click", () => {
        changeClass([deletedValueBlock, btnDeleteFalse,], 'add', 'd-n');
        changeClass([textDeletedValue,], 'remove', 'd-n');
        animateResult([textDeletedValue,]); //анимация

        textDeletedValue.innerHTML = 'Добавьте размеры, которые нужно вычесть из площади';

        zeroingValues([notificationResult, ulDeletedValue], 'innerHTML');
        arrDeletedValue.length = 0; // если отменили заполнение, то обнуляем массив, чтобы данные не шли дальше

        functionCalcName();//пересчитываем
        zeroingValues([widthExcluded, heightExcluded, amountExcluded,], 'value');
    });
}


/***Функция расчета параметров (1 калькулятор)***/
function calculateOptions() {
    let heightValue = Number(height.value);//высота, явно указываем, что тип значения number
    let widthValue = Number(width.value);//ширина
    let lengthValue = Number(length.value); //длина
    let amountValue = Number(amount.value); //количество кубов

    // получим общее количество штук, если вдруг указали кубы
    let totalItems = (measure.value === 'cubes') ? 1 / (widthValue * lengthValue * heightValue / 1000000000) * amountValue : amountValue;

    // Проверим, совпадает ли введенный размер с размером из каталога
    // Если да, то берем значение полезной площади для расчета
    let currentSize = `${height.value},${width.value},${length.value}`; // создадим строку, чтобы было проще сравнивать

    let current_m2;

    for (let option of options_m2_data) {
        if (option.size === currentSize) {
            current_m2 = option.m2_optima
            break;
        } else {
            current_m2 = null;
        }
    }

    // обнулим выбор селекта, если пользователь поменял значения вручную
    if (selectedOptionValue && selectedOptionValue !== currentSize) {
        selectOptionsCalcOne.selectedIndex = 0; 
        selectedOptionValue = '';
    }    

    // проверим, все ли нужные поля содержат правильные значения (не текст, символы и тп); если нет, вернет false 
    let checkVarValue = [widthValue, heightValue, lengthValue, amountValue,].every(checkTypeValue);
    checkInputTypeValue(inputs); //передаем нужные элементы, для проверки их значений

    // общее количество штук или кубов
    function countm3(items) {
        return (widthValue * lengthValue * heightValue / 1000000000) * items;
    }

    // общая площадь
    function surfaceArea(items) {
        return ((widthValue * lengthValue) / 1000000) * items;
    }

    // вес
    function weight(items) {
        return (((heightValue * lengthValue * widthValue) / 1000000000) * humidity) * items;
    }

    // полезная площадь
    function countUsefulArea(m2Value, items) {
        return (m2Value) ? parseFloat(m2Value.replace(",", ".")) * items : 0;        
    }

    if (checkVarValue == true) { //условие проверки, для того, чтобы не выводить значения NAN
        changeClass([document.getElementById('initial-msg-calc-simple')], "add", "d-n");
        animateResult([
            document.getElementById('result'),
            document.getElementById('surface-area'),
            document.getElementById('weight-result')
        ]); 
        document.getElementById('surface-area').innerHTML = surfaceArea(totalItems).toFixed(3) + ' м² площадь указанного количества штук';
        let usefulArea = countUsefulArea(current_m2, totalItems);
        if (usefulArea > 0) {
            animateResult([document.getElementById('useful-area')]);
            document.getElementById('useful-area').innerHTML = usefulArea.toFixed(3) + ' м² полезная площадь указанного количества штук';
        } else {
            changeClass([document.getElementById('useful-area')], "add", "d-n")
        }
        if (measure.value === 'cubes') {
            document.getElementById('result').innerHTML = Math.ceil(totalItems) + '  шт. шпунта в указанном объеме (с округлением до целого числа в большую сторону)'
        } else {
            document.getElementById('result').innerHTML = countm3(totalItems).toFixed(3) + ' м³ объем данного количества шпунта';
        }
        document.getElementById('weight-result').innerHTML = (weight(totalItems)).toFixed(2) + ' кг составляет примерный вес данного количества шпунта';
    } else {
        changeClass([document.getElementById('initial-msg-calc-simple')], "remove", "d-n");
        changeClass([
            document.getElementById('result'),
            document.getElementById('surface-area'),
            document.getElementById('useful-area'),
            document.getElementById('weight-result')
        ], "add", "d-n");
    }

}

/*Функция расчета для калькулятора расчета материала на поверхность*/
function calculateAmountSide() {
    let area; //переменная, нужная для вычитания площади, которую добавляет пользователь. В нее мы складываем весь массив, который у нас есть.

    let widthValue = Number(document.getElementById('width-material-side').value);//ширина
    let lengthValue = Number(document.getElementById('length-material-side').value); //длина
    let heightValue = Number(document.getElementById('height-material-side').value)//высота

    let widthSideValue = Number(document.getElementById('width-side').value); //ширина помещения
    let lengthSideValue = Number(document.getElementById('length-side').value); //ширина помещения

    let arrSumDeletedValue = []; //массив со сложенными значениями, которые вычитаем из площади



    checkInputTypeValue(importantSide);


    // Передаем в массив значения для вычитаемой площади
    for (let j = 0, l = arrDeletedValueSide.length; j < l; j++) {
        let sumDeletedValue = (arrDeletedValueSide[j].heightAperture * arrDeletedValueSide[j].widthAperture / 1000000) * arrDeletedValueSide[j].amountAperture;
        arrSumDeletedValue.push(sumDeletedValue);
    }

    //Складываем все элементы массива в одно число для вычитания их из площади.
    if (!arrDeletedValueSide.length == 0) {
        area = arrSumDeletedValue.reduce((total, amount) => total + amount);
    } else {
        area = false;
    }


    let sideArea = (widthSideValue * lengthSideValue) - area; //площадь поверхности
    let amountМaterial = (sideArea * heightValue) / 1000 // Расчет количества материала, в кубах

    function payment() {
        return (1 / ((widthValue * heightValue * lengthValue) / 1000000000)) * amountМaterial;
    } //функция-формула, рассчитывающая количество штук в заданном количестве кубов

    function weight() {
        return ((heightValue * widthValue * lengthValue / 1000000000) * humidity) * (1 / ((widthValue * heightValue * lengthValue) / 1000000000)) * amountМaterial;
    }//формула расчета веса.

    let checkVarValue = [widthValue, heightValue, lengthValue, widthSideValue, lengthSideValue,].every(checkTypeValue);//в переменную передаем true или false. Если false, то дальше не пускает

    if (checkVarValue == true) { //Проверяем и выводим значения

        if (sideArea <= 0 || amountМaterial <= 0) {
            animateResult([document.getElementById('room-area-result-side'), document.getElementById('number-pieces-result-side'), document.getElementById('weight-result-material-side'), document.getElementById('volume-material-side'),]); //анимация
            changeClass([document.getElementById('initial-msg-calc-side')], "add", "d-n");
            document.getElementById('room-area-result-side').innerHTML = sideArea.toFixed(2) + ' м² площадь поверхности';
            document.getElementById('number-pieces-result-side').innerHTML = Math.ceil(payment()) + ' нужное количество шт. шпунта (с округлением до целого числа в большую сторону)';
            document.getElementById('volume-material-side').innerHTML = amountМaterial.toFixed(2) + ' м³ необходимый объем шпунта';
            document.getElementById('weight-result-material-side').innerHTML = weight().toFixed(2) + ' кг, примерный вес данного количества шпунта';

            document.getElementById('room-area-result-side').innerHTML = 'Вычитаемая площадь больше объема введенного материала, проверьте введенные значения';

        } else {
            animateResult([document.getElementById('room-area-result-side'), document.getElementById('number-pieces-result-side'), document.getElementById('volume-material-side'), document.getElementById('weight-result-material-side'),]);
            changeClass([document.getElementById('initial-msg-calc-side')], "add", "d-n");
            document.getElementById('room-area-result-side').innerHTML = sideArea.toFixed(2) + ' м² площадь поверхности';
            document.getElementById('number-pieces-result-side').innerHTML = Math.ceil(payment()) + ' нужное количество шт. шпунта (с округлением до целого числа в большую сторону)';
            document.getElementById('volume-material-side').innerHTML = amountМaterial.toFixed(2) + ' м³ необходимый объем шпунта';
            document.getElementById('weight-result-material-side').innerHTML = weight().toFixed(2) + ' кг, примерный вес данного количества шпунта';
        }
    } else {
        changeClass([document.getElementById('initial-msg-calc-side')], "remove", "d-n");
        changeClass([
            document.getElementById('room-area-result-side'),
            document.getElementById('number-pieces-result-side'),
            document.getElementById('volume-material-side'),
            document.getElementById('weight-result-material-side'),
            document.getElementById('room-area-result-side')
        ], "add", "d-n");
    }
}


excludedSize( //Передача параметров вычитаемой площади в расчете на сторону.
    /*Кнопка активации функции:*/
    document.getElementById('btn-deleted-values-plus-side'), //btnDeletePlus

    /*Дефолтный текст и блок*/
    document.getElementById('text-deleted-value-side'),//textDeletedValue
    document.getElementById('calculator-deleted-values-block-side'),//deletedValueBlock
    document.getElementById('btn-deleted-values-false-side'),//btnDeleteFalse

    /*Параметры: ширина, длина, количество:*/
    document.getElementById('width-aperture-side'), //widthExcluded,
    document.getElementById('height-aperture-side'), //heightExcluded
    document.getElementById('amount-aperture-side'), //amountExcluded

    /*Коллекция для проверки:*/
    document.querySelectorAll('.deleted-value-side'), //listEl

    /*Список, в который передаем значения:*/
    document.getElementById('deleted-value-el-ul-list-side'),//ulDeletedValue

    /*Массивы, исключаемой площади*/
    arrDeletedValueSide, comparableArrDeletedValueSide, //arrDeletedValue, comparableArrDeletedValue 

    /*Уведомление о повторе размеров*/
    document.getElementById('notification-side'), //notificationResult

    /*Вызов функции на пересчет:*/
    calculateAmountSide//functionCalcName
);



disappearExcludedSize(//исчезание блока для калькулятора, рассчитывающего на одну сторону
    document.getElementById('btn-deleted-values-false-side'),//btnDeleteFalse
    document.getElementById('calculator-deleted-values-block-side'),//deletedValueBlock
    document.getElementById('text-deleted-value-side'),//textDeletedValue
    document.getElementById('notification-side'), //notificationResult
    document.getElementById('deleted-value-el-ul-list-side'),//ulDeletedValue
    arrDeletedValueSide, //arrDeletedValue
    calculateAmountSide,//functionCalcName
    /*Параметры: ширина, длина, количество:*/
    document.getElementById('width-aperture-side'), //widthExcluded
    document.getElementById('height-aperture-side'), //heightExcluded
    document.getElementById('amount-aperture-side'), //amountExcluded
)




// если пользователь ввел значения, запускаем расчет в простом калькуляторе
trackingInput([ 
    document.getElementById('height'),
    document.getElementById('width'),
    document.getElementById('length2'),
    document.getElementById('amount'),
    measure
    ], calculateOptions
);

// если пользователь ввел значения, запускаем расчет на сторону/поверхность
trackingInput([ 
    document.getElementById('width-side'),
    document.getElementById('length-side'),
    document.getElementById('height-material-side'),
    document.getElementById('width-material-side'),
    document.getElementById('length-material-side'),
    ], calculateAmountSide
);