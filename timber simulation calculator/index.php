<div class="article-desc">
        <div class="container">
            <div class="static-content">
                <h1>Калькуляторы расчета имитации бруса</h1>
                <p>Мы разработали 3 калькулятора, которые помогут вам произвести как достаточно простые расчеты типа "сколько
                    штук имитации в кубе", так и рассчитать общее количество материала для помещения с заданными размерами и
                    исключаемыми площадями (окнами, проемами и так далее).</p>
                <p>ВАЖНО! Каким бы точным ни был расчет, советуем покупать материал с запасом (обычно + 10%).</p>
    
                <h2>Простой расчет количества имитации бруса</h2>
                <p>Самый простой калькулятор. Если выбрать расчет в кубах, калькулятор посчитает количество штук в обозначенном количестве кубов, общую, полезную площадь и примерный вес имитации бруса. Если выбрать расчет в штуках, посчитает общий объем и примерный вес.</p>
                <div class="wrapper-calculator-block">
                    <div class="calculator-block options p-15">
                        <div class="wrapper-calculator-block-text flex-1-1-0 text-left">
                            <ol>
                                <li>Введите параметры имитации бруса: толщину, ширину, длину.&nbsp;

                                    <?php if (!empty($uniqueProps)) : ?>
                                    Или просто выберите из размеров, представленных в нашем <a
                                        href="#">каталоге</a>, они подставятся автоматически.
                                    <select class="help-value" id="select-options-calc-1">
                                        <option id="val-none" value>Выберите размер материала</option>
                                        <?php foreach ($uniqueProps as $propKey => $propValue) : ?>
                                        <option id="val-help-<?= $propKey+1 ?>" value="<?= $propValue['sizes'] ?>" data-m2="<?= $propValue['m2_optima'] ?>">
                                        <?= str_replace(',','*',$propValue['sizes']) ?>
                                        </option>
                                        <?php endforeach; ?>
                                    </select>
                    
                                    <?php endif; ?>
    
                                </li>
                                <li>Укажите, в чем считаете: в штуках или в кубах.</li>
                            </ol>
                        </div>
    
                        <form name="calc" class="calc-form flex-1-1-0">
                            <div class="wrapper-calc-timber-imitation">
                                <div>
                                    <p class="calculator-text-value">Толщина имитации бруса(мм)</p>
                                    <input id="height" class="calculator-value important">
                                    <p class="calculator-text-value">Ширина имитации бруса(мм)</p>
                                    <input id="width" class="calculator-value important">
                                    <p class="calculator-text-value">Длина имитации бруса(мм)</p>
    
                                    <input id="length2" class="calculator-value important">
                                    <div class="wrapper-meaning-calculation">
                                        <p class="calculator-text-value">Количество</p>
                                        <select name="" id="calculation-measure">
                                            <option value="things">штук</option>
                                            <option value="cubes">кубов</option>
                                        </select>
                                    </div>
                                    <input id="amount" class="calculator-value important">
                                </div>
                            </div>
                        </form>
                        <div class="wrapper-result result-options">
                            <div class="calculator-block-result">
                                <h3 class="calculator-text-result">Результат</h3>
                                <p id="initial-msg-calc-simple">Введите значения</p>
                                <p id="result" class="d-n calculator-value-result"></p>
                                <p id="surface-area" class="d-n calculator-value-result"></p>
                                <p id="useful-area" class="d-n calculator-value-result"></p>
                                <p id="usable-surface-area" class="d-n calculator-value-result"></p>
                                <p id="weight-result" class="d-n calculator-value-result"></p>
                            </div>
                        </div>
                    </div>
                </div>
    
    
                <h2>Расчет количества имитации бруса для поверхности</h2>
                <p>Этот калькулятор отлично подойдет, если вам нужно рассчитать нужное количество имитации для одной поверхности (например, стены) или для помещения сложной формы, когда невозможно легко и просто указать точные характеристики помещения. Поддерживает исключение площадей.</p>
                <div class="wrapper-calculator-block">
                    <div class="calculator-block p-15">
                        <form class="calc-form">
                            <div class="wrapper-form-el">
                                <div class="wrapper-calculator-block-text-amount">
                                    <ol>
                                        <li>Введите параметры имитации бруса: толщину, ширину, длину.&nbsp;

                                            <?php if (!empty($uniqueProps)) : ?>
                                            Или просто выберите из размеров, представленных в нашем <a
                                                href="#">каталоге</a>, они подставятся автоматически.
                                            <select class="help-value" id="select-options-help-material-side">
                                                <option id="val-none" value>Выберите размер материала</option>
                                                <?php foreach ($uniqueProps as $propKey => $propValue) : ?>
                                                <option id="val-help-<?= $propKey+1 ?>" value="<?= $propValue['sizes'] ?>">
                                                <?= str_replace(',','*',$propValue['sizes']) ?>
                                                </option>
                                                <?php endforeach; ?>
                                            </select>
                            
                                            <?php endif; ?>
            
                                        </li>
                                        <li>Укажите ширину и длину покрываемой поверхности.</li>
                                    </ol>
                                </div>
    
                                <div class="wrapper-calc-size">
                                    <div>
                                        <h6 class="calculator-title">Размеры материала</h6>
                                        <p class="calculator-text-value">Толщина имитации бруса(мм)</p>
                                        <input id="height-material-side" class="calculator-value important-val-side">
                                        <p class="calculator-text-value">Ширина имитации бруса(мм)</p>
                                        <input id="width-material-side" class="calculator-value important-val-side">
                                        <p class="calculator-text-value">Длина имитации бруса(мм)</p>
                                        <input id="length-material-side" class="calculator-value important-val-side">
                                    </div>
    
                                    <div>
                                        <h6 class="calculator-title">Размер поверхности</h6>
                                        <p class="calculator-text-value">Ширина поверхности(м)</p>
                                        <input id="width-side" class="calculator-value important-val-side">
                                        <p class="calculator-text-value">Длина поверхности(м)</p>
                                        <input id="length-side" class="calculator-value important-val-side">
                                    </div>
                                </div>
                            </div>
    
                            <hr class="green-line">
    
                            <div class="wrapper-form-el">
    
                                <div class="wrapper-calculator-block-text-amount">
                                    <ol style="--start-value: 2">
                                        <li>Если хотите исключить элементы из расчета (обычно это двери, окна, на покрытие
                                            которых материал закладывать не нужно), укажите их размер и количество. Будьте
                                            внимательны, размер поверхности указывается в метрах, а исключаемая площадь в
                                            миллиметрах.</li>
                                    </ol>
                                </div>
    
    
                                <div class="wrapper-deleted-value">
                                    <h6 class="calculator-title">Исключаемая площадь</h6>
                                    <div>
                                        <p>Ширина(мм)</p>
                                        <input id="width-aperture-side" class="calculator-value deleted-value-side">
                                    </div>
                                    <div>
                                        <p>Длина(мм)</p>
                                        <input id="height-aperture-side" class="calculator-value deleted-value-side">
                                    </div>
                                    <div>
                                        <p>Количество</p>
                                        <input id="amount-aperture-side" class="calculator-value deleted-value-side">
                                    </div>
                                    <button type="button" id="btn-deleted-values-plus-side" class="calculator-block-btn btn-amount">Добавить
                                        размер</button>
    
                                    <div>
                                        <p class="text-deleted-value" id="text-deleted-value-side">Добавьте размеры, которые
                                            нужно вычесть из площади</p>
                                        <div class="d-n calculator-deleted-values-block" id="calculator-deleted-values-block-side">
                                            <ul class="deleted-value-el-ul" id="deleted-value-el-ul-list-side">
                                            </ul>
                                        </div>
                                    </div>
                                    <button type="button" id="btn-deleted-values-false-side"
                                        class="calculator-block-btn btn-amount d-n">Удалить все</button>
                                </div>
                            </div>
    
    
                        </form>
                        <div class="wrapper-result result-amount">
                            <div class="calculator-block-result">
                                <h3 class="calculator-text-result">Результат</h3>
                                <p id="initial-msg-calc-side">Введите значения, чтобы получить общую площадь покрытия, необходимое количество имитации бруса, объем и примерный вес.</p>
                                <p id="notification-side" class="calculator-value-result"></p>
                                <p id="room-area-result-side" class="calculator-value-result"></p>
                                <p id="number-pieces-result-side" class="calculator-value-result"></p>
                                <p id="volume-material-side" class="calculator-value-result"></p>
                                <p id="weight-result-material-side" class="calculator-value-result"></p>
                            </div>
                        </div>
                    </div>
                </div>
    
                <h2>Расчет количества имитации бруса для помещения</h2>
                <p>Калькулятор поможет рассчитать нужное количество имитации для помещений правильной (прямоугольной формы). Для помещений неправильной формы можно (хоть и не очень удобно) обойтись калькулятором для поверхностей. Поддерживает исключение площадей.</p>
                <div class="wrapper-calculator-block">
                    <div class="calculator-block p-15">
                        <form name="calc" class="calc-form">
                            <div class="wrapper-form-el">
                                <div class="wrapper-calculator-block-text-amount">
                                    <ol>
                                        <li>Введите параметры имитации бруса: толщину, ширину, длину.&nbsp;

                                            <?php if (!empty($uniqueProps)) : ?>
                                            Или просто выберите из размеров, представленных в нашем <a
                                                href="#">каталоге</a>, они подставятся автоматически.
                                            <select class="help-value" id="select-options-help-material">
                                                <option id="val-none" value>Выберите размер материала</option>
                                                <?php foreach ($uniqueProps as $propKey => $propValue) : ?>
                                                <option id="val-help-<?= $propKey+1 ?>" value="<?= $propValue['sizes'] ?>">
                                                <?= str_replace(',','*',$propValue['sizes']) ?>
                                                </option>
                                                <?php endforeach; ?>
                                            </select>
                            
                                            <?php endif; ?>
            
                                        </li>
                                        <li>Укажите параметры помещения (ширину, длину и высоту стен).</li>
                                    </ol>
                                </div>
    
                                <div class="wrapper-calc-size">
                                    <div>
                                        <h6 class="calculator-title">Размеры материала</h6>
                                        <p class="calculator-text-value">Толщина имитации бруса(мм)</p>
                                        <input id="height-material-square" class="calculator-value important-val-square">
                                        <p class="calculator-text-value">Ширина имитации бруса(мм)</p>
                                        <input id="width-material-square" class="calculator-value important-val-square">
                                        <p class="calculator-text-value">Длина имитации бруса(мм)</p>
                                        <input id="length-material-square" class="calculator-value important-val-square">
                                    </div>
    
                                    <div>
                                        <h6 class="calculator-title">Размер помещения</h6>
                                        <p class="calculator-text-value">
                                            Ширина стен(м)
                                        </p>
                                        <input id="width-room" class="calculator-value important-val-square">
    
                                        <p class="calculator-text-value">
                                            Длина стен(м)
                                        </p>
                                        <input id="length-room" class="calculator-value important-val-square">
                                        <p class="calculator-text-value">
                                            Высота стен(м)
                                        </p>
                                        <input id="height-room" class="calculator-value important-val-square">
                                    </div>
                                </div>
                            </div>
    
                            <hr class="green-line">
    
                            <div class="wrapper-form-el">
    
                                <div class="wrapper-calculator-block-text-amount">
                                    <ol style="--start-value: 2">
                                        <li>Если хотите исключить элементы из расчета (обычно это двери, окна, на покрытие
                                            которых материал закладывать не нужно), укажите их размер и количество. Будьте
                                            внимательны, размер поверхности указывается в метрах, а исключаемая площадь в
                                            миллиметрах.</li>
                                    </ol>
                                </div>
    
    
                                <div class="wrapper-deleted-value">
                                    <h6 class="calculator-title">Исключаемая площадь</h6>
                                    <div>
                                        <p>Ширина(мм)</p>
                                        <input id="width-aperture-square" class="calculator-value deleted-value-square">
                                    </div>
                                    <div>
                                        <p>Длина(мм)</p>
                                        <input id="height-aperture-square" class="calculator-value deleted-value-square">
                                    </div>
                                    <div>
                                        <p>Количество</p>
                                        <input id="amount-aperture-square" class="calculator-value deleted-value-square">
                                    </div>
    
                                    <button type="button" id="btn-deleted-values-plus-square"
                                        class="calculator-block-btn btn-amount">Добавить размер</button>
    
                                    <div>
                                        <p class="text-deleted-value" id="text-deleted-value-square">Добавьте размеры,
                                            которые нужно вычесть из площади</p>
                                        <div class="d-n calculator-deleted-values-block" id="calculator-deleted-values-block-square">
                                            <ul class="deleted-value-el-ul" id="deleted-value-el-ul-list-square">
                                            </ul>
                                        </div>
                                    </div>
                                    <button type="button" id="btn-deleted-values-false-square"
                                        class="calculator-block-btn btn-amount d-n">Удалить все</button>
                                </div>
                            </div>
    
    
                        </form>
                        <div class="wrapper-result result-amount">
                            <div class="calculator-block-result">
                                <h3 class="calculator-text-result">Результат</h3>
                                <p id="initial-msg-calc-room">Введите значения, чтобы получить общую площадь помещения, необходимое количество имитации бруса, объем и примерный вес.</p>
                                <p id="notification-square" class="calculator-value-result"></p>
                                <p id="room-area-result" class="calculator-value-result"></p>
                                <p id="number-pieces-result" class="calculator-value-result"></p>
                                <p id="volume-material" class="calculator-value-result"></p>
                                <p id="weight-result-material" class="calculator-value-result"></p>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </div>
    


