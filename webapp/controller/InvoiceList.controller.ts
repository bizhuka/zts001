// import Formatter from "../model/formatter";
import List from "sap/m/List";
import { ListItemBase$PressEvent } from "sap/m/ListItemBase";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import ListBinding from "sap/ui/model/ListBinding";
import BaseController from "./BaseController";

import { DetailRouteParameters } from "zts001/CustTypes";

/**
 * @namespace zts001.controller
 */

export default class InvoiceList extends BaseController {
	// public formatter: Formatter

	onInit(): void {
		const oViewModel = new JSONModel({
			currency: "EUR",
		});
		this.getView().setModel(oViewModel, "view");
	}

	onFilterInvoices(oEvent: SearchField$SearchEvent) {
		// build filter array
		const sQuery = oEvent.getParameter("query");
		const aFilter = sQuery
			? [new Filter("ProductName", FilterOperator.Contains, sQuery)]
			: [];

		// filter binding
		const oList = this.byId("invoiceList") as List;
		const oBinding = oList.getBinding("items") as ListBinding;
		oBinding.filter(aFilter);
	}

	onPress (oEvent: ListItemBase$PressEvent) {
		const oItem = oEvent.getSource();
		this.navTo("detail", {
			invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substring(1))
		} as DetailRouteParameters);
	}
}
