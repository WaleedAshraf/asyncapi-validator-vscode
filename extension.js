// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')
const Validator = require('asyncapi-validator')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const validate = () => {
  let editor = vscode.window.activeTextEditor
  if (!editor) {
    vscode.window.showWarningMessage('You must have an open editor window to validate an OpenAPI document')
    return // No open text editor
  }

  var currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName

  Validator.fromSource(currentlyOpenTabfilePath).then((data) => {
    vscode.window.showInformationMessage('Your AsyncAPI document is valid')
  }).catch((error) => {
    let message = `Your AsyncAPI document is not valid ${error}`
    vscode.window.showErrorMessage(message)
  })
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "asyncapi-validator" is now active!')

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.asyncapi-validator', function() {
    validate()
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('asyncapi-validator!')
  })

  context.subscriptions.push(disposable)
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
