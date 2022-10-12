import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./Droppable.css";

function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="droppable">
      {props.children}
    </div>
  );
}

export default Droppable;
