const showUserResponses = async (req, res, next) => {
  try {
    const user = req.user;
    const { toSkip } = req.query || 0;
    await user.populate({
      path: "resArr",
      select: "_id title description",
      options: { sort: { _id: -1 }, skip: 5 * toSkip, limit: 5 },
    });

    res.json(user.resArr);
  } catch (error) {
    next(error);
  }
};

module.exports = showUserResponses;
