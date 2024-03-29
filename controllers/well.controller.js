const wellService = require("../services/well");

const getWell = async (req, res) => {
  try {
    const well = await wellService.getWell();
    res.send({ success: true, data: well });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const getWellDetail = async (req, res) => {
  try {
    const {
      params: { idWell },
    } = req;
    const result = await wellService.getWellDetail(idWell);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const getWellPaginate = async (req, res, next) => {
  try {
    const { page, perPage } = req.body.pagination;
    const search = req.query.search;
    const result = await wellService.getWellPaginate({
      page,
      perPage,
      search,
    });
    res.totalRecords = result.count;
    res.numberOfPages = Math.ceil(result.count / perPage);
    res.data = result.rows;
    next();
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const getWellByClientId = async (req, res) => {
  try {
    const {
      params: { clientId },
    } = req;
    const result = await wellService.getWellByClientId(clientId);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const addWell = async (req, res) => {
  try {
    const result = await wellService.addWell(req.body);
    res.send({ success: true, data: {} });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const editWell = async (req, res) => {
  try {
    const {
      params: { idWell },
    } = req;
    const result = await wellService.editWell(idWell, req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

const deleteWell = async (req, res) => {
  try {
    const {
      params: { idWell },
    } = req;
    if (idWell === "undefined") {
      throw "Missing Property";
    }
    const result = await wellService.deleteWell({ id: idWell });
    res.send({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

module.exports = {
  getWell,
  getWellByClientId,
  addWell,
  editWell,
  deleteWell,
  getWellPaginate,
  getWellDetail,
};
