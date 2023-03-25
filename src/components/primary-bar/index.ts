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

    protected getScript(webview: vscode.Webview): vscode.Uri {
        return webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'src/assets/ts', 'index.js'));

    }

    public async showHtml(webview: vscode.Webview): Promise<string> {
        const style = this.getStyle(webview);
        const script = this.getScript(webview);
        const nonce = getNonce();
        const data = await get();

        return `<!DOCTYPE html>
			<html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Watch video</title>
                    <link href="
https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css
" rel="stylesheet">
                    <link href="${style}" rel="stylesheet">
                </head>
                <body>
                    <div id="container"></div>
                    <div class="slider-container">
                
                   ${renderImage(data.data)}
                
                    <!-- Slider Next and Previous buttons -->
                    <a class="prev" onclick="plusIndex(-1)">❮</a>
                    <a class="next" onclick="plusIndex(+1)">❯</a>
                
                </div>
                 
                    <script nonce="${nonce}" src="${script}"></script>
                </body>

			</html>
        `;
    }
}
// ${renderImage(data.data)}
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
        images += ` 
        <div class="slides fade">
            <div class="slider-image">
                <img  src="${element.image}" class="img-girl">
            </div>
        </div> 
        `;
    });
    return images;
}

interface Image {
    image: string,
    id: number
}

// example render image

// <div class="slides fade">
// <div class="slider-numbers">4/4</div>
// <div class="slider-image">
//     <img  src="${element.image}" class="img-girl">
// </div>
// <div class="slider-caption">Caption 4</div>
// </div> 