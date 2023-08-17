import { useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';

interface ArcanePlayer {
    play: () => void;
    emitUIEvent: (descriptor: string | object) => boolean;
    onReceiveEvent: (
        name: string,
        listener: (response: string) => void
    ) => void;
    onPlayerEvent: (name: string, listener: () => void) => void;
}
const ArcanePlayer = ({ project }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://player.arcanemirage.com/X.X.X/player.js';
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
            // For starting the stream programatically call:
            player.play();
        });
    });
    return project ? (
            <div
                id="arcane-player"
                data-project-id={project.arcaneProjectId}
                data-project-key={project.arcaneProjectKey}
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
