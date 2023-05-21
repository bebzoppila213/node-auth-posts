type PaginationProps = {
  active: number;
  size: number;
  onClickPagItem: (newPag: number) => void
};

export default function Pagination({ size, active, onClickPagItem }: PaginationProps) {
  return (
    <nav className="mt-4">
      <ul className="pagination gap-2">
        {Array.from(Array(size).keys()).map((index) => (
          <li onClick={() => onClickPagItem(index)} key={index} className="page-item">
            <button  className={"btn " + (index == active ? " btn-primary" : " btn-secondary")}>{index}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
