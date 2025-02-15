const Register = ({ handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="email" name="email" required />
      <button type="submit">Register</button>
    </form>
  );
};
export default Register;
