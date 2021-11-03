// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const events = {
	getHover: require("./events").getHover
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log("loaded marle.mokapi", context.extension.id)

	setExternalLibrary("EmmyLua", true);
	
	const hover = vscode.languages.registerHoverProvider(
		"lua",
		{
			provideHover(document: vscode.TextDocument, position: vscode.Position) {
				const range = document.getWordRangeAtPosition(position)
				if (range) {
					const start = new vscode.Position(range.start.line, range.start.character-8)
					const before = document.getText(new vscode.Range(start, range.start))
					if (before === '.event("' || before === ':event("') {
						const word = document.getText(range)
						const lword = word.toLowerCase()
						
						let hover = events.getHover(lword)
						if (hover != null){
							return hover
						}
					}
				}
				return null
			}
		}
	)

	context.subscriptions.push(hover)
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