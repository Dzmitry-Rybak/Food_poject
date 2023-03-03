Fetch API
Это типо замена XMLHttpRequest

API - интерфейс какого-то программного обеспеченья.
Набор данных и вызможностей которые предоставляют готовое решение. 
Например DOM API у которого есть метод querySelector() и различные готовые метода и свойства

как использовать fetch:

-- Вариант когда делаем GET запрос:
fetch() - в скобках указываем тот  url, на который будем посылать запрос
И внутри fetch уже возвращает Promise поэтому мы можем обработать цепочкой then()

fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json()) // превратит формат JSON в обычный формат JS,
                                       // как это сделал бы JSON.parse(), только опять возвращает Promise
    .then(json => console.log(json));

-- Вариант когда делаем POST запрос:
    fetch('https://jsonplaceholder.typicode.com/posts', {   // Помещаем объект с настройками которые будем задавать
        method: "POST",
        body: JSON.stringify({name: 'Alex'}),
        headers: {
            'Content-type': 'application/json'
        }
    }) 
    .then(response => response.json())
    // .then(response => response.text()) // либо метод text() для преобразования ответа сервера в текстовый формат
    .then(json => console.log(json));