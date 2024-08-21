import React from "react";
import {ReactGrid, Column, Row, CellStyle} from "@silevis/reactgrid";
import {RaceResult} from "../models/Responses";
import "@silevis/reactgrid/styles.css";

interface ChildProps{
    races : RaceResult[];
}

const DriverResultGrid: React.FC<ChildProps> = ({races}) => {
    const collums : Column[] = [
        {columnId: "Season", width: 150, reorderable: true},
        {columnId: "Race", width: 150, reorderable: true},
        {columnId: "Points", width: 150, reorderable: true},
        {columnId: "Position", width: 150, reorderable: true},
        {columnId: "Qualy", width: 150, reorderable: true},
        {columnId: "Pole", width: 150, reorderable: true},
        {columnId: "Leading lap", width: 150, reorderable: true},
        {columnId: "fastest lap", width: 150, reorderable: true},
        {columnId: "bot result", width: 150, reorderable: true},
    ];

    const headerRow : Row = {
        rowId: "header",
        cells: [
            {type: "header", text: "Season"},
            {type: "header", text: "Race"},
            {type: "header", text: "Points"},
            {type: "header", text: "Position"},
            {type: "header", text: "Qualy"},
            {type: "header", text: "Pole"},
            {type: "header", text: "Leading lap"},
            {type: "header", text: "fastest lap"},
            {type: "header", text: "bot result"},
        ]
    }

    function PositionToString(position: Number){
        if(position === 101) {
            return "Dnf";
        }else if(position === 111) {
            return "Dsq";
        }else if (position === 100) {
            return "Dns";
        }else{
            return String(position);
        }
    }

    const rows = (race_result : RaceResult[]) : Row[] => [
        headerRow,
        ...race_result.map<Row>((race, idx) => ({
            rowId: idx,
            reorderable: true,
            cells: [
                {type : "number", value: race.season, nonEditable: true},
                {type : "text", text: race.race_name, nonEditable: true},
                {type: "number", value: race.points, nonEditable: true},
                {type: "text", text: PositionToString(race.position), nonEditable: true},
                {type: "number", value: (race.qualy_result == null ? 20 : race.qualy_result), nonEditable: true},
                {type: "text", text: String(race.position), nonEditable: true},
                {type: "text", text: String(race.leading_lap), nonEditable: true},
                {type: "text", text: String(race.fastest_lap), nonEditable: true},
                {type: "text", text: String(race.bot_result), nonEditable: true},
            ]
        }))
    ];

    const reorderArray = <T extends {}>(arr: T[], idxs: number[], to: number) => {
        const movedElements = arr.filter((_, idx) => idxs.includes(idx));
        const targetIdx = Math.min(...idxs) < to ? to += 1 : to -= idxs.filter(idx => idx < to).length;
        const leftSide = arr.filter((_, idx) => idx < targetIdx && !idxs.includes(idx));
        const rightSide = arr.filter((_, idx) => idx >= targetIdx && !idxs.includes(idx));
        return [...leftSide, ...movedElements, ...rightSide];
    }

    return <ReactGrid columns={collums} rows={rows(races)}></ReactGrid>
}

export default DriverResultGrid;