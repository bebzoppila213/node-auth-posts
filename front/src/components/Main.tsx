import { IEntry, IUser } from "../types/user";
import EntryItem from "./EntryItem";
import Pagination from "./Pagination";
import useRequest from "../hooks/useRequest";
import { deleteEntry, updateEntry } from "../api/entry";
import Modal from "../hoc/Modal";
import FormEntry from "./FormEntry";
import { useState } from "react";
import { createEntry } from "../api/user";
import { SERVER_URL } from "../api/config";
type EntryRequestParams = {
  page: number;
};

type EntryCountData = {
  count: number;
};

type MainProps = {
  user: IUser;
};

export default function Main({ user }: MainProps) {
  const [modalEntryIsOpen, setModalEntryIsOpen] = useState(false);
  const [activeEnryId, setActiveEntryId] = useState<null | number>(null);

  const { state, updateParams, params, setState } = useRequest<
    IEntry[],
    EntryRequestParams
  >(SERVER_URL + "entry", [], { page: 0 });

  const enryCount = useRequest<EntryCountData, {}>(
    SERVER_URL + "entry-count",
    { count: 0 },
    {}
  );

  const onBtnDeleteClick = async (entryId: number) => {
    const response = await deleteEntry(user.token, entryId);
    if (response.status < 300) {
      setState(state.filter((entItem) => entItem.id !== entryId));
    }
  };

  const createForm = (photo: File | undefined, text: string) => {
    const formData = new FormData();
    formData.append("text", text);
    if (photo) formData.append("photo", photo);
    return formData;
  };

  const onFormEntrySubmit = async (photo: File | undefined, text: string) => {
    const formData = createForm(photo, text);

    if (activeEnryId) {
      formData.append("id", String(activeEnryId));
      const { data } = await updateEntry(formData, user.token);
      setState(
        state.map((entrItem) =>
          entrItem.id === activeEnryId
            ? { ...entrItem, text: data.text, img: data.img || entrItem.img }
            : entrItem
        )
      );
    } else if (photo) {
      const response = await createEntry(formData, user.token);
      console.log(response);
    }
  };

  const onBtnChangeClick = (id: number) => {
    setActiveEntryId(id);
    setModalEntryIsOpen(true);
  };

  return (
    <>
      <main className="main">
        <div className="container">
          <div className="main-inner">
            <div className="d-flex flex-wrap justify-content-between gap-2">
              {state.map((eItm) => (
                <EntryItem
                  menuIsvisible={user.id == eItm.userId}
                  userName={eItm.user.name}
                  img={eItm.img}
                  text={eItm.text}
                  onBtnChangeClick={() => onBtnChangeClick(eItm.id)}
                  onBtnDeleteClick={() => onBtnDeleteClick(eItm.id)}
                />
              ))}
            </div>
            <div className="main-menu">
              <button
                onClick={() => setModalEntryIsOpen(true)}
                className="btn btn-primary"
              >
                Добавить новую запись
              </button>
            </div>
            <Pagination
              onClickPagItem={(newPag) => updateParams("page", String(newPag))}
              active={params.page}
              size={Math.ceil(enryCount.state.count / 20)}
            ></Pagination>
          </div>
        </div>
      </main>

      <Modal
        title="Создание нового поста"
        onClose={() => setModalEntryIsOpen(false)}
        isOpen={modalEntryIsOpen}
      >
        <FormEntry
          defaultText={state.find((s) => s.id === activeEnryId)?.text}
          onFormSubmit={onFormEntrySubmit}
        ></FormEntry>
      </Modal>
    </>
  );
}
