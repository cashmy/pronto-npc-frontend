/* eslint-disable @typescript-eslint/no-explicit-any */
import TablePagination from "@mui/material/TablePagination";

type AppPaginationProps = {
  count: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  rowsPerPage?: number;

  [x: string]: any;
};

const AppPagination: React.FC<AppPaginationProps> = ({
  count,
  page,
  onPageChange,
  rowsPerPage = 10,
  ...rest
}) => {
  return (
    <TablePagination
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      rowsPerPageOptions={[]}
      {...rest}
    />
  );
};

export default AppPagination;
