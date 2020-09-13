import {
  CodeLensProvider,
  TextDocument,
  CodeLens,
  Range,
  Command,
  commands, Uri
} from "vscode";

class ESBMCLensProvider implements CodeLensProvider {

  async provideCodeLenses(document: TextDocument): Promise<CodeLens[]> {
    let c: Command = {
      command: "extension.runESBMC",
      title: "Run in ESBMC"
    };

    let uri = Uri.file(document.uri.path.toString());
    let result: any[] = [];
    let a = commands.executeCommand('vscode.executeDocumentSymbolProvider', uri);

    a.then(function (value: any | undefined) {
        value.forEach(function (element: any) {
        // Functions have kind 11
        if (element.kind === 11) {
          let lineStart = element.location.range._start._line;
          let charStart = element.location.range._start._character;
          let lineEnd = element.location.range._end._line;
          let charEnd = element.location.range._end._character;
          let pos = new Range(lineStart, charStart, lineEnd, charEnd);
          result = result.concat(new CodeLens(pos, c));
        }
      }
      );
    }, function (reason) {
      console.error(reason);
    });

    await a;
    return result;
  }
}

export default ESBMCLensProvider;