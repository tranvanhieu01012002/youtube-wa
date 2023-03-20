import * as vscode from 'vscode';
import { get } from '../../http/axios';
class WatchViewProvider implements vscode.WebviewViewProvider {

    private _view?: vscode.WebviewView;
    public static readonly viewType = 'youtube-wa-primary-bar';

    constructor(
        private readonly _extensionUri: vscode.Uri,
    ) { }

    resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext<unknown>,
        token: vscode.CancellationToken): void | Thenable<void> {

        this.showHtml(webviewView.webview).then(res => webviewView.webview.html = res);

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };

    }

    protected getStyle(webview: vscode.Webview): vscode.Uri {
        return webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src/assets/style', 'index.css'));

    }

    public async showHtml(webview: vscode.Webview): Promise<string> {
        const style = this.getStyle(webview);
        const nonce = getNonce();

        const data = await get();


        // <meta
        // http-equiv="Content-Security-Policy"
        // content="
        // default-src 'none';webviewView.webview.html
        // media-src
        // img-src ${webview.cspSource} https:;
        // frame-src ${webview.cspSource} https:;
        // script-src 'nonce-${nonce}';
        // style-src ${webview.cspSource} https:;"
        // />
        return `<!DOCTYPE html>
			<html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Watch video</title>
                    <link href="${style}" rel="stylesheet">
                </head>
                <body>
                    <button id="btn" class="add-color-button">Open it now</button>
                    <div id="container"></div>
                    ${renderImage(data.data)}
                    <script nonce="${nonce}">
                        console.log('3333');
                        console.log('222');
                    </script>
                </body>

			</html>
        `;
    }
}
export default WatchViewProvider;
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function renderImage(arr: Image[]): string {
    let images = "";
    arr.forEach(element => {
        images += ` <img width="300" src="${element.image}"/>`;
    });
    return images;
}

interface Image {
    image: string,
    id: number
}