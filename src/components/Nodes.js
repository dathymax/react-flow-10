import React from "react";
import { Handle } from "react-flow-renderer";

const styles = {
}

const StartNode = ({ data }) => {
    return (
        <div className={"start_node--render"}>
            <Handle
                type="source"
                position="right"
                id={`${data.id}.right`}
                style={{...styles, top: "50%"}}
            />
        </div>
    );
};

const EndNode = ({data}) => {
    return (
        <div className={"end_node--render"}>
            <Handle
                type="target"
                position="left"
                id={`${data.id}.left`}
                style={{...styles, top: "50%"}}
            />
        </div>
    )
}

const TaskNode = ({data}) => {
    return (
        <div className={"task_node--render"}>
            <Handle
                type="source"
                position="left"
                id={`${data.id}.left`}
                style={{...styles, top: "25%"}}
            />
            <Handle
                type="target"
                position="left"
                id={`${data.id}.left`}
                style={{...styles, top: "75%"}}
            />
            <Handle
                type="source"
                position="top"
                id={`${data.id}.top`}
                style={{...styles, left: "25%"}}
            />
            <Handle
                type="target"
                position="top"
                id={`${data.id}.top`}
                style={{...styles, left: "75%"}}
            />
            <Handle
                type="source"
                position="right"
                id={`${data.id}.right`}
                style={{...styles, top: "25%"}}
            />
            <Handle
                type="target"
                position="right"
                id={`${data.id}.right`}
                style={{...styles, top: "75%"}}
            />
            <Handle
                type="source"
                position="bottom"
                id={`${data.id}.bottom`}
                style={{...styles, left: "25%"}}
            />
            <Handle
                type="target"
                position="bottom"
                id={`${data.id}.bottom`}
                style={{...styles, left: "75%"}}
            />
        </div>
    )
}

const ForkNode = ({data}) => {
    return (
        <div className={"fork_node--render"}>
            <Handle
                type="target"
                position="left"
                id={`${data.id}.left`}
                style={{...styles, top: 0}}
            />
            <Handle
                type="source"
                position="top"
                id={`${data.id}.top`}
                style={{...styles, left: "100%"}}
            />
            <Handle
                type="target"
                position="right"
                id={`${data.id}.right`}
                style={{...styles, top: "100%"}}
            />
            <Handle
                type="target"
                position="bottom"
                id={`${data.id}.bottom`}
                style={{...styles, left: 0}}
            />
        </div>
    )
}

export const nodeTypes = {
    startNode: StartNode,
    endNode: EndNode,
    taskNode: TaskNode,
    forkNode: ForkNode,
};
