# gatsby-remark-plugins-adapter

A simple adapter that allows to use any remark plugin with Gatsby.

## Install

With npm:
```
npm install remark-uml unified
```

With yarn:
```
yarn add remark-uml unified
```

## Use

Just add the plugin to the `gatsby-transformer-remark` plugins list and set its plugins to the remark plugins of your choice.

Example:

```js
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-plugins-adapter`,
        options: {
          plugins: [
            `remark-capitalize`,
            {
              resolve: `remark-uml`,
              options: { format: 'utxt' },
            },
          ],
        },
      },
    ],
  },
},
```

## Configuration

The only available option is `plugins`, which is the array of the
remark plugins to apply to the markdown AST.

It can contain both strings and objects containing a `resolve` field.
You can use the object notation if you need to specify options for the remark plugin.

If one of the specified modules does not export by default the remark plugin, you can add
to its options an `importName` field. 99% of the time you won't need to add this option manually.

Any other option specified will be proxied directly to the remark plugin.

## License

[MIT](LICENSE)
