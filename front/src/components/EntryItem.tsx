import { SERVER_MEDIA, SERVER_URL } from "../api/config";

type EntryItemProps = {
  img: string;
  userName: string;
  text: string;
  menuIsvisible: boolean;
  onBtnDeleteClick: () => void;
  onBtnChangeClick: () => void;
};

export default function EntryItem({
  img,
  userName,
  text,
  menuIsvisible,
  onBtnDeleteClick,
  onBtnChangeClick,
}: EntryItemProps) {
  return (
    <div className="card" style={{ flex: "0 0 30%" }}>
      <img
        className="card-img-top"
        src={SERVER_MEDIA + img}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">Автор: {userName}</h5>
        <p className="card-text">{text}</p>
        {menuIsvisible && (
          <div
            className="btn-group gap-2"
            role="group"
            aria-label="Basic example"
          >
            <button
              onClick={() => onBtnChangeClick()}
              className="btn btn-primary "
            >
              Редактировать
            </button>
            <button
              onClick={() => onBtnDeleteClick()}
              className="btn btn-danger"
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
