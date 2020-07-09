import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const Grades = db.grades;
const create = async (req, res) => {
  try {
    const data = new Grades({
      name: req.body.name,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
      lastModified: new Date(),
    });
    data.markModified('lastModified');
    await data.save();
    logger.info(`POST /grade - ${JSON.stringify()}`);
    return res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;
  //condicao para o filtro no findAll
  var condition = name ? { $regex: new RegExp(name), $options: 'i' } : {};

  try {
    const data = await Grades.find({ name: condition });
    logger.info(`GET /grade`);
    return res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Grades.findById({ _id: id });
    logger.info(`GET /grade - ${id}`);
    return res.send(data);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;
  const toUpdate = req.body;
  try {
    const data = await Grades.findOne({ _id: id });
    if (!data) {
      return res.status(404).send({ message: 'Grade not found' });
    }
    await Grades.update({ _id: id }, toUpdate, {
      new: true,
    });
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
    return res.send({ message: 'Grade atualizado com sucesso' });
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    await Grades.findByIdAndRemove({ _id: id });
    logger.info(`DELETE /grade - ${id}`);
    return res.send({ message: 'Grade excluido com sucesso' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (__, res) => {
  try {
    await Grades.deleteMany({});
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
