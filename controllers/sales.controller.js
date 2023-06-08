const salesService = require("../services/sales");

const getSales = async (req, res, next) => {
  try {
    const { page, perPage } = req.body.pagination;
    const search = req.query.search;
    const result = await salesService.getSales({
      page,
      perPage,
      search
    });
    res.send({ success: true, data: result });
    res.totalRecords = result.count;
    res.numberOfPages= Math.ceil(result.count / perPage);
    res.data = result.rows;
    next();
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const getSaleById = async (req, res) => {
  try {
    const {
      params: { idSales },
    } = req;
    if (idSales === "undefined") {
      throw "Missing Property";
    }
    const result = await salesService.getSaleById({ id: idSales });
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const addSales = async (req, res) => {
  try {
    const result = await salesService.addSales(req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

const editSales = async (req, res) => {
  try {
    const {
      params: { idSales },
    } = req;
    const result = await salesService.editSales(idSales, req.body);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ success: false, data: { error: error?.message || error } });
  }
};

module.exports = {
  getSales,
  getSaleById,
  addSales,
  editSales,
};
