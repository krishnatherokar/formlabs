const Login = ({ handleSubmit, handleChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="email" name="email" required />
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
