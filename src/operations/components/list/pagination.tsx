import {useListContext} from "react-admin";
import {Button, Toolbar, Typography, styled} from "@mui/material";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import {colors} from "@/themes";

const PaginationAction = styled(Button)({
  "border": "1px solid transparent",
  ":hover": {
    border: `1px solid ${colors("gray-0")}`,
  },
});

/**
 * hidden when listContext.data is empty
 */
export const Pagination = () => {
  const {
    data = [],
    page,
    setPage,
    hasNextPage,
    hasPreviousPage,
  } = useListContext();

  return (
    !!data.length && (
      <Toolbar
        sx={{
          bgcolor: "#fff",
          border: `1px solid ${colors("gray-0")}`,
          borderRadius: "4px",
          gap: 1,
          mt: 1,
        }}
      >
        <PaginationAction
          sx={{
            color: "#575757",
            textTransform: "none",
          }}
          color="primary"
          key="prev"
          disabled={!hasPreviousPage}
          startIcon={<ChevronLeft />}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </PaginationAction>

        <PaginationAction
          sx={{color: "#575757", textTransform: "none"}}
          key="next"
          endIcon={<ChevronRight />}
          disabled={!hasNextPage}
          onClick={() => setPage(page + 1)}
        >
          Next
        </PaginationAction>
        <div style={{marginLeft: "auto"}}>
          <Typography variant="body2" sx={{color: "#575757"}}>
            Page: {page}
          </Typography>
        </div>
      </Toolbar>
    )
  );
};
