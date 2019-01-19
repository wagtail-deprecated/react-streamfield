import { configure, addDecorator } from "@storybook/react";

configure(() => {
  require("../example/example.scss");
  require("../src/index.scss");

  require("../example/index.story");
}, module);
