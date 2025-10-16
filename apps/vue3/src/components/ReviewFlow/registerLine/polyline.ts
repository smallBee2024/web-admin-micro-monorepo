import LogicFlow, { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";

class SequenceModel extends PolylineEdgeModel {
  setAttributes() {
    this.offset = 20;
  }
  getEdgeStyle() {
    const style = super.getEdgeStyle();

    if (this.properties.status == "1") {
      style.stroke = "#1677ff";
      style.zIndex = 100;
    } else {
      style.zIndex = 1;
    }

    return style;
  }

}

export default {
  type: "polyline",
  view: PolylineEdge,
  model: SequenceModel,
};