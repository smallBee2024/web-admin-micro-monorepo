import { DiamondNode, DiamondNodeModel } from "@logicflow/core";

class OtherModel extends DiamondNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    // 绘制菱形
    this.rx = 30;
    this.ry = 30;
    this.status = data.status;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    const status = this.status;

    if (status === "2") {
      style.stroke = "red";
    } else if (status === "1") {
      style.stroke = "rgb(24, 125, 255)";
    }
    return style;
  }

  getTextStyle() {
    const style = super.getTextStyle();
    const status = this.status;
    if (status === "2") {
      style.fill = "red";
    } else if (status === "1") {
      style.fill = "rgb(24, 125, 255)";
    }
    return style;
  }
}

class OtherView extends DiamondNode {
}

export default {
  type: "other",
  view: OtherView,
  model: OtherModel,
};