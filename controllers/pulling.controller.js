const pullingService = require("../services/pulling");
const getPullingByWellId = async (req, res) => {
  try {
    const {
      params: { idWell },
    } = req;
    const result = await pullingService.getPullingByWellId(idWell);
    res.send({ success: true, data: result });
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ success: false, data: { error: error.message || error } });
  }
};

module.exports = {
  getPullingByWellId,
};
