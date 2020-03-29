const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;
    const ong = await connection('ong')
      .where('id', id)
      .select('nome')
      .first();

    if (!ong) {
      return response.status(400).json({ error: 'Nenhuma Ong encontrada com este ID.' });
    }

    return response.json(ong);
  }

}
