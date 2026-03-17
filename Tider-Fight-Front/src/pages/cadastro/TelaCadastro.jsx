import { useNavigate } from "react-router-dom";

export function TelaCadastro() {
  const nav = useNavigate();

  const returnHome = () => {
    nav(-1);
  };

  return (
    <div>
      <div></div>

      <div>
        <form>
          <h3>Cadastro</h3>

          {/* Campo de usuário */}
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Usuário"
              required
            />
          </div>

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
          <div className="flex flex-col w-full mb-4">
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
