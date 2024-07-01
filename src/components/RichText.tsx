"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import React, { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import { Box, useTheme } from "@mui/material";

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;

export const RichTextInput = ({ value, onChange, placeholder, error }) => {
  const theme = useTheme();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ["normal", "large"] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }],
          [{ link: () => {} }],
          ["clean"],
        ],
        // handlers: {
        //   link: function (value) {
        //     if (value) {
        //       const href = prompt("Enter the URL");
        //       this.quill.format("link", href);
        //     } else {
        //       this.quill.format("link", false);
        //     }
        //   },
        // },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <Box
      borderColor="error"
      sx={
        error && {
          ".ql-toolbar.ql-snow": {
            border: "1px solid ",
            borderColor: theme.palette.error.main,
          },
          ".ql-container.ql-snow": {
            border: "1px solid ",
            borderColor: theme.palette.error.main,
          },
        }
      }
    >
      <QuillWrapper
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        theme="snow"
        modules={modules}
      />
    </Box>
  );
};
