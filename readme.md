# ArcanePlayer

This repo contains examples on how to implement the ArcaneMirage player in your website or web application, using React and plain Javascript.

To use the React example first run: 

`npm install`

`npm run build`

The arcane player has the following methods:

`play: () => void`: used to start the stream programatically

`emitUIEvent: (descriptor: string | object) => boolean`: used to send events to UE

`onReceiveEvent: (name: string, listener: (response: string) => void ) => void`: used to add listeners for events coming from UE

`onPlayerEvent: (name: string, listener: () => void) => void`: used to add listeners for events from the play, this could be 

`loading | ready | afkWarning | afkWarningDeactivate | afkTimedOut`