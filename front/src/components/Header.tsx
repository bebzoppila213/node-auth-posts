type HeaderProps = {
  onRegisterBtnClick: () => void;
  onAuthBtnClick: () => void;
  userName: string;
  userIsAuth: boolean;
};

export default function Header({
  onRegisterBtnClick,
  onAuthBtnClick,
  userIsAuth,
  userName,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="d-flex gap-3">
          {userIsAuth ? (
            <h3>{userName}</h3>
          ) : (
            <div className="d-flex gap-1">
              <button
                onClick={() => onAuthBtnClick()}
                type="button"
                className="btn-auth btn btn-outline-primary"
              >
                Авторизация
              </button>
              <button
                onClick={() => onRegisterBtnClick()}
                type="button"
                className="btn-register btn btn-primary"
              >
                Регистрация
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
