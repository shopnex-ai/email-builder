import React from "react";

import {
    ArrowDownwardOutlined,
    ArrowUpwardOutlined,
    DeleteOutlined,
    ContentCopyOutlined,
} from "@mui/icons-material";
import { IconButton, Paper, Stack, SxProps, Tooltip } from "@mui/material";

import { TEditorBlock } from "../../../editor/core";
import {
    setDocument,
    setSelectedBlockId,
    useDocument,
} from "../../../editor/EditorContext";
import { ColumnsContainerProps } from "../../ColumnsContainer/ColumnsContainerPropsSchema";

const sx: SxProps = {
    position: "absolute",
    top: 0,
    left: -56,
    borderRadius: 64,
    paddingX: 0.5,
    paddingY: 1,
    zIndex: "fab",
};

type Props = {
    blockId: string;
};
export default function TuneMenu({ blockId }: Props) {
    const document = useDocument();

    const handleDuplicateClick = () => {
        const blockToDuplicate = document[blockId];
        if (!blockToDuplicate) return;

        const newBlockId = crypto.randomUUID();
        const duplicatedBlock = { ...blockToDuplicate };

        const addChildrenIds = (
            childrenIds: string[] | null | undefined,
            afterId: string
        ) => {
            if (!childrenIds) return childrenIds;
            const index = childrenIds.indexOf(afterId);
            if (index < 0) return childrenIds;
            return [
                ...childrenIds.slice(0, index + 1),
                newBlockId,
                ...childrenIds.slice(index + 1),
            ];
        };

        const nDocument: typeof document = { ...document, [newBlockId]: duplicatedBlock };
        
        for (const [id, b] of Object.entries(nDocument)) {
            const block = b as TEditorBlock;
            if (id === blockId || id === newBlockId) continue;
            
            switch (block.type) {
                case "EmailLayout":
                    nDocument[id] = {
                        ...block,
                        data: {
                            ...block.data,
                            childrenIds: addChildrenIds(
                                block.data.childrenIds,
                                blockId
                            ),
                        },
                    };
                    break;
                case "Container":
                    nDocument[id] = {
                        ...block,
                        data: {
                            ...block.data,
                            props: {
                                ...block.data.props,
                                childrenIds: addChildrenIds(
                                    block.data.props?.childrenIds,
                                    blockId
                                ),
                            },
                        },
                    };
                    break;
                case "ColumnsContainer":
                    nDocument[id] = {
                        type: "ColumnsContainer",
                        data: {
                            style: block.data.style,
                            props: {
                                ...block.data.props,
                                columns: block.data.props?.columns?.map((c) => ({
                                    childrenIds: addChildrenIds(c.childrenIds, blockId),
                                })),
                            },
                        } as ColumnsContainerProps,
                    };
                    break;
                default:
                    nDocument[id] = block;
            }
        }
        
        setDocument(nDocument);
        setSelectedBlockId(newBlockId);
    };

    const handleDeleteClick = () => {
        const filterChildrenIds = (
            childrenIds: string[] | null | undefined
        ) => {
            if (!childrenIds) {
                return childrenIds;
            }
            return childrenIds.filter((f) => f !== blockId);
        };
        const nDocument: typeof document = { ...document };
        for (const [id, b] of Object.entries(nDocument)) {
            const block = b as TEditorBlock;
            if (id === blockId) {
                continue;
            }
            switch (block.type) {
                case "EmailLayout":
                    nDocument[id] = {
                        ...block,
                        data: {
                            ...block.data,
                            childrenIds: filterChildrenIds(
                                block.data.childrenIds
                            ),
                        },
                    };
                    break;
                case "Container":
                    nDocument[id] = {
                        ...block,
                        data: {
                            ...block.data,
                            props: {
                                ...block.data.props,
                                childrenIds: filterChildrenIds(
                                    block.data.props?.childrenIds
                                ),
                            },
                        },
                    };
                    break;
                case "ColumnsContainer":
                    nDocument[id] = {
                        type: "ColumnsContainer",
                        data: {
                            style: block.data.style,
                            props: {
                                ...block.data.props,
                                columns: block.data.props?.columns?.map(
                                    (c) => ({
                                        childrenIds: filterChildrenIds(
                                            c.childrenIds
                                        ),
                                    })
                                ),
                            },
                        } as ColumnsContainerProps,
                    };
                    break;
                default:
                    nDocument[id] = block;
            }
        }
        delete nDocument[blockId];
        setDocument(nDocument);
    };

    const handleMoveClick = (direction: "up" | "down") => {
        const moveChildrenIds = (ids: string[] | null | undefined) => {
            if (!ids) {
                return ids;
            }
            const index = ids.indexOf(blockId);
            if (index < 0) {
                return ids;
            }
            const childrenIds = [...ids];
            if (direction === "up" && index > 0) {
                [childrenIds[index], childrenIds[index - 1]] = [
                    childrenIds[index - 1],
                    childrenIds[index],
                ];
            } else if (direction === "down" && index < childrenIds.length - 1) {
                [childrenIds[index], childrenIds[index + 1]] = [
                    childrenIds[index + 1],
                    childrenIds[index],
                ];
            }
            return childrenIds;
        };
        const nDocument: typeof document = { ...document };
        for (const [id, b] of Object.entries(nDocument)) {
            const block = b as TEditorBlock;
            if (id === blockId) {
                continue;
            }
            switch (block.type) {
                case "EmailLayout":
                    nDocument[id] = {
                        ...block,
                        data: {
                            ...block.data,
                            childrenIds: moveChildrenIds(
                                block.data.childrenIds
                            ),
                        },
                    };
                    break;
                case "Container":
                    nDocument[id] = {
                        ...block,
                        data: {
                            ...block.data,
                            props: {
                                ...block.data.props,
                                childrenIds: moveChildrenIds(
                                    block.data.props?.childrenIds
                                ),
                            },
                        },
                    };
                    break;
                case "ColumnsContainer":
                    nDocument[id] = {
                        type: "ColumnsContainer",
                        data: {
                            style: block.data.style,
                            props: {
                                ...block.data.props,
                                columns: block.data.props?.columns?.map(
                                    (c) => ({
                                        childrenIds: moveChildrenIds(
                                            c.childrenIds
                                        ),
                                    })
                                ),
                            },
                        } as ColumnsContainerProps,
                    };
                    break;
                default:
                    nDocument[id] = block;
            }
        }

        setDocument(nDocument);
        setSelectedBlockId(blockId);
    };

    return (
        <Paper sx={sx} onClick={(ev) => ev.stopPropagation()}>
            <Stack>
                <Tooltip title="Duplicate" placement="left-start">
                    <IconButton
                        onClick={handleDuplicateClick}
                        sx={{ color: "text.primary" }}
                    >
                        <ContentCopyOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="left-start">
                    <IconButton
                        onClick={handleDeleteClick}
                        sx={{ color: "text.primary" }}
                    >
                        <DeleteOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Move up" placement="left-start">
                    <IconButton
                        onClick={() => handleMoveClick("up")}
                        sx={{ color: "text.primary" }}
                    >
                        <ArrowUpwardOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Move down" placement="left-start">
                    <IconButton
                        onClick={() => handleMoveClick("down")}
                        sx={{ color: "text.primary" }}
                    >
                        <ArrowDownwardOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Paper>
    );
}
