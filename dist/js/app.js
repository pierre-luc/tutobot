angular.module('app', ['tutobot'])
.run(function(tutobotService){
  tutobotService.overlay = true;
  tutobotService.add({
    name: 'first',
    position: 'top-left',
    content: 'A lorem blabla'
  })
  tutobotService.add({
    name: 'second',
    position: 'bottom-left',
    content: 'B lorem blabla'
  })
  tutobotService.add({
    name: 'third',
    position: 'bottom-right',
    content: 'C lorem blabla'
  })
  tutobotService.add({
    name: 'fourth',
    position: 'top-right',
    content: 'D lorem blabla'
  })
})
