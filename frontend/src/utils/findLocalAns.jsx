const findLocalAns = (questionId, changeAns) => {
  if (!localStorage.getItem(questionId)) localStorage.setItem(questionId, "[]");
  changeAns(JSON.parse(localStorage.getItem(questionId)));
};
export default findLocalAns;
