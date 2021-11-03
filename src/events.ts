import * as vscode from "vscode"

interface Parameter {
    Name: string
    Type: string
}

interface Event {
    [key: string]: {
        Parameters: Parameter[]
    }
}

const events: Event = {
    http: {
        Parameters: [
            {Name: "request", Type: "Request"},
            {Name: "response", Type: "Response"}
        ]
    }
}

function getMarkdown(name: string){
    let event = events[name]
    if (event == null){
        return null
    }

    let s = "**Event** `"+name+"`\n"

    if (event.Parameters) {
        for (let i = 0; i < event.Parameters.length; i++){
            const p = event.Parameters[i]
            s += (i + 1) + ". "+p.Name;
            s += ": "+p.Type;
            s += "\n";
        }
    }

    return new vscode.MarkdownString(s)
}

export function getHover(name: string){
    let md = getMarkdown(name)
    if (md == null){
        return null
    }
    return new vscode.Hover(md)
}