import React, { JSX, useState, useRef, useEffect } from "react";

import { InputProps, TextField } from "@mui/material";
import { useSelectedBlockId } from "../../../../../../documents/editor/EditorContext";

type Props = {
    label: string;
    rows?: number;
    placeholder?: string;
    helperText?: string | JSX.Element;
    InputProps?: InputProps;
    defaultValue: string;
    onChange: (v: string) => void;
    autoFocus?: boolean;
};
export default function TextInput({
    helperText,
    label,
    placeholder,
    rows,
    InputProps,
    defaultValue,
    onChange,
    autoFocus = false,
}: Props) {
    const [value, setValue] = useState(defaultValue);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const selectedBlockId = useSelectedBlockId();
    const isMultiline = typeof rows === "number" && rows > 1;

    useEffect(() => {
        if (autoFocus && inputRef.current && selectedBlockId) {
            const input = inputRef.current;
            input.focus();
            
            if (defaultValue === "Some text" || defaultValue === "Some block text") {
                input.select();
            } else {
                if (input.setSelectionRange) {
                    const length = input.value.length;
                    input.setSelectionRange(length, length);
                }
            }
        }
    }, [selectedBlockId, autoFocus, defaultValue]);

    return (
        <TextField
            fullWidth
            multiline={isMultiline}
            minRows={rows}
            variant={isMultiline ? "outlined" : "standard"}
            label={label}
            placeholder={placeholder}
            helperText={helperText}
            InputProps={InputProps}
            value={value}
            inputRef={inputRef}
            onChange={(ev) => {
                const v = ev.target.value;
                setValue(v);
                onChange(v);
            }}
        />
    );
}
