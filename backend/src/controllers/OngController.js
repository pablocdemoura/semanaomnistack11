const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ong').select('*');
  
    return response.json(ongs);
  },

  async create(request, response) {
    // const data = request.body;
    // console.log(data);
    const { nome, email, whatsapp, cidade, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ong').insert({
      id,
      nome,
      email,
      whatsapp,
      cidade,
      uf
    })

    return response.json({ id });
  }
}
