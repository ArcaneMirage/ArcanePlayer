# ArcanePlayer

This repo contains examples on how to implement the ArcaneMirage player in your website or web application, using React and plain Javascript.

To use the React example first run: 

`npm install`

`npm run build`

## The arcane player has the following methods:

`play: () => void`: used to start the stream programatically.

`emitUIEvent: (descriptor: string | object) => boolean`: used to send events to UE.

`onReceiveEvent: (name: string, listener: (response: string) => void ) => void`: used to add listeners for events coming from UE.

`toggleFullscreen: () => boolean`: toggles fullscreen of player, if not using it in a UI element, this needs to be triggered after the user had any interaction with the website (click or touch). Returns boolean of the fullscreen state.

`getPlayerState: () => PlayerState`: returns the state of the player. `loading | ready | idle | disconnected`

`onPlayerEvent: (name: string, listener: () => void) => void`: used to add listeners for events from the player.

#### Event Types:
`loading | ready | idle | disconnected | afkWarning | afkWarningDeactivate | afkTimedOut | fileProgress | fileReceived`

#### Receiving files from UE:
You can send any file from UE to the frontend using the [Send File](https://docs.unrealengine.com/5.3/en-US/BlueprintAPI/PixelStreaming/SendFile/) blueprint, by default the player has a progress and download button if you don't want to implement your own, to override this you need to add listeners to the `fileProgress` and `fileReceived` player events like this:

```
ArcanePlayer.onPlayerEvent( 'fileProgress', (progress: number) => {
    console.log('File download progress:', progress);
} );

ArcanePlayer.onPlayerEvent( 'fileReceived', (data: { file: Blob, extension: string }) => {
    // Do what you need with the blob, for example, create a hidden anchor tag
    // and download automatically
    const a = document.createElement('a');
    a.setAttribute('href', URL.createObjectURL(data.file));
    a.style.display = 'none';
    a.setAttribute('download', `received_file.${data.extension}`);
    document.body.append(a);
    a.click();
    a.remove();
} );

```