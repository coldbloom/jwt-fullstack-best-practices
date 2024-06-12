import { enqueueSnackbar } from "notistack";

export default (error: any) =>
  enqueueSnackbar(error.response.data, { variant: "error" })