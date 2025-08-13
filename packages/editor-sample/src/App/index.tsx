import React from "react";

import { Box, Stack, useTheme } from "@mui/material";

import { useInspectorDrawerOpen } from "../documents/editor/EditorContext";
import { TEditorConfiguration } from "../documents/editor/core";

import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from "./InspectorDrawer";
import TemplatePanel from "./TemplatePanel";

function useDrawerTransition(
    cssProperty: "margin-left" | "margin-right",
    open: boolean
) {
    const { transitions } = useTheme();
    return transitions.create(cssProperty, {
        easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
        duration: !open
            ? transitions.duration.leavingScreen
            : transitions.duration.enteringScreen,
    });
}

export default function App({
    onSave,
    templateName,
}: {
    onSave?: (output: {
        html: string;
        json: TEditorConfiguration;
        name: string;
    }) => void;
    templateName: string;
}) {
    const inspectorDrawerOpen = useInspectorDrawerOpen();

    const marginRightTransition = useDrawerTransition(
        "margin-right",
        inspectorDrawerOpen
    );

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <InspectorDrawer />

            <Stack
                sx={{
                    marginRight: inspectorDrawerOpen
                        ? `${INSPECTOR_DRAWER_WIDTH}px`
                        : 0,
                    transition: marginRightTransition,
                }}
            >
                <TemplatePanel onSave={onSave} templateName={templateName} />
            </Stack>
        </Box>
    );
}
