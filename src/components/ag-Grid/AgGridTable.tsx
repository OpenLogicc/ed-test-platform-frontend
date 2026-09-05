"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";

import { AgGridReact, AgGridProvider } from "ag-grid-react";

import "./styles.css";

import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  IRowNode,
  ModuleRegistry,
  NumberFilterModule,
  RowApiModule,
  RowSelectionModule,
  RowSelectionOptions,
  TextFilterModule,
  enableDevValidations,
} from "ag-grid-community";

import {
  ColumnMenuModule,
  ContextMenuModule,
  ExcelExportModule,
} from "ag-grid-enterprise";

import { IOlympicData } from "./interfaces";

import { useFetchJson } from "./useFetchJson";

if (import.meta.env.DEV) {
  enableDevValidations();
}

const modules = [
  TextFilterModule,

  NumberFilterModule,

  RowSelectionModule,

  RowApiModule,

  ClientSideRowModelModule,

  ExcelExportModule,

  ColumnMenuModule,

  ContextMenuModule,
];

const AgGridTable = () => {
  const gridRef = useRef<AgGridReact<IOlympicData>>(null);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "athlete", minWidth: 200 },

    { field: "age" },

    { field: "country", minWidth: 200 },

    { field: "year" },

    { field: "date", minWidth: 150 },

    { field: "sport", minWidth: 150 },

    { field: "gold" },

    { field: "silver" },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: true,

      minWidth: 100,

      flex: 1,
    };
  }, []);

  const rowSelection = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "multiRow",

      checkboxes: false,

      headerCheckbox: false,
    };
  }, []);

  const { data, loading } = useFetchJson<IOlympicData>(
    "https://www.ag-grid.com/example-assets/olympic-winners.json",
  );

  const onBtExport = useCallback(() => {
    const spreadsheets: string[] = [];

    let nodesToExport: IRowNode[] = [];

    gridRef.current!.api.forEachNode((node, index) => {
      nodesToExport.push(node);

      if (index % 100 === 99) {
        gridRef.current!.api.setNodesSelected({
          nodes: nodesToExport,

          newValue: true,
        });

        spreadsheets.push(
          gridRef.current!.api.getSheetDataForExcel({
            onlySelected: true,
          })!,
        );

        gridRef.current!.api.deselectAll();

        nodesToExport = [];
      }
    });

    // check if the last page was exported

    if (gridRef.current!.api.getSelectedNodes().length) {
      spreadsheets.push(
        gridRef.current!.api.getSheetDataForExcel({
          onlySelected: true,
        })!,
      );

      gridRef.current!.api.deselectAll();
    }

    gridRef.current!.api.exportMultipleSheetsAsExcel({
      data: spreadsheets,

      fileName: "ag-grid.xlsx",
    });
  }, []);

  return (
    <AgGridProvider modules={modules}>
      <div className="w-full" style={containerStyle}>
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-white">
              Student Details
            </h2>

            <button
              onClick={onBtExport}

              className="m-3 inline-flex items-center rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-purple-500/20 transition hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-95"
            >
              Export to Excel
            </button>
          </div>

          <div className="grid-wrapper ag-grid-theme">
            <div style={gridStyle}>
              <AgGridReact<IOlympicData>
                ref={gridRef}

                rowData={data}

                loading={loading}

                columnDefs={columnDefs}

                defaultColDef={defaultColDef}

                rowSelection={rowSelection}
              />
            </div>
          </div>
        </div>
      </div>
    </AgGridProvider>
  );
};

export default AgGridTable;
