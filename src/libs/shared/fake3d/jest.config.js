module.exports = {
  name: 'shared-fake3d',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/fake3d',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
