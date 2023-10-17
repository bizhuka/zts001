import UIComponent from "sap/ui/core/UIComponent";
import models from "./model/models";
import Device from "sap/ui/Device";
import { JSData } from "./CustTypes";
import JSONModel from "sap/ui/model/json/JSONModel";
import Controller from "sap/ui/core/mvc/Controller";
import Dialog from "sap/m/Dialog";
import Fragment from "sap/ui/core/Fragment";
// import syncStyleClass from "sap/ui/core/syncStyleClass";

/**
 * @namespace zts001
 */
export default class Component extends UIComponent {
	public static metadata = {
		manifest: "json",
	};

	private contentDensityClass: string;
	private pDialog: Dialog;

	public init(): void {
		// call the base component's init function
		super.init();

		// create the device model
		this.setModel(models.createDeviceModel(), "device");

		// create the views based on the url/hash
		this.getRouter().initialize();

		// set data model on view
		const oData: JSData = {
			recipient: {
				name: "UI5",
			},
		};
		const oModel = new JSONModel(oData);
		this.setModel(oModel, "JSData");
	}

	public async openHelloDialog(controller: Controller): Promise<void> {
		if (!this.pDialog) {
			this.pDialog = (await Fragment.load({ // controller.loadFragment
				id: controller.getView().getId(),
				name: "zts001.view.HelloDialog",
				controller: {
					onCloseDialog: () => {
						this.pDialog.close()
						this.pDialog.destroy()
						delete this.pDialog
					},
				},
			})) as Dialog;
			controller.getView().addDependent(this.pDialog);

			// No need
			// syncStyleClass(this.getContentDensityClass(), controller.getView(), this.pDialog);
		}
		this.pDialog.open();
	}

	// public onCloseDialog() {
	// 	this.pDialog.close();
	// }

	/**
	 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
	 * design mode class should be set, which influences the size appearance of some controls.
	 * @public
	 * @returns css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
	 */
	public getContentDensityClass(): string {
		if (this.contentDensityClass === undefined) {
			// check whether FLP has already set the content density class; do nothing in this case
			if (
				document.body.classList.contains("sapUiSizeCozy") ||
				document.body.classList.contains("sapUiSizeCompact")
			) {
				this.contentDensityClass = "";
			} else if (!Device.support.touch) {
				// apply "compact" mode if touch is not supported
				this.contentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				this.contentDensityClass = "sapUiSizeCozy";
			}
		}
		return this.contentDensityClass;
	}
}
