import { useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';

interface ArcanePlayer {
    play: () => void;
    emitUIEvent: (descriptor: string | object) => boolean;
    onReceiveEvent: (
        name: string,
        listener: (response: string) => void
    ) => void;
    onPlayerEvent: (name: string, listener: (data?: any) => void) => void;
    toggleFullscreen: () => boolean;
}
const ArcanePlayer = ({ project }: {project: { key: string, id: number}}) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://embed.arcanemirage.com/'+project.key+'/e';
        script.onload = () => {
            window['initArcanePlayer']();
        };
        document.getElementById('am-container').append(script);

        window.addEventListener('ArcanePlayerLoaded', () => {
            const player: ArcanePlayer = window['ArcanePlayer'];

            player.onReceiveEvent('CustomUIEventResponse', (response) => {
                console.log({ ArcaneResponse: response });
            });

            player.onPlayerEvent('loading', () => {
                console.log('loading');
            });

            player.onPlayerEvent('ready', () => {
                console.log('ready');
            });

            player.onPlayerEvent('afkWarning', () => {
                console.log('afkWarning');
            });

            player.onPlayerEvent('afkWarningDeactivate', () => {
                console.log('afkWarningDeactivate');
            });

            player.onPlayerEvent('afkTimedOut', () => {
                console.log('afkTimedOut');
            });
            // Emit event to Unreal Engine
            player.emitUIEvent('MyCustomEventWithoutData');
            player.emitUIEvent({ event: 'MyCustomEventWithData', data: {
                foo: 'bar',
            } });
            // Receive event from Unreal Engine
            player.onReceiveEvent('CustomUIEventResponse', (response) => {
                console.log({ ArcaneResponse: response });
            });
            // If the response from UE is a json, you'll to set the descriptor
            // of the listener as 'event.' + name or 'cmd.' + name, this response will
            // look like this:
            /*
                {
                    "event": "MyCustomEventWithData",
                    "data": {
                        "foo": "bar"
                    }
                }
            */
            player.onReceiveEvent('event.MyCustomEventWithData', (response) => {
                console.log({ ArcaneResponse: response });
            });
            // For starting the stream programatically call:
            player.play();

            // For entering and exit fullscreen mode, this needs to be called 
            // after the user has any interaction with the site (click/touch or via button)
            // or it will fail
            // returns boolean for the current state of fullscreen element
            player.toggleFullscreen();

            // Receive file events, only override them if you don't want to use the default button/progress
            player.onPlayerEvent( 'fileProgress', (progress: number) => {
                console.log('File download progress:', progress);
            } );

            player.onPlayerEvent( 'fileReceived', (data: {file: Blob, extension: string}) => {
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
        });
    });
    return project ? (
            <div
                id="arcane-player"
                data-project-id={project.id}
                data-project-key={project.key}
                data-idle-timeout="200"
                data-capture-mouse="false"
                data-enable-events-passthrough="true"
                data-hide-ui-controls="true"
                data-autoplay="false"
            ></div>
    ) : null;
};
export { ArcanePlayer };

document.body.onload = function () {
    // initArcanePlayer();
    ReactDOM.createRoot(document.getElementById('am-container')).render(
        <ArcanePlayer
            project={{
                id: 999,
                key: 'aaa-bbb-ccc-ddd-eee'
            }}
        />
    );
};
