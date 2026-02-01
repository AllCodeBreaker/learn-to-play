"use client"

import dynamic from "next/dynamic"
import type { OnChange } from "@monaco-editor/react"

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then(mod => mod.default), {
    ssr: false
})

type CodeEditorProps = {
    value: string,
    onChange?: OnChange,
    language?: string,
}

export default function CodeEditor({ value, onChange, language = "python" }: CodeEditorProps) {
    // Register a small completion provider for Python to offer basic keywords/snippets.
    // Use `beforeMount` to get access to the `monaco` instance before the editor mounts.
    const beforeMount = (monaco: typeof import("monaco-editor")) => {
        try {
            // Avoid double-registration across hot reloads or multiple mounts
            const win = typeof window !== "undefined" ? (window as any) : {}
            const key = `__monaco_python_provider_registered_${language}`
            if (win[key]) return

            if (language === "python") {
                const keywords = [
                    "def",
                    "class",
                    "import",
                    "from",
                    "for",
                    "while",
                    "if",
                    "elif",
                    "else",
                    "try",
                    "except",
                    "finally",
                    "with",
                    "as",
                    "return",
                    "lambda",
                    "print",
                    "True",
                    "False",
                    "None",
                    "range"
                ]

                monaco.languages.registerCompletionItemProvider("python", {
                    provideCompletionItems: (model, position) => {
                        const word = model.getWordUntilPosition(position)
                        const range = {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: word.startColumn,
                            endColumn: word.endColumn,
                        }

                        const suggestions = keywords.map((kw) => ({
                            label: kw,
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: kw === "print" ? "print(${1:...})" : kw,
                            insertTextRules: kw === "print" ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet : undefined,
                            range,
                        }))

                        return { suggestions }
                    },
                })
            }

            win[key] = true
        } catch (e) {
            // ignore if monaco isn't available for some reason
            // eslint-disable-next-line no-console
            console.warn("monaco beforeMount error:", e)
        }
    }

    return (
        <MonacoEditor
            height="500px"
            language={language}
            value={value}
            onChange={onChange}
            theme="vs-dark"
            beforeMount={beforeMount}
            options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineHeight: 22,
                automaticLayout: true,
                quickSuggestions: true,
                suggestOnTriggerCharacters: true,
                wordBasedSuggestions: "currentDocument",
            }}
        />
    )
}
