import * as vscode from 'vscode';

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

        webviewView.webview.html = this.showHtml(webviewView.webview);

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

    public showHtml(webview: vscode.Webview): string {
        const style = this.getStyle(webview);
        const nonce = getNonce();
        // <meta
        // http-equiv="Content-Security-Policy"
        // content="
        // default-src 'none';
        // media-src
        // img-src ${webview.cspSource} https:;
        // frame-src ${webview.cspSource} https:;
        // script-src 'nonce-${nonce}';
        // style-src ${webview.cspSource} https:;"
        // />
        return `
        <!DOCTYPE html>
			<html lang="en">
                <head>
              
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Watch video</title>
                    <link href="${style}" rel="stylesheet">
                </head>
                <body>
                    <button id="btn" class="add-color-button">Open it now</button>
                    <img width="300"  src="https://bedental.vn/wp-content/uploads/2022/11/f99a5cc9ebcceba1dd49af0d509732dc.jpg"/>
                    <iframe 
                        src="https://www.youtube.com/embed/VHjMJeLsI0o"
                        id="inlineFrameExample1"
                        title="Inline Frame Example1"
                        sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation allow-presentation"  
                        allowfullscreen 
                        width="300" 
                        height="250" 
                        >
                    </iframe>
                    <script nonce="${nonce}">
                        console.log('3333');
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