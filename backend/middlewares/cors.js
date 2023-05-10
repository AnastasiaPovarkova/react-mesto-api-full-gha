const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://mestofront.anstpov.nomoredomains.monster',
  'https://mestofront.anstpov.nomoredomains.monster',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin); // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
  }

  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers']; // сохраняем список заголовков исходного запроса

  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS); // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Headers', requestHeaders); // разрешаем кросс-доменные запросы с этими заголовками
    return res.end(); // завершаем обработку запроса и возвращаем результат клиенту
  }

  return next();
};
