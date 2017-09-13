var logger = require('../servicos/logger.js');

module.exports = function(app) {

  app.post('/cartoes/autoriza', function(req, res) {
    var cartao = req.body["cartao"];

    req.assert("cartao.numero",
      "O número do cartão é obrigatório, e deve ter 16 digitos")
      .notEmpty()
      .len(16,16);

    req.assert("cartao.bandeira", "A bandeira do cartão é obrigatória")
      .notEmpty();

    req.assert("cartao.ano_de_expiracao",
      "O ano de expiração é obrigatório e deve ter dois dítitos")
      .notEmpty()
      .len(2,2);

    req.assert("cartao.mes_de_expiracao",
      "O mês de expiração é obrigatório e deve ter dois dítitos")
      .notEmpty()
      .len(2,2);

    req.assert("cartao.cvv",
      "O cvv é obrigatório e deve ter três dítitos")
      .notEmpty()
      .len(3,3);

    var erros = req.validationErrors();

    if (erros) {
      console.log("Ocorreram erros de validação com o cartão");
      console.log(erros);

      logger.error(`Ocorreram erros de validação com o cartão: ${JSON.stringify(erros)}`)

      res.status(400).send(erros);
      return
    }

    cartao.status = 'AUTORIZADO';
    console.log("Pagamento Autorizado");

    var response = {
      dados_do_cartao: cartao
    }

    logger.info(`Pagamento autorizado ${response}`)

    res.status(201).json(response);
    return;
  });
}
