import MessageBox from "sap/m/MessageBox";
// import Fragment from "sap/ui/core/Fragment";
import { JSData } from "zts001/CustTypes";
import BaseController from "./BaseController";

/**
 * @namespace zts001.controller
 */

export default class Main extends BaseController {
	public onShowHello(): void {
		const oResourceBundle = this.getResourceBundle();

		const oData = this.getView().getModel("JSData").getProperty("/") as JSData;
		MessageBox.show(oResourceBundle.getText("helloMsg", [oData.recipient.name]));
	}

	public onOpenDialog(): void {
		void this.getOwnerComponent().openHelloDialog(this);
	}
}
