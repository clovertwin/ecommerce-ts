import createSchema from "part:@sanity/base/schema-creator";
import banner from "./banner";
import product from "./product";
import schemaTypes from "all:part:@sanity/base/schema-type";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([banner, product]),
});
