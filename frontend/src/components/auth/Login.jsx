const Login = ({ handleSubmit, handleChange, handleOAuth }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <br />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>OR</p>
      <button onClick={handleOAuth}>Continue with Google</button>
    </>
  );
};
export default Login;
