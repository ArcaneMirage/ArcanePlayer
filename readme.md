# ArcanePlayer

This repo contains examples on how to implement the ArcaneMirage player in your website or web application, using React and plain Javascript.

To use the React example first run: 

`npm install`

`npm run build`

The arcane player has the following methods:

`play()`: used to start the stream programatically

`emitUIEvent`: used to send events to UE

`onReceiveEvent`: used to add listeners for events coming from UE

`onPlayerEvent`: used to add listeners for events from the play, this could be `loading | ready | afkWarning | afkWarningDeactivate | afkTimedOut`