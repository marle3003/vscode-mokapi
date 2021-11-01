// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "mokapi" is now active!');

	setExternalLibrary("EmmyLua", true);
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('mokapi.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Mokapi!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function setExternalLibrary(folder: string, enable: boolean) {
	console.log("setExternalLibrary", folder, enable);
	const extensionId = "marle.mokapi";
	const extensionPath = vscode.extensions.getExtension(extensionId)?.extensionPath;
	const folderPath = extensionPath+"\\"+folder;
	const config = vscode.workspace.getConfiguration("Lua");
	const library: string[] | undefined = config.get("workspace.library");
	if (library && extensionPath) {
		// remove any older versions of our path e.g. "publisher.name-0.0.1"
		for (let i = library.length-1; i >= 0; i--) {
			const el = library[i];
			const isSelfExtension = el.indexOf(extensionId) > -1;
			const isCurrentVersion = el.indexOf(extensionPath) > -1;
			if (isSelfExtension && !isCurrentVersion) {
				library.splice(i, 1);
			}
		}
		const index = library.indexOf(folderPath);
		if (enable) {
			if (index === -1) {
				library.push(folderPath);
			}
		}
		else {
			if (index > -1) {
				library.splice(index, 1);
			}
		}
		config.update("workspace.library", library, true);
	}
}

setExternalLibrary("EmmyLua", true);
