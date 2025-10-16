import { RectNode, RectNodeModel } from "@logicflow/core";

class StartModel extends RectNodeModel {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 60;
    this.height = 60;
    this.radius = 5;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = '#1677ff';
    style.fill = '#1677ff';
    return style;
  }
  getTextStyle() {
    const style = super.getTextStyle();
    style.fill = '#fff';
    return style;
  }
}

class StartView extends RectNode {
}

export default {
  type: "start",
  view: StartView,
  model: StartModel,
};