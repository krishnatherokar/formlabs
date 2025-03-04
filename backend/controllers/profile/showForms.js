const showForms = async (req, res, next) => {
  try {
    const user = req.user;
    const { toSkip } = req.query || 0;
    await user.populate({
      path: "forms",
      select: "_id title description",
      options: {
        sort: { _id: -1 },
        skip: 10 * (toSkip >= 0 ? toSkip : 0),
        limit: 10,
      },
    });

    res.json(user.forms);
  } catch (error) {
    next(error);
  }
};

module.exports = showForms;
