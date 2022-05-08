document.getElementsByClassName('calculator-block-btn')[0].addEventListener('click', calculateThis);//Запуск функции по щелчку на кнопку

function calculateThis() {
 let inputs = document.querySelectorAll('.calculator-value');
   let height = Number(document.getElementById('height').value);
   let heightValue = Number(height);//высота, явно указываем, что тип значения number

   let width = (document.getElementById('width').value);
   let widthValue = Number(width);//ширина

   let length = (document.getElementById('length').value);
   let lengthValue = Number(length); //длина

   let amount = (document.getElementById('amount').value);
   let amountValue = Number(amount); //количество кубов

   let wordsEmpty = 'Введите значения';
   let wordsResult = '  шт. бруса в данном количестве кубов';
   let wordsSurfaceArea = ' м² составляет общая площадь указанного количества кубов';
   let wordsWeigth = ' кг составляет примерный вес данного количества бруса';
   const humidity = 750; //влажность бруса
   //фразы - заготовки, которые видим после вычислений

   inputs.forEach((el) => {
     if(!el.value) el.classList.add('empty');
     else
       el.classList.remove('empty');
    } //проверка заполнены ли значения в полях
 )

     function payment() {
       return (1 / ((widthValue * heightValue * lengthValue) / 1000000000)) * amountValue;
     } //функция-формула, рассчитывающая количество штук в заданном количестве кубов

     function surfaceArea() {
       return ((heightValue * widthValue * 2) + (heightValue * lengthValue * 2) + (widthValue * lengthValue * 2)) / 1000000 * amount;
     } //функция-формула, рассчитывающая площадь 1 шт в кв.м

     function weight() {
       return ((heightValue * widthValue * lengthValue / 1000000000) * humidity) * (1 / ((widthValue * heightValue * lengthValue) / 1000000000)) * amountValue; //формула расчета веса.
     }

     if(width !== '' && height !== '' && length !== '' && amount !== ''){ //условие проверки, для того, чтобы не выводить значения NAN
     document.getElementById('result').innerHTML = (payment()).toFixed(3) + wordsResult; //выводим результат: штук бруса в нужном количестве кубов
     document.getElementById('surface-area').innerHTML = (surfaceArea().toFixed(1) * payment().toFixed(3)).toFixed(4) + wordsSurfaceArea; //выводим результат: общая площадь данного количества бруса
     document.getElementById('weight-result').innerHTML = (weight()).toFixed(0) + wordsWeigth;//выводим результат: рассчет веса.
   }

   }

   function userClick(name){//функция переноса значений и подсветки элементов.
        document.querySelector('.user-value-prompt').addEventListener('click', ({ target: valueTransfer }) => { //покраска нужного элемента
          if (valueTransfer.classList.contains('btn-value-transfer')) {
            valueTransfer.closest('.user-value').querySelectorAll('.btn-value-transfer').forEach(value => {
              value.classList.toggle('btn-value-transfer-active', value === valueTransfer);

              document.querySelectorAll(".calculator-value").forEach(el=>{ //если кликаем по полю, то цвет с выбранных значений исчезает.
                 el.addEventListener("click",e=>{
                   value.classList.remove('btn-value-transfer-active');
                 });
               });
      });
    }

  });
        if(document.forms?.calc[name]){ //перенос значения
          document.forms.calc[name].value = event.target.value;
        }
  }
