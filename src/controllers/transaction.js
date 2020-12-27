const { Transaction, Hire, User } = require('../../models');
const { Op } = require('sequelize');

//? Get All Offers
exports.getAllOffers = async (req, res) => {
  const { status } = req.query;
  const { id } = req.user;
  try {
    let whereCondition = '';
    if (status === 'my-order') {
      whereCondition = '$orderBy.id$';
    } else if (status === 'my-offer') {
      whereCondition = '$orderTo.id$';
    }

    if (!whereCondition) {
      return res.send({
        status: 'Request failed',
        message: 'URL not found',
      });
    }
    const offerTransaction = await Hire.findAll({
      where: {
        [whereCondition]: { [Op.eq]: id },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'orderBy',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'orderTo',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (offerTransaction.length === 0) {
      return res.send({
        status: 'Request failed',
        message: "Not haven't a Offers",
      });
    }

    res.send({
      status: 'Request succes',
      message:
        status === 'my-offer' ? 'Offers was fetching' : 'Orders was fetching',
      data: {
        orders: offerTransaction,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? Get Offer By Id
exports.getOffer = async (req, res) => {
  const { id } = req.params;
  try {
    const offer = await Hire.findOne({
      where: {
        id,
      },
    });
    if (!offer) {
      return res.send({
        status: 'Request failed',
        message: 'Offer not found',
      });
    }

    res.send({
      status: 'Request success',
      message: 'Offer was fetched',
      data: {
        offer,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? get All Orders
exports.getAllOrders = async (req, res) => {
  const { id } = req.user;
  try {
    const orderTransaction = await Hire.findAll({
      where: {
        '$orderBy.id$': { [Op.eq]: id },
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'orderBy',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
        {
          model: User,
          as: 'orderTo',
          attributes: ['id', 'email', 'fullname'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (orderTransaction.length === 0) {
      return res.send({
        status: 'Request failed',
        message: "Not haven't a Orders",
      });
    }
    res.send({
      status: 'Request succes',
      message: 'Offers was fetching',
      data: {
        orders: orderTransaction,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? Get Order By Id
exports.getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Hire.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      return res.send({
        status: 'Request failed',
        message: 'Offer not found',
      });
    }

    res.send({
      status: 'Request success',
      message: 'Offer was fetched',
      data: {
        order,
      },
    });
  } catch (err) {
    return res.send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};
