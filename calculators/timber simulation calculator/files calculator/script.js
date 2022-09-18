document.getElementsByClassName('btn-options')[0].addEventListener('click', calculateOptions);//Запуск функции по щелчку на кнопку
let meaningCalculation = document.getElementById('meaningCalculation');

/***Функция расчета параметров***/
function calculateOptions() {

	let inputs = document.querySelectorAll('.calculator-value');
	let height = Number(document.getElementById('height').value);
	let heightValue = Number(height);//высота, явно указываем, что тип значения number
	
	let width = document.getElementById('width').value;
	let widthValue = Number(width);//ширина
	
	let length = document.getElementById('length').value;
	let lengthValue = Number(length); //длина
	
	let amount = document.getElementById('amount').value;
	let amountValue = Number(amount); //количество
	
	
	
	let wordsEmpty = 'Введите значения';
	let wordsResult = '  шт. имитации бруса в указанном количестве кубов';
	let wordsSurfaceArea = ' м² составляет общая площадь указанного количества кубов';
	let wordsWeigth = ' кг составляет примерный вес данного количества имитации бруса';
	const humidity = 500; //влажность бруса
	//фразы - заготовки, которые видим после вычислений

	inputs.forEach((el) => {
	if(!el.value || !Number(el.value)) el.classList.add('empty');
	else
	el.classList.remove('empty');
	} //проверка заполнены ли значения в полях
	)

	if(meaningCalculation.value === 'cubes'){ //если выбраны кубы, то:
		function payment() {
		return 1 / (widthValue * lengthValue * heightValue / 1000000000) * amountValue;
		} //функция-формула, рассчитывающая количество штук в заданном количестве кубов
		
		function surfaceArea() {
		return    ((widthValue * lengthValue) / 1000000)  * 1 / (widthValue * lengthValue * heightValue / 1000000000) * amountValue;
		} //функция-формула, рассчитывающая площадь для количества кубов
		
		function weight() {
		return ((heightValue * lengthValue * widthValue / 1000000000) * humidity) *  (1 / ((widthValue * heightValue * lengthValue) / 1000000000)) * amountValue;
		} //формула расчета веса
	
	
		if(width !== '' && height !== '' && length !== '' && amount !== '' && Number(width) && Number(height) && Number(length) && Number(amount)){ //условие проверки, для того, чтобы не выводить значения NAN
		document.getElementById('result').innerHTML = (payment()).toFixed(1) + wordsResult; //выводим результат: штук бруса в нужном количестве кубов
		document.getElementById('result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);//анимация
		document.getElementById('surface-area').innerHTML = (surfaceArea()).toFixed(2) + wordsSurfaceArea; //выводим результат: общая площадь данного количества бруса
		document.getElementById('surface-area').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);//анимация
		document.getElementById('weight-result').innerHTML = (weight()).toFixed(0) + wordsWeigth;//выводим результат: рассчет веса.
		document.getElementById('weight-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);//анимация
		}

	} else if(meaningCalculation.value === 'things'){//если выбраны штуки, то:
		let wordsResult = '  шт. имитации бруса в 1 кубе';
		let wordsVolume = ' м³ объем данного количества имитации бруса';
		let wordsSurfaceArea = ' м² площадь указанного количества штук';
		//фразы - заготовки, которые видим после вычислений
		
		function volumeTimber() {
		return  (widthValue * lengthValue * heightValue / 1000000000) * amountValue;
		} //функция-формула, рассчитывающая объем
		
		function surfaceArea() {
		return  ((widthValue * lengthValue) / 1000000) * amountValue;
		} //функция-формула, рассчитывающая площадь для количества штук
		
		function weight() {
		return (((heightValue * lengthValue * widthValue) / 1000000000) * humidity) * amountValue;
		} //формула расчета веса.


		if(width !== '' && height !== '' && length !== '' && amount !== '' && Number(width) && Number(height) && Number(length) && Number(amount) ){ //условие проверки, для того, чтобы не выводить значения NAN
		document.getElementById('surface-area').innerHTML = surfaceArea().toFixed(3) + wordsSurfaceArea;
		document.getElementById('surface-area').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('result').innerHTML = volumeTimber().toFixed(3) + wordsVolume;
		document.getElementById('result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('weight-result').innerHTML = (weight()).toFixed(2) + wordsWeigth;//выводим результат: рассчет веса.
		document.getElementById('weight-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		}
	}

}



/***Функция расчета количества***/

document.getElementsByClassName('btn-amount')[0].addEventListener('click', calculateAmount);

	function calculateAmount(){
	let important = document.querySelectorAll('.important-val');
	
	let widthRoom = document.getElementById('width-room').value;
	let widthRoomValue = Number(widthRoom); //ширина помещения
	
	let heightRoom = document.getElementById('heigth-room').value;
	let heightRoomValue = Number(heightRoom); //высота помещения
	
	
	let heightApertureDoor = document.getElementById('heightApertureDoor').value;
	let heightApertureDoorValue = Number(heightApertureDoor);
	
	let widthApertureDoor = document.getElementById('widthApertureDoor').value;
	let widthApertureDoorValue = Number(widthApertureDoor);
	
	let amountApertureDoor = document.getElementById('amountApertureDoor').value;
	let amountApertureDoorValue = Number(amountApertureDoor);
	
	let heightApertureWindow = document.getElementById('heightApertureWindow').value;
	let heightApertureWindowValue = Number(heightApertureWindow);
	
	let widthApertureWindow = document.getElementById('widthApertureWindow').value;
	let widthApertureWindowValue = Number(widthApertureWindow);
	
	let amountApertureWindow = document.getElementById('amountApertureWindow').value;
	let amountApertureWindowValue = Number(amountApertureWindow);
	
	let selectOptionsImitation = document.getElementById('select-options-imitation').selectedIndex;
	let optionsImitation = document.getElementById('select-options-imitation').options;
	
	let wordsAreaRoom = ' м² площадь покрытия';
	let wordsPiecesResult = ' шт, нужно для отделки указанной площади помещения';
	
	important.forEach((el) => {
	if(!el.value || !Number(el.value)) el.classList.add('empty');
	else
	el.classList.remove('empty');
	} //проверка заполнены ли значения в полях
	)
	
	
	/*Получаем элементы выпадающего списка*/
	let val1 = document.getElementById('val1');
	let val2 = document.getElementById('val2');
	let val3 = document.getElementById('val3');
	let val4 = document.getElementById('val4');
	let val5 = document.getElementById('val5');
	let val6 = document.getElementById('val6');
	let val7 = document.getElementById('val7');
	let val8 = document.getElementById('val8');
	let val9 = document.getElementById('val9');
	let val10 = document.getElementById('val10');
	let val11 = document.getElementById('val11');
	
	/*Значения для полученных элементов списка */
	val1.val = [146, 3000];
	val2.val = [146, 4000];
	val3.val = [146, 6000];
	val4.val = [143, 6000];
	val5.val = [146, 6000];
	val6.val = [193, 6000];
	val7.val = [196, 4000];
	val8.val = [196, 5000];
	val9.val = [196, 6000];
	val10.val = [143, 6000];
	val11.val = [176, 6000];
	
	let newArr = optionsImitation[selectOptionsImitation].val;
	let pieceArea = newArr.reduce((a, b) => (a * b)/1000000); //переменожаем значения, получая площадь 1 штуки.
	
	let areaDoor = (heightApertureDoorValue * widthApertureDoorValue / 1000000) * amountApertureDoorValue; //площадь всех дверей
	let areaWindow = (heightApertureWindowValue * widthApertureWindowValue / 1000000) * amountApertureWindowValue; //площадь всех окон
	
	function roomArea() {
		return (widthRoomValue * heightRoomValue) - (areaWindow + areaDoor);
	} //функция-формула, рассчитывающая площадь помещения вместе с исключаемой площадью
	
	
	function numberPieces(){
	console.log(((widthRoomValue * heightRoomValue) - (areaWindow + areaDoor)) / pieceArea);
		return ((widthRoomValue * heightRoomValue) - (areaWindow + areaDoor)) / pieceArea;
	}
	
	
	
		if(widthRoom !== '' && heightRoom !== '' && Number(widthRoom) && Number(heightRoom)) {
		document.getElementById('room-area-result').innerHTML = roomArea() + wordsAreaRoom;
		document.getElementById('room-area-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('number-pieces-result').innerHTML = numberPieces().toFixed(2) + wordsPiecesResult;
		document.getElementById('number-pieces-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		}
	
	}
