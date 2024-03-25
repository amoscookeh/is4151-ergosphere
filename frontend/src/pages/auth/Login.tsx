import React, { useState } from "react";
import { loginUser } from "../../services/api/user";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const user = await loginUser({ username, password });
      if (user) {
        console.log("Now route to the user's dashboard");
      }
    } catch (error) {
      alert("Error logging in: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
