const changeLocalAns = (id, answers) => {
  if (localStorage.getItem(id)) {
    localStorage.setItem(id, JSON.stringify(answers));
  }
};
export default changeLocalAns;
