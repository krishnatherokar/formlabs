const deleteLocalAns = (questionId) => {
  if (localStorage.getItem(questionId)) localStorage.removeItem(questionId);
};
export default deleteLocalAns;
