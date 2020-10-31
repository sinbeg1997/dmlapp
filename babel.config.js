module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@components': './src/components',
          '@utils': './src/utils',
          '@constant': './src/constant',
          '@providers': './src/providers'
          //  '@shared': './src/shared'
        }
      }
    ]
  ]
};


