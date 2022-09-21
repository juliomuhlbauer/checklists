import { Styles } from "@chakra-ui/theme-tools";
import { nProgress } from "./nprogress";
import { scrollbar } from "./scrollbar";

export const globalStyles: Styles = {
  global: {
    "*": {
      boxSizing: "border-box",
    },
    html: {
      scrollBehavior: "smooth",
      WebkitTapHighlightColor: "transparent",
    },
    body: {
      color: "text",
      bgColor: "bg",
    },
    _selection: {
      color: "white",
      background: "primary.500",
    },
    ...scrollbar,
    ...nProgress,
  },
};
