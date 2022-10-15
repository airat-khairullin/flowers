module.exports = {
  name: 'shared-layout',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/layout',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
