import React from 'react';

import { RedoOutlined, UndoOutlined } from '@mui/icons-material';
import { IconButton, Stack, Tooltip } from '@mui/material';

import { redo, undo, useCanRedo, useCanUndo } from '../../../documents/editor/EditorContext';

export default function UndoRedo() {
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  return (
    <Stack direction="row" spacing={0}>
      <Tooltip title="Undo">
        <span>
          <IconButton onClick={undo} disabled={!canUndo} size="small">
            <UndoOutlined fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title="Redo">
        <span>
          <IconButton onClick={redo} disabled={!canRedo} size="small">
            <RedoOutlined fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  );
}