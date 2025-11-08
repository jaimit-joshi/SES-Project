import { TableCell, TableRow, styled, tableCellClasses, Drawer as MuiDrawer, AppBar as MuiAppBar } from "@mui/material"

const drawerWidth = 260

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f5f5f5",
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
      padding: "8px 6px",
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
    padding: "12px 16px",
    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
      padding: "8px 6px",
      whiteSpace: "nowrap",
    },
  },
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    transition: "background-color 0.2s ease",
  },
}))

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  [theme.breakpoints.down("sm")]: {
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
}))

export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
    [theme.breakpoints.down("sm")]: {
      width: "85%",
      maxWidth: 280,
    },
  },
}))
