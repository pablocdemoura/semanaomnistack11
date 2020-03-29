const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidente').count();

    const incidentes = await connection('incidente')
      .join('ong', 'ong.id', '=', 'incidente.ong_id')
      .limit(5)
      .offset((page - 1)*5)
      .select([
        'incidente.*', 
        'ong.nome', 
        'ong.email', 
        'ong.whatsapp', 
        'ong.cidade', 
        'ong.uf'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidentes);
  },

  async create(request, response) {
    const { titulo, descricao, valor, cidade, uf } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidente').insert({
      titulo,
      descricao,
      valor,
      ong_id
    })

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incidente = await connection('incidente')
      .where('id', id)
      .select('ong_id')
      .first();

      if (incidente.ong_id !== ong_id) {
        return response.status(401).json({ error: 'Operação não permitida.' });
      }

      await connection('incidente').where('id', id).delete();

      return response.status(204).send();
  }
}
