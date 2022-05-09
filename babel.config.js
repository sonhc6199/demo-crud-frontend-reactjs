const presets = [
  [
    '@babel/env',
    {
      targets: {
        esmodules: true
      },
      useBuiltIns: 'entry',
      corejs: '3'
    }

  ],
  [ '@babel/react' ]
];

const plugins = ['@babel/plugin-syntax-dynamic-import', '@babel/plugin-proposal-class-properties'];

module.exports = { presets, plugins };
