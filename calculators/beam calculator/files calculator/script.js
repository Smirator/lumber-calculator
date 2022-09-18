document.getElementsByClassName('calculator-block-btn')[0].addEventListener('click', calculateThis);//Запуск функции по щелчку на кнопку
let meaningCalculation = document.getElementById('meaningCalculation');


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
        if(!el.value || !Number(el.value)) el.classList.add('empty');
        else
          el.classList.remove('empty');
       } //проверка заполнены ли значения в полях
    )

    if(meaningCalculation.value === 'cubes'){ //если выбраны кубы, то:
        function payment() {
          return (1 / ((widthValue * heightValue * lengthValue) / 1000000000)) * amountValue;
        } //функция-формула, рассчитывающая количество штук в заданном количестве кубов

        function surfaceArea() {
          return  (((heightValue * lengthValue * 2) + (widthValue * lengthValue * 2)) / 1000000) * (1 / ((widthValue * heightValue * lengthValue) / 1000000000)) * amountValue;
        } //функция-формула, рассчитывающая площадь для количества кубов

        function weight() {
          return ((heightValue * widthValue * lengthValue / 1000000000) * humidity) *  (1 / ((widthValue * heightValue * lengthValue) / 1000000000)) * amountValue; //формула расчета веса.
        }

        if(width !== '' && height !== '' && length !== '' && amount !== '' && Number(width) && Number(height) && Number(length) && Number(amount)){ //условие проверки, для того, чтобы не выводить значения NAN
        document.getElementById('result').innerHTML = (payment()).toFixed(3) + wordsResult; //выводим результат: штук бруса в нужном количестве кубов
        document.getElementById('result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);//анимация
        document.getElementById('surface-area').innerHTML = (surfaceArea()).toFixed(2) + wordsSurfaceArea; //выводим результат: общая площадь данного количества бруса
        document.getElementById('surface-area').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);//анимация
        document.getElementById('weight-result').innerHTML = (weight()).toFixed(0) + wordsWeigth;//выводим результат: рассчет веса.
        document.getElementById('weight-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500); //анимация
      }

  } else if(meaningCalculation.value === 'things'){//если выбраны штуки, то:
      let wordsResult = '  шт. бруса в 1 кубе';
      let wordsVolume = ' м³ объем данного количества бруса';
      let wordsSurfaceArea = ' м² площадь указанного количества штук';
      //фразы - заготовки, которые видим после вычислений

      function volumeTimber() {
          return (widthValue * heightValue * lengthValue / 1000000000) * amountValue;
        } //функция-формула, рассчитывающая объем

      function surfaceArea() {
        return  (((heightValue * lengthValue * 2) + (widthValue * lengthValue * 2)) / 1000000) * amountValue;
      } //функция-формула, рассчитывающая площадь для количества штук

        function weight() {
          return (((heightValue * lengthValue * widthValue) / 1000000000) * humidity) * amountValue;
        } //формула расчета веса.



        if(width !== '' && height !== '' && length !== '' && amount !== '' && Number(width) && Number(height) && Number(length) && Number(amount) ){ //условие проверки, для того, чтобы не выводить значения NAN
        document.getElementById('surface-area').innerHTML = surfaceArea().toFixed(3) + wordsSurfaceArea;
        document.getElementById('surface-area').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
        document.getElementById('result').innerHTML = (volumeTimber()).toFixed(2) + wordsVolume;
        document.getElementById('result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
        document.getElementById('weight-result').innerHTML = (weight()).toFixed(0) + wordsWeigth;//выводим результат: рассчет веса.
        document.getElementById('weight-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
        }
      }

  }
