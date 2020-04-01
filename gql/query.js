const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull
} = require("graphql");
const { Twitter } = require("../model");
const { SourceType } = require("./types");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    fetchSources: {
      type: GraphQLList(SourceType),
      args: {
        sourceType: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { sourceType }) {
        return Twitter[sourceType].find();
      }
    }
  })
});

module.exports = RootQuery;
