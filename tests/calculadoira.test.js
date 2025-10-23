const calculadora = require("../models/calculadora.js");

test("somar 2+2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 'bnanana'+100 deveria retornar 'erro'", () => {
  const resultado = calculadora.somar("banana", "dsadsa");
  expect(resultado).toBe("erro");
});
