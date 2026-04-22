"use client";

import { useState, useRef } from "react";
import { useMoxsend } from "../context/MoxsendContext";

interface CSVRow {
  [key: string]: string;
}

export default function CSVUploadView() {
  const { setView, showToast } = useMoxsend();
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<CSVRow[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string) => {
    const lines = text.trim().split("\n");
    if (lines.length < 2) return;
    const hdrs = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""));
    const dataRows = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim().replace(/"/g, ""));
      const row: CSVRow = {};
      hdrs.forEach((h, i) => {
        row[h] = values[i] || "";
      });
      return row;
    });
    setHeaders(hdrs);
    setRows(dataRows);
    return dataRows;
  };

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      showToast("Please upload a .csv file", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("File must be under 5MB", "error");
      return;
    }
    setFileName(file.name);
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      parseCSV(text);
      setIsProcessing(false);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleBulkGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    for (let i = 0; i <= rows.length; i++) {
      await new Promise((r) => setTimeout(r, 300));
      setGenerationProgress(i);
    }
    setIsGenerating(false);
    showToast(`Generated emails for ${rows.length} contacts!`, "success");
  };

  return (
    <main className="pt-24 pb-32 px-6 max-w-5xl mx-auto">
      {/* Back */}
      <button
        onClick={() => setView("dashboard")}
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-off-black transition-colors mb-6"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Back to Dashboard
      </button>

      {/* Header */}
      <div className="mb-10 animate-fade-in-up">
        <span className="mono-label text-[12px] text-brand-primary font-bold mb-3 block">
          Bulk Operations
        </span>
        <h1 className="saans-headline text-4xl md:text-5xl font-normal text-off-black mb-4">
          Bulk Generate via CSV
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Upload a CSV with contact information and generate personalized emails
          for each row simultaneously.
        </p>
      </div>

      {/* Upload Zone */}
      {!fileName && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-12 md:p-16 text-center cursor-pointer transition-all duration-300 animate-fade-in-up ${
            isDragging
              ? "border-brand-orange bg-brand-orange/5"
              : "border-border-default hover:border-brand-orange/40 hover:bg-surface-container-low"
          }`}
        >
          <span className="material-symbols-outlined text-5xl text-text-secondary mb-4 block">
            cloud_upload
          </span>
          <p className="text-lg font-medium text-off-black mb-2">
            Drop your CSV file here
          </p>
          <p className="text-sm text-text-secondary">
            or{" "}
            <span className="text-brand-primary underline font-medium">
              browse files
            </span>{" "}
            — .csv only, max 5MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="flex items-center justify-center p-12">
          <span className="material-symbols-outlined animate-spin text-brand-orange text-4xl">
            progress_activity
          </span>
          <span className="ml-3 text-lg text-text-secondary">
            Parsing your CSV...
          </span>
        </div>
      )}

      {/* Preview Table */}
      {fileName && rows.length > 0 && !isProcessing && (
        <div className="space-y-6 animate-fade-in-up">
          {/* File Info */}
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-border-default">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-brand-primary">
                description
              </span>
              <div>
                <p className="font-bold text-sm">{fileName}</p>
                <p className="text-xs text-text-secondary">
                  {rows.length} contacts found
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setFileName(null);
                setRows([]);
                setHeaders([]);
              }}
              className="text-sm text-text-secondary hover:text-error transition-colors"
            >
              Remove
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-border-default">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-container-high">
                  <th className="text-left p-3 text-[10px] uppercase tracking-widest font-bold text-text-tertiary">
                    #
                  </th>
                  {headers.map((h) => (
                    <th
                      key={h}
                      className="text-left p-3 text-[10px] uppercase tracking-widest font-bold text-text-tertiary"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 10).map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-border-default hover:bg-surface-container-low transition-colors"
                  >
                    <td className="p-3 text-text-secondary">{i + 1}</td>
                    {headers.map((h) => (
                      <td key={h} className="p-3">
                        {row[h]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {rows.length > 10 && (
              <div className="p-3 text-center text-xs text-text-secondary bg-surface-container-low">
                Showing 10 of {rows.length} rows
              </div>
            )}
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <div className="p-6 bg-surface-container-low rounded-xl border border-border-default">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold">
                  Generating emails...
                </span>
                <span className="text-sm text-text-secondary">
                  {generationProgress} / {rows.length}
                </span>
              </div>
              <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-orange rounded-full transition-all duration-300"
                  style={{
                    width: `${(generationProgress / rows.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleBulkGenerate}
            disabled={isGenerating}
            className={`w-full py-4 rounded-[4px] font-bold text-base transition-all flex items-center justify-center gap-2 ${
              isGenerating
                ? "bg-surface-container-high text-text-secondary cursor-not-allowed"
                : "bg-brand-orange text-white shadow-lg shadow-brand-orange/20 btn-scale"
            }`}
          >
            {isGenerating ? (
              <>
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
                Generating...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">bolt</span>
                Generate {rows.length} Personalized Emails
              </>
            )}
          </button>
        </div>
      )}
    </main>
  );
}
