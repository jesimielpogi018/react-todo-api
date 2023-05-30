// json format will be:
// {
//     id: id here (the one that will be edited),
//     data: {
//         todoTask: task here,
//         isStarred: isStarred (boolean) here,
//         todoDueDate: due date here,
//         todoDetails: details here,
//     }
// }

const validateEditTodoReqBody = (req, res, next) => {
  const { id } = req.body;

  if (id === undefined || id === null) {
    res.status(400).json({
      message: "ID is not defined!",
    });
  }

  if (typeof id !== "string") {
    res.status(400).json({
      message: "ID is not valid! Use valid mongodb _id",
    });
  }

  next();
};

module.exports = { validateEditTodoReqBody };
