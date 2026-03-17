import { useNavigate } from "react-router-dom";

export function TelaLogin() {
  const nav = useNavigate();

  const returnHome = () => {
    nav(-1);
  };

  return (
    <div>
      <div></div>

      <div>
        <form>
          <h3>Login</h3>
          {/* Campo de email */}
          <div>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="e-mail"
              required
            />
          </div>

          {/* Campo de senha */}
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}
