import { RectNode, RectNodeModel } from "@logicflow/core";

class EndModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 60;
    this.height = 60;
    this.radius = 30;
    this.status = data.status;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    const status = this.status;
    if (status === "1") {
      style.stroke = '#1677ff';
      style.fill = '#1677ff';
    } else if (status === "2") {
      style.stroke = "red";
    } else {
      // style.stroke = "rgb(24, 125, 255)";
    }
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    const status = this.status;
    if (status === "1") {
      style.fill = '#fff';
    } else if (status === "2") {
      style.fill = "red";
    }
    return style;
  }
}

class EndView extends RectNode {
}

export default {
  type: "end",
  view: EndView,
  model: EndModel,
};