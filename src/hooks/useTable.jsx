/** Author
 * @author Cash Myers
 * @github [https://github.com/cashmy]
 * @create date 2023-03-19 11:31:42
 * @modify date 2023-03-19 11:31:42
 * @desc [description]
 */

//#region Imports
import { useState } from "react";
import PropTypes from "prop-types";
// * Mui
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel,
  useTheme,
} from "@mui/material";
import TextContrast from "../helpers/getTextContrast";
// * Icons
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
//#endregion

function TablePaginationActions(props) {
  //#region //* State & Local Variables
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  //#endregion

  //#region //* Event Handlers
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  //#endregion

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        color="primary"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        color="primary"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        color="primary"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        color="primary"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function useTable(
  records,
  columnCells,
  filterFn,
  rowsPerPageOptions = [5, 10, 25, { label: "All", value: -1 }],
  collapsible = false,
  theadColor,
  ...props
) {
  // const classes = useStyles(props);
  const theme = useTheme();

  const pages = rowsPerPageOptions;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();

  const TblContainer = (props) => (
    <Table
      sx={{
        marginTop: theme.spacing(3),
        "& thead th": {
          fontWeight: "600",
          backgroundColor: theadColor
            ? theadColor
            : theme.palette.background.default,
          color: theadColor
            ? TextContrast.getTextContrast(theadColor)
            : theme.palette.getContrastText(theme.palette.background.default),
        },
        "& tbody td": {
          fontWeight: "300",
        },
        "& tbody tr:hover": {
          backgroundColor: theme.palette.action.hover,
          cursor: "pointer",
        },
      }}
      // className={classes.table}
      stickyHeader={props.stickyHeader || false}
      size={props.size || "medium"}
    >
      {props.children}
    </Table>
  );

  const TblHead = (props) => {
    const handleSortRequest = (cellId) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(cellId);
    };

    return (
      <TableHead style={{ backgroundColor: "purple" }}>
        <TableRow>
          {collapsible && <TableCell />}
          {columnCells.map((columnCell) => (
            <TableCell
              key={columnCell.id}
              sortDirection={orderBy === columnCell.id ? order : false}
            >
              {columnCell.disableSorting ? (
                columnCell.label
              ) : (
                <TableSortLabel
                  active={orderBy === columnCell.id}
                  direction={orderBy === columnCell.id ? order : "asc"}
                  onClick={() => {
                    handleSortRequest(columnCell.id);
                  }}
                >
                  {columnCell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const TblPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      SelectProps={{
        inputProps: {
          "aria-label": "rows per page",
        },
        native: true,
      }}
      ActionsComponent={TablePaginationActions}
    />
  );

  // From the Material UI documents
  // modified to allow the ability to include the sort of objects
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy); //Change the sign, thus switching the direction.
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1; // Need to switch elements
    }
    if (b[orderBy] > a[orderBy]) {
      return 1; // In correct order
    }
    return 0; // They equal
  }

  const recordsAfterPagingAndSorting = () => {
    // start index = pageindex x rowsperpagecount
    // end index = (pageindex + 1) x rowsperpagecount
    // obo -- e.g. 0-5(4), 5-10(9), etc

    // The filterFn is passed in from the parent. It has the "fn" function defined.
    //   Into that function we pass the records and take the result to pass to the sorting functions

    return stableSort(
      filterFn.fn(records),
      getComparator(order, orderBy)
    ).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };

  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  };
}
