let meaningCalculation = document.getElementById('meaningCalculation');


/***Функция расчета количества***/

document.getElementsByClassName('btn-amount')[0].addEventListener('click', calculateAmount);

	function calculateAmount(){
	let importantNum = document.querySelectorAll('.important-val-num');
	let important = document.querySelectorAll('.important-val');
	
	let widthRoom = document.getElementById('width-room').value;
	let widthRoomValue = Number(widthRoom); //ширина помещения
	
	let heightRoom = document.getElementById('heigth-room').value;
	let heightRoomValue = Number(heightRoom); //высота помещения
	
	let heightAperture = document.getElementById('heightAperture').value;
	let heightApertureValue = Number(heightAperture);
	
	let widthAperture = document.getElementById('widthAperture').value;
	let widthApertureValue = Number(widthAperture);
	
	const humidity = 650; //плотность ОСП

	let amountAperture = document.getElementById('amountAperture').value;
	let amountApertureValue = Number(amountAperture);
	
	let selectOptionsImitation = document.getElementById('select-options-imitation').selectedIndex;
	let optionsImitation = document.getElementById('select-options-imitation').options;
	
	let selectOptionsImitationHelp = document.getElementById('select-options-imitation-help').selectedIndex;
	let optionsImitationHelp = document.getElementById('select-options-imitation-help').options;


	let wordsAreaRoom = ' м² площадь покрытия';
	let wordsPiecesResult = ' шт OSB нужно для отделки указанной площади';
	let wordsVolumeOSB = ' м³ объем указанного количества OSB';
	let wordsWeigth = ' кг вес полученного количества листов OSB';

	
	important.forEach((el) => {
		if(!el.value || !Number(el.value)) el.classList.add('empty');
		else
		el.classList.remove('empty');
		} //проверка заполнены ли значения в полях
	)

	importantNum.forEach((el) => {
	if(!el.value){
		el.classList.remove('empty');
	}
	else if(!Number(el.value)){ 
		el.classList.add('empty');
	} else {
		el.classList.remove('empty');
	}
		} //проверка заполнены ли значения в полях для вычитания площади
	)



	if(selectOptionsImitation >= 0 && selectOptionsImitation != 14){
		
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
		let val12 = document.getElementById('val12');
		let val13 = document.getElementById('val13');
		let val14 = document.getElementById('val14');

		
		/*Значения для полученных элементов списка */
		val1.val = [6, 1250, 2500];
		val2.val = [8, 1250, 2500];
		val3.val = [9, 1250, 2500];
		val4.val = [9, 1220, 2440];
		val5.val = [10, 1250, 2500];
		val6.val = [11, 1220, 2440];
		val7.val = [11, 1250, 2500];
		val8.val = [12, 1250, 1250];
		val9.val = [12, 1250, 2500];
		val10.val = [12, 1250, 2800];
		val11.val = [15, 1250, 2500];
		val12.val = [18, 1250, 2500];
		val13.val = [22, 1220, 2500];
		val14.val = [22, 1250, 2500];



		document.getElementById('select-options-imitation').selectedIndex;

		

		let newArr = optionsImitation[selectOptionsImitation].val;


		let pieceArea = newArr[1] * newArr[2]/1000000; //переменожаем значения, получая площадь 1 штуки.

		let area = (heightApertureValue * widthApertureValue / 1000000) * amountApertureValue; //исключаемая площадь
		

		function weight() {
			return (((newArr[0] * (newArr[1] * newArr[2]/1000000)) * humidity) / 1000) * (((widthRoomValue * heightRoomValue) - (area)) / pieceArea);
		} //формула расчета веса.

		function roomArea() {
			return (widthRoomValue * heightRoomValue) - (area);
		} //функция-формула, рассчитывающая площадь помещения вместе с исключаемой площадью
		
		
		function numberPieces(){
			return ((widthRoomValue * heightRoomValue) - (area)) / pieceArea;
		} //формула расчета количества штук
		
		function volumeOSB() {
			return (newArr[0] * newArr[1] * newArr[2] / 1000000000) * (((widthRoomValue * heightRoomValue) - (area)) / pieceArea);
			} //функция-формула, рассчитывающая объем
		
		
		if(widthRoom !== '' && heightRoom !== '' && Number(widthRoom) && Number(heightRoom)) {
            if(Number(widthAperture) && Number(heightAperture) && Number(amountAperture)  || widthAperture == '' &&  heightAperture == '' && amountAperture == '' ){
		document.getElementById('room-area-result').innerHTML = roomArea() + wordsAreaRoom;
		document.getElementById('room-area-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('number-pieces-result').innerHTML = numberPieces().toFixed(2) + wordsPiecesResult;
		document.getElementById('number-pieces-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('weight-result').innerHTML = (weight()).toFixed(1) + wordsWeigth;//выводим результат: рассчет веса.
		document.getElementById('weight-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('volumeOSB').innerHTML = (volumeOSB()).toFixed(1) + wordsVolumeOSB ;//Выводим объем
		document.getElementById('volumeOSB').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
        }
			}

		}
		

		else if(selectOptionsImitation == 14){
			let valMarket = document.getElementById('valMarket');

			console.log(valMarket);
			
			let valHelp1 = document.getElementById('val-help-1');
            let valHelp2 = document.getElementById('val-help-2');
            let valHelp3 = document.getElementById('val-help-3');
            let valHelp4 = document.getElementById('val-help-4');
            let valHelp5 = document.getElementById('val-help-5');

			valHelp1.val = [9, 1250, 2500];
            valHelp2.val = [12, 1250, 2500];
            valHelp3.val = [15, 1250, 2500];
            valHelp4.val = [18, 1250, 2500];
            valHelp5.val = [22, 1250, 2500];
            

			document.getElementById('select-options-imitation-help').selectedIndex;

			let newArr = optionsImitationHelp[selectOptionsImitationHelp].val;
			console.log(newArr);



			let pieceArea = newArr[1] * newArr[2]/1000000; //переменожаем значения, получая площадь 1 штуки.

		let area = (heightApertureValue * widthApertureValue / 1000000) * amountApertureValue; //исключаемая площадь
		

		function weight() {
			return (((newArr[0] * (newArr[1] * newArr[2]/1000000)) * humidity) / 1000) * (((widthRoomValue * heightRoomValue) - (area)) / pieceArea);
		} //формула расчета веса.

		function roomArea() {
			return (widthRoomValue * heightRoomValue) - (area);
		} //функция-формула, рассчитывающая площадь помещения вместе с исключаемой площадью
		
		
		function numberPieces(){
			return ((widthRoomValue * heightRoomValue) - (area)) / pieceArea;
		} //формула расчета количества штук
		
		function volumeOSB() {
			return (newArr[0] * newArr[1] * newArr[2] / 1000000000) * (((widthRoomValue * heightRoomValue) - (area)) / pieceArea);
			} //функция-формула, рассчитывающая объем
		
		
		if(widthRoom !== '' && heightRoom !== '' && Number(widthRoom) && Number(heightRoom)) {
			if(Number(widthAperture) && Number(heightAperture) && Number(amountAperture)  || widthAperture == '' &&  heightAperture == '' && amountAperture == '' ){
		document.getElementById('room-area-result').innerHTML = roomArea() + wordsAreaRoom;
		document.getElementById('room-area-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('number-pieces-result').innerHTML = numberPieces().toFixed(2) + wordsPiecesResult;
		document.getElementById('number-pieces-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('weight-result').innerHTML = (weight()).toFixed(1) + wordsWeigth;//выводим результат: рассчет веса.
		document.getElementById('weight-result').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
		document.getElementById('volumeOSB').innerHTML = (volumeOSB()).toFixed(1) + wordsVolumeOSB ;//Выводим объем
		document.getElementById('volumeOSB').animate([{opactiy: 0, color: "#a4ba9b" }, {opacity: 1, color: "#4c504a" }], 1500);
	}
}

		}

	
	
	}



	function resetValue(){

		var selects = document.getElementsByClassName('selects');

        Array.from(selects).forEach((el, i) => {
            el.onclick = (e) => {
                for (let j = i+1; j < selects.length; j++) {
				document.getElementById('valMarket').classList.remove('d-n');
                selects[j].selectedIndex = 14;
                } 
            }});
	}

	resetValue();


	//Функция на перенос значения из списка каталога в калькулятор
	
	document.getElementById('select-options-imitation-help').addEventListener('change', function(){
		let selectOptionsImitationHelp = document.getElementById('select-options-imitation-help').selectedIndex;
		let optionsImitationHelp = document.getElementById('select-options-imitation-help').options;

		let valMarket = document.getElementById('valMarket');


		let valHelp1 = document.getElementById('val-help-1');
            let valHelp2 = document.getElementById('val-help-2');
            let valHelp3 = document.getElementById('val-help-3');
            let valHelp4 = document.getElementById('val-help-4');
            let valHelp5 = document.getElementById('val-help-5');

			valHelp1.val = [9, 1250, 2500];
            valHelp2.val = [12, 1250, 2500];
            valHelp3.val = [15, 1250, 2500];
            valHelp4.val = [18, 1250, 2500];
            valHelp5.val = [22, 1250, 2500];
            

			document.getElementById('select-options-imitation-help').selectedIndex;

			
			let newArr = optionsImitationHelp[selectOptionsImitationHelp].val;

			if(newArr.length == 0){
				return false;
			} else if(newArr.length > 0){
				valMarket.innerHTML = newArr[0] + '*' + newArr[1] + '*' + newArr[2];
			}
	});