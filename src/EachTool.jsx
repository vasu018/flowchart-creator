import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { toolswitch } from "./Redux/reducers/toolSlice";

const style = {
    border: "1px solid black",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    float: "left",
};

const EachTool = ({ name, color }) => {
    const dispatch = useDispatch();

    const handleTouchMove = () => {
        dispatch(toolswitch({ name, color }));
    };

    const [{ opacity }, drag] = useDrag(
        () => ({
            type: "tool",
            item: name,
            collect: (monitor) => {
                return ({
                    opacity: monitor.isDragging() ? 0.4 : 1,
                })
            },

        }), [name],
    );
    return (
        <>
            <div ref={drag} style={{ ...style, opacity, backgroundColor: color, color: "#fff" }} draggable onDrag={() => dispatch(toolswitch({ name, color }))} onTouchMove={handleTouchMove} >
                {name}
            </div >
        </>
    )

}
export default EachTool;