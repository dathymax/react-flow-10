import React from 'react';
import './styles.css';

export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">
                You can drag these nodes to the pane on the right.
            </div>
            <div className="flex--wrap">
                <div className="start_node--icon"
                     onDragStart={(event) =>
                         onDragStart(event, 'startNode')}
                     draggable
                />
                <div className="end_node--icon"
                     onDragStart={(event) =>
                         onDragStart(event, 'endNode')}
                     draggable
                />
                <div className="task_node--icon"
                     onDragStart={(event) =>
                         onDragStart(event, 'taskNode')}
                     draggable
                />
                <div className="fork_node--icon"
                     onDragStart={(event) =>
                         onDragStart(event, 'forkNode')}
                     draggable
                />
            </div>
        </aside>
    );
};
