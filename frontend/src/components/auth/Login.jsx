const Login = ({ handleSubmit, handleChange, handleOAuth }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
          required
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>OR</p>
      <button onClick={handleOAuth}>Continue with Google</button>
    </>
  );
};
export default Login;
