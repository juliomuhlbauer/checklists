import { SystemStyleObject } from "@chakra-ui/react";

export const nProgress: SystemStyleObject = {
  "#nprogress": {
    pointerEvents: "none",
  },
  "#nprogress .bar": {
    bg: "primary.200",
    position: "fixed",
    zIndex: "2000",
    top: 0,
    left: 0,
    w: "100%",
    h: "1px",
  },
};
