const db = require("../db/models");
const { pullingDesign, well, client } = db;

const getPullingList = async () => {
  try {
    const result = await pullingDesign.findAll({
      where: { active: true },
      order: [["createdAt", "DESC"]],
      include: {
        model: well,
        include: { model: client },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getPullingDetail = async ({ id }) => {
  try {
    const result = await pullingDesign.findByPk(id, {
      include: {
        model: well,
        include: { model: client },
      },
    });
    return result;
  } catch (error) {
    throw error;
  }
};

// const getTallyDetail = async ({
//   page = undefined,
//   perPage = undefined,
//   search = null,
// }) => {
//   try {
//     const result = await tally.findAndCountAll({
//       offset: page && perPage ? page * perPage : undefined,
//       limit: perPage,
//       where: { active: true },
//       attributes: ["id", "customName", "date"],
//       include: {
//         model: well,
//         attributes: ["name"],
//         include: { model: client, attributes: ["name"] },
//       },
//       order: [["date", "DESC"]],
//     });
//     return result;
//   } catch (error) {
//     throw error;
//   }
// };

const createPulling = async ({
  customName,
  pullingName,
  well,
  installationDate,
  pullingDate,
  details,
  recomendations,
}) => {
  try {
    const result = await pullingDesign.create({
      customName,
      pullingName,
      wellId: well.id,
      installationDate,
      pullingDate,
      details,
      recomendations,
      active: true,
      createdAt: new Date(),
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const editPulling = async (
  id,
  {
    customName,
    pullingName,
    well,
    installationDate,
    pullingDate,
    details,
    recomendations,
  }
) => {
  try {
    const result = await pullingDesign.update(
      {
        customName,
        pullingName,
        well: well.id,
        installationDate,
        pullingDate,
        details,
        recomendations,
      },
      { where: { id } }
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deletePulling = async ({ id }) => {
  try {
    const result = await pullingDesign.update(
      {
        active: false,
      },
      {
        where: { id },
      }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPullingList,
  getPullingDetail,
  createPulling,
  editPulling,
  deletePulling,
};
