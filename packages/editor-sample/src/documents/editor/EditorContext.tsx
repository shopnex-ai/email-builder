import { create } from "zustand";

import getConfiguration from "../../getConfiguration";

import { TEditorConfiguration } from "./core";

type TValue = {
    document: TEditorConfiguration;
    history: TEditorConfiguration[];
    historyIndex: number;

    selectedBlockId: string | null;
    selectedSidebarTab: "block-configuration" | "styles";
    selectedMainTab: "editor" | "preview" | "json" | "html";
    selectedScreenSize: "desktop" | "mobile";

    inspectorDrawerOpen: boolean;
    templateName: string;
};

const initialDocument =
    typeof window !== "undefined"
        ? getConfiguration(window.location.hash)
        : getConfiguration("welcome");

const editorStateStore = create<TValue>(() => ({
    document: initialDocument,
    history: [initialDocument],
    historyIndex: 0,
    selectedBlockId: null,
    selectedSidebarTab: "styles",
    selectedMainTab: "editor",
    selectedScreenSize: "desktop",

    inspectorDrawerOpen: true,
    templateName: "",
}));

export function useTemplateName() {
    return editorStateStore((s) => s.templateName);
}

// Setter function to update the templateName
export function setTemplateName(templateName: string) {
    return editorStateStore.setState({ templateName });
}

export function useDocument() {
    return editorStateStore((s) => s.document);
}

export function useSelectedBlockId() {
    return editorStateStore((s) => s.selectedBlockId);
}

export function useSelectedScreenSize() {
    return editorStateStore((s) => s.selectedScreenSize);
}

export function useSelectedMainTab() {
    return editorStateStore((s) => s.selectedMainTab);
}

export function setSelectedMainTab(selectedMainTab: TValue["selectedMainTab"]) {
    return editorStateStore.setState({ selectedMainTab });
}

export function useSelectedSidebarTab() {
    return editorStateStore((s) => s.selectedSidebarTab);
}

export function useInspectorDrawerOpen() {
    return editorStateStore((s) => s.inspectorDrawerOpen);
}

export function useCanUndo() {
    return editorStateStore((s) => s.historyIndex > 0);
}

export function useCanRedo() {
    return editorStateStore((s) => s.historyIndex < s.history.length - 1);
}

export function setSelectedBlockId(selectedBlockId: TValue["selectedBlockId"]) {
    const selectedSidebarTab =
        selectedBlockId === null ? "styles" : "block-configuration";
    const options: Partial<TValue> = {};
    if (selectedBlockId !== null) {
        options.inspectorDrawerOpen = true;
    }
    return editorStateStore.setState({
        selectedBlockId,
        selectedSidebarTab,
        ...options,
    });
}

export function setSidebarTab(
    selectedSidebarTab: TValue["selectedSidebarTab"]
) {
    return editorStateStore.setState({ selectedSidebarTab });
}

export function resetDocument(document: TValue["document"]) {
    return editorStateStore.setState({
        document,
        history: [document],
        historyIndex: 0,
        selectedSidebarTab: "styles",
        selectedBlockId: null,
    });
}

export function setDocument(document: TValue["document"]) {
    const state = editorStateStore.getState();
    const originalDocument = state.document;
    const newDocument = {
        ...originalDocument,
        ...document,
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newDocument);

    return editorStateStore.setState({
        document: newDocument,
        history: newHistory,
        historyIndex: newHistory.length - 1,
    });
}

export function undo() {
    const state = editorStateStore.getState();
    if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return editorStateStore.setState({
            document: state.history[newIndex],
            historyIndex: newIndex,
        });
    }
}

export function redo() {
    const state = editorStateStore.getState();
    if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return editorStateStore.setState({
            document: state.history[newIndex],
            historyIndex: newIndex,
        });
    }
}

export function toggleInspectorDrawerOpen() {
    const inspectorDrawerOpen =
        !editorStateStore.getState().inspectorDrawerOpen;
    return editorStateStore.setState({ inspectorDrawerOpen });
}

export function setSelectedScreenSize(
    selectedScreenSize: TValue["selectedScreenSize"]
) {
    return editorStateStore.setState({ selectedScreenSize });
}
