angular.module('app', ['tutobot'])
.run(function(tutobotService){
  tutobotService.overlay = true;

  tutobotService
    .add({
      name: 'first',
      position: 'top-left',
      content: 'A lorem blabla'
    })
    .add({
      name: 'second',
      position: 'bottom-left',
      content: 'B lorem blabla'
    })
    .add({
      name: 'third',
      position: 'bottom-right',
      content: 'C lorem blabla'
    })
    .add({
      name: 'fourth',
      position: 'top-right',
      content: 'D lorem blabla'
    })
})
