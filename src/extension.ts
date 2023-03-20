// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

// example webview https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample

import * as vscode from 'vscode';
import WatchViewProvider from './components/primary-bar';
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "youtube-wa" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('youtube-wa.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from youtube-wa!');
	});

	let start = vscode.commands.registerCommand('youtube-wa.test-app', () => {
		vscode.window.showInformationMessage('Chay dc r nha thang l!');

	});

	let watch = new WatchViewProvider(context.extensionUri);

	// const view = vscode.window.
	context.subscriptions.push(disposable, start);
	context.subscriptions.push(vscode.window.registerWebviewViewProvider(WatchViewProvider.viewType, watch));
	
}

// This method is called when your extension is deactivated
export function deactivate() { }
