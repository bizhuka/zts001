import ResourceBundle from "sap/base/i18n/ResourceBundle";
import ResourceModel from "sap/ui/model/resource/ResourceModel";

export default class Formatter {
	private static _i18n: ResourceModel;
	static {
		Formatter._i18n = new ResourceModel({
			bundleName: "zts001.i18n.i18n",
			supportedLocales: [""],
		});
	}

	static formatValue(value: string) {
		return value?.toUpperCase();
	}

	static statusText(sStatus: string) {
		const resourceBundle = // this.getOwnerComponent().getModel("i18n") as ResourceModel
			Formatter._i18n.getResourceBundle() as ResourceBundle;

		switch (sStatus) {
			case "A":
			case "B":
			case "C":
				return resourceBundle.getText(`invoiceStatus${sStatus}`);

			default:
				return sStatus;
		}
	}
}
