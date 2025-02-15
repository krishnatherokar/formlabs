export const changeLocalAns = (id, answers) => {
  if (localStorage.getItem(id)) {
    localStorage.setItem(id, JSON.stringify(answers));
  }
};

export const deleteLocalAns = (questionId) => {
  if (localStorage.getItem(questionId)) {
    localStorage.removeItem(questionId);
  }
};
