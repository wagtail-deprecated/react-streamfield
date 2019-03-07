import { configure } from "@storybook/react";

configure(() => {
  require("../example/example.scss");
  require("../src/scss/index.scss");

  require("../example/index.story");
}, module);
