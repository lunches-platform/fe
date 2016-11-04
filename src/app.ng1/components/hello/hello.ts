export const hello: angular.IComponentOptions = {
  template: require('./hello.html'),
  controller: function () { // eslint-disable-line babel/object-shorthand
    this.hello = 'Hello World!';
    console.log('hello world');
  }
};
