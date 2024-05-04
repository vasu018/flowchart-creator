import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
    // console.log(data);
    return (
        <>
            {data.label}
            <Handle type="target" position={Position.Left} />
            <Handle type="source" position={Position.Right} />
            {/* <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} /> */}
        </>
    )
}

export default CustomNode;