import React, {useCallback} from 'react';
import { useStore } from 'react-flow-renderer';

const transformSelector = (state) => state.transform;

export default ({ nodes, setNodes, name, setName,
                    addRectangleHandler, addCircleStartHandler,
                    addCircleEndHandler, addSquareHandler,
                    addTextHandler}) => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const transform = useStore(transformSelector);

    const selectAll = useCallback(() => {
        setNodes((nds) =>
            nds.map((node) => {
                node.selected = true;
                return node;
            })
        );
    }, [setNodes]);

    return (
        <aside>
            <div className="description">You can drag these nodes to the pane on the right.</div>
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Start Node
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Node
            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div>
            <div className="description">
                This is an example of how you can access the internal state outside of the ReactFlow component.
            </div>
            <div className="title">Zoom & pan transform</div>
            <div className="transform">
                [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
            </div>
            <div className="title">Nodes</div>
            {nodes?.map((node) => (
                <div key={node.id}>
                    Node {node.id} - x: {node.position.x.toFixed(2)}, y: {node.position.y.toFixed(2)}
                </div>
            ))}

            <div className="selectall">
                <button onClick={selectAll}>select all nodes</button>
            </div>

            <div className={"flex-column"}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter new node name"
                />

                <button type="button" onClick={addRectangleHandler} className={"margin-y-10 padding-y-5"}>
                    Create Rectangle
                </button>

                <button type="button" onClick={addCircleStartHandler} className={"margin-y-10 padding-y-5"}>
                    Create Circle Start
                </button>

                <button type="button" onClick={addCircleEndHandler} className={"margin-y-10 padding-y-5"}>
                    Create Circle End
                </button>

                <button type="button" onClick={addSquareHandler} className={"margin-y-10 padding-y-5"}>
                    Create Square 45deg
                </button>

                <button type="button" onClick={addTextHandler} className={"margin-y-10 padding-y-5"}>
                    Plain text
                </button>
            </div>

            {/*<div>*/}
            {/*    <input*/}
            {/*        value={newName}*/}
            {/*        onChange={(e) => setNewName(e.target.value)}*/}
            {/*        type="text"*/}
            {/*    />*/}

            {/*    <button type="button" onClick={updateNodeHandler}>*/}
            {/*        Update*/}
            {/*    </button>*/}
            {/*</div>*/}

            {/*<button type="button" onClick={saveChangesHandler}>*/}
            {/*    Save changes*/}
            {/*</button>*/}
        </aside>
    );
};
