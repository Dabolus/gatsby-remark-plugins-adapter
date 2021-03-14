const unified = require('unified');

module.exports = async ({ markdownAST }, { plugins = [] } = {}) => {
  const unifiedInstance = unified();

  unifiedInstance.Parser = (json) => JSON.parse(json);
  unifiedInstance.Compiler = (tree) => JSON.stringify(tree);

  plugins.forEach(
    ({
      resolve,
      pluginOptions: { importName = 'default', ...pluginOptions } = {},
    }) => {
      const resolved = require(resolve);

      unifiedInstance.use(
        typeof resolved === 'function' ? resolved : resolved[importName],
        pluginOptions,
      );
    },
  );

  const output = await unifiedInstance.process(JSON.stringify(markdownAST));

  markdownAST.children = JSON.parse(output.contents).children;

  return markdownAST;
};
