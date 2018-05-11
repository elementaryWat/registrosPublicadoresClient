/* SystemJS module definition */
declare var module: NodeModule;
declare var jquery: any;

interface jquery {
  tooltip(options?: any): any;
}
interface NodeModule {
  id: string;
}
