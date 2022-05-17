import React from "react";
import { Handle } from "react-flow-renderer";

const SquareNode = ({ data }) => {
    return (
        <div className={"rectangle-node"}>
            <Handle
                type="target"
                position="left"
                id={`${data.id}.left`}
                style={{top: 0}}
            />
            <div id={data.id}>{data.label}</div>
            <Handle
                type="source"
                position="right"
                id={`${data.id}.right`}
                style={{top: "100%"}}
            />
            <Handle
                type="target"
                position="top"
                id={`${data.id}.top`}
                style={{left: "100%"}}
            />
            <Handle
                type="source"
                position="bottom"
                id={`${data.id}.bottom`}
                style={{left: 0}}
            />
        </div>
    );
};

const CircleStartNode = ({ data }) => {
    return (
        <div
            style={{
                backgroundColor: "#9ca8b3",
                padding: "14px",
                borderRadius: "50px"
            }}
        >
            <div id={data.id}>{data.label}</div>
            <Handle
                type="source"
                position="right"
                id={`${data.id}.right`}
            />
        </div>
    );
};

const CircleEndNode = ({ data }) => {
    return (
        <div
            style={{
                backgroundColor: "#9ca8b3",
                padding: "14px",
                borderRadius: "50px"
            }}
        >
            <div id={data.id}>{data.label}</div>
            <Handle
                type="target"
                position="left"
                id={`${data.id}.left`}
            />
        </div>
    );
};

const RectangleNode = ({ data }) => {
    return (
        <div className={"triangle-node"}>
            <Handle
                type="target"
                position="left"
                id={`${data.id}.left`}
            />
            <div id={data.id}>{data.label}</div>
            <Handle
                type="source"
                position="right"
                id={`${data.id}.right`}
            />
            <Handle
                type="source"
                position="top"
                id={`${data.id}.top`}
            />
            <Handle
                type="target"
                position="bottom"
                id={`${data.id}.bottom`}
            />
        </div>
    );
};

export const TextNode = ({ data }) => {
    return (
        <div style={{ background: "transparent", padding: "14px" }}>
            <div id={data.id}>{data.label}</div>
        </div>
    );
};

export const nodeTypes = {
    circleStart: CircleStartNode,
    circleEnd: CircleEndNode,
    rectangle: RectangleNode,
    square: SquareNode,
    text: TextNode
};
