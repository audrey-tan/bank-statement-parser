"use client";

import React from 'react';
import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import { Worker, Viewer } from "@react-pdf-viewer/core";

import { Button } from "@/components/ui/button";
import { TypographyP } from "@/components/ui/typography";
import { UploadCloud, X } from "lucide-react";


export default function FileUpload({ onFileUpload }: { onFileUpload: (fileUrl: File) => void }) {
    const [pdfFile, setPdfFile] = useState<string | null>(null);

    // Dropzone
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (file) => {
            const fileUrl = URL.createObjectURL(file[0]);
            setPdfFile(fileUrl);
            onFileUpload(file[0]);
        },
        accept: {"application/pdf": []}, // Restrict file types if needed
    });

    return (
        <div className="border border-slate-200 rounded-xl p-4">
            <div>
                {pdfFile ? (
                    <div className="flex w-full h-150 items-center">
                        <iframe src={pdfFile} className="w-full h-full rounded-sm"/>
                    </div>
                ) : (
                    <div {...getRootProps()} className="flex flex-col items-center justify-center w-full h-150 border-3 border-dashed border-gray-200 rounded-lg cursor-pointer p-6 text-center">
                        <input {...getInputProps()} />
                        <UploadCloud size={48} className="text-gray-300" /> 
                        <TypographyP className="pb-4">Drag and drop your file here or</TypographyP>
                        <Button className="bg-accent-foreground">Browse files</Button>
                    </div>
                )}
            </div>
        </div>
    );
};
