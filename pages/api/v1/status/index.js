function status(request, response) {
  response.status(200).json({ chave: "teste 123" });
}

export default status;
