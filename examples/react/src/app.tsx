import { useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';

interface ArcanePlayer {
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
            const playOverlayDiv = document.getElementById('playOverlay');
            if (playOverlayDiv) {
                playOverlayDiv.click();
            }
            player.onReceiveEvent('CustomUIEventResponse', (response) => {
                console.log({ ArcaneResponse: response });
            });

            player.onPlayerEvent('loading', () => {
                console.log('loading');
            });

            player.onPlayerEvent('ready', () => {
                console.log('ready');
            });
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
