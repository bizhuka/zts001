import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import { DetailRouteParameters } from "zts001/CustTypes";
import ProductRating, { ProductRating$ChangeEvent } from "zts001/control/ProductRating";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace zts001.controller
 */

export default class Detail extends BaseController {
	public onInit(): void {
        const oViewModel = new JSONModel({
            currency: "EUR"
        });
        this.getView().setModel(oViewModel, "view");

		const oRouter = this.getOwnerComponent().getRouter();

        // If "detail" path is matched
		oRouter.getRoute("detail").attachPatternMatched((oEvent: Route$PatternMatchedEvent)=>{             
            const rating = this.byId("rating") as ProductRating            
            rating.reset();

            const routeParameters = oEvent.getParameter("arguments") as DetailRouteParameters;
            this.getView().bindElement({
                path: `/${window.decodeURIComponent(routeParameters.invoicePath)}`,
                model: "invoice",
            });
        });
	}

    onRatingChange (oEvent: ProductRating$ChangeEvent) {
        const fValue = oEvent.getParameter("value");

        const oResourceBundle = this.getResourceBundle();
        MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
    }

    // Already in BaseController
    // public onNavBack () {
    //     const sPreviousHash = History.getInstance().getPreviousHash();

    //     if (sPreviousHash !== undefined) {
    //         window.history.go(-1);
    //     } else {
    //         this.getOwnerComponent().getRouter().navTo("main", {}, true);
    //     }
    // }
}
