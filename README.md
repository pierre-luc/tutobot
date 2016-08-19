Tutobot
=========

A bot to explain step by step an UI

How to install
--------------

```bash
  npm install tutobot
```

How to use
----------

0. Angular is required to use tutobot
1. Import the css and js

```html
  <link rel="stylesheet" type="text/css" href="node_modules/tutobot/dist/css/tutobot.css" />
  <script src="node_modules/tutobot/dist/js/tutobot.js"></script>
```

2. How to create the steps set
  - Add the **tutobot** module in dependencies of your main module
  - Use **tutobotService** in the run method of your main module
  - Then add a step like that:
  ```js
    tutobotService.add({
      name: 'stepName',
      position: 'top-left',
      content: 'lorem ipsum..'
    })
  ```
    - **name** is the name of the step to add
    - **position** = 'top-left' | 'bottom-left' | 'bottom-right' | 'top-right'
    - **content** is the text of the step

3. Plug the step on your elements in the DOM like that:
```html
<element tutobot-step="stepName">
  ```

  use the **tutobot-step** attribute on some DOM elements and the value is the
  name of the step to bind on it.


5. There is an overlay option to enable an overlay.
```js
tutobotService.overlay = true; // to enable the overlay
```
